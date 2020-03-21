import { injectable } from "tsyringe";
import { EncryptionService } from "../encryption/EncryptionService";
import { ErrorService } from "../error/ErrorService";
import { Path, RequestMethod, RestController } from "../router/ControllerDecorators";
import { UserSchema } from "../user/UserController";
import { UserDb } from "../user/UserDb";
import { UtilsService } from "../utils/UtilsService";
import { ValidateBody } from "../utils/ValidatorService";
import { AuthenticationSchema } from "./AuthenticationSchema";
import { AuthenticationService } from "./AuthenticationService";
import { AuthenticationCredentials, AuthenticationPayload, TokenPayload } from "./IAuthentication";

@injectable()
@RestController("/authentication")
export class AuthenticationController {
    constructor(
        private userDb: UserDb,
        private encryptionService: EncryptionService,
        private errorService: ErrorService,
        private authenticationService: AuthenticationService,
        private utilsService: UtilsService
    ) {}

    @Path("/")
    @RequestMethod("post")
    @ValidateBody(AuthenticationSchema)
    public async authenticate({ email, password }: AuthenticationCredentials): Promise<AuthenticationPayload> {
        const befgu = new Date().getTime();
        console.log("before get user", befgu);
        const user = await this.userDb.getUserByEmail(email);
        const aftgu = new Date().getTime();
        console.log("after get user", aftgu, aftgu - befgu);
        const passwordMatches = await this.encryptionService.verify(password, user.password);
        if (!passwordMatches) {
            throw this.errorService.getErrorMessage(20);
        }
        const aftpm = new Date().getTime();
        console.log("after password matches", aftpm, aftpm - aftgu);
        const tokenPayload: TokenPayload = {
            id: user.id
        };
        const token = this.authenticationService.signToken(tokenPayload);
        const afts = new Date().getTime();
        console.log("after sign token", afts, afts - aftpm);
        const cleanedUser = this.utilsService.cleanUnsafeValues(user, UserSchema);
        const afcu = new Date().getTime();
        console.log("after cleaning user", afcu, afcu - afts);
        return {
            token,
            user: cleanedUser
        };
    }
}

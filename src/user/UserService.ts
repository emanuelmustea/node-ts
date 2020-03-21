import { injectable } from "tsyringe";
import { EncryptionService } from "../encryption/EncryptionService";
import { User } from "./IUser";
import { UserDb } from "./UserDb";

@injectable()
export class UserService {
    constructor(private userDb: UserDb, private encryptionService: EncryptionService) {}

    public async createUser(user: User): Promise<User> {
        const hashedPassword = await this.encryptionService.hash(user.password);

        const formattedUser: User = {
            ...user,
            password: hashedPassword
        };
        return this.userDb.createUser(formattedUser);
    }

    public async getAllUsers(): Promise<User[]> {
        return this.userDb.getUsers();
    }
}

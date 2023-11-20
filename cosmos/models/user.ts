import {DATABASE_ID, USERS_CONTAINER} from "@/cosmos/constants";
import Model from "@/cosmos/models/model";

import {User} from "@/types/User";

const partitionKey = undefined; // Define an appropriate partition key based on your data model

class UserModel extends Model<User, User> {
    constructor() {
        super(DATABASE_ID, USERS_CONTAINER, partitionKey);
    }
}

const userModel = new UserModel();

export default userModel;

import mongoose from "mongoose";
import { compareSync, hashSync } from "bcrypt";


//Schema for each user in mongo db
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        validate: {
            validator: username => User.doesNotExist({ username }),
            message: "Username Already Exists"
        }
    },
    email: {
        type: String,
        validate: {
            validator: email => User.doesNotExist({ email }),
            message: "email Already Exists"
        }
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

//Pre function will be called before everything else
//So this.password will be references from here
UserSchema.pre('save', function () {
    if(this.isModified('password')) {
        this.password = hashSync(this.password, 10);
    }
});


UserSchema.statics.doesNotExist = async function (field) {
    return await this.where(field).countDocuments() === 0;
};

UserSchema.methods.comparePasswords = function (password) {
    return compareSync(password, this.password);
}

const User = mongoose.model('User', UserSchema);
export default User;
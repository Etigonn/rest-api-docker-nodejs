import {model, Schema, Document} from "mongoose";
import bcrypt from 'bcrypt'

// exporting user's interface
export interface IUser extends Document{
    email: string;
    password: string;
    comparePassword: (password: string) => Promise<boolean>
}

// creating user's schema
const userSchema = new Schema({
    email : {
        type: String,
        unique : true,
        require: true,
        lowercase : true,
        trim: true
    },
    password :{
        type: String,
        require: true
    }
});

// Encrypt func
userSchema.pre<IUser>('save', async function(next){
    // context
    const user = this;
    if(!user.isModified('password')) return next();

    // generating salt for encrypt
    const salt = await bcrypt.genSalt(10);
    // generating hash for user password
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
});

// Decrypt password
userSchema.methods.comparePassword = async function(password: string): Promise<boolean>{
    return await bcrypt.compare(password, this.password);
}

export default model<IUser>('User', userSchema);
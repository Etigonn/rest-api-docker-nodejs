import { Request, Response } from "express"
import User, {IUser} from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../config/config'

// creating json web token
function createToken(user: IUser){
    return jwt.sign({id: user.id, email: user.email}, config.jwtSecret, {
        expiresIn: 86400
    });
}

export const singUp = async (req: Request, res: Response): Promise<Response> =>{
    // email and password required
    if(!req.body.email || !req.body.password)
        return res.status(404).json({
            msg : 'Please. Send your email and password'
        });
    // check for duplicate user
    const user = await User.findOne({ email: req.body.email });
    if(user){
        return res.status(400).json({msg: "This email is already registered!"});
    }

    // creating new user
    const newUser = new User(req.body)
    await newUser.save();
    // sending a response
    return res.status(201).json(newUser);
}

export const singIn = async (req: Request, res: Response) =>{
    // email and password required
    if(!req.body.email || !req.body.password)
        return res.status(404).json({
            msg : 'Please. Send your email and password'
        });

    // if the mail is NOT registered
    const user = await User.findOne({ email: req.body.email })
    if(!user){
        return res.status(400).json({msg: "This user not exists"})
    }
    const isMatchPassword = await user.comparePassword(req.body.password)
    if(isMatchPassword){
        return res.status(200).json({token: createToken(user)})
    }

    return res.status(400).json({
        msg: "The email or password are incorrect!"
    })
}
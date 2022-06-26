"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singIn = exports.singUp = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
// creating json web token
function createToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, config_1.default.jwtSecret, {
        expiresIn: 86400
    });
}
const singUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // email and password required
    if (!req.body.email || !req.body.password)
        return res.status(404).json({
            msg: 'Please. Send your email and password'
        });
    // check for duplicate user
    const user = yield user_1.default.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ msg: "This email is already registered!" });
    }
    // creating new user
    const newUser = new user_1.default(req.body);
    yield newUser.save();
    // sending a response
    return res.status(201).json(newUser);
});
exports.singUp = singUp;
const singIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // email and password required
    if (!req.body.email || !req.body.password)
        return res.status(404).json({
            msg: 'Please. Send your email and password'
        });
    // if the mail is NOT registered
    const user = yield user_1.default.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ msg: "This user not exists" });
    }
    const isMatchPassword = yield user.comparePassword(req.body.password);
    if (isMatchPassword) {
        return res.status(200).json({ token: createToken(user) });
    }
    return res.status(400).json({
        msg: "The email or password are incorrect!"
    });
});
exports.singIn = singIn;

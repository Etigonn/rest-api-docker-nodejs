"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controler_1 = require("../controllers/user.controler");
// Initialization router
const router = (0, express_1.Router)();
// routes
router.post('/singup', user_controler_1.singUp);
router.post('/singin', user_controler_1.singIn);
exports.default = router;

import  Express  from "express";
const router = Express.Router();
import { getUsers,Register,Login,Logout} from "../controller/Users.js";
import { verifyToken } from "../middleware/Verify_Token.js";
import {getSpesies} from "../controller/Spesies.js"

router.get('/users',verifyToken,getUsers);
router.post('/register',Register);
router.post('/login',Login);
router.delete('/logout',verifyToken,Logout);
router.get('/Spesies',getSpesies);


export default router;
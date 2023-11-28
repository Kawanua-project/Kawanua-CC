import  Express  from "express";
const router = Express.Router();
import { getUsers,Register,Login } from "../controller/Users.js";
import { verifyToken } from "../middleware/Verify_Token.js";

router.get('/users',verifyToken,getUsers);
router.post('/users',Register);
router.post('/login',Login);

export default router;
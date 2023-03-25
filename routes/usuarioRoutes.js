import express from 'express';
import { getAllUser, changePassword, getDeleteUser, getSingleUser, postAddUser, postEditUser } from '../controllers/usuarioController.js';


const router = express.Router();

router.get("/all-user", getAllUser);
router.post("/signle-user", getSingleUser);

router.post("/add-user", postAddUser);
router.post("/edit-user", postEditUser);
router.delete("/delete-user", getDeleteUser);

router.post("/change-password", changePassword);


export default router ;
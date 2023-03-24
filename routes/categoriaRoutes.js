import express from 'express';

import {getAllCategory, postAddCategory, getDeleteCategory, postEditCategory} from '../controllers/categoriaController.js';

import multer from 'multer';
import { loginCheck } from '../middleware/auth.js';


const router = express.Router();
// Image Upload setting

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/categories");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/all-category", getAllCategory);

router.post(
  "/add-category",
  // loginCheck,
  upload.single("cImage"),
  postAddCategory
);
router.post("/edit-category", 
// loginCheck, 
postEditCategory);
router.post(
  "/delete-category",
  // loginCheck,
  getDeleteCategory
);

export default router;
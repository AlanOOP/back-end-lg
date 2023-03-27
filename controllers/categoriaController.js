import { toTitleCase } from "../config/fuction.js";
import categoryModel from "../models/categories.js";
import * as fs from 'fs';


 const getAllCategory = async(req, res) => {
    try {
      let Categories = await categoryModel.find({}).sort({ _id: -1 });
      if (Categories) {
        return res.json({ Categories });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const postAddCategory = async(req, res) => {
    
    let { cName, cDescription, cStatus } = req.body;
    let cImage =  req.file.filename;
    const filePath = `../server/public/uploads/categories/${cImage}`;

    if (!cName || !cDescription || !cStatus || !cImage) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
        return res.json({ error: "Campos Requeridos" });
      });
    } else {
      cName = toTitleCase(cName);
      try {
        let checkCategoryExists = await categoryModel.findOne({ cName: cName });
        if (checkCategoryExists) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.log(err);
            }
            return res.json({ error: "Categoria Ya existe" });
          });
        } else {
          let newCategory = new categoryModel({
            cName,
            cDescription,
            cStatus,
            cImage,
          });
          await newCategory.save().then((err) => {
            if (!err) {
              return res.json({ success: "Categoria Creada correctamente" });
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  const postEditCategory = async(req, res) => {
    let { cId, cDescription, cStatus } = req.body;
    if (!cId || !cDescription || !cStatus) {
      return res.json({ error: "Campos Requeridos" });
    }
    try {
      let editCategory = categoryModel.findByIdAndUpdate(cId, {
        cDescription,
        cStatus,
        updatedAt: Date.now(),
      });
      let edit = await editCategory.exec();
      if (edit) {
        return res.json({ success: "Categoria Edita Correctamente" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getDeleteCategory = async(req, res) => {
    let { cId } = req.body;
    if (!cId) {
      return res.json({ error: "Campo Requerido" });
    } else {
      try {
        let deletedCategoryFile = await categoryModel.findById(cId);
        const filePath = `../server/public/uploads/categories/${deletedCategoryFile.cImage}`;

        let deleteCategory = await categoryModel.findByIdAndDelete(cId);
        if (deleteCategory) {
          // Delete Image from uploads -> categories folder 
          fs.unlink(filePath, (err) => {
            if (err) {
              console.log(err);
            }
            return res.json({ success: "Categoria Eliminada Correctamente" });
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  export {getAllCategory, postAddCategory, getDeleteCategory, postEditCategory};
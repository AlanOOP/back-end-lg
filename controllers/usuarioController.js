import Usuario from "../models/users.js";
import bcrypt from 'bcrypt';

  const getAllUser = async (req, res) => {
    try {
      let Users = await Usuario
        .find({})
        .populate("allProduct.id", "pName pImages pPrice")
        .populate("user", "name email")
        .sort({ _id: -1 });
      if (Users) {
        return res.json({ Users });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getSingleUser = async (req, res) => {
    let { uId } = req.body;
    if (!uId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let User = await Usuario
          .findById(uId)
          .select("name email phoneNumber userImage updatedAt createdAt");
        if (User) {
          return res.json({ User });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  const postAddUser = async (req, res) => {
    let { allProduct, user, amount, transactionId, address, phone } = req.body;
    if (
      !allProduct ||
      !user ||
      !amount ||
      !transactionId ||
      !address ||
      !phone
    ) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let newUser = new Usuario({
          allProduct,
          user,
          amount,
          transactionId,
          address,
          phone,
        });
        let save = await newUser.save();
        if (save) {
          return res.json({ success: "User created successfully" });
        }
      } catch (err) {
        return res.json({ error: err });
      }
    }
  }

  const postEditUser = async (req, res) => {
    let { uId, name, phoneNumber } = req.body;
    if (!uId || !name || !phoneNumber) {
      return res.json({ message: "All filled must be required" });
    } else {
      let currentUser = Usuario.findByIdAndUpdate(uId, {
        name: name,
        phoneNumber: phoneNumber,
        updatedAt: Date.now(),
      });
      currentUser.exec();
      //   (err, result) => {
      //   if (err) console.log(err);
      //   return res.json({ success: "User updated successfully" });
      // });
    }
  }

  const getDeleteUser = async (req, res) => {
    let { oId, status } = req.body;
    if (!oId || !status) {
      return res.json({ message: "All filled must be required" });
    } else {
      let currentUser = Usuario.findByIdAndUpdate(oId, {
        status: status,
        updatedAt: Date.now(),
      });
      currentUser.exec((err, result) => {
        if (err) console.log(err);
        return res.json({ success: "User updated successfully" });
      });
    }
  }

  const changePassword = async (req, res) => {
    let { uId, oldPassword, newPassword } = req.body;
    if (!uId || !oldPassword || !newPassword) {
      return res.json({ message: "All filled must be required" });
    } else {
      const data = await Usuario.findOne({ _id: uId });
      if (!data) {
        return res.json({
          error: "Invalid user",
        });
      } else {
        const oldPassCheck = await bcrypt.compare(oldPassword, data.password);
        if (oldPassCheck) {
          newPassword = bcrypt.hashSync(newPassword, 10);
          let passChange = Usuario.findByIdAndUpdate(uId, {
            password: newPassword,
          });
          passChange.exec();
          //   (err, result) => {
          //   if (err) console.log(err);
            return res.json({ success: "Password updated successfully" });
          // });
        } else {
          return res.json({
            error: "Your old password is wrong!!",
          });
        }
      }
    }
  }

export {getAllUser, changePassword, getDeleteUser, getSingleUser, postAddUser, postEditUser};
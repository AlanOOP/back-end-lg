 import orderModel from "../models/orders.js";
 
 const getAllOrders = async(req, res) => {
    try {
      let Orders = await orderModel
        .find({})
        .populate("allProduct.id", "pName pImages pPrice")
        .populate("user", "name email")
        .sort({ _id: -1 });
      if (Orders) {
        return res.json({ Orders });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getOrderByUser = async(req, res) => {
    let { uId } = req.body;
    if (!uId) {
      return res.json({ message: "Campo Requerido" });
    } else {
      try {
        let Order = await orderModel
          .find({ user: uId })
          .populate("allProduct.id", "pName pImages pPrice")
          .populate("user", "name email")
          .sort({ _id: -1 });
        if (Order) {
          return res.json({ Order });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  const postCreateOrder = async(req, res) => {
    let { allProduct, user, amount, transactionId, address, phone } = req.body;
    if (
      !allProduct ||
      !user ||
      !amount ||
      !transactionId ||
      !address ||
      !phone
    ) {
      return res.json({ message: "Campo Requerido" });
    } else {
      try {
        let newOrder = new orderModel({
          allProduct,
          user,
          amount,
          transactionId,
          address,
          phone,
        });
        let save = await newOrder.save();
        if (save) {
          return res.json({ success: "Order Creada Correctamente" });
        }
      } catch (err) {
        return res.json({ error: error });
      }
    }
  }

  const postUpdateOrder = async(req, res) => {
    let { oId, status } = req.body;
    if (!oId || !status) {
      return res.json({ message: "Campo Requerido" });
    } else {
      let currentOrder = orderModel.findByIdAndUpdate(oId, {
        status: status,
        updatedAt: Date.now(),
      });
      currentOrder.exec((err, result) => {
        if (err) console.log(err);
        return res.json({ success: "Order edita correctamente" });
      });
    }
  }

  const postDeleteOrder = async(req, res) => {
    let { oId } = req.body;
    if (!oId) {
      return res.json({ error: "Campo Requerido" });
    } else {
      try {
        let deleteOrder = await orderModel.findByIdAndDelete(oId);
        if (deleteOrder) {
          return res.json({ success: "Orden eliminada Correctamente" });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  export {
    getAllOrders,
    getOrderByUser,
    postCreateOrder,
    postUpdateOrder,
    postDeleteOrder
  };
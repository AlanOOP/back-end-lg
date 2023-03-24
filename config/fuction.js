import Usuario from "../models/users.js";

export const toTitleCase = function (str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const validateEmail = function (mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  } else {
    return false;
  }
};

export const emailCheckInDatabase = async function (email) {
  let user = await Usuario.findOne({ email: email });
  user.exec((err, data) => {
    if (!data) {
      return false;
    } else {
      return true;
    }
  });
};

export const phoneNumberCheckInDatabase = async function (phoneNumber) {
  let user = await Usuario.findOne({ phoneNumber: phoneNumber });
  user.exec((err, data) => {
    if (data) {
      return true;
    } else {
      return false;
    }
  });
};

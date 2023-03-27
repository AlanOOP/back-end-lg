import { toTitleCase, validateEmail } from '../config/fuction.js';
import bcrypt from 'bcrypt';
import Usuario from "../models/users.js";
import jwt from 'jsonwebtoken';

   
const isAdmin = async(req, res) => {
  let { loggedInUserId } = req.body;
  try {
    let loggedInUserRole = await Usuario.findById(loggedInUserId);
    res.json({ role: loggedInUserRole.userRole });
  } catch {
    res.status(404);
  }
}

const allUser = async(req, res) => {
  try {
    let allUser = await Usuario.find({});
    res.json({ users: allUser });
  } catch {
    res.status(404);
  }
}



/* User Registration/Signup controller  */
const postSignup = async(req , res) => {
  let { name, email, password, cPassword } = req.body;

  let error = {};
  if (!name || !email || !password || !cPassword) {
    error = {
      ...error,
      name: "El campo nombre no debe estar vacío",
      email: "El campo email no debe estar vacío",
      password: "El campo password no debe estar vacío",
      cPassword: "El campo  no debe estar vacío",
    };
    return res.json({ error });
  }
  if (name.length < 3 || name.length > 25) {
    error = { ...error, name: "El nombre debe tener entre 3 y 25 caracteres" };
    return res.json({ error });
  } else {
    if (validateEmail(email)) {
      name = toTitleCase(name);
      if ((password.length > 255) | (password.length < 8)) {
        error = {
          ...error,
          password: "El password debe de ser de 8 Caracteres",
          name: "",
          email: "",
        };
        return res.json({ error });
      } else {
        // If Email & Number exists in Database then:

        try {
          password = bcrypt.hashSync(password, 10);
          const data = await Usuario.findOne({ email: email });
          if (data) {
            error = {
              ...error,
              password: "",
              name: "",
              email: "El email ya existe",
            };
            return res.json({ error });
          } else {
            let newUser = new Usuario({
              name,
              email,
              password,
              // ========= Here role 1 for admin signup role 0 for customer signup =========
              userRole: 0, // Field Name change to userRole from role
            });
            newUser
              .save()
              .then((data) => {
                return res.json({
                  success: "Cuenta Creada Exitosamente , Inicia Sesion",
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      error = {
        ...error,
        password: "",
        name: "",
        email: "Email no Valido",
      };
      return res.json({ error });
    }
  }
}

/* User Login/Signin controller  */

const postSignin = async(req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      error: "El campo  no debe estar vacío",
    });
  }
  try {
    const data = await Usuario.findOne({ email: email });
    if (!data) {
      return res.json({
        error: "Correo o Contraseña Incorrecta",
      });
    } else {
      const login = await bcrypt.compare(password, data.password);
      if (login) {
        const token = jwt.sign(
          { _id: data._id, role: data.userRole },
          "SecretKey"
        );
        const encode = jwt.verify(token, "SecretKey");
        return res.json({
          token: token,
          user: encode,
        });
      } else {
        return res.json({
          error: "Correo o Contraseña Incorrecta",
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
}

export {isAdmin,  allUser, postSignin, postSignup};
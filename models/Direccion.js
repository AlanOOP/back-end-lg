import mongoose from "mongoose";

const  direccionSchema = mongoose.Schema({
    calle : {
        type : String,
    },
    colonia : {
        type : String,
    },
    ciudad : {
        type : String,
    },
    estado : {
        type : String,
    },
})
const { genSalt } = require("bcryptjs");
const mongoose = require("mongoose");
const { type } = require("os");
const { emitWarning } = require("process");
const { stringify } = require("querystring");
const bcrypt = require("bcrypt");

const userschema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    email: {
        type: String,

    },

    phone: {
        type: Number,
    },


    address: {
        type: String,
        required: true
    },


   aadharNumber: {
    type: String,
    required: true,
    unique: true
},

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["admin", "voter"],
        default: "voter"
    },

    isvoted: {
        type: Boolean,
        default: false
    }
});

userschema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next();

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        next();
    } catch (err) {
        next(err);
    }
});

userschema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};


const usermodel = mongoose.model("user", userschema);

module.exports = usermodel;
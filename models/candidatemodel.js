const mongoose = require("mongoose");
const { type } = require("os");
const { emitWarning } = require("process");
const { stringify } = require("querystring");

const candidateschema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    party: {
        type: String,
        required: true
    },


    age: {
        type: Number,
        required: true
    },

    votes: [
        {
            user: {

                type: mongoose.Schema.ObjectId,
                ref: "user",
                required: true
            },

            votesAt: {
                type: Date,
                default: Date.now
            }
        }
    ],

    voteCount : {
        type : Number,
        default : 0
    }

});


const candidateModel = mongoose.model("candidate", candidateschema);

module.exports = candidateModel;

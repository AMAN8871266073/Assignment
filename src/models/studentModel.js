const mongoose = require("mongoose")
const mentorModel = require("./mentorModel")

const ObjectId = mongoose.Schema.Types.ObjectId

const studentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        trim: true,
        required: true
    },
    studentLocation: {
        type: String,
        trim: true,
        required: true
    },
    mentorId:{
        type:ObjectId,
        ref:'mentor'
    }
}, { timestamps: true })



module.exports = mongoose.model('student', studentSchema)
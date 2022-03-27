const mongoose = require("mongoose")

const mentorSchema = new mongoose.Schema({
    mentorName: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    mentorLocation: {
        type: String,
        trim: true,
        required: true
    }
}, { timestamps: true })



module.exports = mongoose.model('mentor', mentorSchema)
const mentorModel = require("../models/mentorModel")
const studentModel = require("../models/studentModel")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

const validate = require("../utils/validate")

const registerStudent = async function (req, res) {
    try {

        if (!(validate.isValidRequestBody(req.body))) {
            return res.status(400).send({
                status: false,
                'message': 'invalid request'
            })
        }

        let studentObj = {}

        let { studentName, studentLocation, mentorId } = req.body

        if (!(validate.isValidString(studentName))) {
            return res.status(400).send({
                status: false,
                'message': "invalid name"
            })
        }

        studentObj['studentName'] = studentName.trim()


        if (!(validate.isValidString(studentLocation))) {
            return res.status(400).send({
                status: false,
                'message': "invalid Location"
            })
        }

        studentObj['studentLocation'] = studentLocation.trim()

        if (!(ObjectId.isValid(mentorId))) {
            return res.status(400).send({
                status: false,
                'message': "invalid mentor id"
            })
        }

        studentObj['mentorId'] = mentorId.trim()



        let isMentorExist = await mentorModel.findById({ _id: studentObj.mentorId })

        if (!isMentorExist) {
            return res.status(404).send({
                status: false,
                'message': `mentor doesnot exist with mentorId :${mentorId}`
            })
        }

        let savedStudent = await studentModel.create(studentObj)
        if (savedStudent) {
            return res.status(201).send({
                status: true,
                'student': savedStudent
            })
        }

        let savedMentor = await mentorModel.create(requestBody)

        if (savedMentor) {
            return res.status(201).send({
                status: true,
                'mentor': savedMentor
            })
        }
    } catch (err) {
        console.log(err)
    }
}



module.exports = { registerStudent }
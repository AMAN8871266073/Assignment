const mentorModel = require("../models/mentorModel")
const studentModel = require("../models/studentModel")

const validate = require("../utils/validate")

const registerMentor = async function (req, res) {
  try {
    let requestBody = req.body
    if (!(validate.isValidRequestBody(requestBody))) {
      return res.status(400).send({
        status: false,
        'message': 'invalid request'
      })
    }

    let mentorName = requestBody.mentorName.trim()
    let mentorLocation = requestBody.mentorLocation.trim()

    if (!(validate.isValidString(mentorName))) {
      return res.status(400).send({
        status: false,
        'message': "invalid name"
      })
    }

    if (!(validate.isValidString(mentorLocation))) {
      return res.status(400).send({
        status: false,
        'message': "invalid Location"
      })
    }

    let isNameAlreadyExist = await mentorModel.findOne({
      mentorName: mentorName
    })

    if (isNameAlreadyExist) {
      return res.status(400).send({
        status: false,
        'message': `Mentor name already exist with name :${mentorName}`
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

const mentorList = async function (req, res) {
  try {
    let query=req.query
    if (Object.keys(query).length == 0) {
      console.log('1')
      let mentList = await mentorModel.find().select({ createdAt: 0, updatedAt: 0 })
      if (mentList.length == 0) {
        return res.status(404).send({
          status: false,
          'message': "No mentor found"
        })
      }

      var array = []


      for (let i = 0; i < mentList.length; i++) {
        var obj = {}
        obj['mentor'] = mentList[i]
        var studentList = await studentModel.find({ mentorId: mentList[i]._id }).select({ createdAt: 0, updatedAt: 0 })
        obj['student'] = studentList
        array.push(obj)

      }
      console.log(array)
      return res.status(200).send({
        status: true,
        'result': array
      })
    }
    let {mentorName,mentorLocation,mentorId,studentName,studentLocation,studentId,smentorId}=query
    let mentorFilter={}
    let studentFilter={}
    if(mentorName){
      mentorFilter['mentorName']=mentorName.trim()
    }
    if(mentorLocation){
      mentorFilter['mentorLocation']=mentorLocation.trim()
    }
    if(mentorId){
      mentorFilter['mentorId']=mentorId
    }
    if(studentId){
      studentFilter['studentId']=studentId
    }
    if(studentName){
      studentFilter['studentName']=studentName
    }
    if(studentLocation){
      studentFilter['studentLocation']=studentLocation
    }
    if(smentorId){
      studentFilter['mentorId']=smentorId
    }
    if(mentorName||mentorLocation||mentorId) {
      if((studentName||studentLocation||studentId||smentorId)){
        //let arr=[]
        let menList=await mentorModel.find(mentorFilter).select({createdAt:0,deletedAt:0})
        let stuList=await studentModel.find(studentFilter).select({createdAt:0,deletedAt:0})
        let arr=[...menList,...stuList]
        return res.status(200).send({
          status:true,
          "result":arr
        })
      }
      let m_list=await mentorModel.find(mentorFilter).select({createdAt:0,deletedAt:0})
      return res.status(200).send({
        status:true,
        "result":m_list
      })
      
    }
    if((studentName||studentLocation||studentId||smentorId)){
      let stList=await studentModel.find(studentFilter).populate("mentorId")
      return res.status(200).send({
        status:true,
        result:stList
      })
    }

  } catch (err) {
    console.log(err)
  }
}



module.exports = { registerMentor, mentorList }
const express = require("express")

const mentorController = require("../controllers/mentorController")
const studentController = require("../controllers/studentController")

const router = express.Router()

router.post('/mentor/register',mentorController.registerMentor)
router.get('/mentor/list',mentorController.mentorList)



router.post('/student/register',studentController.registerStudent)


module.exports = router
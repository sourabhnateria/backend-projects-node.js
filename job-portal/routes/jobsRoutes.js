import express from 'express'
import userAuth from '../middlewares/authMiddleware.js'
import { createjobController, deletejobController, getjobController, jobstatsController, updatejobController } from '../controllers/jobsController.js'

const router = express.Router()

//routes
//create job || post
router.post('/createjob', userAuth,createjobController)

//get jobs || get
router.get('/getjobs',userAuth, getjobController )

//update jobs || put ||patch
router.put('/updatejob/:id',userAuth, updatejobController)

//delete jobs || delete
router.delete('/deletejob/:id',userAuth, deletejobController)

//jobs stats filter || get
router.get('/jobstats',userAuth, jobstatsController)

export default router
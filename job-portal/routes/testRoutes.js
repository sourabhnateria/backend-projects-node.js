import express from 'express'
import { testpostController } from '../controllers/testController.js'
import userAuth from '../middlewares/authMiddleware.js'

//router object
const router = express.Router()

//routes
router.post('/testpost',userAuth,testpostController)

//export
export default router
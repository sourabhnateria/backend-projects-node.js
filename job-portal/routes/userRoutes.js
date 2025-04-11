import express from 'express'
import userAuth from '../middlewares/authMiddleware.js'
import { getuserController, updateuserController } from '../controllers/userController.js'

//router object
const router = express.Router()

//routes
//get user || get
router.post('/getuser',userAuth,getuserController)
//update user || put
router.put('/update-user',userAuth,updateuserController)

export default router
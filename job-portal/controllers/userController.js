import userModel from "../models/userModel.js"

export const updateuserController = async (req,res,next)=>{
    const {name, email,lastname , location} = req.body
    if(!name|| !email|| !lastname || !location){
        next("please provide all fields")
    }
    const user = await userModel.findOne({_id: req.user.userId})
    user.name =name 
    user.lastname = lastname
    user.email = email
    user.location = location

    await user.save()
    const token = user.createJWT()
    res.status(200).json({user, token});
}    

export const getuserController = async (req,res,next)=>{
    try {
        //find user
        const user = await userModel.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'user not found'
            })
        }
        //hide password
        user.password=undefined
        //response
        res.status(200).send({
            success:true,
            message:'user get successfully',
            user
        })
       } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in get user api',
            error
        })    
       }
}

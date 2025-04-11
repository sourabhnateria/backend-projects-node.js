import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

//schema
const userSchema = new mongoose.Schema({
    name:{type:String, required:[true, 'name is require']},
    lastname:{type:String},
    email:{type:String, required:[true, 'email is require'], unique:true, validate: validator.isEmail},
    password:{type:String, required:[true,'password is require' ], minilength:[6,'password should be atleast 6 character'] },
    location:{type:String, default:'India'},


}, {timestamps:true})
// middleware
userSchema.pre('save',async function(){
    if(!this.isModified) return;
    const salt = await bcrypt.genSalt(10)
    this.password= await bcrypt.hash(this.password, salt);

})

//compare password
userSchema.methods.comparePassword = async function(userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch;
}

//json webtoken
userSchema.methods.createJWT = function(){
    return JWT.sign({userId:this._id},process.env.JWT_SECRET ,{expiresIn:'1d'} )
}
export default mongoose.model('user', userSchema)
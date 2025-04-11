import mongoose from "mongoose"

const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true, 'company name is required '],
    },
    position:{type:String , required:[true, 'job position is required'], maxlength:100},
    status:{type:String,enum:['pending','reject','interview' ], default:'pending'},
    worktype:{type:String,enum:['fulltime', 'parttime','internship','contract'],default:'fulltime'},
    worklocation:{type:String,default:'bhopal', required:[true, 'work location is required ']},
    createdby:{type:mongoose.Types.ObjectId, ref:'user'}
}, {timestamps:true}
);

export default mongoose.model('job',jobSchema)
import jobModel from "../models/jobModel.js"
import mongoose from "mongoose"
import moment from "moment"


// craete job controller
export const createjobController = async (req,res,next)=>{
    const {company , position} = req.body
    if(!company || !position){
        next('please provide all fields')

    }
    req.body.createdby = req.user.userId
    const job = await jobModel.create(req.body)
    res.status(201).json({job});
}

//get job controller
export const getjobController = async (req,res,next)=>{
   const {status , worktype, search, sort} = req.query
   //conditions for searching filters
   const queryObject = {
    createdby : req.user.userId
   }
   //logic filters 
   if(status && status !== 'all'){
    queryObject.status = status 
   }
   if(worktype && worktype !== 'all'){
    queryObject.worktype= worktype
   }
   if(search){
    queryObject.position = {$regex:search ,$options:"i" }
   }
 let queryResult = jobModel.find(queryObject);

   //sorting 
   if(sort === 'latest'){
    queryResult = queryResult.sort('-createdAt');
    }
    if (sort === 'oldest'){
        queryResult = queryResult.sort("createdAt");
    }
    if (sort === 'a-z'){
        queryResult = queryResult.sort("position");
    }
    if (sort === 'z-a'){
        queryResult = queryResult.sort("-position");
    }

    //pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip =(page-1) * limit
    queryResult = queryResult.skip (skip).limit(limit)
    
    //jobs count
    const totaljobs = await jobModel.countDocuments(queryResult)
    const numOfPage = Math.ceil(totaljobs/limit) 
   const jobs = await queryResult;
    // const jobs = await jobModel.find({createdby:req.user.userId})
    res.status(200).json({
        totaljobs,
        jobs,
        numOfPage
    })
}

//update job controller
export const updatejobController = async (req,res, next)=>{
    const {id}= req.params
    const {company , position} = req.body
    //validation
    if(!company || !position){
        next('please provide all fields')
    }
    //find jobs
    const job = await jobModel.findOne({_id:id})
    //validation
    if(!job){
        next(`no jobs found with this id ${id}`)
    }
    if(!req.user.userId=== job.createdby.toString()){
        
        next('you are not authorized to update this job') 
        return    
    }
    const updatejob = await jobModel.findOneAndUpdate({_id:id},req.body,{new:true, runValidators:true})

    // res
    res.status(200).json({updatejob});
}

//delete job controller
export const deletejobController = async(req,res, next)=>{
    const{id} = req.params
    //find job 
    const job = await jobModel.findOne({_id:id})
    //validation
    if(!job){
        next(`no job found with this id ${id}`)
    }
    if(!req.user.userId === job.createdby.toString()){
        noxt('you are not authorize to delete this job')
        return
    }
    await job.deleteOne
    res.status(200).json({message:'success , job deleted!'})
}

//job stats and filter controller
export const jobstatsController = async (req, res)=>{
    const stats = await jobModel.aggregate([
        //search by user jobs
        {
            $match:{
                createdby:new mongoose.Types.ObjectId(req.user.userId)
            }
           
        },
        {
            $group:{
                _id:'$status', count:{$sum:1}
            }  
        }
    ])

    //default stats
    const defaultStats = {
        pending: stats.pending || 0 ,
        reject : stats.reject || 0,
        interview : stats.interview || 0

    }

    //monthly yearly stats
    let monthlyApplication = await jobModel.aggregate([
        {
            $match:{createdby:new mongoose.Types.ObjectId(req.user.userId)}           
        },
        {
            $group:{_id:{year:{$year:'$createdAt'}, month:{$month: '$createdAt'}}, count:{$sum:1}}
        }
    ])
    monthlyApplication = monthlyApplication.map(item =>{const {_id:{year,month},count} = item; 
        const date = moment().month(month-1).year(year).format("MMM Y"); return{date,count}; }).reverse();
    res.status(200).json({ totaljobs:stats.length , defaultStats,monthlyApplication})
}
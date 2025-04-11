import mongoose from "mongoose"

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URl)
        console.log(`connected to mongodb database ${mongoose.connection.host}`)
    } catch (error) {
        console.log('mongodb error ${error}')
    }
};

export default connectDB;
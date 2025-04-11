//api documentation
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from 'swagger-jsdoc'
//packages imports
import express from "express";

import "express-async-errors";
import dotenv from "dotenv"
import cors from "cors";
import morgan from "morgan";

//security packeges
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
// files imports
import connectDB from "./config/db.js";
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js"
import jobsRoutes from "./routes/jobsRoutes.js"

// config dot env
dotenv.config();

// mongodb connection
connectDB();

// swagger api config
//swager api options
const option ={
    definition: {
        openapi:"3.0.0",
    info:{
        title:'job portal application',
        descripion: 'node expressjs job portal application',
    },
    servers: [
        {
            url:"http://localhost:8000"
        },
    ],
   },
  apis:["./routes/*.js"],
};

const spec= swaggerDoc(option)

//rest object
const app = express()

//middlewares
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors())
app.use(morgan('dev'))

//routes
app.use('/api/v1/test',testRoutes)
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/job',jobsRoutes)

//homeroute root
app.use("/api-doc",swaggerUi.serve, swaggerUi.setup(spec));

//validation middleware
app.use(errorMiddleware)

//PORT
const PORT = process.env.PORT || 8000

//listen
app.listen(PORT,()=>{
    console.log(`node server running in ${process.env.DEV_MODE} mode on ${PORT}`);
});
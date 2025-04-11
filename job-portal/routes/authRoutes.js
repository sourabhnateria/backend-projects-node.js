import express from 'express'
import { loginController, registerController } from '../controllers/authController.js'
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs : 15 *60* 1000,// 15 minutes
    max:100, // limit each IP to 100 requests per 'window' (here, per 15 minutes)
    standardHeaders: true, //return rate limit info in the 'ratelimit-*' headers
    legacyHeaders: false,// disable the 'x-ratelimit-*' headers 
});

//router object
const router = express.Router();

//routes

/**
 * @swagger
 * components:
 *  schemas:
 *   user:
 *    type:object
 *    required:
 *      -name
 *      -lastName
 *      -email
 *      -password
 *      -location
 *    properties:
 *       id:
 *        type:string
 *        description: the auto-generated id of user collection
 *       name:
 *        type:string
 *        description: user name
 *       lastName:
 *        type:string
 *        description: user last name
 *       email:
 *        type:string
 *        description: user email address
 *       password:
 *        type:string
 *        description: user password should be greater than 6 character
 *       location:
 *        type:string
 *        description: user location city or country
 *    example: 
 *          id:sdfkjdhfjhs
 *          name: sourabh
 *          lastName:nateria
 *          email:sourabhnateria@gmail.com
 *          password:test@123
 *          location:bhopal
 */

/**
 * @swagger
 * tags:
 *  name:auth
 *  description: authentication apis
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *  post:
 *      summery: register new user
 *      tags: [Auth]
 *      requestbody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/user'
 *      response:
 *          200:
 *              description:user created successfully
 *              content:
 *                  application/jsom:
 *                      schema:
 *                          $ref: '#/components/schemas/user'
 *          500:
 *              description:internal server error
 */

/**
 * @swagger
 * /api/v1/auth/login
 * post:
 *  summary: login page
 *  tags: [auth]
 *  requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schema/user'
 *  response:
 *      200:
 *          description:login successfull
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref:'#/components/schemas/user'
 *      500:
 *          description:something went wrong
 */

//register || post
router.post('/register',limiter, registerController)

// login || post
router.post('/login',limiter, loginController)

//export
export default router
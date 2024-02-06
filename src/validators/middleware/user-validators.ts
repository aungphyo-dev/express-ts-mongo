import { validator } from '../../middlewares/validator';
import { createUserSchema, loginUserSchema } from '../types/user-types';
import {Response,Request,NextFunction } from 'express';

export const registerValidator = (req : Request,res : Response,next : NextFunction)=>validator(req,res,next,createUserSchema)
export const loginValidator = (req : Request,res : Response,next : NextFunction)=>validator(req,res,next,loginUserSchema)

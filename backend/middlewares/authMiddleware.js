import {requireAuth} from '@clerk/express';

export const authenticateUser = (req, res, next) =>{
    try{
        const {userId} = requireAuth(req);
        req.userId = userId;
        next();
    }catch (error){
        res.status(401).json({message:'Unauthorized access'});
    }
}
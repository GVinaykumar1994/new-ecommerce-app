import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//protected routes token base 
//imp in below code next word is used it when sends req means first it goes to next to check authenticate user or not ani then it will send the response
export const requireSignIn = async (req, res, next) => {
  try{
    const decoded = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
  req.user = decoded;
    next();
}catch(error){
    console.log(error);
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};


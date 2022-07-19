const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchasyncerror");
const User = require("../models/userModel");

exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"this is a sample id",
            url:"profilepicUrl"
        },
    });
    const token = user.getJWTToken();
    req.status(201).json({
        success:true,
        token,
    });  
});
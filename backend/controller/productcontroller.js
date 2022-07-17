const Product = require("../models/productmodel");
const ErrorHander = require("../utils/errorhander");

// Only admins can access

exports.createProduct = async(req,res,next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}
// Get all Products

exports.getAllProducts = async (req,res)=>{

    const products = await Product.find();
    res.status(200).json({
        success: true,
        products
    })
}
// Get a Product Details
exports.getProductDetails = async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Product Not Found",404))
    }
    res.status(200).json({
        success:true,
        product
    })

}
//Update Products

exports.updateProduct = async (req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHander("Product Not Found",404))
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        userFindAndModify:false
    });
    res.status(200).json({
        success:true,
        product
    })
}
// Delete Products
exports.deleteProduct = async (req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHander("Product Not Found",404))
    }
    await product.remove();
    res.status(200).json({
        success:true,
        message:"Product Delete Successfully"
    })
}
const catchasyncerror = require("../middleware/catchasyncerror");
const Product = require("../models/productmodel");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHander = require("../utils/errorhander");

// Only admins can access

exports.createProduct = catchasyncerror(async(req,res,next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
});
// Get all Products

exports.getAllProducts =catchasyncerror( async (req,res)=>{
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(),req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        products
    });
});
// Get a Product Details
exports.getProductDetails = catchasyncerror(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Product Not Found",404))
    }
    res.status(200).json({
        success:true,
        product,
        productCount
    });
});
//Update Products

exports.updateProduct =catchasyncerror(async (req,res,next)=>{
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
});
// Delete Products
exports.deleteProduct =catchasyncerror(async (req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHander("Product Not Found",404))
    }
    await product.remove();
    res.status(200).json({
        success:true,
        message:"Product Delete Successfully"
    })
});
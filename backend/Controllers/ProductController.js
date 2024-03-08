const asynchandler = require("../utils/asynchandler") //trycat middleware so that ,ot need to wrap apis in trycat each time, rather just give this middleware-->increase cose readability
const Product=require("../modals/ProductModal")//mpdal imported
const apifeature = require("../utils/apifeatures")
const cloudinary=require("cloudinary")
//product controller will do all thing and give to route

   


//Create product in database by fetching data from frontend  //-->can be accessed by ADMIN only
exports.createProducts=asynchandler(async(req,res,next)=>{   

    //product create krte time ji admin ne bnaaya uska naam save krke rkh do body pe, so every time it got passed
   
    req.body.Fuser=req.userdetails.id; //as we saved complete document in finduser after login . and Fuser is mongodb object(FK) which references with userschema
    //isko humne admin ki id dedi
   //herer we need to upload multiple images in cloudinary
    
    let images=[];

    if(typeof req.body.images==='string'){  //if ek hi image hogi to ek hi url ayega, hence string check
        images.push(req.body.images);
    }
    else{
        images=req.body.images; //else saari daal do  array of images that admin uploaded
    }

    //send this to cloudinary and create links
    let cloudinaryProductImagesLinks=[];

    
    // console.log(req.body)
    for (let i = 0; i < images.length; i++) {
        
        const resultimg=await cloudinary.v2.uploader.upload((images[i]),{
            folder:"product"
        })
        // console.log( images[i])
        cloudinaryProductImagesLinks.push({
            public_id:resultimg.public_id,
            url:resultimg.secure_url
        })
        
    }
    //now save these links and creater database document
    req.body.images=cloudinaryProductImagesLinks
    console.log(cloudinaryProductImagesLinks)

    // console.log(req.body)

    const product=await Product.create(req.body)

    res.status(201).json({
        success:true,
        product
    })

})

//get all products


exports.getProducts=asynchandler(async(req,res,next)=>{

    
// now getapi with search filter pagination features
    const kitnaperpage=4;  
    const productCount=await Product.countDocuments()
    // const Apifeature=new apifeature(Product.find(),req.query).search().filter().pagination(kitnaperpage)  //pagination then filter tehn search has more priority
    // const Apifeature=new apifeature(Product.find(),req.query).search().filter().pagination(kitnaperpage)
    //pagination baad me lgaya , kyuki we want ki pehle filter workkre then pagination aaye
    const ApiFeature = new apifeature(Product.find(), req.query).search().filter();

    

    
    let fetchedProduct = await ApiFeature.query;
    let filteredProductsCount = fetchedProduct.length;  //filter lgaane ke baad kitne product hain
    
    ApiFeature.pagination(kitnaperpage);
    
    
    // fetchedProduct=await ApiFeature.query //ye error de rha, but its must for filter and pagination handling

    res.status(200).json({
        success:true,
        fetchedProduct,
        productCount,
        kitnaperpage, 
        filteredProductsCount
    })
    // next()
})  



  
//get all products(admin)


exports.getAdminProducts=asynchandler(async(req,res,next)=>{
        console.log("hi")
    const products = await Product.find();
      res.status(200).json({
            success:true,
            products
        })
       
    })  
    
    
//Update the Product  :ADMIN

exports.updateProducts=asynchandler(async(req,res,next)=>{
    
   
        let products=await Product.findById(req.params.id)
        
        if(!products){
            return res.status(500).json({success:false,message:"Product not found"})
        }

        products=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false})  
        //on setting new to true updated document will be returned as response
        res.status(200).json({
            success:true,
            products
        })
        
   
})

//Delete the product --> ADMIN

exports.deleteProducts=asynchandler(async(req,res,next)=>{

    
    const product = await Product.findById(req.params.id);



        if(!product){
            return res.status(500).json({success:false,message:"Product not found"})
        }
        // console.log(req.params.id)
        // console.log(id)

        // Deleting Images From Cloudinary
            for (let i = 0; i < product.images.length; i++) {
                await cloudinary.v2.uploader.destroy(product.images[i].public_id);
            }
            
        await Product.deleteOne({_id:req.params.id})
        // await product.remove();
        res.status(200).json({
            status:true,
            message:"Deleted Successfully"
        })
})

//get a particular product details



exports.getParticularProduct=asynchandler(async(req,res,next)=>{
    const fetchedProduct=await Product.find({_id:req.params.id});
    
    if(!fetchedProduct){
        return res.status(500).json({success:false,message:`Product not found`})
    }
    res.status(200).json({
        success:true,
        fetchedProduct
    })
});

//Reviews 

exports.Reviews=asynchandler(async(req,res,next)=>{
    const{rating,comments,productId}=req.body
    //user is already logined -->we can access him from req.findUser
    const product=await Product.findById(productId)
    const rev={
        Fuser:req.finduser._id,
        rating:Number(rating),
        name:req.finduser.name,
        comment:comments
    }
    // console.log(comments)
    const userAlreadyGivenReview = product.reviews.find(searchh=> searchh.Fuser.toString()===req.finduser._id)

    if(userAlreadyGivenReview){
        for(let i=0;i<product.reviews.length;i++){
            if(product.reviews[i].Fuser.toString()===req.finduser){
                product.reviews[i]=rev
            }
        }
    }
    else{
        product.reviews.push(rev)
       
        
    }
    product.numOfReviews=product.reviews.length
    let averageRating=0;
    for(let i=0;i<product.numOfReviews;i++){
        averageRating+=product.reviews[i].rating
    }
    
    averageRating=averageRating/(product.reviews.length)
   
    product.rating=averageRating
    await product.save({validateBeforeSave:false})

    res.status(200).json({
        success:true,
        
    })

})
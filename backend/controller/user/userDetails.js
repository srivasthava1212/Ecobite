const userModel = require("../../models/userModel")

const userDetails = async (req,res)=>{

    try{
        const id = req.userId
       const user = await userModel.findById(id)

       res.status(200).json({
        data:user,
        error:false,
        success:true,
        message:"User Details"
       })

       

    }catch(error){
        res.status(400).json({
            message: error.message|| error,
            error: true,
            success: false
        }) 
    }
    

}
module.exports = userDetails 
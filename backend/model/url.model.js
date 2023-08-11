const mongoose=require("mongoose")

const urlSchema=new mongoose.Schema({
    shortId:{
       type:String,
       required:true,
       unique:true
    },
    redirectURL:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
},{
    versionKey:false
})

const urlModel=mongoose.model("url",urlSchema)

module.exports={
    urlModel
}
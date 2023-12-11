const mongoose=require('mongoose')
const SignupSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        
    },
    Password:{
        type:String,
        required:true,
        
        
    }
},{collection:'Signup'})

module.exports = mongoose.model('Signup',SignupSchema)
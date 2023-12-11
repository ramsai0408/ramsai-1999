const mongoose=require('mongoose')
const ExpenseSchema=new mongoose.Schema({
    month:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
       
    },
    expense:{
        type:Number,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    } 
},{collection:'Expense'})

module.exports = mongoose.model('Expense',ExpenseSchema)
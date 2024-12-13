const { Schema, model } = require('../connection');


const mySchema = new Schema ({
    username:{type:String, required:true},
    profile:String,
    createdAt:{type:Date, default:Date.now}
})

module.exports=model( 'profile', mySchema );
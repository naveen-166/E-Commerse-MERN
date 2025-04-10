const mongoose=require('mongoose');
const mongourl='mongodb://localhost:27017'
mongoose.connect(mongourl).then(()=>console.log("Database Connected")).catch(err=>{console.log(err)});
const mongooose=require('mongoose')

const connectDB=async()=>{
    try{
        await mongooose.connect(process.env.MONGO_URL,{});
        console.log("MongoDB Connected");
    }catch(err){
        console.error("Error connecting to MongoDB",err);
        process.exit(1);
    }
}

module.exports=connectDB;
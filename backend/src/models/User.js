import mongoose from "mongoose";

const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    profileImage:{
        type:String,
        default:" ",
    },
    clerkId:{
        type:String,
        required:true,
        unique:true,
    },
}
,{timestamps:true}   //createdAt updatedAt ye 2 fields automatically add ho jate hain
);

const User=mongoose.model('User',UserSchema);

export default User;
import {Inngest} from 'inngest';
import { connectDB } from './db';
import User from '../models/User';

export const inngest = Inngest({ id:"my-app"})  // it allows .createFunction and more like that

const syncUser = inngest.createfunction(
    {id:"sync-user"},
    {event:"clerk/user.created"},
    

    async({event})=>{
      await connectDB();
      const {first_name,last_name,id,email_addresses,image_url}=event.data;

      const new_user={
        name:`${first_name}` + ` ${last_name}`,
        email:email_addresses[0].email_address,
        profileImage:image_url,
        clerkId:id,
      }
    await User.create(new_user)
    }   
)

const deleteUser = inngest.createfunction(
    {id:"delete-user"},
    {event:"clerk/user.deleted"},

    async({event})=>{
        await connectDB();
        const {id}=event.data;
        await User.deleteOne({clerkId:id});
    }
)

export const userFunctions=[syncUser,deleteUser];
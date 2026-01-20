import {Inngest} from 'inngest';
import { connectDB } from './db.js';
import User from '../models/User.js';
import { upsertStreamUser, deleteStreamUser } from './stream.js';

export const inngest = new Inngest({ id:"my-app"})  // it allows .createFunction and more like that

const syncUser = inngest.createFunction(
    {id:"sync-user"},
    {event:"clerk/user.created"},
    

    async({event})=>{
      await connectDB();
      const {first_name,last_name,id,email_addresses,image_url}=event.data;

      const new_user={
        clerkId: id,
        email: email_addresses[0]?.email_address,
        name: `${first_name || ""} ${last_name || ""}`,
        profileImage: image_url,
      }
    await User.create(new_user);

    await upsertStreamUser({
      id: new_user.clerkId.toString(),
      name: new_user.name,
      image: new_user.profileImage,
    })
    }   
)

const deleteUser = inngest.createFunction(
    {id:"delete-user"},
    {event:"clerk/user.deleted"},
    
    async({event})=>{
        await connectDB();
        const {id}=event.data;
        await User.deleteOne({clerkId:id});
        console.log("User deleted from DB");
        await deleteStreamUser(id.toString());
    }
)

export const userFunctions=[syncUser,deleteUser];
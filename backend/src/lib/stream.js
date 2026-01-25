import {StreamChat} from 'stream-chat';
import {StreamClient} from '@stream-io/node-sdk';
import ENV from './env.js';


const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

console.log(apiKey,apiSecret);

if(!apiKey || !apiSecret){
    throw new Error("STREAM_API_KEY and STREAM_API_SECRET are required");
}


export const chatClient = new StreamChat(apiKey, apiSecret);  //for chat operations
export const streamClient = new StreamClient(apiKey, apiSecret); //for video_calling operations



export const upsertStreamUser = async(userData) =>{
  try{
  await chatClient.upsertUser(userData);
  console.log("Stream user created or updated successfully:",userData);
  }
  catch(error){
    console.log("Error in creating stream user token",error);
}
}
 


export const deleteStreamUser = async(userId) =>{
  try{
  await chatClient.deleteUser(userId);
  console.log("Stream user deleted successfully:",userId);
  }
  catch(error){
    console.log("Error in deleting stream user token",error);
}
}
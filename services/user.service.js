
import { email } from "zod";
import User from "../models/user.js"
import Post from "../models/post.js"




export const deleteUserService = async (id) => {
  try {
    const result = await User.findByIdAndDelete(id);
    return result ? true : false;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
};

export const getUsersService = async ()=>{
    const users = await User.find({isActive:true}).limit(2).skip(1);//sort by createdAt in descending order
    return users
}


export const createUserService=async(name,email,password,role)=>{
    console.log("processsing data in service");
    
  //   const newUser = {
  //   id: Date.now().toString(),
  //   email:email,
  //   name:name,
  // };
   const newUser = await User.create({
    name,
    email,
    password,
    role
  });

  // users.push(newUser);
  console.log("users created",newUser);
  return newUser;
}

// let user = createUserService("aniket","ajsah2@gmail.com");
// console.log("users detail pushing ",user);


export const updateUserService =async(id,data)=>{
   const updateData  = await User.findByIdAndUpdate(
    id,
    {$set:data},
    {
      new:true,
      runValidators: true
    }

   )
   return updateData;
}

 export const findByEmailAndUpdate = async (email, updateData) => {
  return await User.findOneAndUpdate(
    { email },
    updateData,
    { new: true }
  );
};

export const deleteByEmail = async (email)=>{
  return await User.findOneAndDelete({email});
}

export const createPostService = async(title,content,user)=>{
  const postData = await Post.create({
    title:title,
    content:content,
    user:user
  });
  return postData;
}

//get all posts of a user
export const getPostService = async ()=>{
  const postData = await Post.find().populate("user","name email");
  return postData;
}
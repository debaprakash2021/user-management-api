
import { createUserService,
        getUsersService ,
        updateUserService , 
        findByEmailAndUpdate,
        deleteByEmail,
        deleteUserService,
        createPostService,
        getPostService
      } from "../services/user.service.js";



export const getUsers = async (req, res) => {
  // const {token} = req.headers
  // console.log("req",req);
  // console.log("token",token)

  const users = await getUsersService();
  console.log("getting users",users,typeof users);
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
};

// export const createUser = (req, res) => {
//   try {
//     const { name, email } = req.body;

//     // // VALIDATION
//     // if (!name || !email) {
//     //   return res.status(400).json({
//     //     success: false,
//     //     message: "Name and email are required"
//     //   });
//     // }

//     const newUser = {
//       id: Date.now().toString(),
//       name,
//       email
//     };

//     users.push(newUser);

//     res.status(201).json({
//       success: true,
//       data: newUser
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };


export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const user = await updateUserService(id, updateData);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

//service code
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteUserService(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(204).send();

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};




// SERVICE LOGIC

// export const deleteUser = (req, res) => {
//   const deleted = deleteUserService(req.params.id);

//   if (!deleted) {
//     return res.status(404).json({
//       success: false,
//       message: "User not found"
//     });
//   }

//   res.status(204).send();
// };

export const createUser = async (req, res) => {
  const {email,name,password,role}=req.body;
  
  const userBody =await createUserService(name,email,password,role);
  
  res.status(201).json({
    success: true,
    data: userBody
  });
};



export const patchUser = async (req,res)=>{
  const user = await updateUserService(req.params.id, req.body);

  res.json({
    success: true,
    data: user
  });
}

export const isActive = async (req,res)=>{
    const users = await isActive();
    res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
}


 export const updateUserByEmail = async (req, res) => {
  const { email, updateData } = req.body;

  const updatedUser = await findByEmailAndUpdate(email, updateData);

  res.status(200).json({
    success: true,
    data: updatedUser
  });
};


export const deleteUserByEmail = async(req,res)=>{
  const {email} = req.body;
  // if mail does not exist in the input field
  if(!email){
    res.status(400).json({
      success:false,
      message:"Email is Required !"
    })
  } 
    // now call the delete function from service folder
    const deleteUser = await deleteByEmail(email);

    if(deleteUser===false){
      res.status(400).json({
        success:false,
        message:"User not found in Database"
      })
    }

    res.status(200).json({
      data:deleteUser,
      success:true,
      message:"User Deleted Successfully"
    })

}


export const createPost = async (req,res)=>{
  const {title,content,user} = req.body;
  const postService = await createPostService(title,content,user);
  if(!postService){
    res.status(400).json({
      success:false,
      message:"Post not created"
    })
  }
  res.status(201).json({
    success:true,
    data:postService
  })

}

export const getPost = async (req,res)=>{
  const postData = await getPostService();
  if(!postData){
    res.status(400).json({
      success:false,
      message:"Post not found"
    })
  }
  res.status(200).json({
    success:true,
    data:postData
  })
}
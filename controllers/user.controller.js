import { users } from '../data/user.js';
import { createUserService } from '../services/user.services.js';


export const getUsers = (req, res) => {
    const {token} = req.headers;
    console.log("Token from header:", token);
    try{
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
        
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}




export const createUser = (req, res) => {
    try{
        const { name, age, email } = req.body;
        const userBody = createUserService(name, email, age);
        
        if(!userBody.success){
            return res.status(400).json({
                 message: userBody.message
                 });
        }
        const newUser = {
            id: Date.now().toString(),
            name,
            age,
            email
        };
        users.push(newUser); // Save the new user to the in-memory array
        res.status(201).json({
            message: "User created successfully",
            data: newUser                                 
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message        // Internal Server Error
        });
    }
}



//delete user
export const deleteUser = (req, res) => {
    try{
        const { id } = req.params;
        const userIndex = users.findIndex(u => u.id === id);
        if(userIndex === -1){
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }
        users.splice(userIndex, 1);
        res.status(204).send();

    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


// update user
export const updateUser = (req, res) => {
    try{
        const { id } = req.params;
        const { name, age, email } = req.body;
        const user = users.find(u => u.id === id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }
        if(name) user.name = name;
        if(age) user.age = age;
        if(email) user.email = email;
        res.status(200).json({
            success: true,
            message: "User Updated Successfully",
            data: user
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "User Not Found"
        });
    }
}

//getuser by id

export const getUserById = (req, res) => {
    try{
        const { id } = req.params;
        const user = users.find(u => u.id === id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


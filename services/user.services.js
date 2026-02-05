import { users } from '../data/user.js';

export const createUserService = (name, email, age) => {
    try{
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            age
        }
        users.push(newUser);
        return {
            newUser,
            success: true
        }
        // res.status(201).json({
        //     success: true,
        //     message: "User created successfully",
        //     data: newUser
        // });
    }
    catch(error){
        return {
            success: false,
            message: "Error while creating user: " + error.message
        };
    }
}

export const deleteUser = (id) => {
    try{
        const userIndex = users.findIndex(u => u.id === id);
        if(userIndex === -1){
            return {
                success: false,
                message: "User Not Found"
            };
        }
        users.splice(userIndex, 1);
        return {
            success: true,
            message: "User deleted successfully"
        };
    }
    catch(error){
        return {
            success: false,
            message: "Error while deleting user: " + error.message
        };
    }
}
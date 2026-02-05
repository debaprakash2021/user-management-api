export const validateCreateUser = (req, res, next) => {
    console.log("USING DTO TO CHECK DATA VALIDATION");

    const { name, email, age } = req.body;

    if(!name || !email || !age){
        return res.status(400).json({
            success: false,
            message: "Name , Email and Age are required"

        });
    }
    else{
        if(typeof name !== 'string' || typeof email !== 'string' || typeof age !== 'number'){
            return res.status(400).json({
                success: false,
                message: "Invalid data types for name, email, or age"
            });
        }
    }
    next();
}
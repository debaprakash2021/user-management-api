let success = true;

export const checkAuth = (req,res,next) =>{
    if(success){    
        console.log("Authentication Checked");
        next();
    }
    else{
        console.log("Authentication Failed");
        res.status(401).json({
            success:false,
            message: "Unauthorized , name , mail , age , required"
        })
    }
}

export const validateUserId = (req,res,next) =>{
    const {id} = req.params;
    if(!id || id.length < 5){
        return res.status(400).json({
            success:false,
            message: "Invalid User ID"
        })
    }
    next();
};



// console.log(checkAuth);
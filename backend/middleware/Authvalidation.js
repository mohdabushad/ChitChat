const Joi = require('joi')

const signupValidation=(req,res,next)=>{
    const shema = Joi.object({
        username: Joi.string()
            .min(2)
            .max(30)
            .pattern(/^@[a-zA-Z0-9._]+$/)
            .required()
            .messages({
                'string.pattern.base': 'Username must start with @ and contain only letters, numbers, . or _'
            }),


        name: Joi.string().min(3).max(10).required(),
        email: Joi.string().email().required(),
       password: Joi.string().min(3).max(100).required()

    });
    const { error } = shema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "bad request", error })
    
    }
    next()
}

const loginValidation = (req, res, next) => {
    const shema = Joi.object({
   
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(100).required()

    });
    const { error } = shema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "bad request", error })
        
    }
    next()
}
module.exports={
    signupValidation,loginValidation
}


const Joi = require("joi");


function validateStore(body){
    const storeSchema = Joi.object({
        name:Joi.string().required(),
        address:Joi.string().required(),
        description:Joi.string().required(),
        contactDetail:Joi.object({
            phoneNumber: Joi.string().required(),
            twitter: Joi.string().required(),
            email: Joi.string().required(),
        }),
        storeKeeper: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    });

    return storeSchema.validate(body)
}


module.exports = {
    validateStore
}
const Joi = require("joi");


function validateBook(body){
    const bookSchema = Joi.object({
        name:Joi.string().required(),
        description:Joi.string().required(),
        book:Joi.string().required(),
        isbn:Joi.string().required(),
        releaseDate:Joi.date().required(),
        author: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    });

    return bookSchema.validate(body)
}


module.exports = {
    validateBook
}
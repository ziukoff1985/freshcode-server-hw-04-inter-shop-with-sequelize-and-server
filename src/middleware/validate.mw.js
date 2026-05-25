function validateBody(schema) {
    return async (req, res, next) => {
        const { body } = req;
        try {
            const validatedBody = await schema.validate(body, {
                abortEarly: false,
            });
            req.body = validatedBody;
            next();
        } catch (error) {
            next(error);
        }
    };
}

module.exports = validateBody;

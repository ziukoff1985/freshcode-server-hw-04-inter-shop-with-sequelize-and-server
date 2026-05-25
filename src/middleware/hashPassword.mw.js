const bcrypt = require('bcrypt');

module.exports.hashPassword = async (req, res, next) => {
    try {
        const { password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        next();
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

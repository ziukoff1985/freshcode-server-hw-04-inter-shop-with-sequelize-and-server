const { PAGINATION_VALIDATION_SCHEMA } = require('../utils/validationSchemas');

module.exports.paginateElements = async (req, res, next) => {
    const { page, results } = req.query;

    const defaultPagination = {
        limit: 10,
        offset: 0,
    };

    const validLimit =
        parseInt(results, 10) > 0
            ? parseInt(results, 10)
            : defaultPagination.limit;
    const validPage = parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;

    const pagination = {
        limit: validLimit,
        offset: (validPage - 1) * validLimit,
    };

    try {
        if (await PAGINATION_VALIDATION_SCHEMA.isValid(pagination)) {
            req.pagination = pagination;
        } else {
            req.pagination = defaultPagination;
        }
        next();
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

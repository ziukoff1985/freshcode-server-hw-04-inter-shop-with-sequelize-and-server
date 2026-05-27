const { PAGINATION_VALIDATION_SCHEMA } = require('../utils/validationSchemas');

module.exports.paginateElements = async (req, res, next) => {
    const { page, results } = req.query;

    const defaultPagination = {
        limit: 10,
        offset: 0,
    };

    const pagination = {
        limit: +results || defaultPagination.limit,
        offset: (+page - 1) * +results || defaultPagination.offset,
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

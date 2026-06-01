const { ValidationError } = require('yup');
// -------------------------------
const validationErrorHandler = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        return res.status(400).send({
            errors: [
                {
                    title: 'Validation Error',
                    detail: err.errors,
                },
            ],
        });
    }

    next(err);
};

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return;
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).send({
            errors: [
                {
                    title: 'Duplicate Error',
                    detail: err?.original?.detail,
                },
            ],
        });
    }

    res.status(err?.status ?? 500).send({
        errors: [
            {
                title: err?.message ?? 'Internal Server Error',
            },
        ],
    });
};

module.exports = {
    validationErrorHandler,
    errorHandler,
};

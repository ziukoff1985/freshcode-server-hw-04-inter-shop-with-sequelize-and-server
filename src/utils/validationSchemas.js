const yup = require('yup');

// General schemas
const TITLE_NAME_CODE_SCHEMA = yup.string().trim().min(2).max(100).required();

const DESCRIPTION_SCHEMA = yup.string().trim().max(255).nullable();

const ID_SCHEMA = yup.string().trim().required();

// Entities schemas
const BRAND_VALIDATION_SCHEMA = yup.object().shape({
    title: TITLE_NAME_CODE_SCHEMA,
    description: DESCRIPTION_SCHEMA,
});

const CUSTOMER_VALIDATION_SCHEMA = yup.object().shape({
    name: TITLE_NAME_CODE_SCHEMA,
    email: yup.string().trim().email().required(),
    password: yup.string().trim().min(6).max(100).required(),
});

const ITEM_CATEGORY_VALIDATION_SCHEMA = yup.object().shape({
    title: TITLE_NAME_CODE_SCHEMA,
    description: DESCRIPTION_SCHEMA,
});

const ITEM_TYPE_VALIDATION_SCHEMA = yup.object().shape({
    title: TITLE_NAME_CODE_SCHEMA,
    description: DESCRIPTION_SCHEMA,
});

const ITEM_VALIDATION_SCHEMA = yup.object().shape({
    categoryTitle: ID_SCHEMA,
    typeTitle: ID_SCHEMA,
    brandTitle: ID_SCHEMA,
    modelTitle: ID_SCHEMA,
    price: yup.number().positive('Price must be a positive number').required(),
    storeTitle: ID_SCHEMA,
    amount: yup
        .number()
        .integer('Amount must be an integer')
        .positive('Amount must be a positive number')
        .nullable(),
});

const MODEL_VALIDATION_SCHEMA = yup.object().shape({
    title: TITLE_NAME_CODE_SCHEMA,
    description: DESCRIPTION_SCHEMA,
    brandId: ID_SCHEMA,
});

const ORDER_VALIDATION_SCHEMA = yup.object().shape({
    code: TITLE_NAME_CODE_SCHEMA,
    date: yup.date(),
    amount: yup
        .number()
        .integer('Amount must be an integer')
        .positive('Amount must be a positive number')
        .required(),
    paid: yup.boolean(),
    customerId: ID_SCHEMA,
});

const STORE_VALIDATION_SCHEMA = yup.object().shape({
    title: TITLE_NAME_CODE_SCHEMA,
    description: DESCRIPTION_SCHEMA,
});

module.exports = {
    BRAND_VALIDATION_SCHEMA,
    CUSTOMER_VALIDATION_SCHEMA,
    ITEM_CATEGORY_VALIDATION_SCHEMA,
    ITEM_TYPE_VALIDATION_SCHEMA,
    ITEM_VALIDATION_SCHEMA,
    MODEL_VALIDATION_SCHEMA,
    ORDER_VALIDATION_SCHEMA,
    STORE_VALIDATION_SCHEMA,
};

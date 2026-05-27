const yup = require('yup');

// General schemas
const TITLE_NAME_CODE_SCHEMA = yup.string().trim().min(2).max(100).required();

const DESCRIPTION_SCHEMA = yup.string().trim().max(255).nullable();

const REQUIRED_STRING_SCHEMA = yup.string().trim().required();

const PAGINATION_VALIDATION_SCHEMA = yup.object().shape({
    limit: yup.number().integer().min(1).max(100).required(),
    offset: yup.number().integer().min(0).required(),
});

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
    categoryTitle: REQUIRED_STRING_SCHEMA,
    typeTitle: REQUIRED_STRING_SCHEMA,
    brandTitle: REQUIRED_STRING_SCHEMA,
    modelTitle: REQUIRED_STRING_SCHEMA,
    price: yup.number().positive('Price must be a positive number').required(),
    storeTitle: REQUIRED_STRING_SCHEMA,
    amount: yup
        .number()
        .integer('Amount must be an integer')
        .positive('Amount must be a positive number')
        .nullable(),
});

const MODEL_VALIDATION_SCHEMA = yup.object().shape({
    title: TITLE_NAME_CODE_SCHEMA,
    description: DESCRIPTION_SCHEMA,
    brandTitle: REQUIRED_STRING_SCHEMA,
});

const ORDER_VALIDATION_SCHEMA = yup.object().shape({
    code: TITLE_NAME_CODE_SCHEMA,
    paid: yup.boolean(),
    customerName: REQUIRED_STRING_SCHEMA,
    items: yup
        .array()
        .of(yup.number())
        .min(1, 'Order must contain at least one item')
        .required(),
});

const STORE_VALIDATION_SCHEMA = yup.object().shape({
    title: TITLE_NAME_CODE_SCHEMA,
    description: DESCRIPTION_SCHEMA,
});

// Specific schemas
const BRAND_TITLES_SCHEMA = yup.object().shape({
    brandTitles: yup
        .array()
        .of(yup.string().trim().min(1))
        .min(1, 'At least one brand title is required')
        .required('Brand titles are required'),
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
    PAGINATION_VALIDATION_SCHEMA,
    BRAND_TITLES_SCHEMA,
};

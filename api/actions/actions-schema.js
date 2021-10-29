const yup = require('yup');

const actionsSchema = yup.object().shape({
    project_id: yup
        .number()
        .required('Must provide a relevant project id'),
    description: yup
        .string()
        .required()
        .max(128, 'Description cannot be more than 128 characters long'),
    notes: yup
        .string()
        .required('Must provide some notes'),
})

module.exports = actionsSchema;
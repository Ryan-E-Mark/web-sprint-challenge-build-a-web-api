const yup = require('yup');

const projectsSchema = yup.object().shape({
    name: yup
        .string()
        .required('Must provide a project name'),
    description: yup
        .string()
        .required('Must provide a project description'),
});

const updatedProjectSchema = yup.object().shape({
    name: yup
        .string()
        .required('Must provide a project name'),
    description: yup
        .string()
        .required('Must provide a project description'),
    completed: yup
        .boolean()
        .required('Must provide updated completion value'),
});

module.exports = {
    projectsSchema,
    updatedProjectSchema
}

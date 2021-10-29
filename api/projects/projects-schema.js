const yup = require('yup');

const projectsSchema = yup.object().shape({
    name: yup
        .string()
        .required('Must provide a project name'),
    description: yup
        .string()
        .required('Must provide a project description'),
})

module.exports = projectsSchema;

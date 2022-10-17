import * as yup from "yup";

export const questionSchema = yup.object().shape({
  question: yup.string()
    .required('Question is required')
    .min(40, 'Question must be at least 40 characters'),
  answer: yup.string()
    .required('Answer is required')
    .min(40, 'Answer must be at least 40 characters')
    .url(),
});

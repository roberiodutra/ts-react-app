import * as yup from "yup";

export const questionSchema = yup.object().shape({
  question: yup
    .string()
    .required("Question is required")
    .min(10, "Question must be at least 10 characters"),
  answer: yup
    .string()
    .required("Answer is required")
    .min(10, "Answer must be at least 10 characters")
    .url(),
});

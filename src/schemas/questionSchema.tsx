import * as yup from "yup";

export const questionSchema = yup.object().shape({
  question: yup
    .string()
    .required("Question is required")
    .min(20, "Question must be at least 20 characters"),
  answer: yup
    .string()
    .required("Answer is required")
    .min(20, "Answer must be at least 20 characters")
    .url(),
});

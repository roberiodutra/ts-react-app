import * as yup from "yup";

export const registerSchema = yup.object().shape({
  firstName: yup.string()
    .required('First name is required')
    .min(6, 'First name must be at least 6 characters')
    .max(20, 'First name must not exceed 20 characters'),
  lastName: yup.string()
    .required('Last name is required')
    .min(6, 'Last name must be at least 6 characters')
    .max(20, 'Last name must not exceed 20 characters'),
  email: yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
  confirmPassword: yup.string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Confirm Password does not match'),
});

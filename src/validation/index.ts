import * as yup from "yup"
export const registerSchema = yup
  .object({
    username: yup.string().required("username field is required").min(5,'username field is less then 5 char'),
    email: yup.string().required('email field is required').matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,'email field is not valid'),
    password: yup.string().required('password field is required').min(6,'password field is less then 6 char'),
    name: yup.string().required('name field is required').min(4,'name field is less then 4 char'),
    address: yup.string().min(10,'address field is less then 10 char')
  })
  .required()

  export const loginSchema = yup
  .object({
    username: yup
      .string()
      .required("Username is required")
      .min(5, "Username must be at least 5 characters long"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password should be at least 6 charachters."),
  })
  .required();

 
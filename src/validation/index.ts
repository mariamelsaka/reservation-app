import * as yup from "yup"
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

 
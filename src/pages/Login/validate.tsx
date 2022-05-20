import * as yup from "yup";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const validationSchema = (values:any) =>
  yup.object().shape({
    userName: yup
      .string()
      .required("Enter your username"),
    passWord: yup
      .string()
      .required("No password provided")
  });

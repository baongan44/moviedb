import * as yup from "yup";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const validationSchema = (values:any) =>
  yup.object().shape({
    name: yup
      .string()
      .min(2, "Mininum 2 charactors")
      .max(50, "Maximum is 10 charactors")
      .required("Enter your name"),
      description: yup
      .string()
      .max(200, "Maximum is 200 charactors")
  });

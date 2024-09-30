import * as Yup from "yup";

export const createMenuItemValidationSchema = Yup.object().shape({
  description: Yup.string(),
  depth: Yup.number().required("Depth is required"),
  parent: Yup.number()
    .nullable()
    .transform((_, val) => (val === Number(val) ? val : null)),
  name: Yup.string().required("Name is required"),
});

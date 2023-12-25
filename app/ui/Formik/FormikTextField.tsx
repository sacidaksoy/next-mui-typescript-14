import { TextField, type TextFieldProps } from "@mui/material";
import { useFormikContext } from "formik";

type FormikTextFieldProps = {
  id: string;
  name: string;
} & TextFieldProps;

const FormikTextField = ({
  id,
  name,
  children,
  ...rest
}: FormikTextFieldProps) => {
  const formikContext = useFormikContext();

  return (
    <TextField
      id={id}
      name={name}
      // @ts-expect-error: "id" does not exist in formik context
      value={formikContext.values[id]}
      onBlur={formikContext.handleBlur}
      onChange={formikContext.handleChange}
      error={
        // @ts-expect-error: "id" does not exist in formik context
        formikContext.touched[id] && Boolean(formikContext.errors[id])
      }
      // @ts-expect-error: "id" does not exist in formik context
      helperText={formikContext.touched[id] && formikContext.errors[id]}
      disabled={formikContext.isSubmitting}
      {...rest}
    >
      {children}
    </TextField>
  );
};

export default FormikTextField;

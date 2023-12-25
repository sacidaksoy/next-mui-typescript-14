import { Autocomplete, type AutocompleteProps, TextField } from "@mui/material";
import { useFormikContext } from "formik";

interface FormikAutoCompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined = undefined
> extends Omit<
    AutocompleteProps<T | string, Multiple, DisableClearable, FreeSolo>,
    "renderInput"
  > {
  id: string;
  name: string;
  label: string;
  renderInput?: AutocompleteProps<
    T | string,
    Multiple,
    DisableClearable,
    FreeSolo
  >["renderInput"];
}

const FormikAutoComplete = <
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>({
  id,
  name,
  label,
  ...rest
}: FormikAutoCompleteProps<T, Multiple, DisableClearable, FreeSolo>) => {
  const formikContext = useFormikContext();

  return (
    <Autocomplete
      id={id}
      // @ts-expect-error: "id" does not exist in formik context
      value={formikContext.values[id]}
      onBlur={formikContext.handleBlur}
      onChange={(_, value) => formikContext.setFieldValue(id, value)}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          label={label}
          // @ts-expect-error: "id" does not exist in formik context
          error={formikContext.touched[id] && Boolean(formikContext.errors[id])}
          // @ts-expect-error: "id" does not exist in formik context
          helperText={formikContext.touched[id] && formikContext.errors[id]}
        />
      )}
      disabled={formikContext.isSubmitting}
      {...rest}
    />
  );
};

export default FormikAutoComplete;

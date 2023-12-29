"use client"

import { Controller, useFormContext } from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";

type FormInputTextProps = {
  name: string;
  label: string;
} & TextFieldProps;

const FormInputText = ({ name, label, ...rest }: FormInputTextProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
      }) => (
        <TextField
          name={name}
          label={label}
          inputRef={ref}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={Boolean(error)}
          helperText={error?.message ?? ""}
          fullWidth
          {...rest}
        />
      )}
    />
  );
};

export default FormInputText;

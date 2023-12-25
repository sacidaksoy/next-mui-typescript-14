import { DatePicker, type DatePickerProps } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { useFormikContext } from "formik";

type FormikDatePickerProps = {
  id: string;
  name: string;
} & DatePickerProps<Dayjs>;

const FormikDatePicker = ({ id, name, ...rest }: FormikDatePickerProps) => {
  const formikContext = useFormikContext();

  return (
    <DatePicker
      // @ts-expect-error: "id" does not exist in formik context
      value={formikContext.values[id]}
      onChange={(value) => formikContext.setFieldValue(id, value)}
      slotProps={{
        textField: {
          id,
          name,
          onBlur: formikContext.handleBlur,
          // @ts-expect-error: "id" does not exist in formik context
          error: formikContext.touched[id] && Boolean(formikContext.errors[id]),
          // @ts-expect-error: "id" does not exist in formik context
          helperText: formikContext.touched[id] && formikContext.errors[id],
        },
      }}
      disabled={formikContext.isSubmitting}
      {...rest}
    />
  );
};

export default FormikDatePicker;

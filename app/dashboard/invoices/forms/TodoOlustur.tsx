import { Box, Button, Grid, MenuItem } from "@mui/material";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { FormikHelpers, FormikProvider, useFormik } from "formik";
import { boolean, object, string } from "yup";

import { FormikTextField } from "@/ui/Formik";
import { useTodosOlustur } from "../queries/useTodosOlustur";
import { usePathname, useRouter } from "next/navigation";

interface FormValues {
  title: string;
  completed: boolean;
}

const validationSchema = object({
  title: string().required("Bu alan zorunludur."),
  completed: boolean().required("Bu alan zorunludur."),
});

const TodoOlustur = () => {
  const todoOlustur = useTodosOlustur();
  const snackbar = useSnackbar();
  const { replace } = useRouter();
  const pathname = usePathname();

  const initialValues: FormValues = {
    title: "",
    completed: false,
  };

  const handleVazgecButtonClick = () => {
    replace(pathname);
  };

  async function handleSubmit(
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) {
    try {
      const payload = {
        title: values.title,
        completed: values.completed,
      };
      await todoOlustur.mutateAsync({ payload });
      snackbar.enqueueSnackbar("Todo başarıyla oluşturuldu", {
        variant: "success",
      });
      replace(pathname);
    } catch (error) {
      let errorMessage = "Todo oluşturulurken hata oluştu.";
      if (error instanceof AxiosError) {
        const errorData = error.response!.data as object;
        let isValidationError = false;
        if (errorData) {
          for (const [key, value] of Object.entries(errorData)) {
            if (Object.keys(initialValues).includes(key)) {
              formikHelpers.setFieldError(key, value);
              isValidationError = true;
            }
          }
          if (isValidationError) {
            return;
          }
          if ("error" in errorData) {
            errorMessage = errorData.error as string;
          }
        }
      }
      snackbar.enqueueSnackbar(errorMessage, {
        variant: "error",
      });
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <FormikProvider value={formik}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box>
              <FormikTextField
                id="title"
                name="title"
                label="Title"
                fullWidth
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <FormikTextField
                id="completed"
                name="completed"
                label="Completed?"
                select
                fullWidth
              >
                {/* @ts-expect-error: MenuItem Typecript */}
                <MenuItem value={true}>Evet</MenuItem>
                {/* @ts-expect-error: MenuItem Typecript */}
                <MenuItem value={false}>Hayır</MenuItem>
              </FormikTextField>
            </Box>
          </Grid>
        </Grid>
      </FormikProvider>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "8px",
          marginTop: "16px",
        }}
      >
        <Button
          color="secondary"
          variant="contained"
          onClick={handleVazgecButtonClick}
          disabled={formik.isSubmitting}
        >
          Vazgeç
        </Button>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={formik.isSubmitting}
        >
          Oluştur
        </Button>
      </Box>
    </Box>
  );
};

export default TodoOlustur;

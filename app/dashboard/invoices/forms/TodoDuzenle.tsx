import { Box, Button, Grid, MenuItem } from "@mui/material";
import { useSnackbar } from "notistack";
import { useTodosDuzenle } from "../queries/useTodosDuzenle";
import { useRouter } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormInputText } from "@/ui/ReactHookForm";

const TodoDuzenle = ({ todo }: { todo: Todos }) => {
  const todoDuzenle = useTodosDuzenle();
  const snackbar = useSnackbar();
  const router = useRouter();

  const validationSchema = z.object({
    title: z.string().min(1, { message: "Bu alan zorunludur." }),
    completed: z.boolean(),
  });

  type ValidationSchemaType = z.infer<typeof validationSchema>;

  const methods = useForm<ValidationSchemaType>({
    mode: "onBlur", // don't need to submit before knowing whether that field is valid or not.
    reValidateMode: "onBlur", //behaviour is consistent after the first submit
    resolver: zodResolver(validationSchema),
    defaultValues: {
      title: todo.title,
      completed: todo.completed,
    },
  });

  const handleVazgecButtonClick = () => {
    router.back();
  };

  const onSubmit: SubmitHandler<ValidationSchemaType> = async (values) => {
    try {
      const payload = {
        title: values.title,
        completed: values.completed,
      };
      await todoDuzenle.mutateAsync({ todo, payload });
      snackbar.enqueueSnackbar("Todo başarıyla düzenlendi.", {
        variant: "success",
      });
      router.back();
    } catch (error) {
      let errorMessage = "Todo düzenlenirken hata oluştu.";
      snackbar.enqueueSnackbar(errorMessage, {
        variant: "error",
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box>
              <FormInputText name={"title"} label="Title" />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <FormInputText name={"completed"} label="Completed" select>
                {/* @ts-expect-error: MenuItem Typecript */}
                <MenuItem value={true}>Evet</MenuItem>
                {/* @ts-expect-error: MenuItem Typecript */}
                <MenuItem value={false}>Hayır</MenuItem>
              </FormInputText>
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
            margin: "16px",
          }}
        >
          <Button
            color="secondary"
            variant="contained"
            onClick={handleVazgecButtonClick}
            // disabled={formik.isSubmitting}
          >
            Vazgeç
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            // disabled={formik.isSubmitting}
          >
            Kaydet
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default TodoDuzenle;

import {
  Dialog as MuiDialog,
  DialogActions as MuiDialogActions,
  DialogContent as MuiDialogContent,
  DialogTitle as MuiDialogTitle,
  IconButton,
  Tooltip,
  type DialogProps as MuiDialogProps,
  DialogTitleProps as MuiDialogTitleProps,
  DialogContentProps as MuiDialogContentProps,
  DialogActionsProps as MuiDialogActionsProps,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export interface DialogProps extends MuiDialogProps {
  loading?: boolean;
  error?: boolean;
  titleProps?: MuiDialogTitleProps;
  contentProps?: MuiDialogContentProps;
  actions?: MuiDialogActionsProps["children"];
  actionsProps?: MuiDialogActionsProps;
}

const Dialog = ({ dialog }: { dialog: DialogProps }) => {
  const {
    open,
    loading,
    error,
    title,
    titleProps = {},
    content,
    contentProps = {},
    actions,
    actionsProps = {},
    ...props
  } = dialog;

  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <MuiDialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      {...props}
    >
      {title && (
        <MuiDialogTitle {...titleProps}>
          {title}
          <Tooltip title="Kapat">
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: "8px",
                top: "8px",
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </MuiDialogTitle>
      )}
      {content && (
        <MuiDialogContent
          sx={{
            padding: "20px 24px !important",
          }}
          {...contentProps}
        >
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress size={30} />
            </Box>
          ) : error ? (
            <Typography color="error">Beklenmeyen bir hata oluştu.</Typography>
          ) : (
            <>{content}</>
          )}
        </MuiDialogContent>
      )}
      {actions && (
        <MuiDialogActions {...actionsProps}>{actions}</MuiDialogActions>
      )}
    </MuiDialog>
  );
};

export default Dialog;

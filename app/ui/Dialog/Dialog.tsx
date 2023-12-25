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
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface DialogProps extends MuiDialogProps {
  titleProps?: MuiDialogTitleProps;
  contentProps?: MuiDialogContentProps;
  actions?: MuiDialogActionsProps["children"];
  actionsProps?: MuiDialogActionsProps;
}

const Dialog = ({ dialog }: { dialog: DialogProps }) => {
  const {
    open,
    title,
    titleProps = {},
    content,
    contentProps = {},
    actions,
    actionsProps = {},
    ...props
  } = dialog;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleClose = () => {
    replace(pathname);
  };

  return (
    <MuiDialog
      open={searchParams.has("showDialog")}
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
          {content}
        </MuiDialogContent>
      )}
      {actions && (
        <MuiDialogActions {...actionsProps}>{actions}</MuiDialogActions>
      )}
    </MuiDialog>
  );
};

export default Dialog;

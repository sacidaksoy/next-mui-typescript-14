"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridToolbarContainer } from "@mui/x-data-grid";
import { Button, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useTodos } from "./queries/useTodos";

import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { useTodosSil } from "./queries/useMusteriSil";
import { usePathname, useRouter } from "next/navigation";

const DataGridToolbar = ({ onTodoOlustur }: { onTodoOlustur: () => void }) => (
  <GridToolbarContainer
    sx={(theme) => ({
      borderBottomWidth: "1px",
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.grey[300],
    })}
  >
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "8px",
      }}
    >
      <Box>
        <Typography variant="h6">Todos</Typography>
      </Box>
      <Box
        sx={{
          flex: "1 1 auto",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={onTodoOlustur}
          startIcon={<AddIcon fontSize="small" />}
        >
          Yeni Müşteri
        </Button>
      </Box>
    </Box>
  </GridToolbarContainer>
);

export default function Invoices() {
  const todos = useTodos({ params: { start: 10, limit: 50 } });
  const todosSil = useTodosSil();

  const pathname = usePathname();
  const router = useRouter();

  const snackbar = useSnackbar();

  const handleTodoOlusturClick = () => {
    router.push(`${pathname}/create-todo`);
  };

  const handleTodoDuzenleButtonClick = (todo: Todos) => {
    router.push(`${pathname}/${todo.id}`);
  };

  const handleTodosSilClick = React.useCallback(
    async (todos: Todos) => {
      const confirm = window.confirm("Silmek istediğinize emin misiniz?");

      if (confirm) {
        try {
          await todosSil.mutateAsync({ todos });
          snackbar.enqueueSnackbar("Başarıyla silindi.", {
            variant: "success",
          });
        } catch (error) {
          snackbar.enqueueSnackbar("Silinirken hata oluştu.", {
            variant: "error",
          });
        }
      }
    },
    [snackbar, todosSil]
  );

  const rows = todos.data || [];
  const columns: GridColDef<Todos>[] = [
    {
      field: "id",
      type: "number",
      headerName: "ID",
      headerAlign: "left",
      align: "left",
      flex: 0.2,
    },
    {
      field: "userId",
      type: "number",
      headerName: "User Id",
      flex: 0.2,
    },
    {
      field: "title",
      type: "string",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "completed",
      type: "boolean",
      headerName: "Completed",
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <>
          <Tooltip title="Düzenle">
            <IconButton
              size="small"
              onClick={() => handleTodoDuzenleButtonClick(params.row)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Sil">
            <IconButton
              size="small"
              onClick={() => handleTodosSilClick(params.row)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      ),
      width: 100,
    },
  ];

  if (todos.isError) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography color="error">Beklenmeyen bir hata oluştu.</Typography>
      </Box>
    );
  }

  return (
    <Box
      component={Paper}
      sx={{
        width: "100%",
        height: "100%",
        padding: 1,
      }}
    >
      <DataGrid
        sx={{ border: "none" }}
        density="compact"
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        // autoPageSize
        slots={{
          toolbar: DataGridToolbar,
        }}
        slotProps={{
          toolbar: {
            onTodoOlustur: handleTodoOlusturClick,
          },
        }}
        loading={todos.isLoading}
      />
    </Box>
  );
}

"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useTodos } from "./queries/useTodos";

import {
  //   Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { enqueueDialog } from "@/lib/features/app";
import TodoDuzenle from "./forms/TodoDuzenle";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function Invoices() {
  const todos = useTodos({ params: { start: 10, limit: 50 } });

  const dispatch = useAppDispatch();
  const dialogState = useAppSelector((state) => state.app.dialogs);

  console.log({ dialogState });
  const snackbar = useSnackbar();

  const handleTodoDuzenleButtonClick = React.useCallback(
    (todo: Todos) =>
      dispatch(
        enqueueDialog({
          title: "Müşteri Düzenle",
          // @ts-expect-error: Dialog TypeScript
          content: <TodoDuzenle todo={todo} />,
        })
      ),
    [dispatch]
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
              //   onClick={() => handleMusteriSilButtonClick(params.row)}
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
          toolbar: GridToolbar,
        }}
        loading={todos.isLoading}
      />
    </Box>
  );
}

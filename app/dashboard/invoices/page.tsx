"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { useTodos } from "./queries/useTodos";

import {
  //   Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function Invoices() {
  const todos = useTodos({ params: { start: 10, limit: 50 } });

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
              //   onClick={() => handleMusteriDuzenleButtonClick(params.row)}
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

"use client";

import { SheetMusic } from "@/utils/axios";
import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import { FaDownload } from "react-icons/fa6";

interface SheetMusicGridProps {
  rows: SheetMusic[];
  startingFilter?: string;
}

const difficultyMap: Record<string, string> = {
  Beginner: "Principiante",
  Intermediate: "Intermedio",
  Advanced: "Avanzado",
};

const genreMap: Record<string, string> = {
  Classical: "Clásico",
  Jazz: "Jazz",
  Pop: "Popular",
  Educational: "Educacional",
  Tango: "Tango",
  Soundtrack: "Soundtrack",
};

export default function SheetMusicGrid({
  rows,
  startingFilter,
}: SheetMusicGridProps) {
  const mappedRows = rows.map((sheet) => ({
    id: sheet.id,
    name:
      sheet.composer && sheet.title
        ? `${sheet.composer} – ${sheet.title}`
        : sheet.composer ?? sheet.title,
    genre: genreMap[sheet.genre ?? ""] ?? sheet.genre,
    difficulty: difficultyMap[sheet.difficulty ?? ""] ?? sheet.difficulty,
    year: sheet.year,
    downloadCount: sheet.downloadCount,
    downloadUrl: `/api/sheet-music/${sheet.id}`,
  }));

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nombre", flex: 1, minWidth: 200 },
    { field: "genre", headerName: "Género", width: 130 },
    { field: "difficulty", headerName: "Dificultad", width: 130 },
    { field: "year", headerName: "Año", width: 80 },
    { field: "downloadCount", headerName: "Descargas", width: 120 },
    {
      field: "downloadUrl",
      headerName: "",
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          href={params.value}
          variant="contained"
          size="small"
          endIcon={<FaDownload />}
        >
          Descargar
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={mappedRows}
        columns={columns}
        pageSizeOptions={[10]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
              page: 0,
            },
          },
          sorting: {
            sortModel: [{ field: "downloadCount", sort: "desc" }],
          },
          filter: startingFilter
            ? {
                filterModel: {
                  items: [
                    {
                      field: "name",
                      value: startingFilter,
                      operator: "contains",
                    },
                  ],
                },
              }
            : undefined,
        }}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        onCellClick={(params) => {
          window.open(params.row.downloadUrl);
        }}
        showToolbar
        sx={{
          "& .MuiDataGrid-cell": {
            cursor: "pointer",
          },
        }}
      />
    </Box>
  );
}

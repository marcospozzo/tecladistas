"use client";

import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import { FaDownload } from "react-icons/fa6";
import { SheetMusic } from "@/utils/axios";

interface SheetMusicGridProps {
  rows: SheetMusic[];
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

export default function SheetMusicGrid({ rows }: SheetMusicGridProps) {
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
    { field: "year", headerName: "Año", width: 100 },
    { field: "downloadCount", headerName: "Descargas", width: 130 },
    {
      field: "downloadUrl",
      headerName: "",
      width: 140,
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
        }}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        disableRowSelectionOnClick
      />
    </Box>
  );
}

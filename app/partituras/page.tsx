import { Metadata } from "next";
import { pageTitles } from "@/utils/utils";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FaDownload } from "react-icons/fa6";
import { getAllSheetMusic } from "@/utils/axios";

export const metadata: Metadata = {
  title: pageTitles.sheetmusic,
};

const difficultyMap: Record<string, string> = {
  Beginner: "Principiante",
  Intermediate: "Intermedio",
  Advanced: "Avanzado",
};

const genreMap: Record<string, string> = {
  Classical: "Clásico",
  Jazz: "Jazz",
  Pop: "Popular",
  Rock: "Rock",
  Soundtrack: "Soundtrack",
  Other: "Otros",
};

export default async function SheetMusic() {
  const sheetMusic = await getAllSheetMusic();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Género/estilo</TableCell>
            <TableCell align="right">Dificultad</TableCell>
            <TableCell align="right">Año</TableCell>
            <TableCell align="right">Descargas</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sheetMusic?.map((sheet) => (
            <TableRow
              key={sheet.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {sheet.title ?? sheet.fileName}
              </TableCell>
              <TableCell align="right">{genreMap[sheet.genre ?? ""]}</TableCell>
              <TableCell align="right">
                {difficultyMap[sheet.difficulty ?? ""]}
              </TableCell>
              <TableCell align="right">{sheet.year}</TableCell>
              <TableCell align="right">{sheet.downloadCount}</TableCell>
              <TableCell align="right">
                <Button
                  href={`/api/sheet-music/${sheet.id}`}
                  variant="contained"
                  color="primary"
                  size="small"
                  endIcon={<FaDownload />}
                >
                  Descargar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

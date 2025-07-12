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

export default async function SheetMusic() {
  const sheetMusic = await getAllSheetMusic();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Compositor/a</TableCell>
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
              key={sheet.title}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {sheet.fileName}
              </TableCell>
              <TableCell align="right">{sheet.composer}</TableCell>
              <TableCell align="right">{sheet.genre}</TableCell>
              <TableCell align="right">{sheet.difficulty}</TableCell>
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

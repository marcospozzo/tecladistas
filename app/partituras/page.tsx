import { Metadata } from "next";
import { pageTitles } from "@/utils/utils";
import { Table } from "@mui/material";

export const metadata: Metadata = {
  title: pageTitles.sheetmusic,
};

export default function SheetMusic() {
  return (
    <div>
      <h1>Partituras</h1>
      <Table>
        <thead>
          <tr>
            <th>Partitura</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Partitura 1</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

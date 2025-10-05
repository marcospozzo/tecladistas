import { constants } from "@/utils/utils";
import { redirect } from "next/navigation";

export default async function Fotos() {
  redirect(constants.PICTURES_2025_PATH);
}

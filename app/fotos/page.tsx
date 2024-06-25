import { PICTURES_2023_PATH } from "@/utils/constants";
import { redirect } from "next/navigation";

export default async function Fotos() {
  redirect(PICTURES_2023_PATH);
}

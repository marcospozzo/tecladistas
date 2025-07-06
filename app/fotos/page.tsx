import constants from "@/utils/constants";
import { redirect } from "next/navigation";

export default async function Fotos() {
  redirect(constants.PICTURES_2023_PATH);
}

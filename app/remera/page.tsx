import { constants } from "@/utils/utils";
import { redirect } from "next/navigation";

export default async function Remera() {
  redirect(constants.REMERA_PATH);
}

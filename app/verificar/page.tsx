import { pageTitles } from "@/utils/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: pageTitles.verify,
};

const VerifyRequest = () => {
  return (
    <div className="flex flex-col mx-auto text-center">
      <h1>Revisá tu email</h1>
      <br />
      <p>Se ha enviado un link para entrar, a tu dirección de email.</p>
      <i>Podés cerrar esta página.</i>
    </div>
  );
};

export default VerifyRequest;

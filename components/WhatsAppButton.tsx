import { WHATSAPP_LINK } from "@/utils/constants";
import { formatPhone } from "@/utils/utils";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";

const WhatsAppButton = ({ phone }: { phone: string }) => {
  return (
    <div className="flex flex-col text-lg space-x-1">
      <Link
        className="flex justify-center submit-button space-x-2 my-2"
        href={`${WHATSAPP_LINK}${formatPhone(phone)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h3 className="text-base">Abrir</h3>
        <FaWhatsapp size={25} />
      </Link>
    </div>
  );
};

export default WhatsAppButton;

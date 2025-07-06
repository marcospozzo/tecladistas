import constants from "@/utils/constants";
import { formatPhone } from "@/utils/utils";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";

const WhatsAppButton = ({
  userId,
  phone,
  message: text,
}: {
  userId?: string;
  phone?: string;
  message?: string;
}) => {
  let url = "";

  if (phone) {
    url = `${constants.WHATSAPP_LINK}${formatPhone(phone)}`;
  } else if (userId) {
    url = `/api/users/open-whatsapp/${userId}/${text}`;
  }

  return (
    <div className="flex flex-col space-x-1">
      <Link
        className="flex justify-center button submit-button space-x-2 my-2 w-full"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h3>Abrir</h3>
        <FaWhatsapp size={25} />
      </Link>
    </div>
  );
};

export default WhatsAppButton;

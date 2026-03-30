import { ButtonLink } from "./ui/Button";
import { constants } from "@/utils/utils";
import { formatPhone } from "@/utils/utils";
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
    <div className="flex flex-col">
      <ButtonLink
        fullWidth
        href={url}
        rel="noopener noreferrer"
        target="_blank"
      >
        Abrir
        <FaWhatsapp size={25} />
      </ButtonLink>
    </div>
  );
};

export default WhatsAppButton;

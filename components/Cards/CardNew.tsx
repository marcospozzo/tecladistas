import Link from "next/link";
import { BsPlusCircleDotted } from "react-icons/bs";

const CardNew = () => {
  return (
    <div className="flex box-item bg-slate-300 rounded-xl">
      <Link className="m-auto" href="/crear-publicacion">
        <BsPlusCircleDotted className="m-auto" size={40} />
      </Link>
    </div>
  );
};

export default CardNew;

import { FaLocationArrow } from "react-icons/fa";

const Location = ({ name }: { name: string }) => {
  return (
    <div className="flex flex-row items-center space-x-1">
      <FaLocationArrow />
      <p>{name}</p>
    </div>
  );
};

export default Location;

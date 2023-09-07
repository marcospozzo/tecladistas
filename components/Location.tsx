import { MdLocationPin } from "react-icons/md";

const Location = ({ name }: { name: string }) => {
  return (
    <div className="flex flex-row items-center space-x-1">
      <MdLocationPin />
      <div>{name}</div>
    </div>
  );
};

export default Location;

import { MdLocationPin } from "react-icons/md";

const Location = ({ name }: { name: string | undefined }) => {
  return (
    <div className="ui-detail-meta">
      <MdLocationPin className="text-base" />
      <div>{name}</div>
    </div>
  );
};

export default Location;

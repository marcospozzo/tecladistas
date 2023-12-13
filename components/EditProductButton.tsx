import Link from "next/link";

const EditProductButton = ({
  productId,
}: {
  productId: string | undefined;
}) => {
  const url = `/crear-publicacion?id=${productId}`;
  return (
    <div className="flex flex-col space-x-1">
      <Link
        className="flex justify-center button submit-button space-x-2 my-2 w-full"
        href={url}
      >
        <h3>Editar</h3>
      </Link>
    </div>
  );
};

export default EditProductButton;

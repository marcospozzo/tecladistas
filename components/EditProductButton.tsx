import { ButtonLink } from "./ui/Button";

const EditProductButton = ({
  productId,
}: {
  productId: string | undefined;
}) => {
  const url = `/crear-publicacion?id=${productId}`;
  return (
    <ButtonLink fullWidth href={url}>
      Editar
    </ButtonLink>
  );
};

export default EditProductButton;

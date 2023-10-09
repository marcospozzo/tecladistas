import { Metadata, ResolvingMetadata } from "next";
import { getProduct } from "@/utils/axios";
import { imageTypes, pageTitles } from "@/utils/utils";

type Props = {
  params: { productId: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.productId;

  const isProduction = process.env.NODE_ENV === "production";

  // Define the protocol based on the environment
  const protocol = isProduction ? "https://" : "http://";

  const product = await getProduct(id);

  let foundImage = null;

  for (const extension of imageTypes) {
    const lowercaseExtension = extension.toLowerCase();
    const imageUrl = `${protocol}${process.env.IMAGES_HOST_NAME}/${id}/1.${lowercaseExtension}`;
    const imageExists = await checkImageExists(imageUrl);

    if (imageExists) {
      foundImage = imageUrl;
      break;
    }
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: pageTitles.keyboards,
    openGraph: {
      images: [foundImage!, ...previousImages],
    },
  };
}

// Función para verificar si una imagen existe
async function checkImageExists(url: string) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    return false;
  }
}

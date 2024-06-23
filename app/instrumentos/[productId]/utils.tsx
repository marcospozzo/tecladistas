import { INSTRUMENTS_PATH } from "@/utils/constants";
import { imageTypes, isProduction, pageTitles } from "@/utils/utils";
import { Metadata } from "next";

type Props = {
  params: { productId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const protocol = isProduction ? "https://" : "http://";

  let foundImage = null;

  for (const extension of imageTypes) {
    const lowercaseExtension = extension.toLowerCase();
    const imageUrl = `${protocol}${process.env.IMAGES_HOST_NAME}${INSTRUMENTS_PATH}/${params.productId}/1.${lowercaseExtension}`;
    const imageExists = await checkImageExists(imageUrl);

    if (imageExists) {
      foundImage = imageUrl;
      break;
    }
  }

  // const previousImages = (await parent).openGraph?.images || [];

  return {
    metadataBase: new URL(`${protocol}${process.env.IMAGES_HOST_NAME}`),
    title: pageTitles.instruments,
    openGraph: {
      images: [foundImage!],
      // images: [foundImage!, ...previousImages],
    },
  };
}

async function checkImageExists(url: string) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    return false;
  }
}

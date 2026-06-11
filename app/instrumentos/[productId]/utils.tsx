import { checkImageExists, constants, imageTypes, isProduction, pageTitles } from "@/utils/utils";
import { Metadata } from "next";

type Props = {
  params: Promise<{ productId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = await params;
  const protocol = isProduction ? "https://" : "http://";

  const checks = await Promise.all(
    imageTypes.map(async (ext) => {
      const url = `${protocol}${process.env.IMAGES_HOST_NAME}${constants.INSTRUMENTS_PATH}/${productId}/1.${ext.toLowerCase()}`;
      return (await checkImageExists(url)) ? url : null;
    }),
  );
  const foundImage = checks.find(Boolean) ?? null;

  return {
    metadataBase: new URL(`${protocol}${process.env.IMAGES_HOST_NAME}`),
    title: pageTitles.instruments,
    openGraph: {
      images: [foundImage!],
    },
  };
}

import { checkImageExists, constants, imageTypes, isProduction, pageTitles } from "@/utils/utils";
import { Metadata } from "next";

type Props = {
  params: Promise<{ studioId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { studioId } = await params;
  const protocol = isProduction ? "https://" : "http://";

  const checks = await Promise.all(
    imageTypes.map(async (ext) => {
      const url = `${protocol}${process.env.IMAGES_HOST_NAME}${constants.STUDIOS_PATH}/${studioId}.${ext.toLowerCase()}`;
      return (await checkImageExists(url)) ? url : null;
    }),
  );
  const foundImage = checks.find(Boolean) ?? null;

  return {
    metadataBase: new URL(`${protocol}${process.env.IMAGES_HOST_NAME}`),
    title: pageTitles.studios,
    openGraph: {
      images: [foundImage!],
    },
  };
}

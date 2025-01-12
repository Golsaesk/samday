import { useTheme, } from '@mui/material';
import Image, { ImageProps, } from 'next/image';

type ImageWithStateProps = ImageProps & {
  srcLight?: string;
  srcDark?: string;
};

export default function CustomImage(props: ImageWithStateProps) {
  const
    { mode, } = useTheme().palette,
    fixImagePath = (
      fullPath: string,
      currentMode: string,
      srcLightImage: string,
      srcDarkImage: string
    ) => {

      if (srcLightImage && srcDarkImage) {
        return currentMode === 'light' ? srcLightImage : srcDarkImage;
      }

      const filename = fullPath.replace(/^.*[\\/]/, '');
      let themedFilename = filename;
      const parts = filename.split('.');
      if (parts.length >= 2) {
        const extension = parts[parts.length - 1];
        if (extension) {
          themedFilename = filename.replace(`.${extension}`, `-${currentMode}.${extension}`);
        }
      }
      return fullPath.replaceAll(filename, themedFilename);
    };

  return (
    <Image
      {...props}
      src={fixImagePath(`${props.src}`, mode, props.srcLight || '', props.srcDark || '')}
      alt={props.alt}
    />
  );
}

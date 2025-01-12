import React from 'react';
import Image from 'next/image';
import { DOMAIN, } from '@modules/general/libraries/constants';
import { SafeNumber, } from '@modules/general/libraries/general-types';

export default function NoImage({
  width,
  height,
  alt,
  sizes,
  priority,
  style,
  fill,
}: {
  alt: string;
  layout?: any;
  width?: SafeNumber;
  height?: SafeNumber;
  sizes?: string | undefined;
  priority?: boolean;
  style?: React.CSSProperties | undefined;
  fill?: boolean;
}) {
  return (
    <Image
      src={`${DOMAIN}/images/assets/no-image.svg`}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      {...style && { style, }}
      {...fill && { fill, }}
    />
  );
}

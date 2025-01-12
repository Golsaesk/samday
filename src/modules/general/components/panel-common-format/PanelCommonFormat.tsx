"use client";

import Image from 'next/image';
import { Typography, } from '@mui/material';
import { useTheme, } from '@mui/material/styles';
import styles from './PanelCommonFormat.module.scss';
import Panel from '@/modules/general/components/panel';
import { Album, } from '@/modules/album/libraries/album-types';
import { renderHTML, } from '@/modules/general/libraries/utils';

export default function PanelCommonFormat({ album, }: { album: Album | null }) {
  const
    { mode, } = useTheme().palette;

  return (
    <>
      {album && (
        <>
          <Panel
            variant={'general'}
            title={album.title}
            classes={{ root: styles.root, }}
          >
            {album.keywords && (
              <Typography
                variant='subtitle1'
                component={'p'}
              >
                {album.keywords}
              </Typography>
            )}
            <div className={`${styles.root__description} ${styles.root__noMargin}`}>
              {renderHTML(album.description)}
            </div>
            <div className={`${styles.root__image}`}>
              <Image
                src={
                  mode === "light" ?
                    album.front_cover_media && album.front_cover_media.path || '' :
                    album.back_cover_media && album.back_cover_media.path || ""
                }
                width={1077}
                height={430}
                alt={album.title}
              />
            </div>
            {album.media_list && album.media_list[0] && album.media_list[0].description && (
              <div className={`${styles.root__description} ${styles.root__noMargin}`}>
                {renderHTML(album.media_list[0].description)}
              </div>
            )}
          </Panel>
        </>
      )}
    </>
  );
}
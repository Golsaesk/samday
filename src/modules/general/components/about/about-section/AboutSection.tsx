'use client';

import styles from './AboutSection.module.scss';
import AboutSectionMember from './about-section-member';
import { Box, } from '@/modules/box/libraries/box-types';
import { renderHTML, } from '@/modules/general/libraries/utils';
import { Media, } from '@/modules/general/libraries/general-types';
import AboutBox from '@modules/general/components/about/about-box';
import {
  useEffect, useRef, useState,
} from 'react';

const AboutSection = ({
  box,
  setActiveItem,
  id,
  next,
  previous,
  isCouncil = false,
  isSecretaryMembers = false,
}: {
  box: Box | null;
  setActiveItem: any;
  id: string;
  next: string;
  previous: string;
  isCouncil?: boolean;
  isSecretaryMembers?: boolean;
}) => {
  const
    elementRef = useRef<HTMLInputElement>(null),
    [isInView, setIsInView,] = useState(false),
    [scrollDirection, setScrollDirection,] = useState(''),

    checkInView = () => {
      if (elementRef && elementRef.current) {
        const position = elementRef.current.offsetTop;
        const scrollYPosition = window.scrollY;
        const rect = elementRef.current.getBoundingClientRect();
        setIsInView(
          position <= scrollYPosition + 200 && scrollYPosition + 200 <= position + rect.height
        );
      }
    };

  useEffect(() => {
    if (isInView) setActiveItem(`${id}`);
    else {
      if (scrollDirection === 'up') setActiveItem(`${previous}`);
      else setActiveItem(`${next}`);
    }
  }, [isInView,]);

  useEffect(() => {
    document.addEventListener("scroll", checkInView);
    return () => {
      document.removeEventListener("scroll", checkInView);
    };
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      let direction = lastScrollY < window.scrollY ? 'down' : 'up';
      lastScrollY = window.scrollY;
      setScrollDirection(direction);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      id={id}
      ref={elementRef}
      className={styles.root}
    >
      {box && (
        <AboutBox
          title={box.title}
        >
          {box.album && box.album.media_list && box.album.media_list.length > 0 && (
            <div className={`${styles.root__list} ${isSecretaryMembers && styles.root__list__secretary}`}>
              {box.album.media_list.map((media: Media, index: number) => (
                <AboutSectionMember
                  key={media.id}
                  media={media}
                  greenLabel={index === 1}
                  isSecretaryMembers={isSecretaryMembers}
                  className={(isCouncil && box.album && box.album.media_list?.length && index === box.album.media_list?.length - 1) ?
                    styles.root__list__last :
                    styles.root__list__item}
                />
              ))}
            </div>
          )}
          <div className={styles.root__body}>
            {renderHTML(box.body)}
          </div>
        </AboutBox>
      )}
    </div>
  );
};

export default AboutSection;
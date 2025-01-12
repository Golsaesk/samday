
import styles from './HomeHeroSection.module.scss';
import HomeHeroSectionLogo from './home-hero-section-logo';
import { News, } from '@/modules/news/libraries/news-types';
import HomeHereSectionTopNews from './home-hero-section-top-news';

const HomeHeroSection = ({ items, }: {items: News[] | null}) => {
  return (
    <div className={styles.root}>
      <HomeHeroSectionLogo />
      <HomeHereSectionTopNews items={items} />
    </div>
  );
};

export default HomeHeroSection;
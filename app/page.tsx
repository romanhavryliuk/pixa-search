import { Hero } from '@/components/Hero/Hero';
import PopularCategories from '@/components/PopularCategories/PopularCategories';
import { AboutSection } from '@/components/AboutSection/AboutSection';

export default function Home() {
  return (
    <>
      <Hero />
      <PopularCategories />
      <AboutSection />
    </>
  );
}

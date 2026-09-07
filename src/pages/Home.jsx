import Hero from '../components/Hero';
import SearchWidget from '../components/SearchWidget';
import PopularDestinations from '../components/PopularDestinations';
import WorldMap from '../components/WorldMap';

const Home = () => {
  return (
    <>
      <Hero />
      <SearchWidget />
      <PopularDestinations />
      <WorldMap />
    </>
  )
}

export default Home;
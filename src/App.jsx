import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import Hero from '../src/components/Hero';
import SearchWidget from './components/SearchWidget';
import PopularDestinations from './components/PopularDestinations';
import WorldMap from './components/WorldMap';

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <SearchWidget />
      <PopularDestinations />
      <WorldMap />
      <Footer />
    </div>
  )
}

export default App;
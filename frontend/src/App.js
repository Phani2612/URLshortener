import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './styles.css';
import URLShortener from './components/URLShortener';
import Carousel from './components/Carousel';
import Footer from './components/Footer';
// eslint-disable-next-line no-unused-vars
import Products from './components/Products';
// eslint-disable-next-line no-unused-vars
import ContactPage from './pages/ContactPage';


function App() {
  return (
    <Router>
    <div className="app-container">
      <div className = "logo-container">
        <img src="./logo.png" alt = "logo" className='logo'/>
      </div>
      <Routes>
      <Route
        path="/"
          element={
            <React.Fragment>
              <Carousel />
              <URLShortener />
              {/* <Products /> */}
            </React.Fragment>
            }
      />
      <Route path="/urlshortner" element={<URLShortener />} />
      <Route path="/contact" element = {<ContactPage />} />            
      </Routes>
      <Footer/>
    </div>
    </Router>
    
  );
}
export default App; //nishant was here
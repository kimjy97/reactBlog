import './App.css';
import Header from './Component/Header/Header';
import Footer from './Component/Footer/Footer';
import ScrollTop from './Component/ScrollToTop/ScrollToTop';
import AnimatedRoutes from './Component/AnimatedRoutes/AnimatedRoutes';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (

    <div className='App'>
      <Router>
          <ScrollTop/>
          <Header></Header>
          <AnimatedRoutes />
          <Footer></Footer>
      </Router>
    </div>

  );
}

export default App;

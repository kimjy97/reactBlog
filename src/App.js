import './App.scss';
import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';
import Contents from './component/Contents/Contents';

import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  return (
    <div className='App'>
      <Router>
        <Header></Header>
        <Contents></Contents>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;

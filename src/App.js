import './App.css';
import Header from './Header/Header';
import Contents from './Contents/Contents';
import Footer from './Footer/Footer';

function App() {
  return (
    <div>
      <div className='BackColor'>
        <Header></Header>
        <Contents></Contents>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;

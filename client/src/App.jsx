import {BrowserRouter as Router, Route} from 'react-router-dom'
import Footer from './components/footer/Footer';
import Header from './components/header/Header'
import MainPage from './components/main/MainPage'
import Section2 from './components/main/section/Section2';
import HomeSlider from './components/main/slider/HomeSlider';
import { DataProvider } from './GlobalState';

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header/>
          <Route path="/" exact component={HomeSlider} />
          <MainPage/>
          <Route path="/" exact component={Section2} />
          <Footer />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;

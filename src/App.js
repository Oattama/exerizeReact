import Footer from './page/MainPage/Footer';
import Content from './page/MainPage/Main';
import AppNavBar from './page/MainPage/NavBar';
import { Routes, Route } from 'react-router';
import PageHome from './page/HomePage/PageHome';
import Strava from './page/StravaRedirect/Strava';
import Shop from './page/Shop/Shop';


function App() {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<><AppNavBar/><Content/><Footer/></>}/>
        <Route path="/home" element={<PageHome/>}/>
        <Route path="/redirect" element={<Strava/>}/>
        <Route path="/shop" element={<Shop/>}/>
      </Routes>
    </div>
  );
}

export default App;

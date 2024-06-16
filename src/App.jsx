import './App.css';
import { HeaderCarrousel } from './components/HeaderCarrousel'
import { NavBar }  from './components/NavBar';
import { MonthPlayers } from './components/MonthPlayers';
import { Equip } from './components/Equip';
import { AboutUs } from './components/AboutUs';
import { UpcomingTrainings } from './components/UpcomingTrainings';

const App = () => {
  return (
    <main className='flex flex-col flex-wrap'>
      <NavBar />
      <HeaderCarrousel />
      <MonthPlayers />
      <Equip />
      <AboutUs />
      <UpcomingTrainings />
    </main>
  );
}

export default App;

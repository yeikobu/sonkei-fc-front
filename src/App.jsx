import './App.css';
import { HeaderCarrousel } from './components/HeaderCarrousel'
import { NavBar }  from './components/NavBar';
import { MonthPlayers } from './components/MonthPlayers';
import { Equip } from './components/Equip';

const App = () => {
  return (
    <main className='flex flex-col flex-wrap'>
      <NavBar />
      <HeaderCarrousel />
      <MonthPlayers />
      <Equip />
    </main>
  );
}

export default App;

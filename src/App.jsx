import './App.css';
import logo from './assets/sonkei-logo.webp';
import HeaderCarrousel from './components/HeaderCarrousel'

const App = () => {
  return (
    <>
      <nav className="no-underline flex flex-row justify-between items-center text-wrap w-full sticky text-white font-bold p-2 bg-black z-10">
        <a href="/"><img src={logo} alt="sonkei fc logo" className='size-14 cursor-pointer'/></a>

        <ul className="flex flex-row">
          <li className="hover:text-black px-4 py-2 rounded-lg transition duration-300 scale-100 hover:duration-500 hover:scale-110 hover:bg-yellow">
            <a href="#inicio">Inicio</a>
          </li>
          <li className="hover:text-black px-4 py-2 rounded-lg transition duration-300 scale-100 hover:duration-500 hover:scale-110 hover:bg-yellow">
            <a href="#equipo">Equipo</a>
          </li>
          <li className="hover:text-black px-4 py-2 rounded-lg transition duration-300 scale-100 hover:duration-500 hover:scale-110 hover:bg-yellow">
            <a href="#historia" >Nuestra Historia</a>
          </li>
          <li className="hover:text-black px-4 py-2 rounded-lg transition duration-300 scale-100 hover:duration-500 hover:scale-110 hover:bg-yellow">
            <a href="#entrenamiento">Entrenamiento</a>
          </li>
          <li className="hover:text-black px-4 py-2 rounded-lg transition duration-300 scale-100 hover:duration-500 hover:scale-110 hover:bg-yellow">
            <a href="#testimonios">Testimonios</a>
          </li>
          <li className="hover:text-black px-4 py-2 rounded-lg transition duration-300 scale-100 hover:duration-500 hover:scale-110 hover:bg-yellow">
            <a href="#contacto">Contacto</a>
          </li>
        </ul>
      </nav>
      <HeaderCarrousel />
    </>
  );
}

export default App;

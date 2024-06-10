import { useState } from "react";
import logo from "../assets/sonkei-logo.webp";
import BurgerIcon from "../assets/icons/burger-icon.svg";
import XIcon from "../assets/icons/x-icon.svg";

export const NavBar = () => {
  //Estado para mostrar o esconder el side menu en pantallas pequeñas cuando el botón de hamburgesa es presionado
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="no-underline flex flex-row justify-between items-center text-wrap w-full sticky text-white font-bold p-2 bg-black z-10">
        <a href="/">
          <img
            src={logo}
            alt="sonkei fc logo"
            className="size-14 cursor-pointer"
          />
        </a>

        <div className="md:hidden flex items-center">
          <button
            id="showMenuButton"
            onClick={toggleMenu}
            className="text-stone-300 bg-slate-900/20 hover:bg-red-600/60 shadow-sm shadow-black backdrop-blur-sm rounded-lg p-1 transition focus:outline-none"
          >
            <BurgerIcon className="size-8" />
          </button>
        </div>

        {/* Menú para pantallas grandes */}
        <ul className="hidden md:flex md:flex-row">
          <li className="hover:text-black px-4 py-2 rounded-lg transition duration-300 scale-100 hover:duration-500 hover:scale-110 hover:bg-yellow">
            <a href="#inicio">Inicio</a>
          </li>
          <li className="hover:text-black px-4 py-2 rounded-lg transition duration-300 scale-100 hover:duration-500 hover:scale-110 hover:bg-yellow">
            <a href="#equipo">Equipo</a>
          </li>
          <li className="hover:text-black px-4 py-2 rounded-lg transition duration-300 scale-100 hover:duration-500 hover:scale-110 hover:bg-yellow">
            <a href="#historia">Nuestra Historia</a>
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

      {/* Side Menu en pantallas pequeñas */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-black text-white z-20 transform shadow-md shadow-black ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <button 
          id="hideMenuButton" 
          onClick={toggleMenu} 
          className="absolute top-4 right-4 text-stone-300 bg-slate-900/20 hover:bg-red-600/60 shadow-sm shadow-black backdrop-blur-sm rounded-lg p-1 transition focus:outline-none"
        >
          <XIcon className="size-8" />
        </button>
        <ul className="flex flex-col items-start p-4 mt-12 space-y-4">
          <li className="hover:text-black px-4 py-2 rounded-lg transition duration-300 scale-100 hover:duration-500 hover:scale-110 hover:bg-yellow w-full">
            <a href="#inicio" onClick={toggleMenu}>Inicio</a>
          </li>
          <li className="hover:text-black px-4 py-2 rounded-lg transition duration-300 scale-100 hover:duration-500 hover:scale-110 hover:bg-yellow w-full">
            <a href="#equipo" onClick={toggleMenu}>Equipo</a>
          </li>
          <li className="hover:text-black px-4 py-2 rounded-lg transition duration-300 scale-100 hover:duration-500 hover:scale-110 hover:bg-yellow w-full">
            <a href="#historia" onClick={toggleMenu}>Nuestra Historia</a>
          </li>
          <li className="hover:text-black px-4 py-2 rounded-lg transition duration-300 scale-100 hover:duration-500 hover:scale-110 hover:bg-yellow w-full">
            <a href="#entrenamiento" onClick={toggleMenu}>Entrenamiento</a>
          </li>
          <li className="hover:text-black px-4 py-2 rounded-lg transition duration-300 scale-100 hover:duration-500 hover:scale-110 hover:bg-yellow w-full">
            <a href="#testimonios" onClick={toggleMenu}>Testimonios</a>
          </li>
          <li className="hover:text-black px-4 py-2 rounded-lg transition duration-300 scale-100 hover:duration-500 hover:scale-110 hover:bg-yellow w-full">
            <a href="#contacto" onClick={toggleMenu}>Contacto</a>
          </li>
        </ul>
      </div>

      {/* Background overlay for side menu. Si se presiona también maneja la función para ocultar el side menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-10"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

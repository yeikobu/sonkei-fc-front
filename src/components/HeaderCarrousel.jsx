import { useState, useEffect } from "react";
import ButtonLeft from '../assets/chevron-left.svg'
import ButtonRight from '../assets/chevron-right.svg'

/**
 * HeaderCarrousel Component
 * Este componente muestra un carrusel de imágenes que se obtienen desde la API.
 *
 * @returns {JSX.Element} Carrusel de imágenes.
 */
const HeaderCarrousel = () => {
  // Estado para almacenar las imágenes obtenidas de la API
  const [images, setImages] = useState([]);
  // Estado para controlar el estado de carga de las imágenes
  const [loading, setLoading] = useState(true);
  // Estado para almacenar cualquier error que ocurra durante la obtención de imágenes
  const [error, setError] = useState(null);
  // Estado para controlar el índice de la imagen actual en el carrusel
  const [currentIndex, setCurrentIndex] = useState(0);


  //useEffect para obtener las imágenes desde la API cuando el componente se monta.
  //Este efecto solo se ejecuta una vez, cuando el componente se monta.
  useEffect(() => {
    /**
   * Función para obtener imágenes desde una API.
   * Realiza una petición fetch a una URL específica y actualiza el estado con las imágenes obtenidas.
   *
   * @async
   * @function getImages
   * @throws {Error} Si la respuesta no es correcta o si ocurre algún error durante la petición a la API.
   * @returns {void}
   */
    const getImages = async () => {
      try { 
        setLoading(true);
        const response = await fetch('http://localhost/sonkei-fc-backend/controller/CarrouselController.php');

        if (!response.ok) {
          throw new Error('Error al obtener las imágenes');
        }

        const result = await response.json();
        setImages(result);
        setLoading(false);
      } catch (error) { 
        setError(error);
        setLoading(false);
      }
    };

    //Ejecuta la función para obtener la imágenes
    getImages();
  }, []);

  //useEffect para configurar y limpiar el intervalo que cambia las imágenes del carrusel.
  //Este efecto se ejecuta cada vez que el array de imágenes cambia.
  // Configura un intervalo que se ejecuta cada 2200 milisegundos (2.2 segundos)
  useEffect(() => {
    // Solo configurar el intervalo si hay imágenes disponibles
    if (images.length > 0) {
      const interval = setInterval(() => {
        // Actualiza el índice de la imagen actual, ciclando de nuevo al inicio cuando llega al final
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 2200);

      // Limpia el intervalo cuando el componente se desmonta o cuando el array de imágenes cambia
      return () => clearInterval(interval);
    }
  }, [images]); // Dependencias del efecto (solo se ejecuta cuando `images` cambia)

  // Muestra un mensaje de carga mientras las imágenes están siendo obtenidas
  if (loading) {
    return <div>Loading...</div>;
  }

  // Muestra un mensaje de error si ocurrió algún problema al obtener las imágenes
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Función para mostrar la imagen anterior
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Función para mostrar la siguiente imagen
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Renderiza el carrusel de imágenes
  return (
    <section className="relative overflow-hidden w-full" id="inicio">
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img) => (
          <img
            key={img.id}
            src={img.img_url}
            className="flex-shrink-0 w-full max-h-[800px] object-cover"
            alt={`Slide ${currentIndex}`}
          />
        ))}
      </div>

      {/* Botones de siguiente y atrás */}
      <ButtonLeft className="size-16 text-white absolute top-1/2 left-4 transform -translate-y-1/2 rounded-full p-2 transition hover:scale-110" onClick={prevImage}/>
      <ButtonRight className="size-16 text-white absolute top-1/2 right-4 transform -translate-y-1/2 rounded-full p-2  transition hover:scale-110" onClick={nextImage}/>
    </section>
  );
};

export default HeaderCarrousel;

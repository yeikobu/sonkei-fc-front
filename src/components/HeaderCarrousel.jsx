import { useState, useEffect } from "react"
import ButtonLeft from "../assets/icons/chevron-left.svg"
import ButtonRight from "../assets/icons/chevron-right.svg"
import SonkeiLogo from "../assets/sonkei-logo.webp"

/**
 * HeaderCarrousel Component
 * Este componente muestra un carrusel de imágenes que se obtienen desde la API.
 *
 * @returns {JSX.Element} Carrusel de imágenes.
 */
export const HeaderCarrousel = () => {
  // Estado para almacenar las imágenes obtenidas de la API
  const [images, setImages] = useState([])
  // Estado para controlar el estado de carga de las imágenes
  const [loading, setLoading] = useState(true)
  // Estado para almacenar cualquier error que ocurra durante la obtención de imágenes
  const [error, setError] = useState(null)
  // Estado para controlar el índice de la imagen actual en el carrusel
  const [currentIndex, setCurrentIndex] = useState(0)

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
        setLoading(true)
        const response = await fetch(
          "http://localhost/sonkei-fc-backend/controller/CarrouselController.php"
        )

        if (!response.ok) {
          throw new Error("Error al obtener las imágenes")
        }

        const result = await response.json()
        setImages(result)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }

    //Ejecuta la función para obtener la imágenes
    getImages()
  }, [])

  //useEffect para configurar y limpiar el intervalo que cambia las imágenes del carrusel.
  //Este efecto se ejecuta cada vez que el array de imágenes cambia.
  // Configura un intervalo que se ejecuta cada 2500 milisegundos (2.2 segundos)
  useEffect(() => {
    // Si hay imagenes, se configura el intervalo para cambiar el índice
    if (images.length > 0) {
      const interval = setInterval(() => {
        // Actualiza el índice de la imagen actual, ciclando de nuevo al inicio cuando llega al final
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
      }, 2500)

      // Limpia el intervalo cuando el componente se desmonta o cuando el array de imágenes cambia
      return () => clearInterval(interval)
    }
  }, [images]) // Dependencias del efecto (solo se ejecuta cuando `images` cambia)

  // Muestra un mensaje de carga mientras las imágenes están siendo obtenidas
  if (loading) {
    return <div>Loading...</div>
  }

  // Muestra un mensaje de error si ocurrió algún problema al obtener las imágenes
  if (error) {
    return <div>Error: {error.message}</div>
  }

  // Función para mostrar la imagen anterior
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  // Función para mostrar la siguiente imagen
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  // Renderiza el carrusel de imágenes
  return (
    <section className="relative overflow-hidden w-full" id="inicio">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img /* Recorriendo las imágenes del JSON*/) => (
          <img
            key={img.id}
            src={img.img_url}
            className="flex-shrink-0 w-full max-h-[800px] object-cover"
            alt={`Slide ${currentIndex}`}
          />
        ))}
      </div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center ">
        <div className="flex flex-col p-4 text-center">
          <img
            src={SonkeiLogo}
            alt="Logo de Sonkei FC"
            className="size-40 mx-auto mb-2"
          />
          <div className="drop-shadow">
            <h1 className="text-3xl font-extrabold [text-shadow:_0_0.8px_0_rgb(0_0_0_/_60%)]">Entrenando el futuro de Chile</h1>
          </div>
        </div>

        <button className="px-2 py-2 bg-blue rounded-lg text-white font-semibold transition duration-500 hover:scale-110 hover:bg-yellow hover:shadow-lg hover:text-black">Contáctanos</button>
      </div>

      {/* Botones de siguiente y atrás */}
      <ButtonLeft
        className="self-center size-12 text-white absolute top-1/2 left-2 -translate-y-1/2 rounded-lg transition hover:scale-110 hover:bg-yellow hover:text-black cursor-pointer"
        onClick={prevImage}
      />

      <ButtonRight
        className="self-center size-12 text-white absolute top-1/2 right-2 -translate-y-1/2 rounded-lg transition hover:scale-110 hover:bg-yellow hover:text-black cursor-pointer"
        onClick={nextImage}
      />
    </section>
  );
}

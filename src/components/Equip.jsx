import { useState, useEffect } from 'react'
import ButtonLeft from "../assets/icons/chevron-left.svg";
import ButtonRight from "../assets/icons/chevron-right.svg";
import FilledStar from '../assets/icons/filled-star.svg'
import OutlineStar from '../assets/icons/outline-star.svg'

export const Equip = () => {
    // Estado para almacenar las imágenes obtenidas de la API
    const [players, setPlayers] = useState([]);
    // Estado para controlar el estado de carga de las imágenes
    const [loading, setLoading] = useState(true);
    // Estado para almacenar cualquier error que ocurra durante la obtención de imágenes
    const [error, setError] = useState(null);
    // Estado para controlar el índice de la imagen actual en el carrusel
    const [currentIndex, setCurrentIndex] = useState(0);


    /**
  * Función para obtener imágenes desde una API.
  * Realiza una petición fetch a una URL específica y actualiza el estado con las imágenes obtenidas.
  *
  * @async
  * @function getPlayers
  * @throws {Error} Si la respuesta no es correcta o si ocurre algún error durante la petición a la API.
  * @returns {void}
  */
    const getPlayers = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                "http://localhost/sonkei-fc-backend/controller/PlayersController.php"
            );

            if (!response.ok) {
                throw new Error("Error al obtener las imágenes");
            }

            const result = await response.json();
            setPlayers(result);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    //useEffect para obtener las imágenes desde la API cuando el componente se monta.
    //Este efecto solo se ejecuta una vez, cuando el componente se monta.
    useEffect(() => {
        //Ejecuta la función para obtener la imágenes
        getPlayers();
    }, []);

     // Muestra un mensaje de carga mientras las imágenes están siendo obtenidas
     if (loading) {
        return <div className="text-black pt-40">Loading...</div>;
    }


    // Muestra un mensaje de error si ocurrió algún problema al obtener las imágenes
    if (error) {
        return <div>Error: {error.message}</div>;
    }

     // Función para avanzar al siguiente jugador
     const nextPlayer = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % players.length);
    };

    // Función para retroceder al jugador anterior
    const prevPlayer = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + players.length) % players.length);
    };

    /**
     * Función para generar un array de componentes de estrellas basado en una valoración dada.
     * Crea un conjunto de estrellas llenas y vacías para representar visualmente una valoración.
     *
     * @function renderStars
     * @param {number} rate - La valoración a representar, debe ser un número entre 0 y 5.
     * @returns {Array} Un array de componentes React representando estrellas llenas y vacías.
    */
    const renderStars = (rate) => {
        const totalStars = 5;

        const filledStars = Array.from({length: rate}, (_, i) => (
            <FilledStar key={`filled-${i}`} alt="Filled Star" className="size-5 text-yellow" />
        ));

        const outlineStars = Array.from({length: totalStars - rate}, (_, i) => (
            <OutlineStar key={`outline-${i}`} alt="Outline Star" className="size-5 text-yellow" />
        ));
        
        return [...filledStars, ...outlineStars];
    };

    return (
        <section className="bg-black relative overflow-hidden w-full mt-10" id='equipo'>
            <h1 className="text-white text-5xl font-bold pt-20 pb-10">Equipo</h1>

            <div className="relative w-full h-full flex items-center justify-center overflow-hidden pt-10">
                <div className="relative lg:w-[20%] w-full h-full flex items-center transition-transform duration-700"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {players.map((player) => (
                        <div key={player.id} className='relative w-full h-full flex-shrink-0 flex items-center justify-center'>
                            <div className='flex flex-col justify-center items-center gap-1'>
                                <img src={player.img} alt={`Imagen de ${player.name}`} className='size-36 rounded-full object-cover'/>
                                <div className='flex flex-col justify-center items-center gap-0'>
                                    <h3 className="text-white text-xl font-bold">{player.name}</h3>
                                    <p className="text-white font-medium text-sm">{player.position}</p>
                                    <p className="text-white font-normal text-xs">{player.career}</p>
                                </div>
                                <div className='flex flex-row items-center justify-center'>
                                    {renderStars(player.rate)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <ButtonLeft
                className="self-center size-12 text-white shadow shadow-black/60 absolute top-2/3 left-4 -translate-y-1/2 rounded-lg transition hover:scale-110 hover:bg-yellow hover:text-black cursor-pointer"
                onClick={prevPlayer}
            />

            <ButtonRight
                className="self-center size-12 text-whiteshadow shadow-black/60 absolute top-2/3 right-4 -translate-y-1/2 rounded-lg transition hover:scale-110 hover:bg-yellow hover:text-black cursor-pointer"
                onClick={nextPlayer}
            />
        </section>
    )
}

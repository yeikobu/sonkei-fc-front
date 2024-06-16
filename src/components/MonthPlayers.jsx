import { useState, useEffect } from "react";
import ButtonLeft from "../assets/icons/chevron-left.svg";
import ButtonRight from "../assets/icons/chevron-right.svg";
import Diamond from "../assets/icons/diamond.svg"

export const MonthPlayers = () => {
    //Estado para almacenar todos los mvps
    const [mvps, setMvps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Estado para controlar el índice de la imagen actual en el carrusel
    const [currentIndex, setCurrentIndex] = useState(0);

    /**
     * Función para obtener imágenes desde una API.
     * Realiza una petición fetch a una URL específica y actualiza el estado con las imágenes obtenidas.
     *
     * @async
     * @function getMvps
     * @throws {Error} Si la respuesta no es correcta o si ocurre algún error durante la petición a la API.
     * @returns {void}
     */
    const getMvps = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                "http://localhost/sonkei-fc-backend/controller/MVPsController.php"
            );

            if (!response.ok) {
                throw new Error("Error al obtener las imágenes");
            }

            const result = await response.json();
            setMvps(result);
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
        getMvps();
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
        setCurrentIndex((prevIndex) => (prevIndex + 1) % mvps.length);
    };

    // Función para retroceder al jugador anterior
    const prevPlayer = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + mvps.length) % mvps.length);
    };


    return (
        <section className="relative overflow-hidden w-full">
            <h1 className="text-black text-5xl font-bold pt-20 pb-10">Jugador del mes</h1>

            <div className="relative w-full h-full flex items-center justify-center overflow-hidden pt-10">
                <div className="relative lg:w-[37%] w-full h-full flex items-center transition-transform duration-700"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {mvps.map((mvp) => (
                        <div key={mvp.id + mvp.date} className="relative w-full h-full flex-shrink-0 flex items-center justify-center">
                            <img src={mvp.img} className="rounded-full size-72 object-cover" />
                            <div className="absolute inset-0 flex flex-col items-center justify-end">
                                <div className="bg-black/70 mb-7 p-1 rounded-lg">
                                    <div className="flex flex-row justify-center items-center gap-1">
                                        <Diamond className="text-yellow text-sm"/>
                                        <p className="font-bold text-md">{mvp.date}</p>
                                    </div>
                                    <h3 className="text-yellow text-xl font-bold">{mvp.name}</h3>
                                    <div className="flex flex-row gap-4 items-center justify-around">
                                        <p className="text-yellow font-bold">{mvp.category == 1 ? "Profesional" : mvp.category == 2 ? "Juvenil" : "Niño"}</p>
                                        <p className="text-white font-bold">{mvp.award}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <ButtonLeft
                className="self-center size-12 text-white bg-blue shadow shadow-black/60 absolute top-2/3 left-4 -translate-y-1/2 rounded-lg transition hover:scale-110 hover:bg-yellow hover:text-black cursor-pointer"
                onClick={prevPlayer}
            />

            <ButtonRight
                className="self-center size-12 text-white bg-blue shadow shadow-black/60 absolute top-2/3 right-4 -translate-y-1/2 rounded-lg transition hover:scale-110 hover:bg-yellow hover:text-black cursor-pointer"
                onClick={nextPlayer}
            />
        </section>
    );
};

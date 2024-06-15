import { useState, useEffect } from "react";

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

    return (
        <section className="relative overflow-hidden w-full">
            <h1 className="text-black text-5xl font-bold pt-6">Jugador del mes</h1>

            {mvps.map((mvp) => (
                <div key={mvp.id} className="relative size-72 overflow-hidden m-auto">
                    <img src={mvp.img} className="rounded-full size-72 object-cover" />
                    <div className="absolute inset-0 flex flex-col items-center justify-end">
                        <h3 className="text-black">{mvp.name}</h3>
                        <div className="flex flex-row items-center justify-around">
                            <p>{mvp.category == 1 ? "Profesional" : mvp.category == 2 ? "Juvenil" : "Niño"}</p>
                            <p>{mvp.award}</p>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

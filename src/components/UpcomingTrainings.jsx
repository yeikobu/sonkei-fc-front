import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

const Countdown = ({ targetDate, location, category }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                días: Math.floor(difference / (1000 * 60 * 60 * 24)),
                horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutos: Math.floor((difference / 1000 / 60) % 60)
            };
        }

        return timeLeft;
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const formattedDate = new Date(targetDate).toLocaleString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="text-black bg-white shadow-lg rounded-lg p-6 m-4 max-w-64">
            <h2 className="text-xl font-bold mb-2">{category}</h2>
            <p className="mb-2 text-sm font-semibold">{formattedDate}</p>
            <p className="mb-4 text-sm font-semibold">{location}</p>
            <div className="text-md font-bold">
                {Object.keys(timeLeft).length === 0 ? (
                    <span>¡El entrenamiento ha comenzado!</span>
                ) : (
                    Object.entries(timeLeft).map(([unit, value]) => (
                        <span key={unit} className="mr-4">
                            {value} {unit}
                        </span>
                    ))
                )}
            </div>
        </div>
    );
};

//Para especificar los tipos de props que se reciben
Countdown.propTypes = {
    targetDate: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
};

export const UpcomingTrainings = () => {
    const [upcomingTrainings, setUpcomingTrainings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nextTrainings, setNextTrainings] = useState({});

    /**
     * Función para obtener los siguientes entrenamientos desde una API.
     * Realiza una petición fetch a una URL específica y actualiza el estado con los entrenamientos.
     *
     * @async
     * @function getUpcomingTrainings
     * @throws {Error} Si la respuesta no es correcta o si ocurre algún error durante la petición a la API.
     * @returns {void}
     */
    const getUpcomingTrainings = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                "http://localhost/sonkei-fc-backend/controller/UpcomingTrainingsController.php"
            );
            if (!response.ok) {
                throw new Error("Error al obtener los entrenamientos");
            }
            const result = await response.json();
            setUpcomingTrainings(result);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getUpcomingTrainings();
    }, []);

    useEffect(() => {
        if (upcomingTrainings.length > 0) {
            const categories = ['Cadetes', 'Infantiles', 'Juveniles', 'Profesionales'];
            const now = new Date();
            
            const next = categories.reduce((acc, category) => {
                const nextTraining = upcomingTrainings
                    .filter(t => t.category === category && new Date(t.date) > now)
                    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];
                
                if (nextTraining) {
                    acc[category] = nextTraining;
                }
                return acc;
            }, {});

            setNextTrainings(next);
        }
    }, [upcomingTrainings]);

    if (loading) {
        return <div className="text-black pt-40">Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="bg-black flex flex-col w-full py-20">
            <h1 className='text-white text-5xl font-bold pb-10'>Próximos entrenamientos</h1>

            <div className='flex flex-row flex-wrap justify-center items-center'>
                {Object.entries(nextTrainings).map(([category, training]) => (
                    <Countdown
                        key={category}
                        targetDate={training.date}
                        location={training.location}
                        category={category}
                    />
                ))}
            </div>
        </div>
    );
}
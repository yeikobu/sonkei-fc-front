import { useState } from 'react';
import logo from '../assets/sonkei-logo.webp'

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d+$/;
        const messageRegex = /^[^<>?]{10,}$/;

        if (!formData.name) newErrors.name = 'Nombre completo es obligatorio.';
        if (!formData.email) newErrors.email = 'Correo electrónico es obligatorio.';
        else if (!emailRegex.test(formData.email)) newErrors.email = 'Correo electrónico no es válido.';
        if (!formData.phone) newErrors.phone = 'Teléfono es obligatorio.';
        else if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Teléfono debe contener solo dígitos.';
        if (!formData.message) newErrors.message = 'Mensaje es obligatorio.';
        else if (!messageRegex.test(formData.message)) newErrors.message = 'Mensaje debe tener un mínimo de 10 caracteres y no debe aceptar caracteres especiales: <>?.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Aquí puedes manejar el envío del formulario (e.g., enviar los datos a una API)
            console.log('Formulario enviado:', formData);

            // Limpiar el formulario y mostrar mensaje de éxito
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: '',
            });
            setSuccessMessage('Mensaje enviado con éxito');

            // Limpiar el mensaje de éxito después de 3 segundos
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        }
    };

    return (
        <div className="bg-black flex flex-col items-center justify-center py-10">
            <h1 className="text-white text-5xl font-bold pb-10">Formulario de Contacto</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <img src={logo} alt="Sonkei - logo" className='size-36 m-auto'/>
                
                <div className="mb-4 text-start">
                    <label className="block text-black font-bold mb-2">Nombre completo:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.name && <span className="text-red text-sm">{errors.name}</span>}
                </div>
                <div className="mb-4  text-start">
                    <label className="block text-black font-bold mb-2">Correo electrónico:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.email && <span className="text-red text-sm">{errors.email}</span>}
                </div>
                <div className="mb-4  text-start">
                    <label className="block text-black font-bold mb-2">Teléfono:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.phone && <span className="text-red text-sm">{errors.phone}</span>}
                </div>
                <div className="mb-4 text-start">
                    <label className="block text-black font-bold mb-2">Mensaje:</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    ></textarea>
                    {errors.message && <span className="text-red text-sm">{errors.message}</span>}
                </div>
                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-yellow hover:text-black hover:scale-110 transition duration-300"
                    >
                        Enviar
                    </button>
                </div>
                {successMessage && (
                    <div className="mt-4 text-green text-center">
                        {successMessage}
                    </div>
                )}
            </form>
        </div>
    );
};

export default ContactForm;

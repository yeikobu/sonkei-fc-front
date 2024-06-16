import zamorano from '../assets/zamorano.jpg'
import salas from '../assets/salas.jpg'

const testimonies = [
    {
        name: 'Iván Zamorano', 
        img: zamorano,
        testimony: 'Las bases que me dieron en Sonkei FC fueron las mejores, fueron las que me ayudaron a convertirme en Pichichi en el Real Madrid.'
    }, 
    {
        name: 'Marcelo Salas', 
        img: salas,
        testimony: 'Haber entrenado en Sonkei fue lo que me ayudó a ser uno de los  goleadores hitóricos del país.'
    },
]



export const Testimonies = () => {
  return (
    <section className="flex flex-col justify-end items-center w-full py-20">
        <h1 className="text-black text-5xl font-bold pb-10">Testimonios</h1>

        <div className='flex lg:flex-row flex-col items-start justify-start gap-10 text-black'>
            {
                testimonies.map((testimony) => (
                    <div key={testimony.name} className="w-80 flex flex-col justify-center items-center">
                        <img src={ testimony.img} alt={`Imagen de ${testimony.name}`} className="size-32 rounded-3xl object-cover"/>
                        <p className='text-lg font-bold'>{testimony.name}</p>
                        <p className='text-base font-semibold italic pt-3'>{`"${testimony.testimony}"`}</p>
                    </div>
                ))
            }
        </div>
    </section>
  )
}

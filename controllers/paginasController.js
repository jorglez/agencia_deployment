import { Viaje } from '../models/Viaje.js'
import { testimonial } from '../models/testimoniales.js'

const paginaInicio = async (req, res) => {//req = lo enviado, res = lo que el servidor responde
    const promiseDB = []
    promiseDB.push(Viaje.findAll({ limit: 3 }))
    promiseDB.push(testimonial.findAll({ limit: 3 }))
    //consultar 3 viajes del modelo viaje
    try {

        const resultado = await Promise.all(promiseDB)

        res.render('inicio', {
            pagina: "inicio",
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        })
    } catch (error) {
        console.log(error)
    }


}

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: "Nosotros"
    })
}

const paginaViajes = async (req, res) => {
    //consultar base de datos
    const viajes = await Viaje.findAll()

    res.render("viajes", {
        pagina: "Próximos Viajes",
        viajes
    })
}

//mostrar página del viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params
    try {
        const viaje = await Viaje.findOne({ where: { slug } })
        const formatoPrecio = new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 2
        })

        res.render('viaje', {
            pagina: 'informacion viaje',
            viaje,
            imagen: viaje.imagen,
            precio: formatoPrecio.format(viaje.precio)
        })
    } catch (error) {
        console.log(error)
    }
}

const paginaTestimoniales = async (req, res) => {

    try {
        const testimoniales = await testimonial.findAll()
        res.render('testimoniales', {
            pagina: "testimoniales",
            testimoniales
        })
    } catch (error) {
        console.log(error)
    }

}


export { paginaInicio, paginaNosotros, paginaViajes, paginaTestimoniales, paginaDetalleViaje }
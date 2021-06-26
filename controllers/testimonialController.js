import { testimonial } from "../models/testimoniales.js"

export const guardarTestimonial = async (req, res) => {

    try {
        const { nombre, email, mensaje } = req.body
        await testimonial.create({
            nombre,
            email,
            mensaje
        })
        res.redirect('/testimoniales')
    } catch (error) {
        console.log(error)
    }

}
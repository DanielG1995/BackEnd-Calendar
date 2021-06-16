const { response } = require('express');
const Evento = require('../models/Events')

const newEvent = async (req, res = response) => {

    const { body } = req;
    const evento = new Evento(body);
    evento.user = req.uid;

    try {
        await evento.save();
        res.json({
            ok: true,
            evento
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server error 500'
        })
    }

}

const getEvents = async (req, res = response) => {
    try {
        const events = await Evento.find().populate('user', 'name');
        res.json({
            ok: true,
            events
        })
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'Error interno :('
        })
    }

}
const editEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const { uid } = req
    try {

        const evento = await Evento.findById(eventId)
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el evento'
            })
        }
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No esta autorizado para editar el evento'
            })
        }
        const newEvent = {
            ...req.body,
            user: uid
        }
        const eventoActualizado = await Evento.findByIdAndUpdate(eventId, newEvent, { new: true })
        console.log('newEvent', newEvent);
        res.json({
            ok: true,
            eventoActualizado
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error Interno',
            error
        })
    }

}
const deleteEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const { uid } = req
    try {

        const evento = await Evento.findById(eventId)
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el evento'
            })
        }
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No esta autorizado para eliminar el evento'
            })
        }
        const eventoBorrado = await Evento.findByIdAndDelete(eventId);
        res.json({
            ok: true,
            eventoBorrado
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error Interno',
            error
        })
    }

}

module.exports = {
    newEvent,
    deleteEvent,
    editEvent,
    getEvents
}
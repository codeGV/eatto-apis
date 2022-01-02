'use strict'

const response = require('../exchange/response')
const service = require('../services/carts')
const mapper = require('../mappers/cart')

exports.create = async (req, res) => {
    const log = req.context.logger.start(`api/carts`)
    try {
        const cart = await service.create(req.body, req.context)
        log.end()
        return response.data(res, mapper.toModel(cart))
    } catch (err) {
        log.end()
        return response.failure(res, 'unable to add in cart')
    }
}

exports.get = async (req, res) => {
    const log = req.context.logger.start(`api/carts/get`)
    try {
        const cart = await service.get(req, req.context)
        log.end()
        return response.data(res, cart)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}

exports.update = async (req, res) => {
    const log = req.context.logger.start(`api/carts/update${req.params.id}`)
    try {
        const cart = await service.update(req,req.params.id, req.body, req.context)
        log.end()
        return response.data(res, cart)
    } catch (err) {
        log.end()
        return response.failure(res, err.message)
    }
}






















// exports.getAll = async (req, res) => {
//     try {
//         const cart = await service.getAll(req.context)
//         return response.data(res, cart)
//     } catch (err) {
//         return response.failure(res, err.message)
//     }
// }
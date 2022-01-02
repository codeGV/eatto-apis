'use strict'

const response = require('../exchange/response')
const service = require('../services/orders')


exports.create = async (req, res) => {
    const log = req.context.logger.start(`api/orders`)
    try {
        const order = await service.create(req.body, req.context)
        log.end()
        return response.data(res, order)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, 'Order already exists')
    }

}

exports.getById = async (req, res) => {
    const log = req.context.logger.start(`api/orders/get/${req.params.id}`)
    try {
        const order = await service.getById(req.params.id, req, req.context)
        log.end()
        return response.data(res, order)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}

exports.get = async (req, res) => {
    const log = req.context.logger.start(`api/orders/get`)
    try {
        const order = await service.get(req, req.context)
        log.end()
        return response.data(res, order)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}

exports.update = async (req, res) => {
    const log = req.context.logger.start(`api/orders/${req.params.id}`)
    try {
        const order = await service.update(req.params.id, req.body, req.context)
        log.end()
        return response.data(res, order)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}
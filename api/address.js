'use strict'

const response = require('../exchange/response')
const service = require('../services/address')
const mapper = require('../mappers/address')

exports.create = async (req, res) => {
    const log = req.context.logger.start(`api/address`)

    try {
        const user = await service.create(req.body, res, req.context)
        log.end()
        return response.data(res, user)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}

exports.getById = async (req, res) => {
    const log = req.context.logger.start(`api/address/getById/${req.params.id}`)

    try {
        const user = await service.getById(req.params.id, req.context)
        log.end()
        return response.data(res, user)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}

exports.get = async (req, res) => {
    const log = req.context.logger.start(`api/address/get`)

    try {
        const user = await service.get(req, req.context)
        log.end()
        return response.data(res, user)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}

exports.update = async (req, res) => {
    const log = req.context.logger.start(`api/address/${req.params.id}`)

    try {
        const user = await service.update(req.params.id, req.body, res, req.context)
        log.end()
        return response.data(res, user)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}


exports.delete = async (req, res) => {
    const log = req.context.logger.start(`api/address/delete${req.params.id}`)
    try {
        const address = await service.deleteAddress(req.params.id, req.context)
        log.end()
        return response.data(res, 'successfully removed')
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}
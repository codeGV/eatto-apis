'use strict'

const response = require('../exchange/response')
const service = require('../services/outlets')
// const mapper = require('../mappers/outlet')

exports.create = async (req, res) => {
    const log = req.context.logger.start(`api/outlets`)
    try {
        const outlet = await service.create(req.body, req.context)
        log.end()
        return response.data(res, outlet)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}

exports.search = async (req, res) => {
    const log = req.context.logger.start('api/outlets/search')

    try {
        const outlet = await service.search(req, req.context)
        log.end()
        return response.data(res, outlet)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}

exports.getById = async (req, res) => {
    const log = req.context.logger.start(`api/outlets/get/${req.params.id}`)
    try {
        const outlet = await service.getById(req.params.id, req.context)
        log.end()
        return response.data(res, outlet)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}
exports.get = async (req, res) => {
    const log = req.context.logger.start(`api/outlets/get`)
    try {
        const outlet = await service.get(req, req.context)
        log.end()
        return response.data(res, outlet)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}

exports.update = async (req, res) => {
    const log = req.context.logger.start(`api/outlets/${req.params.id}`)
    try {
        const outlet = await service.update(req.params.id, req.body, req.context)
        log.end()
        return response.data(res, outlet)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}

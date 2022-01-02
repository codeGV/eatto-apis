'use strict'

const response = require('../exchange/response')
const service = require('../services/items')

exports.create = async (req, res) => {
    const log = req.context.logger.start(`api/items`)
    try {
        const item = await service.create(req.body, req.context)
        log.end()
        return response.data(res, item)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}

exports.search = async (req, res) => {
    const log = req.context.logger.start(`api/items/search`)
    try {
        const item= await service.search(req, req.context)
        log.end()
        return response.data(res, item)
    } catch (err) {
        log.end()
        return response.failure(res, err.message)
    }
}
exports.getById = async (req, res) => {
    const log = req.context.logger.start(`api/items/get/${req.params.id}`)
    try {
        const item = await service.getById(req,req.params.id, req.context)
        log.end()
        return response.data(res, item)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}
exports.get = async (req, res) => {
    const log = req.context.logger.start(`api/items/get`)
    try {
        const item = await service.get(req,req.context)
        log.end()
        return response.data(res, item)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}

exports.update = async (req, res) => {
    const log = req.context.logger.start(`api/items/${req.params.id}`)
    try {
        const item = await service.update(req.params.id, req.body, req.context)
        log.end()
        return response.data(res, item)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}

exports.delete = async (req, res) => {
    const log = req.context.logger.start(`api/items/delete${req.params.id}`)
    try {
        const category = await service.deleteItems(req.params.id, req.context)
        log.end()
        return response.data(res, 'successfully removed')
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}

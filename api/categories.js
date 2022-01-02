'use strict'

const response = require('../exchange/response')
const service = require('../services/category')

exports.create = async (req, res) => {
    const log = req.context.logger.start(`api/categories`)
    try {
        const category = await service.create(req.body, req.context)
        log.end()
        return response.data(res, category) 

    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}
exports.getById = async (req, res) => {
    const log = req.context.logger.start(`api/categories/get/${req.params.id}`)
    try {
        const category = await service.getById(req,req.params.id, req.context)
        log.end()
        return response.data(res, category)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res.err.message)
    }
}
exports.get = async (req, res) => {
    const log = req.context.logger.start(`api/categories/get`)
    try {
        const category = await service.get(req, req.context)
        log.end()
        return response.data(res, category)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res.err.message)
    }
}
exports.update = async (req, res) => {
    const log = req.context.logger.start(`api/categories/${req.params.id}`)
    try {
        const category = await service.update(req.params.id, req.body, req.context)
        log.end()
        return response.data(res, category)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res.err.message)
    }
}

exports.delete = async (req, res) => {
    const log = req.context.logger.start(`api/categories/delete${req.params.id}`)
    try {
        const category = await service.deleteCategories(req.params.id, req.context)
        log.end()
        return response.data(res, 'successfully removed')
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}
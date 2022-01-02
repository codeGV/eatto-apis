'use strict'

const response = require('../exchange/response')
const service = require('../services/configs')

exports.create = async (req, res) => {
    const log = req.context.logger.start(`api/configs`)
    try {
        const config = await service.create(req.body, req.context)
        log.end()
        return response.data(res, config)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, 'config already exists')
    }

}

exports.getById = async (req, res) => {
    const log = req.context.logger.start(`api/configs/get/${req.params.id}`)
    try {
        const config = await service.getById(req.params.id, req.context)
        log.end()
        return response.data(res, config)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}

exports.update = async (req, res) => {
    const log = req.context.logger.start(`api/configs/${req.params.id}`)
    try {
        const config = await service.update(req.params.id, req.body, req.context)
        log.end()
        return response.data(res, config)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}
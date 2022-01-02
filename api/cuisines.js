'use strict'
const response=require('../exchange/response')
const service=require('../services/cuisines')
// const mapper=require('../mappers/cuisines')

exports.create = async (req, res) => {
    const log = req.context.logger.start(`api/cuisines`)

    try {
        const cuisines = await service.create(req.body,res, req.context)
        log.end()
        return response.data(res, cuisines)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}

exports.getById = async (req, res) => {
    const log = req.context.logger.start(`api/cuisines/getById/${req.params.id}`)

    try {
        const cuisines = await service.getById(req.params.id,req.context)
        log.end()
        return response.data(res, cuisines)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}

exports.get = async (req, res) => {
    const log = req.context.logger.start(`api/cuisines/get`)

    try {
        const cuisines= await service.get(req.context)
        log.end()
        return response.data(res, cuisines)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}

exports.update = async (req, res) => {
    const log = req.context.logger.start(`api/cuisines/${req.params.id}`)

    try {
        const cuisines = await service.update(req.params.id, req.body,res, req.context)
        log.end()
        return response.data(res, cuisines)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}


exports.delete = async (req, res) => {
    const log = req.context.logger.start(`api/cuisines/delete${req.params.id}`)
    try {
        const cuisines = await service.deleteCuisine(req.params.id, req.context)
        log.end()
        return response.data(res, 'successfully removed')
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}
'use strict'

const response = require('../exchange/response')
const service = require('../services/files')

exports.create = async (req, res) => {
    const log = req.context.logger.start(`api/files`)
    try {
        const file = await service.create(req, req.body, req.context)
        log.end()
        return response.data(res, file)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, 'file already exists')
    }

}

exports.getById = async (req, res) => {
    const log = req.context.logger.start(`api/files/get/${req.params.id}`)
    try {
        const file = await service.getById(req.params.id, req.context)
        log.end()
        return response.data(res, file)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}

exports.upload = async (req, res) => {

    try {
        let data = await service.upload(req.files.file)

        return response.data(res, data)
    } catch (err) {

        return response.failure(res, err.message)
    }

}

// 'use strict'

// const response = require('../exchange/response')
// const service = require('../services/subCategories')

// exports.create = async (req, res) => {
//     const log = req.context.logger.start(`api/subCategories`)
//     try {
//         const subCategory = await service.create(req.body, req.context)
//         log.end()
//         return response.data(res, subCategory)
//     } catch (err) {
//         log.error(err.message)
//         log.end()
//         return response.failure(res, err.message)
//     }
// }
// exports.getById = async (req, res) => {
//     const log = req.context.logger.start(`api/subCategories/get/${req.params.id}`)
//     try {
//         const subCategory = await service.getById(req.params.id, req.context)
//         log.end()
//         return response.data(res, subCategory)
//     } catch (err) {
//         log.error(err.message)
//         log.end()
//         return response.failure(res.err.message)
//     }
// }
// exports.get = async (req, res) => {
//     const log = req.context.logger.start(`api/subCategories/get`)
//     try {
//         const subCategory = await service.get(req, req.context)
//         log.end()
//         return response.data(res, subCategory)
//     } catch (err) {
//         log.error(err.message)
//         log.end()
//         return response.failure(res.err.message)
//     }
// }
// exports.update = async (req, res) => {
//     const log = req.context.logger.start(`api/subCategories/${req.params.id}`)
//     try {
//         const subCategory = await service.update(req.params.id, req.body, req.context)
//         log.end()
//         return response.data(res, subCategory)
//     } catch (err) {
//         log.error(err.message)
//         log.end()
//         return response.failure(res, err.message)
//     }
// }

// 'use strict'

// const response = require('../exchange/response')
// const service = require('../services/customizableCategory')

// exports.create = async (req, res) => {
//     const log = req.context.logger.start(`api/customizableCategories`)
//     try {
//         const customizableCategory = await service.create(req.body, req.context)
//         log.end()
//         return response.data(res, customizableCategory)

//     } catch (err) {
//         log.error(err.message)
//         log.end()
//         return response.failure(res, err.message)
//     }
// }
// exports.getById = async (req, res) => {
//     const log = req.context.logger.start(`api/customizableCategories/get/${req.params.id}`)
//     try {
//         const customizableCategory = await service.getById(req.params.id, req.context)
//         log.end()
//         return response.data(res, customizableCategory)
//     } catch (err) {
//         log.error(err.message)
//         log.end()
//         return response.failure(res.err.message)
//     }
// }
// exports.get = async (req, res) => {
//     const log = req.context.logger.start(`api/customizableCategories/get`)
//     try {
//         const customizableCategory = await service.get(req, req.context)
//         log.end()
//         return response.data(res, customizableCategory)
//     } catch (err) {
//         log.error(err.message)
//         log.end()
//         return response.failure(res.err.message)
//     }
// }
// exports.update = async (req, res) => {
//     const log = req.context.logger.start(`api/customizableCategories/${req.params.id}`)
//     try {
//         const customizableCategory = await service.update(req.params.id, req.body, req.context)
//         log.end()
//         return response.data(res, customizableCategory)
//     } catch (err) {
//         log.error(err.message)
//         log.end()
//         return response.failure(res.err.message)
//     }
// }
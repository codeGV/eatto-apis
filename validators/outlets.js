'use strict'

const response = require('../exchange/response')

exports.canCreate = (req, res, next) => {
    if (!req.body.name) {
        response.failure(res, 'Name is required')
    }
    if (!req.body.image) {
        response.failure(res, 'Image is required')
    }
    return next()
}
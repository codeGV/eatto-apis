'use strict'

const response = require('../exchange/response')

exports.canCreate = (req, res, next) => {
    if (!req.body.phone) {
        response.notFound(res, 'phone_required')
    }
    if (!req.body.role) {
        response.notFound(res, 'role_required')
    }
    return next()
}
exports.verifyUser = (req, res, next) => {
    if (!req.body.phone) {
        response.notFound(res, 'phone_required')
    }
    if (!req.body.otp) {
        response.notFound(res, 'otp_required')
    }
    return next()
}

exports.getById = (req, res, next) => {

    if (!req.params && !req.params.id) {

        return response.notFound(res, 'id_required')
    }

    return next()
}

exports.update = (req, res, next) => {
    if (!req.params && !req.params.id) {
        return response.notFound(res, 'id_required')

    }
    return next()
}

exports.login = (req, res, next) => {
    if (!req.body.role) {
        response.failure(res, 'role_required')
    }
    if (!req.body.password) {
        response.notFound(res, 'password_required')
    }
    return next()
}

exports.changePassword = (req, res, next) => {
    if (!req.body.password) {
        response.notFound(res, 'password_required')
    }
    if (!req.body.newPassword) {
        response.notFound(res, 'new_password_required')
    }

    return next()
}
exports.forgotPassword = (req, res, next) => {
    if (!req.body.phone) {
        response.notFound(res, 'Phone_required')
    }
    return next()
}
exports.resetPassword = (req, res, next) => {
    if (!req.body.otp) {
        response.notFound(res, 'otp_required')
    }
    if (!req.body.newPassword) {
        response.notFound(res, 'new_password_required')
    }
    return next()
}
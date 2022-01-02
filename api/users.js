'use strict'

const response = require('../exchange/response')
const service = require('../services/users')
const mapper = require('../mappers/user')

exports.userExists = async (req, res) => {
    const log = req.context.logger.start(`api/users`)

    try {
        const user = await service.userExists(req.body,req.body,res, req.context)
        log.end()
        return response.data(res,mapper.toModel( user))
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }

}

exports.createOrUpdate = async (req, res) => {
    const log = req.context.logger.start(`api/users`)

    try {
        const user = await service.createOrUpdate(req.body,req.body,res, req.context)
        log.end()
        return response.data(res, user)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }

}
exports.verifyUser = async (req, res) => {
    const log = req.context.logger.start("api/users/verifyUser")

    try {
        const user = await service.verifyUser(req.body,res, req.context)
        log.end()
        return response.data(res, mapper.toVerifyUser(user))
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }

}



exports.getById = async (req, res) => {
    const log = req.context.logger.start(`api/users/getById/${req.params.id}`)

    try {
        const user = await service.getById(req.params.id, res,req.context)
        log.end()
        return response.data(res,user)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}

exports.get = async (req, res) => {
    const log = req.context.logger.start(`api/users/get`)

    try {
        const user = await service.get(req,req.context)
        log.end()
        return response.data(res, user)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}

exports.update = async (req, res) => {
    const log = req.context.logger.start(`api/users/${req.params.id}`)

    try {
        const user = await service.update(req.params.id, req.body,res, req.context)
        log.end()
        return response.data(res, user)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}

exports.login = async (req, res) => {
    const log = req.context.logger.start('api/users/login')

    try {
        const user = await service.login(req.body,res, req.context)

        if (user && user.isVerified == true) {
            log.end()
            return response.authorized(res, mapper.toUser(user))
        } else {
            log.end()
            return response.authorized(res, mapper.toModel(user))
        }
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}

exports.changePassword = async (req, res) => {
    const log = req.context.logger.start(`api/users/changePassword`)

    try {
        const user = await service.changePassword(req.body, res,req.context)
        log.end()
        return response.data(res, 'Password changed successfully')
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}

exports.forgotPassword = async (req, res) => {
    const log = req.context.logger.start(`api/users/forgotPassword`)

    try {
        const user = await service.forgotPassword(req.body,res, req.context)
        log.end()
        return response.data(res, "otp send successfully")
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}
exports.resetPassword = async (req, res) => {
    const log = req.context.logger.start(`api/users/verifyOtp`)

    try {
        const user = await service.resetPassword(req.body,res, req.context)
        log.end()
        return response.data(res, 'Password changed successfully')
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}

exports.logOut = async (req, res) => {
    const log = req.context.logger.start('api/users/logout')

    try {
        const user = await service.logOut(req.params.id, res, req.context)
        log.end()
        return response.data(res, mapper.toModel(user))

    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}
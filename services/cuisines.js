'use strict'

const response = require('../exchange/response')

const set = (model, entity, context) => {
    const log = context.logger.start('services/cuisines/set')
    try {

        if (model.name) {
            entity.name = model.name
        }
        if (model.status) {
            entity.status = model.status
        }
        log.end()
        return entity
    } catch (err) {
        throw new Error(err)
    }
}

const create = async (model, res, context) => {
    const log = context.logger.start('services/cuisines')
    let cuisines
    try {
        // create cuisines
        cuisines = await new db.cuisines(model).save()
        log.end()
        return cuisines
    } catch (err) {
        log.end()
        throw new Error(err)
    }

}
const getById = async (id, context) => {
    const log = context.logger.start(`services/cuisines/getById:${id}`)

    try {
        const cuisines = await db.cuisines.findById(id)
        log.end()
        return cuisines

    } catch (err) {
        log.end()
        throw new Error(err)
    }
}

const get = async (context) => {
    const log = context.logger.start(`api/cuisines/get`)
    try {
        
        let cuisines = await db.cuisines.find({}).sort({
            timeStamp: -1
        })
        log.end()
        return cuisines
    } catch (err) {
        log.end()
        throw new Error(err)
    }
}

const update = async (id, model, res, context) => {
    const log = context.logger.start(`services/cuisines:${id}`)
    try {

        const entity =await db.cuisines.findById(id)
        if (!entity) {
            return response.notFound(res, 'not_found')
        }

        // call set method to update user
        await set(model, entity, context)
        log.end()
        return entity.save()
    } catch (err) {
        throw new Error(err)
    }
}

const deleteCuisine = async (id, context, res) => {
    const log = context.logger.start(`services/cuisines/delete:${id}`)
    try {
        let cuisines = await db.cuisines.findOneAndDelete({'_id':id})
        log.end()
        return cuisines
    } catch (err) {
        log.end()
        throw new Error(err)
    }
}

exports.create = create
exports.getById = getById
exports.get = get
exports.update = update
exports.deleteCuisine = deleteCuisine
'use strict'

const service = require('./users')
const response = require('../exchange/response')

const set = (model, entity, context) => {
    const log = context.logger.start('services/users/set')
    try {

        if (model.houseNumber) {
            entity.address.houseNumber = model.houseNumber
        }
        if(model.addressLine){
            entity.address.addressLine=model.addressLine
        }
        if (model.landmark) {
            entity.address.landmark = model.landmark
        }
        if (model.location && model.location) {
            entity.address.location.latitude = model.location.latitude
        }
        if (model.tag) {
            entity.address.tag = model.tag
            if(model.tag=='other'){
                entity.address.addressTagLine=model.addressTagLine
            }
        }
        if (model.location && model.location) {
            entity.address.location.longitude = model.location.longitude
        }


        log.end()
        return entity
    } catch (err) {
        throw new Error(err)
    }
}

const create = async (model, res, context) => {
    const log = context.logger.start('services/address')
    try {
        let user
        let address

        if (model.userId) {

            // find user 
            user = await db.user.findOne({
                '_id': {
                    $eq: model.userId
                }
            })
            if (user) {

                // if (!user) create User
                address = await new db.address(model).save()
                await service.update(model.userId, address, res, context)


            } else {
                log.end()
                return response.notFound(res, 'user_notfound')
            }
            address.save();
            log.end()
            return address
        }

    } catch (err) {
        log.end()
        throw new Error(err)
    }

}




const getById = async (id, context) => {
    const log = context.logger.start(`services/users/getById:${id}`)

    try {
        const address = id === 'my' ? context.user : await db.address.findById(id)
        log.end()
        return address

    } catch (err) {
        log.end()
        throw new Error(err)
    }
}

const get = async (req, context) => {
    const log = context.logger.start(`api/users/get`)
    try {
        let params = req.query
        let address
        let pageNo = Number(params.pageNo) || 1
        let items = Number(params.items) || 10
        let skipCount = items * (pageNo - 1)
        if (params.userId && (params.userId != null && params.userId != undefined && params.userId != '')&&(params.pageNo != null || params.pageNo!= undefined || params.pageNo!= '')&&(params.items!=null||params.items!=undefined||params.items!='')) {
            address = await db.address.find({
                'userId': {
                    $eq: params.userId
                }
            }).skip(skipCount).limit(items).sort({
                timeStamp: -1
            });
        } else {
            address = await db.address.find({}).skip(skipCount).limit(items).sort({
                timeStamp: -1
            });
        }
        log.end()
        return address
    } catch (err) {
        log.end()
        throw new Error(err)
    }
}

const update = async (id, model, res, context) => {
    const log = context.logger.start(`services/address:${id}`)
    try {

        const entity = id === 'my' ? context.address : await db.address.findById(id)

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

const deleteAddress = async (id, context, res) => {
    const log = context.logger.start(`services/address/delete:${id}`)
    try {
        let address = await db.address.findByIdAndRemove(id)

        log.end()
        return address
    } catch (err) {
        log.end()
        throw new Error(err)
    }
}

exports.create = create
exports.getById = getById
exports.get = get
exports.update = update
exports.deleteAddress = deleteAddress
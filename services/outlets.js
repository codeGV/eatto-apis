'use strict'
const randomize = require('randomatic');


const set = async (entity, model, context) => {
    const log = context.logger.start('services/outlets/set')
    try {
        if (model.name) {
            entity.name = model.name
        }
        if (model.isApproved) {
            entity.isApproved = model.isApproved
        }
        if (model.isServicable) {
            entity.isServicable = model.isServicable
        }
        if (model.isPureVeg) {
            entity.isPureVeg = model.isPureVeg
        }
        if (model.averageTime) {
            entity.averageTime = model.averageTime
        }
        if (model.averagePrice) {
            entity.averagePrice = model.averagePrice
        }
        if (model.averageRating) {
            entity.averageRating = model.averageRating
        }
        if (model.image) {
            if (model.image.resize_url) {
                entity.image.resize_url = model.image.resize_url
            }
            if (model.image.resize_thumbnail) {
                entity.image.resize_thumbnail = model.image.resize_thumbnail
            }
        }
        if (model.address) {
            if (model.address.fullAddress) {
                entity.address.fullAddress = model.address.fullAddress
            }
            if (model.address.landMark) {
                entity.address.landMark = model.address.landMark
            }
            if (model.address.city) {
                entity.address.city = model.address.city
            }
            if (model.address.district) {
                entity.address.district = model.address.district
            }
            if (model.address.state) {
                entity.address.state = model.address.state
            }
            if (model.address.pinCode) {
                entity.address.pinCode = model.address.pinCode
            }
            if (model.address.country) {
                entity.address.country = model.address.country
            }
            if (model.address.location) {
                if (model.address.location.longitude) {
                    entity.address.location.longitude = model.address.location.longitude
                }
                if (model.address.location.latitude) {
                    entity.address.location.latitude = model.address.location.latitude
                }
            }
        }
        log.end()
        return entity

    } catch (err) {
        throw new Error(err)
    }
}

const create = async (body, context) => {
    const log = context.logger.start(`services/outlets`)
    try {
        let outlet

        if (body && ((body.outletCode !== null) && (body.outletCode != undefined) && (body.outletCode != ''))) {
            outlet = await db.outlet.findOne({
                'outletCode': {
                    $eq: body.outletCode
                }
            })
            if (!outlet) {
                throw new Error('No main Restaurant exists.')
            }

            if (body.outletType == "isMain") {
                throw new Error('Main Restaurant already exists.')
            } else {
                outlet = await new db.outlet(body).save()
            }

        } else {

            if (body.outletType == 'outlet') {
                throw new Error('No main Restaurant exists.')
            }
            // find user 
            user = await db.user.findOne({
                '_id': {
                    $eq: body.userId
                }
            })

            outlet = await new db.outlet(body).save()
            await service.update(model.userId, outlet, res, context)

            // outletCode
            const code = randomize('0', 5)
            outlet.outletCode = "#outlet" + code
            outlet.save()
            log.end()
        }

        return outlet
    } catch (err) {
        log.end()
        throw new Error(err)
    }
}
const getById = async (id, context) => {
    const log = context.logger.start(`services/outlets/get:${id}`)
    try {
        let outlet = await db.outlet.findById(id)
        log.end()
        return outlet
    } catch (err) {
        log.end()
        throw new Error(err)
    }
}
const get = async (req, context) => {
    const log = context.logger.start(`services/outlets/get`)
    try {
        let outlets
        let temp = []
        let params = req.query
        let queryModel = {}
        let pageNo = Number(params.pageNo) || 1
        let items = Number(params.items) || 10
        let skipCount = items * (pageNo - 1)
            // get outlets according to outletCode
            if (params && (params.outletCode != null||params.outletCode != undefined) && (params.type == null && params.type == undefined)&&(params.pageNo != null || params.pageNo!= undefined || params.pageNo!= '')&&(params.items!=null||params.items!=undefined||params.items!='')) {
                queryModel = {
                    'outletCode': {
                        $eq: params.outletCode
                    }
                }
            }
            if (params && (params.type != null && params.type != undefined) && (params.outletCode == null && params.outletCode == undefined)&&(params.pageNo != null || params.pageNo!= undefined || params.pageNo!= '')&&(params.items!=null||params.items!=undefined||params.items!='')) {
                queryModel = {
                    'outletType': {
                        $eq: params.type
                    }
                }
            }
            if (params && (params.type != null && params.type != undefined) && (params.outletCode != null && params.outletCode != undefined)&&(params.pageNo != null || params.pageNo!= undefined || params.pageNo!= '')&&(params.items!=null||params.items!=undefined||params.items!='')) {
                queryModel = {
                    'OutletType': {
                        $eq: params.type
                    },
                    'outletCode': {
                        $eq: params.outletCode
                    }
                }
            }
            outlets = await db.outlet.find(queryModel).skip(skipCount).limit(items).sort({
                timeStamp: -1
            });
            if (params && params.type == 'isMain') {
                if (outlets && outlets.length != 0) {
                    for (const outlet of outlets) {
                        if (outlet) {
                            let tempOutlets = await db.outlet.find({
                                'outletCode': {
                                    $eq: outlet.outletCode
                                },
                                "outletType": {
                                    $eq: 'outlet'
                                }
                            })
                            if (tempOutlets) {
                                for (const tempOutlet of tempOutlets) {
                                    if (tempOutlet) {
                                        temp.push({
                                            _id: tempOutlet.id
                                        })
                                    }
                                }
                            }

                        }
                        outlet.outlets = temp
                        temp = []
                    }

                }

            }
        
        log.end()
        return outlets
    } catch (err) {
        log.end()
        throw new Error(err)
    }
}
const update = async (id, model, context) => {
    const log = context.logger.start(`services/outlets:${id}`)
    try {

        const entity = await db.outlet.findById(id)
        if (!entity) {
            throw new Error('outlet not found')
        }
        let outlet = await set(entity, model, context)
        log.end()
        return outlet.save()

    } catch (err) {
        log.end()
        throw new Error(err)
    }
}


const search = async (req, context) => {
    const log = context.logger.start(`services/outlets/search`)
    try {
        let outlets
        const params = req.query;
        let queryModel = {}
        let pageNo = Number(params.pageNo) || 1
        let items = Number(params.items) || 10
        let skipCount = items * (pageNo - 1)
        let name = (params.name).toLowerCase()

        if (params && (params.name != undefined && params.name != null) && (params.pageNo != undefined && params.pageNo != null) && (params.items != undefined && params.items != null)) {
            queryModel = {
                $regex: name,
                $options: 'i'
            }

            outlets = db.outlet.aggregate(
                [{
                    $match: {
                        name: queryModel
                    }
                }]

            ).skip(skipCount).limit(items).sort({
                timeStamp: -1
            });
            // if (!outlets) {
            //     throw new Error("resturent  not found")
            // }


        } else {
            outlets = db.item.aggregate(
                [{
                    $match: {
                        name: queryModel
                    }
                }]

            )
            // if (!outlets) {
            //     throw new Error("dish not found")
            // }
        }
        log.end()
        return outlets
    } catch (err) {
        log.end()
        throw new Error(err)
    }
}

exports.create = create
exports.search = search
exports.getById = getById
exports.get = get
exports.update = update
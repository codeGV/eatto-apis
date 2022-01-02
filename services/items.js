'use strict'

const set = async (entity, model, context) => {
    const log = context.logger.start('services/items/set')
    try {
        if (model.name) {
            entity.name = model.name
        }
        if (model.image) {
            if (model.image.resize_url) {
                entity.image.resize_url = model.image.resize_url
            }
            if (model.image.resize_thumbnail) {
                entity.image.resize_thumbnail = model.image.resize_thumbnail
            }
        }
        if (model.averagePrice) {
            entity.averagePrice = model.averagePrice
        }
        if (model.isVeg) {
            entity.isVeg = model.isVeg
        }
        if (model.status) {
            entity.status = model.status
        }
        if (model.isCustomizable) {
            entity.isCustomizable = model.isCustomizable
        }
        if (model.fromTime) {
            entity.fromTime = model.fromTime
        }
        if (model.toTime) {
            entity.totime = model.toTime
        }
        if (model.isRecommanded) {
            entity.isRecommanded = model.isRecommanded
        }
        if (model.maxQuantity) {
            entity.maxQuantity = model.maxQuantity
        }
        log.end()
        return entity

    } catch (err) {
        throw new Error(err)
    }
}
const create = async (body, context) => {
    const log = context.logger.start(`services/items`)
    try {
        let item = await new db.item(body).save()
        item.quantity = 0
        item.save()
        log.end()
        return item
    } catch (err) {
        log.end()
        throw new Error(err)
    }
}
const getById = async (req, id, context) => {
    const log = context.logger.start(`services/items/get:${id}`)
    try {
        let addOnsItems = []
        let addOnsCategories = []
        let params = req.query
        let item = await db.item.findById(id)
        if (params && params.type == 'addOns') {
            let requestModel = {
                'parent.id': {
                    $eq: item.id
                },
                'parent.categoryType': 'addOns'
            }
            let category = await db.category.find(requestModel)
            if (category.length != 0) {
                for (const addOnsCategory of category) {
                    if (addOnsCategory) {
                        let tempItems = await db.item.find({
                            'categoryId': {
                                $eq: addOnsCategory.id
                            }
                        })
                        if (tempItems.length != 0) {
                            for (const addOnsItem of tempItems) {
                                if (addOnsItem) {
                                    addOnsItems.push({
                                        _id: addOnsItem.id,
                                        name: addOnsItem.name,
                                        averagePrice: addOnsItem.averagePrice,
                                        isVeg: addOnsItem.isVeg
                                    })
                                }
                            }

                        }
                        addOnsCategories.push({
                            categoryId: addOnsCategory.id,
                            categoryName: addOnsCategory.name,
                            isSingle: addOnsCategory.isSingle,
                            addOnsItems: addOnsItems,
                            isVeg: addOnsItem.isVeg
                        })
                    }
                    item.addOns = addOnsCategories
                    addOnsItems = []
                }

            }
        }
        // console.log(category)
        log.end()
        return item
    } catch (err) {
        log.end()
        throw new Error(err)
    }
}
const get = async (req, context) => {
    const log = context.logger.start(`services/items/get`)
    try {
        let params = req.query
        let item
        let queryModel
        let pageNo = Number(params.pageNo) || 1
        let items = Number(params.items) || 10
        let skipCount = items * (pageNo - 1)
        // if restaurantId
        if (params.categoryId && (params.categoryId != null || params.categoryId != undefined || params.categoryId != '')&&(params.pageNo != null || params.pageNo!= undefined || params.pageNo!= '')&&(params.items!=null||params.items!=undefined||params.items!='')) {
            queryModel = {
                'categoryId': {
                    $eq: params.categoryId
                }
            }
            // if status
            if (params.status && (params.status != null || params.status != undefined || params.status != '')) {
                queryModel = Object.assign({
                    "status": {
                        $eq: params.status
                    }
                }, queryModel)
            }

            // find item
            item = await db.item.find(queryModel).skip(skipCount).limit(items).sort({
                timeStamp: -1
            });
            log.end()

        } else if (params.isCustomizable && (params.isCustomizable != null || params.isCustomizable != undefined || params.isCustomizable != '')&&(params.pageNo != null || params.pageNo!= undefined || params.pageNo!= '')&&(params.items!=null||params.items!=undefined||params.items!='')) {
            queryModel = {
                'isCustomizable': {
                    $eq: params.isCustomizable
                }
            }
            // if status
            if (params.status && (params.status != null || params.status != undefined || params.status != '')) {
                queryModel = Object.assign({
                    "status": {
                        $eq: params.status
                    }
                }, queryModel)
            }

            // find item
            item = await db.item.find(queryModel).skip(skipCount).limit(items).sort({
                timeStamp: -1
            });
            log.end()
        } else if (params.isRecommanded && (params.isRecommanded != null && params.isRecommanded != undefined && params.isRecommanded != '')&&(params.pageNo != null || params.pageNo!= undefined || params.pageNo!= '')&&(params.items!=null||params.items!=undefined||params.items!='')) {
            queryModel = {
                'isRecommanded': {
                    $eq: params.isRecommanded
                }
            }
            // if status
            if (params.status && (params.status != null || params.status != undefined || params.status != '')) {
                queryModel = Object.assign({
                    "status": {
                        $eq: params.status
                    }
                }, queryModel)
            }

            // find item
            item = await db.item.find(queryModel).skip(skipCount).limit(items).sort({
                timeStamp: -1
            });
            log.end()

        } else {
            item = await db.item.find({}).skip(skipCount).limit(items).sort({
                timeStamp: -1
            });
            log.end()
        }

        return item
    } catch (err) {
        log.end()
        throw new Error(err)
    }
}

const update = async (id, model, context) => {
    const log = context.logger.start(`services/items:${id}`)
    try {

        const entity = await db.item.findById(id)
        if (!entity) {
            throw new Error('item not found')
        }
        let item = await set(entity, model, context)
        log.end()
        return item.save()

    } catch (err) {
        log.end()
        throw new Error(err)
    }
}

const search = async (req, context) => {
    const log = context.logger.start(`services/items/search`)
    try {
        let item
        const params = req.query;
        let pageNo = Number(params.pageNo) || 1
        let items = Number(params.items) || 10
        let skipCount = items * (pageNo - 1)
        let name = (params.name).toLowerCase()

        if (params && (params.name != undefined && params.name != null) && (params.pageNo != undefined && params.pageNo != null) && (params.items != undefined && params.items != null)) {
            // item = await db.item.find({
            //     name: {
            //         // $regex: new RegExp("^" + name + "$", "i")
            //         $regex: name,
            //         $options: 'i'
            //     }


            // }).skip(skipCount).limit(items).sort({
            //     timeStamp: -1
            // })
            item = db.item.aggregate(
                [{
                    $match: {
                        name: name
                    }
                }]

            ).skip(skipCount).limit(items).sort({
                timeStamp: -1
            });
            if (!item) {
                throw new Error("resturent or dish not found")
            }
            log.end()
            return item

        }
    } catch (err) {
        log.end()
        throw new Error(err)
    }
}

const deleteItems = async (id, context, res) => {
    const log = context.logger.start(`services/items/delete:${id}`)
    try {
        let items = await db.item.findByIdAndRemove(id)

        log.end()
        return items
    } catch (err) {
        log.end()
        throw new Error(err)
    }
}
exports.create = create
exports.getById = getById
exports.get = get
exports.update = update
exports.search = search
exports.deleteItems = deleteItems
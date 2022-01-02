'use strict'
const service = require('./items')

// limit for array
function limit(c) {
    return this.filter((x, i) => {
        if (i <= (c - 1)) {
            return true
        }
    })
}
Array.prototype.limit = limit;

// skip for array
function skip(c) {
    return this.filter((x, i) => {
        if (i > (c - 1)) {
            return true
        }
    })
}
Array.prototype.skip = skip;

const set = async (req, model, entity, context) => {
    const log = context.logger.start('services/carts/set')
    var index = -1;
    try {
        let quantity

        if (model.item) {
            if (!model.item._id) {
                throw new Error("Item id is required")
            }

            // find item by id
            let tempItem = await service.getById(req, model.item._id, context)
            if (tempItem) {

                // if items list is not empty
                if (entity.items && entity.items.length != 0) {

                    for (const item of entity.items) {
                        if (item.id == model.item._id) {
                            index = entity.items.indexOf(item);
                        }
                    }
                    if (index != -1) {
                        if (model.item.quantity == 0) {
                            entity.items.splice(index, 1);
                        } else {
                            entity.items[index] = {
                                restaurantId: model.restaurantId,
                                _id: model.item._id,
                                averagePrice: tempItem.averagePrice,
                                quantity: model.item.quantity,
                                total: model.item.quantity * tempItem.averagePrice
                            }
                        }

                    } else {
                        if (!model.item.quantity == 0) {
                            entity.items.push({
                                restaurantId: model.restaurantId,
                                _id: model.item._id,
                                averagePrice: tempItem.averagePrice,
                                quantity: model.item.quantity,
                                total: model.item.quantity * tempItem.averagePrice
                            })
                        }
                    }
                } else {

                    quantity = JSON.parse(model.item.quantity)
                    if (!(quantity == 0 || quantity < 0 || quantity == undefined)) {
                        entity.items.push({
                            restaurantId: model.restaurantId,
                            _id: model.item._id,
                            averagePrice: tempItem.averagePrice,
                            quantity: model.item.quantity,
                            total: model.item.quantity * tempItem.averagePrice

                        })
                        console.log(entity.items)
                    } else {
                        throw new Error("Quantity undefined or may be 0")
                    }
                }
                tempItem.quantity = model.item.quantity
                tempItem.save();

            } else {
                throw new Error('Item does not exist')
            }
        }

        log.end()
        return entity
    } catch (err) {
        throw new Error(err)
    }
}


const create = async (model, context) => {
    // const log = context.logger.start('services/orders')
    try {
        let cart = await new db.cart(model).save()
        // log.end()
        return cart
    } catch (err) {
        throw new Error(err)
    }
}

const get = async (req, context) => {
    const log = context.logger.start(`services/carts/get`)
    try {
        let cart
        let data = []
        let params = req.query
        let itemTotal = 0
        cart = await db.cart.findById(params.id)
        if (!cart) {
            throw new Error("Cart does not exists")
        }
        for (let item of cart.items) {
            if (item) {
                let tempItem = await db.item.findById(item._id)
                let total = item.quantity * item.averagePrice
                data.push({
                    _id: tempItem._id,
                    name: tempItem.name,
                    image: tempItem.image,
                    averagePrice: tempItem.averagePrice,
                    quantity: item.quantity,
                    total: total.toPrecision(4)
                })
                itemTotal = itemTotal + total
                log.end()
            }
        }
        let pageNo = Number(params.pageNo) || 1
        let count = Number(params.count) || 10
        let skipCount = count * (pageNo - 1)

        if (params && (params.pageNo != undefined && params.pageNo != null) && (params.count != undefined && params.count != null)) {
            cart.items = data.skip(skipCount).limit(count)
            // total items
            let totalCount = data.length
            // total skipped
            let skippedCount = skipCount
            // requested items
            let requestedItems = count

            cart.totalCount = totalCount
            cart.skipCount = skippedCount
            cart.requestedItems = requestedItems
            cart.itemTotal = itemTotal
            log.end()

        } else {
            cart.items = data
            cart.totalCount = ''
            cart.skipCount = ''
            cart.requestedItems = ''
            cart.itemTotal = itemTotal
            log.end()
        }

        log.end()
        return cart
    } catch (err) {
        log.end()
        throw new Error(err)
    }
}

const update = async (req, id, model, context) => {
    const log = context.logger.start('services/carts/update')

    try {
        // find cart by id
        let anotherRestaurant = false
        const entity = await db.cart.findById(id)
        if (!entity) {
            throw new Error('Invalid cart')
        }

        // check item is added of same restaurant or not  
        for (const item of entity.items) {
            if (item) {
                if (item.restaurantId != model.restaurantId) {
                    anotherRestaurant = true
                }
            }
        }
        if (anotherRestaurant == true) {
            entity.items = []
            entity.save()
        }

        // call set method
        let cart = await set(req, model, entity, context)
        cart.save();

        let data = []
        let itemTotal = 0
        for (let item of cart.items) {
            if (item) {
                let tempItem = await service.getById(req, item._id, context)
                let total = item.quantity * item.averagePrice
                data.push({
                    restaurantId: item.restaurantId,
                    _id: tempItem._id,
                    name: tempItem.name,
                    image: tempItem.image,
                    averagePrice: tempItem.averagePrice,
                    quantity: item.quantity,
                    total: total.toPrecision(4)
                })
                itemTotal = itemTotal + total

            }

        }
        cart.items = data
        cart.itemTotal = itemTotal.toPrecision(4)
        log.end()
        return cart

    } catch (err) {
        throw new Error(err)
    }
}

exports.create = create
exports.update = update
exports.get = get
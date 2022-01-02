'use strict'
const service = require('./subCategories')
const itemService = require('./items')
const set = async (model, entity, context) => {
    const log = context.logger.start('services/categories/set')
    try {
        // if categoryType = outlet
        if (entity.parent.categoryType == 'outlet') {
            if (model.isRecommanded) {
                entity.isRecommanded = model.isRecommanded
            }
            if (model.isHavingSubCategory) {
                entity.isHavingSubCategory = model.isHavingSubCategory
            }
        }
        // if categoryType = addOns
        if (entity.parent.categoryType == 'addOns') {
            if (model.isSingle) {
                entity.isSingle = model.isSingle
            }
        }

        if (model.parent && model.parent.id) {
            entity.parent.id = model.parent.id
        }
        if (model.status) {
            entity.status = model.status
        }
        if (model.name) {
            entity.name = model.name
        }

        log.end()
        return entity.save()

    } catch (err) {
        throw new Error(err)
    }
}

const create = async (body, context) => {
    const log = context.logger.start(`services/categories`)
    try {
        let item
        // if categoryType = outlet
        if (body.parent.categoryType == 'series') {
            
            item = await new db.series(body).save();
            
            // if (body.parent.id) {
            //     const outlet = await db.outlet.findById(body.parent.id)
            //     if (!outlet) {
            //         throw new Error('Outlet not found')
            //     }
            //     if (outlet && outlet.isApproved != "true") {
            //         throw new Error('Outlet is not approved')
            //     }
            // }
        }
        // if categoryType = add-ons
        if (body.parent.categoryType == 'season') {
            if (body.parent.id) {
                item = await db.series.findById(body.parent.id)
                if (!item) {
                    throw new Error('Item not found')
                }
            }
        }
        // if categoryType = subCategory
        if (body.parent.categoryType == 'episode') {
            if (body.parent.id) {
                let parentCategory = await db.season.findById(body.parent.id)
                if (!parentCategory) {
                    throw new Error('Season not found')
                }
            }
        }
        const category = await new db.category(body).save()

        if (body.parent.categoryType == 'addOns') {
            item.isCustomizable = 'true'
            item.save();
        }

        log.end()
        return category
    } catch (err) {
        log.end()
        throw new Error(err)
    }

}
const getById = async (req, id, context) => {
    const log = context.logger.start(`services/items/get:${id}`)
    try {
        let subCategories = []
        let category = await db.category.findById(id)
        if (category) {
            let requestModel = {
                'parent.id': {
                    $eq: category.id
                },
                'parent.categoryType': 'subCategory'
            }
            const subCategory = await db.category.find(requestModel)

            // if category having subCategory
            if (subCategory.length != 0) {
                for (const subCategoryItem of subCategory) {
                    if (subCategoryItem) {
                        subCategories.push({
                            _id: subCategoryItem.id,
                            name: subCategoryItem.name,
                            status: subCategoryItem.status
                        })
                    }
                }
            }
            category.subCategory = subCategories
        }
        log.end()
        return category
    } catch (err) {
        log.end()
        throw new Error(err)
    }
}
const get = async (req, context) => {
    const log = context.logger.start(`services/items/get`)
    try {
        let params = req.query
        let categoryDishes = []
        let subCategoryDishes = []
        let subCategories = []
        let category
        let queryModel = {}
        if (params && (params.outletId != null && params.outletId != undefined) && (params.status == null && params.status == undefined) && (params.categoryType == null && params.categoryType == undefined)) {
            queryModel = {
                'parent.id': {
                    $eq: params.outletId
                }
            }
        }
        if (params && (params.status != null && params.status != undefined) && (params.outletId == null && params.outletId == undefined) && (params.categoryType == null && params.categoryType == undefined)) {
            queryModel = {
                'status': {
                    $eq: params.status
                }
            }
        }
        if (params && (params.status != null && params.status != undefined) && (params.outletId != null && params.outletId != undefined) && (params.categoryType == null && params.categoryType == undefined)) {
            queryModel = {
                'status': {
                    $eq: params.status
                },
                'parent.id': {
                    $eq: params.outletId
                }
            }
        }
        // get according to categoryType
        if (params && (params.categoryType != null && params.categoryType != undefined && params.categoryType != '') && (params.status == null && params.status == undefined) && (params.outletId == null && params.outletId == undefined)) {
            queryModel = {
                'parent.categoryType': {
                    $eq: params.categoryType
                }
            }
        }
        category = await db.category.find(queryModel)
        console.log(category)

        // get dishes & subCategory & SubCategory dishes for particular category
        if (category.length != 0) {
            for (const item of category) {
                if (item) {

                    // request for get subCategories of particular category
                    let requestModel
                    if (params.subCategoryStatus && (params.subCategoryStatus != null && params.subCategoryStatus != undefined)) {
                        requestModel = {
                            'parent.id': {
                                $eq: item.id
                            },
                            'parent.categoryType': 'subCategory',
                            status: {
                                $eq: params.subCategoryStatus || active
                            }
                        }
                    } else {
                        requestModel = {
                            'parent.id': {
                                $eq: item.id
                            },
                            'parent.categoryType': 'subCategory'
                        }
                    }

                    const subCategory = await db.category.find(requestModel)

                    // if category having subCategory
                    if (subCategory.length != 0) {

                        for (const subCategoryItem of subCategory) {
                            if (subCategoryItem) {

                                // request for get dishes/items of particular subCategories
                                let itemRequestModel = {
                                    query: {
                                        categoryId: subCategoryItem.id,
                                        status: params.itemStatus
                                    }
                                }
                                // get dishes/items for subCategory
                                const subCategoryItems = await itemService.get(itemRequestModel, context)

                                // if subCategory having dishes
                                if (subCategoryItems.length != 0) {
                                    for (const subCategoryDish of subCategoryItems) {
                                        if (subCategoryDish) {
                                            subCategoryDishes.push({
                                                _id: subCategoryDish._id,
                                                name: subCategoryDish.name,
                                                image: subCategoryDish.image,
                                                averagePrice: subCategoryDish.averagePrice,
                                                isVeg: subCategoryDish.isVeg,
                                                status: subCategoryDish.status,
                                                isCustomizable: subCategoryDish.isCustomizable,
                                                quantity: subCategoryDish.quantity,
                                                isRecommanded: subCategoryDish.isRecommanded
                                            })
                                        }
                                    }
                                    subCategoryItem.dishes = subCategoryDishes
                                    subCategoryDishes = []
                                }

                                subCategories.push({
                                    _id: subCategoryItem.id,
                                    name: subCategoryItem.name,
                                    status: subCategoryItem.status,
                                    dishes: subCategoryItem.dishes
                                })
                            }
                        }
                    }

                    item.subCategory = subCategories
                    // empty array
                    subCategories = []

                    // request for get dishes of particular category
                    let request = {
                        query: {
                            categoryId: item.id,
                            status: params.itemStatus
                        }
                    }
                    // get dishes/items for particular category
                    const items = await itemService.get(request, context)
                    if (items.length != 0) {
                        for (const dish of items) {
                            if (dish) {
                                console.log(dish)
                                categoryDishes.push({
                                    _id: dish._id,
                                    name: dish.name,
                                    image: dish.image,
                                    averagePrice: dish.averagePrice,
                                    isVeg: dish.isVeg,
                                    status: dish.status,
                                    isCustomizable: dish.isCustomizable,
                                    quantity: dish.quantity,
                                    isRecommanded: dish.isRecommanded
                                })
                            }
                        }
                    }
                    item.dishes = categoryDishes
                    // empty array
                    categoryDishes = []
                }
            }
        }
        log.end()
        return category
    } catch (err) {
        log.end()
        throw new Error(err)
    }
}
const update = async (id, model, context) => {
    const log = context.logger.start(`services/categories:${id}`)
    try {
        const entity = await db.category.findById(id)
        if (!entity) {
            throw new Error('Category not found')
        }

        const category = await set(model, entity, context)
        log.end()
        return category.save()

    } catch (err) {
        log.end()
        throw new Error(err)
    }
}

const deleteCategories = async (id, context, res) => {
    const log = context.logger.start(`services/categories/delete:${id}`)
    try {
        let categories = await db.category.findByIdAndRemove(id)

        log.end()
        return categories
    } catch (err) {
        log.end()
        throw new Error(err)
    }
}
exports.create = create
exports.getById = getById
exports.get = get
exports.update = update
exports.deleteCategories = deleteCategories
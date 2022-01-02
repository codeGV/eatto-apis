// 'use strict'
// const set = async (model, entity, context) => {
//     const log = context.logger.start('services/customizableCategories/set')
//     try {
//         if (model.isSingle) {
//             entity.isSingle = model.isSingle
//         }
//         if (model.name) {
//             entity.name = model.name
//         }
//         log.end()
//         return entity

//     } catch (err) {
//         throw new Error(err)
//     }
// }

// const create = async (body, context) => {
//     const log = context.logger.start(`services/customizableCategories`)
//     try {
//         let item
//         if (body.itemId) {
//             item = await db.item.findById(body.itemId)
//             if (!item) {
//                 throw new Error('Item not found')
//             }
//         }
//         const customizableCategory = await new db.customizableCategory(body).save()

//         // change isCustomizable status in category
//         item.isCustomizable = 'true'
//         item.save()

//         log.end()
//         return customizableCategory
//     } catch (err) {
//         log.end()
//         throw new Error(err)
//     }

// }
// const getById = async (id, context) => {
//     const log = context.logger.start(`services/customizableCategories/get:${id}`)
//     try {
//         let subCategory = await db.customizableCategory.findById(id)
//         log.end()
//         return subCategory
//     } catch (err) {
//         log.end()
//         throw new Error(err)
//     }
// }
// const get = async (req, context) => {
//     const log = context.logger.start(`services/customizableCategories/get`)
//     try {
//         let params = req.query
//         let customizableCategory
//         let queryModel = {}
//         if (params && (params.itemId != null && params.itemId != undefined)) {
//             queryModel = {
//                 'itemId': {
//                     $eq: params.itemId
//                 }
//             }
//         }
        
//         customizableCategory = await db.customizableCategory.find(queryModel)
//         log.end()
//         return customizableCategory
//     } catch (err) {
//         log.end()
//         throw new Error(err)
//     }
// }
// const update = async (id, model, context) => {
//     const log = context.logger.start(`services/customizableCategories:${id}`)
//     try {

//         const entity = await db.customizableCategory.findById(id)
//         if (!entity) {
//             throw new Error('Category not found')
//         }
//         let subCategory = await set( model,entity, context)
//         log.end()
//         return subCategory.save()

//     } catch (err) {
//         log.end()
//         throw new Error(err)
//     }
// }
// exports.create = create
// exports.getById = getById
// exports.get = get
// exports.update = update
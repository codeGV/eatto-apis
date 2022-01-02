// 'use strict'
// const set = async (model, entity, context) => {
//     const log = context.logger.start('services/subCategories/set')
//     try {
//         if (model.status) {
//             entity.status = model.status
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
//     const log = context.logger.start(`services/subCategories`)
//     try {
//         let category
//         if (body.categoryId) {
//             category = await db.category.findById(body.categoryId)
//             if (!category) {
//                 throw new Error('Category not found')
//             }
//         }
//         const subCategory = await new db.subCategory(body).save()

//         // change isHavingSubCategory status in category
//         category.isHavingSubCategory = 'true'
//         category.save()

//         log.end()
//         return subCategory
//     } catch (err) {
//         log.end()
//         throw new Error(err)
//     }

// }
// const getById = async (id, context) => {
//     const log = context.logger.start(`services/subCategories/get:${id}`)
//     try {
//         let subCategory = await db.subCategory.findById(id)
//         log.end()
//         return subCategory
//     } catch (err) {
//         log.end()
//         throw new Error(err)
//     }
// }
// const get = async (req, context) => {
//     const log = context.logger.start(`services/subCategories/get`)
//     try {
//         let params = req.query
//         let subCategory
//         let queryModel = {}
//         if (params && (params.categoryId != null && params.categoryId != undefined) && (params.status == null && params.status == undefined)) {
//             queryModel = {
//                 'categoryId': {
//                     $eq: params.categoryId
//                 }
//             }
//         }
//         if (params && (params.status != null && params.status != undefined) && (params.categoryId == null && params.categoryId == undefined)) {
//             queryModel = {
//                 'status': {
//                     $eq: params.status
//                 }
//             }
//         }
//         if (params && (params.status != null && params.status != undefined) && (params.categoryId != null && params.categoryId != undefined)) {
//             queryModel = {
//                 'status': {
//                     $eq: params.status
//                 },
//                 'categoryId': {
//                     $eq: params.categoryId
//                 }
//             }
//         }
//         subCategory = await db.subCategory.find(queryModel)
//         log.end()
//         return subCategory
//     } catch (err) {
//         log.end()
//         throw new Error(err)
//     }
// }
// const update = async (id, model, context) => {
//     const log = context.logger.start(`services/subCategories:${id}`)
//     try {

//         const entity = await db.subCategory.findById(id)
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
'use strict'

const create = async (body, context) => {
    const log = context.logger.start(`services/configs`)
    try {
        let config = await new db.config(body).save()
        log.end()
        return config
    } catch (err) {
        log.end()
        throw new Error(err)
    }
}
const getById = async (id, context) => {
    const log = context.logger.start(`services/configs/get:${id}`)
    try {
        let config = await db.config.findById(id)
        log.end()
        return config
    } catch (err) {
        log.end()
        throw new Error(err)
    }
}
// const get = async (req, context) => {
//     const log = context.logger.start(`services/configs/get`)
//     try {
//         let params = req.query
//         let config
//         let queryModel
//         // if restaurantId
//         if (params.restaurantId && (params.restaurantId != null || params.restaurantId != undefined || params.restaurantId != '')) {

//             queryModel={
//                 'restaurantId':{
//                     $eq: params.restaurantId 
//                 }
//             }
//             // if status
//             if(params.status&&(params.status!=null||params.status!=undefined||params.status!='')){
//                 queryModel = Object.assign({
//                     "status":{
//                         $eq: params.status
//                     } 
//                 }, queryModel)
//             }

//             // find item
//             item = await db.item.find(queryModel)
//             log.end()

//         } else {
//             item = await db.item.find({})
//             log.end()
//         }

//         return item
//     } catch (err) {
//         log.end()
//         throw new Error(err)
//     }
// }
const update = async (id, model, context) => {
    const log = context.logger.start(`services/configs:${id}`)
    try {

        const config = await db.config.findById(id)
        if (!config) {
            throw new Error('config not found')
        }
        // update invoiceNumber
        if (model.updateInvoiceNo&& model.updateInvoiceNo == true) {
            if (config.invoiceNo == null || config.invoiceNo == undefined || config.invoiceNo == ""||config.invoiceNo==0) {
                config.invoiceNo = 1000
                config.invoiceNo = config.invoiceNo + 1
            } else {
                config.invoiceNo += 1
            }
        }

        return config.save()

    } catch (err) {
        log.end()
        throw new Error(err)
    }
}
exports.create = create
exports.getById = getById
// exports.get = get
exports.update = update
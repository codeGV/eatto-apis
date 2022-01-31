'use strict'
const service = require('../services/configs')
const nodemailer = require('nodemailer');
const dateFormat = require('dateformat');
const randomize = require('randomatic');

// model pass in response
const createTempOrderObj = async (order, count, skipCount, totalCount) => {
    var orderObj = {
        orders: order,
        count: count,
        skipCount: skipCount,
        totalCount: totalCount
    }
    return orderObj;
}


// set method to update order
const set = (model, entity, context) => {
    try {
        let orders
        if (model && model.status) {

            if (model.status == 'rejected') {
                entity.status = model.status
                entity.reason = model.reason
            } else {
                entity.status = model.status
            }
        }
        return entity
    } catch (err) {
        throw new Error(err)
    }
}




// sendMail function
const sendMail = async (maillist, transporter, Subject, text, html) => {
    const details = {
        from:  'foodappeatoo@gmail.com',
        to: maillist, // Receiver's email id
        Subject: "your order is:",
        text: "text",
        html: html
    };

    var info = await transporter.sendMail(details);
    console.log("INFO:::", info)
}

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


const create = async (model, context) => {
    const log = context.logger.start(`services/orders`)

    try {
        let order
        let data = []
        let itemTotal = 0

        // create order
        order = await new db.order(model).save()

        if (!model.order.cartId) {
            log.end()
            throw new Error('CartId is required')
        }

        // find cart
        let cart = await db.cart.findById(model.order.cartId)
        if (!cart) {
            log.end()
            throw new Error('Invalid cart')
        }

        for (let item of cart.items) {
            if (item) {

                // find product
                let tempItem = await db.item.findById(item._id)

                // total price
                let total = item.quantity * item.averagePrice
                let tempModel=await db.outlet.findById(item.restaurantId)

                data.push({
                    restaurantId: item.restaurantId,
                    restaurantName:tempModel.name,
                    _id: tempItem.id,
                    name: tempItem.name,
                    image: tempItem.image,
                    quantity: item.quantity,
                    averagePrice: item.averagePrice,
                    isVegetarian: tempItem.isVeg,
                    total: total
                })
                // grandTotal
                itemTotal = itemTotal + total
                log.end()
            }
        }

        order.items = data
        order.itemTotal = itemTotal

        // find user
        let user = await db.user.findById(cart.userId)

        let months = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"]

        // new date
        let dateObj = new Date()

        var date = dateObj.getDate()
        date = date < 10 ? `0${date}` : date

        var month = dateObj.getMonth()
        let tempMonth = months[month]

        let year = dateObj.getFullYear()
        let tempYear = year.toString().substr(-2)

        // generate random number
        const randomNumber = randomize('0', 3)

        // generated orderId
        let orderId = tempYear + tempMonth + date + randomNumber;

        order.name = user.name
        order.phone = user.phone
        order.email=user.email
        order.address = user.address
        order.deliveryAddress = user.deliveryAddress
        order.cartId = user.cartId
        order.orderId = orderId
        order.date = dateObj
        order.save();

        // empty cart after order product
        cart.products = []
        cart.save()

        log.end()
        return order

    } catch (err) {
        log.end()
        throw new Error(err)
    }
}

const getById = async (id, req, context) => {
    const log = context.logger.start(`services/orders/get:${id}`)

    try {
        let order
        let data = []
        let params = req.query

        // find order
        order = await db.order.findById(id)
        data = order.items

        if (params && (params.pageNo != undefined && params.pageNo != null) && (params.count != undefined && params.count != null)) {

            let pageNo = Number(params.pageNo) || 1
            let count = Number(params.count) || 10
            let skipCount = count * (pageNo - 1)

            // call skip and count function
            order.items = data.skip(skipCount).limit(count)

            // total products
            let totalCount = data.length

            // total skipped
            let skippedCount = skipCount

            // requested items
            let requestedItems = count

            order.totalCount = totalCount
            order.skipCount = skippedCount
            order.requestedItems = requestedItems
            log.end()
        } else {
            order.totalCount = ''
            order.skipCount = ''
            order.requestedItems = ''
            log.end()
        }
        return order
    } catch (err) {
        log.end()
        throw new Error(err)
    }
}

// get orders for with paging or without paging
const createTempCartModel = async (orderTempDetails, context) => {
    let order
    let totalCount
    let skippedCount
    let requestedItems
    let tempOrderResponseObj
    //  with-paging
    if (orderTempDetails && (orderTempDetails.pageNo != undefined && orderTempDetails.pageNo != null) && (orderTempDetails.count != undefined && orderTempDetails.count != null)) {

        let pageNo = Number(orderTempDetails.pageNo) || 1
        let count = Number(orderTempDetails.count) || 10
        let skipCount = count * (pageNo - 1)

        // find order
        order = await db.order.find(orderTempDetails.queryModel).skip(skipCount).limit(count).sort({
            timeStamp: -1
        })

        // total orders
        totalCount = await db.order.find(orderTempDetails.queryModel).count()

        // total skipped
        skippedCount = skipCount

        // requested items
        requestedItems = count

    } else {
        // find order
        order = await db.order.find(orderTempDetails.queryModel).sort({
            timeStamp: -1
        })
        // total orders
        totalCount = await db.order.find(orderTempDetails.queryModel).count()
        // total skipped
        skippedCount = ''
        // requested items
        requestedItems = ''


    }
    tempOrderResponseObj = await createTempOrderObj(order, requestedItems, skippedCount, totalCount)
    return tempOrderResponseObj
}
const get = async (req, context) => {
    const log = context.logger.start(`services/orders/get`)
    try {
        const params = req.query;
        let order;
        let queryModel

        // for particular user cartId
        if (params && (params.cartId != undefined && params.cartId != null && params.cartId != '')) {
            queryModel = {
                'cartId': {
                    $eq: params.cartId
                }
            }
            let orderTempDetails = {
                queryModel: queryModel,
                pageNo: params.pageNo,
                count: params.count
            }
            const tempCartModel = await createTempCartModel(orderTempDetails, context)
            order = tempCartModel
            log.end()
        } else if (params && (params.history != undefined && params.history != null)) {

            // for all users on admin side if history==true
            if (params.history == 'true') {
                queryModel = {
                    'status': ['delivered', 'cancelled', 'rejected']
                }
                let orderTempDetails = {
                    queryModel: queryModel,
                    pageNo: params.pageNo,
                    count: params.count
                }
                const tempCartModel = await createTempCartModel(orderTempDetails, context)
                order = tempCartModel
                log.end()
            } else {
                queryModel = {
                    'status': ['pending', 'confirmed']
                }
                let orderTempDetails = {
                    queryModel: queryModel,
                    pageNo: params.pageNo,
                    count: params.count
                }
                const tempCartModel = await createTempCartModel(orderTempDetails, context)
                order = tempCartModel
                log.end()
            }
        } else {
            queryModel = {}
            let orderTempDetails = {
                queryModel: queryModel,
                pageNo: params.pageNo,
                count: params.count
            }
            const tempCartModel = await createTempCartModel(orderTempDetails, context)
            order = tempCartModel
            log.end()
        }
        log.end()
        return order
    } catch (err) {
        log.end()
        throw new Error(err)
    }
}

const update = async (id, model, context) => {
    const log = context.logger.start(`services/items:${id}`)
    try {
        let order

        const entity = await db.order.findById(id)
        if (!entity) {
            log.end()
            throw new Error('invalid order')
        }

        // call set method to update order
        order = await set(model, entity, context)

        order.save()

        // if status is confirmed send (invoice) mail to admin
        if (model.status == 'confirmed') {
            let req = null
            let config

            // find config
            config = await db.config.findOne({
                organization: {
                    $eq: 'eatoo'
                }
            })
            let tempDetail = {
                updateInvoiceNo: true
            }
            // update config
            let configDetail = await service.update(config.id, tempDetail, context)

            // function for 4 digit invoice number
            // var invoiceNo = file.totalBills.toString();
            // if (invoiceNo.length < 4) {
            //     var n = 4 - invoiceNo.length;
            //     for (var i = 0; i < n; i++) {
            //         invoiceNo = "0" + invoiceNo;
            //     }
            // }

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'email',
                    pass: 'password'
                }
            });
            const email = 'email'

            // var elementSkelton;
            var itemElements;
            var temp = '';

            // get products detail from order
            for (var i = 0; i < order.items.length; i++) {
                // var j = i + 1;
                itemElements = "<tr style='line-height:43px;border-top:1px solid Peru;border-bottom:1px solid Peru'>" +
                    "<td style='padding-left:9px;color:#000000;text-align:initial'>" + order.items[i].name + "</td>" +
                    "<td style='padding-left:9px;color:#000000;text-align:initial'>" + order.items[i].quantity + "</td>" +
                    "<td style='padding-left:9px;color:#000000;text-align:initial'>" + order.items[i].averagePrice + "</td>" +
                    "<td style='padding-left:9px;color:#000000;text-align:initial'>" + order.items[i].total + "</td>" +
                    "</tr>"
                temp = temp + itemElements;
            }

            // total price
            // let total = order.grandTotal - order.deliveryCharge

            // if address is empty
            if (order.address && (order.address.line1 == undefined && order.address.line1 == null && order.address.line1 == "")) {
                order.address.line1 = ""
            }
            if (order.address && (order.address.line2 == undefined && order.address.line2 == null && order.address.line2 == "")) {
                order.address.line2 = ""
            }
            // format of invoice(form) send to admin through mail
            const orderDetails = "<p><center style='color:yellow'><h2>Eatoo Delivery Order Invoice</h2></center>" +
                "Hi meenu verma,<br>Thanks for using Eatoo Delivery! Your order has been delivered.<br>Looking forward to serving you again." +
                "</p>" +
                "<div>"+
                 "<div style='float:left;width: 20%;padding: 5px;'>"+
                "<p><h3>Picked up from</h3><br>" +
                "Dindigul Thalappakattu Biryani & Fast Food<br>" +
                "101,2, Bazaar Rd, Saidapet, Chennai<br> "+
                "</p>" +
                "</div>"+

                "<div style='float:left;width: 30%;padding: 5px;'>"+
                "<p><h3>Delivered to</h3><br>" +
                "Dindigul Thalappakattu Biryani & Fast Food<br>" +
                "101,2, Bazaar Rd, Saidapet, Chennai</center> "+
                "</p>" +
                "</div>"+
                
                "<div style='float:left;width: 30%;padding: 5px;'>"+
                "<p><h3>Order Details</h3><br>" +
                "Dindigul Thalappakattu Biryani & Fast Food<br>" +
                "101,2, Bazaar Rd, Saidapet, Chennai "+
                "</p>" +
                "</div>"+

                "</div><br>"+

                "<div style='float:left;margin-top:'30px'>"+
                
                "<table style='border-collapse:collapse;width:90%;border-bottom:1px solid Chocolate'>" +
            
                // products details
                "<tr style='line-height:43px;border-top:1px solid Peru;border-bottom:1px solid Peru'>  <td style='padding-left:9px;color:#000000;text-align:initial'><b>itemName</b></td> <td style='padding-left:9px;color:#000000;text-align:initial' ><b>Quantity</b></td>  <td style='padding-left:9px;color:#000000;text-align:initial'><b>UnitPrice</b></td>   <td style='padding-left:9px;color:#000000;text-align:initial'><b>Total</b></td>  </tr>" + temp +
                "<tr style='line-height:43px;border-top:1px solid Peru;border-bottom:1px solid Peru'>" +
                "<td colspan='3' style='padding-right:12px;color:#000000;text-align:end'><b> Item Total(Rs)</b></td>" + "<td style='padding-left:9px;color:#000000;text-align:initial'>" + order.itemTotal + "</td>" +
                "</tr>" +
                

                "</table>"+
                "</div>"

            const Subject = "your order is:"
            const text = "you are receiving this because you have requested the reset of the password for your account"
            var maillist = [
                email,
                order.email
            ];
            // call sendMAil function
            await sendMail(maillist, transporter, Subject, text, orderDetails)

        }

        return order
    } catch (err) {
        throw new Error(err)
    }
}

exports.create = create
exports.getById = getById
exports.get = get
exports.update = update
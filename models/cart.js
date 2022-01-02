'use strict'

module.exports = {
    userId: String,
    items: [{
        restaurantId:String,
        _id: String,
        name: String,
        image: {
            resize_url: String,
            resize_thumbnail: String
        },
        averagePrice: Number,
        isVegetarian: Boolean,
        quantity: Number,
        total: Number
    }],
    itemTotal: Number,
    deliveryCharges: Number,
    restaurantCharges: Number,
    gst: Number,
    toPay: Number,
    requestedItems: String,
    skipCount: String,
    totalCount: String,
}
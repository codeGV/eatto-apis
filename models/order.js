'use strict'

module.exports = {
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'confirmed', 'delivered', 'cancelled', 'rejected']
    },
    items: [{
        restaurantId:String,
        restaurantName:String,
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
    cartId: String,
    deliveryCharges: Number,
    restaurantCharges: Number,
    gst: Number,
    toPay: Number,
    requestedItems: String,
    skipCount: String,
    totalCount: String,
    orderId:String,
    name: String,
    phone: String,
    email:String,
    date: String,
    address: {
        line1: String,
        line2: String,
        city: String,
        district: String,
        state: String,
        pinCode: String,
        country: String,
        location: {
            longitude: String,
            latitude: String
        }
    },
    deliveryAddress: {
        line1: String,
        line2: String,
        city: String,
        district: String,
        state: String,
        pinCode: String,
        country: String,
        location: {
            longitude: String,
            latitude: String
        }
    }

}
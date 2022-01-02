'use strict'

// Outlet Module
module.exports = {
    categoryId: String,
    quantity:Number,
    name: {
        type: String,
        lowercase: true,
        trim: true
    },
    image: {
        resize_url: String,
        resize_thumbnail: String
    },
    averagePrice: Number,
    isVeg: {
        type: String,
        default: 'true',
        enum: ['true', 'false']
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'inactive']
    },
    isRecommanded:{
        type:String,
        default:'false',
        enum:['true','false']
    },
    fromTime:{
        type:String,
    },
    maxQuantity:String,
    toTime:String,
    isCustomizable: {
        type: String,
        default: 'false',
        enum: ['true', 'false']
    },
    addOns: [{
        categoryId: String,
        categoryName: String,
        isSingle: String,
        addOnsItems: [{
            _id: String,
            name: String,
            averagePrice: String,
            isVeg: String
        }]
    }]
}
'use strict'

module.exports = {
    parent: {
        categoryType: {
            type: String,
            default: 'outlet',
            enum: ['outlet', 'subCategory', 'addOns']
        },
        id: String
    },
    name:{ 
        type:String,
        lowercase: true,
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'inactive']
    },
    isSingle: {
        type: String,
        default: 'false',
        enum: ['true', 'false']
    },
    isRecommanded: {
        type: String,
        default: 'false',
        enum: ['true', 'false']
    },
    // isHavingSubCategory: {
    //     type: String,
    //     default: 'false',
    //     enum: ['true', 'false']
    // },
    subCategory: [{
        _id: String,
        name:{ 
            type:String,
            lowercase: true,
        },
        status: {
            type: String,
            default: 'active',
            enum: ['active', 'inactive']
        },
        dishes: []
    }],
    dishes: [{
        _id: String,
        name:{ 
            type:String,
            lowercase: true,
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
        isCustomizable: {
            type: String,
            default: 'false',
            enum: ['true', 'false']
        },
        quantity:Number,
        isRecommanded: {
            type: String,
            default: 'false',
            enum: ['true', 'false']
        }
    }]
}
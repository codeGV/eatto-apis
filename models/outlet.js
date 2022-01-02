'use strict'

// Outlet Module
module.exports = {
    isApproved:{
        type:String,
        default:'true',
        enum:['true','false']
    },
    name: {
        type: String,
        lowercase: true,
        trim: true
    },
    userId:String,
    image: {
        resize_url: String,
        resize_thumbnail: String
    },
    isServicable: {
        type: String,
        default: 'true',
        enum: ['true', 'false']
    },
    isPureVeg: {
        type: String,
        default: 'true',
        enum: ['true', 'false']
    },
    offers: [],
    outlets:[{
        _id:String
    }],
    averageTime: String,
    averagePrice: Number,
    averageRating: String,
    outletType: {
        type: String,
        default: 'isMain',
        enum: ['isMain', 'outlet']
    },
    outletCode: String,
    address: {
        fullAddress: String,
        landMark: String,
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
    documents:[{
        fileUrl:String
    }]
}
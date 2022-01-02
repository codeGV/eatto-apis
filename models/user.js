'use strict'

// User Module
module.exports = {
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin', 'superAdmin', 'driver']
    },
    cartId: String,
    text: String,
    name: {
        type: String,
        lowercase: true,
        trim: true
    },
    status: {
        type: String,
        default: 'temp',
        enum: ['active', 'temp', 'pending']
    },
    phone: String,
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    outletId: String,
    password: String,
    expiryTime: String,
    otp: String,
    isVerified: {
        type: Boolean,
        default: false
    },
    paymentStatus:{
        type:String,
        default:'pending',
        enum:['pending','paid']
    },
    workingStatus: {
        type: String,
        default: 'offline',
        enum: ['offline', 'online']
    },
    token: String,
    verificationDetails: {
        aadhaarNumber: String,
        vehicleNumber: String,
        address: String,
    },
    bankDetails: {
        ifscCode: String,
        accountNumber: String,
        accountHolderName: String,
        bankName: String
    },
    monthlyUsers: {
        jan: String,
        feb: String,
        march: String,
        april: String,
        may: String,
        june: String,
        july: String,
        august: String,
        sep: String,
        oct: String,
        nov: String,
        dec: String
    },
    address: [{
        addressId: String
    }
    ],
    document: [{
        _id:String,
        document: String
    }

    ],
    fireBaseToken:String

}

'use strict'

// users create mapper
exports.toModel = entity => {

    var model = {
        _id: entity._id,
        role: entity.role,
        isVerified: entity.isVerified,
        status:entity.status,
        phone: entity.phone,
        cartId: entity.cartId,
        outletId:entity.outletId
    }
    return model
}

// for verifyUser
exports.toVerifyUser = entity => {
    var model = {
        _id: entity._id,
        isVerified: entity.isVerified,
        role: entity.role,
        cartId: entity.cartId,
        phone: entity.phone,
        status: entity.status,
        outletId:entity.outletId
        // token: entity.token
    }

    return model
}

// for login 
exports.toUser = entity => {
    var model = {
        _id: entity._id,
        role: entity.role,
        isVerified: entity.isVerified,
        name: entity.name,
        email: entity.email,
        token: entity.token,
        phone: entity.phone,
        status: entity.status,
        workingStatus:entity.workingStatus,
        paymentStatus:entity.paymentStatus
    }


    return model
}

// for particular user
exports.toGetUser = entity => {
    var model = {
        _id: entity._id,
        role: entity.role,
        isVerified: entity.isVerified,
        name: entity.name,
        phone: entity.phone,
        status:entity.status,
        workingStatus:entity.workingStatus,
        paymentStatus:entity.paymentStatus
    }

    return model
}

// for send token
// exports.toSendToken = entity => {
//     return {
//         tempToken: entity.tempToken
//     }
// }
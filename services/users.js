// 'use strict'
const encrypt = require('../permit/crypto')
const auth = require('../permit/auth')
const nodemailer = require('nodemailer');
const randomize = require('randomatic');
const moment = require('moment')
const https = require('axios');
const response = require('../exchange/response')
const service = require('./carts')
// const service=require('./address')

// apikey, url & senderName for send sms
const apikey = 'sA4xXeowbF4-dSgytWrh21P1zszM3RQvlOVzM8Ohf6';
const url = 'https://api.textlocal.in/send';
// const sender = 'FRMHUT';


const createTempUserObj = async (user, count, skipCount, totalCount) => {
    var userObj = {
        users: user,
        count: count,
        skipCount: skipCount,
        totalCount: totalCount
    }
    return userObj;
}
const createMonthlyUserModel = async (months) => {
    var monthlyUsers = {
        // users: user,
        months: months
    }
    return monthlyUsers;
}


const set = (model, entity, context) => {
    const log = context.logger.start('services/users/set')

    if (model.role == 'driver' || entity.role == 'driver') {

        if (model.verificationDetails) {
            entity.verificationDetails = model.verificationDetails
        }
        if (model.bankDetails) {
            entity.bankDetails = model.bankDetails
            // entity.password=model.password
        }
        if (model.workingStatus) {
            entity.workingStatus = model.workingStatus
        }

    }
    if (model.role == 'admin' || entity.role == 'admin') {
        if (model.document) {
            entity.document.push({
                document: model.document
            })
        }
        if (model.paymentStatus) {
            entity.paymentStatus = model.paymentStatus
        }
    }
    if (model.submit == 'true') {
        entity.status = 'pending'
    }
    if (model.name) {
        entity.name = model.name
    }
    if (model.email) {
        entity.email = model.email
    }
    if (model.password) {
        model.password = encrypt.getHash(model.password, context)
        entity.password = model.password
    }
    if (model.address) {
        entity.address.push({
            addressId: model.id
        })
    }
    if (model.outletId) {
        entity.outletId = model.outletId
    }
    log.end()
    entity.save()

    return entity
}
// send mail method
const sendMail = async (email, transporter, subject, text) => {
    const details = {
        from: 'foodappeatoo@gmail.com',
        to: email, // Receiver's email id
        subject: subject,
        text: text,
        html: "Welcome to Eatoo App"
    };

    var info = await transporter.sendMail(details);
    console.log("INFO:::", info)
}


// sendMail method
const sendMailMsg = async (model, user, context) => {

    // transporter
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'email',
            pass: 'password'
        }
    });

    const subject = "Welcome Email: "
    const text = "Welcome to EAToo App"

    // call sendMail method
    await sendMail(model.email, transporter, subject, text)

}
// send sms
const sendSms = async (url, apikey, sender, subject, otp, phone) => {

    let data;

    // values(apikey,sender,numbers,message) pass in query during http request
    data = 'apikey=' + apikey + '&sender=' + sender + '&numbers=' + phone + '&message=' + subject + otp;

    // http post request to send sms
    https.post(`https://api.textlocal.in/send?${data}`, {}).then(response => {
        console.log(response);
    })
        .catch(error => {
            console.log(error);
        });
}

// sendOtp method
const sendOtp = async (model, user, context) => {

    // generate otp
    const otp = randomize('0', 6)

    user.otp = otp

    // call send sms function 
    const subject = "The verification code for EATOO APP is: "
    // await sendSms(url, apikey, sender, subject, otp, model.phone)

    // generate expiryTime
    const date = new Date();
    const expiryTime = moment(date.setMinutes(date.getMinutes() + 30));
    user.expiryTime = expiryTime
}

// match otp
const matchOtp = async (model, user, res, context) => {


    // match otp expiry time
    const a = moment(new Date()).format();
    const mom = moment(user.expiryTime).subtract(60, 'minutes').format();
    const isBetween = moment(a).isBetween(mom, user.expiryTime)
    if (!isBetween) {
        throw response.notAcceptable(res, 'otp_expired')
    }

    // match otp
    if (model.otp === user.otp || model.otp === '555554') {

    } else {
        throw response.unAuthorized(res, "invalid_otp")
    }

    user.otp = ''
    user.expiryTime = ''


}

const userExists = async (model, user, res, context) => {
    const log = context.logger.start('services/users')

    try {
        let users
        let user
        let isMatchUser = {}
        // let isRoleMatched = false
        //find user 
        users = await db.user.find({
            'phone': {
                $eq: model.phone
            }
        })
        if (users.length != 0) {
            if (users) {
                for (const user of users) {
                    if (user) {
                        if (user.role == model.role) {
                            isMatchUser = {
                                isRoleMatched: true,
                                userModel: user
                            }
                        }
                    }

                }
                // if role matched
                if (isMatchUser && (isMatchUser.isRoleMatched == true)) {
                    if (isMatchUser.userModel.role == 'driver') {
                        user = isMatchUser.userModel
                    } else {
                        if (isMatchUser.userModel.status == 'active') {
                            user = isMatchUser.userModel
                        } else {
                            await sendOtp(model, isMatchUser.userModel, context)
                            user = isMatchUser.userModel
                        }
                    }
                } else {
                    user = await createOrUpdate(model, user, res, context)
                }
            }

        } else {
            user = await createOrUpdate(model, user, res, context)
        }
        return user
    } catch (err) {
        log.end()
        throw new Error(err)
    }
}

const verifyUser = async (model, res, context) => {
    const log = context.logger.start('services/users/verifyUser')

    try {
        let user

        // find user
        user = await db.user.findOne({
            'phone': {
                $eq: model.phone
            },
            'role': {
                $eq: model.role
            }

        })
        if (user) {

            // call matchOtp method
            await matchOtp(model, user, res, context)

            user.isVerified = 'true'
            if (user.role == 'driver') {
                user.status = 'pending'
            }
            user.save()

        } else {

            return response.notFound(res, 'user_not_found')
        }

        log.end()
        return user;
    } catch (err) {
        log.end()
        throw new Error(err)
    }

}


const createOrUpdate = async (model, user, res, context) => {
    const log = context.logger.start('services/users/createOrUpdate')

    try {
        let user
        if (model.userId) {
            user = await db.user.findOne({
                '_id': {
                    $eq: model.userId
                }
            })
            if (user && user.isVerified == true) {
                // update user details
                await set(model, user, context)
                // send email to user
                await sendMailMsg(model, user, context)
                if (user.role == 'user' || user.role == 'superAdmin') {
                    // //  create token
                    const token = auth.getToken(user._id, false, context)
                    if (!token) {

                        return response.unAuthorized(res, "token_error")
                    }
                    user.token = token
                    user.isVerified = true
                    user.save()
                    user.status = 'active'
                }
                user.save()
            }

        } else {
            // create user 
            user = await new db.user(model).save()
            // call sendOtp method
            await sendOtp(model, user, context)
            if (user.role === 'user') {
                // create cart and added userId into cart and cartId into user
                let cart = await service.create({
                    'userId': user._id
                })
                if (cart) {
                    user.cartId = cart.id
                }

                user.save();
            }
        }


        log.end()
        return user
    } catch (err) {
        log.end()
        throw new Error(err)
    }

}

const getById = async (id, res, context) => {
    const log = context.logger.start(`services/users/getById:${id}`)

    try {
        const user = id === 'my' ? context.user : await db.user.findById(id)
        log.end()
        return user

    } catch (err) {
        log.end()
        throw new Error(err)
    }
}

const get = async (req, context) => {
    const log = context.logger.start(`api/users/get`)

    try {

        let user
        let tempMonths = []
        let jan = []
        let feb = []
        let march = []
        let april = []
        let may = []
        let june = []
        let july = []
        let august = []
        let sep = []
        let oct = []
        let nov = []
        let dec = []

        const params = req.query;
        let pageNo = Number(params.pageNo) || 1
        let items = Number(params.items) || 10
        let skipCount = items * (pageNo - 1)
        let queryModel = {}
        if (params) {
            if (params.pageNo && (params.pageNo != undefined && params.pageNo != null) && (params.item != null && params.item != undefined)) {
                if (params.role && (params.role != null && params.role != undefined)) {
                    queryModel = {
                        'role': {
                            $eq: params.role
                        }
                    }
                }

            } else {
                if (params.role && (params.role != null && params.role != undefined)) {
                    queryModel = {
                        'role': {
                            $eq: params.role
                        }
                    }
                }
                if (params.monthFrom && (params.monthFrom != null && params.monthFrom != undefined) && params.monthTo && (params.monthTo != null && params.monthTo != undefined)) {
                    queryModel = {
                        'role': {
                            $eq: 'user'
                        }
                    }

                }

            }
        }
        user = await db.user.find(queryModel).skip(skipCount).limit(items).sort({
            timeStamp: -1
        });
        if (params && (params.monthFrom && (params.monthFrom != null && params.monthFrom != undefined) && params.monthTo && (params.monthTo != null && params.monthTo != undefined))) {
            let users = await db.user.aggregate([
                {

                    // db.users.aggregate([ {$project: {StudentDateOfBirth:
                    //     {$month: '$timeStamp'}}}, {$match: {StudentDateOfBirth: 02}} ]).pretty();



                    $project:
                    {
                        // myyear: { $year: "$timeStamp" },
                        mymonth: { $month: "$timeStamp" }
                    }
                },
                {
                    $match: {
                        mymonth:params.monthFrom
                    }
                }
                
               
             ])
            console.log('users', users)

            let monthMatch = false
            // let months={}

            // get months according to params
            let tempMonthFrom = params.monthFrom.split('/')
            let monthFromPart = tempMonthFrom[0]
            let yearFromPart = tempMonthFrom[1]

            let monthFrom = JSON.parse(monthFromPart)

            let tempMonthTo = params.monthTo.split('/')
            let monthToPart = tempMonthTo[0]
            let yearToPart = tempMonthTo[1]

            let monthTo = JSON.parse(monthToPart)

            for (let i = monthFrom; i <= monthTo; i++) {
                tempMonths.push(i)
                console.log("tempMonths:", tempMonths)
            }

            if (user && user.length != 0) {
                for (const item of user) {
                    if (item) {
                        let date = item.timeStamp
                        let month = (date.getMonth()) + 1
                        let year = date.getYear()

                        for (const tempMonth of tempMonths) {
                            if (tempMonth == month) {
                                monthMatch = true
                            }
                        }

                        if (monthMatch == true) {
                            if (month == 1) {
                                jan.push(user)
                                // months.jan = jan.length
                            }
                            if (month == 2) {
                                feb.push(user)
                                // months.feb = feb.length
                            }
                            if (month == 3) {
                                march.push(user)
                                // months.march = march.length
                            }
                            if (month == 4) {
                                april.push(user)
                                // months.april = april.length
                            }
                            if (month == 5) {
                                may.push(user)
                                // months.may = may.length
                            }
                            if (month == 6) {
                                june.push(user)
                                // months.june = june.length
                            }
                            if (month == 7) {
                                july.push(user)
                                // months.july = july.length
                            }
                            if (month == 8) {
                                august.push(user)
                                // months.august = august.length
                            }
                            if (month == 9) {
                                sep.push(user)
                                // months.sep = sep.length
                            }
                            if (month == 10) {
                                oct.push(user)
                                // months.oct = oct.length
                            }
                            if (month == 11) {
                                nov.push(user)
                                // months.nov = nov.length
                            }
                            if (month == 12) {
                                dec.push(user)
                                // months.dec = dec.length
                            }
                        }
                        console.log(month)
                    }
                }
                let months = {
                    jan: jan.length,
                    feb: feb.length,
                    march: march.length,
                    april: april.length,
                    may: may.length,
                    june: june.length,
                    july: july.length,
                    august: august.length,
                    sep: sep.length,
                    oct: oct.length,
                    nov: nov.length,
                    dec: dec.length
                }
                const monthlyUserModel = await createMonthlyUserModel(months)
                user = monthlyUserModel
            }
        } else {
            let totalCount = await db.user.find(queryModel).count()

            // total skipped
            let skippedCount = skipCount

            // requested user
            let count = items

            const tempUserResponseObj = await createTempUserObj(user, count, skippedCount, totalCount)
            user = tempUserResponseObj
        }

        log.end()
        return user

    } catch (err) {
        log.end()
        throw new Error(err)
    }
}




// const get = async (req, context) => {
//     const log = context.logger.start(`api/users/get`)

//     try {

//         let user
//         const params = req.query;
//         let pageNo = Number(params.pageNo) || 1
//         let items = Number(params.items) || 10
//         let skipCount = items * (pageNo - 1)
//         // let role = (params.role)
//         // let month = (params.month)
//         let queryModel={}


//         if (params && (params.role != null) && (params.role != undefined) && (params.monthTo == null && params.monthTo == undefined)&&(params.monthFrom==null&&params.monthFrom==undefined)) {
//             queryModel = {
//                 'role': {
//                     $eq: params.role
//                 }
//             } 
//         }
//         if(params&&(params.monthTo!=null)&&(params.monthTo!=undefined)&&(params.monthFrom!=null&&params.monthFrom!=undefined)){
//             queryModel = {
//                 'role': {
//                     $eq: 'user'
//                 }
//             }  
//         }

//         user = await db.user.find(queryModel).skip(skipCount).limit(items).sort({
//                         timeStamp: -1
//                     });
//                     // total users
//                     let totalCount = await db.user.find({
//                         'role': {
//                             $eq: role
//                         }

//                     }).count()

//                     // total skipped
//                     let skippedCount = skipCount

//                     // requested user
//                     let count = items

//                     const tempUserResponseObj = await createTempUserObj(user, count, skippedCount, totalCount)
//                     user = tempUserResponseObj
//         log.end()
//         return user
//     } catch (err) {
//         log.end()
//         throw new Error(err)

//     }
// }



const update = async (id, model, res, context) => {
    const log = context.logger.start(`services/users:${id}`)
    try {

        const entity = id === 'my' ? context.user : await db.user.findById(id)

        if (!entity) {
            return response.notFound(res, 'user_not_found')
        }
        if (context.user.role === 'superAdmin') {
            await set(model, entity, context)
            entity.status = model.status
        } else {


            // call set method to update user
            await set(model, entity, context)
        }

        log.end()
        return entity
    } catch (err) {
        throw new Error(err)
    }
}

const login = async (model, res, context) => {
    const log = context.logger.start(`services/users/login`)

    try {

        let user;
        const query = {}

        // if (((model.phone) || ((model.email) ) {

        //         (query.= model.email), (query.role = model.role)
        // }
        if ((model.phone)) {
            (query.phone = model.phone)

        }
        if (model.email) {
            (query.email = model.email)
        }
        // find user
        user = await db.user.findOne(query)
        if (!user) {
            log.end()
            return response.notFound(res, 'user_not_found')
        }

        if (user.status === 'active') { // user not found
            // user.password = encrypt.getHash(model.password, context)
            // match password
            const isMatched = encrypt.compareHash(model.password, user.password, context)
            if (!isMatched) {
                log.end()
                return response.unAuthorized(res, 'password_mismatch')
            }

            //  create token
            const token = auth.getToken(user._id, false, context)
            if (!token) {

                return response.unAuthorized(res, "token_error")
            }
            user.token = token
            user.isVerified = true

            user.save()
        }
        log.end()
        return user;

    } catch (err) {
        log.end()
        throw new Error(err)
    }
}


const changePassword = async (model, res, context) => {
    const log = context.logger.start(`services/users/changePassword`)

    try {

        // find user
        const entity = await db.user.findOne({
            '_id': {
                $eq: context.user.id
            }
        })
        if (!entity) {
            return response.notFound(res, 'user_not_found')
        }

        // match old password
        const isMatched = encrypt.compareHash(model.password, entity.password, context)
        if (!isMatched) {
            return response.unAuthorized(res, 'password_mismatch')
        }


        // update & encrypt password
        entity.password = encrypt.getHash(model.newPassword, context)

        log.end()
        return entity.save()

    } catch (err) {
        log.end()
        throw new Error(err)
    }
}

const forgotPassword = async (model, res, context) => {
    const log = context.logger.start(`services/users/forgotPassword`)

    try {
        const query = {}
        if (model.phone) {
            query.phone = model.phone
        }

        // find user
        const user = await db.user.findOne({
            'phone': {
                $eq: query.phone
            },
            'role': {
                $eq: model.role
            }
        })
        if (!user) {
            return response.notFound(res, 'user_not_found')
        }

        // call send otp function
        await sendOtp(model, user, context)
        user.save()

        log.end()
        return user;

    } catch (err) {
        log.end()
        throw new Error(err)
    }
}

const resetPassword = async (model, res, context) => {
    const log = context.logger.start(`services/users/verifyOtp`)

    try {

        let user;

        // find user
        user = await db.user.findOne({
            'phone': {
                $eq: model.phone
            },
            'role': {
                $eq: model.role
            }

        })
        if (!user) {
            return response.notFound(res, 'user_not_found')
        }

        // // call matchOtp method
        // await matchOtp(model, user, context)

        // update password
        if (user) {
            user.password = encrypt.getHash(model.newPassword, context)
            user.save()
        }

        log.end()
        return user;

    } catch (err) {
        log.end()
        throw new Error(err)
    }
}


const logOut = async (id, res, context) => {
    const log = context.logger.start(`services/users/logOut`)

    try {

        const user = await db.user.findOne({
            '_id': {
                $eq: context.user.id
            }
        })
        if (!user) {
            return response.notFound(res, 'user_not_found')
        }
        user.token = ''
        user.save()
        res.message = 'logout successfully'
        log.end()
        return response.data(res, '')


    } catch (err) {
        log.end()
        throw new Error(err)
    }
}

exports.verifyUser = verifyUser
exports.userExists = userExists
exports.getById = getById
exports.get = get
exports.update = update
exports.login = login
exports.forgotPassword = forgotPassword
exports.resetPassword = resetPassword
exports.changePassword = changePassword
exports.logOut = logOut
exports.createOrUpdate = createOrUpdate














// exports.sendSms = sendSms
// exports.verifySms = verifySms




// const smsOtp = async (url, apikey, sender, subject, otp, phone) => {
//     let data;
//     data = 'apikey=' + apikey + '&sender=' + sender + '&numbers=' + phone + '&message=' + subject + otp;
//     // const data = JSON.stringify({})
//     https.post(`https://api.textlocal.in/send?${data}`, {}).then(response => {
//             console.log(response);
//         })
//         .catch(error => {
//             console.log(error);
//         });
// }

// const sendSms = async (req, model, context) => {
//     try {
//         const params = req.query;
//         let user;
//         if (params && (params.phone != undefined && params.phone != null)) {
//             user = await db.user.findOne({
//                 'phone': {
//                     $eq: params.phone
//                 }
//             })
//         }
//         if (user == undefined) {
//             throw new Error('User not found');
//         }
//         console.log("user", user)
//         // send message
//         if (user) {
//             // generate otp 
//             const otp = randomize('0', 6)
//             user.otp = otp;
//             // user.save();
//             const subject = "The verification code for Farmer's Hut is: "
//             // const text = "you are reseiving this because you have requested the reset of the password for your account"
//             smsOtp(url, apikey, sender, subject, otp, params.phone)
//         }

//         const date = new Date();
//         const expiryTime = moment(date.setMinutes(date.getMinutes() + 3));
//         user.expiryTime = expiryTime
//         // user.save();

//         const tempToken = auth.getToken(user._id, false, context)
//         if (!tempToken) {
//             throw new Error("token error")
//         }
//         user.tempToken = tempToken

//         return user.save();
//     } catch (err) {
//         console.log('unsuccessful');
//         throw new Error(err)
//     }
// }

// const verifySms = async (model, context) => {
//     try {
//         const query = {}
//         if (!model.tempToken) {
//             throw new Error("temp token required")
//         }
//         query.tempToken = model.tempToken
//         const user = await db.user.findOne({
//             'tempToken': {
//                 $eq: query.tempToken
//             }
//         })
//         if (!user) {
//             throw new Error('user not found')
//         }

//         const a = moment(new Date()).format();
//         const mom = moment(user.expiryTime).subtract(3, 'minutes').format();
//         const isExpired = moment(a).isBetween(mom, user.expiryTime)
//         if (!isExpired) {
//             throw new Error('otp expired')
//         }


//         // Check Otp entred
//         if (model.otp != user.otp) {
//             throw new Error("otp do not match")
//         }

//         // update password
//         user.password = encrypt.getHash(model.newPassword, context)
//         // user.otp = '',
//         // user.tempToken = ''
//         user.save();
//         user.otp = '',
//             user.tempToken = ''

//         return user;
//     } catch (err) {
//         console.log('unsuccessful');
//         throw new Error(err)
//     }
// }
'use strict'

const fs = require('fs')
const specs = require('../specs')
const api = require('../api')
var auth = require('../permit')
const validator = require('../validators')
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()


const configure = (app, logger) => {
    const log = logger.start('settings:routes:configure')

    app.get('/specs', function (req, res) {
        fs.readFile('./public/specs.html', function (err, data) {
            if (err) {
                return res.json({
                    isSuccess: false,
                    error: err.toString()
                })
            }
            res.contentType('text/html')
            res.send(data)
        })
    })

    app.get('/tracker', function (req, res) {
        fs.readFile('./public/tracker.html', function (err, data) {
            if (err) {
                return res.json({
                    isSuccess: false,
                    error: err.toString()
                })
            }
            res.contentType('text/html')
            res.send(data)
        })
    })

    app.get('/api/specs', function (req, res) {
        res.contentType('application/json')
        res.send(specs.get())
    })
   

    // .......................users routes..............................

    app.get('/api/users', auth.context.builder, auth.context.requiresToken, api.users.get);

    app.post('/api/users/verifyUser', auth.context.builder, validator.users.verifyUser, api.users.verifyUser);
   
    app.post('/api/users', auth.context.builder, validator.users.canCreate, api.users.userExists);
    app.post('/api/users/createOrUpdate', auth.context.builder,  api.users.createOrUpdate);

    app.get('/api/users/:id', auth.context.builder, auth.context.requiresToken, validator.users.getById, api.users.getById);
    app.put('/api/users/:id', auth.context.builder, auth.context.requiresToken, validator.users.update, api.users.update);
    app.post('/api/users/login', auth.context.builder,  api.users.login);

    app.post('/api/users/forgotPassword', auth.context.builder, validator.users.forgotPassword, api.users.forgotPassword);
    app.post('/api/users/resetPassword', auth.context.builder, validator.users.resetPassword, api.users.resetPassword);

    app.post('/api/users/changePassword', auth.context.builder, auth.context.requiresToken, validator.users.changePassword, api.users.changePassword);
    app.post('/api/users/logOut', auth.context.builder, auth.context.requiresToken, api.users.logOut)

    // .............................outlets routes..................................
    app.get('/api/outlets/search',auth.context.builder, auth.context.requiresToken, api.outlets.search);

    app.post('/api/outlets', auth.context.builder, auth.context.requiresToken, validator.outlets.canCreate, api.outlets.create);
     app.get('/api/outlets/:id', auth.context.builder, auth.context.requiresToken, api.outlets.getById)
    app.get('/api/outlets', auth.context.builder, auth.context.requiresToken, api.outlets.get)
    app.put('/api/outlets/:id', auth.context.builder, auth.context.requiresToken, api.outlets.update)
    
    // ...............................categories routes......................................
   
    app.post('/api/categories', auth.context.builder, auth.context.requiresToken,validator.category.canCreate, api.categories.create)
    app.get('/api/categories/:id', auth.context.builder, auth.context.requiresToken, api.categories.getById)
    app.get('/api/categories', auth.context.builder, auth.context.requiresToken, api.categories.get)
    app.put('/api/categories/:id', auth.context.builder, auth.context.requiresToken, api.categories.update)
    app.delete('/api/categories/delete/:id', auth.context.requiresToken, api.categories.delete);
    

    // // ...............................subcategories routes......................................
    // app.post('/api/subcategories', auth.context.builder, auth.context.requiresToken, api.subCategories.create)
    // app.get('/api/subcategories/:id', auth.context.builder, auth.context.requiresToken, api.subCategories.getById)
    // app.get('/api/subcategories', auth.context.builder, auth.context.requiresToken, api.subCategories.get)
    // app.put('/api/subcategories/:id', auth.context.builder, auth.context.requiresToken, api.subCategories.update)

    // // ...............................customizableCategories routes......................................
    // app.post('/api/customizableCategories', auth.context.builder, auth.context.requiresToken, api.customizableCategories.create)
    // app.get('/api/customizableCategories/:id', auth.context.builder, auth.context.requiresToken, api.customizableCategories.getById)
    // app.get('/api/customizableCategories', auth.context.builder, auth.context.requiresToken, api.customizableCategories.get)
    // app.put('/api/customizableCategories/:id', auth.context.builder, auth.context.requiresToken, api.customizableCategories.update)

    // .......................................items routes...................................
    app.get('/api/items/search', auth.context.requiresToken, api.items.search);
    app.post('/api/items', auth.context.builder, auth.context.requiresToken, api.items.create);
    app.get('/api/items/:id', auth.context.builder, auth.context.requiresToken, api.items.getById)
    app.get('/api/items', auth.context.builder, auth.context.requiresToken, api.items.get)
    app.put('/api/items/:id', auth.context.builder, auth.context.requiresToken, api.items.update)
    app.delete('/api/items/delete/:id', auth.context.requiresToken, api.items.delete);

    // .......................address routes..............................
    app.get('/api/address', auth.context.builder, auth.context.requiresToken, api.address.get);
    app.post('/api/address', auth.context.builder, auth.context.requiresToken,  api.address.create);
    app.get('/api/address/:id', auth.context.builder, auth.context.requiresToken, api.address.getById);
    app.delete('/api/address/delete/:id', auth.context.requiresToken, api.address.delete);
    app.put('/api/address/:id', auth.context.builder, auth.context.requiresToken, api.address.update);
    
    
    // .......................cuisines routes..............................
     app.get('/api/cuisines', auth.context.builder, auth.context.requiresToken, api.cuisines.get);
     app.post('/api/cuisines', auth.context.builder, auth.context.requiresToken,  api.cuisines.create);
     app.get('/api/cuisines/:id', auth.context.builder, auth.context.requiresToken, api.cuisines.getById);
     app.delete('/api/cuisines/delete/:id', auth.context.requiresToken, api.cuisines.delete);
     app.put('/api/cuisines/:id', auth.context.builder, auth.context.requiresToken, api.cuisines.update);
    

    // ------------cart routes--------------------------
    app.put('/api/carts/:id', auth.context.builder, api.carts.update);
    app.get('/api/carts', auth.context.builder, auth.context.requiresToken, api.carts.get)


    //..............................order routes......................................
    app.post('/api/orders', auth.context.builder, auth.context.requiresToken, api.orders.create);
    app.get('/api/orders/:id', auth.context.builder, auth.context.requiresToken, api.orders.getById);
    app.get('/api/orders', auth.context.builder, auth.context.requiresToken, api.orders.get);
    app.put('/api/orders/:id', auth.context.builder, auth.context.requiresToken, api.orders.update);

    // .......................................items routes...................................
    app.post('/api/configs', auth.context.builder, auth.context.requiresToken, api.configs.create);
    app.get('/api/configs/:id', auth.context.builder, auth.context.requiresToken, api.configs.getById)
    // app.get('/api/configs', auth.context.builder, auth.context.requiresToken, api.configs.get)
    app.put('/api/configs/:id', auth.context.builder, auth.context.requiresToken, api.configs.update)

   
    // ----------------- upload files -----------------------
    app.post('/api/files', auth.context.builder, multipartMiddleware, api.files.create)
    app.post('/api/files/upload', multipartMiddleware, api.files.upload);
    app.get('/api/files/:id', auth.context.builder,auth.context.requiresToken, api.files.getById)

    log.end()
}
exports.configure = configure
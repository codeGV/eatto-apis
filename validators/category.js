'use strict'

const response = require('../exchange/response')

exports.canCreate = (req, res, next) => {
    if(!req.body.parent.categoryType){
        response.notFound(res, 'categoryType_required')
    }
    if(req.body.parent.categoryType=='season'){
        if(!req.body.parent.id){
            response.notFound(res, 'series_required')
        }
        if(!req.body.name){
            response.notFound(res, 'name_required')
        }
    }
    if(req.body.parent.categoryType=='episode'){
        if(!req.body.parent.id){
            response.notFound(res, 'Season_required')
        }
        if(!req.body.name){
            response.notFound(res, 'name_required')
        }
    }
    return next()
}
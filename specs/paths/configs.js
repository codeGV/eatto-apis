module.exports = [{
    url: '/',
    get: {
        summary: 'Search',
        description: 'get all items list',
        parameters: [{
            in: 'header',
            name: 'x-access-token',
            description: 'token to access api',
            required: true,
            type: 'string'
        },{
            in:'query',
            name:'restaurantId',
            description:'get item by restaurantId',
            required:false,
            type:'string'
        },
        {
            in:'query',
            name:'status',
            description:'active/inactive',
            required:false,
            type:'string'
        }],
        responses: {
            default: {
                description: 'Unexpected error',
                schema: {
                    $ref: '#/definitions/Error'
                }
            }
        }
    },
    post: {
        summary: 'Create',
        description: 'Create congig',
        parameters: [{
            in: 'header',
            name: 'x-access-token',
            description: 'token to access api',
            required: true,
            type: 'string'
        }, {
            in: 'body',
            name: 'body',
            description: 'Model of item creation',
            required: true,
            schema: {
                $ref: '#/definitions/configCreateReq'
            }
        }],
        responses: {
            default: {
                description: 'Unexpected error',
                schema: {
                    $ref: '#/definitions/Error'
                }
            }
        }
    }
}, {
    url: '/{id}',
    get: {
        summary: 'Get',
        description: 'get config by Id',
        parameters: [{
            in: 'header',
            name: 'x-access-token',
            description: 'token to access api',
            required: true,
            type: 'string'
        }, {
            in: 'path',
            name: 'id',
            description: 'itemId',
            required: true,
            type: 'string'
        }],
        responses: {
            default: {
                description: 'Unexpected error',
                schema: {
                    $ref: '#/definitions/Error'
                }
            }
        }
    },
    put: {
        summary: 'Update config',
        description: 'update config details',
        parameters: [{
            in: 'header',
            name: 'x-access-token',
            description: 'token to access api',
            required: true,
            type: 'string'
        }, {
            in: 'path',
            name: 'id',
            description: 'configId',
            required: true,
            type: 'string'
        }, {
            in: 'body',
            name: 'body',
            description: 'Model of config update',
            required: true,
            schema: {
                $ref: '#/definitions/itemUpdateReq'
            }
        }]
    }
}]
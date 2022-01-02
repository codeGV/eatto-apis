module.exports = [{
    url: '/',
    get: {
        summary: 'Search',
        description: 'get all outlets list',
        parameters: [{
            in: 'header',
            name: 'x-access-token',
            description: 'token to access api',
            required: true,
            type: 'string'
        }, {
            in: 'query',
            name: 'outletCode',
            description: 'get outlet according to outlet code',
            required: false,
            type: 'string'
        },
        {
            in: 'query',
            name: 'type',
            description: 'get outlet according to type: isMain,outlet',
            required: false,
            type: 'string'
        },
     ],
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
        description: 'Create Outlet',
        parameters: [{
            in: 'header',
            name: 'x-access-token',
            description: 'token to access api',
            required: true,
            type: 'string'
        }, {
            in: 'body',
            name: 'body',
            description: 'Model of outlet creation',
            required: true,
            schema: {
                $ref: '#/definitions/outletCreateReq'
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
},{
    url: '/search',
    get: {
        summary: 'Search',
        description: 'get resturent',
        parameters: [{
            in: 'header',
            name: 'x-access-token',
            description: 'token to access api',
            required: true,
            type: 'string'
        },
        {
            in: 'query',
            name: 'name',
            description: 'get resturent though name',
            required: true,
            type: 'string'
        },
        {
            in: 'query',
            name: 'pageNo',
            description: 'get resturent though name',
            required: true,
            type: 'number'
        },
        {
            in: 'query',
            name: 'items',
            description: 'get resturent though name',
            required: false,
            type: 'number'
        }


        ],
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
        description: 'get outlet by Id',
        parameters: [{
            in: 'header',
            name: 'x-access-token',
            description: 'token to access api',
            required: true,
            type: 'string'
        }, {
            in: 'path',
            name: 'id',
            description: 'outletId',
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
        summary: 'Update outlet',
        description: 'update outlet details or add new outlets',
        parameters: [{
            in: 'header',
            name: 'x-access-token',
            description: 'token to access api',
            required: true,
            type: 'string'
        }, {
            in: 'path',
            name: 'id',
            description: 'outletId',
            required: true,
            type: 'string'
        }, {
            in: 'body',
            name: 'body',
            description: 'Model of outlet update',
            required: true,
            schema: {
                $ref: '#/definitions/outletUpdateReq'
            }
        }]
    }
}

]
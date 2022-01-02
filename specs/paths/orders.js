module.exports = [{
    url: '/',
    get: {
        summary: 'Search',
        description: 'get all orders list',
        parameters: [{
                in: 'header',
                name: 'x-access-token',
                description: 'token to access api',
                required: true,
                type: 'string'
            }, {
                in: 'query',
                name: 'cartId',
                description: 'get order by cartId',
                required: false,
                type: 'string'
            },
            {
                in: 'query',
                name: 'history',
                description: 'true/false',
                required: false,
                type: 'string'
            },{
                in: 'query',
                name: 'pageNo',
                description: 'pageNo',
                required: false,
                type: 'string'
            },{
                in: 'query',
                name: 'count',
                description: 'count',
                required: false,
                type: 'string'
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
    },
    post: {
        summary: 'Create',
        description: 'Create order',
        parameters: [{
            in: 'header',
            name: 'x-access-token',
            description: 'token to access api',
            required: true,
            type: 'string'
        }, {
            in: 'body',
            name: 'body',
            description: 'Model of order creation',
            required: true,
            schema: {
                $ref: '#/definitions/orderCreateReq'
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
        description: 'get order by Id',
        parameters: [{
            in: 'header',
            name: 'x-access-token',
            description: 'token to access api',
            required: true,
            type: 'string'
        }, {
            in: 'path',
            name: 'id',
            description: 'orderId',
            required: true,
            type: 'string'
        }, {
            in: 'query',
            name: 'pageNo',
            description: 'pageNo',
            required: false,
            type: 'string'
        }, {
            in: 'query',
            name: 'count',
            description: "count",
            required: false,
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
        summary: 'Update order',
        description: 'update order details',
        parameters: [{
            in: 'header',
            name: 'x-access-token',
            description: 'token to access api',
            required: true,
            type: 'string'
        }, {
            in: 'path',
            name: 'id',
            description: 'orderId',
            required: true,
            type: 'string'
        }, {
            in: 'body',
            name: 'body',
            description: 'Model of order update',
            required: true,
            schema: {
                $ref: '#/definitions/orderUpdateReq'
            }
        }]
    }
}]
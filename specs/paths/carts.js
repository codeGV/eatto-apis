module.exports = [{
    url: '/',
    get: {
        summary: 'Get',
        description: 'get cart by Id',
        parameters: [{
            in: 'header',
            name: 'x-access-token',
            description: 'token to access api',
            required: true,
            type: 'string'
        }, {
            in: 'query',
            name: 'id',
            description: 'cartId',
            required: true,
            type: 'string'
        },{
            in:'query',
            name:'pageNo',
            description:'pageNo',
            required:false,
            type:'string'
        }, {
            in: 'query',
            name: 'count',
            description: 'count',
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
    }  
},
{
    url: '/{id}',
    put: {
        summary: 'Update cart',
        description: 'update cart details',
        parameters: [{
            in: 'header',
            name: 'x-access-token',
            description: 'token to access api',
            required: true,
            type: 'string'
        },
        {
            in: 'path',
            name: 'id',
            description: 'cartId',
            required: true,
            type: 'string'
        },
        {
            in: 'body',
            name: 'body',
            description: 'Model of cart update',
            required: true,
            schema: {
                $ref: '#/definitions/cartUpdateReq'
            }
        }
        ],
        responses: {
            default: {
                description: {
                    schema: {
                        $ref: '#/definitions/Error'
                    }
                }
            }
        }
    }
}






]
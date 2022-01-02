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
                }, {
                    in: 'query',
                    name: 'isCustomizable',
                    description: 'get item by isCustomizable:true/false',
                    required: false,
                    type: 'string'
                },
                {
                    in: 'query',
                    name: 'pageNo',
                    description: 'get page no',
                    required: false,
                    type: 'string'
                },
                {
                    in: 'query',
                    name: 'items',
                    description: 'get items'
    ,
                    required: false,
                    type: 'string'
                },{
                    in: 'query',
                    name: 'isRecommanded',
                    description: 'get item by isRecommanded:true/false',
                    required: false,
                    type: 'string'
                }, {
                    in: 'query',
                    name: 'categoryId',
                    description: 'get item by categoryId',
                    required: false,
                    type: 'string'
                },
                {
                    in: 'query',
                    name: 'status',
                    description: 'active/inactive',
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
            description: 'Create Item',
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
                    $ref: '#/definitions/itemCreateReq'
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
            description: 'get item by Id',
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
            }, {
                in: 'query',
                name: 'type',
                description: 'get addOns of item',
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
            summary: 'Update item',
            description: 'update item details',
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
            }, {
                in: 'body',
                name: 'body',
                description: 'Model of item update',
                required: true,
                schema: {
                    $ref: '#/definitions/itemUpdateReq'
                }
            }]
        }
    },

    {
        url: '/search',
        get: {
            summary: 'Search',
            description: 'get products list',
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
                    description: 'get dish though name',
                    required: true,
                    type: 'string'
                },
                {
                    in: 'query',
                    name: 'pageNo',
                    description: 'get dish though name',
                    required: true,
                    type: 'number'
                },
                {
                    in: 'query',
                    name: 'items',
                    description: 'get dish though name',
                    required: true,
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

    },
    {
        url: '/delete/{id}',
        delete: {
            summary: 'delete',
            description: ' delete by Id',
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
                    description: 'itemId',
                    required: true,
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
        }
    }
]
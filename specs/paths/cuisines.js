module.exports = [
    {
        url: '/',
        get: {
            summary: 'Search',
            description: 'get cuisines list',
            parameters: [{
                in: 'header',
                name: 'x-access-token',
                description: 'token to access api',
                required: true,
                type: 'string'
            },
            // {
            //     in: 'query',
            //     name: 'pageNo',
            //     description: 'get  address',
            //     required: true,
            //     type: 'number'
            // },
            // {
            //     in: 'query',
            //     name: 'items',
            //     description: 'get  address',
            //     required: true,
            //     type: 'number'
            // },
            // {
            //     in: 'query',
            //     name: 'status',
            //     description: 'get address though active or inactive',
            //     required: false,
            //     type: 'string'
            // },

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
            description: 'Create cuisines',
            parameters: [{

                in: 'header',
                name: 'x-access-token',
                description: 'token to access api',
                required: true,
                type: 'string'
            },
            {
                in: 'body',
                name: 'body',
                description: 'Model of cuisines creation',
                required: true,
                schema: {
                    $ref: '#/definitions/cuisinesCreateReq'
                },

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
        get: {
            summary: 'Get',
            description: 'get cuisines by Id',
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
                description: 'cuisinesId',
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

        },


        put: {
            summary: 'Update cuisines',
            description: 'update cuisines details',
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
                description: 'cuisinesId',
                required: true,
                type: 'string'
            },
            {
                in: 'body',
                name: 'body',
                description: 'Model of cuisines update',
                required: true,
                schema: {
                    $ref: '#/definitions/cuisinesUpdateReq'
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
                description: 'cuisinesId',
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
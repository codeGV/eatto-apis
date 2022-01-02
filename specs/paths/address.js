module.exports = [{
        url: '/',
        get: {
            summary: 'Search',
            description: 'get address list',
            parameters: [{
                    in: 'header',
                    name: 'x-access-token',
                    description: 'token to access api',
                    required: true,
                    type: 'string'
                }, {
                    in: 'query',
                    name: 'userId',
                    description: 'userId',
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
            description: 'Create address',
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
                    description: 'Model of User creation',
                    required: true,
                    schema: {
                        $ref: '#/definitions/addressCreateReq'
                    },

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
        url: '/{id}',
        get: {
            summary: 'Get',
            description: 'get address by Id',
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
                    description: 'addressId',
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
            summary: 'Update address',
            description: 'update address details',
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
                    description: 'addressId',
                    required: true,
                    type: 'string'
                },
                {
                    in: 'body',
                    name: 'body',
                    description: 'Model of address update',
                    required: true,
                    schema: {
                        $ref: '#/definitions/addressUpdateReq'
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
                    description: 'addressId',
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
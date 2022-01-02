module.exports = [{
        url: '/',
        get: {
            summary: 'Search',
            description: 'get all categories list',
            parameters: [{
                in: 'header',
                name: 'x-access-token',
                description: 'token to access api',
                required: true,
                type: 'string'
            }, {
                in: 'query',
                name: 'categoryType',
                description: 'get categories by categoryType:outlet,subCategory,addOns',
                required: false,
                type: 'string'
            }, {
                in: 'query',
                name: 'outletId',
                description: 'get categories by outletId',
                required: false,
                type: 'string'
            }, {
                in: 'query',
                name: 'status',
                description: 'active/inactive',
                required: false,
                type: 'string'
            }, {
                in: 'query',
                name: 'itemStatus',
                description: 'active/inactive',
                required: false,
                type: 'string'
            }, {
                in: 'query',
                name: 'subCategoryStatus',
                description: 'active/inactive',
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
        post: {
            summary: 'Create',
            description: 'Create Category',
            parameters: [ {
                in: 'body',
                name: 'body',
                description: 'Model of category creation',
                required: true,
                schema: {
                    $ref: '#/definitions/categoryCreateReq'
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
            description: 'get category by Id',
            parameters: [{
                    in: 'header',
                    name: 'x-access-token',
                    description: 'token to access api',
                    required: true,
                    type: 'string'
                }, {
                    in: 'path',
                    name: 'id',
                    description: 'categoryId',
                    required: true,
                    type: 'string'
                },
                // {
                //     in:'query',
                //     name:'status',
                //     description:'active/inactive',
                //     required:false,
                //     type:'string'
                // }
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
            summary: 'Update category',
            description: 'update category details',
            parameters: [{
                in: 'header',
                name: 'x-access-token',
                description: 'token to access api',
                required: true,
                type: 'string'
            }, {
                in: 'path',
                name: 'id',
                description: 'categoryId',
                required: true,
                type: 'string'
            }, {
                in: 'body',
                name: 'body',
                description: 'Model of category update',
                required: true,
                schema: {
                    $ref: '#/definitions/categoryUpdateReq'
                }
            }]
        },
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
                    description: 'categoryId',
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
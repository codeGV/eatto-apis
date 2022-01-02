module.exports = [{
        url: '/',
        get: {
            summary: 'Search',
            description: 'get Users list',
            parameters: [{
                in: 'header',
                name: 'x-access-token',
                description: 'token to access api',
                required: true,
                type: 'string'
            },
            {
                in: 'query',
                name: 'role',
                description: 'get usser though role',
                required: false,
                type: 'string'
            },
            {
                in: 'query',
                name: 'monthFrom',
                description: 'get user though month',
                required: false,
                type: 'string'
            },
            {
                in: 'query',
                name: 'monthTo',
                description: 'get user though month',
                required: false,
                type: 'string'
            },
            
            {
                in: 'query',
                name: 'pageNo',
                description: 'get resturent though name',
                required: false,
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
        },
        post: {
            summary: 'Create',
            description: 'Create User',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Model of User creation',
                required: true,
                schema: {
                    $ref: '#/definitions/userExistsReq'
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
       
    },
    {
        url: '/verifyUser',
        post: {
            summary: 'Verify User',
            description: 'Verify User',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Model of User verification',
                required: true,
                schema: {
                    $ref: '#/definitions/userVerifyReq'
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
    },
    {
        url: '/{id}',
        get: {
            summary: 'Get',
            description: 'get user by Id',
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
                    description: 'userId',
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
            summary: 'Update user',
            description: 'update user details',
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
                    description: 'userId',
                    required: true,
                    type: 'string'
                },
                {
                    in: 'body',
                    name: 'body',
                    description: 'Model of user update',
                    required: true,
                    schema: {
                        $ref: '#/definitions/userUpdateReq'
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
        url:'/createOrUpdate',
        post: {
            summary: 'Create',
            description: 'Create User',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Model of User creation',
                required: true,
                schema: {
                    $ref: '#/definitions/userCreateOrUpdateReq'
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
    },
    {
        url: '/login',
        post: {
            summary: 'Login User',
            description: 'Login User',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Model of User Login',
                required: true,
                schema: {
                    $ref: '#/definitions/userLoginReq'
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
    },
    {
        url: '/forgotPassword',
        post: {
            summary: 'Forgot Password',
            description: 'Forgot Password',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Model of Forgot Password',
                required: true,
                schema: {
                    $ref: '#/definitions/userForgotPasswordReq'
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
    },
    {
        url: '/resetPassword',
        post: {
            summary: 'Reset Password',
            description: 'Reset Password',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Model of reset password',
                required: true,
                schema: {
                    $ref: '#/definitions/userResetPasswordReq'
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
    },
    {
        url: '/changePassword',
        post: {
            summary: 'Change Password',
            description: 'Change Password',
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
                    description: 'Model of Change Password',
                    required: true,
                    schema: {
                        $ref: '#/definitions/userChangePasswordReq'
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
        url: '/logOut',
        post: {
            summary: 'Logout',
            description: 'Logout',
            parameters: [{
                in: 'header',
                name: 'x-access-token',
                description: 'token to access api',
                required: true,
                type: 'string'
            }],
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
   
]
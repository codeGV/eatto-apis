// module.exports = [{
//     url: '/',
//     get: {
//         summary: 'Search',
//         description: 'get all customizableCategories list',
//         parameters: [{
//             in: 'header',
//             name: 'x-access-token',
//             description: 'token to access api',
//             required: true,
//             type: 'string'
//         }, {
//             in: 'query',
//             name: 'itemId',
//             description: 'get customizableCategories by itemId',
//             required: false,
//             type: 'string'
//         }],
//         responses: {
//             default: {
//                 description: 'Unexpected error',
//                 schema: {
//                     $ref: '#/definitions/Error'
//                 }
//             }
//         }
//     },
//     post: {
//         summary: 'Create',
//         description: 'Create customizableCategory',
//         parameters: [{
//             in: 'header',
//             name: 'x-access-token',
//             description: 'token to access api',
//             required: true,
//             type: 'string',
//         }, {
//             in: 'body',
//             name: 'body',
//             description: 'Model of customizableCategory creation',
//             required: true,
//             schema: {
//                 $ref: '#/definitions/customizableCategoryCreateReq'
//             }
//         }],
//         responses: {
//             default: {
//                 description: 'Unexpected error',
//                 schema: {
//                     $ref: '#/definitions/Error'
//                 }
//             }
//         }
//     }
// }, {
//     url: '/{id}',
//     get: {
//         summary: 'Get',
//         description: 'get customizableCategory by Id',
//         parameters: [{
//             in: 'header',
//             name: 'x-access-token',
//             description: 'token to access api',
//             required: true,
//             type: 'string'
//         }, {
//             in: 'path',
//             name: 'id',
//             description: 'customizableCategoryId',
//             required: true,
//             type: 'string'
//         }],
//         responses: {
//             default: {
//                 description: 'Unexpected error',
//                 schema: {
//                     $ref: '#/definitions/Error'
//                 }
//             }
//         }
//     },
//     put: {
//         summary: 'Update customizableCategory',
//         description: 'update customizableCategory details',
//         parameters: [{
//             in: 'header',
//             name: 'x-access-token',
//             description: 'token to access api',
//             required: true,
//             type: 'string'
//         }, {
//             in: 'path',
//             name: 'id',
//             description: 'customizableCategoryId',
//             required: true,
//             type: 'string'
//         }, {
//             in: 'body',
//             name: 'body',
//             description: 'Model of customizableCategory update',
//             required: true,
//             schema: {
//                 $ref: '#/definitions/customizableCategoryUpdateReq'
//             }
//         }]
//     }
// }]
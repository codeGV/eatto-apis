// module.exports = [{
//     url: '/',
//     get: {
//         summary: 'Search',
//         description: 'get all subcategories list',
//         parameters: [{
//             in: 'header',
//             name: 'x-access-token',
//             description: 'token to access api',
//             required: true,
//             type: 'string'
//         }, {
//             in: 'query',
//             name: 'categoryId',
//             description: 'get subcategories by categoryId',
//             required: false,
//             type: 'string'
//         },{
//             in:'query',
//             name:'status',
//             description:'active/inactive',
//             required:false,
//             type:'string'
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
//         description: 'Create SubCategory',
//         parameters: [{
//             in: 'header',
//             name: 'x-access-token',
//             description: 'token to access api',
//             required: true,
//             type: 'string',
//         }, {
//             in: 'body',
//             name: 'body',
//             description: 'Model of subcategory creation /n',
//             required: true,
//             schema: {
//                 $ref: '#/definitions/subCategoryCreateReq'
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
//         description: 'get subcategory by Id',
//         parameters: [{
//             in: 'header',
//             name: 'x-access-token',
//             description: 'token to access api',
//             required: true,
//             type: 'string'
//         }, {
//             in: 'path',
//             name: 'id',
//             description: 'subcategoryId',
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
//         summary: 'Update subcategory',
//         description: 'update subcategory details',
//         parameters: [{
//             in: 'header',
//             name: 'x-access-token',
//             description: 'token to access api',
//             required: true,
//             type: 'string'
//         }, {
//             in: 'path',
//             name: 'id',
//             description: 'subcategoryId',
//             required: true,
//             type: 'string'
//         }, {
//             in: 'body',
//             name: 'body',
//             description: 'Model of subcategory update',
//             required: true,
//             schema: {
//                 $ref: '#/definitions/subCategoryUpdateReq'
//             }
//         }]
//     }
// }]
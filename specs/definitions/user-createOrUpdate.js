
module.exports = {
    userId:'string',
    // role: 'string',
     
    name: 'string',
   email:'string',
   password:"string",
   documents:[{
       _id:'string',
    fileUrl:'string'
   }],

   verificationDetails: {

    aadhaarNumber: 'string',
    vehicalNumber: 'string',
    address: 'String',
},
bankDetails: {
    ifcCode: 'string',
    accountNumber: 'string',
    accountHolderName: 'string',
    bankName: 'string'
}

}
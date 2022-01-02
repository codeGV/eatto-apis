'use strict'

// User Module
module.exports = {

   name: String,
   status: {
      type: String,
      default: 'enabled',
      enum: ['enabled', 'disabled']
   }

}
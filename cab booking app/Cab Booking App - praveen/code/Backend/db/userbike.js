const mongoose = require('mongoose');

const bikeschema = new mongoose.Schema({
    name:String,
    email:String,
    phoneNo:String,
    bikeNo:String,
    totalamount:String,
    provider:String,
    details:String,
    perks:String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName:String,
    registrationDate: {
        type: String, // Store dates as strings
        default: () => new Date().toLocaleDateString('hi-IN') // Set the default value to the current date in "MM/DD/YYYY" format
    },
    validtill: {
        type: String, // Store dates as strings
        default: () => {
          // Set the default value to the current date in "MM/DD/YYYY" format
          const currentDate = new Date();
          currentDate.setFullYear(currentDate.getFullYear() + 1); // Add one year
          return currentDate.toLocaleDateString('hi-IN');
        }
      },
    
})

module.exports =mongoose.model('userbike',bikeschema)


const mongoose = require("mongoose")
const doctorSchema = mongoose.Schema({
    years_of_experience: {type: Number, min:1, max: 45},
    specialty: {type: String, maxLength: 50},
    number_of_patients: {type: Number, min:3, max:50}
})

module.exports = mongoose.model("Doctor", doctorSchema)
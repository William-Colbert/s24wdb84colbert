const mongoose = require("mongoose")
const doctorSchema = mongoose.Schema({
    years_of_experience: {type: Number, min:1, max: 45},
    specialty: String,
    number_of_patients: Number
})

module.exports = mongoose.model("Doctor", doctorSchema)
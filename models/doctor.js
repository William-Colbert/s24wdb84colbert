const mongoose = require("mongoose")
const doctorSchema = mongoose.Schema({
    years_of_experience: Number,
    specialty: String,
    number_of_patients: Number
})

module.exports = mongoose.model("Doctor", doctorSchema)
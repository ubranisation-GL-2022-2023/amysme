const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);
var StatusEnum = require('../enums/enums');

const Candidature = mongoose.model('Candidature' , {
  
  candidatureId: {type: "string", unique: true,required: true},
  userId:{type: "string"},
  languages:{type: [String]},
  softSkills: {type: [String]},
  technicalSkills: {type: [String]},
  education: {type: [String]},
  workExperience: {type: [String]},
  rating: {type: "number"}, // 0 < x < 10
  status: {
    type: String,
    enum : [StatusEnum],
    default: StatusEnum.idle
}

})
module.exports = Candidature

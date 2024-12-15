const mongoose = require('mongoose')

const DeviceSchema = new mongoose.Schema({
  name: String,
  type: String,
  owner: String,
  status: { type: String, default: 'active' }
})

module.exports = mongoose.model('Device', DeviceSchema)

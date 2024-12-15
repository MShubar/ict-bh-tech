const express = require('express')
const Device = require('../models/Device')
const router = express.Router()

// Get all devices
router.get('/', async (req, res) => {
  const devices = await Device.find()
  res.json(devices)
})

// Add a new device
router.post('/', async (req, res) => {
  const newDevice = new Device(req.body)
  await newDevice.save()
  res.json(newDevice)
})

// Delete a device
router.delete('/:id', async (req, res) => {
  await Device.findByIdAndDelete(req.params.id)
  res.json({ message: 'Device deleted' })
})

module.exports = router

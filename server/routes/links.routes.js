const express = require('express')
const { getIndividualLinks, getAllLinks, generateShortLinks } = require('../controllers/links.controllers')
const router = express.Router()

//------------------------------------ GET ------------------------------------
router.get('/x/:urlSlug', getIndividualLinks)
router.get('/all', getAllLinks)
//------------------------------------ POST ------------------------------------
router.post('/create', generateShortLinks)

module.exports = router
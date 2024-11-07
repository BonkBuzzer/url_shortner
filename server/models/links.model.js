const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const linksSchema = new Schema({
    linkSlug: {
        type: String,
        required: true,
        unique: true
    },
    redirectLink: {
        type: String,
        required: true
    },
    totalCount: {
        type: Number,
    }
})

const Links = model('links', linksSchema)

module.exports = { Links }
const { Links } = require("../models/links.model");

const getIndividualLinks = async (req, res) => {
    try {
        const url = await Links.findOne({ linkSlug: req.params.urlSlug });
        if (url) {
            await Links.updateOne(
                {
                    linkSlug: req.params.urlSlug,
                },
                { $inc: { totalCount: 1 } }
            );
            console.log('just before redirect for link :', req.params.urlSlug)
            return res.redirect(url.redirectLink);
        } else res.status(404).json('Not found');
    } catch (err) {
        console.log(err);
        res.status(500).json('Server Error');
    }
}

const generateShortLinks = async (req, res) => {
    try {
        if (req.body.linkSlug === '' || req.body.redirectLink === '') {
            return res.status(422).json({ message: 'inputs missing' })
        }
        const slugCheck = await Links.find({ linkSlug: req.body.linkSlug })
        if (slugCheck.length === 0) {
            await Links.create({ linkSlug: req.body.linkSlug, redirectLink: req.body.redirectLink, totalCount: 0 })
            return res.status(200).json({ message: 'link created' })
        }
        return res.status(409).json({ message: 'slug already in use' })
    } catch (error) {
        return res.status(500).json({
            message: 'something broke while generating links',
            error: error.message
        })
    }
}

const getAllLinks = async (req, res) => {
    try {
        let links = await Links.find({})
        if (links.length === 0) {
            return res.status(200).json({ message: 'no links , create few' })
        }
        else return res.json({ message: 'here are all of your links', links })
    } catch (error) {
        res.status(500).json({ message: 'error in getAllLinks', error })
    }
}

module.exports = { getIndividualLinks, getAllLinks, generateShortLinks };
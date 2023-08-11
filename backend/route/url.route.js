const express = require("express")
const shortid = require('shortid');
const { urlModel } = require("../model/url.model")
require("dotenv").config()
const urlRouter = express.Router()

urlRouter.post("/", async (req, res) => {
    const url = req.body.url
    const protocol = req.protocol;
    const host = req.hostname;
    const port = process.env.port;
    const customURL = req.body.customURL
    try {
        if (!url) {
            return res.status(400).json({ error: 'url is required' })
        } else {
            if (customURL) {
                const unique=await urlModel.find({shortId:customURL})
                if(unique.length==0){
                    const shortId = customURL
                    await urlModel.create({
                        shortId: shortId,
                        redirectURL: url,
                        date:Date.now()
                    })
                    const fullURL = `${protocol}://${host}:${port}/${shortId}`
                    return res.status(200).json({ url: fullURL }) 
                }else{
                    return res.status(400).json({error:"url already taken please use different short name"})
                }

            } else {
                const shortId = shortid()
                await urlModel.create({
                    shortId: shortId,
                    redirectURL: url,
                    date:Date.now()
                })
                const fullURL = `${protocol}://${host}:${port}/${shortId}`
                res.status(200).json({ url: fullURL })
            }
        }
    } catch (error) {
        res.status(401).json({ error })
    }
})

urlRouter.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId
    try {
        const existingURL = await urlModel.findOne({ shortId })

        if (existingURL) {
            const currentDateTimestamp = Date.now();
            const specifiedDate = new Date(`${existingURL.date}`);
            const specifiedDateTimestamp = specifiedDate.getTime()
            const differenceInMilliseconds =currentDateTimestamp-specifiedDateTimestamp;
            const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
            
            if(differenceInHours>1){
                await urlModel.findByIdAndDelete({_id:existingURL._id})
                return res.json({msg:"url expired"})
            }else{
                return res.redirect(existingURL.redirectURL)
            }
        } else {
            return res.status(400).json({ error: "url not found" })
        }
    } catch (error) {
        res.status(400).json({ error })
    }
})

module.exports = {
    urlRouter
}
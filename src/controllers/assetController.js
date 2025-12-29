const Asset = require("../models/Asset");

exports.createAssets= async(req,res)=>{
    try{

       const {name, category, assetCode} = req.body

       if(!name || !category || !assetCode){
        return res.status(400).json({message : "name, category and assetCode are required"})
       }

       const existing = await Asset.findOne({assetCode})

       if(existing){
        return res.status(409).json({message : "Asset with this code already exists"})
       }

       const asset = await Asset.create({name, category, assetCode})

       return res.status(200).json({message : "asset created successfully"}, asset)
    }catch(error){
        console.error("Asset creation failed", error)
        return res.status(500).json({message :"Something went wrong"})
    }
}

exports.getAssets = async(req, res)=>{
    const assets = await Asset.find();
    res.json(assets)
}
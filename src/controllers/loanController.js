const Asset = require("../models/Asset");
const Loan = require("../models/Loan");

exports.borrowAsset = async(req, res)=>{
    try{
        const { assetId } = req.body

        if(!assetId){
            return res.status(400).json({message : "assetId is required"})
        }

        const asset = await Asset.findById(assetId)

        if (!asset){
            return res.status(404).json({message: "Asset does not exist"})
        }

        if (!asset.isAvailable){
            return res.status(409).json({message: "Asset is already borrowed"})
        }

        const loan = await Loan.create({
            asset: asset._id,
            user: req.user.id
        })

        asset.isAvailable = false;
        await asset.save();

        return res.status(201).json(loan)
    }catch(error){
        console.error("Failed to borrow", error)
        return res.status(500).json({message: "Something went wrong"})
    }
}

exports.returnAsset = async(req, res)=>{
    try{
        const { assetId } = req.body

        if(!assetId){
            return res.status(400).json({message : "assetId is required"})
        }

        const loan = await Loan.findOne({
            asset : assetId,
            user: req.user.id,
            returnedAt: null
        })

        if(!loan){
            return res.status(400).json({message: "No active loan found for this asset"})
        }

        loan.returnedAt = new Date();
        await loan.save();

        await Asset.findByIdAndUpdate(assetId, { isAvailable: true });

        return res.json({message : "Asset returned successfully"})

    }catch(error){
        console.error("Error while returning assets", error)
        return res.status(500).json({message: "Something went wrong"})
    }
}
import mongoose from 'mongoose';
import { RealEstateListingSchema } from '../models/listingModel';

const Listing = mongoose.model('Listing',RealEstateListingSchema);

export const createListing = (req,res) => {
    let newListing = new Listing(req.body);

    newListing.save((err, listing) => {
        if(err) {
            res.send(err);
        }
        res.json(listing);
    });
}
export const getListing = (req, res) => {
    
    Listing.find({}, (err, listing) =>{
        if(err) { 
            res.send(err);
        }
        res.json(listing);
    });
}

export const updateListing = (req,res) => {
    Listing.findOneAndUpdate({_id: req.params.listingID}, req.body, {new:true, useFindAndModify: false}, (err,listing) => {
        if(err) {
            res.send(err);
        }
        res.json(listing);
    });
}

export const deleteListing = (req,res) => {
    Listing.remove({_id: req.params.listingID}, (err,listing) =>{
        if(err) {
            res.send(err);
        }
        res.json({message: 'successfully deleted Listing'});
    });

}

export const getListingByCity = (req, res) => {
    
    Listing.find({city: req.params.city}, (err, listing) =>{
        if(err) { 
            res.send(err);
        }
        res.json(listing);
    });
}

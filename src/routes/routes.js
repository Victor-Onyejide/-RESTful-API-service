import { userSignUp,
         getUsers,
        updateProfile,
        deleteUser,
    getUserByUserName } from '../controllers/userController';

import {
    getListing,
    createListing,
    updateListing,
    deleteListing,
    getListingByCity

} from '../controllers/listingController';

const routes = (app) => {
    app.route('/User')
        .get((req, res, next) => {
            //middleware
            console.log(`Request from: ${req.originalUrl}`)
            console.log(`Request from: ${req.method}`)

            next();
        }, getUsers);
    
    app.route('/User/SignUp')
        .post(userSignUp);
    
    
    app.route('/User/:name')
        .get(getUserByUserName)
        .delete(deleteUser)
        .put(updateProfile);
    
    app.route('/Listing')
        .get(getListing)
        .post(createListing);

    app.route('/Listing/:listingID')
        .put(updateListing)
        .delete(deleteListing);
    
    app.route('/Listing/:city')
        .get(getListingByCity);
    
    app.route('/Listing/:city/:price')
        .get(getListingByCity);



}
export default routes;
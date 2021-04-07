module.exports = app => {
    const fav = require("../controllers/favourite.controller");
  
    var router = require("express").Router();
  
        // Create a new favourite ok working well
        router.post("/", fav.create);

        // Update a Tutorial with id ok  working well
        // router.put("/:fav_id", fav.update);
    
        // Retrieve a single favourite with id ok working well 
        router.get("/user_id=:user_id", fav.findFavWrtUser);
        // router.get("/:uId/:aId", fav.findOne);
        router.get("/activity_id=:activity_id&user_id=:user_id", fav.findOne);
        //get fav to dispaly on fav page 
        // router.get("/getAllFav/:status/:user_id",fav.getAllFav);
    
        // Retrieve all favourite ok working well
        // router.get("/", fav.findAll);
    
        // Delete all favourite
        router.delete("/activity_id=:activity_id&user_id=:user_id", fav.deleteFav);

        // Delete favourite
        // router.delete("/activity_id=:activity_id", fav.deleteUserFav);
    

    app.use('/api/favourites', router);
}
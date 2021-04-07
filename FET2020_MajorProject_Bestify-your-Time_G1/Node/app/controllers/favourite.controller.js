const db = require("../models");
const favourite = db.favourites;
// const Op = db.Sequelize.Op;

// Create and Save a new favourite
exports.create = (req, res) => {

  // Create a fav
  const fav = {
    user_id: req.body.user_id,
    activity_id: req.body.activity_id,
    status: req.body.status
  };

  // Save fav in the database
  favourite.create(fav)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};
//--------------------------------------------------------
// Update a fav by the id in the request
exports.update = (req, res) => {
  const id = req.params.fav_id;
  const updateedStatus = req.body.status;

  console.log(updateedStatus);
  favourite.update(
    { status: updateedStatus },
    { where: { fav_id: id } }
  ).then(function (rowsUpdated) {
    res.send(rowsUpdated)
  })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};
//---------------------------------------------------------------
// Find a single favourite with an id
// select * from favourites where user_id=(:uid)
exports.findFavWrtUser = (req, res) => {
  
  db.sequelize.query("select q.quiz_name, q.quiz_id from quizzes q,favourites f where f.activity_id=q.quiz_id and f.user_id=?",
  { replacements:[req.params.user_id],type: db.sequelize.QueryTypes.SELECT},)
  .then(data => {
    res.send(data);
    console.log(data);
  });
};
//---------------------------------------------

// mysql> select q.quize_name from quizes q,favourites f where f.activity_id=q.quiz
// e_id and f.user_id=1 and f.status=1;

// exports.getAllFav = (req, res) => {
//   db.sequelize.query("select q.quize_name, f.activity_id from quizes q,favourites f where f.activity_id=q.quize_id and f.status=? and f.user_id=?",
//     { replacements: [req.params.status,req.params.user_id], type: db.sequelize.QueryTypes.SELECT },

//   ).then(data => {
//     res.send(data);
//     console.log(data);
//   });
// }

//------------------------------------------------------------------

// Retrieve all favourite from the database.
exports.findAll = (req, res) => {
  const user_id = req.query.user_id;
  var condition = user_id ? { user_id: { [Op.like]: `%${user_id}%` } } : null;

  favourite.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
//-----------------------------------------------------------------------
//delete 1 favourite from table by fav id

// delete from favourites where fav_id=1;
exports.deleteFav = (req, res) => {
  // const activity_id = req.params.activity_id;
  // const user_id = req.params.user_id;
  // console.log( activity_id);
  // console.log(user_id);
  db.sequelize.query("delete from favourites where user_id=(:uid) and activity_id=(:aid)",{
    replacements: {uid:req.params.user_id,aid:req.params.activity_id}
  })
  .then(data => {
    res.send(data);
    console.log(data);
  });
}
//------------------------------------------------------------------------------------

// delete from favourites where fav_id=1;
exports.deleteUserFav = (req, res) => {
  db.sequelize.query("delete from favourites where activity_id=(:aid)",{
    replacements: {aid:req.params.activity_id}
  })
  .then(data => {
    res.send(data);
    console.log(data);
  });
}

exports.findOne = (req, res) => {
  
  db.sequelize.query("select * from favourites where user_id=(:uid) and activity_id=(:aid)",{
    replacements: {uid:req.params.user_id,aid:req.params.activity_id}
  })
  .then(data => {
    res.send(data);
    console.log(data);
  });
};
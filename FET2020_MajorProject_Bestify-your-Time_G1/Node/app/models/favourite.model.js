
  module.exports = (sequelize, Sequelize) => {
    const FAV = sequelize.define("favourites", {
      fav_id: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
            model:'users',
            key:'user_id'
          }
      },
      activity_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'quizzes',
          key:'quiz_id'
        }
      },
      status:{
        type: Sequelize.BOOLEAN
      }      
    },
    {
      uniqueKeys: {
          actions_unique: {
              fields: ['user_id', 'activity_id']
          }
      }
    },
    {
    freezeTableName:true,
    timestamps:false,
    underscored:true
    }
    );
  
    
    return FAV;
  };
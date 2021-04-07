module.exports = (sequelize, DataType) => {
    const QUIZERESULT = sequelize.define("state", {
      state_id: {
        type: DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      user_id:{
        type:DataType.INTEGER,
        allowNull:false,
        references:{
          model:'users',
          key:'user_id'
        }
      },
      quiz_id:{
        type:DataType.INTEGER,
        allowNull:false,
        references:{
          model:'quizzes',
          key:'quiz_id'
        }
      },
      quiz:{
        type: DataType.JSON
      },
      cat_id:{
        type: DataType.INTEGER,
        allowNull:false,
        references:{
            model:'quiz_categories',
            key:'quiz_cat_id'
          }
      },
      timer:{
        type: DataType.INTEGER,
        allowNull:false
      }    
    },
    {
    freezeTableName:true,
    timestamps:false,
    underscored:true
    });
  
    return QUIZERESULT;
  };
module.exports = (sequelize, DataType) => {
    const QUIZERESULT = sequelize.define("quiz_result", {
      quize_result_id: {
        type: DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      quiz_id:{
        type:DataType.INTEGER,
        allowNull:false,
        references:{
          model:'quizzes',
          key:'quiz_id'
        }
      },
      user_id:{
        type:DataType.INTEGER,
        allowNull:false,
        references:{
          model:'users',
          key:'user_id'
          
        }
      },
      status:{
        type:DataType.BOOLEAN
      },
      finised:{
        type:DataType.BOOLEAN
      },
      date_played:{
        type: DataType.DATEONLY
      },
      score:{
        type:DataType.INTEGER
      },
      out_off:{
        type:DataType.INTEGER
      }
    },
    {
    freezeTableName:true,
    timestamps:false,
    underscored:true
    });
  
    return QUIZERESULT;
  };
module.exports = (sequelize, DataType) => {
    const GAMERESULT = sequelize.define("game_result", {
      game_result_id: {
        type: DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      game_id:{
        type:DataType.INTEGER,
        allowNull:false,
        references:{
          model:'games',
          key:'game_id'
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
      }
    },
    {
    freezeTableName:true,
    timestamps:false,
    underscored:true
    });
  
    return GAMERESULT;
  };
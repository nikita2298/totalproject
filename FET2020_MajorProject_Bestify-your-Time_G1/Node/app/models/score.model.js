module.exports = (sequelize, DataType) => {
    const SCORES = sequelize.define("scores", {
        score_id:{
            type: DataType.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
      game_id: {
        type: DataType.INTEGER,
        references:{
            model:'games',
            key:'game_id'
          }
      },
      user_id: {
        type: DataType.INTEGER,
        references:{
            model:'users',
            key:'user_id'
          }
      },
      score: {
        type: DataType.INTEGER,
        allowNull:false
      },
      // status:{
      //   type: DataType.BOOLEAN,
      //   allowNull:false
      // },
      date_played:{
        type: DataType.DATEONLY,
        allowNull:false
      },
      // start_time:{
      //   type: DataType.TIME,
      //   allowNull:false
      // },
      // end_time:{
      //   type: DataType.TIME,
      //   allowNull:false
      // }
    },
    {
    freezeTableName:true,
    timestamps:false,
    underscored:true
    });
  
    return SCORES;
  };
module.exports = (sequelize, DataType) => {
    const GAMES = sequelize.define("games", {
      game_id: {
        type: DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      game_name: {
        type: DataType.STRING,
        allowNull:false
      },
      // cat_id:{
      //   type: DataType.INTEGER,
      //   allowNull:false,
      //   references:{
      //       model:'categories',
      //       key:'cat_id'
      //     }
      // }
    },
    {
    freezeTableName:true,
    timestamps:false,
    underscored:true
    });
    return GAMES;
  };
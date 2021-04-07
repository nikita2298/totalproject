module.exports = (sequelize, DataType) => {
  const QUIZECAT = sequelize.define("quiz_categories", {
    quiz_cat_id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    quiz_cat_name: {
      type: DataType.STRING,
      allowNull: false
    }//,
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
      freezeTableName: true,
      timestamps: false,
      underscored: true
    });

  return QUIZECAT;
};
module.exports = (sequelize, DataType) => {
    const CATGRY = sequelize.define("categories", {
      cat_id: {
        type: DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      cat_name: {
        type: DataType.STRING,
        allowNull:false
      }
    },
    {
    freezeTableName:true,
    timestamps:false,
    underscored:true
    });
  
    return CATGRY;
  };
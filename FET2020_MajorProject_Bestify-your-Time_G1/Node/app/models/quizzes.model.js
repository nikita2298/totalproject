module.exports = (sequelize, DataType) => {
    const QUIZES = sequelize.define("quizzes", {
      quiz_id: {
        type: DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      quiz_name: {
        type: DataType.STRING,
        allowNull:false
      },
      quiz_cat_id:{
        type: DataType.INTEGER,
        allowNull:false,
        references:{
            model:'quiz_categories',
            key:'quiz_cat_id'
          }
      },
      questions:{
        type:DataType.JSON,
        allowNull:false
      },
      quiz_time:{
        type: DataType.INTEGER,
      },
      description:{
        type: DataType.TEXT,
      }
    },
    {
    freezeTableName:true,
    timestamps:false,
    underscored:true
    });
  
    return QUIZES;
  };
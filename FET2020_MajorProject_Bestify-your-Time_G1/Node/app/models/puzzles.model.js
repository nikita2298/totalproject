module.exports = (sequelize, DataType) => {
  const PUZZLES = sequelize.define("puzzles", {
    puzzle_id: {
      type: DataType.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    puzzle_question: {
      type: DataType.STRING,
      allowNull:false
    },
    puzzle_answer:{
      type: DataType.STRING,
    },
    puzzle_name:{
      type: DataType.STRING
    },
    puzzle_explanation:{
      type: DataType.TEXT
    }
    
    //,
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

  return PUZZLES;
};
module.exports = (sequelize, DataType) => {
  const PUZZLERESULT = sequelize.define("puzzle_result", {
    puzzle_result_id: {
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
   
    date_played:{
      type: DataType.DATEONLY
    },
    score:{
      type:DataType.INTEGER,
    }
  },
  {
  freezeTableName:true,
  timestamps:false,
  underscored:true
  });

  return PUZZLERESULT;
};


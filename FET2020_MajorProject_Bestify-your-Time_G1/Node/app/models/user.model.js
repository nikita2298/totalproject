module.exports = (sequelize, DataType) => {
  const User = sequelize.define("users", {
    user_id: {
      type: DataType.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    first_name: {
      type: DataType.STRING
    },
    last_name: {
      type: DataType.STRING
    },
    username: {
      type: DataType.STRING
    },
    email: {
      type: DataType.STRING
    },
    password: {
      type: DataType.STRING
    },
   role: {
    type: DataType.BOOLEAN
   }
  });

  return User;
};

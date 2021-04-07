// module.exports = (sequelize, DataType) => {
//     const QUES = sequelize.define("questions", {
//       que_id: {
//         type: DataType.INTEGER,
//         autoIncrement:true,
//         primaryKey:true
//       },
//       question: {
//         type: DataType.STRING,
//         allowNull:false
//       },
//       question_type:{
//         type: DataType.BOOLEAN,
//         allowNull:false
//       },
//       option1: {
//         type: DataType.STRING,
//         allowNull:false
//       },
//       option2: {
//         type: DataType.STRING,
//         allowNull:false
//       },
//       option3: {
//         type: DataType.STRING,
//         allowNull:false
//       },
//       option4: {
//         type: DataType.STRING,
//         allowNull:false
//       },
//       correct_option: {
//         type: DataType.STRING,
//         allowNull:false
//       },
//       quize_id:{
//         type:DataType.INTEGER,
//         allowNull:false,
//         references:{
//           model:'quizzes',
//           key:'quiz_cat_id'
//         }
//       }
//     },
//     {
//     freezeTableName:true,
//     timestamps:false,
//     underscored:true
//     });
  
//     return QUES;
//   };
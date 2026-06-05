const mongoose =
require("mongoose");

const resultSchema =
new mongoose.Schema(
{
 interviewId:{
  type:
  mongoose.Schema.Types.ObjectId,
  ref:"Interview",
 },

 communicationScore:Number,

 technicalScore:Number,

 confidenceScore:Number,

 overallScore:Number,

 strengths:[String],

 weaknesses:[String],

 feedback:String,
},
{
 timestamps:true,
}
);

module.exports =
mongoose.model(
 "Result",
 resultSchema
);
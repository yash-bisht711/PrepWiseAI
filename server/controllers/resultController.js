const Result =
require("../models/Result");

exports.evaluateInterview =
async (req,res) => {

 try {

  const {
   interviewId,
   transcript,
  } = req.body;

  const prompt = `
Evaluate candidate.

Transcript:

${transcript}

Return JSON:

{
 "communicationScore":0,
 "technicalScore":0,
 "confidenceScore":0,
 "overallScore":0,
 "strengths":[],
 "weaknesses":[],
 "feedback":""
}
`;

  const result =
  await model.generateContent(
   prompt
  );

  let response =
  result.response.text();

  response =
  response
  .replace(/```json/g,"")
  .replace(/```/g,"")
  .trim();

  const parsed =
  JSON.parse(response);

  const evaluation =
  await Result.create({

   interviewId,

   ...parsed,

  });

  res.json(
   evaluation
  );

 } catch(error){

  res.status(500).json({
   message:error.message,
  });

 }

};

exports.getUserResults =
async (req,res)=>{

 try{

  const results =
  await Result.find()
  .populate({
   path:"interviewId",
   match:{
    userId:
    req.params.userId
   }
  });

  const filtered =
  results.filter(
   r => r.interviewId
  );

  res.json(filtered);

 }
 catch(error){

  res.status(500).json({
   message:error.message
  });

 }

};
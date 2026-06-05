const cloudinary =
require("../config/cloudinary");

const streamifier =
require("streamifier");

const Answer =
require("../models/Answer");

exports.uploadAnswer =
async (req,res) => {

 try {

  const uploadStream =
  cloudinary.uploader.upload_stream(
  {
   resource_type:
   "video",
  },

  async (error,result)=>{

   if(error)
   return res
   .status(500)
   .json(error);

   const answer =
   await Answer.create({

    interviewId:
    req.body.interviewId,

    question:
    req.body.question,

    duration:
    req.body.duration,

    videoUrl:
    result.secure_url,

   });

   res.status(201)
   .json(answer);

  });

  streamifier.createReadStream(
   req.file.buffer
  ).pipe(uploadStream);

 } catch(error){

  res.status(500).json({
   message:error.message,
  });

 }

};
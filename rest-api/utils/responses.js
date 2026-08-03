function notFound(res, resource){
    return res.status(404).json({
     message:`${resource} not found`
    });
   }
   
   
   function badRequest(res,error){
    return res.status(400).json({
     message:"Invalid data",
     errors:error.details
    });
   }
   
   
   module.exports={
    notFound,
    badRequest
   };
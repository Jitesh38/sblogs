const errorHandler = (error,req,res)=>{
    let statusCode = error.statusCode || 500;
    let message = error.message || "Internal server error"
    return res.status(statusCode).json({
        statusCode,
        message,
        status:false,
        data:null,
        error:error.error || ""
    })
}

module.exports = errorHandler
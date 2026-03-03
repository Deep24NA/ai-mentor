export const errorHandler = async (err , req , res , next) =>{
    console.error("GLOBAL ERROR" , err);

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        success : false,
        message : err.message || "Internal Server Error",
        stack : process.env.NODE_ENV === "production" ? null : err.stack,
    });
};
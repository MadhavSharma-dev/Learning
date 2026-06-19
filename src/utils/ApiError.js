class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null 
        this.message = message
        this.success = false;
        this.errors = errors
    }
}
export {ApiError}

//ApiError is a custom error class that lets you throw structured, HTTP-aware errors from anywhere in your app. Instead of manually writing res.status(404).json(...) every time, you just throw new ApiError(404, "User not found") and your error middleware handles the rest — keeping error responses consistent across the entire API.
class ApiResponse{
    constructor(statusCode , data , message  = "Success"){
        this.statusCode = statusCode
        this.data  = data
        this.message = message
        this.success = statusCode < 400 
    }
}

module.exports = {ApiResponse}

// A simple ApiResponse class with a constructor that takes:

// statusCode — the HTTP status code
// data — the response payload
// message — defaults to "Success" if not provided
// success — automatically derived as true when statusCode < 400, false otherwise

// It's a standardized wrapper to keep API responses consistent across the app
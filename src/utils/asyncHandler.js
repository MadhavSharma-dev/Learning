const asyncHandler = (requestHandler) => {
    (req,res,next) =>  {
        Promise.resolve(requestHandler(req,res,next)).
        catch((err) => next(err))
    }
}

export {asyncHandler}

// Express doesn't catch errors from async functions automatically. If an async route throws, Express just hangs.
//It takes your async route function, wraps it in a Promise, and if anything throws, it catches it and passes it to next(err) — which triggers your error handling middleware.
// Without it you'd need try/catch in every single async controller, which gets repetitive fast.
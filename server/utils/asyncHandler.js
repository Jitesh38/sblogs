const errorHandler = require('./errorHandler');

const asyncHandler = (asyncFunc) => {
    return (req, res, next) => {
        Promise.resolve(asyncFunc(req, res, next))
            .then()
            .catch(err=>next(err));
            // .catch(err=>errorHandler(err,req,res));
    };
};


module.exports = asyncHandler
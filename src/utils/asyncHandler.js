import ApiError from "./apiError.js";

const asyncHandler = (requestHandler) => {
  return async (req, res, next) => {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
      return res
        .status(error.code || 500)
        .json(
          new ApiError(
            error.code || 500,
            error.message || "Internal Server Error"
          )
        );
    }
  };
};

export default asyncHandler;

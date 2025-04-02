import { is_request_empty } from "../util/middleware.js"



export const create_profile_middleware = async (req, res, next) => {
    try {
        if (is_request_empty(req, res)) throw new custom_error("Cannot Pass Empty Request","02")

        

        const {name, bio, genre } = req.body
       
        if (!name) throw new custom_error("name required", "02")
        if (!bio) throw new custom_error("bio required", "02")
        if (!genre) throw new custom_error("genre required", "02")

        if(!req.files || !req.files.image)  throw new custom_error("file - image required","02");
       
        next();
    }
    catch (err) {
        return res.status(400).json({
            code: 400,
            status: "failed",
            response_code: err.code,
            message: err.message,
            error: "An Error Occured!",
        });
    };
}


export const update_profile_middleware = async (req, res, next) => {
    try {
        if (is_request_empty(req, res)) throw new custom_error("Cannot Pass Empty Request","02")

        const {name, bio, genre } = req.body

        // if (!name) throw new custom_error("name required", "02")
        // if (!bio) throw new custom_error("bio required", "02")
        // if (!genre) throw new custom_error("genre required", "02")

        // if(req.files.image)  throw new custom_error("file - image required","02");

        // Define allowed fields
        const allowed_keys = ["name", "bio", "genre"];
        
        // Remove unwanted keys & convert all values to lowercase
        req.body = Object.keys(req.body)
            .filter((key) => allowed_keys.includes(key))
            .reduce((acc, key) => {
                acc[key] = typeof req.body[key] === "string" ? req.body[key].toLowerCase() : req.body[key];
                return acc;
            }, {});
  
       
        next();
    }
    catch (err) {
        return res.status(400).json({
            code: 400,
            status: "failed",
            response_code: err.code,
            message: err.message,
            error: "An Error Occured!",
        });
    };
}

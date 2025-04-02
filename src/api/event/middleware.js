import { is_request_empty } from "../util/middleware.js"



export const create_event_middleware = async (req, res, next) => {
    try {
        if (is_request_empty(req, res)) throw new custom_error("Cannot Pass Empty Request","02")

        

        const {name, date, location,price } = req.body
       
        if (!name) throw new custom_error("name required", "02")
        if (!date) throw new custom_error("date required", "02")
        if (!location) throw new custom_error("location required", "02")
        if (!price) throw new custom_error("price required", "02")

        //validate date
        if(!moment(date, moment.ISO_8601, true).isValid())  throw new custom_error("Invalid date format. Use Datetime format.", "04");
        if (new Date(date) < new Date()) throw new custom_error("Choose a future date", "04")

        //validate price
        if (Number(price) < 0.1 || isNaN(Number(price))) throw new custom_error(`Invalid price`, "02");

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


export const update_event_middleware = async (req, res, next) => {
    try {
        if (is_request_empty(req, res)) throw new custom_error("Cannot Pass Empty Request","02")

          if(!req.query.event_id || req.query.event_id == undefined)  throw new custom_error("event_id required", "02")
            
         // Define allowed fields
         const allowed_keys = ["name", "date", "location","price"];
        
         // Remove unwanted keys & convert all values to lowercase
         req.body = Object.keys(req.body)
             .filter((key) => allowed_keys.includes(key))
             .reduce((acc, key) => {
                 acc[key] = typeof req.body[key] === "string" ? req.body[key] : req.body[key];
                 return acc;
             }, {});
    

        if("date" in req.body){    
        //validate date
        let date = req.body.date 
        if(!moment(date, moment.ISO_8601, true).isValid())  throw new custom_error("Invalid date format. Use Datetime format.", "04");
        if (new Date(date) < new Date()) throw new custom_error("Choose a future date", "04")
        }

        if("price" in req.body){
        //validate price
        let price = req.body.price
        if (Number(price) < 0.1 || isNaN(Number(price))) throw new custom_error(`Invalid price`, "02");
        req.body.price = Number(price)
        }

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
import { view_event_by_id } from "../event/crud.js"
import { is_request_empty } from "../util/middleware.js"

export const create_booking_middleware = async (req, res, next) => {
    try {
        if (is_request_empty(req, res)) throw new custom_error("Cannot Pass Empty Request","02")

        
        const {event_id } = req.body
        if (!event_id) throw new custom_error("event_id required", "02")


        let event = await view_event_by_id(event_id)
        if(!event) throw new custom_error("Event not found", "09")
        

        //validate date
        if (new Date(event.date) < new Date()) throw new custom_error("Event has already passed", "04")

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
import { is_token_valid } from "../auth/util.js";
import { get_user_by_user_id } from "../user/crud.js";
import { clean_user_object } from "../user/util.js";
import { create_user_booking, view_all_booking, view_booking_by_id, view_booking_by_user_id } from "./crud.js";

export const create_booking = async (req, res) => {
    try {
  
    const {event_id,status } = req.body

    let token = req.headers.authorization;
    token = token.split(" ")[1];
    let token_data = await is_token_valid(token)
    if (!token_data) throw new custom_error(`Access denied`,"16")

    let user = await get_user_by_user_id(token_data.id)
    if (!user)throw new custom_error("Account not found", "10")


   

    let booking = await create_user_booking(token_data.id,event_id)
    if(!booking) throw new custom_error("Unable to create event","09")

    booking = await view_booking_by_id(booking.id)

    booking.user = clean_user_object(booking.user)
    

    return res.status(200).json({
    code: 200,
    response_code: "00",
    status: "success",
    message: `Booking created successfully`,
    data: {
        booking
    },
    });
  
    } catch (err) {
      return res.status(400).json({
        code: 400,
        response_code: err.code,
        status: "failed",
        message: err.message,
        error: "An Error Occured!",
      });
    } finally {
  
    }
  }

  export const view_user_bookings = async (req, res) => {
    try {
  

    let token = req.headers.authorization;
    token = token.split(" ")[1];
    let token_data = await is_token_valid(token)
    if (!token_data) throw new custom_error(`Access denied`,"16")

    let user = await get_user_by_user_id(token_data.id)
    if (!user)throw new custom_error("Account not found", "10")


   let bookings = await view_booking_by_user_id(token_data.id)
    

    return res.status(200).json({
    code: 200,
    response_code: "00",
    status: "success",
    message: `Booking created successfully`,
    data: {
        bookings
    },
    });
  
    } catch (err) {
      return res.status(400).json({
        code: 400,
        response_code: err.code,
        status: "failed",
        message: err.message,
        error: "An Error Occured!",
      });
    } finally {
  
    }
  }
  

  export const view_all_user_bookings = async (req, res) => {
    try {
  

    let token = req.headers.authorization;
    token = token.split(" ")[1];
    let token_data = await is_token_valid(token)
    if (!token_data) throw new custom_error(`Access denied`,"16")

    let user = await get_user_by_user_id(token_data.id)
    if (!user)throw new custom_error("Account not found", "10")

    if(user.role != 'admin' ) throw new custom_error("Not authorized to perform this action","09")


   let bookings = await view_all_booking()
    

    return res.status(200).json({
    code: 200,
    response_code: "00",
    status: "success",
    message: `Booking fetched successfully`,
    data: {
        bookings
    },
    });
  
    } catch (err) {
      return res.status(400).json({
        code: 400,
        response_code: err.code,
        status: "failed",
        message: err.message,
        error: "An Error Occured!",
      });
    } finally {
  
    }
  }
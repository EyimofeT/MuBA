import crypto from "crypto";
import { PrismaClient } from "@prisma/client";
import { getenv } from "../../core/read_env.js";
import { is_token_valid } from "../auth/util.js";
import { get_user_by_user_id } from "../user/crud.js";
import { create_user_event, update_event_by_id, view_event_by_id, view_events_all, view_events_all_personal } from "./crud.js";
import { get_user_artist_profile } from "../artist/crud.js";

const prisma = new PrismaClient({
    datasources: {
      db: {
        url: getenv("DATABASE_URL"),
      },
    },
  });

export const create_event = async (req, res) => {
    try {
  
    const {name, date, location,price } = req.body

    let token = req.headers.authorization;
    token = token.split(" ")[1];
    let token_data = await is_token_valid(token)
    if (!token_data) throw new custom_error(`Access denied`,"16")

    let user = await get_user_by_user_id(token_data.id)
    if (!user)throw new custom_error("Account not found", "10")

    if(!await get_user_artist_profile(token_data.id)) throw new custom_error("Only an artist profile user can create an event","09")

   



    let event = await create_user_event(token_data.id,name,date, location,price)
    if(!event) throw new custom_error("Unable to create event","09")

      
  
    return res.status(200).json({
    code: 200,
    response_code: "00",
    status: "success",
    message: `Event created successfully`,
    data: {
      event
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

    
  export const view_all_event = async (req, res) => {
    try {
  
    let token = req.headers.authorization;
    token = token.split(" ")[1];
    let token_data = await is_token_valid(token)
    if (!token_data) throw new custom_error(`Access denied`,"16")

    let user = await get_user_by_user_id(token_data.id)
    if (!user)throw new custom_error("Account not found", "10")

    let events = await view_events_all()

    return res.status(200).json({
    code: 200,
    response_code: "00",
    status: "success",
    message: `Event fetched successfully`,
    data: {
        events
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

  
  export const view_artist_personal_event = async (req, res) => {
    try {
  
    let token = req.headers.authorization;
    token = token.split(" ")[1];
    let token_data = await is_token_valid(token)
    if (!token_data) throw new custom_error(`Access denied`,"16")

    let user = await get_user_by_user_id(token_data.id)
    if (!user)throw new custom_error("Account not found", "10")


    if(!await get_user_artist_profile(token_data.id)) throw new custom_error("Only an artist profile user can access this","09")
    
    let events = await view_events_all_personal(token_data.id)

    return res.status(200).json({
    code: 200,
    response_code: "00",
    status: "success",
    message: `Event personal fetched successfully`,
    data: {
        events
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

  
  export const update_event = async (req, res) => {
    try {
  
    let token = req.headers.authorization;
    token = token.split(" ")[1];
    let token_data = await is_token_valid(token)
    if (!token_data) throw new custom_error(`Access denied`,"16")


    let user = await get_user_by_user_id(token_data.id)
    if (!user)throw new custom_error("Account not found", "10")

    if(!await get_user_artist_profile(token_data.id)) throw new custom_error("Only an artist profile user can access this","09")

    let event_id = req.query.event_id
    let event = await view_event_by_id(event_id)

    if(user.role != 'admin' && event.artist.user_id != token_data.id ) throw new custom_error("Not authorized to perform this action","09")

    event = await update_event_by_id(event_id,{...req.body})
    if(!event) throw new custom_error("Something went wrong", "09")


    return res.status(200).json({
    code: 200,
    response_code: "00",
    status: "success",
    message: `Event updated successfully`,
    data: {
        event,
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
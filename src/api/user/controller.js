import { getenv } from "../../core/read_env.js";
import { is_token_valid } from "../auth/util.js";
import { get_all_user, get_user_by_user_id } from "./crud.js";
import { clean_user_object } from "./util.js";

  export const view_user = async (req, res) => {
    try {
  
    let token = req.headers.authorization;
    token = token.split(" ")[1];
    let token_data = await is_token_valid(token)
    if (!token_data) throw new custom_error(`Access denied`,"16")


    let user = await get_user_by_user_id(token_data.id)
    if (!user)throw new custom_error("Account not found", "10")

    // if(!await get_user_artist_profile(token_data.id)) throw new custom_error("Only an artist profile user can access this","09")

    // let event_id = req.query.event_id
    // let event = await view_event_by_id(event_id)

    // if(user.role != 'admin' && event.artist.user_id != token_data.id ) throw new custom_error("Not authorized to perform this action","09")

    // event = await update_event_by_id(event_id,{...req.body})
    // if(!event) throw new custom_error("Something went wrong", "09")

    user = clean_user_object(user)

    return res.status(200).json({
    code: 200,
    response_code: "00",
    status: "success",
    message: `User fetched successfully`,
    data: {
        user,
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

  export const view_all_user = async (req, res) => {
    try {
  
    let token = req.headers.authorization;
    token = token.split(" ")[1];
    let token_data = await is_token_valid(token)
    if (!token_data) throw new custom_error(`Access denied`,"16")


    let user = await get_user_by_user_id(token_data.id)
    if (!user)throw new custom_error("Account not found", "10")

    let users = await get_all_user()

    if(users.length > 1) for(user of users) user = clean_user_object(user)
    
    


    return res.status(200).json({
    code: 200,
    response_code: "00",
    status: "success",
    message: `User fetched successfully`,
    data: {
        users,
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
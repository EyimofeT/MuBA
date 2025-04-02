import crypto from "crypto";
import { PrismaClient } from "@prisma/client";
import { getenv } from "../../core/read_env.js";
import { is_token_valid } from "../auth/util.js";
import { get_user_by_user_id } from "../user/crud.js";
import { create_user_artist_profile, get_user_artist_profile, update_user_artist_profile } from "./crud.js";
import Google from "../../api_services/Google/Google.js";
const prisma = new PrismaClient({
    datasources: {
      db: {
        url: getenv("DATABASE_URL"),
      },
    },
  });


  export const create_profile = async (req, res) => {
    try {
  
    const {name, bio, genre } = req.body

    let token = req.headers.authorization;
    token = token.split(" ")[1];
    let token_data = await is_token_valid(token)
    if (!token_data) throw new custom_error(`Access denied`,"16")

    let user = await get_user_by_user_id(token_data.id)
    if (!user)throw new custom_error("Account not found", "10")

    if(await get_user_artist_profile(token_data.id)) throw new custom_error("User already has an artist profile","09")

   
    let photo_upload = await new Google().upload_photo(req.files.image[0],`${token_data.id} - artist photo `)
    if(!photo_upload || photo_upload.error) throw new custom_error("Something went wrong","09")
    photo_upload = photo_upload.link


    let artist_profile = await create_user_artist_profile(token_data.id, name, genre,bio,photo_upload)
    if(!artist_profile) throw new custom_error("Unable to create artist profile","09")

      
  
    return res.status(200).json({
    code: 200,
    response_code: "00",
    status: "success",
    message: `Artist profile created successfully`,
    data: {
      artist_profile
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

  
  export const view_profile = async (req, res) => {
    try {
  

    let token = req.headers.authorization;
    token = token.split(" ")[1];
    let token_data = await is_token_valid(token)
    if (!token_data) throw new custom_error(`Access denied`,"16")

    let user = await get_user_by_user_id(token_data.id)
    if (!user)throw new custom_error("Account not found", "10")

    let artist_profile = await get_user_artist_profile(token_data.id)

  
    return res.status(200).json({
    code: 200,
    response_code: "00",
    status: "success",
    message: `Artist profile fetched successfully`,
    data: {
      artist_profile
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

  export const update_profile = async (req, res) => {
    try {
  
    let token = req.headers.authorization;
    token = token.split(" ")[1];
    let token_data = await is_token_valid(token)
    if (!token_data) throw new custom_error(`Access denied`,"16")

    let user = await get_user_by_user_id(token_data.id)
    if (!user)throw new custom_error("Account not found", "10")

    if(!await get_user_artist_profile(token_data.id)) throw new custom_error("You do not have an artist profile","09")

    let where_data = {
      user_id :  token_data.id
    }
    let update_data = {
 
      name : req.body.name? req.body.name.toLowerCase() : undefined ,
      bio : req.body.bio? req.body.bio.toLowerCase() : undefined ,
      genre : req.body.genre? req.body.genre.toLowerCase() : undefined

    }
    
    if(req.files.image){
      let photo_upload = await new Google().upload_photo(req.files.image[0],`${token_data.id} - artist photo `)
      if(!photo_upload || photo_upload.error) throw new custom_error("Something went wrong","09")
        update_data.image_url = photo_upload.link
    }

    let artist_profile = await update_user_artist_profile(where_data, update_data)
    if(!artist_profile) throw new custom_error("Unable to update profile","09")

  
    return res.status(200).json({
    code: 200,
    response_code: "00",
    status: "success",
    message: `Artist profile updated successfully`,
    data: {
      artist_profile
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
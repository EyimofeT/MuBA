import { PrismaClient } from "@prisma/client";
import { getenv } from "../../core/read_env.js";
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: getenv("DATABASE_URL"),
    },
  },
});
const transaction_timeout = 200000

let booking_obj= {
    id:true,
    user_id:true,
    event_id:true,
    status:true,
    created_at:true,
    user:true,
    event:{
        include :{
            artist:true
        }
    }
}

export async function create_user_booking(user_id, event_id) {
  try {
    let booking = await prisma.booking.create({
      data: {
        user_id,
        event_id,
      }
    })

    if (!booking) return false

    return booking
  }
  catch (err) {
    console.log("Something went wrong in create_user_booking : " + err)
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

export async function view_booking_by_id(id){
    try {
        let booking = await prisma.booking.findFirst({
          where:{
            id
          },
          select : booking_obj
        })
    
        if (!booking) return false
    
        return booking
      }
      catch (err) {
        console.log("Something went wrong in view_booking_by_id : " + err)
        return false;
      } finally {
        await prisma.$disconnect();
      }
}

export async function view_booking_by_user_id(user_id){
    try {
        let booking = await prisma.booking.findMany({
          where:{
            user_id
          },
          select : booking_obj
        })
    
        if (!booking) return false
    
        return booking
      }
      catch (err) {
        console.log("Something went wrong in view_booking_by_user_id : " + err)
        return false;
      } finally {
        await prisma.$disconnect();
      }
}

export async function view_all_booking(){
    try {
        let booking = await prisma.booking.findMany({
          select : booking_obj
        })
    
        if (!booking) return false
    
        return booking
      }
      catch (err) {
        console.log("Something went wrong in view_all_booking : " + err)
        return false;
      } finally {
        await prisma.$disconnect();
      }
}


export async function delete_booking_by_id(id){
    try {
        let booking = await prisma.booking.delete({
          where:{
            id
          }
        })
    
        if (!booking) return false
    
        return booking
      }
      catch (err) {
        console.log("Something went wrong in delete_booking_by_id : " + err)
        return false;
      } finally {
        await prisma.$disconnect();
      }
}
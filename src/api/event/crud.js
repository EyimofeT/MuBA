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

let event_obj = {
    id:true,
    name:true,
    date:true,
    location:true,
    price:true,
    currency:true,
    artist:true,
    bookings:true
}

export async function create_user_event(user_id, name, date, location, price) {
  try {
    let event = await prisma.event.create({
      data: {
        name: name.toLowerCase(),
        price : Number(price),
        location : location.toLowerCase(),
        date,
        artist_id : user_id,
      }
    })

    if (!event) return false

    return event
  }
  catch (err) {
    console.log("Something went wrong in create_user_event : " + err)
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

export async function view_events_all() {
    try {
      let event = await prisma.event.findMany({
        select: event_obj
      })
  
      if (!event) return false
  
      return event
    }
    catch (err) {
      console.log("Something went wrong in view_all_event : " + err)
      return false;
    } finally {
      await prisma.$disconnect();
    }
  }
  

export async function view_events_all_personal(user_id) {
    try {
      let event = await prisma.event.findMany({
        where:{
            artist_id : user_id
        },
        select: event_obj
      })
  
      if (!event) return false
  
      return event
    }
    catch (err) {
      console.log("Something went wrong in view_events_all_personal : " + err)
      return false;
    } finally {
      await prisma.$disconnect();
    }
  }

export async function view_event_by_id(id){
    try {
        let event = await prisma.event.findFirst({
          where:{
              id
          },
          select: event_obj
        })
    
        if (!event) return false
    
        return event
      }
      catch (err) {
        console.log("Something went wrong in view_event_by_id : " + err)
        return false;
      } finally {
        await prisma.$disconnect();
      }
}
export async function update_event_by_id(id, data){
    try {
        let event = await prisma.event.update({
          where:{
              id
          },
          data
        })
    
        if (!event) return false
    
        return event
      }
      catch (err) {
        console.log("Something went wrong in update_event_by_id : " + err)
        return false;
      } finally {
        await prisma.$disconnect();
      }
}
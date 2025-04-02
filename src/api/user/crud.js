import { PrismaClient } from "@prisma/client";
import { getenv } from "../../core/read_env.js";
import { hash_string } from "../auth/util.js";
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: getenv("DATABASE_URL"),
    },
  },
});
const transaction_timeout = 200000

let user_obj = {
    id: true,
    email: true,
    name:true,
    password : true,
    role: true,
    created_at : true
}

export async function get_user_by_email(email) {
    try{
     let user = await prisma.user.findFirst({
       where:{
        email : email.toLowerCase()
       },
       select:user_obj
      })
      if(!user) return false
      
      return user
   } catch (err) {
    console.log("Something went wrong : " + err)
     return false;
   } finally {
     await prisma.$disconnect();
   }
  }

export async function create_user(user_id, name, email, password, role){
    try{
        let user = await prisma.user.create({
          data:{
            id : user_id,
            name: name.toLowerCase(),
            email: email.toLowerCase(),
            password : await hash_string(password),
            role : role? role : 'user'
          }
         })
         if(!user) return false
         
         return user
      } catch (err) {
       console.log("Something went wrong in create_user : " + err)
        return false;
      } finally {
        await prisma.$disconnect();
      }
}

export async function get_user_by_user_id(id) {
  try{
   let user = await prisma.user.findFirst({
     where:{
      id
     },
     select:user_obj
    })
    if(!user) return false
    
    return user
 } catch (err) {
  console.log("Something went wrong in get_user_by_user_id: " + err)
   return false;
 } finally {
   await prisma.$disconnect();
 }
}


export async function get_all_user() {
  try{
   let user = await prisma.user.findMany({
     select:user_obj
    })
    if(!user) return false
    
    return user
 } catch (err) {
  console.log("Something went wrong in get_all_user: " + err)
   return false;
 } finally {
   await prisma.$disconnect();
 }
}


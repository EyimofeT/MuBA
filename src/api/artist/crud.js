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

let artist_obj = {
  id: true,
  name: true,
  bio: true,
  genre: true,
  image_url: true,
  user_id: true,
}

export async function get_user_artist_profile(user_id) {
  try {
    let artist = await prisma.artist.findFirst({
      where: {
        user_id
      },
      select: artist_obj
    })
    if (!artist) return false

    return artist
  } catch (err) {
    console.log("Something went wrong in get_user_artist_profile : " + err)
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

export async function create_user_artist_profile(user_id, name, genre, bio, image_url) {
  try {
    let artist = await prisma.artist.create({
      data: {
        name: name.toLowerCase(),
        bio: bio.toLowerCase(),
        genre: genre.toLowerCase(),
        image_url,
        user_id,
      }
    })

    if (!artist) return false

    return artist
  }
  catch (err) {
    console.log("Something went wrong in get_user_artist_profile : " + err)
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

export async function update_user_artist_profile(where,data) {
  try {
    let artist = await prisma.artist.update({
      where,
      data
    })

    if (!artist) return false

    return artist
  }
  catch (err) {
    console.log("Something went wrong in update_user_artist_profile : " + err)
    return false;
  } finally {
    await prisma.$disconnect();
  }
}
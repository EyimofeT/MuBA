-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_artist_id_fkey";

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "Artist"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

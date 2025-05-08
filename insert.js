// insert.js
import mongoose from "mongoose";
import Pin from "./models/pin.model.js"; // make sure file has .js extension if using ES Modules

const imageUrls = [
  "https://ik.imagekit.io/dd8c8qmvfd/pins/pin1.jpeg",
  "https://ik.imagekit.io/dd8c8qmvfd/pins/pin2.jpeg",
  "https://ik.imagekit.io/dd8c8qmvfd/pins/pin3.jpeg"
];

const someUserId = "67fe70cec4795adff7689c3e"; // Replace with valid user _id

async function insertPinsFromImages() {
  try {
    await mongoose.connect(process.env.MONGO);

    const pins = imageUrls.map((url, index) => ({
      title: `Auto Pin ${index + 1}`,
      description: "Imported from ImageKit",
      media: url,
      creator: someUserId,
    }));

    const insertedPins = await Pin.insertMany(pins);
    console.log("✅ Inserted Pins:", insertedPins);
  } catch (err) {
    console.error("❌ Error inserting pins:", err);
  } finally {
    mongoose.connection.close();
  }
}

insertPinsFromImages();

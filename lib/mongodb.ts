import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI এনভায়রনমেন্ট ফাইলে পাওয়া যায়নি!");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // uri ভ্যারিয়েবলটি নিশ্চিতভাবে string
    const uri: string = MONGODB_URI;

    cached.promise = mongoose.connect(uri).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
import mongoose, { Schema, model, models } from "mongoose";

export interface IMobile {
  _id?: string;
  brand: string;
  model: string;
  variant: string;
  stock: number;
  sold: number;
  price: number;
  imageUrl?: string;
}

const MobileSchema = new Schema<IMobile>(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    variant: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    sold: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
    imageUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Mobile = models.Mobile || model<IMobile>("Mobile", MobileSchema);
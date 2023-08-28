import mongoose from "mongoose";
import { Item } from "../item.interface";

const { Schema } = mongoose;

const itemSchema = new Schema<Item>({
  id: {type: Number, required: true},
  name: {type: String, required: true},
  price: {type: Number, required: true},
  description: {type: String, required: true},
  image: {type: String, required: true}
});

export default mongoose.model('Item', itemSchema);
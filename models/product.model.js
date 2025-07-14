import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  description: String,
  category:  { type: String, required: true },
  price:     { type: Number, required: true },
  stock:     { type: Number, default: 0 }
});

productSchema.plugin(mongoosePaginate);

export default mongoose.model('Product', productSchema);

import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: [0, 'Price cannot be negative'],
    },
    image: {
      type: String,
      required: [true, 'Please add an image URL'],
    },
    category: {
      type: [String],
      required: [true, 'Please add at least one category'],
      enum: ['cakes', 'muffins', 'pastries', 'cupcakes', 'cookies', 'breads', 'featured'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    ingredients: {
      type: [String],
    },
    nutrition: {
      calories: Number,
      fat: Number,
      carbs: Number,
      protein: Number,
    },
    countInStock: {
      type: Number,
      required: [true, 'Please add count in stock'],
      default: 0,
      min: [0, 'Count in stock cannot be negative'],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
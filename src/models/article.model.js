import { Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const articleSchema = new Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    featuredImage: {
      type: String,
      required: [true, "Featured image is required"],
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true }
);

articleSchema.index({ title: "text", content: "text", status: "text" });
articleSchema.plugin(mongooseAggregatePaginate);

export const Article = model("Article", articleSchema);

const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  profilePhoto: {
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true },
  },
  created: { type: Date, default: Date.now, required: true },
});
userSchema.set("toJSON", { gettes: true });
userSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };

  delete obj.__v;
  return obj;
};
module.exports = mongoose.models.User || mongoose.model("User", userSchema);

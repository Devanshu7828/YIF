const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },

    pic: {
      type: String,
    },
    tokens: {
      type:String,
    }
  },
  { timestamps: true }
);

// HASH PASSWORD BEFORE SAVING INTO DB
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// COMPARING PASSWORD
UserSchema.methods.validPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    console.log(err);
  }
};

module.exports = User = mongoose.model("User", UserSchema);

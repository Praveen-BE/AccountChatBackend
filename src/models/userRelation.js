import mongoose from "mongoose";

const userRelationshipSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "enithiusers",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "enithiusers",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["accepted", "blocked", "interested", "ignored"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

userRelationshipSchema.pre("save", function (next) {
  const relationRequest = this;
  if (relationRequest.fromUserId.equals(relationRequest.toUserId)) {
    throw new Error("Cannot send connection request to Yourself...");
  }
  next();
});

userRelationshipSchema.index({ fromUserId: 1, toUserId: 1 });

const relationShipRequest = new mongoose.model(
  "enithiuserrelationship",
  userRelationshipSchema
);

export default relationShipRequest;

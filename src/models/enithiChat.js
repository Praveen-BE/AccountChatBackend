import mongoose from "mongoose";

// const cellDataSchema = new mongoose.Schema(
//   {
//     value: {
//       type: mongoose.Schema.Types.Mixed,
//       default: null,
//     },
//   },
//   {
//     _id: false,
//   }
// );

// const tableRowSchema = new mongoose.Schema(
//   {
//     rowId: {
//       type: String,
//       // required: true,
//       unique: false,
//     },
//     cells: {
//       type: Map,
//       of: cellDataSchema,
//     },
//   },
//   {
//     _id: false,
//   }
// );

// const tableColumnSchema = new mongoose.Schema(
//   {
//     colId: {
//       type: String,
//       // required: true,
//       unique: false,
//     },
//     header: {
//       type: String,
//       // required: true,
//       trim: true,
//     },
//     width: {
//       type: Number,
//       default: 100,
//     },
//     type: {
//       type: String,
//       enum: ["text", "number", "boolean", "date"],
//       default: "text",
//     },
//   },
//   {
//     _id: false,
//   }
// );

// const tableSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       // required: true,
//       // unique: true,
//       trim: true,
//     },
//     description: String,
//     columns: [tableColumnSchema],
//     rows: [tableRowSchema],
//     ownerId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "",
//     },
//     lastModifiedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "enithiusers",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "enithiusers",
      required: true,
    },
    text: {
      type: String,
    },
    messageType: {
      type: String,
      enum: ["text", "image", "file", "system", "table"],
      required: true,
      default: "text",
    },
    imageUrl: {
      type: String,
    },
    fileName: {
      type: String,
    },
    fileUrl: {
      type: String,
    },
    systemMessageType: {
      type: String,
    },

    table: [],
  },
  { timestamps: true }
);

const chatSchema = new mongoose.Schema({
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "enithiusers", require: true },
  ],
  messages: [messageSchema],
});

const Chat = mongoose.model("enithichat", chatSchema);

export default Chat;

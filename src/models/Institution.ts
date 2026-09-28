import mongoose, { Schema, Document, Model } from "mongoose";
import { IInstitution } from "@/types";

export interface IInstitutionDocument extends Document, Omit<IInstitution, "_id"> {}

const ClassGroupSchema = new Schema(
  {
    groupId: { type: String, required: true },
    groupName: { type: String, required: true, trim: true },
    classLevel: {
      type: String,
      enum: ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"],
      required: true,
    },
    facultyUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    studentUserIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const InstitutionSchema = new Schema<IInstitutionDocument>(
  {
    name: { type: String, required: true, unique: true, trim: true, index: true },
    code: { type: String, required: true, uppercase: true, trim: true, index: true },
    district: { type: String, trim: true, default: "" },
    address: { type: String, trim: true, default: "" },
    contactPerson: { type: String, trim: true, default: "" },
    contactPhone: { type: String, trim: true, default: "" },
    contactEmail: { type: String, trim: true, default: "" },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
      index: true,
    },
    classesOffered: [
      {
        type: String,
        enum: ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"],
      },
    ],
    groups: [ClassGroupSchema],
  },
  {
    timestamps: true,
  }
);

export const Institution: Model<IInstitutionDocument> =
  mongoose.models.Institution ||
  mongoose.model<IInstitutionDocument>("Institution", InstitutionSchema);

export default Institution;

import mongoose, { Schema, models, model } from "mongoose";

export interface IEarlyAccess {
    name: string;
    email: string;
    companyRole?: string;
    architecture?: string;
    painPoint?: string;
    createdAt: Date;
}

const EarlyAccessSchema = new Schema<IEarlyAccess>({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    companyRole: { type: String, trim: true },
    architecture: { type: String, trim: true },
    painPoint: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
});

export const EarlyAccess =
    models.EarlyAccess || model<IEarlyAccess>("EarlyAccess", EarlyAccessSchema);

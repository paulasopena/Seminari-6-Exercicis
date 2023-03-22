import { ObjectId, Schema, model } from "mongoose";

export interface Subject {
    _id: string;
    name: string;
    users?: ObjectId[];
    semester: number;
    difficulty: "easy" | "medium" | "hard";
}

// Import necessary decorators and modules from Mongoose and Nest.js
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Define a schema for the Task class
@Schema({
  // Enable automatic timestamps for createdAt and updatedAt
  timestamps: true,
})
export class Task {
  // Define a property for the task title
  @Prop()
  title: string;

  // Define a property for the task description
  @Prop()
  description: string;

  // Define a property for the task completion status with a default value of false
  @Prop({ default: false })
  completed: boolean;
}

// Create a Mongoose schema from the Task class
export const TaskSchema = SchemaFactory.createForClass(Task);

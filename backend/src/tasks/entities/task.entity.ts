import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';

export type TaskDocument = HydratedDocument<Task>;

@Schema({
  timestamps: true,
})
export class Task {
  @Prop({ unique: true, trim: true, required: true })
  title: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ default: false })
  done: boolean;

  @Prop({ required: true, immutable: true, type: Types.ObjectId, ref: 'User' })
  userEmail: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

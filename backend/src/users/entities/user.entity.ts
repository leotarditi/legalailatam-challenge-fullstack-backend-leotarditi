import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/common/enums/rol.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ default: Role.USER, enum: Role })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);

import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({
    unique: true,
    index: true,
  })
  email: string;

  @Prop({
    unique: true,
    index: true,
  })
  userName: string;

  @Prop()
  password: string;

  @Prop({
    default: true,
  })
  isActive: boolean;

  @Prop({
    default: false,
  })
  isConfirmed: boolean;

  @Prop({
    default: [],
  })
  roles: string[];

  @Prop({
    default: Date.now,
  })
  creationDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

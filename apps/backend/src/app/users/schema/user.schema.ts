import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  mobile_number: string;

  @Prop({ required: true, unique: true })
  username: string;

  // Password reset fields
  @Prop()
  passwordResetToken?: string;

  @Prop()
  passwordResetExpiresAt?: Date;
  
  
  public async comparePassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.comparePassword = async function (
  plainPassword: string,
): Promise<boolean> {
  return bcrypt.compare(plainPassword, this.password);
};

UserSchema.pre<User>('save', async function (next) {
  try {
    if (this.isNew) {
      const existingUser: any = await this.model('User').findOne({
        $or: [
          { email: this.email },
          { username: this.username },
          { mobile_number: this.mobile_number },
        ],
      });
  
      if (existingUser) {
        if (existingUser.email === this.email) {
          throw new Error('Email already exists.');
        }
        if (existingUser.username === this.username) {
          throw new Error('Username already exists.');
        }
        if (existingUser.mobile_number === this.mobile_number) {
          throw new Error('Mobile number already exists.');
        }
      }
    } 

    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }

    next();
  } catch (error) {
    next(error);
  }
});


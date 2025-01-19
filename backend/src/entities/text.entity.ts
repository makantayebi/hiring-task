/** @format */

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CoreEntity } from "./core.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "text" })
export class TextEntity extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "text" })
  text: string;

  @Column("user_id")
  userId: string;

  // Foreign key
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  @Column({
    type: "enum",
    enum: ["Good", "Bad", "Neutral", "Undefined"],
    default: "Undefined",
  })
  sentiment?: string;
}

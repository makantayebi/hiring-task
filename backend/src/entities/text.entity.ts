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
  userId: string; // <----------------- ┒
  //                                    |
  // Foreign key                        |
  @ManyToOne(() => UserEntity) //       | Some pleasing ascii diagram.
  @JoinColumn({ name: "userId" }) // ---┛ If you find this easter egg: chckout my favorite mystery: https://www.youtube.com/watch?v=I2O7blSSzpI
  user: UserEntity;

  @Column({
    type: "enum",
    enum: ["Good", "Bad", "Neutral", "Undefined"],
    default: "Undefined",
  })
  sentiment?: string;
}

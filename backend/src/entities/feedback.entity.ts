/** @format */

import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CoreEntity } from "./core.entity";
import { TextEntity } from "./text.entity";

@Entity({ name: "feedback" })
export class FeedbackEntity extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "content", length: 144 })
  content: string;

  @Column("text_id")
  textId: number;

  // Foreign key
  @OneToOne(() => TextEntity)
  @JoinColumn({ name: "textId" })
  text: TextEntity;
}

import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PermitBlackList {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("text")
  chain: string;

  @Column("text")
  address: string;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class SwapEvent {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn()
  createdAt?: Date;

  @Column("text")
  user: string;

  @Column("text")
  aggregator: string;

  @Column("boolean")
  isError: boolean;

  @Column("text")
  chain: string;

  @Column("text")
  from: string;

  @Column("text")
  to: string;

  @Column("json")
  quote: any;

  @Column("text", { default: null })
  txUrl: string;

  @Column("text", { nullable: true })
  amount: string;

  @Column("float", { nullable: true })
  amountUsd: number;

  @Column("float", { nullable: true })
  reportedOutput: number;

  @Column("float", { nullable: true })
  realOutput: number;

  @Column("json")
  errorData: any;

  @Column("text", { nullable: true })
  slippage: string;

  @Column("text", { nullable: true })
  routePlace: string;

  @Column("json", { nullable: true })
  route: any;
}

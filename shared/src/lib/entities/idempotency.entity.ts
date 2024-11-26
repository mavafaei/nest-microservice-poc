import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Idempotency {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  key!: string;

  @Column({ type: 'json', nullable: true })
  response?: any | null;

  // TODO: Add a timeout column to the Idempotency entity and check in the interceptor if the timeout has expired.
  @Column({ default: 10 })
  timeout!: number;
}
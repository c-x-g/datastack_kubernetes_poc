import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Container_Metadata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  pod_id: string;

  @Column({ nullable: true })
  node: string;

  @Column({ nullable: true })
  namespace: string;

  @Column({ nullable: true })
  ip_address: string;

  @Column({ nullable: true })
  service_account: string;

  @Column({ nullable: true })
  timestamp: Date;
}

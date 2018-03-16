import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Account extends BaseEntity {
    @PrimaryGeneratedColumn() id: number

    @Column({ unique: true })
    email: string

    @Column() password: string
}

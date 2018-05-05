import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'

@Entity()
export class Account extends BaseEntity {
    @PrimaryGeneratedColumn() id: number

    @Column() email: string

    @Column() password: string
}

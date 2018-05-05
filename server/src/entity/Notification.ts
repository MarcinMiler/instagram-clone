import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn
} from 'typeorm'
import { User } from './User'

@Entity()
export class Notification extends BaseEntity {
    @PrimaryGeneratedColumn() id: number

    @Column({ nullable: true })
    userId: number

    @Column({ nullable: true })
    photoId: number

    @Column() sendTo: number

    @Column() message: string

    @OneToOne(() => User)
    @JoinColumn()
    user: User
}

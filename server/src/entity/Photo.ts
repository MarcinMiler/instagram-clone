import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    BaseEntity,
    OneToMany
} from 'typeorm'
import { User } from './User'
import { Like } from './Like'

@Entity()
export class Photo extends BaseEntity {
    @PrimaryGeneratedColumn() id: number

    @Column() url: string

    @Column({ nullable: true })
    userId: number

    @ManyToOne(() => User, user => user.photos)
    user: User

    @OneToMany(() => Like, like => like.photo)
    likes: Like[]
}

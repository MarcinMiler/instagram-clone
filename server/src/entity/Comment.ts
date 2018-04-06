import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    Column,
    OneToOne,
    JoinColumn,
    ManyToOne,
    CreateDateColumn
} from 'typeorm'
import { User } from './User'
import { Photo } from './Photo'

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn() id: number

    @CreateDateColumn() date: Date

    @Column() text: string

    @Column({ nullable: true })
    userId: number

    @Column({ nullable: true })
    photoId: number

    @ManyToOne(() => Photo, photo => photo.comments)
    photo: Photo

    @OneToOne(() => User)
    @JoinColumn()
    user: User
}

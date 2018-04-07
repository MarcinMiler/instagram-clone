import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    Column,
    OneToOne,
    OneToMany,
    JoinColumn,
    ManyToOne,
    CreateDateColumn,
    RelationCount
} from 'typeorm'
import { User } from './User'
import { Photo } from './Photo'
import { Like } from './Like'

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn() id: number

    @CreateDateColumn() date: Date

    @Column() text: string

    @Column({ nullable: true })
    userId: number

    @Column({ nullable: true })
    photoId: number

    @OneToMany(() => Like, like => like.comment)
    likes: Like[]

    @RelationCount((comment: Comment) => comment.likes)
    likesCount: number

    @ManyToOne(() => Photo, photo => photo.comments)
    photo: Photo

    @OneToOne(() => User)
    @JoinColumn()
    user: User
}

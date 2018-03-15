import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    BaseEntity,
    OneToMany,
    CreateDateColumn,
    RelationCount
} from 'typeorm'
import { User } from './User'
import { Like } from './Like'
import { Comment } from './Comment'

@Entity()
export class Photo extends BaseEntity {
    @PrimaryGeneratedColumn() id: number

    @CreateDateColumn() date: Date

    @Column() url: string

    @Column({ nullable: true })
    userId: number

    @ManyToOne(() => User, user => user.photos)
    user: User

    @OneToMany(() => Like, like => like.photo)
    likes: Like[]

    @RelationCount((photo: Photo) => photo.likes)
    likesCount: number

    @OneToMany(() => Comment, comment => comment.photo)
    comments: Comment[]

    @RelationCount((photo: Photo) => photo.comments)
    commentsCount: number
}

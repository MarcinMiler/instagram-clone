import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    OneToMany,
    RelationCount
} from 'typeorm'
import { User } from './User'
import { Comment } from './Comment'
import { Like } from './Like'

@Entity()
export class Photo extends BaseEntity {
    @PrimaryGeneratedColumn() id: number

    @Column() url: string

    @Column({ nullable: true })
    userId: number

    @OneToMany(() => Like, like => like.photo)
    likes: Like[]

    @RelationCount((photo: Photo) => photo.likes)
    likesCount: number

    @OneToMany(() => Comment, comment => comment.photo)
    comments: Comment[]

    @RelationCount((photo: Photo) => photo.comments)
    commentsCount: number

    @ManyToOne(() => User, user => user.photos)
    user: User
}

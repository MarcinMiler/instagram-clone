import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    OneToOne,
    JoinColumn,
    OneToMany,
    RelationCount
} from 'typeorm'
import { Photo } from './Photo'
import { User } from './User'
import { Like } from './Like'

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn() id: number

    @Column() text: string

    @Column({ nullable: true })
    photoId: number

    @Column({ nullable: true })
    userId: number

    @ManyToOne(() => Photo, photo => photo.comments)
    photo: Photo

    @OneToMany(() => Like, like => like.comment)
    likes: Like[]

    @RelationCount((comment: Comment) => comment.likes)
    likesCount: number

    @OneToOne(() => User)
    @JoinColumn()
    user: User
}

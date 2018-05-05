import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    OneToOne,
    JoinColumn
} from 'typeorm'
import { Photo } from './Photo'
import { User } from './User'
import { Comment } from './Comment'

@Entity()
export class Like extends BaseEntity {
    @PrimaryGeneratedColumn() id: number

    @Column({ nullable: true })
    photoId: number

    @Column({ nullable: true })
    userId: number

    @Column({ nullable: true })
    commentId: number

    @ManyToOne(() => Comment, comment => comment.likes)
    comment: Comment

    @ManyToOne(() => Photo, photo => photo.likes)
    photo: Photo

    @OneToOne(() => User)
    @JoinColumn()
    user: User
}

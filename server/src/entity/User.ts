import {
    Entity,
    PrimaryColumn,
    Column,
    OneToMany,
    BaseEntity,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
    RelationCount
} from 'typeorm'
import { Photo } from './Photo'

@Entity()
export class User extends BaseEntity {
    @PrimaryColumn() id: number

    @CreateDateColumn() date: Date

    @Column() email: string

    @Column() fullname: string

    @Column() username: string

    @Column({ nullable: true })
    bio: string

    @OneToMany(() => Photo, photo => photo.user)
    photos: Photo[]

    @ManyToMany(() => User, user => user.following)
    @JoinTable()
    followers: User[]

    @ManyToMany(() => User, user => user.followers)
    following: User[]

    @RelationCount((user: User) => user.photos)
    photosCount: number

    @RelationCount((user: User) => user.followers)
    followersCount: number

    @RelationCount((user: User) => user.following)
    followingCount: number
}

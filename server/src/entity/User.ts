import {
    Entity,
    PrimaryGeneratedColumn,
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
    @PrimaryGeneratedColumn() id: number

    @CreateDateColumn() date: Date

    @Column({ unique: true })
    email: string

    @Column() firstname: string

    @OneToMany(() => Photo, photo => photo.user)
    photos: Photo[]

    @ManyToMany(() => User, user => user.following)
    @JoinTable()
    followers: User[]

    @ManyToMany(() => User, user => user.followers)
    following: User[]

    @RelationCount((user: User) => user.followers)
    followersCount: number

    @RelationCount((user: User) => user.following)
    followingCount: number
}

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    BaseEntity,
    CreateDateColumn
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
}

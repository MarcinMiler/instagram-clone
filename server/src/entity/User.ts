import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    BaseEntity
} from 'typeorm'
import { Photo } from './Photo'

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn() id: number

    @Column({ unique: true })
    email: string

    @Column() firstname: string

    @OneToMany(() => Photo, photo => photo.user)
    photos: Photo[]
}

import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

type Snowflake = number;
type URL = string;

@Entity()
export default class SimpleUser extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: Snowflake;

    @Column()
    username: string;

    @Column()
    avatar?: URL;
}
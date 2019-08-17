import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Generated,
  Index,
} from "typeorm";

@Entity()
export class Link {
  @PrimaryColumn({ select: false })
  @Generated("uuid")
  id: string;

  @Column()
  @Index({ fulltext: true })
  url: string;

  @Column()
  @Index({ fulltext: true })
  tags: string;

  @Column("bigint")
  dateTimeAdded: number;

  @Column()
  @Index({ fulltext: true })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;

  constructor(
    url: string,
    tags: string,
    dateTimeAdded: number,
    title: string,
    description: string,
    image: string,
  ) {
    this.url = url;
    this.tags = tags;
    this.dateTimeAdded = dateTimeAdded;
    this.title = title;
    this.description = description;
    this.image = image;
  }
}

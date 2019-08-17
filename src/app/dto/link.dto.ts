import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LinkDto {
  @ApiModelProperty()
  url: string;

  @ApiModelProperty()
  tags: string;

  @ApiModelProperty()
  dateTimeAdded: number;

  @ApiModelProperty()
  title: string;

  @ApiModelProperty({ required: false })
  description: string;

  @ApiModelProperty({ required: false })
  image: string;

  constructor(url, tags, dateTimeAdded, title, description, image) {
    this.url = url;
    this.tags = tags;
    this.dateTimeAdded = dateTimeAdded;
    this.title = title;
    this.description = description;
    this.image = image;
  }
}

export class SaveLinkDto {
  @IsNotEmpty()
  @ApiModelProperty()
  url: string;

  @IsNotEmpty()
  @ApiModelProperty({ description: "Comma seperated list" })
  tags: string;
}

import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class DeleteDto {
  @IsNotEmpty()
  @ApiModelProperty()
  url: string;
}

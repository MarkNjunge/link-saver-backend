import { ApiModelProperty } from "@nestjs/swagger";

export class ApiResponse {
  constructor(message) {
    this.message = message;
  }

  @ApiModelProperty()
  message: string;
}

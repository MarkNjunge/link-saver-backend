import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Delete,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { LinkDto, SaveLinkDto } from "./dto/link.dto";
import { DeleteDto } from "./dto/delete.dto";
import { AuthGuard } from "../common/guards/auth.guard";
import {
  ApiBadRequestResponse,
  ApiImplicitHeader,
  ApiCreatedResponse,
  ApiOkResponse,
} from "@nestjs/swagger";
import { ApiResponse } from "../common/ApiResponse";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({ type: ApiResponse })
  index(): ApiResponse {
    return this.appService.index();
  }

  @Get("/all")
  @UseGuards(AuthGuard)
  @ApiImplicitHeader({ name: "x-api-key" })
  @ApiOkResponse({ type: LinkDto, isArray: true })
  all(): Promise<LinkDto[]> {
    return this.appService.all();
  }

  @Get("/search")
  @UseGuards(AuthGuard)
  @ApiImplicitHeader({ name: "x-api-key" })
  @ApiOkResponse({ type: LinkDto, isArray: true })
  @ApiBadRequestResponse({ description: "Missing 'query' query param" })
  async search(@Query("query") query: string): Promise<LinkDto[]> {
    if (query === undefined || query === "") {
      throw new HttpException(
        "An 'query' query param is required",
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.appService.search(query);
  }

  @Post("/save")
  @UseGuards(AuthGuard)
  @ApiImplicitHeader({ name: "x-api-key" })
  @ApiCreatedResponse({ description: "The link was saved", type: LinkDto })
  @ApiBadRequestResponse({ description: "Invalid Body" })
  async save(@Body() dto: SaveLinkDto): Promise<LinkDto> {
    return this.appService.save(dto);
  }

  @Delete("/delete")
  @UseGuards(AuthGuard)
  @ApiImplicitHeader({ name: "x-api-key" })
  @ApiOkResponse({ type: ApiResponse })
  @ApiBadRequestResponse({ description: "Invalid Body" })
  async delete(@Body() dto: DeleteDto): Promise<ApiResponse> {
    return this.appService.delete(dto);
  }
}

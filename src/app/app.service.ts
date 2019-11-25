import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like } from "typeorm";
import { LinkDto, SaveLinkDto } from "./dto/link.dto";
import { DeleteDto } from "./dto/delete.dto";
import { CustomLogger } from "../common/CustomLogger";
import { ApiResponse } from "../common/ApiResponse";
import { parse } from "../common/meta.parser";
import { Link } from "../db/entities/link.entity";

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
  ) {}
  logger: CustomLogger = new CustomLogger("AppService");

  /**
   * Root route for the api.
   */
  index(): ApiResponse {
    const ver = process.env.npm_package_version;
    return new ApiResponse(`link-saver v${ver}`);
  }

  /**
   * Get all saved links
   */
  async all(limit: number, page: number): Promise<LinkDto[]> {
    const links = await this.linkRepository.find({
      take: limit,
      skip: (page - 1) * limit,
      order: { dateTimeAdded: "DESC" },
    });

    return links.map(
      v =>
        new LinkDto(
          v.url,
          v.tags,
          v.dateTimeAdded,
          v.title,
          v.description,
          v.image,
        ),
    );
  }

  /**
   * Search for a link based on its title or tags.
   * @param query title or tag
   */
  async search(query: string, limit: number, page: number): Promise<LinkDto[]> {
    // ILIKE not supported. See https://github.com/typeorm/typeorm/issues/4418
    const links = await this.linkRepository.find({
      where: `url ilike '%${query}%' or tags ilike '%${query}%' or title ilike '%${query}%'`,
      take: limit,
      skip: (page - 1) * limit,
      order: { dateTimeAdded: "DESC" },
    });

    return links.map(
      v =>
        new LinkDto(
          v.url,
          v.tags,
          v.dateTimeAdded,
          v.title,
          v.description,
          v.image,
        ),
    );
  }

  /**
   * Save a link.
   * The method makes a request to the url to determine if it's active, and retrieve it's SEO
   * title, description and image
   * @param saveLinkDto Link url and tags
   */
  async save(dto: SaveLinkDto): Promise<LinkDto> {
    const detail = await parse(dto.url);

    const link = new Link(
      dto.url,
      dto.tags.toLowerCase(),
      Date.now(),
      detail.title,
      detail.description,
      detail.image,
    );
    await this.linkRepository.save(link);

    return link;
  }

  /**
   * Update a link's tags.
   * @param saveLinkDto Link url and tags
   */
  async update(dto: SaveLinkDto): Promise<ApiResponse> {
    const res = await this.linkRepository.update(
      { url: dto.url },
      { tags: dto.tags },
    );

    return new ApiResponse("Tags updated");
  }

  /**
   * Delete a link based on the url.
   * @param url Link url
   */
  async delete(dto: DeleteDto): Promise<ApiResponse> {
    await this.linkRepository.delete({ url: dto.url });
    return new ApiResponse("Deleted " + dto.url);
  }
}

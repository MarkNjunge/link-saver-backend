import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LinkDto, SaveLinkDto } from "./dto/link.dto";
import { Link } from "../db/entities/link.entity";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ApiResponse } from "../common/ApiResponse";
import { DeleteDto } from "./dto/delete.dto";

describe("AppController", () => {
  let appController: AppController;
  let appService: AppService;
  let repo: Repository<Link>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: getRepositoryToken(Link),
          useClass: Repository,
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
    repo = module.get<Repository<Link>>(getRepositoryToken(Link));
  });

  describe("/all", () => {
    it("it should return all links", async () => {
      const result = [new LinkDto("", "", 0, "", "", "")];

      jest
        .spyOn(appService, "all")
        .mockImplementation(() => Promise.resolve(result));

      expect(await appController.all()).toEqual(result);
    });
  });

  describe("/search", () => {
    it("it should return matching links", async () => {
      const result = [new LinkDto("", "", 0, "", "", "")];

      jest
        .spyOn(appService, "search")
        .mockImplementation(() => Promise.resolve(result));

      expect(await appController.search("query")).toEqual(result);
    });

    it("it should fail on missing query", async () => {
      const result = [new LinkDto("", "", 0, "", "", "")];

      jest
        .spyOn(appService, "search")
        .mockImplementation(() => Promise.resolve(result));

      let threwError = false;
      try {
        await appController.search(undefined);
      } catch (e) {
        threwError = true;
      } finally {
        expect(threwError).toBe(true);
      }
    });

    it("it should fail on empty query", async () => {
      const result = [new LinkDto("", "", 0, "", "", "")];

      jest
        .spyOn(appService, "search")
        .mockImplementation(() => Promise.resolve(result));

      let threwError = false;
      try {
        await appController.search("");
      } catch (e) {
        threwError = true;
      } finally {
        expect(threwError).toBe(true);
      }
    });
  });

  describe("/save", () => {
    it("it should save", async () => {
      const result = new LinkDto("", "", 0, "", "", "");

      jest
        .spyOn(appService, "save")
        .mockImplementation(() => Promise.resolve(result));

      expect(await appController.save(new SaveLinkDto())).toEqual(result);
    });
  });

  describe("/update", () => {
    it("it should update", async () => {
      const result = new ApiResponse("");

      jest
        .spyOn(appService, "update")
        .mockImplementation(() => Promise.resolve(result));

      expect(await appController.update(new SaveLinkDto())).toEqual(result);
    });
  });

  describe("/delete", () => {
    it("it should delete", async () => {
      const result = new ApiResponse("OK");

      jest
        .spyOn(appService, "delete")
        .mockImplementation(() => Promise.resolve(result));

      expect(await appController.delete(new DeleteDto())).toEqual(result);
    });
  });
});

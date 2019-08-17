import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app/app.controller";
import { AppService } from "./app/app.service";
import { config } from "./common/Config";
import { Link } from "./db/entities/link.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      url: config.dbUrl,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
      extra: {
        ssl: config.dbSSL === "true",
      },
    }),
    TypeOrmModule.forFeature([Link]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

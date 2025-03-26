import { Module } from "@nestjs/common";
import { GptController } from "./gpt.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Gpt, GptSchema } from "./gpt.schema";
import { GptService } from "./gpt.service";

@Module({
  controllers: [
    // GptController
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Gpt.name, schema: GptSchema }
    ])
  ],
  exports: [
    GptService
  ],
  providers: [
    GptService
  ],
})
export class GptModule {

}

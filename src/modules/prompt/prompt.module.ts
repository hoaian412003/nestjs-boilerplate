import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Prompt, PromptSchema } from "./prompt.schema";
import { PromptService } from "./prompt.service";

@Module({
  controllers: [
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Prompt.name, schema: PromptSchema }
    ])
  ],
  exports: [
    PromptService
  ],
  providers: [
    PromptService
  ],
})
export class PromptModule {

}

import { Module } from "@nestjs/common";
import { VisibilityController } from "./visibility.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Visibility, VisibilitySchema } from "./visibility.schema";
import { VisibilityService } from "./visibility.service";
import { VisibilityTask } from "./visibility.task";
import { PromptModule } from "modules/prompt/prompt.module";
import { BullModule } from "@nestjs/bull";
import { GptModule } from "modules/llms/gpt/gpt.module";

@Module({
  controllers: [
    VisibilityController
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Visibility.name, schema: VisibilitySchema }
    ]),
    PromptModule,
    BullModule.registerQueue({
      name: 'VisibilityTask',
    }),
    GptModule
  ],
  exports: [
    VisibilityService
  ],
  providers: [
    VisibilityService,
    VisibilityTask
  ],
})
export class VisibilityModule {

}

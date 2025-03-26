import { Module } from "@nestjs/common";
import { HfController } from "./hf.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Hf, HfSchema } from "./hf.schema";
import { HfService } from "./hf.service";

@Module({
  controllers: [
    // HfController
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Hf.name, schema: HfSchema }
    ])
  ],
  exports: [
    HfService
  ],
  providers: [
    HfService
  ],
})
export class HfModule {

}

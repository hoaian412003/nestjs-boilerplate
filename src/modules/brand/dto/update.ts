import { IsString } from "class-validator";

export class UpdateBrandDto { }

export class UpdateBrandParams {
  @IsString({
    each: true
  })
  brandId: string;
}

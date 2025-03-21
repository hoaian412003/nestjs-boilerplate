import { Hf, HfDocument } from "./hf.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LLMService } from "../abstract/abstract.service";
import { BadRequestException } from "@nestjs/common";
import { AskHfBody } from "./dto/ask";
import { InferenceClient } from '@huggingface/inference'
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";
import { AIMessage } from "@langchain/core/messages";

export class HfService extends LLMService<HfDocument> {
  constructor(
    @InjectModel(Hf.name)
    private hfModel: Model<HfDocument>
  ) {
    super(hfModel)
  }

  async ask(id: string, body: AskHfBody): Promise<any> {
    const config = await this.findById(id);
    if (!config) throw new BadRequestException("Not found model configuration");


    const inference = new InferenceClient(config.apiKey);
    const result = await inference.chatCompletion({
      model: config.model,
      messages: body.messages,
      max_tokens: 512
    });

    const zodSchema = z.object({
      answer: z.string().describe("answer to the user's question"),
      source: z
        .string()
        .describe(
          "source used to answer the user's question, should be a website."
        ),
    });

    const parser = StructuredOutputParser.fromZodSchema(zodSchema)

    return await parser.invoke(new AIMessage(result.choices[0].message.content!));

  }
  getTopBrand(prompt: string): Promise<Array<any>> {
    throw new Error("Method not implemented.");
  }
}

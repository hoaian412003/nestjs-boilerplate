import { registerAs } from "@nestjs/config";

export interface LLMConfig {
  gptApiKey: string
}

export const llmLoader = registerAs('llm', () => ({
  gptApiKey: process.env.GPT_KEY
}))

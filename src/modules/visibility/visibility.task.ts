import { InjectQueue, Process, Processor } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Job, Queue } from "bull";
import { Prompt } from "modules/prompt/prompt.schema";
import { PromptService } from "modules/prompt/prompt.service";
import { queue } from "rxjs";
import { VisibilityService } from "./visibility.service";

@Injectable()
@Processor('VisibilityTask')
export class VisibilityTask {

  constructor(
    private visibilityService: VisibilityService,
    private promptService: PromptService,
    @InjectQueue('VisibilityTask') private queue: Queue) {
  }

  async registerPrompt(prompt: Prompt) {
    // Push prompt to queue
    this.queue.add(prompt);
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async registerAllPrompt() {
    const prompts = await this.promptService.findAll();
    prompts.map((prompt) => this.registerPrompt(prompt));
  }


  @Process()
  async process(job: Job<Prompt>) {
    await this.visibilityService.visibleBrandRecord(job.data);
  }

}

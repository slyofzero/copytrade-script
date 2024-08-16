import { BOT_USERNAME } from "@/utils/env";
import { CommandContext, Context } from "grammy";
import { setUpBot } from "./setup";

export async function startBot(ctx: CommandContext<Context>) {
  const text = `*Welcome to ${BOT_USERNAME}!!!*\n\n`;
  await ctx.reply(text);

  setUpBot(ctx);
}

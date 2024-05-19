import { matchData } from "@/vars/matchData";
import { userState } from "@/vars/userState";
import { CommandContext, Context } from "grammy";

export async function setMatch(ctx: CommandContext<Context>) {
  const userId = ctx.chatId;
  userState[userId] = "setTeamA";
  const message =
    "To set a match we'd need two things. Team A and Team B, the teams playing in the match, and the duration this match will last for.\n\nFirst provide the name of Team A.";
  ctx.reply(message);
}

export async function setTeamA(ctx: CommandContext<Context>) {
  const userId = ctx.chatId;
  const teamA = ctx.message?.text.trim();

  if (!teamA) return ctx.reply("Please enter a valid team name");
  matchData[userId] = { teamA };

  userState[userId] = "setTeamB";
  const message = "Next up provide the name of Team B.";
  ctx.reply(message);
}

export async function setTeamB(ctx: CommandContext<Context>) {
  const userId = ctx.chatId;
  const teamB = ctx.message?.text.trim();

  if (!teamB) return ctx.reply("Please enter a valid team name");
  matchData[userId] = { teamB };

  userState[userId] = "setDuration";
  const message = "Next up provide the duration of the match in hours.";
  ctx.reply(message);
}

export async function setDuration(ctx: CommandContext<Context>) {
  const userId = ctx.chatId;
  const duration = Number(ctx.message?.text.trim());

  if (!duration) return ctx.reply("Please enter a valid team name");
  const { teamA, teamB } = matchData[userId];
  // Clearing out the temporary states
  delete userState[userId];
  delete matchData[userId];

  const message = `Match started between ${teamA} as Team A, and ${teamB} as Team B. Ends in ${duration} hours.`;
  ctx.reply(message);
}

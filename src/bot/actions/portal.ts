import { isValidInviteLink } from "@/utils/general";
import { portalDataInput, userState } from "@/vars/state";
import {
  CallbackQueryContext,
  CommandContext,
  Context,
  InlineKeyboard,
} from "grammy";

export async function inputGroupLink(ctx: CallbackQueryContext<Context>) {
  const chatId = ctx.from.id;
  const portalChannelId = ctx.update.message?.chat_shared?.chat_id;

  if (!portalChannelId)
    return ctx.reply(
      "Couldn't find the portal channel ID, please do /start again"
    );

  portalDataInput[chatId] = { channelId: portalChannelId };
  const text = "❔ Send me original group's link.";
  userState[chatId] = "setGroupLink";

  ctx.reply(text);
}

export async function setGroupLink(ctx: CommandContext<Context>) {
  const chatId = ctx.chat.id;
  const inviteLink = ctx.message?.text;

  if (!inviteLink) return;

  if (!isValidInviteLink(inviteLink)) {
    return ctx.reply("Please enter a valid URL");
  }

  delete userState[chatId];
  portalDataInput[chatId] = { link: inviteLink };
  const text = `❔ Select the settings and click "Create Portal":`;

  const keyboard = new InlineKeyboard()
    .text("🖼️ Set Media", "setMediaInput")
    .text("View current media", "viewMedia")
    .row()
    .text("📝 Set Text", "setTextInput")
    .text("View current text", "viewText")
    .row()
    .text("🔍 Preview Portal", "previewPortal")
    .row()
    .text("✅ Create Portal", "createPortal");

  ctx.reply(text, { reply_markup: keyboard });
}

export async function setMediaInput(ctx: CallbackQueryContext<Context>) {
  const chatId = ctx.from.id;
  userState[chatId] = "setMedia";
  const text = "❔ Send me the new media to set for portal message.";
  ctx.reply(text);
}

export async function setMedia(ctx: CommandContext<Context>) {
  const chatId = ctx.chat.id;

  console.log(JSON.stringify(ctx));

  //   userState[chatId] = "setMedia";
  //   const text = "❔ Send me the new media to set for portal message.";
  //   ctx.reply(text);
}

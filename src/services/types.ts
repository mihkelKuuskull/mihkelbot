import { ChatInputApplicationCommandData } from 'discord.js';

export type MyCommand = ChatInputApplicationCommandData & { execute: ({ inter, client }) => Promise<void> };
export type ButtonArgs = { client: any; inter: any; customId: string; queue: any };

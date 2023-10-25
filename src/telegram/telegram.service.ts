import { Injectable } from '@nestjs/common';
import {Telegraf} from 'telegraf';

@Injectable()
export class TelegramService {
  private bot: Telegraf;
  private chatId: string;
  // constructor() {
  //   // Substitua 'YOUR_BOT_TOKEN' pelo token do seu bot do Telegram
  //   this.bot = new Telegraf('6827435531:AAHgj-zB8zEenaJRUnrhRU0PBmmnxZUeQDU');
  //   this.chatId = '-1002033466946';
  // }

  async sendTelegrafText({message, chatid, tokenbot }:{message: string, chatid: number, tokenbot: string }) {
    try {
      const bot = new Telegraf(tokenbot);
      await bot.telegram.sendMessage(chatid, message);
      console.log("Mensagem enviada")
    } catch (error) {
      console.log("sendTelegrafText: ", error)
    }
  }
}

import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { MediaGroup } from 'telegraf/typings/telegram-types';
import { SendMessageDto } from './dto/sendMessage.dto';
import { async } from 'rxjs';

@Injectable()
export class TelegramService {
  //   this.bot = 6827435531:AAHgj-zB8zEenaJRUnrhRU0PBmmnxZUeQDU
  //   this.chatId = -1002033466946

  private base64ToImage(base64: string): Buffer {
    const base64Data = base64.replace(/^data:image\/jpeg;base64,/, '');

    return Buffer.from(base64Data, 'base64');
  }

  private async sendTelegrafText({
    message,
    chatid,
    tokenbot,
  }: {
    message: string;
    chatid: number;
    tokenbot: string;
  }) {
    try {
      const bot = new Telegraf(tokenbot);
      await bot.telegram.sendMessage(chatid, message);
      console.log('Mensagem enviada');
    } catch (error) {
      console.log('sendTelegrafText: ', error);
    }
  }

  private async sendTelegrafmedia({
    message,
    chatid,
    tokenbot,
    images,
  }: SendMessageDto) {
    const bot = new Telegraf(tokenbot);
    const media: MediaGroup = images.map((image) => ({
      type: 'photo',
      media: { source: this.base64ToImage(image) },
      caption: '',
    }));

    media[media.length - 1].caption = message;
    console.log(media);

    await bot.telegram.sendMediaGroup(chatid, media);
    console.log('Mensagem enviada');
  }

  async sendMessageSwitch(sendMessageDto: SendMessageDto) {
    // typeof sendMessageDto.images == "undefined" ?
    sendMessageDto.images
      ? this.sendTelegrafmedia(sendMessageDto)
      : this.sendTelegrafText(sendMessageDto);
  }
}

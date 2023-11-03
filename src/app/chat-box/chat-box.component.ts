import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputMessageComponent } from './ui/input-message/input-message.component';
import { MessageListComponent } from './ui/message-list/message-list.component';

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [InputMessageComponent, MessageListComponent],
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ChatBoxComponent {}

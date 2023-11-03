import { DatePipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  computed,
  effect,
  inject,
} from '@angular/core';
import { AuthService } from 'src/app/shared/auth';
import { Message } from 'src/app/shared/models';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [DatePipe, NgClass],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent implements OnInit {
  @Input({ required: true }) message!: Message;
  readonly #authService = inject(AuthService);
  isCurrentUser!: boolean;

  ngOnInit(): void {
    this.isCurrentUser = this.#authService.user()?.uid === this.message.uid;
  }
}

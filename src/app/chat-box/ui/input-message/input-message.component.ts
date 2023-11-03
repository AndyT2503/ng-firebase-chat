import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { AuthService } from 'src/app/shared/auth';
import { MESSAGES_COLLECTION_PATH } from 'src/app/shared/const';
import { Message } from 'src/app/shared/models';

@Component({
  selector: 'app-input-message',
  standalone: true,
  templateUrl: './input-message.component.html',
  styleUrls: ['./input-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputMessageComponent {
  readonly #fireStore = inject(Firestore);
  readonly #authService = inject(AuthService);

  async sendMessage(inputMsg: HTMLInputElement) {
    if (!inputMsg.value) return;
    const { displayName, photoURL, uid } = this.#authService.user()!;
    const newMessage: Message = {
      text: inputMsg.value.trim(),
      name: displayName!,
      avatar: photoURL!,
      createdAt: new Date().toISOString(),
      uid,
    };
    await addDoc(collection(
      this.#fireStore,
      MESSAGES_COLLECTION_PATH
    ), newMessage);
    inputMsg.value = '';
  }
}

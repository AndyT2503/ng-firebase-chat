import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Firestore,
  collection,
  collectionData,
  limit,
  orderBy,
  query,
  startAfter,
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { MESSAGES_COLLECTION_PATH } from 'src/app/shared/const';
import { Message } from 'src/app/shared/models';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [NgFor, MessageComponent],
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageListComponent {
  @ViewChild('scrollEle') scrollElement!: ElementRef<HTMLDivElement>;
  readonly #fireStore = inject(Firestore);
  readonly listMessage = toSignal(
    (collectionData(
      query(
        collection(this.#fireStore, MESSAGES_COLLECTION_PATH),
        orderBy('createdAt', 'desc'),
        limit(100),
      )
    ) as Observable<Message[]>).pipe(map(data => data.reverse())),
    {
      initialValue: [],
    }
  );

  constructor() {
    effect(() => {
      if (this.listMessage().length && this.scrollElement) {
        setTimeout(() => {
          this.scrollElement.nativeElement.scrollTo({
            top: 1000,
            behavior: 'smooth',
          });
        });
      }
    });
  }
}

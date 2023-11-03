import { FieldValue } from '@angular/fire/firestore';

export interface Message {
  uid: string;
  text: string;
  name: string;
  avatar: string;
  createdAt: string;
}

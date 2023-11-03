import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../shared/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  readonly authService = inject(AuthService);
}

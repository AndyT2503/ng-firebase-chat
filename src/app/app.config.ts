import {
  ApplicationConfig,
  NgModule,
  importProvidersFrom,
} from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import * as EnvironmentConfigData from '../assets/config/app-config.json';
import { routes } from './app.routes';
import { createInjectionToken } from './shared/utils';
import { getAuth, provideAuth } from '@angular/fire/auth';


export type EnvironmentConfig = typeof EnvironmentConfigData;
export const [injectEnvironmentConfig, provideEnvironmentConfig] =
  createInjectionToken<EnvironmentConfig>('Environment Config');

@NgModule({
  imports: [
    provideFirebaseApp(() =>
      initializeApp(injectEnvironmentConfig().firebaseConfig)
    ),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
})
class FirebaseConfigModule {}

export const initAppConfig = (config: EnvironmentConfig): ApplicationConfig => {
  return {
    providers: [
      provideRouter(routes),
      provideEnvironmentConfig(config),
      importProvidersFrom([FirebaseConfigModule]),
    ],
  };
};

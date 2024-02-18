import { provideRouter } from "@angular/router";
import { routes } from "./app-routing.module";
import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from "@angular/core";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes)
  ]
}

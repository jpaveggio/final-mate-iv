import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BisectionFormComponent } from './bisection-form/bisection-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule, MatButtonModule, MatSelectModule, MatRadioModule, MatCardModule, MatDividerModule} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { BisectionCalculatorComponent } from './bisection-calculator/bisection-calculator.component';
import { BisectionResultComponent } from './bisection-result/bisection-result.component';

@NgModule({
  declarations: [
    AppComponent,
    BisectionFormComponent,
    BisectionCalculatorComponent,
    BisectionResultComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

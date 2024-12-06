import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './dashboard/home/home.component';
import { CartComponent } from './dashboard/cart/cart.component';
import { PaymentComponent } from './dashboard/payment/payment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// PrimeNG imports
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { RatingModule } from 'primeng/rating';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { StepperModule } from 'primeng/stepper';
// Angular Material imports (if needed)
import { MatDialogModule } from '@angular/material/dialog'; // for Material dialogs

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    PaymentComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TableModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    RippleModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    BrowserAnimationsModule, // Required for PrimeNG components
    MatDialogModule, // If you're using Angular Material Dialogs
    ToastModule,
    RatingModule,
    DropdownModule,
    InputMaskModule,
    StepperModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { 
  FlexiblePreviewBoxComponent,
  CustomFavoriteComponent,
  CustomCartComponent,
  CustomInventoryComponent
} from '@sedeh/flexible-preview-box/‌index';
import { WizardStorageModule } from '@sedeh/wizard-storage';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    WizardStorageModule,
    FlexiblePreviewBoxComponent,
    CustomFavoriteComponent,
    CustomCartComponent,
    CustomInventoryComponent
  ],
  entryComponents: [
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

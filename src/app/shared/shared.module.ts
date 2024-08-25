import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PopupComponent} from "./components/popup/popup.component";
import {TruncatePipe} from "./pipes/truncate.pipe";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    PopupComponent,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    PopupComponent,
    TruncatePipe
  ]
})
export class SharedModule { }

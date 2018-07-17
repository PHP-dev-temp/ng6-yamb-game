import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderFooterComponent } from './header-footer/header-footer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    HeaderFooterComponent
  ],
  declarations: [HeaderFooterComponent]
})
export class CoreModule { }

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesItemPage } from './detalhes-item';
@NgModule({
  declarations: [
    DetalhesItemPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhesItemPage),
  ],
})
export class DetalhesItemPageModule {}

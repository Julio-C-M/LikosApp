import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InicioPage } from './inicio.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { InicioPageRoutingModule } from './inicio-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    InicioPageRoutingModule
  ],
  declarations: [InicioPage]
})
export class InicioPageModule {}

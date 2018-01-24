import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from "@angular/http";
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ItensPage } from '../pages/itens/itens';
import { DetalhesPage } from '../pages/detalhes/detalhes';
import { CategoriasPage } from '../pages/categorias/categorias';
import { DetalhesItemPage } from '../pages/detalhes-item/detalhes-item';
import { ConsultaProvider } from '../providers/consulta/consulta';
import { CallNumber } from '@ionic-native/call-number';
import { SocialSharing } from '@ionic-native/social-sharing';
import { PesquisaPage } from '../pages/pesquisa/pesquisa';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ItensPage,
    DetalhesPage,
    DetalhesItemPage,
    PesquisaPage,
    CategoriasPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    PipesModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ItensPage,
    DetalhesPage,
    DetalhesItemPage,
    PesquisaPage,
    CategoriasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConsultaProvider,
    CallNumber,
    SocialSharing
  ]
})
export class AppModule {}

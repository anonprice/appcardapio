import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConsultaProvider } from '../../providers/consulta/consulta';
import { LoadingController } from 'ionic-angular';
import { ItensPage } from '../itens/itens';
import { PesquisaPage } from '../pesquisa/pesquisa';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    ConsultaProvider
  ]
})
export class HomePage {
  public teste;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public consultaProvider: ConsultaProvider,
    public loadingCtrl: LoadingController
  ) {

  }
  ionViewDidLoad() {

  }
  //Função para listar itens da categoria selecionada
  listarItens(categoria){
    this.navCtrl.push(ItensPage, {categoria: categoria});
  }
  //Função para pesquisar Itens
  form = {
    pesquisar: ''
  };
   pesquisaForm() {
     this.navCtrl.push(PesquisaPage, {pesquisa: this.form.pesquisar});
     this.form.pesquisar = '';
   }

}

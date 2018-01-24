import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ConsultaProvider } from '../../providers/consulta/consulta';
import { DetalhesPage } from '../detalhes/detalhes';
@IonicPage()
@Component({
  selector: 'page-pesquisa',
  templateUrl: 'pesquisa.html',
  providers: [
    ConsultaProvider
  ]
})
export class PesquisaPage {
  public loader;
  public refresher;
  public erro;
  public pesquisaItem = new Array<any>();;
  public isRefreshing: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public consultaProvider: ConsultaProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    this.abreCarregamento();
    this.pesquisarItens();
    this.navParams.get("pesquisa");
  }
  //Abrir tela de carregando
  abreCarregamento() {
  this.loader = this.loadingCtrl.create({
    content: "Carregando Informações...",
  });
  this.loader.present();
  }
  //Fechar tela de carregando
  fechaCarregamento(){
    this.loader.dismiss();
  }
  //Função para consumir api com detalhes do item
  pesquisarItens(){
    this.consultaProvider.pegarItensPesquisa(this.navParams.get("pesquisa")).subscribe(data => {
        let retorno = (data as any)._body;
        if(retorno === ""){
          this.erro = "sem-resultado.png";
        }else{
          this.pesquisaItem = JSON.parse(retorno);
        }
        this.fechaCarregamento();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }, error => {
        this.fechaCarregamento();
        this.erro = "sem-conexao.jpg";
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    )
  }
  //Função para abrir detalhes do item
  abrirDetalhes(local){
    this.navCtrl.push(DetalhesPage, {local: local});
  }
}

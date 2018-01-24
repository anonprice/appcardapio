import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ConsultaProvider } from '../../providers/consulta/consulta';
@IonicPage()
@Component({
  selector: 'page-detalhes-item',
  templateUrl: 'detalhes-item.html',
})
export class DetalhesItemPage {
  public loader;
  public refresher;
  public itemLocal;
  public erro;
  public detalhesItem = new Array<any>();;
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
    this.consultarDetalhesItem();
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
  consultarDetalhesItem(){
  this.itemLocal = "i" + this.navParams.get("item");
    this.consultaProvider.pegarDetalhesItem(this.navParams.get("item")).subscribe(data => {
        let retorno = (data as any)._body;
        if(retorno === ""){
          this.erro = "sem-resultado.png";
        }else{
          this.detalhesItem = JSON.parse(retorno);
          //Salvando restorno no localStorage
          this.consultaProvider.setLocalStorage(this.itemLocal, retorno);
        }
        this.fechaCarregamento();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }, error => {
        console.log(this.itemLocal);
        //SEM CONEXÃO, CONSULTANDO LOCALSTORAGE
        if(this.consultaProvider.getLocalStorage(this.itemLocal) === null){
          this.erro = "sem-resultado.png";
        }else{
        this.detalhesItem = JSON.parse(this.consultaProvider.getLocalStorage(this.itemLocal));
        }
        this.fechaCarregamento();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    )
  }

}

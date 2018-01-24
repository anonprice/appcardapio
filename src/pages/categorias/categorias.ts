import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ConsultaProvider } from '../../providers/consulta/consulta';
import { CallNumber } from '@ionic-native/call-number';
import { SocialSharing } from '@ionic-native/social-sharing';
import { DetalhesPage } from '../detalhes/detalhes';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {
  public loader;
  public refresher;
  public detalhesLocal;
  public erro;
  public teste;
  public idLocalLS;
  public categLocalLS;
  public erroLocal;
  public cardapio = new Array<any>();
  public isRefreshing: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public consultaProvider: ConsultaProvider,
    public loadingCtrl: LoadingController,
    private callNumber: CallNumber,
    private socialSharing: SocialSharing
  ) {
  }

  ionViewDidLoad() {
    this.abreCarregamento();
    this.consultarDetalhes();
    this.consultarCategoraisCardapio();

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
  //Função para abrir detalhes do item
  listarItensCategoria(categoria, local){
    this.navCtrl.push(DetalhesPage, {categoria: categoria, local: local});
  }
  //Função que realiza a consulta de detalhes do local
  consultarDetalhes(){
  this.idLocalLS = "l" + this.navParams.get("local");
    this.consultaProvider.pegarDetalhes(this.navParams.get("local")).subscribe(data => {
        let retorno = (data as any)._body;
        this.detalhesLocal = JSON.parse(retorno);
        this.consultaProvider.setLocalStorage(this.idLocalLS, retorno);
      }, error => {
        if(this.consultaProvider.getLocalStorage(this.idLocalLS) === null){
          this.erroLocal = "sem-resultado.png";
        }else{
          this.detalhesLocal = JSON.parse(this.consultaProvider.getLocalStorage(this.idLocalLS));
        }
      }
    )
  }
  //Função que realiza a consulta de detalhes do local
  consultarCategoraisCardapio(){
  this.categLocalLS = "c" + this.navParams.get("local");
    this.consultaProvider.pegarCategoriasLocais(this.navParams.get("local")).subscribe(data => {
        let retorno = (data as any)._body;
        if(retorno === ""){
          this.erro = "sem-resultado.png";
        }else{
          this.cardapio = JSON.parse(retorno);
          //Salvando restorno no localStorage
          this.consultaProvider.setLocalStorage(this.categLocalLS, retorno);
        }
        this.fechaCarregamento();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }, error => {
        //SEM CONEXÃO, CONSULTANDO LOCALSTORAGE
        this.cardapio = JSON.parse(this.consultaProvider.getLocalStorage(this.categLocalLS));
        this.fechaCarregamento();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    )
  }
  //Função para ligar
  ligar(telefone){
    this.callNumber.callNumber(telefone, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }
  //Função chamar no whatsapp
  chamar(celular){
    // Share via email
    this.socialSharing.shareViaWhatsAppToReceiver(celular, '', '').then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
}

}

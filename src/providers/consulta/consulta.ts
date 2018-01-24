import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
@Injectable()
export class ConsultaProvider {
  //Api base
  public apiBase = "http://45.76.60.134/admincardapio2/api/";
  constructor(public http: Http) {
    console.log('Hello ConsultaProvider Provider');
  }
  //Função para listar api com empresas da categoria selecionada
  pegarLocaisCategoria(categoria){
    return this.http.get(this.apiBase + 'categoria/' + categoria);
  }
  //Função para listar api com detalhes do local selecionado
  pegarDetalhes(local){
    return this.http.get(this.apiBase + 'local/detalhes/' + local);
  }
  //Função para listar api com categorias do local selecionado
  pegarCategoriasLocais(local){
    return this.http.get(this.apiBase + 'local/categorias/' + local);
  }
  //Função para listar api com detalhes do local selecionado
  pegarDetalhesCardapio(categoria, local){
    return this.http.get(this.apiBase + 'itens/' + categoria +  '/' + local);
  }
  //Função para listar api com detalhes do local selecionado
  pegarDetalhesItem(local){
    return this.http.get(this.apiBase + 'itens/detalhes/' + local);
  }
  //Função para listar itens com pesquisa
  pegarItensPesquisa(item){
    return this.http.get(this.apiBase + 'itens/pesquisar/' + item);
  }
  //Função para salvar no localStorage
  setLocalStorage(nome: string, data){
    localStorage.setItem(nome, JSON.stringify(data));
  }
  //Função para pegar item do localStorage
  getLocalStorage(nome){
      return JSON.parse(localStorage.getItem(nome));
  }
}

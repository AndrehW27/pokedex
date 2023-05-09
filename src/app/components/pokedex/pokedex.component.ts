import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { PokeinfosService } from 'src/app/shared/services/pokeinfos.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  pokemonList: Array<any> = [];
  pokeUrlList: Array<any> = [];
  pokeData2: Array<any> = [];
  pokeListToRender: Array<any> = [];

  nome = "";
  id = 0;
  imagem = "";
  tipo1 = "";
  tipo2 = "";
  weight = 0;
  height = 0;
  hp = 0;
  atk = 0;
  def = 0;
  speAtk = 0;
  speDef = 0;
  spd = 0;

  // paginacao
  pagAtual = 1;
  offSet = 0;

  GetSpecificPoke = async (id: string) => {
    let res = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
    let pokeData = await res.json();
    // console.log(pokeData);    
    this.nome = await pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1);
    this.id = await pokeData.id;
    if (this.id.toString().length === 1) {
      this._pokeinfosService.idServ = "00" + this.id.toString();
    } else if (this.id.toString().length === 2) {
      this._pokeinfosService.idServ = "0" + this.id.toString();
    } else if (this.id.toString().length === 3) {
      this._pokeinfosService.idServ = this.id.toString();
    }
    this.imagem = await pokeData.sprites?.other.home.front_default;
    this.tipo1 = await pokeData.types[0].type.name;
    this.tipo2 = await pokeData.types[1]?.type.name;
    this.weight = await pokeData.weight / 10;
    this.height = await pokeData.height / 10;
    this.hp = await pokeData.stats[0].base_stat;
    this.atk = await pokeData.stats[1].base_stat;
    this.def = await pokeData.stats[2].base_stat;
    this.speAtk = await pokeData.stats[3].base_stat;
    this.speDef = await pokeData.stats[4].base_stat;
    this.spd = await pokeData.stats[5].base_stat;

    this._pokeinfosService.nomeServ = this.nome;
    this._pokeinfosService.imgServ = this.imagem;
    this._pokeinfosService.tipo1Serv = this.tipo1;
    this._pokeinfosService.tipo2Serv = this.tipo2;
    this._pokeinfosService.weightServ = this.weight;
    this._pokeinfosService.heightServ = this.height;
    this._pokeinfosService.hpServ = this.hp;
    this._pokeinfosService.atkServ = this.atk;
    this._pokeinfosService.defServ = this.def;
    this._pokeinfosService.speAtkServ = this.speAtk;
    this._pokeinfosService.speDefServ = this.speDef;
    this._pokeinfosService.spdServ = this.spd;

  }

  GetPokedex = async () => {
    let res = await fetch('https://pokeapi.co/api/v2/pokemon/');
    let pokeData = await res.json();
    this.pokemonList = await pokeData.results;
    // console.log(this.pokemonList);    
    for (let i = 0; i < this.pokemonList.length; i++) {
      this.pokeUrlList[i] = this.pokemonList[i].url;
    }
    // console.log(this.pokeUrlList);
    // console.log(this.pokeUrlList.length);
    for (let i = 0; i < this.pokeUrlList.length; i++) {
      let res2 = await fetch(this.pokeUrlList[i]);
      let pokeData2 = await res2.json();
      this.pokeListToRender[i] = pokeData2;
      // console.log(pokeData2);
    }
    // console.log(pokeData2);
    console.log(this.pokeListToRender);

  }

  GoNext = async () => {
    this.pagAtual = this.pagAtual+1;
    this.offSet = this.offSet + 20;
    console.log("Página Atual: " + this.pagAtual);
    console.log("OffSet: " + this.offSet);
    let res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=' + this.offSet);
    console.log(res);
    let pokeData = await res.json();
    this.pokemonList = await pokeData.results;
    for (let i = 0; i < this.pokemonList.length; i++) {
      this.pokeUrlList[i] = this.pokemonList[i].url;
    }
    for (let i = 0; i < this.pokeUrlList.length; i++) {
      let res2 = await fetch(this.pokeUrlList[i]);
      let pokeData2 = await res2.json();
      this.pokeListToRender[i] = pokeData2;
    }
  }

  GoPrev = async () => {
    if (this.pagAtual > 1) {
      this.pagAtual = this.pagAtual-1;
      this.offSet = this.offSet - 20;
      console.log("Página Atual: " + this.pagAtual);
      console.log("OffSet: " + this.offSet);
      let res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=' + this.offSet);
      console.log(res);
      let pokeData = await res.json();
      this.pokemonList = await pokeData.results;
      for (let i = 0; i < this.pokemonList.length; i++) {
        this.pokeUrlList[i] = this.pokemonList[i].url;
      }
      for (let i = 0; i < this.pokeUrlList.length; i++) {
        let res2 = await fetch(this.pokeUrlList[i]);
        let pokeData2 = await res2.json();
        this.pokeListToRender[i] = pokeData2;
      }
    } else {
      console.log("Você já está na primeira página.");
    }
  }

  constructor(private _pokeinfosService: PokeinfosService) { }

  ngOnInit() {
    this.GetPokedex();
  }
}



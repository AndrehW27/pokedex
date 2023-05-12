import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { PokeinfosService } from 'src/app/shared/services/pokeinfos.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  hide = false;
  notFound = true;
  buttonHome = false;
  img404 ="assets/Loading_icon.gif";
  nome = "";
  id = 0;
  imagem = "";
  tipo1 = "";
  tipo2 = "";
  weight = 0;
  height = 0;
  abilitie1 = "";
  abilitie2 = "";
  hp = 0;
  atk = 0;
  def = 0;
  speAtk = 0;
  speDef = 0;
  spd = 0;

  Hide = () =>{
    this.hide = true;
  }

  GetSpecificPoke = async () => {

    let res = await fetch('https://pokeapi.co/api/v2/pokemon/' + this._pokeinfosService.inputServ);
    if (res.status === 404) {
      this.notFound = true;
      this.buttonHome = true;
      this.img404 = "assets/notfound.png"
    } else if (res.status !== 404) {
      this.img404 = "";
      this.notFound = false;
      let pokeData = await res.json();
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
      this.height = await pokeData.height / 10;
      this.height = await pokeData.height / 10;
      this.abilitie1 = await pokeData.abilities[0]?.ability?.name.charAt(0).toUpperCase() + pokeData.abilities[0]?.ability?.name.slice(1);
      this.abilitie2 = await pokeData.abilities[1]?.ability?.name.charAt(0).toUpperCase() + pokeData.abilities[1]?.ability?.name.slice(1);;      
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
      this._pokeinfosService.abilitie1Serv = this.abilitie1;
      this._pokeinfosService.abilitie2Serv = this.abilitie2;      
      this._pokeinfosService.hpServ = this.hp;
      this._pokeinfosService.atkServ = this.atk;
      this._pokeinfosService.defServ = this.def;
      this._pokeinfosService.speAtkServ = this.speAtk;
      this._pokeinfosService.speDefServ = this.speDef;
      this._pokeinfosService.spdServ = this.spd;
    }
  }

  NextPoke = async () => {
    this._pokeinfosService.inputServ = await (this.id+1).toString()
    this.GetSpecificPoke();
  }

  PrevPoke = async () => {
    this._pokeinfosService.inputServ = await (this.id-1).toString()
    this.GetSpecificPoke();
  }


  constructor(public _pokeinfosService: PokeinfosService) { }

  ngOnInit() {
    this.GetSpecificPoke();
  }

}

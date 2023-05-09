import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { PokeinfosService } from 'src/app/shared/services/pokeinfos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  inputValue = "";
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

  GetSpecificPoke = async () => {
    // console.log("this.inputValue:" + this.inputValue);
    if ((this.inputValue === "" || this.inputValue === null || this.inputValue === undefined)) {
      if (Number.isInteger(this.inputValue)) {
        alert("Insira um pokemon válido: 1-854");
      } else {
        alert("Insira um pokemon válido: 1-854 ou o nome correto em inglês.");
      }
    }
    else {
      let res = await fetch('https://pokeapi.co/api/v2/pokemon/' + this.inputValue);
      let pokeData = await res.json();
      // console.log(pokeData);    
      this.nome = await pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1);
      this.id = await pokeData.id;
      if (this.id.toString().length===1) { 
        this._pokeinfosService.idServ = "00"+this.id.toString();
      } else if (this.id.toString().length===2) {
        this._pokeinfosService.idServ = "0"+this.id.toString();   
      } else if (this.id.toString().length===3) {
        this._pokeinfosService.idServ = this.id.toString();     
      }
      this.imagem = await pokeData.sprites?.other.home.front_default;
      this.tipo1 = await pokeData.types[0].type.name;        
      this.tipo2 = await pokeData.types[1]?.type.name;
      this.weight = await pokeData.weight/10;
      this.height = await pokeData.height/10;
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
  }

  constructor(private _pokeinfosService: PokeinfosService) { }

  ngOnInit(): void {
  }

}

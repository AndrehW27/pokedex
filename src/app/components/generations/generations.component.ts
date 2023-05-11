import { Component, OnInit } from '@angular/core';
import { PokeinfosService } from 'src/app/shared/services/pokeinfos.service';

@Component({
  selector: 'app-generations',
  templateUrl: './generations.component.html',
  styleUrls: ['./generations.component.scss']
})
export class GenerationsComponent implements OnInit {

  SetGen = (offset: number) =>{
    this._pokeinfosService.changeGen = true;
    this._pokeinfosService.offSetServ = offset;
    // console.log(this._pokeinfosService.changeGen);    
    // console.log(this._pokeinfosService.offSetServ);    
  }

  constructor(private _pokeinfosService: PokeinfosService) { }

  ngOnInit(): void {
  }

}

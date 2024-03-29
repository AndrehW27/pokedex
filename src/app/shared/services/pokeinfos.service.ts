import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeinfosService {

  constructor() { }

  public changeGen: boolean = false;
  public offSetServ: number = 0;
  public inputServ: string | undefined;
  public nomeServ: string | undefined;
  public idServ: string | undefined;
  public imgServ: string | undefined;
  public tipo1Serv: string | undefined;
  public tipo2Serv: string | undefined;
  public weightServ: number | undefined;
  public heightServ: number | undefined;
  public abilitie1Serv: string | undefined;
  public abilitie2Serv: string | undefined;
  public hpServ: number | undefined;
  public atkServ: number | undefined;
  public defServ: number | undefined;
  public speAtkServ: number | undefined;
  public speDefServ: number | undefined;
  public spdServ: number | undefined;
}

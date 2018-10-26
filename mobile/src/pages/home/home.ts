import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as io from 'socket.io-client';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private io;
  public dir;
  constructor(public navCtrl: NavController) {
    this.io = io('10.251.13.113:8005');
    this.io.on('event:orientation', (val) => {
      this.dir = val;
    })
  }

}

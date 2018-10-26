import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as io from 'socket.io-client';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private io;
  public dir;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    this.io = io('10.251.13.113:8005');
    this.io.on('event:orientation', (val) => {
      this.dir = val;
    })
  }
  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'New Friend!',
      subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    alert.present();
  }

}

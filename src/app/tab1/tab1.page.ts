import { AlertController, MenuController } from '@ionic/angular';
import { Component } from '@angular/core';
import { ShoppingItemsService } from '../shopping-items.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(
    public shoppingList: ShoppingItemsService,
    private alertController: AlertController,
    private menuController: MenuController
  ) {}

  async removeItem(item: string) {
    const alert = await this.alertController.create({
      header: 'Confirmacion',
      message: '¿Estas seguro de borrar el item?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.shoppingList.removeItem(item);
          },
        },
        {
          text: 'No',
          handler: () => {
            alert.dismiss();
          },
        },
      ],
    });
    await alert.present();
  }
  onRenderItems($event) {
    console.log($event);

    const item = this.shoppingList.items.splice($event.detail.from, 1)[0];
    this.shoppingList.items.splice($event.detail.to, 0, item);
    $event.detail.complete();
    console.log(this.shoppingList.items);
  }
  async removeAll() {
    const alert = await this.alertController.create({
      header: 'Confirmacion',
      message: '¿Estas seguro de borrar todos los item?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.shoppingList.removeAllItems();
            this.menuController.close();
          },
        },
        {
          text: 'No',
          handler: () => {
            alert.dismiss();
          },
        },
      ],
    });
    await alert.present();
  }
}

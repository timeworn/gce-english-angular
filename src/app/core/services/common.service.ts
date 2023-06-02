import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  async showLoading(message: string) {
    const loading =  await this.loadingController.create({message});
    await loading.present();
    return loading;
  }

  async showToast(message: string, duration = 2000) {
    const toast = await this.toastController.create({
      duration: 2000,
      message
    });
    await toast.present();
  }
}

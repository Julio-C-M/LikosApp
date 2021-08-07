import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, IonSlides } from '@ionic/angular';


declare var google;

interface Marker {
  lat: number;
  lng: number;
  title: string;
  image: string;
  text: string;
  markerObj?: any;
}
@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.page.html',
  styleUrls: ['./ubicacion.page.scss'],
})
export class UbicacionPage implements OnInit{

  @ViewChild(IonSlides) slides: IonSlides;

  mapRef = null;
  infoWindowRef =null;
  markers: Marker[] = [
    { 
      lat: 19.43258398072677,
      lng: -99.13120401631467,
     
      title: 'Guardia 1',
      image: 'https://s3-ap-northeast-1.amazonaws.com/ojuz-attach/profile/images/GioChkhaidze',
      text: 'Datos: '
    },
    {
      lat: 19.433281332532,
      lng: -99.13169773917852,      
      title: 'Guardia 2',
      image: 'https://s3-ap-northeast-1.amazonaws.com/ojuz-attach/profile/images/GioChkhaidze',
      text: 'Animi voluptatem, aliquid impedit ratione placeat necessitatibus quisquam molestiae obcaecati laudantium?'
    },
    {
       
      lat: 19.431943802346694,
      lng: -99.13172545082288,
      title: 'Guardia 3',
      image: 'https://s3-ap-northeast-1.amazonaws.com/ojuz-attach/profile/images/GioChkhaidze',
      text: 'Animi voluptatem, aliquid impedit ratione placeat necessitatibus quisquam molestiae obcaecati laudantium?'
    },
    {
       
      lat: 19.431813910772743,
      lng: -99.13062847067525,
      title: 'Guardia 5',
      image: 'https://s3-ap-northeast-1.amazonaws.com/ojuz-attach/profile/images/GioChkhaidze',
      text: 'Animi voluptatem, aliquid impedit ratione placeat necessitatibus quisquam molestiae obcaecati laudantium?'
    }
  ];

  constructor(
    private loadingCtrl: LoadingController
  ) { 
    this.infoWindowRef = new google.maps.InfoWindow();
  }

  ngOnInit() {
    this.loadMap();
  }
  async loadMap() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    const marker = this.markers[0];
    const mapEle: HTMLElement = document.getElementById('map');
    this.mapRef = new google.maps.Map(mapEle, {
      center: {lat: marker.lat, lng: marker.lng},
      zoom: 17
       
    });
    google.maps.event
    .addListenerOnce(this.mapRef, 'idle', () => {
      loading.dismiss();
      this.loadMarkers();
    });
  }

  private addMarker(itemMarker: Marker){
    const marker = new google.maps.Marker({
      position: { lat: itemMarker.lat, lng: itemMarker.lng },
      map: this.mapRef,
      title: itemMarker.title
    });
    return marker;

  }
  private loadMarkers(){
    this.markers.forEach(marker =>{
      const markerObj = this.addMarker(marker);
      marker.markerObj = markerObj;
    })
  }
  async onSlideDidChange(){
    const currentSlide = await this.slides.getActiveIndex();
    //console.log(currentSlide);
    //console.log(this.markers[currentSlide]);
    const marker = this.markers[currentSlide];
    this.mapRef.panTo({lat: marker.lat, lng: marker.lng});

    const markerObj = marker.markerObj;
    this.infoWindowRef.setContent(marker.title);
    this.infoWindowRef.open(this.mapRef, markerObj);

  }

}
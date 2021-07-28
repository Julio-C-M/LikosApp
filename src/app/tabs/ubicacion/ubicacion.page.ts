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
      lat: 19.43461832689501,
      lng: -99.13313595808788,
      title: 'Catedral Metropolitana',
      image: 'https://www.mexicodesconocido.com.mx/wp-content/uploads/2010/07/CIUDAD_DE_MEXICO_CATEDRAL_METROPOLITANA_IGmd.jpg',
      text: 'Animi voluptatem, aliquid impedit ratione placeat necessitatibus quisquam molestiae obcaecati laudantium?'
    },
    {
 
      lat: 19.43554467652977,
      lng: -99.14123393648872,
      title: 'Palacio de Bellas Artes',
      image: 'https://inba.gob.mx/multimedia/espacios-culturales/1/1-EC-BG-palacio_de_bellas_artes.jpg',
      text: 'Animi voluptatem, aliquid impedit ratione placeat necessitatibus quisquam molestiae obcaecati laudantium?'
    },
    {
 
      lat: 19.43279548483612,
      lng: -99.13107690480726,
      title: 'Palacio Nacional',
      image: 'http://nebula.wsimg.com/240bedb79eccf9f31186e01f74b76653?AccessKeyId=0252591E84E38284F8E3&disposition=0&alloworigin=1',
      text: 'Animi voluptatem, aliquid impedit ratione placeat necessitatibus quisquam molestiae obcaecati laudantium?'
    },
    {
 
      lat: 19.429704947367014,
      lng: -99.13244584475623,
      title: 'Museo de la Ciudad de México',
      image: 'https://www.cultura.cdmx.gob.mx/storage/app/media/uploaded-files/mcm.png',
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
      zoom: 15
       
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
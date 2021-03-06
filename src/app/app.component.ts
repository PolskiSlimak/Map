import { Component } from '@angular/core';
import { CitiesService } from './cities.service';
import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {fromLonLat} from 'ol/proj';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  map: any;
  constructor (private service: CitiesService) {
  }

  ngOnInit() {
    this.makeMap();
    this.service.getCapitals().subscribe((response: any) =>{
      let cords: Feature[] = [];
      response[1].forEach((element: any) => {
        if (element.longitude != '' && element.latitude != '') {
          let feature = this.makePoints(element.longitude, element.latitude);
          cords.push(feature);
        }
      });
      let layer = this.makeLayer(cords);
      this.map.addLayer(layer);
    });
  }

  public makeMap() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center:  fromLonLat([-70.016, 12.516]),
        zoom: 5
      })
    });
  }

  public makePoints(longitude: number, latitude: number) {
    const point = new Point(fromLonLat([longitude, latitude]));
    const feature = new Feature({
      geometry: point
    });
    feature.setStyle(new Style({
      image: new Icon({
        color: "black",
        src: "assets/dot.png",
        imgSize: [10, 10]
      })
    }));
    return feature;
  }

  public makeLayer(cords: any) {
    const vectorSource = new VectorSource({
      features: cords
    });
    return new VectorLayer({
      source: vectorSource
    });
  }
}

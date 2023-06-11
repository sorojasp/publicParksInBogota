





function obtenerCoordenadasParques(coordendasIniciales){

let totalParques=[];
let coordenadasParque=[];
console.log(coordendasIniciales)
coordendasIniciales.features.forEach(dataParque => {


    dataParque.geometry.rings.forEach(parquesLatLon=>{

        parquesLatLon.forEach(parqueLatLon=>{

            coordenadasParque.push({lat:parqueLatLon[1], lng:parqueLatLon[0]});
        })

    })

    let infoParque ={

        coordenadas: coordenadasParque,
        nombreLocalidad:dataParque.attributes.LocNombre,
        NumeroLocalidad: dataParque.attributes.Id_Localid,
        nombreParque:dataParque.attributes.Nombre_Par,
        tipoParque:dataParque.attributes.TipoParque,
        id_Upz: dataParque.attributes.Id_Upz,
        SHAPE_Area: dataParque.attributes.SHAPE_Area,
        SHAPE_Leng: dataParque.attributes.SHAPE_Leng


    };

    coordenadasParque=[];
    totalParques.push(infoParque);


});


return totalParques;
}



function initMap() {

  console.log(Object.keys("L.C.BOLIVAR"));

    const mapProperties={
        center: {lat: 5.202805 , lng: -74.035814},
        zoom:8,
      }
      // Esta es la configuración de las propiedades del mapa en un objeto JSON called mapPropierties
      const map = new google.maps.Map(document.getElementById('map'), mapProperties);

      const  parquesTotales= obtenerCoordenadasParques(parques);
      

      console.log(parquesTotales)
      var i=0; //variable iteradora

      

      while (i<parquesTotales.length){ // ciclo para recorrer cada trazo de cicloruta
        
        console.log(typeof(parquesTotales[i].NumeroLocalidad));
        if(parquesTotales[i].NumeroLocalidad==19){//aquí se filtra la localidad que se quiere mostrar
        
            
        var flightPath = new google.maps.Polygon({
              path: parquesTotales[i].coordenadas, // variable encargada de alamacenar cada una de los trazo de ciclo ruta
              geodesic: true,
              strokeColor: '#FF0000',
              strokeOpacity: 1.0,
              strokeWeight: 2
          });

          flightPath.setMap(map);

        
          marker = null;

             var marker = new google.maps.Marker({map: map, position: parquesTotales[i].coordenadas[0]});
             attachInfo(marker,`nombreParque:${parquesTotales[i].nombreParque}, 
                                              <br> upz: ${parquesTotales[i].id_Upz},
                                              <br>tipoParque: ${parquesTotales[i].tipoParque},
                                              <br>area[m2]:${parquesTotales[i].SHAPE_Area},
                                              <br>localidad:${parquesTotales[i].NumeroLocalidad}`);
        

          
            /**
              forma en el que se dibujan lineas en un mapa
              
              Con el método set del objeto flightPath se colocan los puntos  que se encuentran 
              en el array que se carga en la varible path del objeto flightPath
          **/ 
        }
          i++; // aumento de la variable iteradora
           
    }



}


function attachInfo(marker, Message) {
  var infowindow = new google.maps.InfoWindow({
    content: Message
  });

  marker.addListener('click', function() {
    infowindow.open(marker.get('map'), marker);
  });
}









const localidadesBogota= {

  15:"L.ANT.NARI?O",
  12:"L.B.UNIDOS",
  7: "L.BOSA",
  19: "L.C.BOLIVAR",
  17: "L.CANDELARIA",
  2:"L.CHAPINERO",
  10:"L.ENGATIVA",
  9:"L.FONTIBON",
  8:"L.KENNEDY",
  14:"L.MARTIRES",
  16:"L.PTE.ARANDA",
  18:"L.R.URIBE",
  4:"L.SN.CRISTOBAL",
  3:"L.STA.FE",
  11:"L.SUBA",
  20:"L.SUMAPAZ",
  13:"L.TEUSAQUILLO",
  6:"L.TUNJUELITO",
  1:"L.USAQUEN",
  5:"L.USME"
  
  }
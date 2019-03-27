
var lat;// = 52.22967560;
var lon;// = 21.01222870;

var station = {
  name:"",
  bikes:[],
  bikeNum:[],
};

var tt = 567;
var bikes=[];

L.mapbox.accessToken = 'pk.eyJ1Ijoia29uZHppb3JmIiwiYSI6ImNqMTJpdjIxZDAwM3YyeG10aDRwaGxscG8ifQ.OVBNkyIz1FcwI7FL6_KEqw';
var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([52.22967560, 21.01222870], 13);

// Define an icon called cssIcon
var cssIcon = L.divIcon({
  // Specify a class name we can refer to in CSS.
  className: 'css-icon',
  // Set marker width and height
  iconSize: [25, 25],
  html: 'test' /// TUUUUUUUU
});
// Control geolocalización

L.control.locate({
       locateOptions: {
               maxZoom: 15
}}).setPosition('topright').addTo(map);

//===================================================
var xmlDoc;

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
    }
};
//zczytanie plikow
// for (var i = 0; i < 20; i++) {
//   xhttp.open("GET", "nextbike-official("+i+").xml", true);
//   xhttp.send();
//   xmlDoc = xml.responseXML;
// }

//148 wroclaw, 192 poznan, 202 opole, 245 bialystok, 247 konstancin jeziorna
//251 lublin 255 grodzisk mazowiecki, 342 katowice 400 radom, 330 łódź
// 346 szczecin, 359 michalowice, 363 legnica, 393 gliwice, 339 stalowa wola
//412 zgierz, 411 pszczyna, 413 tychy,

xhttp.open("GET", "https://nextbike.net/maps/nextbike-official.xml?city=210", true);
// xhttp.open("GET", "http://localhost/xml/nextbike-official.xml", true); /// test z dysku
xhttp.send();



function myFunction(xml) {
     xmlDoc = xml.responseXML;
     var place =xmlDoc.getElementsByTagName("place");
     var bike;
     var icon= L.divIcon({className: 'css-iconE'});

     var markerHtmlStyles = `
     width: 20px;
     height: 20px;
     display: block;
     border: 1px;
     border-style: solid;
     border-color: rgba(0, 0, 0, 0.81);
     top: 10px;
     border-radius: 50%;
     text-align: center;
     font-size: 15px;
     font-weight: bold;
     `
     ;

     function getColor(d) {
         return d > 40 ? 'rgba(8,48,107,0.5)' :
                d > 30  ? 'rgba(8,81,156,0.5)' :
                d > 20  ? 'rgba(33,113,181,0.5)' :
                d > 15  ? 'rgba(66,146,198,0.5)' :
                d > 10   ? 'rgba(107,174,214,0.5)' :
                d > 5   ? 'rgba(158,202,225,0.5)' :
                d >= 1   ? 'rgba(198,219,239,0.5)' :
                            'rgba(255, 0, 0, .1)';

     }

     function markerHTMLcolor(num){
      return ' background-color: '+ getColor(num) +';' ;
    }

    function markerHTMLsize(num){
        var wielkosc =20+num/2;
      return ' width: '+ wielkosc+ 'px; height: '+wielkosc +'px;';
    }

    for (var i = 0; i < place.length; i++) {
      lat = +place[i].attributes[1].nodeValue;
      lon = +place[i].attributes[2].nodeValue;
      bike = +place[i].attributes[6].nodeValue;
      bikes.push(bike);
      // if(bike===0 ){
        L.marker([lat, lon], {icon: new L.divIcon({html:'<span style="'+markerHtmlStyles+markerHTMLcolor(bike)+markerHTMLsize(bike)+'" >'+bike+'</span>', className:'css-iconE', iconSize: [20+bike/2, 20+bike/2]})}).addTo(map);
        // continue;  // wersja probna z kolorami w zaleznosci od ilosci plynnymi

        // L.marker([lat, lon], {icon: new L.divIcon({html:bike, className:'css-iconE', iconSize: [20, 20]})}).addTo(map);
        // continue;

      // }else {
      //     L.marker([lat, lon], {icon: new L.divIcon({html:bike, className:'css-icon20', iconSize: [20+bike/2, 20+bike/2]})}).addTo(map);
      // }
    }
    //console.log(Math.max(...bikes));
    var maxRow = place[indexOfMax(bikes)].attributes[3].nodeValue;
    console.log(maxRow);

    lat = +place[indexOfMax(bikes)].attributes[1].nodeValue;
    lon = +place[indexOfMax(bikes)].attributes[2].nodeValue;
    bike = +place[indexOfMax(bikes)].attributes[6].nodeValue;
    L.marker([lat, lon], {icon: new L.divIcon({ className:'css-iconM', iconSize: [20+bike/2, 20+bike/2]})}).addTo(map);
}
//===================================================

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }
    var max = arr[0];
    var maxIndex = 0;
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
}

function slide() {
    var x = document.getElementById("myRange").value;
    // console.log(x);
}

function showVal(newVal){
  console.log(newVal);
}

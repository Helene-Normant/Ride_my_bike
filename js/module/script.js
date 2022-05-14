


//appel de l'API : https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=&rows=3&facet=name&facet=is_installed&facet=is_renting&facet=is_returning&facet=nom_arrondissement_communes&geofilter.distance=${latitude}%2C+${longitude}%2C500

var options = {
  // Asking accuracy in geolocalisation
  enableHighAccuracy: true,
  // Time in milliseconds to use error function.
  timeout: 5000,
  //Is a positive long value indicating the maximum age in milliseconds of a possible cached position
  //that is acceptable to return. If set to 0, it means that the device cannot use a cached position and
  //must attempt to retrieve the real current position.
  maximumAge: 0
};

// this function returns the number of available bikes at a given station
async function getABike(latitude, longitude) {
  try {
    let response = await fetch(`https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=&rows=3&facet=name&facet=is_installed&facet=is_renting&facet=is_returning&facet=nom_arrondissement_communes&geofilter.distance=${latitude}%2C+${longitude}%2C500`)
    // connecting ourselves to the Paris City Hall API.
    let result = await response.json()
    return result // return promise
  } catch (err) {
    console.log(err);
  }
}

// Transform promise of GetABike in object.
function transformPromise(latitude, longitude) {
  getABike(latitude, longitude).then(function (result) {
    //console.log(result)
    initGauges(result)
    map(result, latitude, longitude)
  })
}

function success(pos) {
  //A callback function that takes a GeolocationPosition object as its sole input parameter.
  //Save localisation
  var crd = pos.coords;
  let latitude = crd.latitude;
  let longitude = crd.longitude
  // Use getABike function with latitude and longitude in arguments
  transformPromise(latitude, longitude);
  //transformPromise(48.852962091034826, 2.3645445692675127);
}

function error(err) {
  //An optional callback function that takes a GeolocationPositionError object as its sole input parameter.
  console.warn(`ERREUR (${err.code}): ${err.message}`);
}



/* BEGING gauge fonction */
function initGauges(resultPromise) {
  document.getElementById("name_station1").innerHTML = resultPromise.records[0].fields.name
  document.getElementById("name_station2").innerHTML = resultPromise.records[1].fields.name
  document.getElementById("name_station3").innerHTML = resultPromise.records[2].fields.name
  var g = new JustGage({
    id: "gauge",
    value: resultPromise.records[0].fields.ebike,// = avaible electric bike
    min: 0,
    max: resultPromise.records[0].fields.capacity, // = capacity
    donut: true,
    label: "Electric",
    levelColors: ["#75cff0"],
    shadowOpacity: 0.5,
    gaugeWidthScale: 0.8,
    relativeGaugeSize: true,
    title: ""
  });

  var g2 = new JustGage({
    id: "gauge2",
    value: resultPromise.records[0].fields.mechanical,//= avaible mechanical bike
    min: 0,
    max: resultPromise.records[0].fields.capacity,
    donut: true,
    label: "Mechanical",
    levelColors: ["#b6e49e"],
    shadowOpacity: 0.5,
    gaugeWidthScale: 0.8,
    relativeGaugeSize: true,
    title: ""
  });

  var g3 = new JustGage({
    id: "gauge3",
    value: resultPromise.records[0].fields.numdocksavailable, // free dock
    min: 0,
    max: resultPromise.records[0].fields.capacity,// total dock
    donut: true,
    label: "Dock",
    levelColors: ["#ead2da"],
    shadowOpacity: 0.5,
    gaugeWidthScale: 0.8,
    relativeGaugeSize: true,
    title: ""
  });

  var gEtage2 = new JustGage({
    id: "gauge-etg2",
    value: resultPromise.records[1].fields.ebike,
    min: 0,
    max: resultPromise.records[1].fields.capacity,
    donut: true,
    label: "Electric",
    levelColors: ["#75cff0"],
    shadowOpacity: 0.5,
    gaugeWidthScale: 0.8,
    relativeGaugeSize: true,
    title: ""
  });

  var g2Etage2 = new JustGage({
    id: "gauge2-etg2",
    value: resultPromise.records[1].fields.mechanical,
    min: 0,
    max: resultPromise.records[1].fields.capacity,
    donut: true,
    label: "Mechanical",
    levelColors: ["#b6e49e"],
    shadowOpacity: 0.5,
    gaugeWidthScale: 0.8,
    relativeGaugeSize: true,
    title: ""
  });

  var g3Etage2 = new JustGage({
    id: "gauge3-etg2",
    value: resultPromise.records[1].fields.numdocksavailable,
    min: 0,
    max: resultPromise.records[1].fields.capacity,
    donut: true,
    label: "Dock",
    levelColors: ["#ead2da"],
    shadowOpacity: 0.5,
    gaugeWidthScale: 0.8,
    relativeGaugeSize: true,
    title: ""
  });
  var gEtage3 = new JustGage({
    id: "gauge-etg3",
    value: resultPromise.records[2].fields.ebike,
    min: 0,
    max: resultPromise.records[2].fields.capacity,
    donut: true,
    label: "Electric",
    levelColors: ["#75cff0"],
    shadowOpacity: 0.5,
    gaugeWidthScale: 0.8,
    relativeGaugeSize: true,
    title: ""
  });

  var g2Etage3 = new JustGage({
    id: "gauge2-etg3",
    value: resultPromise.records[2].fields.mechanical,
    min: 0,
    max: resultPromise.records[2].fields.capacity,
    donut: true,
    label: "Mechanical",
    levelColors: ["#b6e49e"],
    shadowOpacity: 0.5,
    gaugeWidthScale: 0.8,
    relativeGaugeSize: true,
    title: ""
  });

  var g3Etage3 = new JustGage({
    id: "gauge3-etg3",
    value: resultPromise.records[2].fields.numdocksavailable,
    min: 0,
    max: resultPromise.records[2].fields.capacity,
    donut: true,
    label: "Dock",
    levelColors: ["#ead2da"],
    shadowOpacity: 0.5,
    gaugeWidthScale: 0.8,
    relativeGaugeSize: true,
    title: ""
  });

}
/* END gauge fonction */

//MAP BEGING//
function map(result, latitude, longitude) {
  //Create Map
  mapboxgl.accessToken = 'pk.eyJ1Ijoib3NsYW5uZSIsImEiOiJja3NweXQ5eDQwN3N1MnBucTRpczY1dXAyIn0.OsggNoy1h_GzZk5ndqunKQ';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [longitude, latitude], // starting position [lng, lat]
    zoom: 13 // starting zoom
  })

  //Create Position marker
  // add markers to map

    // create a HTML element for each feature
    const el1 = document.createElement('div');
    el1.className = 'marker1';

    // make a marker for each feature and add to the map
  const marker1 = new mapboxgl.Marker({ color: 'red' })
    .setLngLat([longitude, latitude])
    .setPopup(new mapboxgl.Popup({ anchor: 'top', offset: 15 })
      .setHTML(`<span><strong>You are here !</span></strong>`))
    .addTo(map);


  //Create Markers Station
  for (let i = 0; i <= 2; i++) {
    let latitudeStation = result.records[i].fields.coordonnees_geo[0]
    let longitudeStation = result.records[i].fields.coordonnees_geo[1]
    /*let addressName = getAddress(latitudeStation, longitudeStation);
    let printAddress = async () => {
      const a = await addressName;
      console.log(a)
      return a
    }
    console.log(printAddress())
    //console.log(addressName);*/
    const el = document.createElement('div');
    el.id = 'marker';
    // Create a Marker and add it to the map.
    const maker = new mapboxgl.Marker()
      .setLngLat([longitudeStation, latitudeStation])
      .setPopup(new mapboxgl.Popup({ anchor: 'top', offset: 15 })
        .setHTML(`<span><strong>${result.records[i].fields.name}</span></strong><br>
        <span><strong>Distance:</strong> ${Math.floor(result.records[i].fields.dist)} meters</span><br>`))
        /*<span>${printAddress()}</span>`))*/
      .addTo(map);
  }
}
//MAP END//

// D3JS ANIMATION

function Bubble(option) {

  var _defaultOption = {
    width: 300,
    height: 300,
    padding: 1.5,
    data: '',
    conEle: ''
  };

  option = $.extend(true, _defaultOption, option);

  this.width = option.width;
  this.height = option.height;
  this.padding = option.padding;
  this.data = option.data;
  this.conEle = option.conEle;
  this.mouseenter = function (d, node) { }

  this.mouseleave = function (d, node) { }

}

Bubble.prototype.init = function () {
  var that = this,
    
    bubble = d3.layout.pack()
      .sort(null)
      .size([that.width, that.height])
      .padding(that.padding),
    
    svg = d3.select(that.conEle).append("svg")
      .attr("width", that.width)
      .attr("height", that.height);
  
  if (typeStr(that.data) == '[object string]') {
    d3.json(that.data, function (error, data) {
      if (error) throw error;
      
      data = dataHandle(data);
      render(svg, bubble, that, data);
    })
  } else {
    render(svg, bubble, that, dataHandle(that.data));
  }

}

function typeStr(obj) {
  return Object.prototype.toString.call(obj).toLowerCase();
}

//Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(root) {
  var classes = [];                                                                                        //存储结果的数组
  /*
   * 自定义递归函数
   * 第二个参数指传入的json对象
   */
  function recurse(name, node) {
    if (node.children)                                                                                   //如果有孩子结点 （这里的children不是自带的，是json里面有的）
    {
      node.children.forEach(function (child) {                                                          //将孩子结点中的每条数据
        recurse(node.name, child);
      })
    }
    else {
      //如果自身是孩子结点的，将内容压入数组
      classes.push({ name: node.name, value: node.size, props: node.props })
    };
  }
  recurse(null, root);
  return { children: classes };
}

function render(view, layout, context, data, cb) {
  var node = view.selectAll(".node")
    //绑定数据（配置结点）
    .data(layout.nodes(classes(data))
      .filter(function (d) {
        //数据过滤，满足条件返回自身（没孩子返回自身，有孩子不返回，这里目的是去除父节点）
        return !d.children;
      }))
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", function (d) {
      //设定g移动
      return "translate(" + d.x + "," + d.y + ")";
    }),
    usingNodes = node.filter(function (d) {
      return d.props.using;
    }),
    time = +new Date(),
    duration = 1000,
    strokeWidth = 0;

  node.append("circle")
    .attr("r", function (d) {
      //设置圆的半径
      return d.r;
    })
    .style("fill", function (d) {
      //为圆形填充颜色
      return d.props.color;
    })
    .style("fill-opacity", 0.8);

  node.append("text")
    .attr("dy", ".3em")
    //设置文本对齐
    .style("text-anchor", "middle")
    .style("font-size", '10px')
    .style("fill", "#fff")
    //根据半径的大小来截取对应长度字符串(很重要)
    .text(function (d) {
      return d.name.substring(0, d.r / 3);
    });

  function animate() {
    var nowTime = +new Date();
    if ((nowTime - duration) > time) {
      time = nowTime;
      strokeWidth = 0;
    }

    strokeWidth += 0.6;
    //strokeWidth >10?strokeWidth=10:strokeWidth += 1;
    usingNodes.select("circle")
      .style("stroke-width", strokeWidth + 'px')
      .style("stroke-opacity", '0.3')
      .style("stroke", function (d) {
        return d.props.color;
      });

    requestAnimationFrame(animate);
  }

  animate();

  node.on('mouseenter', function (d) {
    var node = this;
    context.mouseenter(d, node);
  })

  node.on('mouseleave', function (d) {
    var node = this;
    context.mouseleave(d, node);
  })


}


function dataHandle(data) {
  var result = {
    name: "flare",
    children: []
  }
  data.forEach(function (ele) {
    result.children.push({
      name: ele.name,
      size: ele.value,
      props: ele.props
    });
  });
  return result;
}

function createInfoTip(d) {
  var html = '<div class="node-info"><ul>';
  html += '<li class="info-title"><span>' + d.name + '</span></li>';
  html += '<li class="info-content"><i class="bg-normal"></i><span class="info-content-label">' +
    '</span><span class="info-content-text">' + d.value + '</span></li>';
  html += '<li class="info-content"><i class="bg-abnormal"></i><span class="info-content-label">' +
    '</span><span class="info-content-text">' + d.props.abnormalFlow + '</span></li>';
  html += '</ul></div>';

  return html;
}


function createBubbleChart(data) {
  let total = []
  for (let i = 0; i < data.records.length; i++) {
    var entry = {
      name: data.records[i].fields.name,
      value: data.records[i].fields.capacity,
      props: {
        abnormal: false,
        abnormalFlow: 0,
        color: "#75cff0",
        using: false
      }
    };
    total.push(entry)
  }
   var option = {
    data: total,
    conEle: '#bubble',
    width: 1000,
    height: 800,
    padding: 1
    }

 var bubble = new Bubble(option);

 bubble.mouseenter = function (d, node) {
   document.getElementById("infobubble").innerHTML = `<span><strong>${d.name}</span></strong><br>
        <span><strong>Capacity:</strong> ${d.value} bikes</span><br>`
  var $con = $("#bubble");
  var rectBox = $con[0].getBoundingClientRect();
  d3.select(node).style("cursor", "pointer");

  $con.append(createInfoTip(d));
  $(".node-info").css({
     left: d3.event.x + 20 - rectBox.left,
     top: d3.event.y + 20 - rectBox.top
   }).show();
 }
bubble.mouseleave = function (d) {
  $(".node-info").remove();
}
  bubble.init()
}

function getData() {
  fetch("https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=&rows=100&facet=name&facet=is_installed&facet=is_renting&facet=is_returning&facet=nom_arrondissement_communes")
    .then(response => response.json())
    .then(data => createBubbleChart(data))
}


function main() {
  //Ask the user for their geolocation
  navigator.geolocation.getCurrentPosition(success, error, options);
  //initGauges();
  getData()

}



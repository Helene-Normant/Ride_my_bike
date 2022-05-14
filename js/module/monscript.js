

function initGauges(){
    var g = new JustGage({
        id: "gauge",
        value: 67,
        min: 0,
        max: 100,
        donut: true,
        label: "Electric",
        levelColors: ["#75cff0"],
        gaugeWidthScale: 0.8,
        relativeGaugeSize: false,
        title: ""
      });

      var g2 = new JustGage({
        id: "gauge2",
        value: 67,
        min: 0,
        max: 100,
        donut: true,
        label: "Mechanical",
        levelColors: ["#a365cf"],
        gaugeWidthScale: 0.8,
        relativeGaugeSize: false,
        title: ""
      });

      var g3 = new JustGage({
        id: "gauge3",
        value: 67,
        min: 0,
        max: 100,
        donut: true,
        label: "Dock",
        levelColors: ["#ead2db"],
        gaugeWidthScale: 0.8,
        relativeGaugeSize: false,
        title: ""
      });
      var gEtage2 = new JustGage({
        id: "gauge-etg2",
        value: 67,
        min: 0,
        max: 100,
        donut: true,
        label: "Electric",
        levelColors: ["#13b0d2"],
        gaugeWidthScale: 0.8,
        relativeGaugeSize: false,
        title: ""
      });

      var g2Etage2 = new JustGage({
        id: "gauge2-etg2",
        value: 67,
        min: 0,
        max: 100,
        donut: true,
        label: "Mechanical",
        levelColors: ["#a365cf"],
        gaugeWidthScale: 0.8,
        relativeGaugeSize: false,
        title: ""
      });

      var g3Etage2 = new JustGage({
        id: "gauge3-etg2",
        value: 67,
        min: 0,
        max: 100,
        donut: true,
        label: "Dock",
        levelColors: ["#ead2db"],
        gaugeWidthScale: 0.8,
        relativeGaugeSize: false,
        title: ""
      });
      var gEtage3 = new JustGage({
        id: "gauge-etg3",
        value: 67,
        min: 0,
        max: 100,
        donut: true,
        label: "Electric",
        levelColors: ["#13b0d2"],
        gaugeWidthScale: 0.8,
        relativeGaugeSize: false,
        title: ""
      });

      var g2Etage3 = new JustGage({
        id: "gauge2-etg3",
        value: 67,
        min: 0,
        max: 100,
        donut: true,
        label: "Mechanical",
        levelColors: ["#a365cf"],
        gaugeWidthScale: 0.8,
        relativeGaugeSize: false,
        title: ""
      });

      var g3Etage3 = new JustGage({
        id: "gauge3-etg3",
        value: 67,
        min: 0,
        max: 100,
        donut: true,
        label: "Dock",
        levelColors: ["#ead2db"],
        gaugeWidthScale: 0.8,
        relativeGaugeSize: false,
        title: ""
      });
      
}
initGauges();

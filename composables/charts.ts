import { graphic } from "echarts";
export function getPieChartsData(
  data: any,
  colorpallete: any,
  position = "0%",
  left = "center"
) {
  const pieChartOptions = {
    tooltip: {
      trigger: "item",
      formatter: "{b} : {c} ({d}%)",
    },
    legend: {
      orient: left === "center" ? "horizontal" : "vertical",
      top: position,
      left: left,
    },
    color: colorpallete,
    series: [
      {
        type: "pie",
        avoidLabelOverlap: false,
        radius: "60%",
        data: [...data],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  return pieChartOptions;
}
export function getCenterPieChartsData(
  data: any,
  colorpallete: any,
  title: string
) {
  const pieChartOptions = {
    title: {
      text: title,
      left: "center",
      top: "center",
      textStyle: {
        fontSize: 40,
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{b} : {c} ({d}%)",
    },
    color: colorpallete,
    series: [
      {
        label: {
          show: false,
        },
        type: "pie",
        data: [...data.filter(({ name, value }) => ({ name, value }))],
        radius: ["40%", "70%"],
      },
    ],
  };
  return pieChartOptions;
}
export function getGaugeChartsData(data: any, colorpallete: any) {
  const gaugeChartOption = {
    tooltip: {
      trigger: "item",
      formatter: "{b} : {c} ({d}%)",
    },
    legend: {
      orient: "horizontal",
      bottom: "45%",
      left: "center",
    },
    color: colorpallete,
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        center: ["50%", "100%"],
        // adjust the start and end angle
        startAngle: 180,
        endAngle: 360,
        data: [...data],
      },
    ],
  };
  return gaugeChartOption;
}
export function getBarChartData(data: any, colorpallete: any) {
  const barChartOption = {
    legend: {},
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },

    xAxis: {
      type: "category",
      data: data.map((val: any) => val.name),
      axisPointer: {
        type: "shadow",
      },
    },
    yAxis: { type: "value" },
    series: [
      {
        // name: "Direct",
        type: "bar",
        barWidth: "17%",
        // showBackground: true,
        data: data.map((val: any) => Number(val.value)),
        itemStyle: {
          barBorderRadius: 7,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#9BE0E9" },
            { offset: 1, color: "#1ED8D6" },
          ]),
        },
      },
    ],
  };

  return barChartOption;
}
export function getBarChartWithLineData(data: any, colorpallete: any) {
  const max = Math.max(...data.map((val) => Number(val.value)));
  const intervalPercentage = 0.4; // Adjust this percentage as needed
  const interval = Math.ceil(max * intervalPercentage);
  const adjustedMax = Math.ceil(max / interval) * interval;
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },

    xAxis: [
      {
        type: "category",
        data: data.map((val: any) => val.name),
        axisPointer: {
          type: "shadow",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        min: 0,
        max: adjustedMax,
        interval: interval,
      },
      {
        type: "value",
        max: max,
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
    ],
    series: [
      {
        type: "bar",
        data: data.map((val: any) => Number(val.value)),
        barWidth: "17%",

        itemStyle: {
          barBorderRadius: 7,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#9BE0E9" },
            { offset: 1, color: "#1ED8D6" },
          ]),
        },
      },

      {
        type: "line",

        yAxisIndex: 1,
        color: "#babbbd",
        data: data.map((val: any) => Number(val.value)),
      },
    ],
  };

  return option;
}
export function getStackedBarChartData(data: any, colorpallete: any) {
  const barChartOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },
    grid: { containLabel: true },
    xAxis: { name: "amount" },
    yAxis: {
      type: "category",
      data: data.map((val: any) => val.name),
      axisPointer: {
        type: "shadow",
      },
    },

    visualMap: {
      orient: "horizontal",
      left: "center",
      min: 10,
      max: 100,
      show: false,
      // Map the score column to color
      dimension: 0,

      color: colorpallete,
    },
    series: [
      {
        type: "bar",
        // barWidth: "20%",
        data: data.map((val: any) => Number(val.value)),
        encode: {
          // Map the "amount" column to X axis.
          x: "amount",
          // Map the "product" column to Y axis
          y: "product",
        },
        itemStyle: {
          barBorderRadius: 7,
        },
      },
    ],
  };

  return barChartOption;
}
export function getRingChart(
  data: any,
  colorpallete: any,
  position = "0%",
  left = "center"
) {
  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: left === "center" ? "horizontal" : "vertical",
      top: position,
      left: left,
    },
    color: colorpallete,
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [...data],
      },
    ],
  };
  return option;
}
export function getWorldCloudData(
  data: any,

) {
  const option = {
    tooltip: {},
    textStyle: {
      fontFamily: "sans-serif",
      fontWeight: "bold",
      // keepAspect: false,
      // sizeRange: [12,60],

   
      // Color can be a callback function or a color string
      color: function () {
        // Random color
        const tealRed = Math.round(Math.random() * 64);
        const tealGreenBlue = Math.round(Math.random() * 64) + 128;
        const watermelonRed = Math.round(Math.random() * 31) + 224;
        const watermelonGreen = Math.round(Math.random() * 80) + 48;
        const watermelonBlue = Math.round(Math.random() * 32) + 96;
  
        const randomColor =
          Math.random() < 0.5 // 50% chance for teal, 50% chance for watermelon
            ? `rgb(${tealRed},${tealGreenBlue},${tealGreenBlue})`
            : `rgb(${watermelonRed},${watermelonGreen},${watermelonBlue})`;
  
        return randomColor;
      },
    },
    series: [
      {
        type: "wordCloud",
        // gridSize:10,
        // shape: "circle",
        data: [
          ...data
        ],
      },
    ],
  };
  return option;
}

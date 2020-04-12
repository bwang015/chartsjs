import React, { Component } from 'react'
import Chart from "chart.js";
import classes from "./StackedBarGraph.module.css";
import { Color } from "./../../Utils/enums";
import {
    transactionRevenue,
    serviceRevenue,
    hardwareRevenue,
    quarterLabels,
    bitcoinRevenue,
    units,
} from "../../square_financials";
let myLineChart;

//--Chart Style Options--//
Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
//--Chart Style Options--//

export default class StackedBarGraph extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate() {
        this.buildChart();
    }

    buildChart = () => {
        const myChartRef = this.chartRef.current.getContext("2d");

        if (typeof myLineChart !== "undefined") myLineChart.destroy();

        myLineChart = new Chart(myChartRef, {
            type: "bar",
            data: {
                labels: quarterLabels,
                datasets: [
                    {
                        label: "Transaction Revenue",
                        data: transactionRevenue,
                        fill: false,
                        backgroundColor: Color.BLUE,
                    },
                    {
                        label: "Service Revenue",
                        data: serviceRevenue,
                        backgroundColor: Color.RED,
                    },
                    {
                        label: "Hardware Revenue",
                        data: hardwareRevenue,
                        backgroundColor: Color.BLACK,
                    },
                    {
                        label: "Bitcoin Revenue",
                        data: bitcoinRevenue,
                        backgroundColor: Color.ORANGE,
                    }
                ]
            },
            options: {
                title: {
                    text: "Revenue by Segments",
                    display: true,
                },
                legend: {
                    display: true,
                },
                scales: {
                    xAxes: [{
                        stacked: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Quarter',
                        }
                    }],
                    yAxes: [{
                        stacked: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'In ' + units,
                        }
                    }]
                }
            }
        });

    };

    render() {

        return (
            <div className={classes.graphContainer}>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}

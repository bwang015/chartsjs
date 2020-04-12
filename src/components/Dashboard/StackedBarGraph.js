import React, { Component } from 'react'
import Chart from "chart.js";
import classes from "./Graph.module.css";
let stackedBarGraph;

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

        if (typeof stackedBarGraph !== "undefined") stackedBarGraph.destroy();
        const { labels, datasets, units } = this.props;

        stackedBarGraph = new Chart(myChartRef, {
            type: "bar",
            data: {
                labels: labels,
                datasets: datasets
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

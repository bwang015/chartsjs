import React, { Component } from 'react';
import classes from "./Dashboard.module.css";
import StackedBarGraph from "../../components/Dashboard/StackedBarGraph";
import chartIcon from "../../assets/chart-icon.svg";
import {
    transactionRevenue,
    serviceRevenue,
    quarterLabels,
    hardwareRevenue,
    bitcoinRevenue,
    getTotalRevenue,
    units
} from "../../square_financials";
import {Color} from "../../Utils/enums";

export default class Dashboard extends Component {
    // handleButtonClick = e => {
    //     const { value } = e.target;
    //     const isAnnual = value === "annual";
    //
    //     const newData = isAnnual ? managerData : managerQuarterData;
    //     const newLabels = isAnnual ? yearLabels : quarterLabels;
    //     const newAverage = isAnnual ? nationalAverageData : nationalAverageQuarterData;
    //
    //     this.setState({
    //         data: newData,
    //         average: newAverage,
    //         labels: newLabels
    //     })
    // };

    render() {
        const datasets = [
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
                backgroundColor: Color.SILVER,
            },
            {
                label: "Bitcoin Revenue",
                data: bitcoinRevenue,
                backgroundColor: Color.ORANGE,
            },
            {
                label: "Total Revenue",
                data: getTotalRevenue(),
                fill: false,
                type: 'line',
                borderColor: Color.BLACK,
            }
        ];

        return (
            <div className={classes.container}>
                <header>
                    <img src={chartIcon} alt="bar chart icon" />
                    <h1>Square Financial Dashboard</h1>
                </header>

                <div className={classes.buttonContainer}>
                    <button
                        value="annual"
                        onClick={this.handleButtonClick}
                    >
                        Annual
                    </button>

                    <button
                        value="lastquarter"
                        onClick={this.handleButtonClick}
                    >
                        Last Quarter
                    </button>
                </div>

                <StackedBarGraph
                    labels={quarterLabels}
                    datasets={datasets}
                    units={units}
                />
            </div>
        )
    }
}

import React, { Component } from 'react';
import classes from "./Dashboard.module.css";
import StackedBarGraph from "../../components/Dashboard/StackedBarGraph";
import chartIcon from "../../assets/chart-icon.svg";
import {
    transactionRevenue,
    serviceRevenue,
    quarterLabels,
    hardwareRevenue,
    bitcoinRevenue
} from "../../square_financials";

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
        return (
            <div className={classes.container}>
                <header>
                    <img src={chartIcon} alt="bar chart icon" />
                    <h1>Square Financial Dashboard</h1>
                </header>

                {/*<div className={classes.buttonContainer}>*/}
                {/*    <button*/}
                {/*        value="annual"*/}
                {/*        onClick={this.handleButtonClick}*/}
                {/*    >*/}
                {/*        Annual*/}
                {/*    </button>*/}

                {/*    <button*/}
                {/*        value="lastquarter"*/}
                {/*        onClick={this.handleButtonClick}*/}
                {/*    >*/}
                {/*        Last Quarter*/}
                {/*    </button>*/}
                {/*</div>*/}

                <StackedBarGraph
                    transactionRevenue={transactionRevenue}
                    serviceRevenue={serviceRevenue}
                    hardwareRevenue={hardwareRevenue}
                    bitcoinRevenue={bitcoinRevenue}
                    labels={quarterLabels} />

            </div>
        )
    }
}

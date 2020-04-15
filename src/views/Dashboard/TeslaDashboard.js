import React, {Component} from 'react';
import * as TSLA from "../../data/tesla_financials";
import {Color} from "../../utils/enums";
import RevenueSegments from "../Widget/RevenueSegments";
import RevenueMultiplierGraph from "../Widget/RevenueMultiplierGraph";

class TeslaDashboard extends Component {
    constructor(props) {
        super(props);

        const essentials = {
            labels: TSLA.quarterLabels,
            units: TSLA.units,
            symbol: TSLA.symbol,
            stockName: "Tesla",
        };

        const stockInfo = {
            peakStockPrice: TSLA.peakStockPrice,
            currentStockPrice: TSLA.currentStockPrice,
        };

        this.state = {
            symbol: TSLA.symbol,
            estimates: TSLA.estimates,
            stockInfo: stockInfo,
            revenue: this.getRevenue(),
            essentials: essentials,
            totalRevenue: TSLA.getTotalRevenue(),
        };
    }

    getRevenue = () => {
        return {
            'Auto Sales Revenue': {
                data: TSLA.autoRevenue,
                color: Color.BLUE,
            },
            'Auto Leasing Revenue': {
                data: TSLA.autoLeaseRevenue,
                color: Color.RED,
            },
            'Energy Revenue': {
                data: TSLA.energyRevenue,
                color: Color.SILVER,
            },
            'Service Revenue': {
                data: TSLA.serviceRevenue,
                color: Color.ORANGE,
            }
        };
    };

    render() {
        return (
            <div className="App">
                <RevenueMultiplierGraph totalRevenue={this.state.totalRevenue} essentials={this.state.essentials} estimates={this.state.estimates} stockInfo={this.state.stockInfo}/>
                <RevenueSegments revenue={this.state.revenue} totalRevenue={this.state.totalRevenue} essentials={this.state.essentials}/>
            </div>
        );
    }
}

export default TeslaDashboard;

import React, {Component} from 'react';
import BarChart from "../../components/BarChart";
import {Color, GraphNames, Stock} from "../../utils/enums";
import {
    setAxesLabel,
    setBarDataValues,
    setGraphTitle,
    setHighLowAnnotation,
    setOwnedStockPriceAnnotation,
    setPeakAnnotation,
} from "../../utils/graph_helper";
import _ from "lodash";
import {Options} from "../../utils/common_objects";
import {loadQuotesForStock} from "../../api/iex";
import {getFutureSharePrice, getFutureTTMRevenue, getPeakPriceToSales, getPriceToSales} from "../../utils/common_utils";

class RevenueMultiplierGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            essentials: props.essentials,
            totalRevenue: props.totalRevenue,
            estimates: props.estimates,
            stockInfo: props.stockInfo,
        }
    }


    static getDerivedStateFromProps(props, state) {
        if (props !== state) {
            return {
                essentials: props.essentials,
                totalRevenue: props.totalRevenue,
                estimates: props.estimates,
                stockInfo: props.stockInfo,
            };
        }

        return null;
    }

    componentDidMount() {
        this.getStockInformation();
    }

    getStockInformation() {
        loadQuotesForStock(this.state.essentials.symbol).then(res => {
            const price = _.get(res, Stock.LATEST_PRICE);
            const yearHigh = _.get(res, Stock.YEAR_HIGH);
            const yearLow = _.get(res, Stock.YEAR_LOW);
            const marketCap = _.get(res, Stock.MARKET_CAP);
            const priceToSales = getPriceToSales(this.state.totalRevenue, this.state.essentials.units, marketCap);
            const peakPriceToSales = getPeakPriceToSales(this.state.stockInfo.peakStockPrice, price, marketCap, this.state.totalRevenue, this.state.essentials.units);
            const futureTTMRevenue = getFutureTTMRevenue(this.state.totalRevenue, this.state.essentials.units, this.state.estimates);
            const futureSharePrice = getFutureSharePrice(marketCap, price, peakPriceToSales, futureTTMRevenue);

            let options = _.cloneDeep(Options);
            setGraphTitle(options, 'Current Stock Price');
            setAxesLabel(options, '% of Revenue Multiplier Discount', `${this.state.essentials.stockName} Stock`);
            setHighLowAnnotation(yearHigh, yearLow, options);
            setPeakAnnotation(futureSharePrice, options);
            setOwnedStockPriceAnnotation(this.state.stockInfo.currentStockPrice, options);

            this.setState({
                chartData: {
                    labels: [`Current vs Peak Revenue Multiplier: [${priceToSales}x, ${peakPriceToSales}x]`],
                    datasets: [
                        setBarDataValues('Stock Price', [price], Color.BLUE),
                    ],
                },
                options: options,
            });
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="chart">
                <BarChart chartData={this.state.chartData} options={this.state.options}/>
            </div>
        )
    }
}

export default RevenueMultiplierGraph;

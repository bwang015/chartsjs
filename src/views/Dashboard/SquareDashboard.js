import React, {Component} from 'react';
import { SQ } from "../../square_financials";
import _ from "lodash";
import {
    getGrossProfit,
    getRevenuePercentage,
    getRevenueYOY,
    getFreeCashFlow,
    getShareholderEquity,
} from "../../utils/common_utils";
import { Color, GraphNames, Stock } from "../../utils/enums";
import {Annotation, Options} from "../../utils/common_objects";
import {
    setGraphTitle,
    setAxesLabel,
    setBarDataValues,
    setLineDataValues,
} from "../../utils/graph_helper";
import RevenueSegments from "../Widget/RevenueSegments";
import RevenueMultiplierGraph from "../Widget/RevenueMultiplierGraph";
import RevenueGrowthYOY from "../Widget/RevenueGrowthYOY";

class SquareDashboard extends Component {
    constructor(props) {
        super(props);

        const revenue = {
            'Transactional Revenue': SQ.transactionRevenue,
            'Service Revenue': SQ.serviceRevenue,
            'Hardware Revenue': SQ.hardwareRevenue,
            'Bitcoin Revenue': SQ.bitcoinRevenue,
        };

        const revenueYOY = {
            'Transactional Revenue Y/Y Growth': SQ.transactionRevenue,
            'Service Revenue Y/Y Growth': SQ.serviceRevenue,
            'Hardware Revenue Y/Y Growth': SQ.hardwareRevenue,
            'Bitcoin Revenue Y/Y Growth': SQ.bitcoinRevenue,
        };

        const essentials = {
            labels: SQ.quarterLabels,
            units: SQ.units,
            symbol: SQ.symbol,
            stockName: "Square",
        };

        const estimates = SQ.estimates;

        const stockInfo = {
            peakStockPrice: SQ.peakStockPrice,
            currentStockPrice: SQ.currentStockPrice,
        };

        this.state = {
            options: Options,
            annotations: Annotation,
            symbol: SQ.symbol,
            revenue: revenue,
            essentials: essentials,
            estimates: estimates,
            stockInfo: stockInfo,
            revenueYOY: revenueYOY,
            totalRevenue: SQ.getTotalRevenue(),
        };
    }

    getGrossProfitData() {
        this.setState(prevState => {
            let options = _.cloneDeep(prevState.options);
            setGraphTitle(options, 'Gross Revenue Margins by Segments');
            setAxesLabel(options, `Percentage (%)`);
            return {
                [GraphNames.GROSS_PROFIT_SEGMENTS]: {
                    labels: SQ.quarterLabels,
                    datasets: [
                        setLineDataValues('Transactional Revenue Profit Margin', getGrossProfit(SQ.transactionRevenue, SQ.transactionCostOfGoods), Color.BLUE),
                        setLineDataValues('Service Revenue Profit Margin', getGrossProfit(SQ.serviceRevenue, SQ.serviceCostOfGoods), Color.RED),
                        setLineDataValues('Hardware Revenue Profit Margin', getGrossProfit(SQ.hardwareRevenue, SQ.hardwareCostOfGoods), Color.SILVER),
                        setLineDataValues('Bitcoin Revenue Profit Margin', getGrossProfit(SQ.bitcoinRevenue, SQ.bitcoinCostOfGoods), Color.ORANGE),
                        setLineDataValues('Total Gross Profit Margin', getGrossProfit(this.state.totalRevenue, SQ.totalCostOfGoods), Color.BLACK),
                    ],
                },
                [GraphNames.GROSS_PROFIT_SEGMENTS_OPTIONS]: options
            };
        });
    }

    getRevenueBySegmentPercentageData() {
        this.setState(prevState => {
            let options = _.cloneDeep(prevState.options);
            setGraphTitle(options, 'Gross Revenue Margins by Segments');
            setAxesLabel(options, 'Percentage (%)');
            return {
                [GraphNames.REVENUE_PERCENTAGE]: {
                    labels: SQ.quarterLabels,
                    datasets: [
                        setBarDataValues('Transactional Revenue', getRevenuePercentage(SQ.transactionRevenue, this.state.totalRevenue), Color.BLUE),
                        setBarDataValues('Service Revenue', getRevenuePercentage(SQ.serviceRevenue, this.state.totalRevenue), Color.RED),
                        setBarDataValues('Hardware Revenue', getRevenuePercentage(SQ.hardwareRevenue, this.state.totalRevenue), Color.SILVER),
                        setBarDataValues('Bitcoin Revenue', getRevenuePercentage(SQ.bitcoinRevenue, this.state.totalRevenue), Color.ORANGE),
                    ],
                },
                [GraphNames.REVENUE_PERCENTAGE_OPTIONS]: options,
            };
        });
    }

    getRevenueYOYData() {
        this.setState(prevState => {
            let options = _.cloneDeep(prevState.options);
            setGraphTitle(options, 'Revenue Y/Y By Segments');
            setAxesLabel(options, 'Percentage (%)');
            return {
                [GraphNames.REVENUE_YOY]: {
                    labels: SQ.quarterLabels,
                    datasets: [
                        setLineDataValues('Transactional Revenue Y/Y Growth', getRevenueYOY(SQ.transactionRevenue), Color.BLUE),
                        setLineDataValues('Service Revenue Y/Y Growth', getRevenueYOY(SQ.serviceRevenue), Color.RED),
                        setLineDataValues('Hardware Revenue Y/Y Growth', getRevenueYOY(SQ.hardwareRevenue), Color.SILVER),
                        setLineDataValues('Bitcoin Revenue Y/Y Growth', getRevenueYOY(SQ.bitcoinRevenue), Color.ORANGE),
                        setLineDataValues('Total Revenue Y/Y Growth', getRevenueYOY(this.state.totalRevenue), Color.BLACK),
                    ],
                },
                [GraphNames.REVENUE_YOY_OPTIONS]: options,
            };
        });
    }

    getRevenueOperatingIncomeExpensesData() {
        let options = _.cloneDeep(Options);
        setGraphTitle(options, 'Revenue, Operating Income and Expenses, and Net Income');
        setAxesLabel(options, 'In ' + SQ.units);
        this.setState({
            [GraphNames.REVENUE_OPERATIONS]: {
                labels: SQ.quarterLabels,
                datasets: [
                    setBarDataValues('Total Revenue', this.state.totalRevenue, Color.BLUE),
                    setBarDataValues('Total Operating Expenses', SQ.totalOperatingExpenses, Color.RED),
                    setBarDataValues('Total Operating Income', SQ.totalOperatingIncome, Color.SILVER),
                    setBarDataValues('Net Income', SQ.netIncome, Color.GREEN),
                ],
            },
            [GraphNames.REVENUE_OPERATIONS_OPTIONS]: options,
        });
    }

    getCashAndDebt() {
        let options = _.cloneDeep(Options);
        setGraphTitle(options, 'Cash and Debt');
        setAxesLabel(options, 'In ' + SQ.units);
        this.setState({
            [GraphNames.CASH]: {
                labels: SQ.quarterLabels,
                datasets: [
                    setBarDataValues('Cash and Cash Equivalents', SQ.cash, Color.BLUE),
                    setBarDataValues('Short Term Debt', SQ.currentDebt, Color.RED),
                    setBarDataValues('Long Term Debt', SQ.longTermDebt, Color.SILVER),
                ],
            },
            [GraphNames.CASH_OPTIONS]: options,
        });
    }

    getFreeCashFlow() {
        let options = _.cloneDeep(Options);
        setGraphTitle(options, 'Free Cash Flow');
        setAxesLabel(options, 'In ' + SQ.units);
        this.setState({
            [GraphNames.FREE_CASH_FLOW]: {
                labels: SQ.quarterLabels,
                datasets: [
                    setBarDataValues('Cash From Operations', SQ.cashFromOperations, Color.BLUE),
                    setBarDataValues('Cash From Investing', SQ.cashFromInvesting, Color.RED),
                    setBarDataValues('Free Cash Flow', getFreeCashFlow(SQ.cashFromOperations, SQ.cashFromInvesting), Color.GREEN),
                ],
            },
            [GraphNames.FREE_CASH_FLOW_OPTIONS]: options,
        });
    }

    getShareholderEquityData() {
        let options = _.cloneDeep(Options);
        setGraphTitle(options, 'Shareholder Equity');
        setAxesLabel(options, 'In ' + SQ.units);
        this.setState({
            [GraphNames.SHAREHOLDER_EQUITY]: {
                labels: SQ.quarterLabels,
                datasets: [
                    setBarDataValues('Total Assets', SQ.totalAssets, Color.BLUE),
                    setBarDataValues('Total Liabilities', SQ.totalLiabilities, Color.RED),
                    setBarDataValues('Shareholder Equity', getShareholderEquity(SQ.totalAssets, SQ.totalLiabilities), Color.BLACK),
                ],
            },
            [GraphNames.SHAREHOLDER_EQUITY_OPTIONS]: options
        });
    }



    render() {
        return (
            <div className="App">
                <RevenueMultiplierGraph totalRevenue={this.state.totalRevenue} essentials={this.state.essentials} estimates={this.state.estimates} stockInfo={this.state.stockInfo}/>
                <RevenueSegments revenue={this.state.revenue} totalRevenue={this.state.totalRevenue} essentials={this.state.essentials}/>
                <RevenueGrowthYOY essentials={this.state.essentials} revenueYOY={this.state.revenueYOY} totalRevenue={this.state.totalRevenue}/>
                {/*<LineChart chartData={this.state[GraphNames.GROSS_PROFIT_SEGMENTS]} options={this.state[GraphNames.GROSS_PROFIT_SEGMENTS_OPTIONS]}/>*/}
                {/*<BarChart chartData={this.state[GraphNames.REVENUE_PERCENTAGE]} options={this.state[GraphNames.REVENUE_PERCENTAGE_OPTIONS]}/>*/}
                {/*<BarChart chartData={this.state[GraphNames.REVENUE_OPERATIONS]} options={this.state[GraphNames.REVENUE_OPERATIONS_OPTIONS]}/>*/}
                {/*<BarChart chartData={this.state[GraphNames.CASH]} options={this.state[GraphNames.CASH_OPTIONS]}/>*/}
                {/*<BarChart chartData={this.state[GraphNames.FREE_CASH_FLOW]} options={this.state[GraphNames.FREE_CASH_FLOW_OPTIONS]}/>*/}
                {/*<BarChart chartData={this.state[GraphNames.SHAREHOLDER_EQUITY]} options={this.state[GraphNames.SHAREHOLDER_EQUITY_OPTIONS]}/>*/}
            </div>
        );
    }
}

export default SquareDashboard;

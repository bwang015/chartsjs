import React, {Component} from 'react';
import BarChart from '../../components/BarChart';
import LineChart from "../../components/LineChart";
import { SQ } from "../../square_financials";
import _ from "lodash";
import {
    getGrossProfit,
    getRevenuePercentage,
    getRevenueYOY,
    getFreeCashFlow,
    getShareholderEquity,
    getPriceToSales,
    getPeakPriceToSales,
    getFutureTTMRevenue,
    getFutureSharePrice,
} from "../../utils/common_utils";
import { Color, GraphNames, Stock } from "../../utils/enums";
import {Annotation, Options} from "../../utils/common_objects";
import {
    setGraphTitle,
    setAxesLabel,
    stackGraphs,
    setBarDataValues,
    setLineDataValues,
    setHighLowAnnotation,
    setPeakAnnotation,
    setOwnedStockPriceAnnotation
} from "../../utils/graph_helper";
import { loadQuotesForStock } from "../../api/iex";
import 'chartjs-plugin-annotation';
import chartIcon from "../../assets/chart-icon.svg";
import classes from "./Dashboard.module.css";

class SquareDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: Options,
            annotations: Annotation,
            symbol: SQ.symbol,
            totalRevenue: SQ.getTotalRevenue(),
        };
    }

    componentDidMount() {
        this.getRevenueSegmentsData();
        this.getRevenueYOYData();
        this.getGrossProfitData();
        this.getRevenueBySegmentPercentageData();
        this.getRevenueYOYData();
        this.getRevenueOperatingIncomeExpensesData();
        this.getCashAndDebt();
        this.getFreeCashFlow();
        this.getShareholderEquityData();
        this.getStockInformation();
    }

    handleButtonClick = e => {
        alert("Hello World!");
        // const { value } = e.target;
        // const isAnnual = value === "annual";
        //
        // const newData = isAnnual ? managerData : managerQuarterData;
        // const newLabels = isAnnual ? yearLabels : quarterLabels;
        // const newAverage = isAnnual ? nationalAverageData : nationalAverageQuarterData;
        //
        // this.setState({
        //     data: newData,
        //     average: newAverage,
        //     labels: newLabels
        // })
    }

    getStockInformation() {
        loadQuotesForStock(SQ.symbol).then(res => {
            const price = _.get(res, Stock.LATEST_PRICE);
            const yearHigh = _.get(res, Stock.YEAR_HIGH);
            const yearLow = _.get(res, Stock.YEAR_LOW);
            const marketCap = _.get(res, Stock.MARKET_CAP);
            const priceToSales = getPriceToSales(this.state.totalRevenue, SQ.units, marketCap);
            const peakPriceToSales = getPeakPriceToSales(SQ.peakStockPrice, price, marketCap, this.state.totalRevenue, SQ.units);
            const futureTTMRevenue = getFutureTTMRevenue(this.state.totalRevenue, SQ.units, SQ.estimates);
            const futureSharePrice = getFutureSharePrice(marketCap, price, peakPriceToSales, futureTTMRevenue);

            this.setState(prevState => {
                let options = _.cloneDeep(prevState.options);
                setGraphTitle(options, 'Current Stock Price');
                setAxesLabel(options, '% of Revenue Multiplier Discount', 'Square Stock');
                setHighLowAnnotation(yearHigh, yearLow, options);
                setPeakAnnotation(futureSharePrice, options);
                setOwnedStockPriceAnnotation(SQ.currentStockPrice, options);

                return {
                    [GraphNames.STOCK]: {
                        labels: [`Current vs Peak Revenue Multiplier: [${priceToSales}x, ${peakPriceToSales}x]`],
                        datasets: [
                            setBarDataValues('Stock Price', [price], Color.BLUE),
                        ],
                    },
                    [GraphNames.STOCK_OPTIONS]: options,
                }
            });
        }).catch(error => {
            console.log(error);
        });
    }

    getRevenueSegmentsData() {
        const data = {
            labels: SQ.quarterLabels,
            datasets: [
                setBarDataValues('Transactional Revenue', SQ.transactionRevenue, Color.BLUE),
                setBarDataValues('Service Revenue', SQ.serviceRevenue, Color.RED),
                setBarDataValues('Hardware Revenue', SQ.hardwareRevenue, Color.SILVER),
                setBarDataValues('Bitcoin Revenue', SQ.bitcoinRevenue, Color.ORANGE),
                setLineDataValues('Total Revenue', this.state.totalRevenue, Color.BLACK),
            ],
        };

        this.setState( prevState => {
            let options = _.cloneDeep(prevState.options);
            setGraphTitle(options, 'Revenue By Segments');
            setAxesLabel(options, `In ${SQ.units}`);
            stackGraphs(options);
            return {
                [GraphNames.REVENUE_SEGMENTS]: data,
                [GraphNames.REVENUE_SEGMENTS_OPTIONS]: options,
            };
        });
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
            setGraphTitle(options, 'Revenue Percentages by Segments');
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
            <div className={classes.container}>
                <header>
                    <img src={chartIcon} alt="bar chart icon"/>
                    <h1>Square Financials Dashboard</h1>
                </header>

                <div className={classes.buttonContainer}>
                    <button value="annual" onClick={this.handleButtonClick}> Annual </button>
                </div>

                <BarChart chartData={this.state[GraphNames.STOCK]} options={this.state[GraphNames.STOCK_OPTIONS]}/>
                <BarChart chartData={this.state[GraphNames.REVENUE_SEGMENTS]} options={this.state[GraphNames.REVENUE_SEGMENTS_OPTIONS]}/>
                <LineChart chartData={this.state[GraphNames.REVENUE_YOY]} options={this.state[GraphNames.REVENUE_YOY_OPTIONS]}/>
                <LineChart chartData={this.state[GraphNames.GROSS_PROFIT_SEGMENTS]} options={this.state[GraphNames.GROSS_PROFIT_SEGMENTS_OPTIONS]}/>
                <BarChart chartData={this.state[GraphNames.REVENUE_PERCENTAGE]} options={this.state[GraphNames.REVENUE_PERCENTAGE_OPTIONS]}/>
                <BarChart chartData={this.state[GraphNames.REVENUE_OPERATIONS]} options={this.state[GraphNames.REVENUE_OPERATIONS_OPTIONS]}/>
                <BarChart chartData={this.state[GraphNames.CASH]} options={this.state[GraphNames.CASH_OPTIONS]}/>
                <BarChart chartData={this.state[GraphNames.FREE_CASH_FLOW]} options={this.state[GraphNames.FREE_CASH_FLOW_OPTIONS]}/>
                <BarChart chartData={this.state[GraphNames.SHAREHOLDER_EQUITY]} options={this.state[GraphNames.SHAREHOLDER_EQUITY_OPTIONS]}/>
            </div>


        );
    }
}

export default SquareDashboard;

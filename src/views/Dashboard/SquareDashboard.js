import React, {Component} from 'react';
import BarChart from '../../components/BarChart';
import {SQ} from "../../square_financials";
import {
    getGrossProfit,
    getRevenuePercentage,
    getRevenueYOY,
    getFreeCashFlow,
    getShareholderEquity
} from "../../utils/common_utils";
import {Color, GraphNames, GraphType} from "../../utils/enums";
import LineChart from "../../components/LineChart";
import _ from "lodash";
import { Options } from "../../utils/common_objects";
import {setGraphTitle, setYAxesLabel, stackGraphs, setBarDataValues, setLineDataValues} from "../../utils/graph_helper";

export default class SquareDashboard extends Component {
    constructor() {
        super();

        this.state = {
            chartData: {},
            options: {}
        };

        this.totalRevenue = SQ.getTotalRevenue();
    }

    componentWillMount() {
        this.getRevenueSegmentsData();
        this.getGrossProfitData();
        this.getRevenueBySegmentPercentageData();
        this.getRevenueYOYData();
        this.getRevenueOperatingIncomeExpensesData();
        this.getCashAndDebt();
        this.getFreeCashFlow();
        this.getShareholderEquityData();
    }

    getRevenueSegmentsData() {
        let options = _.cloneDeep(Options);
        setGraphTitle(options, 'Revenue By Segments');
        setYAxesLabel(options, 'Percentage (%)');
        stackGraphs(options);

        this.setState({
            [GraphNames.REVENUE_SEGMENTS]: {
                labels: SQ.quarterLabels,
                datasets: [
                    setBarDataValues('Transactional Revenue', SQ.transactionRevenue, Color.BLUE),
                    setBarDataValues('Service Revenue', SQ.serviceRevenue, Color.RED),
                    setBarDataValues('Hardware Revenue', SQ.hardwareRevenue, Color.SILVER),
                    setBarDataValues('Bitcoin Revenue', SQ.bitcoinRevenue, Color.ORANGE),
                    setLineDataValues('Total Revenue', this.totalRevenue, Color.BLACK),
                ],
            },
            [GraphNames.REVENUE_SEGMENTS_OPTIONS]: options
        });
    }

    getGrossProfitData() {
        let options = _.cloneDeep(Options);
        setGraphTitle(options, 'Gross Revenue Margins by Segments');
        setYAxesLabel(options, 'In ' + SQ.units);
        this.setState({
            [GraphNames.GROSS_PROFIT_SEGMENTS]: {
                labels: SQ.quarterLabels,
                datasets: [
                    setLineDataValues('Transactional Revenue Profit Margin', getGrossProfit(SQ.transactionRevenue, SQ.transactionCostOfGoods), Color.BLUE),
                    setLineDataValues('Service Revenue Profit Margin', getGrossProfit(SQ.serviceRevenue, SQ.serviceCostOfGoods), Color.RED),
                    setLineDataValues('Hardware Revenue Profit Margin', getGrossProfit(SQ.hardwareRevenue, SQ.hardwareCostOfGoods), Color.SILVER),
                    setLineDataValues('Bitcoin Revenue Profit Margin', getGrossProfit(SQ.bitcoinRevenue, SQ.bitcoinCostOfGoods), Color.ORANGE),
                    setLineDataValues('Total Gross Profit Margin', getGrossProfit(this.totalRevenue, SQ.totalCostOfGoods), Color.BLACK),
                ],
            },
            [GraphNames.GROSS_PROFIT_SEGMENTS_OPTIONS]: options
        });
    }

    getRevenueBySegmentPercentageData() {
        let options = _.cloneDeep(Options);
        setGraphTitle(options, 'Gross Revenue Margins by Segments');
        setYAxesLabel(options, 'In ' + SQ.units);
        this.setState({
            [GraphNames.REVENUE_PERCENTAGE]: {
                labels: SQ.quarterLabels,
                datasets: [
                    setBarDataValues('Transactional Revenue', getRevenuePercentage(SQ.transactionRevenue, this.totalRevenue), Color.BLUE),
                    setBarDataValues('Service Revenue', getRevenuePercentage(SQ.serviceRevenue, this.totalRevenue), Color.RED),
                    setBarDataValues('Hardware Revenue', getRevenuePercentage(SQ.hardwareRevenue, this.totalRevenue), Color.SILVER),
                    setBarDataValues('Bitcoin Revenue', getRevenuePercentage(SQ.bitcoinRevenue, this.totalRevenue), Color.ORANGE),
                ],
            },
            [GraphNames.REVENUE_PERCENTAGE_OPTIONS]: options,
        });
    }

    getRevenueYOYData() {
        this.setState({
            [GraphNames.REVENUE_YOY]: {
                labels: SQ.quarterLabels,
                datasets: [
                    {
                        label: 'Transactional Revenue Y/Y Growth',
                        data: getRevenueYOY(SQ.transactionRevenue),
                        fill: false,
                        borderColor: Color.BLUE,
                    },
                    {
                        label: 'Service Revenue Y/Y Growth',
                        data: getRevenueYOY(SQ.serviceRevenue),
                        fill: false,
                        borderColor: Color.RED,
                    },
                    {
                        label: 'Hardware Revenue Y/Y Growth',
                        data: getRevenueYOY(SQ.hardwareRevenue),
                        fill: false,
                        borderColor: Color.SILVER,
                    },
                    {
                        label: 'Bitcoin Revenue Y/Y Growth',
                        data: getRevenueYOY(SQ.bitcoinRevenue),
                        fill: false,
                        borderColor: Color.ORANGE,
                    },
                    {
                        label: 'Total Revenue Y/Y Growth',
                        data: getRevenueYOY(this.totalRevenue),
                        fill: false,
                        borderColor: Color.BLACK,
                    },
                ],
            },
            [GraphNames.REVENUE_YOY_OPTIONS]: {
                title: {
                    text: "Revenue Y/Y By Segments",
                    display: true,
                },
                legend: {
                    display: true,
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Quarter',
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Percentage (%)',
                        }
                    }]
                }
            }
        });
    }

    getRevenueOperatingIncomeExpensesData() {
        this.setState({
            [GraphNames.REVENUE_OPERATIONS]: {
                labels: SQ.quarterLabels,
                datasets: [
                    {
                        label: 'Total Revenue',
                        data: this.totalRevenue,
                        fill: false,
                        backgroundColor: Color.BLUE,
                    },
                    {
                        label: 'Total Operating Expenses',
                        data: SQ.totalOperatingExpenses,
                        fill: false,
                        backgroundColor: Color.RED,
                    },
                    {
                        label: 'Total Operating Income',
                        data: SQ.totalOperatingIncome,
                        fill: false,
                        backgroundColor: Color.BLACK,
                    },
                    {
                        label: 'Net Income',
                        data: SQ.netIncome,
                        fill: false,
                        backgroundColor: Color.ORANGE,
                    },
                ],
            },
            [GraphNames.REVENUE_OPERATIONS_OPTIONS]: {
                title: {
                    text: "Revenue, Operating Income and Expenses, and Net Income",
                    display: true,
                },
                legend: {
                    display: true,
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Quarter',
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Percentage (%)',
                        }
                    }]
                }
            }
        });
    }

    getCashAndDebt() {
        this.setState({
            [GraphNames.CASH]: {
                labels: SQ.quarterLabels,
                datasets: [
                    {
                        label: 'Cash and Cash Equivalents',
                        data: SQ.cash,
                        fill: false,
                        backgroundColor: Color.BLUE,
                    },
                    {
                        label: 'Current Debt',
                        data: SQ.currentDebt,
                        fill: false,
                        backgroundColor: Color.RED,
                    },
                    {
                        label: 'Long Term Debt',
                        data: SQ.longTermDebt,
                        fill: false,
                        backgroundColor: Color.SILVER,
                    },
                ],
            },
            [GraphNames.CASH_OPTIONS]: {
                title: {
                    text: "Cash, and Debt",
                    display: true,
                },
                legend: {
                    display: true,
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Quarter',
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'In ' + SQ.units,
                        }
                    }]
                }
            }
        });
    }

    getFreeCashFlow() {
        this.setState({
            [GraphNames.FREE_CASH_FLOW]: {
                labels: SQ.quarterLabels,
                datasets: [
                    {
                        label: 'Cash From Operations',
                        data: SQ.cashFromOperations,
                        fill: false,
                        backgroundColor: Color.BLUE,
                    },
                    {
                        label: 'Cash From Investing',
                        data: SQ.cashFromInvesting,
                        fill: false,
                        backgroundColor: Color.RED,
                    },
                    {
                        label: 'Free Cash Flow',
                        data: getFreeCashFlow(SQ.cashFromOperations, SQ.cashFromInvesting),
                        fill: false,
                        backgroundColor: Color.GREEN,
                    },
                ],
            },
            [GraphNames.FREE_CASH_FLOW_OPTIONS]: {
                title: {
                    text: "Free Cash Flow",
                    display: true,
                },
                legend: {
                    display: true,
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Quarter',
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'In ' + SQ.units,
                        }
                    }]
                }
            }
        });
    }

    getShareholderEquityData() {
        this.setState({
            [GraphNames.SHAREHOLDER_EQUITY]: {
                labels: SQ.quarterLabels,
                datasets: [
                    {
                        label: 'Total Assets',
                        data: SQ.totalAssets,
                        fill: false,
                        backgroundColor: Color.BLUE,
                    },
                    {
                        label: 'Total Liabilities',
                        data: SQ.totalLiabilities,
                        fill: false,
                        backgroundColor: Color.RED,
                    },
                    {
                        label: 'Shareholder Equity',
                        data: getShareholderEquity(SQ.totalAssets, SQ.totalLiabilities),
                        fill: false,
                        backgroundColor: Color.GREEN,
                    },
                ],
            },
            [GraphNames.SHAREHOLDER_EQUITY_OPTIONS]: {
                title: {
                    text: "Shareholder Equity",
                    display: true,
                },
                legend: {
                    display: true,
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Quarter',
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'In ' + SQ.units,
                        }
                    }]
                }
            }
        });
    }


    render() {
        return (
            <div className="App">
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

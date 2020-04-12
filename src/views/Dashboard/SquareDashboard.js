import React, {Component} from 'react';
import BarChart from '../../components/BarChart';
import {SQ} from "../../square_financials";
import {getGrossProfit, getRevenuePercentage, getRevenueYOY} from "../../utils/common_utils";
import {Color, GraphNames} from "../../utils/enums";
import LineChart from "../../components/LineChart";

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
    }

    getRevenueSegmentsData() {
        this.setState({
            [GraphNames.REVENUE_SEGMENTS]: {
                labels: SQ.quarterLabels,
                datasets: [
                    {
                        label: 'Transactional Revenue',
                        data: SQ.transactionRevenue,
                        fill: false,
                        backgroundColor: Color.BLUE,
                    },
                    {
                        label: "Service Revenue",
                        data: SQ.serviceRevenue,
                        backgroundColor: Color.RED,
                    },
                    {
                        label: "Hardware Revenue",
                        data: SQ.hardwareRevenue,
                        backgroundColor: Color.SILVER,
                    },
                    {
                        label: "Bitcoin Revenue",
                        data: SQ.bitcoinRevenue,
                        backgroundColor: Color.ORANGE,
                    },
                    {
                        label: "Total Revenue",
                        data: this.totalRevenue,
                        fill: false,
                        type: 'line',
                        borderColor: Color.BLACK,
                    }
                ],
            },
            [GraphNames.REVENUE_SEGMENTS_OPTIONS]: {
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
                            labelString: 'In ' + SQ.units,
                        }
                    }]
                }
            }
        });
    }

    getGrossProfitData() {
        this.setState({
            [GraphNames.GROSS_PROFIT_SEGMENTS]: {
                labels: SQ.quarterLabels,
                datasets: [
                    {
                        label: 'Transactional Revenue Profit Margin',
                        data: getGrossProfit(SQ.transactionRevenue, SQ.transactionCostOfGoods),
                        fill: false,
                        borderColor: Color.BLUE,
                    },
                    {
                        label: 'Service Revenue Profit Margin',
                        data: getGrossProfit(SQ.serviceRevenue, SQ.serviceCostOfGoods),
                        fill: false,
                        borderColor: Color.RED,
                    },
                    {
                        label: 'Hardware Revenue Profit Margin',
                        data: getGrossProfit(SQ.hardwareRevenue, SQ.hardwareCostOfGoods),
                        fill: false,
                        borderColor: Color.SILVER,
                    },
                    {
                        label: 'Bitcoin Revenue Profit Margin',
                        data: getGrossProfit(SQ.bitcoinRevenue, SQ.bitcoinCostOfGoods),
                        fill: false,
                        borderColor: Color.ORANGE,
                    },
                    {
                        label: 'Total Gross Profit Margin',
                        data: getGrossProfit(this.totalRevenue, SQ.totalCostOfGoods),
                        fill: false,
                        borderColor: Color.BLACK,
                    },
                ],
            },
            [GraphNames.GROSS_PROFIT_SEGMENTS_OPTIONS]: {
                title: {
                    text: "Gross Revenue Margins by Segments",
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

    getRevenueBySegmentPercentageData() {
        this.setState({
            [GraphNames.REVENUE_PERCENTAGE]: {
                labels: SQ.quarterLabels,
                datasets: [
                    {
                        label: 'Transactional Revenue Profit Margin',
                        data: getRevenuePercentage(SQ.transactionRevenue, this.totalRevenue),
                        fill: false,
                        backgroundColor: Color.BLUE,
                    },
                    {
                        label: 'Service Revenue Profit Margin',
                        data: getRevenuePercentage(SQ.serviceRevenue, this.totalRevenue),
                        fill: false,
                        backgroundColor: Color.RED,
                    },
                    {
                        label: 'Hardware Revenue Profit Margin',
                        data: getRevenuePercentage(SQ.hardwareRevenue, this.totalRevenue),
                        fill: false,
                        backgroundColor: Color.SILVER,
                    },
                    {
                        label: 'Bitcoin Revenue Profit Margin',
                        data: getRevenuePercentage(SQ.bitcoinRevenue, this.totalRevenue),
                        fill: false,
                        backgroundColor: Color.ORANGE,
                    },
                ],
            },
            [GraphNames.REVENUE_PERCENTAGE_OPTIONS]: {
                title: {
                    text: "Gross Revenue Margins by Segments",
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

    render() {
        return (
            <div className="App">
                <BarChart chartData={this.state[GraphNames.REVENUE_SEGMENTS]} options={this.state[GraphNames.REVENUE_SEGMENTS_OPTIONS]}/>
                <LineChart chartData={this.state[GraphNames.REVENUE_YOY]} options={this.state[GraphNames.REVENUE_YOY_OPTIONS]}/>
                <LineChart chartData={this.state[GraphNames.GROSS_PROFIT_SEGMENTS]} options={this.state[GraphNames.GROSS_PROFIT_SEGMENTS_OPTIONS]}/>
                <BarChart chartData={this.state[GraphNames.REVENUE_PERCENTAGE]} options={this.state[GraphNames.REVENUE_PERCENTAGE_OPTIONS]}/>
            </div>
        );
    }
}

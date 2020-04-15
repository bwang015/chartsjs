import React, {Component} from 'react';
import { SQ } from "../../square_financials";
import _ from "lodash";
import {
    getFreeCashFlow,
    getShareholderEquity,
} from "../../utils/common_utils";
import { Color, GraphNames } from "../../utils/enums";
import {Annotation, Options} from "../../utils/common_objects";
import {
    setGraphTitle,
    setAxesLabel,
    setBarDataValues,
} from "../../utils/graph_helper";
import RevenueSegments from "../Widget/RevenueSegments";
import RevenueMultiplierGraph from "../Widget/RevenueMultiplierGraph";
import RevenueGrowthYOY from "../Widget/RevenueGrowthYOY";
import GrossProfitMargins from "../Widget/GrossProfitMargins";
import OperatingIncomeAndExpenses from "../Widget/OperatingIncomeAndExpenses";
import RevenueByPercentages from "../Widget/RevenueByPercentages";
import CashDebtGraphs from "../Widget/CashDebtGraphs";

class SquareDashboard extends Component {
    constructor(props) {
        super(props);

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
            revenue: this.getRevenue(),
            essentials: essentials,
            estimates: estimates,
            stockInfo: stockInfo,
            revenueYOY: this.getRevenueYOY(),
            grossProfit: this.getGrossProfit(),
            totalRevenue: SQ.getTotalRevenue(),
            operationNumbers: this.getRevenueOperatingNumbers(),
            cash: this.getCashNumbers(),
            totalCostOfGoods: SQ.totalCostOfGoods,
        };
    }

    getRevenue = () => {
        return {
            'Transactional Revenue': {
                data: SQ.transactionRevenue,
                color: Color.BLUE,
            },
            'Service Revenue': {
                data: SQ.serviceRevenue,
                color: Color.RED,
            },
            'Hardware Revenue': {
                data: SQ.hardwareRevenue,
                color: Color.GREEN,

            },
            'Bitcoin Revenue': {
                data: SQ.bitcoinRevenue,
                color: Color.SILVER,
            },
        };
    };

    getRevenueYOY = () => {
        return {
            'Transactional Revenue Y/Y Growth': {
                data: SQ.transactionRevenue,
                color: Color.BLUE,
            },
            'Service Revenue Y/Y Growth': {
                data: SQ.serviceRevenue,
                color: Color.RED,
            },
            'Hardware Revenue Y/Y Growth': {
                data: SQ.hardwareRevenue,
                color: Color.GREEN,
            },
            'Bitcoin Revenue Y/Y Growth': {
                data: SQ.bitcoinRevenue,
                color: Color.SILVER,
            },
        };
    };

    getGrossProfit = () => {
        return {
            'Transactional Revenue Profit Margin': {
                revenue: SQ.transactionRevenue,
                costOfGoods: SQ.transactionCostOfGoods,
                color: Color.BLUE,
            },
            'Service Revenue Profit Margin': {
                revenue: SQ.serviceRevenue,
                costOfGoods: SQ.serviceCostOfGoods,
                color: Color.RED,
            },
            'Hardware Revenue Profit Margin': {
                revenue: SQ.hardwareRevenue,
                costOfGoods: SQ.hardwareCostOfGoods,
                color: Color.SILVER,
            },
            'Bitcoin Revenue Profit Margin': {
                revenue: SQ.bitcoinRevenue,
                costOfGoods: SQ.bitcoinCostOfGoods,
                color: Color.ORANGE,
            },
        };
    };

    getRevenueOperatingNumbers = () => {
        return {
            'Total Operating Expenses': {
                data: SQ.totalOperatingExpenses,
                color: Color.RED,
            },
            'Total Operating Income': {
                data: SQ.totalOperatingIncome,
                color: Color.SILVER,
            },
            'Net Income': {
                data: SQ.netIncome,
                color: Color.GREEN,
            },
        }
    };

    getCashNumbers = () => {
        return {
            'Cash and Cash Equivalents': {
                data: SQ.cash,
                color: Color.BLUE,
            },
            'Short Term Debt': {
                data: SQ.currentDebt,
                color: Color.RED,
            },
            'Long Term Debt': {
                data: SQ.longTermDebt,
                color: Color.SILVER,
            }
        };
    };

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
                {/*<RevenueMultiplierGraph totalRevenue={this.state.totalRevenue} essentials={this.state.essentials} estimates={this.state.estimates} stockInfo={this.state.stockInfo}/>*/}
                <RevenueSegments revenue={this.state.revenue} totalRevenue={this.state.totalRevenue} essentials={this.state.essentials}/>
                <RevenueGrowthYOY essentials={this.state.essentials} revenueYOY={this.state.revenueYOY} totalRevenue={this.state.totalRevenue}/>
                <GrossProfitMargins essentials={this.state.essentials} totalRevenue={this.state.totalRevenue} grossProfit={this.state.grossProfit} totalCostOfGoods={this.state.totalCostOfGoods}/>
                <OperatingIncomeAndExpenses essentials={this.state.essentials} totalRevenue={this.state.totalRevenue} operationNumbers={this.state.operationNumbers}/>
                <RevenueByPercentages essentials={this.state.essentials} totalRevenue={this.state.totalRevenue} revenue={this.state.revenue}/>
                <CashDebtGraphs essentials={this.state.essentials} cash={this.state.cash}/>
                {/*<BarChart chartData={this.state[GraphNames.FREE_CASH_FLOW]} options={this.state[GraphNames.FREE_CASH_FLOW_OPTIONS]}/>*/}
                {/*<BarChart chartData={this.state[GraphNames.SHAREHOLDER_EQUITY]} options={this.state[GraphNames.SHAREHOLDER_EQUITY_OPTIONS]}/>*/}
            </div>
        );
    }
}

export default SquareDashboard;

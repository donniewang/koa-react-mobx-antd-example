import React from 'react';
import { inject, observer } from 'mobx-react';

import ReactHighcharts from 'react-highcharts';

import Top from '../components/top';
import Left from '../components/left';

import './charts.css';

@inject('user')
@observer
export default class Charts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
        console.log(this.props);
    }

    render() {
        return (
            <div className="main">
                <Top history={ this.props.history }/>
                <div className="content">
                    <Left history={ this.props.history }/>
                    <div className="right">
                        <ReactHighcharts config={{
                            chart: {
                                plotBackgroundColor: null,
                                plotBorderWidth: null,
                                plotShadow: false,
                                type: 'pie'
                            },
                            title: {
                                text: 'Browser market shares in January, 2018'
                            },
                            tooltip: {
                                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                            },
                            plotOptions: {
                                pie: {
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    dataLabels: {
                                        enabled: true,
                                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                        style: {
                                            color: (ReactHighcharts.theme && ReactHighcharts.theme.contrastTextColor) || 'black'
                                        }
                                    }
                                }
                            },
                            series: [{
                                name: 'Brands',
                                colorByPoint: true,
                                data: [{
                                    name: 'Chrome',
                                    y: 61.41,
                                    sliced: true,
                                    selected: true
                                }, {
                                    name: 'Internet Explorer',
                                    y: 11.84
                                }, {
                                    name: 'Firefox',
                                    y: 10.85
                                }, {
                                    name: 'Edge',
                                    y: 4.67
                                }, {
                                    name: 'Safari',
                                    y: 4.18
                                }, {
                                    name: 'Sogou Explorer',
                                    y: 1.64
                                }, {
                                    name: 'Opera',
                                    y: 1.6
                                }, {
                                    name: 'QQ',
                                    y: 1.2
                                }, {
                                    name: 'Other',
                                    y: 2.61
                                }]
                            }]
                        }} />

                    </div>
                </div>
            </div>
        );
    }
}
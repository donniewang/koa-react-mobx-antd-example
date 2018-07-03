import React from 'react';
import { inject, observer } from 'mobx-react';

import { Table, Icon, Divider } from 'antd';

import Top from '../components/top';
import Left from '../components/left';

import './user.css';

@inject('user')
@observer
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
        console.log(this.props);
        this.props.user.doList(this.props.history,0);
    }

    render() {
        return (
            <div className="main">
                <Top history={ this.props.history }/>
                <div className="content">
                    <Left history={ this.props.history }/>
                    <div className="right">
                        <Table columns={[
                            {
                                title: '姓名',
                                dataIndex: 'name',
                                key: 'name',
                                render: text => <a href="javascript:;">{text}</a>,
                            }, {
                                title: '登录名',
                                dataIndex: 'username',
                                key: 'username',
                            }, {
                                title: '电话',
                                dataIndex: 'mobile',
                                key: 'mobile',
                            }, {
                                title: '',
                                key: 'action',
                                render: (text, record) => (
                                    <span>
                                    <a href="javascript:;">删除</a>
                                    <Divider type="vertical" />
                                    <a href="javascript:;">编辑</a>
                                    </span>
                                ),
                            }
                        ]} dataSource={ this.props.user.users||[] } />
                    </div>
                </div>
            </div>
        );
    }
}
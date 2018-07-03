import React from 'react';
import { Menu,Icon } from 'antd';

export default class Left extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        }
    }

    onClickMenu = (item, key, keyPath) => {
        if(item.key=="1") {
            this.props.history.push('/user');
        }
        if(item.key=="2") {
            this.props.history.push('/charts');
        }
    }

    render() {
        const pathname = this.props.history.location.pathname;
        let keys = ['/user','/charts'];
        let index = keys.findIndex((key)=>{ return key==pathname })+1;

        return (
            <div className="left">
                <Menu
                    defaultSelectedKeys={[''+index]}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                    onClick={this.onClickMenu}
                    >
                    <Menu.Item key="1">
                        <Icon type="usergroup-add" />
                        <span>用户管理</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="bars" />
                        <span>图表示例</span>
                    </Menu.Item>
                    {/* <Menu.SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <Menu.SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="11">Option 11</Menu.Item>
                        <Menu.Item key="12">Option 12</Menu.Item>
                        </Menu.SubMenu>
                    </Menu.SubMenu> */}
                </Menu>

            </div>
        )
    }
}
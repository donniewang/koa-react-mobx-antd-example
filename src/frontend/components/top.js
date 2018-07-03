import React from 'react';
import { Icon } from 'antd';

export default class Top extends React.Component {
    render() {
        return (
            <div className="top">
                <div>
                    <span></span>
                </div>
                <div>
                    <span>退出  <Icon type="logout" /></span>
                </div>
            </div>
        )
    }
}
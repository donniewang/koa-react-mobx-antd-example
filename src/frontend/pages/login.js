import React from 'react';
import { inject, observer } from 'mobx-react';

import { Input,Button,Icon,Alert } from 'antd';

import './login.css';

@inject('user')
@observer
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    componentWillMount() {
        console.log(this.props);
    }

    emitEmpty = (type) => {
        if(type==1) {
            this.usernameInput.focus();
            this.setState({ username: '' });
        } else {
            this.passwordInput.focus();
            this.setState({ password: '' });
        }
    }
      
    onChangeUsername = (e) => {
        this.setState({ username: e.target.value });
    }

    onChangePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    onClickLogin = () => {
        this.props.user.doVerify(this.props.history,this.state.username,this.state.password);
    }

    render() {
        const { username,password } = this.state;
        return (
            <div style={{ width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center' }}>
                <div style={{ width:'100%',display:'flex',alignItems:'center',justifyContent:'center',marginTop:5,marginBottom:5 }}>
                { !!this.props.user.message &&
                <Alert message={ this.props.user.message } type="error" style={{ width:'100%',marginLeft:15,marginRight:15 }}/>
                }
                </div>
                <div style={{ width:'100%',display:'flex',alignItems:'center',justifyContent:'center',marginTop:5,marginBottom:5 }}>
                    <Input
                        placeholder="用户名"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        suffix={username ? <Icon type="close-circle" onClick={this.emitEmpty.bind(this,1)} /> : null}
                        value={username}
                        onChange={this.onChangeUsername}
                        ref={node => this.usernameInput = node}
                        style={{ width:'100%',marginLeft:15,marginRight:15 }} 
                    />
                </div>
                <div style={{ width:'100%',display:'flex',alignItems:'center',justifyContent:'center',marginTop:5,marginBottom:5 }}>
                    <Input
                        placeholder="密码"
                        type="password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        suffix={password ? <Icon type="close-circle" onClick={this.emitEmpty.bind(this,2)} /> : null}
                        value={password}
                        onChange={this.onChangePassword}
                        ref={node => this.passwordInput = node}
                        style={{ width:'100%',marginLeft:15,marginRight:15 }} 
                    />
                </div>
                <div style={{ width:'100%',display:'flex',alignItems:'center',justifyContent:'center',marginTop:5,marginBottom:5 }}>
                    <Button style={{ width:'100%',marginLeft:15,marginRight:15 }} onClick={ this.onClickLogin }>
                        登录
                    </Button>
                </div>
            </div>
        );
    }
}
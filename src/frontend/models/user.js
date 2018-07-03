import { observable,action,computed } from 'mobx';
import axios from 'axios';

export default class User {

    @observable token = null;
    @observable message = null;

    @observable users = null;
    @observable page = 0;
    @observable size = 10;
    @observable count = 0;

    @observable user = null;
    
    history = null;

    constructor(){
    }

    @action
    doVerify = (history,username,password) => {
        this.history = history;
        if(!!username&&!!password) {
            axios({
                method:'post',
                url:'/api/v1/user/verify',
                data:{ username,password }
            }).then(resp => {
                console.log(resp);
                const { success,message,token } = resp.data;
                if(success==1) {
                    this.token = token;
                    this.history.push('/user');
                } else {
                    this.message = message;
                }
            }).catch(e => console.error(e));
        } else {
            this.message = '请输入用户名口令';
        }
    }

    @action
    doList = (history,type) => {
        this.history = history;
        if(type==0) {
            this.page = 1;
        } else {
            this.page = this.page + 1;
        }
        let page = this.page;
        let size = this.size;
        axios({
            method:'get',
            url:'/api/v1/user/list',
            data:{ page,size }
        }).then(resp => {
            console.log(resp);
            const { success,message,rows,count } = resp.data;
            if(success==1) {
                this.count = count;
                this.users = rows;
            } else {
                this.message = message;
            }
        }).catch(e => console.error(e));
    }

    @action
    doCreate = (history,{ name,username,password,description,mobile,updateTime }) => {
        this.history = history;
        axios({
            method:'post',
            url:'/api/v1/user/create',
            data:{ name,username,password,description,mobile,updateTime }
        }).then(resp => {
            console.log(resp);
            const { success,message,row } = resp.data;
            if(success==1) {
                this.user = row;
            } else {
                this.message = message;
            }
        }).catch(e => console.error(e));
    }

    @action
    doUpdate = (history,{ id,name,username,password,description,mobile,updateTime }) => {
        this.history = history;
        axios({
            method:'post',
            url:'/api/v1/user/create',
            data:{ id,name,username,password,description,mobile,updateTime }
        }).then(resp => {
            console.log(resp);
            const { success,message,row } = resp.data;
            if(success==1) {
                this.user = row;
            } else {
                this.message = message;
            }
        }).catch(e => console.error(e));
    }

    @action
    doRemove = (history,id) => {
        this.history = history;
        axios({
            method:'post',
            url:'/api/v1/user/create',
            data:{ id }
        }).then(resp => {
            console.log(resp);
            const { success,message } = resp.data;
            if(success==1) {
                
            } else {
                this.message = message;
            }
        }).catch(e => console.error(e));
    }
}
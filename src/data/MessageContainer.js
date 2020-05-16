
import React, { PropTypes, Component } from 'react';
import { subscribe } from 'mqtt-react';
let topic="";
class MessageContainer extends React.PureComponent {
    constructor(props) {
        super(props)
        this.isMounting = false;
        this.justCallback = false;
        this.firstLoad = true;
        topic=this.props.topic;
    }
    componentWillMount() {
        console.log("componentWillMount")
        this.isMounting = true;
    }
    componentWillUnmount() {
        console.log("componentWillUnmount")
        this.isMounting = false;
    }
    shouldComponentUpdate() {
        console.log("shouldComponentUpdate:"+this.isMounting)
        return this.isMounting;
    }
    render() {
        let data = this.props.data[0];
        console.log("---:" + data)
        // if (this.firstLoad == true) {
        //     this.firstLoad = false;
        //     return <div />
        // }
        // if (this.justCallback == false) {
        //     this.justCallback = true;
        //     this.props.callback();
        //     return (
        //         <div />
        //     )
        // }
        // this.justCallback = false;
        return (
            <div />
        )
    }
}
export default subscribe({ topic: topic })(MessageContainer);
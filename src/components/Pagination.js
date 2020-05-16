import React, { PropTypes, Component } from 'react';
import { Pagination, } from 'react-bootstrap';

export default class P extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        let pageArr = [];
        for (let i = this.props.activePage - Math.ceil(this.props.maxButtons / 2);
            (pageArr.length < this.props.maxButtons && i <= this.props.items);
            i++) {
            if (i < 0) {
                i = 0;
            }
            // console.log("for:"+i)
            pageArr.push(i)
        }
        return <Pagination {...this.props}>
            <Pagination.Prev
                className={this.props.activePage == 0 ? "disabled" : ""}
                onClick={e => {
                    if (this.props.activePage != 0) {
                        this.props.onSelect(this.props.activePage - 1)
                    }
                }}
            />
            {pageArr.length > 0 && pageArr[0] > 0 && <Pagination.Item
                className={"disabled"}
            >{"..."}</Pagination.Item>}
            {pageArr.map((rowData, index) => {
                return <Pagination.Item
                    key={index}
                    className={this.props.activePage == rowData ? "active" : ""}
                    onClick={e => {
                        if (this.props.activePage != rowData) {
                            this.props.onSelect(rowData)
                        }
                    }}
                >{rowData + 1}</Pagination.Item>
            })}
            {pageArr.length > 0 && pageArr[pageArr.length - 1] < this.props.items && <Pagination.Item
                className={"disabled"}
            >{"..."}</Pagination.Item>}
            <Pagination.Next
                onClick={e => {
                    if (this.props.activePage != this.props.items) {
                        this.props.onSelect(this.props.activePage + 1)
                    }
                }}
                className={this.props.activePage == this.props.items ? "disabled" : ""}
            />

        </Pagination>
    }
}
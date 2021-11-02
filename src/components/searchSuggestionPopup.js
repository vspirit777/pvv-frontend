import $ from "jquery";
import React from 'react';
import { MenuItem, IconMenu, AutoComplete } from 'material-ui';
import common from '../data/common';
import { config } from '../config';
import Router from 'next/router'

export default class SeachSuggestionPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        if (this.props.id) {
            this.id = this.props.id
        } else {
            this.id = "suggestSearch" + Math.random()
        }
    }
    getSearchProduct(product) {
        if (!product) {
            common.searchInputSuggestData = common.searchInputSuggestDataDefault;
            this.forceUpdate();
            return;
        }
        common.fetcher(
            config.api.hostType.product_url,
            config.api.hostEndPoint.searchProduct,
            "get",
            {
                offset: 0,
                size: 5,
                product: product,
            }
        )
            .then((jsonRes) => {
                if (this._getSearchProductrequestNum && jsonRes.requestNum < this._getSearchProductrequestNum) {
                    return;
                }
                this._getSearchProductrequestNum = jsonRes.requestNum;
                
                if (this.state.searchInputValue && jsonRes.data) {
                    common.searchInputSuggestData = [];
                    if (jsonRes.data.destinations) {
                        common.searchInputSuggestData = [...common.searchInputSuggestData, ...jsonRes.data.destinations];
                    }
                    if (jsonRes.data.products) {
                        common.searchInputSuggestData = [...common.searchInputSuggestData, ...jsonRes.data.products];
                        this.forceUpdate();
                    }
                }
            })
            .catch((err) => {
                // alert("getSearchProduct err")
                console.log("error pro3:" + err)
            })
    }
    render() {
        const childData = this.renderChild();
        return <AutoComplete
            {...this.props}
            autoComplete="off"
            id={this.id}
            filter={AutoComplete.noFilter}
            openOnFocus={true}
            onUpdateInput={searchText => {
                if (this._headerCallSearchProductTimeout) {
                    clearTimeout(this._headerCallSearchProductTimeout)
                }
                this.state.searchInputValue = searchText;
                this._headerCallSearchProductTimeout = setTimeout(() => {
                    this._headerCallSearchProductTimeout = undefined;
                    this.getSearchProduct(searchText)
                }, 200);
            }}
            {...(
                childData.length > 0
                    ? { dataSource: childData }
                    : {
                        dataSource: [
                            {
                                text: "", value: <MenuItem primaryText={<div style={{ color: "#000" }}>{childData}</div>}
                                    disabled={true}
                                    style={{ padding: 0 }}
                                ></MenuItem>
                            }
                        ],
                        menuProps: {
                            desktop: true,
                            // disableAutoFocus: true,
                        },
                    }
            )}
        />
    }

    pressProduct(alias) {
        common.needReload = true;
        if (this.props.closeCallback) {
            this.props.closeCallback();
        }

        Router.push(config.shortUrl.product, config.shortUrl.product + "/" + alias);
    }
    pressDestination(alias) {
        common.needReload = true;
        if (this.props.closeCallback) {
            this.props.closeCallback();
        }

        Router.push(config.shortUrl.destination, config.shortUrl.destination + "/" + alias);
    }
    renderChild() {
        if (this.state.searchInputValue) {
            if (common.searchInputSuggestData && common.searchInputSuggestData.length) {
                let arrReturn = [];
                for (let i = 0; i < common.searchInputSuggestData.length; i++) {
                    const rowDataDetail = common.searchInputSuggestData[i];
                    arrReturn.push({
                        text: "",
                        value: <MenuItem primaryText={<div style={{    
                                maxWidth: "calc(100vw - 111px)",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}>{
                            !rowDataDetail.productId ? rowDataDetail.briefName : rowDataDetail.productName
                            }</div>
                        } 
                            style={{maxWidth: '100vw'}}
                            tex
                            leftIcon={
                                !rowDataDetail.productId ?
                                    <i className="fa fa-star"
                                        style={{ color: config.colorConfig.main, fontSize: 22, left: 12 }}
                                    />
                                    : (rowDataDetail.featureImage && rowDataDetail.featureImage.thumbSecondUrl)
                                        ?
                                        <div
                                            style={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: 4,
                                                marginRight: 12,
                                                marginTop: 0,
                                                backgroundRepeat: "no-repeat",
                                                backgroundSize: "cover",
                                                backgroundPosition: "50%",
                                                overflow: "hidden",
                                                flex: "0 0 40px",
                                                backgroundImage: `url("${rowDataDetail.featureImage.thumbSecondUrl}")`,
                                            }}
                                        />
                                        : <i className="fa fa-map-marker"
                                            style={{ color: "#999", fontSize: 15, top: 5, left: 12 }}
                                        />
                            }

                            onKeyPress={e => {
                                !rowDataDetail.productId ?
                                    this.pressDestination(rowDataDetail.alias) :
                                    this.pressProduct(rowDataDetail.alias)
                            }}
                            onClick={e => {
                                !rowDataDetail.productId ?
                                    this.pressDestination(rowDataDetail.alias) :
                                    this.pressProduct(rowDataDetail.alias)
                            }}
                        />
                    })
                }
                return arrReturn;
            } else {
                return <div />
            }
        }
        if (common.searchInputSuggestData !== common.searchInputSuggestDataDefault) {
            common.searchInputSuggestData = common.searchInputSuggestDataDefault
        }
        if (common.searchInputSuggestData !== undefined && common.searchInputSuggestData.data !== undefined
            && common.searchInputSuggestData.data.length > 0) {
            if (!common.checkMobile()) {
                return <div style={{ height: 420, }}>
                    <div style={{ float: "left", borderRight: "solid 1px #eee", }}>
                        {common.searchInputSuggestData.data.map((rowData, rowIndex) => {
                            if (rowIndex >= 16) {
                                return;
                            }
                            return <div key={rowIndex} style={{ cursor: "pointer" }}>
                                <div
                                    onMouseEnter={e => {
                                        common.searchInputSuggestData.dataFocusing = rowIndex;
                                        this.forceUpdate();
                                    }}
                                    style={{
                                        position: "relative",
                                        verticalAlign: "middle",
                                        display: "table-cell",
                                        height: 58,
                                        width: 232,
                                        marginRight: 25,
                                        borderBottom: "solid 1px #eee",
                                        padding: "0px 6px 0px 24px",
                                        ...(common.searchInputSuggestData.dataFocusing === rowIndex
                                            ? { background: config.colorConfig.main, color: "#fff" }
                                            : {})
                                    }}
                                >
                                    <div style={{ fontSize: 14, fontWeight: "bold" }}>
                                        {rowData.briefName}
                                    </div>

                                    {rowData.nameDescArr && <div>{rowData.nameDescArr.map((nameDes, rowIndex) =>
                                        <span key={rowIndex} style={{ marginTop: 5, fontSize: 12, marginRight: 10 }}>
                                            {nameDes}
                                        </span>)}
                                    </div>}

                                    {common.searchInputSuggestData.dataFocusing === rowIndex
                                        && <i className="fa fa-play"
                                            style={{
                                                position: "absolute", right: -14, top: 17, color: "#aaa", fontSize: 23,
                                                color: config.colorConfig.main
                                            }} />}
                                </div>
                            </div>
                        })}
                    </div>
                    <div style={{
                        margin: "15px 5px", marginLeft: 25, marginBottom: 0, overflowY: "auto"
                        , maxHeight: 406, width: 616, display: "inline-block"
                    }}>
                        {common.searchInputSuggestData.data[common.searchInputSuggestData.dataFocusing] !== undefined
                            && common.searchInputSuggestData.data[common.searchInputSuggestData.dataFocusing].subCategories !== undefined
                            && common.searchInputSuggestData.data[common.searchInputSuggestData.dataFocusing].subCategories.length > 0
                            && (common.searchInputSuggestData.data[common.searchInputSuggestData.dataFocusing].subCategories[0].img !== undefined
                                && <div style={{ display: "flex", flexWrap: "wrap" }}>
                                    {common.searchInputSuggestData.data[common.searchInputSuggestData.dataFocusing].subCategories.map((rowDataDetail, rowIndexDetail) => {
                                        let targetUrl = config.shortUrl.destination + "/" + rowDataDetail.alias;
                                        return <a
                                            key={rowIndexDetail}
                                            href={targetUrl}
                                            onClick={e => {
                                                e.preventDefault();
                                                document.getElementById(this.id).blur();
                                                this.forceUpdate(() => {
                                                    Router.push(config.shortUrl.destination, targetUrl)
                                                })
                                            }}
                                            style={{
                                                backgroundImage: "url('" + rowDataDetail.img + "')", width: 130, height: 74,
                                                marginBottom: 20, marginRight: 20, backgroundSize: "cover", display: "inline-block",
                                                position: "relative", backgroundPositionX: "50%", backgroundPositionY: "50%",
                                            }}>
                                            <div style={{
                                                position: "absolute", color: "#fff", bottom: 0, width: "100%",
                                                textAlign: "center"
                                            }}>
                                                {rowDataDetail.briefName}
                                            </div>
                                        </a>
                                    })}
                                </div>
                                || common.searchInputSuggestData.data[common.searchInputSuggestData.dataFocusing].subCategories[0].img === undefined
                                && common.searchInputSuggestData.data[common.searchInputSuggestData.dataFocusing].subCategories.map((rowDataDetail, rowIndexDetail) => {
                                    let targetUrl = config.shortUrl.destination + "/" + rowDataDetail.alias;
                                    return <div key={rowIndexDetail} style={{ width: "100%", marginTop: 10, display: "flex" }}>
                                        <div style={{ fontWeight: "bold", width: "26%" }}>
                                            <a href={targetUrl}
                                                style={{ color: "#000" }}
                                                onClick={e => {
                                                    e.preventDefault();
                                                    document.getElementById(this.id).blur();
                                                    this.forceUpdate(() => {
                                                        Router.push(config.shortUrl.destination, targetUrl)
                                                    })
                                                }}
                                            >
                                                {rowDataDetail.briefName}
                                            </a>
                                        </div>
                                        <div style={{ width: "74%", display: "flex", flexWrap: "wrap" }}>
                                            {rowDataDetail.subCategories
                                                && rowDataDetail.subCategories.map((rowDataDetailDetail, rowIndexDetailDetail) => {
                                                    let targetUrl = config.shortUrl.destination + "/" + rowDataDetailDetail.alias;
                                                    return <a
                                                        key={rowIndexDetailDetail}
                                                        onClick={e => {
                                                            e.preventDefault();
                                                            document.getElementById(this.id).blur();
                                                            this.forceUpdate(() => {
                                                                Router.push(config.shortUrl.destination, targetUrl)
                                                            })
                                                        }}
                                                        className="searchInputSuggestDataDetail hoverDefaultColor"
                                                        style={{ display: "inline-block", marginRight: 24, marginBottom: 0 }} href={targetUrl}>
                                                        {rowDataDetailDetail.briefName}
                                                    </a>
                                                })}
                                        </div>
                                    </div>
                                })
                            )
                        }
                    </div>
                </div>
            } else {
                return <div
                    style={{
                        position: "relative", width: "100vw", maxWidth: config.pageSmallWidthStyle.maxWidth,
                        ...(this.props.style ? this.props.style : {})
                    }}
                >
                    {common.searchInputSuggestData.data.map((rowData, rowIndex) => {
                        return <div key={rowIndex} style={{ padding: 12 }}>
                            <div style={{ color: "#999", marginTop: 24, marginBottom: 16 }}>
                                {rowData.briefName}
                            </div>
                            <div >
                                {rowData.subCategories !== undefined && rowData.subCategories.map((rowDataDetail, rowIndexDetail) => {
                                    let targetUrl = config.shortUrl.destination + "/" + rowDataDetail.alias;
                                    return <a
                                        key={rowIndexDetail}
                                        className="hoverDefaultColor"
                                        href={targetUrl}
                                        onClick={e => {
                                            e.preventDefault();
                                            document.getElementById(this.id).blur();
                                            this.forceUpdate(() => {
                                                Router.push(config.shortUrl.destination, targetUrl)
                                            })
                                        }}
                                        style={{
                                            border: "1px solid #000", display: "inline-block",
                                            marginBottom: 10, marginRight: 10, padding: "12px 10px"
                                        }}>
                                        {rowDataDetail.briefName}
                                    </a>
                                })}
                            </div>
                        </div>
                    })}
                </div>
            }
        }
        return <div />
    }
}
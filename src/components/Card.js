import React, { PropTypes, Component } from 'react';
import { config } from '../config'
import {
    OverlayTrigger,
    Tooltip,
} from 'react-bootstrap';
import { inherits } from 'util';

class Card extends Component {
    constructor(props) {
        super(props);
        // console.log("render card:")
        // console.log(props)
    }
    imageLoadedCallback() {
        this.imageLoaded = true;
        this.forceUpdate();
    }
    render() {
        // console.log("set height:" + this.imageLoaded + ";" + (this.imageLoaded ? "100%" : this.props.width))
        // console.log("add to last:"+this.props.addNextToLastCard)
        let onClickUrl = config.shortUrl.destination + "/"+ this.props.data.alias;
        // if (this.props.data.actionOnClick == config.onClickCardType.OPEN_SHOP_PROFILE_ONLY) {
        //     onClickUrl = config.shortUrl.shopDetail + alias;
        // }
        return (
            <a style={{ width: "100%", ...this.props.style, cursor: "pointer", color: "inherit" }}
                href={onClickUrl}
                onMouseEnter={this.props.onMouseEnter}
                onMouseOut={this.props.onMouseOut}
                onClick={(e) => {
                    e.preventDefault()
                    if (this.props.callBack) {
                        this.props.callBack();
                        return;
                    }
                    if (this.props.needOpenInNewTab) {
                        window.open(onClickUrl, '_blank');
                    } else {
                        // if (this.props.data.actionOnClick == config.onClickCardType.OPEN_URL) {
                        //     window.location.href = onClickUrl;
                        // } else {
                            // history.push(onClickUrl);
                        // }
                    }
                }}
            >
                <div style={{
                    position: "relative",
                }}
                >
                    {this.props.isSquare
                        && <div
                            className="shadowImg"
                            style={{ position: "relative", overflow: "hidden", paddingBottom: "100%", backgroundColor: "#eeeeee", }}>
                            <img src={this.props.inviImage ? undefined : this.props.image}
                                style={{
                                    width: "100%",
                                    position: "absolute"
                                }} />
                        </div>
                    }
                    {!this.props.isSquare && <img
                        src={this.props.data.photoInfo?this.props.data.photoInfo.thumbUrl:undefined}
                        onLoad={this.imageLoadedCallback.bind(this)}
                        className="shadowImg"
                        style={{
                            width: "100%",
                            height: this.imageLoaded ? undefined : 0,
                            backgroundColor: "#eeeeee",
                            paddingBottom: this.imageLoaded ? 0 : 200 / 3 + "%",
                        }} />}
                    {(this.props.option && this.props.option.titleCenter)&&<div style={{ paddingTop: 12 }}>
                    </div>}
                    {
                        this.props.data.name &&
                        <div className="twoLineText"
                            style={{
                                ...((this.props.option && this.props.option.titleCenter)
                                    ? { top: "40%", textAlign: "center", width: "100%", position: "absolute", fontSize: 21 }
                                    : { marginTop: 7, }),
                                fontWeight: "bold",
                                paddingLeft: this.props.paddingContentTitleLeftRight ? this.props.paddingContentTitleLeftRight : undefined,
                                paddingRight: this.props.paddingContentTitleLeftRight ? this.props.paddingContentTitleLeftRight : undefined,
                                lineHeight: 1.4, marginBottom: 4,
                                maxHeight: 1.6 * config.fontStyle.h3.fontSize * 2,      //2 is 2 line
                            }}>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>
                                    {this.props.data.name}
                                </Tooltip>}
                            >
                                <a style={{
                                    ...((this.props.option && this.props.option.titleCenter) ? { color: "#fff" } : { color: "#000", }),
                                    cursor: "pointer"
                                }}>{this.props.data.name}</a>
                            </OverlayTrigger>
                        </div>
                    }

                    {this.props.data !== undefined && this.props.data.detailList !== undefined
                        && <ul style={{
                            display: "flex", flexWrap: "wrap", padding: 0
                            , listStyleType: "disc"
                        }}>
                            {this.props.data.detailList.map((rowData, rowIndex) => {
                                return <div key={rowIndex} style={{
                                    ...(rowIndex == 0
                                        ? { display: "inline-block" }
                                        : { paddingLeft: 28 })
                                }}>
                                    <li
                                        style={{
                                            color: "#93959f",
                                            position: "relative",
                                            whiteSpace: "nowrap",
                                            ...(rowIndex == 0
                                                ? { display: "inline-block" }
                                                : {})
                                        }}
                                    >
                                        {rowData}
                                    </li>
                                </div>
                            })}
                        </ul>
                    }

                    {this.props.data !== undefined && this.props.data.uspList !== undefined
                        && <ul style={{
                            marginTop: "2%", marginBottom: "2%", padding: 0, listStyleType: "disc"
                        }}>
                            {this.props.data.uspList.map((rowData, rowIndex) => {
                                <li key={rowIndex}>
                                    {rowData}
                                </li>
                            })}
                        </ul>
                    }

                    {this.props.data.salePrice !== undefined
                        && <div style={{ fontSize: 16 }}>
                            <div style={{ display: "inline-block", marginRight: 8, fontWeight: "bold" }}>
                                {"Price: " + this.props.data.salePrice}
                            </div>
                            {this.props.data.originalPrice
                                && <div style={{
                                    display: "inline-block", color: "#93959f",
                                    textDecoration: "line-through", marginRight: 8
                                }}>
                                    {this.props.data.originalPrice}
                                </div>}
                        </div>
                    }

                    {this.props.data !== undefined && this.props.data.termOfUse !== undefined
                        && <ul style={{
                            display: "flex", flexWrap: "wrap", padding: 0, marginTop: 8, fontSize: 11
                            , listStyleType: "disc"
                        }}>
                            {this.props.data.termOfUse.map((rowData, rowIndex) => {
                                return <div key={rowIndex} style={{
                                    ...(rowIndex == 0
                                        ? { display: "inline-block" }
                                        : { paddingLeft: 28 })
                                }}>
                                    <li
                                        style={{
                                            color: "#93959f",
                                            position: "relative",
                                            whiteSpace: "nowrap",
                                            ...(rowIndex == 0
                                                ? { display: "inline-block" }
                                                : {})
                                        }}
                                    >
                                        {rowData}
                                    </li>
                                </div>
                            })}
                        </ul>
                    }


                </div>
            </a >)
    }
}

export default Card;
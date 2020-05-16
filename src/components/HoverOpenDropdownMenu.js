
import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import common from '../data/common';

class HoverOpenDropdownMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDataDropdown: 0,
        }
        if(this.props.ref) {
            this.props.ref(this)
        }
        this.state.deepOpenMenu = [-1]
    }
    addOpenDataDropDown(add) {
        if (this.props.changeOpenDataDropDownCallToParent) {
            this.props.changeOpenDataDropDownCallToParent(add)
        }
        this.state.openDataDropdown = this.state.openDataDropdown + add;
        if(this.state.openDataDropdown < 0) {
            this.state.openDataDropdown = 0;
        }
        this.forceUpdate();
    }
    render() {
        // console.log("render")
        return <IconMenu
            iconButtonElement={this.props.iconButtonElement ? this.props.iconButtonElement : undefined}
            style={this.props.style ? this.props.style : undefined}
            menuStyle={{ marginTop: -8, ...(this.props.menuStyle?this.props.menuStyle:{}) }}
            onClick={e => {
                // console.log("click")
                if (navigator.userAgent.toLowerCase().indexOf("mobile") >= 0) {
                    this.addOpenDataDropDown(this.state.openDataDropdown > 0 ? -1 : 1)
                }
            }}
            onMouseEnter={e => {
                // console.log("enter")
                if (navigator.userAgent.toLowerCase().indexOf("mobile") < 0) {
                    this.addOpenDataDropDown(1)
                }
            }}
            onMouseLeave={e => {
                // console.log("leave")
                if (this.state.openDataDropdown > 0) {
                    setTimeout(function () {
                        this.addOpenDataDropDown(-1)
                    }.bind(this), 100);
                }
            }}
            open={this.state.openDataDropdown > 0}
            anchorOrigin={this.props.anchorOrigin ? this.props.anchorOrigin
                : this.props.direction === common.DIRECTION.RIGHT
                    ? { horizontal: 'right', vertical: 'top' }
                    : { horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={this.props.targetOrigin ? this.props.targetOrigin
                : this.props.direction === common.DIRECTION.RIGHT
                    ? { horizontal: 'left', vertical: 'top' }
                    : { horizontal: 'left', vertical: 'top' }}
        >
            <div
                onMouseEnter={e => {
                    if (navigator.userAgent.toLowerCase().indexOf("mobile") < 0) {
                        this.addOpenDataDropDown(1)
                    }
                }}
                onMouseLeave={e => {
                    if (navigator.userAgent.toLowerCase().indexOf("mobile") < 0) {
                        setTimeout(function () {
                            this.addOpenDataDropDown(-1)
                        }.bind(this), 100);
                    }
                }}
            >
                {this.props.data
                    && <div>{this.props.data.length > 0
                        ? <div style={{maxWidth:"100vw"}}>{this.props.direction === common.DIRECTION.SAME_MENU
                            ? <div style={{ display: "flex", overflowY:"-webkit-paged-x" }}>
                                {this.state.deepOpenMenu.map((rowData, rowIndex) => {
                                    if (rowData === -1) {
                                        this.state.tmp_currentObj = this.props.data
                                    } else {
                                        if (this.state.tmp_currentObj[rowData].data) {
                                            this.state.tmp_currentObj = this.state.tmp_currentObj[rowData].data
                                        } else {
                                            this.state.tmp_currentObj = this.state.tmp_currentObj[rowData]
                                        }
                                        if (this.state.tmp_currentObj.length === undefined) {
                                            this.state.tmp_currentObj = [this.state.tmp_currentObj]
                                        }
                                    }
                                    return <div style={{}}
                                        onMouseEnter={e => {
                                            this.addOpenDataDropDown(1)
                                        }}
                                        onMouseLeave={e => {
                                            setTimeout(function () {
                                                this.addOpenDataDropDown(-1)
                                                if (this.state.openDataDropdown === 0) {
                                                    this.state.deepOpenMenu = [-1]
                                                    this.forceUpdate();
                                                }
                                            }.bind(this), 150);
                                        }}
                                    >
                                        {this.state.tmp_currentObj.map((rowData1, rowIndex1) => {
                                            if (rowData1.iconButtonElement) {
                                                return <div
                                                    key={rowIndex}
                                                    onMouseEnter={e => {
                                                        this.state.deepOpenMenu = this.state.deepOpenMenu.splice(0, rowIndex + 1)
                                                        if (rowData1.data) {
                                                            this.state.deepOpenMenu.push(rowIndex1)
                                                        }
                                                        this.forceUpdate();
                                                    }}
                                                >
                                                    {rowData1.iconButtonElement}
                                                </div>
                                            }
                                            return rowData1
                                        })}
                                    </div>
                                })}
                            </div>
                            : this.props.data.map((rowData, rowIndex) => {
                                if (rowData.iconButtonElement) {
                                    return <HoverOpenDropdownMenu
                                        key={rowIndex}
                                        changeOpenDataDropDownCallToParent={function (add) {
                                            this.addOpenDataDropDown(add)
                                        }.bind(this)}
                                        iconButtonElement={rowData.iconButtonElement}
                                        style={rowData.style}
                                        direction={rowData.direction}
                                        data={rowData.data}
                                    />
                                }
                                return rowData
                            })
                        }</div>
                        : this.props.data}
                    </div>}
            </div>
        </IconMenu>
    }
}
HoverOpenDropdownMenu.propTypes = {
};
export default HoverOpenDropdownMenu;
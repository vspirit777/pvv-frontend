

import React, { PropTypes, Component } from 'react';

import { Collapse, OverlayTrigger, Tooltip } from 'react-bootstrap';
import $ from "jquery";
import common from '../../data/common';
import { config } from '../../config';
import LanguageIdMap from '../../language/LanguageIdMap'
import Language from '../../language/Language'
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import IconMenu from 'material-ui/IconMenu';
import Lightbox from 'react-image-lightbox';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { TextField } from 'material-ui';
import SuperComponent from '../../components/SuperComponent';
import HoverOpenDropdownMenu from '../../components/HoverOpenDropdownMenu';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Router from 'next/router'
import Head from 'next/head';

class PackageOption extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return <div>
      <Head>
        <style type="text/css">{`
          .productPackageListContainer{
            border: 1px solid #000;
            display: inline-flex;
            background-color: #fff;
            overflow: hidden;
            height: 37px;
          }
          .productPackageListContainer > i{
            font-size: 20px;
            margin-left: 8px;
            margin-right: 8px;
            padding-top: 8px;
          }
          .productPackageCheckingStatus {
            padding-right: 16px;
            font-size: 18px;
            padding-top: 4px;
            ${this.props.holder.props.initPropsData.checkAvailabilityDatePicker ? "visibility: hidden" : ""}
          }
          .productPackageContainer{
            padding: 16px 20px;
            margin: 0;
            margin-bottom: 12px;
            background: #fff;
          }
          .productPackageName{
            line-height: 24px;
            font-size: 18px;
            font-weight: bold;
          }
          .productPackageRightElement{
            float: right;
            text-align: right
          }
          .productPackageSale{
            display: inline-block;
            margin-right: 12px;
            line-height: 24px;
            margin-top: 8px;
          }
          .productPackageSelectBtn{
            color: ${config.colorConfig.main},
            label-color: ${config.colorConfig.main},
            background-color: #fff;
            border-color: "#fff";
            float: right;
            margin-top: 5px;
            padding: 4px 15px;
            height: 32px;
            font-weight: 600;
            border: 1px solid ${config.colorConfig.main};
            cursor: pointer;
            border-radius: 2px;
          }
          .productPackageDetailIcon{
            font-size: 20px;
            margin-left: 8px;
            margin-right: 8px;
            padding-top: 8px;
            position: absolute;
            left: 4px;
            top: 28px;
            color: #888;
          }
          .productPackageDetailCaretDownIcon{
            font-size: 16px;
            margin-left: 8px;
            margin-right: 8px;
            padding-top: 8px;
            position: absolute;
            right: 10px;
            top: 28px;
            color: rgb(0, 0, 0, 0.15);
          }
          .productPackageDetailMinusIcon{
            border-right: 1px solid #dcd8d8;
            display: flex;
            background-color: #fafafa;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            width: 33.33%;
          }
          .productPackageDetailCurrentAmount{
            border-right: 1px solid #dcd8d8;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 33.33%;
          }
          .productPackageDetailPlusIcon{
            display: flex;
            background-color: #fafafa;
            justify-content: center; 
            align-items: center;
            cursor: pointer;
            width: 33.33%;
          }
          .productPackageTotalPriceLabel{
            color: #888;
            font-size: 18px;
          }
          .productPackageTotalPrice{
            font-weight: bold;
            font-size: 24px;
          }

          .materialUIDatePickerLeft40>div{
            cursor:pointer !important;
          }
          .materialUIDatePickerLeft40>div>label{
              margin-left: 40px;
          }
          .materialUIDatePickerLeft40>div>input{
              margin-left: 40px;
          }

          .materialUISelectLeft40>label{
              margin-left: 40px;
              text-align:left !important;
          }
          .materialUISelectLeft40>input{
              margin-left: 40px;
              text-align:left !important;
              pointer-events:none;
          }
          .materialUISelectLeft40>div>div>div{
              margin-left: 40px;
          }
        `}</style>
      </Head>
      <div className='backgroundGrey'>
        <div className="pageSmallWidth">
          <div className="productSectionStyle">
            <div>
              <div >
                <h2 className="productSectionTitle">
                  {Language.getLanguage(LanguageIdMap.PACKAGE_OPTIONS)}
                </h2>
                <div className="mgBottom24">
                  <div className="focusBorderColorDefault productPackageListContainer">
                    <i className="fa fa-calendar" />
                    <div className="posRelative">
                      <div className="productPackageCheckingStatus">
                        {Language.getLanguage(LanguageIdMap.CHECKING_SERVICE_STATUS)}
                      </div>
                      {common.renderDatePicker({
                        label: "", value: this.props.holder.props.initPropsData.checkAvailabilityDatePicker
                        , onChangeValue: function (v) {
                          this.props.holder.props.initPropsData.checkAvailabilityDatePicker = v;
                          Display.getSchedule(this.props.initPropsData)
                            .then((jsonRes) => {
                              this.props.holder.forceUpdate();
                            })
                            .catch((err) => {
                            })
                          this.forceUpdate()
                        }.bind(this)
                        , style: { position: "absolute", top: -4, width: "100%" }
                        , setZeroHMS: true
                        , minDate: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0, 0, 0, 0)
                        , className: "materialUIDatePickerCenter"
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  {this.props.holder.props.initPropsData.schedule && this.props.holder.props.initPropsData.schedule.map((rowData, rowIndex) => {
                    rowData._tmpTotalPrice = 0;
                    rowData._tmpListChoosen = [];
                    if (rowData.schedulePrice && rowData.schedulePrice.schedulePriceItems
                      && rowData.schedulePrice.schedulePriceItems.length > 0) {
                      if (!rowData._tmpSalePrice) {
                        rowData._tmpSalePrice = rowData.schedulePrice.schedulePriceItems[0].price;
                      }
                      if (rowData._tmpIsChoosingPackage) {
                        for (let i = 0; i < rowData.schedulePrice.schedulePriceItems.length; i++) {
                          const element = rowData.schedulePrice.schedulePriceItems[i];
                          if (element.noOfItem && element.price) {
                            rowData._tmpTotalPrice += element.noOfItem * element.price;
                            rowData._tmpListChoosen.push(element.noOfItem + " x "
                              + (rowData.schedulePrice.schedulePriceType === LanguageIdMap.SCHEDULE_PRICE_TYPE_LIST.BY_PERSON.value
                                ? common.schedulePriceItemTypeMap[element.schedulePriceItemType]
                                + (element.label ? " (" + element.label + ")" : "")
                                : element.label)
                            )
                          }
                        }
                      }
                    }

                    return <div className='productPackageContainer'>
                      <div className="floatLeft">
                        <div className='productPackageName'>
                          {rowData.name}
                        </div>
                      </div>
                      <div className="productPackageRightElement">
                        {!rowData._tmpIsChoosingPackage
                          ? <div>
                            <div className="productPackageSale">
                              <div className="fontWeightBold">
                                <sup>{Language.getLanguage(common.moneyType)}</sup>
                                {" " + common.numberWithCommas(rowData._tmpSalePrice)}
                              </div>
                            </div>
                            <div className="hoverChangeButtonStyle0 productPackageSelectBtn"
                              onClick={e => {
                                for (let i = 0; i < this.props.holder.props.initPropsData.schedule.length; i++) {
                                  this.props.holder.props.initPropsData.schedule[i]._tmpIsChoosingPackage = undefined;
                                }
                                this.props.holder.props.initPropsData.currentChoosingPackage = rowData;
                                rowData._tmpIsChoosingPackage = true;
                                this.forceUpdate();
                              }}
                            >
                              {Language.getLanguage(LanguageIdMap.btnSelect).toUpperCase()}
                            </div>
                          </div>
                          : <div>
                            <div className="productPackageTotalPriceLabel">
                              {Language.getLanguage(LanguageIdMap.TOTAL_PRICE)}
                            </div>
                            <div className="productPackageTotalPrice">
                              <sup>{Language.getLanguage(common.moneyType)}</sup>
                              {" " + common.numberWithCommas(rowData._tmpTotalPrice)}
                            </div>
                          </div>
                        }
                      </div>
                      <div className="clearBoth" />

                      {!common.checkServer()&&<Collapse in={rowData._tmpIsChoosingPackage}>
                        <div>
                          {rowData.desc !== undefined && <div className="whiteSpacePreWrap">
                            {rowData.desc}
                          </div>}
                          <div className='row mgLeft0 mgRight0'>
                            <div className='col-sm-6'>
                              {rowData._tmpIsChoosingPackage && <div>

                                <div className="normal">
                                  {this.props.holder.doSomeThing(function () {
                                    if (!rowData.schedulePrice) {
                                      rowData.schedulePrice = {};
                                    }
                                    // if (this.props.holder.props.initPropsData.checkAvailabilityDatePicker && !rowData.schedulePrice.date) {
                                    //   rowData.schedulePrice.date = this.props.holder.props.initPropsData.checkAvailabilityDatePicker;
                                    // }
                                  }.bind(this))}
                                  {common.renderDatePicker({
                                    label: Language.getLanguage(LanguageIdMap.SELECT_DATE)
                                    , value: rowData.schedulePrice.date
                                    , onChangeValue: function (v) {
                                      // let newd = new Date(v)
                                      // console.log(newd)
                                      // let d = new Date(rowData.schedulePrice.date)
                                      // console(d)
                                      // d.setDate(newd.getDate());
                                      // d.setMonth(newd.getMonth());
                                      // d.setFullYear(newd.getFullYear());
                                      // rowData.schedulePrice.date = d.getTime();
                                      rowData.schedulePrice.date = v;
                                      this.forceUpdate()
                                    }.bind(this)
                                    , style: { width: 300, maxWidth: "100%" }
                                    , minDate: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0, 0, 0, 0)
                                    , className: "materialUIDatePickerLeft40"
                                    , setZeroHMS: true
                                    , shouldDisableDate: function (v) {
                                      let d = new Date(v);
                                      let returnData = true;
                                      if (rowData.repeatOn) {
                                        if (rowData.repeatOn.indexOf(d.getDay() + 1) >= 0) {
                                          returnData = false;
                                        }
                                      }
                                      if (rowData.repeatUntil) {
                                        if (d.getTime() > rowData.repeatUntil) {
                                          returnData = true;
                                        }
                                      }
                                      if (rowData.startDate) {
                                        if (d.getTime() < rowData.startDate) {
                                          returnData = true;
                                        }
                                      }
                                      if (rowData.minimumNotice) {
                                        if (d.getTime() < new Date().getTime() + rowData.minimumNotice) {
                                          returnData = true;
                                        }
                                      }
                                      if (rowData.excludeDates) {
                                        if (rowData.excludeDates.indexOf(d.getTime()) >= 0) {
                                          returnData = true;
                                        }
                                      }
                                      if (rowData.includeDates) {
                                        if (rowData.includeDates.indexOf(d.getTime()) >= 0) {
                                          returnData = false;
                                        }
                                      }
                                      return returnData;
                                    }.bind(this)
                                  })}
                                  <i className="fa fa-calendar productPackageDetailIcon" />
                                  <i className="fa fa-caret-down productPackageDetailCaretDownIcon" />
                                </div>

                                {rowData.listStartTimes && rowData.listStartTimes.length > 0  && !common.checkServer()
                                  && <div style={{ position: "relative" }}>
                                  <SelectField
                                    className="materialUISelectLeft40"
                                    floatingLabelText={Language.getLanguage(LanguageIdMap.SELECT_TIME)}
                                    value={rowData._tmpSelectTime}
                                    onChange={(event, index, values) => {
                                      rowData._tmpSelectTime = values;
                                      // let d = new Date(rowData.schedulePrice.date)
                                      // d.setHours(rowData.listStartTimes[values].hour)
                                      // d.setMinutes(rowData.listStartTimes[values].minute)
                                      // rowData.schedulePrice.date = d.getTime();

                                      rowData.schedulePrice.time = rowData.listStartTimes[values]
                                      this.forceUpdate();
                                    }}
                                    selectedMenuItemStyle={{ color: config.colorConfig.main }}
                                    style={{ width: 300, maxWidth: "100%" }}
                                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                                  >
                                    {rowData.listStartTimes.map((rowData1, rowIndex1) => {
                                      return <MenuItem
                                        value={rowIndex1}
                                        primaryText={rowData1.hour + ":" + (rowData1.minute >= 10 ? rowData1.minute : "0" + rowData1.minute)}
                                      />
                                    })}
                                  </SelectField>
                                  <i className="fa fa-clock-o productPackageDetailIcon" />
                                </div>}

                                {!common.checkServer() && <div style={{}}>
                                  <IconMenu
                                    open={this.state.packageQuantityMenuMustDisappear
                                      ? false : undefined}
                                    iconButtonElement={
                                      <OverlayTrigger
                                        placement={"bottom"}
                                        overlay={rowData._tmpListChoosen.length > 0 ? <Tooltip style={{}}>
                                          <div>{rowData._tmpListChoosen.join(" ,")}</div>
                                        </Tooltip> : <div />}
                                      >
                                        <div style={{ position: "relative", display: "inline-block" }}>
                                          <TextField
                                            className="materialUISelectLeft40"
                                            floatingLabelText={Language.getLanguage(LanguageIdMap.PACKAGE_QUANTITY)}
                                            floatingLabelStyle={{ textAlign: "center", width: "100%", }}
                                            floatingLabelShrinkStyle={{ marginLeft: 40 }}
                                            style={{ cursor: "pointer", width: 300, maxWidth: "100%" }}
                                            inputStyle={{
                                              textAlign: "center", width: 220, maxWidth: "100%"
                                            }}
                                            value={rowData._tmpListChoosen.join(" ,")}
                                            onChange={(e, newValue) => this.forceUpdate()}
                                          />

                                          <i className="fa fa-user-o productPackageDetailIcon" />
                                          <i className="fa fa-caret-down productPackageDetailCaretDownIcon" />
                                        </div>
                                      </OverlayTrigger>}
                                    menuStyle={{ padding: 0 }}
                                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                                  >
                                    <div style={{ width: 484, maxWidth: Math.round(common.getViewportWidth()) }}>
                                      {rowData.schedulePrice && rowData.schedulePrice.schedulePriceItems
                                        && rowData.schedulePrice.schedulePriceItems.map((rowData1, rowIndex1) => {
                                          return [
                                            <div style={{
                                              padding: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap"
                                              , alignItems: "baseline"
                                            }}>
                                              {common.schedulePriceItemTypeMap && <div style={{
                                                display: "table-cell", verticalAlign: "middle", whiteSpace: "nowrap"
                                                , maxWidth: Math.round(common.getViewportWidth()) - 180
                                              }}>
                                                {rowData.schedulePrice.schedulePriceType === LanguageIdMap.SCHEDULE_PRICE_TYPE_LIST.BY_PERSON.value ?
                                                  common.schedulePriceItemTypeMap[rowData1.schedulePriceItemType]
                                                  + (rowData1.label ? " (" + rowData1.label + ")" : "")
                                                  : rowData1.label}
                                              </div>}


                                              <div style={{ display: "flex", alignItems: "baseline" }}>
                                                <div>
                                                  <sup>{Language.getLanguage(common.moneyType)}</sup>
                                                  {" " + common.numberWithCommas(rowData1.price)}
                                                </div>

                                                <div style={{
                                                  display: "flex", width: 104, height: 33, marginLeft: 10
                                                  , border: "1px solid #dcd8d8",
                                                }}>
                                                  <i className="fa fa-minus productPackageDetailMinusIcon"
                                                    onClick={e => {
                                                      let _total = 0;
                                                      for (let i = 0; i < rowData.schedulePrice.schedulePriceItems.length; i++) {
                                                        if (rowData.schedulePrice.schedulePriceItems[i].noOfItemNeedconfirm) {
                                                          _total += rowData.schedulePrice.schedulePriceItems[i].noOfItemNeedconfirm;
                                                        }
                                                      }
                                                      if (rowData1.noOfItemNeedconfirm) {
                                                        if (rowData.minQuantity && _total <= rowData.minQuantity) {
                                                          this.props.holder.setState({
                                                            alertSnackBar: Language.getLanguage(LanguageIdMap.MINIMUM_CHOOSE_VALUE,
                                                              {
                                                                name: rowData.schedulePrice.schedulePriceType === LanguageIdMap.SCHEDULE_PRICE_TYPE_LIST.BY_PERSON.value ?
                                                                  common.schedulePriceItemTypeMap[rowData1.schedulePriceItemType]
                                                                  + (rowData1.label ? " (" + rowData1.label + ")" : "")
                                                                  : rowData1.label,
                                                                value: rowData.minQuantity
                                                              })
                                                          })
                                                        } else {
                                                          rowData1.noOfItemNeedconfirm--;
                                                        }
                                                        this.forceUpdate();
                                                      }
                                                    }} />
                                                  <div
                                                    className="productPackageDetailCurrentAmount">
                                                    {rowData1.noOfItemNeedconfirm ? rowData1.noOfItemNeedconfirm : 0}
                                                  </div>
                                                  <i className="fa fa-plus productPackageDetailPlusIcon"
                                                    onClick={e => {
                                                      let _total = 0;
                                                      for (let i = 0; i < rowData.schedulePrice.schedulePriceItems.length; i++) {
                                                        if (rowData.schedulePrice.schedulePriceItems[i].noOfItemNeedconfirm) {
                                                          _total += rowData.schedulePrice.schedulePriceItems[i].noOfItemNeedconfirm;
                                                        }
                                                      }

                                                      if (!rowData1.noOfItemNeedconfirm) {
                                                        rowData1.noOfItemNeedconfirm = 0;
                                                      }
                                                      if (rowData.minQuantity && _total + 1 < rowData.minQuantity) {
                                                        rowData1.noOfItemNeedconfirm = rowData.minQuantity - _total;

                                                        if (rowData1.noOfItemNeedconfirm <= 0) {
                                                          rowData1.noOfItemNeedconfirm = 0;
                                                          this.props.holder.setState({
                                                            alertSnackBar: Language.getLanguage(LanguageIdMap.MINIMUM_CHOOSE_VALUE,
                                                              {
                                                                name: rowData.schedulePrice.schedulePriceType === LanguageIdMap.SCHEDULE_PRICE_TYPE_LIST.BY_PERSON.value ?
                                                                  common.schedulePriceItemTypeMap[rowData1.schedulePriceItemType]
                                                                  + (rowData1.label ? " (" + rowData1.label + ")" : "")
                                                                  : rowData1.label,
                                                                value: rowData.minQuantity
                                                              })
                                                          })
                                                        }
                                                      } else if (rowData.maxQuantity && _total >= rowData.maxQuantity) {
                                                        this.props.holder.setState({
                                                          alertSnackBar: Language.getLanguage(LanguageIdMap.MAXIMUM_CHOOSE_VALUE,
                                                            {
                                                              name: rowData.schedulePrice.schedulePriceType === LanguageIdMap.SCHEDULE_PRICE_TYPE_LIST.BY_PERSON.value ?
                                                                common.schedulePriceItemTypeMap[rowData1.schedulePriceItemType]
                                                                + (rowData1.label ? " (" + rowData1.label + ")" : "")
                                                                : rowData1.label,
                                                              value: rowData.maxQuantity
                                                            })
                                                        })
                                                      } else if (rowData.amount && _total >= rowData.amount) {
                                                        this.props.holder.setState({
                                                          alertSnackBar: Language.getLanguage(LanguageIdMap.MAXIMUM_CHOOSE_VALUE,
                                                            {
                                                              name: rowData.schedulePrice.schedulePriceType === LanguageIdMap.SCHEDULE_PRICE_TYPE_LIST.BY_PERSON.value ?
                                                                common.schedulePriceItemTypeMap[rowData1.schedulePriceItemType]
                                                                + (rowData1.label ? " (" + rowData1.label + ")" : "")
                                                                : rowData1.label,
                                                              value: rowData.amount
                                                            })
                                                        })
                                                      } else {
                                                        rowData1.noOfItemNeedconfirm++;
                                                      }

                                                      this.forceUpdate();
                                                    }} />
                                                </div>
                                              </div>
                                            </div>
                                            , <hr style={{ margin: 0 }} />
                                          ]
                                        })}
                                      <div style={{ padding: "17px 20px", display: "flex", justifyContent: "flex-end" }}>
                                        <RaisedButton
                                          buttonStyle={{ ...config.buttonStyle[1], height: 33, padding: 0 }}
                                          style={{
                                            marginBottom: 12,
                                            display: "inline-block", margin: 0, marginRight: 20,
                                            fontWeight: "bold",
                                            outline: "none",
                                          }}
                                          onClick={e => {
                                            this.setState({ packageQuantityMenuMustDisappear: true }
                                              , function () {
                                                this.setState({ packageQuantityMenuMustDisappear: undefined })
                                              }.bind(this)
                                            )
                                          }}
                                        >{Language.getLanguage(LanguageIdMap.btnCancel)}</RaisedButton>
                                        <RaisedButton
                                          buttonStyle={{ ...config.buttonStyle[0], height: 33, padding: 0 }}
                                          style={{
                                            marginBottom: 12,
                                            display: "inline-block", margin: 0,
                                            fontWeight: "bold",
                                            outline: "none",
                                          }}
                                          onClick={e => {
                                            if (rowData.schedulePrice && rowData.schedulePrice.schedulePriceItems) {
                                              for (let i = 0; i < rowData.schedulePrice.schedulePriceItems.length; i++) {
                                                if (rowData.schedulePrice.schedulePriceItems[i].noOfItemNeedconfirm !== undefined) {
                                                  rowData.schedulePrice.schedulePriceItems[i].noOfItem
                                                    = rowData.schedulePrice.schedulePriceItems[i].noOfItemNeedconfirm
                                                }
                                              }
                                            }
                                            this.setState({ packageQuantityMenuMustDisappear: true }
                                              , function () {
                                                this.setState({ packageQuantityMenuMustDisappear: undefined })
                                              }.bind(this)
                                            )
                                          }}
                                        >{Language.getLanguage(LanguageIdMap.ACCEPT)}</RaisedButton>
                                      </div>
                                    </div>
                                  </IconMenu>
                                </div>}
                              </div>}
                            </div>
                            <div className='col-sm-6'>
                              {rowData._tmpTotalPrice > 0 && <div>
                                <div style={{ fontSize: 18, marginTop: 18, paddingBottom: 4, fontWeight: "bold" }}>
                                  {Language.getLanguage(LanguageIdMap.PRICE_BREAKDOWN)}
                                </div>
                                {rowData.schedulePrice && rowData.schedulePrice.schedulePriceItems
                                  && rowData.schedulePrice.schedulePriceItems.map((rowData1, rowIndex1) => {
                                    if (rowData1.noOfItem) {
                                      return <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                                        <div>
                                          {rowData.schedulePrice.schedulePriceType === LanguageIdMap.SCHEDULE_PRICE_TYPE_LIST.BY_PERSON.value
                                            ? common.schedulePriceItemTypeMap[rowData1.schedulePriceItemType]
                                            + (rowData1.label ? " (" + rowData1.label + ")" : "")
                                            : rowData1.label}&nbsp;&nbsp;&nbsp;
                                    {rowData1.noOfItem + " x " + Language.getLanguage(common.moneyType)
                                            + " " + common.numberWithCommas(rowData1.price)}
                                        </div>
                                        <div>
                                          {Language.getLanguage(common.moneyType)
                                            + " " + common.numberWithCommas(rowData1.price * rowData1.noOfItem)}
                                        </div>
                                      </div>
                                    }
                                  })}
                                {rowData.schedulePrice.date !== undefined
                                  && (!rowData.listStartTimes || rowData.listStartTimes.length === 0 || rowData._tmpSelectTime !== undefined)
                                  && <div style={{
                                    display: "flex",
                                    ...(common.getViewportWidth() >= 510
                                      ? { justifyContent: "flex-end" } : { flexWrap: "wrap", justifyContent: "center" }),
                                    paddingTop: common.getViewportWidth() >= config.sizeConfig.widthSm
                                      ? 120 - rowData._tmpListChoosen.length * 28 : 12
                                  }}>
                                    <RaisedButton
                                      buttonStyle={{ ...config.buttonStyle[0], padding: 0, fontSize: 16 }}
                                      style={{
                                        marginBottom: 12, height: 45, minWidth: 180,
                                        display: "inline-block", margin: 12,
                                        fontWeight: "bold",
                                        outline: "none",
                                      }}
                                      onClick={e => {
                                        e.preventDefault();
                                        if (!rowData.bookNow) {
                                          delete common.booknowData;
                                          window.localStorage.removeItem("paynowData")
                                        }
                                        this.props.holder.prepareDataWhenClickAddToCartOrBookNow({ rowData: rowData });
                                      }}
                                    >{Language.getLanguage(LanguageIdMap.ADD_TO_CART).toUpperCase()}</RaisedButton>
                                    <RaisedButton
                                      buttonStyle={{ ...config.buttonStyle[0], padding: 0, fontSize: 16 }}
                                      style={{
                                        marginBottom: 12, height: 45, minWidth: 180,
                                        display: "inline-block", margin: 12,
                                        fontWeight: "bold",
                                        outline: "none",
                                      }}
                                      onClick={e => {
                                        e.preventDefault();
                                        this.props.holder.prepareDataWhenClickAddToCartOrBookNow({ rowData: rowData, bookNow: true });
                                      }}
                                    >{Language.getLanguage(LanguageIdMap.BOOK_NOW).toUpperCase()}</RaisedButton>
                                  </div>}
                              </div>}
                            </div>
                          </div>
                        </div>
                      </Collapse>}

                    </div>
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

class ShareBooknowFavourite extends Component {
  render() {
    return <div>
      <Head>
        <style type="text/css">{`
          .productFavBooknowContainer{
            display: flex;
            justify-content: flex-end;
          }
          .productFavContainer{
            display: inline-block;
            padding: 5px;
            border-radius: 5px;
            border: 1px solid #ddd;
          }
      `}</style>
      </Head>
      <div className="productFavBooknowContainer">
        <div
          className="productFavContainer"
          onClick={e => {
            e.preventDefault();
            let doSomeThing = function () {
              common.fetcher(
                config.api.hostType.product_url,
                config.api.hostEndPoint.wishlist,
                "post",
                undefined,
                {
                  targetId: this.props.holder.props.initPropsData.data.productId,
                  act: this.props.holder.props.initPropsData.data.fav ? 1 : 0,
                },
                { typeFormData: true }
              )
                .then((jsonRes) => {
                })
                .catch((err) => {
                  console.log("error pro3:" + err)
                })
              this.props.holder.props.initPropsData.data.fav = !this.props.holder.props.initPropsData.data.fav;
              this.forceUpdate();
            }.bind(this)

            if (!common.checkLoginUser()) {
              common.more.needCallbackWhenLogin = doSomeThing.bind(this)
              this.props.holder.setState({ loginModalPopup: true });
            } else {
              doSomeThing();
            }
          }}
        >
          {!common.checkServer()&&<Checkbox
            iconStyle={{
              width: 40, height: 40, marginRight: 0, left: 0,
              color: config.colorConfig.main, fill: config.colorConfig.main,
            }}
            checkedIcon={<ActionFavorite />}
            uncheckedIcon={<ActionFavoriteBorder />}
            checked={this.props.holder.props.initPropsData.data ? this.props.holder.props.initPropsData.data.fav : false}
          />}
        </div>
        <div style={{}}>
        {!common.checkServer()&&<RaisedButton
            buttonStyle={{ ...config.buttonStyle[0], height: 52, minWidth: 120, padding: 0 }}
            style={{
              marginBottom: 12,
              margin: 0, marginLeft: 12,
              fontWeight: "bold",
              outline: "none",
            }}
            onClick={e => {
              if ($('#package_options') && $('#package_options').offset()) {
                $('html, body').animate({
                  scrollTop: $('#package_options').offset().top - this.props.holder.getTopHeightNav() - 50
                }, 300)
              }

              if (this.props.holder.props.initPropsData.schedule) {
                let hasChoosingPackage = false;
                for (let i = 0; i < this.props.holder.props.initPropsData.schedule.length; i++) {
                  if (this.props.holder.props.initPropsData.schedule[i]._tmpIsChoosingPackage === true) {
                    hasChoosingPackage = true;
                    break;
                  }
                }
                if (hasChoosingPackage === false && this.props.holder.props.initPropsData.schedule.length > 0) {
                  this.props.holder.props.initPropsData.schedule[0]._tmpIsChoosingPackage = true
                }
                if (this.props.holder.packageOptionRef) {
                  this.props.holder.packageOptionRef.forceUpdate();
                }
              }
            }}
          >{Language.getLanguage(LanguageIdMap.BOOK_NOW)}</RaisedButton>}
        </div>
      </div>
    </div>
  }
}

class StickyMenu extends Component {
  render() {
    if (!common.checkMobile() && this.props.holder.props.initPropsData.stickyMenuList
      && this.props.holder.props.initPropsData.needRenderShareBooknowFavoriteAtStickyMenu) {
      return <div>
        <Head>
          <style type="text/css">{`
          .productStickyMenuContainer{
            position: fixed;
            z-index: 100;
            background-color: #fff;
            width: 100%;
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
            top: ${document.getElementById("header") ? document.getElementById("header").clientHeight : undefined}px;
          }
          .productStickyMenu{
            max-width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 8px;
            padding-bottom: 8px;
          }
          .productStickyMenuEle{
            display: inline-block;
            line-height: 36px;
            cursor: pointer;
            padding-right: 20px;
            padding-left: 20px;
            white-space: nowrap;
            
          }
          .productStickyMenuEleFocus{
            border-bottom: 2px solid ${config.colorConfig.main}
          }
        `}</style>
        </Head>
        <div id="stickyMenuId" className="productStickyMenuContainer">
          <div className="pageSmallWidth productStickyMenu">
            <div className="displayFlex">
              {this.props.holder.props.initPropsData.stickyMenuList.map((rowData, rowIndex) => {
                return <div
                  className={`hoverDefaultColor productStickyMenuEle 
                  ${this.props.holder._currentScrollFocus === rowData.id ? `productStickyMenuEleFocus` : ""}`}
                  onClick={e => {
                    $('html, body').animate({
                      scrollTop: $('#' + rowData.id).offset().top - this.props.holder.getTopHeightNav() - 80
                    }, 300)
                  }}
                >
                  {rowData.name}
                </div>
              })}
            </div>
            <ShareBooknowFavourite holder={this.props.holder} />
          </div>
        </div>
      </div>
    } else {
      return <div />
    }
  }
}

class Display extends SuperComponent {
  constructor(props, context) {
    super(props, context);
    this.state.photoIndex = -1;
  }

  scrollEventCallback() {
    if (!common.checkMobile()
      && $('#renderShareBooknowFavoriteOnTopContainerId') && $('#renderShareBooknowFavoriteOnTopContainerId').offset()) {
      if (this.props.initPropsData.needRenderShareBooknowFavoriteAtStickyMenu
        && document.documentElement.scrollTop < $('#renderShareBooknowFavoriteOnTopContainerId').offset().top - 50) {
        this.props.initPropsData.needRenderShareBooknowFavoriteAtStickyMenu = false
        if (this.stickyMenuRef) {
          this.stickyMenuRef.forceUpdate();
        }
      } else if (!this.props.initPropsData.needRenderShareBooknowFavoriteAtStickyMenu
        && document.documentElement.scrollTop >= $('#renderShareBooknowFavoriteOnTopContainerId').offset().top - 50) {
        this.props.initPropsData.needRenderShareBooknowFavoriteAtStickyMenu = true
        if (this.stickyMenuRef) {
          this.stickyMenuRef.forceUpdate();
        }
      }
    }
  }

  static getInitialPromiseListForProps(context) {
    common.initPropsData.alias = common.location.pathArr[2];
    let promiseArr = [
      Display.getProductDetail(common.initPropsData),
      Display.getProductRelative(common.initPropsData),
      Display.getSchedule(common.initPropsData),
    ]
    return promiseArr;
  }
  static getProductDetail(state = common.initPropsData) {
    return common.fetcher(
      config.api.hostType.product_url,
      config.api.hostEndPoint.productDetail,
      "get",
      { alias: state.alias },
    )
      .then((jsonRes) => {
        let data = jsonRes.data;
        data.alias = data.alias;
        if (data.howUse) {
          try {
            data.howUse = JSON.parse(data.howUse)
          } catch (error) {
            data.howUse = undefined;
          }
        }
        if (data.highlight) {
          data.highlight = data.highlight.replace(/style=""/g, "")
        }
        if (data.longDescription) {
          data.longDescription = data.longDescription.replace(/style=""/g, "")
        }
        if (data.actInfo) {
          data.actInfo = data.actInfo.replace(/style=""/g, "")
        }
        if (data.faq) {
          data.faq = data.faq.replace(/style=""/g, "")
        }

        state.seoTitle = jsonRes.data.seoTitle;
        state.seoDescription = jsonRes.data.metaDesc;
        if (jsonRes.data.featureImage) {
          state.seoImage = jsonRes.data.featureImage;
        }

        state.data = data;
      })
      .catch((err) => {
      })
  }
  static getProductRelative(state = common.initPropsData) {
    return common.fetcher(
      config.api.hostType.product_url,
      config.api.hostEndPoint.productRelative,
      "get",
      { alias: state.alias, offset: 0, size: 10 }
    )
      .then((jsonRes) => {
        if (jsonRes.data) {
          for (let i = 0; i < jsonRes.data.length; i++) {
            if (jsonRes.data[i].alias === state.alias) {
              jsonRes.data.splice(i, 1);
              break;
            }
          }
        }
        state.productRelative = {
          data: jsonRes.data,
          _configMaxCardDisplayOfRow: 3,
          _leftRightHeightButton: "33%",
        };
      })
      .catch((err) => {
      })
  }
  static getSchedule(state = common.initPropsData) {
    return common.fetcher(
      config.api.hostType.product_url,
      state.checkAvailabilityDatePicker ? config.api.hostEndPoint.scheduleByDay : config.api.hostEndPoint.schedule,
      "get",
      {
        alias: state.alias,
        ...(state.checkAvailabilityDatePicker ? { date: state.checkAvailabilityDatePicker } : {})
      }
    )
      .then((jsonRes) => {
        state.schedule = jsonRes.data;
      })
      .catch((err) => {
      })
  }
  setupScrollFocusCallbackArr() {
    if (!this.props.initPropsData.needSetupStickyMenuListCallback) {
      return
    }
    this.props.initPropsData.needSetupStickyMenuListCallback = true;

    this.scrollFocusCallbackArr = undefined;
    if (this.props.initPropsData.stickyMenuList) {
      for (let i = 0; i < this.props.initPropsData.stickyMenuList.length; i++) {
        this.addToScrollFocusCallback(this.props.initPropsData.stickyMenuList[i].id, () => {
          if (this.stickyMenuRef) {
            this.stickyMenuRef.forceUpdate();
          }
        })
      }
    }
  }
  componentDidMount() {
    super.componentDidMount()
    this.setupScrollFocusCallbackArr()
  }
  componentDidUpdate() {
    super.componentDidUpdate()
    this.setupScrollFocusCallbackArr()
  }


  checkAndLoadData() {
    // console.log("check data product:"+common.location.pathArr)


    if (super.checkAndLoadData() == false) {
      return false;
    }


    this.props.initPropsData.stickyMenuList = undefined;
    this.scrollFocusCallbackArr = undefined;
    this.props.initPropsData.alias = common.location.pathArr[2];

    this.props.initPropsData.data = undefined;
    this.loadingCountdown++;




    this.loadingCountdown++;


    this.forceUpdate();

    return true;
  }



  renderBanner() {
    if (!this.props.initPropsData.data || !this.props.initPropsData.data.featureImage) {
      return;
    }
    return <div>
      <Head>
        <style type="text/css">{`
          .breakcumContainer{
            display: flex;
            justify-content: space-between;
            min-height: 48px;
          }
          .breakcumProduct{
            display: flex;
            align-items: center;
            overflow: hidden;
          }
          .breakcumProduct>a{
            font-weight: bold;
            white-space: nowrap;
          }
          .breakcumProduct > i{
            margin-left: 12px;
            margin-right: 12px;
          }
          .breakcumProductPhoneContainer{
            display: flex;
            align-items: center;
            position: relative;
            padding-left: 12px;
          }
          .breakcumProductPhoneContainer > .add3dots{
            position: absolute;
            left: 0;
          }
          .breakcumProductPhoneContainer > i {
            color: ${config.colorConfig.main};
            margin-left: 8px;
            margin-right: 8px;
            font-size: 32px;
          }
          .breakcumProductPhoneContainer > .phoneNumber{
            font-weight: bold;
            display: inline-block;
            white-space: nowrap;
          }
          .productBackgroundContainer{
            overflow: hidden;
            display: flex;
            justify-content: center;
            ${Math.round(common.getViewportWidth()) >= config.pageSmallWidthStyle.width ? "height: 70vh;" : "height: 50vh;"}
          }
          .productBackgroundImage{
            width: 100%;
            object-fit: cover;
            max-width: 100%;
            z-index: 0;
            height: 100%;
          }
        `}</style>
      </Head>
      <div className="fontsize16">
        <div className="breakcumContainer pageSmallWidth">
          <div id="breakcumProduct" className="breakcumProduct" >
            <a href={config.shortUrl.home}
              className="colorMain"
              onClick={e => {
                e.preventDefault();
                Router.push(config.shortUrl.home)
              }}
            >
              {Language.getLanguage(LanguageIdMap.HOME)}
            </a>
            <i className="fa fa-angle-right" />
            {this.props.initPropsData.data.destinations && this.props.initPropsData.data.destinations.map((rowData, rowIndex) => {
              return [
                <a href={config.shortUrl.destination + "/" + rowData.alias}
                  className="colorInherit"
                  onClick={e => {
                    e.preventDefault();
                    Router.push(config.shortUrl.destination, config.shortUrl.destination + "/" + rowData.alias)
                  }}
                >
                  {rowData.briefName}
                </a>,
                <i className="fa fa-angle-right" />,
              ]
            })}

            <OverlayTrigger
              placement={"bottom"}
              overlay={<Tooltip style={{}}>
                {this.props.initPropsData.data.productName}
              </Tooltip>}
            >
              <div style={{ whiteSpace: "nowrap", }}>{this.props.initPropsData.data.productName}</div>
            </OverlayTrigger>
          </div>
          <div className="breakcumProductPhoneContainer">
            {common.checkOverflow() && <div className="add3dots">...</div>}
            <i className="fa fa-phone" />
            <div className="phoneNumber">{config.phoneContact}</div>
          </div>
        </div>
        <div className="productBackgroundContainer">
          <img
            className="productBackgroundImage"
            alt={this.props.initPropsData.data.featureImage.altText}
            src={this.props.initPropsData.data.featureImage.photoUrl}
          />
        </div>
      </div>
    </div>
  }
  renderData() {
    if (!this.props.initPropsData.data) {
      return;
    }
    // const sectionStyle = (Math.round(common.getViewportWidth()) >= config.sizeConfig.widthSm
    //   ? { paddingLeft: 64, paddingRight: 64, paddingTop: 24, paddingBottom: 24 }
    //   : { paddingLeft: 32, paddingRight: 32, paddingTop: 24, paddingBottom: 24 }) //seperate to override
    return <div>
      <Head>
        <style type="text/css">{`
          .productSectionStyle{
            ${Math.round(common.getViewportWidth()) >= config.sizeConfig.widthSm ? "padding:24px 64px" : "padding:24px 32px"}
          }
          .productBody{
            fontSize: 18, lineHeight: 27px 
          }
          .productTitleSection{
            margin: 0;
            background-color: #fff;
            ${Math.round(common.getViewportWidth()) >= config.sizeConfig.widthSm ? "margin-top: -64px;" : ""}
          }
          .productTitleSectionLeft{
            vertical-align: top;
            ${Math.round(common.getViewportWidth()) >= 900
            ? "width: 61%; display: inline-block;"
            : Math.round(common.getViewportWidth()) >= 500
              ? "width: 53%; letter-spacing: .2px; vertical-align: top; display: inline-block;" : ""}
          }
          .productTitleSectionLeft > h1{
            margin-top: 0;
            margin-bottom: 0;
            ${Math.round(common.getViewportWidth()) >= config.pageSmallWidthStyle.width
            ? "font-size: 48px; margin-bottom: 16px;"
            : Math.round(common.getViewportWidth()) >= config.sizeConfig.widthSm
              ? "letter-spacing: .2px; vertical-align: top; margin-bottom: 12px;"
              : "margi-bottom: 8px;"}
          }
          .productTitleSectionRight{
            text-align: right;
            ${Math.round(common.getViewportWidth()) >= 900
            ? "width: 39%; display: inline-block;"
            : Math.round(common.getViewportWidth()) >= 500
              ? "width: 47%; letter-spacing: .2px; display: inline-block;" : ""}
          }
          .productTitleSectionRightMoney{
            display: inline-block;
            text-decoration: line-through;
            color: #93959f;
            margin-right: 8px;
          }
          .productTitleSectionRightDiscount{
            display: inline-block;
            background-color: #e00;
            padding: 2px 4px;
            color: #fff;
          }
          .productTitleSectionRightFrom{
            display: inline-block;
            margin-right: 8px;
            font-size: 24px;
          }
          .productTitleSectionRightPrice{
            display: inline-block;
            ${Math.round(common.getViewportWidth()) >= config.sizeConfig.widthSm
            ? "font-size: 32px" : "font-size: 24px; "}
          }
          .productTitleSectionRightExplain{
            margin-bottom: 16px;
            color: #93959f;
          }
        `}</style>
      </Head>
      <StickyMenu holder={this} ref={r => this.stickyMenuRef = r} />
      <div className="productBody">
        <div className="pageSmallWidth posRelative">
          <div
            className="productSectionStyle productTitleSection">
            {this.props.initPropsData.data.services && !common.checkServer()
            &&this.props.initPropsData.data.services.map((rowData, rowIndex) => {
              return <HoverOpenDropdownMenu
                anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                iconButtonElement={
                  <img style={{ width: 20, height: 20, marginRight: 8, marginBottom: 12 }}
                    src={rowData.iconUrl} />
                }
                data={[
                  <div style={{ paddingTop: 8, paddingLeft: 12, paddingRight: 12 }}>{rowData.name}</div>
                ]}
              />
            })}
            <div>
              <div className="productTitleSectionLeft">
                <h1>
                  {this.props.initPropsData.data.productName}
                </h1>
              </div>

              <div className="productTitleSectionRight">
                {this.props.initPropsData.data.discount !== undefined && <div className="mgBottom8">
                  <div className="productTitleSectionRightMoney">
                    {common.numberWithCommas(this.props.initPropsData.data.advertisePrice) + Language.getLanguage(common.moneyType)}
                  </div>
                  <div className="productTitleSectionRightDiscount">
                    {"-" + this.props.initPropsData.data.discount + "%"}
                  </div>
                </div>}
                <div className="mgBottom8">
                  <div className="productTitleSectionRightFrom">
                    {Language.getLanguage(LanguageIdMap.from)}
                  </div>
                  <div className="productTitleSectionRightPrice">
                    {common.numberWithCommas(this.props.initPropsData.data.newPrice
                      ? this.props.initPropsData.data.newPrice
                      : this.props.initPropsData.data.advertisePrice)
                      + Language.getLanguage(common.moneyType)}
                  </div>
                </div>
                <div className="productTitleSectionRightExplain">
                  {this.props.initPropsData.data.priceExplain}
                </div>
                <div id={"renderShareBooknowFavoriteOnTopContainerId"}>
                  <ShareBooknowFavourite holder={this} />
                </div>
              </div>
            </div>
          </div>
        </div>


        <Head>
          <style type="text/css">{`
            .productBestListContainer{
              border: 1px solid #eee;
              margin-top: 30px;
              padding: ${Math.round(common.getViewportWidth()) >= config.sizeConfig.widthSm ? "32px 0" : "12px 0"};
            }
            .productBestListContainer > div {
              ${Math.round(common.getViewportWidth()) >= config.sizeConfig.widthSm ? "display: flex;" : ""}
              font-size: 18px;
              justify-content: space-around;
            }
            .productBestListContainer > div > div {
              ${Math.round(common.getViewportWidth()) >= config.sizeConfig.widthSm ? "" : "padding: 5px 32px"}
            }
            .productBestListContainer > div > div > i{
              display: inline-block;
              margin-right: 8px;
            }
            .productBestListContainer > div > div > div{
              display: inline-block;
            }
          `}</style>
        </Head>
        <div className="pageSmallWidth">
          <div className="productBestListContainer">
            <div>
              <div>
                <i className="fa fa-check-circle-o" />
                <div>
                  {Language.getLanguage(LanguageIdMap.BEST_PRICE)}
                </div>
              </div>
              <div>
                <i className="fa fa-check-circle-o" />
                <div>
                  {Language.getLanguage(LanguageIdMap.BEST_QUALITY)}
                </div>
              </div>
              <div>
                <i className="fa fa-check-circle-o" />
                <div>
                  {Language.getLanguage(LanguageIdMap.EASY_BOOKING)}
                </div>
              </div>
            </div>
          </div>


          <Head>
            <style type="text/css">{`
              .productImageEle{
                display: inline-block;
                cursor: pointer;
                position: relative;
              }
              .width33{
                width:33.33%
              }
              .width100{
                width:100%
              }
              .productImageMore{
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                justify-content: center;
                display: flex;
                align-items: center;
                background: rgb(12,12,12,0.5);
                color: #fff;
                font-size: 24px;
              }
          `}</style>
          </Head>

          <div className="mgTop24">
            {this.props.initPropsData.data && this.props.initPropsData.data.gallery && this.props.initPropsData.data.gallery.length > 0
              && <div className="textAlignCenter">
                {this.props.initPropsData.data.gallery.length >= 1 && <img
                  src={this.props.initPropsData.data.gallery[0].thumbUrl}
                  alt={this.props.initPropsData.data.gallery[0].altText}
                  className="productImageEle width33"
                  onClick={e => {
                    this.setState({
                      photoIndex: 0,
                    })
                  }} />}
                {this.props.initPropsData.data.gallery.length >= 2 && <img
                  src={this.props.initPropsData.data.gallery[1].thumbUrl}
                  alt={this.props.initPropsData.data.gallery[1].altText}
                  className="productImageEle width33"
                  onClick={e => {
                    this.setState({
                      photoIndex: 1,
                    })
                  }} />}
                {this.props.initPropsData.data.gallery.length >= 3
                  && <div className="productImageEle width33"
                    onClick={e => {
                      this.setState({
                        photoIndex: 2,
                      })
                    }}>
                    <img
                      src={this.props.initPropsData.data.gallery[2].thumbUrl}
                      alt={this.props.initPropsData.data.gallery[2].altText}
                      className="width100"
                    />
                    {this.props.initPropsData.data.gallery.length > 3 && <div
                      className="productImageMore" >
                      {"+" + (this.props.initPropsData.data.gallery.length - 2) + " " + Language.getLanguage(LanguageIdMap.photo)}
                    </div>}
                  </div>}
                
                {this.state.photoIndex >= 0 &&
                  <Lightbox
                    mainSrc={this.props.initPropsData.data.gallery[this.state.photoIndex].photoUrl}
                    nextSrc={this.props.initPropsData.data.gallery[(this.state.photoIndex + 1) % this.props.initPropsData.data.gallery.length]}
                    prevSrc={this.props.initPropsData.data.gallery[(this.state.photoIndex - 1) % this.props.initPropsData.data.gallery.length]}
                    onCloseRequest={() => this.setState({ photoIndex: -1 })}
                    onMovePrevRequest={() =>
                      this.setState({
                        photoIndex: (this.state.photoIndex + this.props.initPropsData.data.gallery.length - 1) % this.props.initPropsData.data.gallery.length,
                      })
                    }
                    onMoveNextRequest={() =>
                      this.setState({
                        photoIndex: (this.state.photoIndex + this.props.initPropsData.data.gallery.length + 1) % this.props.initPropsData.data.gallery.length,
                      })
                    }
                  />}
              </div>}
          </div>

          <div className="productSectionStyle">
            {this.props.initPropsData.data.briefDescription}
          </div>


          <Head>
            <style type="text/css">{`
            #highlight{
              border: 1px solid #eee;
              margin-bottom: 32px;
            }
            #highlight > h2{
              font-weight: bold;
              margin-bottom: 24px;
            }
          `}</style>
          </Head>
          {this.props.initPropsData.data.highlight 
          && <div className="productSectionStyle" id="highlight">
            <h2>
              {Language.getLanguage(LanguageIdMap.HIGH_LIGHT)}
            </h2>
            {ReactHtmlParser(this.props.initPropsData.data.highlight)}
          </div>}
        </div>

        <div id="package_options">
          <PackageOption ref={r => this.packageOptionRef = r} holder={this} />
        </div>

        <Head>
            <style type="text/css">{`
            #what_to_expect{
              margin-top: 24 
            }
            #what_to_expect > div{
              padding-top: 0;
              padding-bottom: 0;
            }
            #what_to_expect > div > h2{
              font-weight: bold;
              margin-bottom: 24px;
            }
            #what_to_expect > div > hr{
              margin-top: 32px;
            }
          `}</style>
          </Head>
        {this.props.initPropsData.data.longDescription && <div className="pageSmallWidth" id="what_to_expect">
          <div className="productSectionStyle">
            <h2>
              {Language.getLanguage(LanguageIdMap.WHAT_TO_EXPECT)}
            </h2>
            {ReactHtmlParser(this.props.initPropsData.data.longDescription)}
            <hr/>
          </div>
        </div>}


        <Head>
            <style type="text/css">{`
            #act_info{
              margin-top: 24 
            }
            #act_info > div{
              padding-top: 0;
              padding-bottom: 0;
            }
            #act_info > div > h2{
              font-weight: bold;
              margin-bottom: 24px;
            }
            #act_info > div > hr{
              margin-top: 32px;
            }
          `}</style>
          </Head>
        {this.props.initPropsData.data.actInfo && <div className="pageSmallWidth" id="act_info">
          <div className="productSectionStyle" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <h2>
              {Language.getLanguage(LanguageIdMap.ACT_INFO)}
            </h2>
            {ReactHtmlParser(this.props.initPropsData.data.actInfo)}
            <hr/>
          </div>
        </div>}

        <Head>
            <style type="text/css">{`
            #how_to_use{
              margin-top: 24 
            }
            #how_to_use > div{
              padding-top: 0;
              padding-bottom: 0;
            }
            #how_to_use > div > h2{
              font-weight: bold;
              margin-bottom: 24px;
            }
            #how_to_use > div > hr{
              margin-top: 32px;
            }
            #how_to_use > div > .grey{
              background-color: #eee;
            }
            #how_to_use > div > .grey > div{
              padding-top: 0;
              padding-bottom: 0
            }
            #how_to_use > div > .grey > div > div{
              margin-left: 0;
              margin-right: 0 ;
            }
            #how_to_use > div > .grey > div > div > col-sm-3{
              padding-top: 5px;
              padding-bottom: 5px;
              font-weight: bold;
            }
            #how_to_use > div > .grey > div > div > col-sm-9{
              padding-top: 5px;
              padding-bottom: 5px;
              white-space: pre-wrap;
            }
          `}</style>
          </Head>
        {this.props.initPropsData.data.howUse && <div className="pageSmallWidth" id="how_to_use">
          <div className="productSectionStyle">
            <h2>
              {Language.getLanguage(LanguageIdMap.HOW_TO_USE)}
            </h2>
            {this.props.initPropsData.data.howUse.map((rowData, rowIndex) => {
              return <div className={rowIndex % 2 === 0 ? "grey":""}>
                <div className="productSectionStyle" >
                  <div className="row">
                    <div className='col-sm-3'>
                      {rowData.name}
                    </div>
                    <div className='col-sm-9'>
                      {rowData.des}
                    </div>
                  </div>
                </div>
              </div>
            })}
            <hr />
          </div>
        </div>}



        <Head>
            <style type="text/css">{`
            #cancel_policy{
              margin-top: 24 
            }
            #cancel_policy > div{
              padding-top: 0;
              padding-bottom: 0;
            }
            #cancel_policy > div > h2{
              font-weight: bold;
              margin-bottom: 24px;
            }
            .cancel_policy_sup{
              top: -0.2em;
              margin-right: 12px;
              font-size: 8px;
            }
            #cancel_policy > div > hr{
              margin-top: 32px;
            }
          `}</style>
          </Head>
        <div className="pageSmallWidth" id="cancel_policy">
          <div className="productSectionStyle">
            <h2>
              {Language.getLanguage(LanguageIdMap.CANCEL_POLICY)}
            </h2>

            {(!this.props.initPropsData.data.cancelRules || this.props.initPropsData.data.cancelRules.length === 0)
              && <div className="productSectionStyle pdTop0 pdBottom0">
                <sup className="cancel_policy_sup" >
                  <i className="fa fa-circle colorMain"/>
                </sup>
                {Language.getLanguage(LanguageIdMap.CANCEL_POLICY_CANNOT_CANCEL)}
              </div>}
            {this.props.initPropsData.data.cancelRules && this.props.initPropsData.data.cancelRules.map((rowData, rowIndex) => {
              return <div className="productSectionStyle pdTop0 pdBottom0">
                <sup className="cancel_policy_sup">
                  <i className="fa fa-circle colorMain" />
                </sup>
                {Language.getLanguage(LanguageIdMap.CANCEL_POLICY_DESC,
                  { ...(rowData.day ? { day: rowData.day } : {}), ...(rowData.hour ? { hour: rowData.hour } : {}), percent: rowData.percent },
                  undefined, undefined,
                  { HOUR: "hour", DAY: "day" })}
              </div>
            })}
            <hr className="mgTop32" />
          </div>
        </div>

        <Head>
            <style type="text/css">{`
            #faq{
              margin-top: 24 
            }
            #faq > div{
              padding-top: 0;
              padding-bottom: 0;
            }
            #faq > div > h2{
              font-weight: bold;
              margin-bottom: 24px;
            }
            .productFaqButton{
              border: 1px solid #888888;
              color: #888888;
              padding: 5px 15px;
              cursor: pointer;
              margin-top: 20px;
              margin-bottom: 20px;
              display: inline-block;
              font-weight: bold;
            }
          `}</style>
          </Head>
        <div className="pageSmallWidth" id="faq">
          <div className="productSectionStyle">
            <h2>
              {Language.getLanguage(LanguageIdMap.FAQ_DESC)}
            </h2>
            {this.props.initPropsData.data.faq !== undefined && ReactHtmlParser(this.props.initPropsData.data.faq)}

            <div>
              <a
                href={config.domain + config.shortUrl.faq}
                className="productFaqButton"
                onClick={e => {
                  e.preventDefault();
                  window.open(config.domain + config.shortUrl.faq, '_blank');
                }}
              >
                {Language.getLanguage(LanguageIdMap.CUSTOMER_SUPPORT)}
              </a>
            </div>

            <hr className="mgTop32 mgBottom32" />
          </div>

        </div>

        {this.props.initPropsData.productRelative && this.props.initPropsData.productRelative.data
         && this.props.initPropsData.productRelative.data.length > 0
          && <div className="pageSmallWidth mgBottom48">
            <div className="productSectionStyle pdTop0 pdBottom0">
              <div className="mgBottom32 fontsize32">
                {Language.getLanguage(LanguageIdMap.RELATIVE_PRODUCT)}
              </div>
              {this.renderOneRow(this.props.initPropsData.productRelative, {
                cardRender: this.renderProductCard.bind(this)
              })}
            </div>
          </div>}
      </div>
    </div >
  }

  prepareDataWhenClickAddToCartOrBookNow(data = { rowData, bookNow: false }) {
    let doSomeThing = function () {
      let askPerOrderList = [];
      let askPerUserList = [];
      if (this.props.initPropsData.data.settingFields) {
        for (let i = 0; i < this.props.initPropsData.data.settingFields.length; i++) {
          const element = this.props.initPropsData.data.settingFields[i];
          if (element.displayFor === LanguageIdMap.PRODUCT_SUPPLIER_INFO_DISPLAY_FOR.DISPLAY_FOR_ORDER.value) {
            askPerOrderList.push(element)
          } else if (element.displayFor === LanguageIdMap.PRODUCT_SUPPLIER_INFO_DISPLAY_FOR.DISPLAY_FOR_USER.value) {
            askPerUserList.push(element)
          }
        }
      }
      let userDataList = [];
      if (data.rowData.schedulePrice.schedulePriceType === LanguageIdMap.SCHEDULE_PRICE_TYPE_LIST.BY_PERSON.value) {
        for (let j = 0; j < data.rowData.schedulePrice.schedulePriceItems.length; j++) {
          const rowData1 = data.rowData.schedulePrice.schedulePriceItems[j];
          if (rowData1.noOfItem) {
            for (let i = 0; i < rowData1.noOfItem; i++) {
              userDataList.push({
                schedulePriceItemType: rowData1.schedulePriceItemType,
                label: rowData1.label,
                _numInTotal: userDataList.length,
                _numInList: i,
                _totalNumInList: rowData1.noOfItem,
                settings: askPerUserList.map((rowData, index) => {
                  return {
                    id: rowData.id,
                    type: rowData.type,
                    label: rowData.label,
                    ans: undefined,
                    ...(rowData.dataFields ? { dataFields: rowData.dataFields } : {})
                  }
                })
              })
            }
          }
        }
      }
      common.scheduleDataForSupplierProductInfo = {
        order: askPerOrderList.map((rowData, index) => {
          return {
            id: rowData.id,
            type: rowData.type,
            label: rowData.label,
            ans: undefined,
            ...(rowData.dataFields ? { dataFields: rowData.dataFields } : {})
          }
        }),
        user: userDataList,
      }
      common.scheduleForSupplierProductInfo = data.rowData;
      this.props.initPropsData.data.productRelative = this.props.initPropsData.productRelative;

      common.productForSupplierProductInfo = this.props.initPropsData.data;
      common.productForSupplierProductInfo.name = this.props.initPropsData.data.productName;
      common.productForSupplierProductInfo.alias = this.props.initPropsData.alias;

      common.productForSupplierProductInfo._bookTime
        = (data.rowData.schedulePrice.time ? data.rowData.schedulePrice.time.hour + ":" + data.rowData.schedulePrice.time.minute : "")
        + common.changeTimeStampToHumanTime(new Date(data.rowData.schedulePrice.date), undefined, "standardDate")

      if (this.props.initPropsData.data.settingFields && this.props.initPropsData.data.settingFields.length > 0) {
        Router.push(config.shortUrl.supplierProductInfo
          , config.shortUrl.supplierProductInfo + "/" + this.props.initPropsData.alias + (data.bookNow ? "?booknow=true" : ""))
      } else {
        if (this.loadingCountdown === 0) {
          if (data.bookNow) {
            common.booknowData = common.prepareDataBeforeAddToCardOrBooking(common.scheduleDataForSupplierProductInfo);
            common.booknowData.orderOrderProduct[0].scheduleData = JSON.parse(common.booknowData.orderOrderProduct[0].scheduleData)
            common.booknowData.orderOrderProduct[0].ext = JSON.parse(common.booknowData.orderOrderProduct[0].ext)

            window.localStorage.setItem("paynowData", JSON.stringify(common.booknowData));

            Router.push(config.shortUrl.pay)
          } else {
            common.addToCart(this)
          }
        }
      }
    }.bind(this)

    if (!common.checkLoginUser()) {
      common.more.needCallbackWhenLogin = doSomeThing.bind(this)
      this.setState({ loginModalPopup: true });
    } else {
      doSomeThing();
    }

  }

}

export default (Display);
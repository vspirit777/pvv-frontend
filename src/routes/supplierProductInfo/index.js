

import React, { PropTypes, Component } from 'react';

import common from '../../data/common';
import { api, config } from '../../config';
import LanguageIdMap from '../../language/LanguageIdMap'
import Language from '../../language/Language'
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import { TextField, RadioButton } from 'material-ui';
import SuperComponent from '../../components/SuperComponent';
import Router from 'next/router'

class Display extends SuperComponent {
  constructor(props, context) {
    super(props, context);
    this.state.data = {};

    this.state.data = common.scheduleForSupplierProductInfo;
    if(!this.state.data) {
      Router.push(config.shortUrl.home);
      return;
    }
    this.props.initPropsData.seoTitle = Language.getLanguage(LanguageIdMap.PRODUCT_SUPPLIER_INFO_TITLE_META);
    this.props.initPropsData.seoDescription = Language.getLanguage(LanguageIdMap.PRODUCT_SUPPLIER_INFO_TITLE_META);
  }

  renderScheduleDataRow(rowData, rowIndex) {
    let retData = undefined;
    if (rowData.type === LanguageIdMap.PRODUCT_SUPPLIER_INFO_TYPE.LIST.value) {
      retData = <SelectField
        value={rowData.ans}
        onChange={(event, index, values) => {
          rowData.ans = values;
          rowData.ansName = rowData.dataFields[index].content;
          this.forceUpdate();
        }}
        selectedMenuItemStyle={{ color: config.colorConfig.main }}
        style={{ width: 300, fontWeight: 100, marginTop: -8 }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
      >
        {rowData.dataFields !== undefined && rowData.dataFields.map((rowData1, rowIndex1) => {
            return <MenuItem
              value={rowData1.id}
              primaryText={rowData1.content}
            />
        })}
      </SelectField>
    } else if (rowData.type === LanguageIdMap.PRODUCT_SUPPLIER_INFO_TYPE.RADIO_BUTTON.value
      || rowData.type === LanguageIdMap.PRODUCT_SUPPLIER_INFO_TYPE.CHECKBOX.value
    ) {
      if (!rowData.ans) {
        rowData.ans = "";
      } else {
        rowData.ans = rowData.ans + ""
      }
      let ansArr = rowData.ans.split(", ")
      retData = <div style={{ fontSize: 18 }}>
        {rowData.dataFields !== undefined && rowData.dataFields.map((rowData1, rowIndex1) => {
          return <div
            onClick={e => {
              if (rowData.type === LanguageIdMap.PRODUCT_SUPPLIER_INFO_TYPE.RADIO_BUTTON.value) {
                rowData.ans = rowData1.id;
                rowData.ansName = rowData1.content;
              } else {
                if (ansArr.indexOf(rowData1.id + "") >= 0) {
                  ansArr.splice(ansArr.indexOf(rowData1.id + ""), 1);
                } else {
                  ansArr.push(rowData1.id);
                  if (ansArr[0] == "") {
                    ansArr.splice(0, 1);
                  }
                }
                let ansNameArr = [];
                for (let i = 0; i < ansArr.length; i++) {
                  for (let j = 0; j < rowData.dataFields.length; j++) {
                    if(ansArr[i] == rowData.dataFields[j].id ) {
                      ansNameArr.push(rowData.dataFields[j].content);
                    } 
                  }
                }
                rowData.ansName = ansNameArr.join(", ")
                rowData.ans = ansArr.join(", ")
              }
              this.forceUpdate();
            }}>
            {rowData.type === LanguageIdMap.PRODUCT_SUPPLIER_INFO_TYPE.RADIO_BUTTON.value 
            ? <RadioButton
              iconStyle={{ marginTop: -1 }}
              labelStyle={{ fontWeight: 100 }}
              label={rowData1.content}
              checked={rowData.ans == rowData1.id}
              />
            : <Checkbox
              iconStyle={{ marginTop: -1 }}
              labelStyle={{ fontWeight: 100 }}
              label={rowData1.content}
              checked={ansArr.indexOf(rowData1.id + "") >= 0}
            />}
            
          </div>
        })}
      </div>
    } else if (rowData.type === LanguageIdMap.PRODUCT_SUPPLIER_INFO_TYPE.TEXT.value
      || rowData.type === LanguageIdMap.PRODUCT_SUPPLIER_INFO_TYPE.MULTI_LINE_TEXT.value) {
      retData = <div><TextField
        style={{ width: 300, fontWeight: 100, marginTop: -8 }}
        value={rowData.ans}
        multiLine={rowData.type === LanguageIdMap.PRODUCT_SUPPLIER_INFO_TYPE.MULTI_LINE_TEXT.value ? true : false}
        onChange={(e, newValue) => {
          rowData.ans = newValue;
          rowData.ansName = newValue;
          this.forceUpdate();
        }}
      />
      </div>
    } else if (rowData.type === LanguageIdMap.PRODUCT_SUPPLIER_INFO_TYPE.SPECIFIED_DATE.value) {
      retData = common.renderDatePicker({
        label: "", value: rowData.ans
        , onChangeValue: function (v) {
          rowData.ans = v;
          rowData.ansName = common.changeTimeStampToHumanTime(v,undefined,"standardDate");
          this.forceUpdate()
        }.bind(this)
        , style: { width: 300, fontWeight: 100, marginTop: -8 }
        , setZeroHMS: true
        , minDate: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0, 0, 0, 0)
      })
    }
    return <div style={{ fontSize: 16, fontWeight: "bold", marginBottom: 16 }}>
      <div style={{ paddingBottom: 8 }}>
        {rowData.label}
      </div>
      <div>
        {retData}
      </div>
    </div>
  }
  renderData() {
    if (!this.state.data) {
      return <div />;
    }
    return <div>
      <div style={{ ...config.pageSmallWidthStyle, paddingTop: 48 }}>
        <div className='row'>
          <div className='col-sm-4' style={{ paddingLeft: 32, paddingRight: 32 }}>
            {common.productForSupplierProductInfo.featureImage
              && <img src={common.productForSupplierProductInfo.featureImage.photoUrl}
                style={{ width: "100%" }} />}
            <div style={{ fontSize: 24, fontWeight: 400, lineHeight: "30px", marginTop: 36 }}>{common.productForSupplierProductInfo.productName}</div>
            <div style={{ marginTop: 24 }}>
              <h1 style={{ fontWeight: "bold",marginTop:"inherit",marginBottom:"inherit",fontSize:"inherit" }}>
                {Language.getLanguage(LanguageIdMap.WHY_PHUOTVIVU)}
              </h1>
              <div style={{ marginTop: 16, marginLeft: 4, display: "flex" }}>
                <i className="fa fa-check" style={{ fontSize: 21, color: config.colorConfig.main, marginRight: 12 }} />
                <div>{Language.getLanguage(LanguageIdMap.BEST_PRICE)}</div>
              </div>
              <div style={{ marginTop: 16, marginLeft: 4, display: "flex" }}>
                <i className="fa fa-check" style={{ fontSize: 21, color: config.colorConfig.main, marginRight: 12 }} />
                <div>{Language.getLanguage(LanguageIdMap.BEST_QUALITY)}</div>
              </div>
              <div style={{ marginTop: 16, marginLeft: 4, display: "flex" }}>
                <i className="fa fa-check" style={{ fontSize: 21, color: config.colorConfig.main, marginRight: 12 }} />
                <div>{Language.getLanguage(LanguageIdMap.EASY_BOOKING)}</div>
              </div>
            </div>
          </div>
          <div className='col-sm-8'
            style={{
              paddingLeft: 32, paddingRight: 32,
              ...(Math.round(common.getViewportWidth()) >= config.sizeConfig.widthSm ? { borderLeft: "1px solid rgb(0,0,0,0.1)" } : {})
            }}>
            {/* <h4 style={{ fontSize: 19, marginTop: 24, lineHeight: "29px" }}>
              {Language.getLanguage(LanguageIdMap.STEP_WITH_NUMBER, { number: 2 })}
            </h4> */}
            <h2 style={{ fontWeight: 400, fontSize: 27, lineHeight: "38px", marginTop: 0 }}>
              {Language.getLanguage(LanguageIdMap.INFORMATION_REQUEST_BY_TOUR_OPERATOR)}
            </h2>

            {common.scheduleDataForSupplierProductInfo && <div>
              {common.scheduleDataForSupplierProductInfo.order.length > 0 && <div style={{ marginTop: 48 }}>
                {common.scheduleDataForSupplierProductInfo.order.map((rowData, rowIndex) => {
                  return this.renderScheduleDataRow(rowData, rowIndex);
                })}
              </div>}
              {common.scheduleDataForSupplierProductInfo.user.length > 0 
                && common.scheduleDataForSupplierProductInfo.user[0].settings
                && common.scheduleDataForSupplierProductInfo.user[0].settings.length > 0
                && <div style={{ marginTop: 24 }}>
                {common.scheduleDataForSupplierProductInfo.user.map((user, userIndex) => {
                  return <div style={{ paddingTop: 24 }}>
                    <div style={{ fontSize: 24, fontWeight: "bold", marginTop: 12, marginBottom: 24 }}>
                      {common.schedulePriceItemTypeMap && common.schedulePriceItemTypeMap[user.schedulePriceItemType]
                        + " " + (user._totalNumInList > 1 ? (user._numInList + 1) : "")
                      }
                      {/* {common.schedulePriceItemTypeMap && <div style={{ paddingBottom: 16 }}>
                        {Language.getLanguage(LanguageIdMap.GUEST) + " "
                          + (common.scheduleDataForSupplierProductInfo.user.length > 1 ? (user._numInTotal + 1) + " " : "")
                          // + " (" + common.schedulePriceItemTypeMap[user.schedulePriceItemType] + ")"
                          // + " (" + user.label + ")"
                        }
                      </div>
                      } */}
                    </div>
                    {user.settings.map((rowData, rowIndex) => {
                      return this.renderScheduleDataRow(rowData, rowIndex);
                    })}
                  </div>
                })}
              </div>}
              <div style={{ width: "100%", maxWidth: 256, }}>
                <RaisedButton
                  buttonStyle={{ ...config.buttonStyle[0] }}
                  style={{
                    height: 48, marginBottom: 12,
                    width: 150, margin: 8, marginLeft: 0,
                    fontWeight: "bold",
                    outline: "none",
                    opacity: this.loadingCountdown > 0 ? 0.3 : 1,
                  }}
                  onClick={e => {
                    if(common.location.search.booknow) {
                      common.booknowData = common.prepareDataBeforeAddToCardOrBooking(common.scheduleDataForSupplierProductInfo);
                      common.booknowData.orderOrderProduct[0].scheduleData =JSON.parse(common.booknowData.orderOrderProduct[0].scheduleData)
                      common.booknowData.orderOrderProduct[0].ext =JSON.parse(common.booknowData.orderOrderProduct[0].ext)
                      window.localStorage.setItem("paynowData", JSON.stringify(common.booknowData));

                      Router.push(config.shortUrl.pay)
                    } else {
                      common.addToCart(this)
                    }
                  }}
                >{Language.getLanguage(LanguageIdMap.CONTINUE)}
                  {this.loadingCountdown > 0 && this.loadingForAction === "save" &&
                    <ReactLoading type="bubbles"
                      style={{ margin: "auto", marginTop: -54, width: 60, height: 20, fill: "#fff" }} />}
                </RaisedButton>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </div>


  }

}
export default Display;

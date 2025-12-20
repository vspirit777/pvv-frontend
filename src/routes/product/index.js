import React, { Component } from "react";

import { Collapse, OverlayTrigger, Tooltip } from "react-bootstrap";
import $ from "jquery";
import common from "../../data/common";
import { config } from "../../config";
import LanguageIdMap from "../../language/LanguageIdMap";
import Language from "../../language/Language";
import RaisedButton from "material-ui/RaisedButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Checkbox from "material-ui/Checkbox";
import IconMenu from "material-ui/IconMenu";
import Lightbox from "react-image-lightbox";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import { TextField, Tabs, Tab } from "material-ui";
import SuperComponent from "../../components/SuperComponent";
import HoverOpenDropdownMenu from "../../components/HoverOpenDropdownMenu";
import ActionFavorite from "material-ui/svg-icons/action/favorite";
import ActionFavoriteBorder from "material-ui/svg-icons/action/favorite-border";
import Router from "next/router";
import Head from "next/head";
import ImageGallery from "react-image-gallery";
import Slider from "react-slick";

export function SlickPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img
      src={config.domain + "/static/images/back.png"}
      className={className + " visibleWhenHover"}
      style={{ ...style, display: "block", left: -12 }}
      onClick={onClick}
    />
  );
}
export function SlickNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img
      src={config.domain + "/static/images/next.png"}
      className={className + " visibleWhenHover"}
      style={{ ...style, display: "block", right: -12 }}
      onClick={onClick}
    />
  );
}

class PackageOption extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Head>
          <link rel="stylesheet" href={"/static/css/image-gallery.scss"} />
          <link rel="stylesheet" href={"/static/css/image-gallery.css"} />
          <style type="text/css">{`
          .slick-prev{
            left: 5px;
            z-index: 1;
            width: 30px;
            height: 30px;
          }
          .slick-next{
            right: 5px;
            z-index: 1;
            width: 30px;
            height: 30px;
          }
          /* Package Options Section Styling */
          .package-options-wrapper {
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
            margin-bottom: 24px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          }
          .package-options-header {
            background: #0ab596;
            color: #fff;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 16px;
            font-weight: 700;
            padding: 14px 20px;
            text-transform: uppercase;
          }
          .package-options-header i {
            font-size: 18px;
          }
          .package-options-body {
            padding: 20px;
          }
          .package-date-row {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 16px;
            flex-wrap: wrap;
          }
          .package-date-label {
            font-size: 14px;
            font-weight: 600;
            color: #333;
          }
          .productPackageListContainer{
            border: 1px solid #ddd;
            display: inline-flex;
            background-color: #fff;
            overflow: hidden;
            height: 40px;
            border-radius: 6px;
          }
          .productPackageListContainer > i{
            font-size: 16px;
            margin-left: 12px;
            margin-right: 8px;
            padding-top: 10px;
            color: #0ab596;
          }
          .productPackageCheckingStatus {
            padding-right: 16px;
            font-size: 13px;
            padding-top: 10px;
            color: #666;
            ${
              this.props.holder.props.initPropsData.checkAvailabilityDatePicker
                ? "visibility: hidden"
                : ""
            }
          }
          .tour-price-section {
            background: #f8f9fa;
            border-radius: 8px;
            overflow: hidden;
          }
          .tour-price-header {
            background: #e8f5f2;
            padding: 12px 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #d0e8e3;
          }
          .tour-price-header-label {
            font-size: 14px;
            font-weight: 600;
            color: #0ab596;
          }
          .productPackageContainer{
            padding: 16px;
            margin: 0;
            background: #fff;
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #f0f0f0;
            transition: all 0.2s ease;
          }
          .productPackageContainer:last-child {
            border-bottom: none;
          }
          .productPackageContainer:hover {
            background: #f8fffe;
          }
          .productPackageName{
            line-height: 22px;
            font-size: 15px;
            font-weight: 600;
            color: #333;
          }
          .priceFavoriteBookNowUnderBriefDescription{
            position: absolute;
            right: 0px;
            bottom: 6px;
            width: 100%;
            padding-right: 12px;
          }
          .productPackageSale{
            display: inline-block;
            margin-right: 12px;
            line-height: 24px;
            margin-top: 6px;
          }
          .productPackageSale .fontWeightBold {
            color: #0ab596;
            font-size: 18px;
          }
          .productPackageSelectBtn{
            color: #fff;
            background-color: #0ab596;
            border-color: #0ab596;
            float: right;
            padding: 8px 20px;
            height: 38px;
            font-weight: 600;
            border: none;
            cursor: pointer;
            border-radius: 8px;
            transition: all 0.2s ease;
          }
          .productPackageSelectBtn:hover {
            background-color: #099880;
          }
          .productPackageDetailIcon{
            font-size: 18px;
            margin-left: 8px;
            margin-right: 8px;
            padding-top: 8px;
            position: absolute;
            left: 4px;
            top: 28px;
            color: #0ab596;
          }
          .productPackageDetailCaretDownIcon{
            font-size: 14px;
            margin-left: 8px;
            margin-right: 8px;
            padding-top: 8px;
            position: absolute;
            right: 10px;
            top: 28px;
            color: #999;
          }
          .productPackageDetailMinusIcon{
            border-right: 1px solid #e8e8e8;
            display: flex;
            background-color: #f5f5f5;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            width: 33.33%;
            transition: background-color 0.2s ease;
          }
          .productPackageDetailMinusIcon:hover {
            background-color: #e8e8e8;
          }
          .productPackageDetailCurrentAmount{
            border-right: 1px solid #e8e8e8;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 33.33%;
            font-weight: 600;
          }
          .productPackageDetailPlusIcon{
            display: flex;
            background-color: #f5f5f5;
            justify-content: center; 
            align-items: center;
            cursor: pointer;
            width: 33.33%;
            transition: background-color 0.2s ease;
          }
          .productPackageDetailPlusIcon:hover {
            background-color: #e8e8e8;
          }
          .productPackageTotalPriceLabel{
            color: #888;
            font-size: 14px;
          }
          .productPackageTotalPrice{
            font-weight: bold;
            font-size: 22px;
            color: #0ab596;
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
        <div className="package-options-wrapper">
          <div className="package-options-header">
            <i className="fa fa-ticket" />
            Các gói dịch vụ
          </div>
          <div className="package-options-body">
            <div className="package-date-row">
              <span className="package-date-label">Chọn ngày:</span>
              <div className="focusBorderColorDefault productPackageListContainer">
                <i className="fa fa-calendar" />
                      <div className="posRelative">
                        <div className="productPackageCheckingStatus">
                          {Language.getLanguage(
                            LanguageIdMap.CHECKING_SERVICE_STATUS
                          )}
                        </div>
                        {common.renderDatePicker({
                          label: "",
                          value:
                            this.props.holder.props.initPropsData
                              .checkAvailabilityDatePicker,
                          onChangeValue: function (v) {
                            this.props.holder.props.initPropsData.checkAvailabilityDatePicker =
                              v;
                            Display.getSchedule(this.props.initPropsData)
                              .then((jsonRes) => {
                                this.props.holder.forceUpdate();
                              })
                              .catch((err) => {});
                            this.forceUpdate();
                          }.bind(this),
                          style: {
                            position: "absolute",
                            top: -4,
                            width: "100%",
                          },
                          setZeroHMS: true,
                          minDate: new Date(
                            new Date().setDate(new Date().getDate() + 1)
                          ).setHours(0, 0, 0, 0),
                          className: "materialUIDatePickerCenter",
                        })}
                      </div>
                    </div>
            </div>

            <div className="tour-price-section">
              <div className="tour-price-header">
                <span className="tour-price-header-label">Giá tour</span>
              </div>
              <div>
                {this.props.holder.props.initPropsData.schedule &&
                  this.props.holder.props.initPropsData.schedule.map(
                    (rowData, rowIndex) => {
                          rowData._tmpTotalPrice = 0;
                          rowData._tmpListChoosen = [];
                          if (
                            rowData.schedulePrice &&
                            rowData.schedulePrice.schedulePriceItems &&
                            rowData.schedulePrice.schedulePriceItems.length > 0
                          ) {
                            if (!rowData._tmpSalePrice) {
                              rowData._tmpSalePrice =
                                rowData.schedulePrice.schedulePriceItems[0].price;
                            }
                            if (rowData._tmpIsChoosingPackage) {
                              for (
                                let i = 0;
                                i <
                                rowData.schedulePrice.schedulePriceItems.length;
                                i++
                              ) {
                                const element =
                                  rowData.schedulePrice.schedulePriceItems[i];
                                if (element.noOfItem && element.price) {
                                  rowData._tmpTotalPrice +=
                                    element.noOfItem * element.price;
                                  rowData._tmpListChoosen.push(
                                    element.noOfItem +
                                      " x " +
                                      (rowData.schedulePrice
                                        .schedulePriceType ===
                                      LanguageIdMap.SCHEDULE_PRICE_TYPE_LIST
                                        .BY_PERSON.value
                                        ? common.schedulePriceItemTypeMap[
                                            element.schedulePriceItemType
                                          ] +
                                          (element.label
                                            ? " (" + element.label + ")"
                                            : "")
                                        : element.label)
                                  );
                                }
                              }
                            }
                          }

                          return (
                            <div className="productPackageContainer">
                              <div>
                                <div className="productPackageName">
                                  {rowData.name}
                                </div>
                              </div>
                              <div>
                                {!rowData._tmpIsChoosingPackage ? (
                                  <div>
                                    <div className="productPackageSale">
                                      <div className="fontWeightBold">
                                        <sup>
                                          {Language.getLanguage(
                                            common.moneyType
                                          )}
                                        </sup>
                                        {" " +
                                          common.numberWithCommas(
                                            rowData._tmpSalePrice
                                          )}
                                      </div>
                                    </div>
                                    <div
                                      className="hoverChangeButtonStyle0 productPackageSelectBtn"
                                      onClick={(e) => {
                                        for (
                                          let i = 0;
                                          i <
                                          this.props.holder.props.initPropsData
                                            .schedule.length;
                                          i++
                                        ) {
                                          this.props.holder.props.initPropsData.schedule[
                                            i
                                          ]._tmpIsChoosingPackage = undefined;
                                        }
                                        this.props.holder.props.initPropsData.currentChoosingPackage =
                                          rowData;
                                        rowData._tmpIsChoosingPackage = true;
                                        this.forceUpdate();
                                      }}
                                    >
                                      {Language.getLanguage(
                                        LanguageIdMap.btnSelect
                                      ).toUpperCase()}
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <div className="productPackageTotalPriceLabel">
                                      {Language.getLanguage(
                                        LanguageIdMap.TOTAL_PRICE
                                      )}
                                    </div>
                                    <div className="productPackageTotalPrice">
                                      <sup>
                                        {Language.getLanguage(common.moneyType)}
                                      </sup>
                                      {" " +
                                        common.numberWithCommas(
                                          rowData._tmpTotalPrice
                                        )}
                                    </div>
                                  </div>
                                )}
                              </div>

                              {!common.checkServer() && (
                                <Collapse in={rowData._tmpIsChoosingPackage}>
                                  <div>
                                    {rowData.desc !== undefined && (
                                      <div className="whiteSpacePreWrap">
                                        {rowData.desc}
                                      </div>
                                    )}
                                    <div className="row mgLeft0 mgRight0">
                                      <div className="col-sm-6">
                                        {rowData._tmpIsChoosingPackage && (
                                          <div>
                                            <div className="normal">
                                              {this.props.holder.doSomeThing(
                                                function () {
                                                  if (!rowData.schedulePrice) {
                                                    rowData.schedulePrice = {};
                                                  }
                                                }.bind(this)
                                              )}
                                              {common.renderDatePicker({
                                                label: Language.getLanguage(
                                                  LanguageIdMap.SELECT_DATE
                                                ),
                                                value:
                                                  rowData.schedulePrice.date,
                                                onChangeValue: function (v) {
                                                /*  let newd = new Date(v)
                                                  console.log(newd)
                                                  let d = new Date(rowData.schedulePrice.date)
                                                  console(d)
                                                  d.setDate(newd.getDate());
                                                  d.setMonth(newd.getMonth());
                                                  d.setFullYear(newd.getFullYear());
                                                  rowData.schedulePrice.date = d.getTime();*/
                                                  rowData.schedulePrice.date =
                                                    v;
                                                  this.forceUpdate();
                                                }.bind(this),
                                                style: {
                                                  width: 300,
                                                  maxWidth: "100%",
                                                },
                                                minDate: new Date(
                                                  new Date().setDate(
                                                    new Date().getDate() + 1
                                                  )
                                                ).setHours(0, 0, 0, 0),
                                                className:
                                                  "materialUIDatePickerLeft40",
                                                setZeroHMS: true,
                                                shouldDisableDate: function (
                                                  v
                                                ) {
                                                  let d = new Date(v);
                                                  let returnData = true;
                                                  if (rowData.repeatOn) {
                                                    if (
                                                      rowData.repeatOn.indexOf(
                                                        d.getDay() + 1
                                                      ) >= 0
                                                    ) {
                                                      returnData = false;
                                                    }
                                                  }
                                                  if (rowData.repeatUntil) {
                                                    if (
                                                      d.getTime() >
                                                      rowData.repeatUntil
                                                    ) {
                                                      returnData = true;
                                                    }
                                                  }
                                                  if (rowData.startDate) {
                                                    if (
                                                      d.getTime() <
                                                      rowData.startDate
                                                    ) {
                                                      returnData = true;
                                                    }
                                                  }
                                                  if (rowData.minimumNotice) {
                                                    if (
                                                      d.getTime() <
                                                      new Date().getTime() +
                                                        rowData.minimumNotice
                                                    ) {
                                                      returnData = true;
                                                    }
                                                  }
                                                  if (rowData.excludeDates) {
                                                    if (
                                                      rowData.excludeDates.indexOf(
                                                        d.getTime()
                                                      ) >= 0
                                                    ) {
                                                      returnData = true;
                                                    }
                                                  }
                                                  if (rowData.includeDates) {
                                                    if (
                                                      rowData.includeDates.indexOf(
                                                        d.getTime()
                                                      ) >= 0
                                                    ) {
                                                      returnData = false;
                                                    }
                                                  }
                                                  return returnData;
                                                }.bind(this),
                                              })}
                                              <i className="fa fa-calendar productPackageDetailIcon" />
                                              <i className="fa fa-caret-down productPackageDetailCaretDownIcon" />
                                            </div>

                                            {rowData.listStartTimes &&
                                              rowData.listStartTimes.length >
                                                0 &&
                                              !common.checkServer() && (
                                                <div
                                                  style={{
                                                    position: "relative",
                                                  }}
                                                >
                                                  <SelectField
                                                    className="materialUISelectLeft40"
                                                    floatingLabelText={Language.getLanguage(
                                                      LanguageIdMap.SELECT_TIME
                                                    )}
                                                    value={
                                                      rowData._tmpSelectTime
                                                    }
                                                    onChange={(
                                                      event,
                                                      index,
                                                      values
                                                    ) => {
                                                      rowData._tmpSelectTime =
                                                        values;
                                                        /*
                                                      let d = new Date(rowData.schedulePrice.date)
                                                      d.setHours(rowData.listStartTimes[values].hour)
                                                      d.setMinutes(rowData.listStartTimes[values].minute)
                                                      rowData.schedulePrice.date = d.getTime();
                                                      */

                                                      rowData.schedulePrice.time =
                                                        rowData.listStartTimes[
                                                          values
                                                        ];
                                                      this.forceUpdate();
                                                    }}
                                                    selectedMenuItemStyle={{
                                                      color:
                                                        config.colorConfig.main,
                                                    }}
                                                    style={{
                                                      width: 300,
                                                      maxWidth: "100%",
                                                    }}
                                                    anchorOrigin={{
                                                      horizontal: "left",
                                                      vertical: "bottom",
                                                    }}
                                                    targetOrigin={{
                                                      horizontal: "left",
                                                      vertical: "top",
                                                    }}
                                                  >
                                                    {rowData.listStartTimes.map(
                                                      (rowData1, rowIndex1) => {
                                                        return (
                                                          <MenuItem
                                                            value={rowIndex1}
                                                            primaryText={
                                                              rowData1.hour +
                                                              ":" +
                                                              (rowData1.minute >=
                                                              10
                                                                ? rowData1.minute
                                                                : "0" +
                                                                  rowData1.minute)
                                                            }
                                                          />
                                                        );
                                                      }
                                                    )}
                                                  </SelectField>
                                                  <i className="fa fa-clock-o productPackageDetailIcon" />
                                                </div>
                                              )}

                                            {!common.checkServer() && (
                                              <div style={{}}>
                                                <IconMenu
                                                  open={
                                                    this.state
                                                      .packageQuantityMenuMustDisappear
                                                      ? false
                                                      : undefined
                                                  }
                                                  iconButtonElement={
                                                    <OverlayTrigger
                                                      placement={"bottom"}
                                                      overlay={
                                                        rowData._tmpListChoosen
                                                          .length > 0 ? (
                                                          <Tooltip style={{}}>
                                                            <div>
                                                              {rowData._tmpListChoosen.join(
                                                                " ,"
                                                              )}
                                                            </div>
                                                          </Tooltip>
                                                        ) : (
                                                          <div />
                                                        )
                                                      }
                                                    >
                                                      <div
                                                        style={{
                                                          position: "relative",
                                                          display:
                                                            "inline-block",
                                                        }}
                                                      >
                                                        <TextField
                                                          className="materialUISelectLeft40"
                                                          floatingLabelText={Language.getLanguage(
                                                            LanguageIdMap.PACKAGE_QUANTITY
                                                          )}
                                                          floatingLabelStyle={{
                                                            textAlign: "center",
                                                            width: "100%",
                                                          }}
                                                          floatingLabelShrinkStyle={{
                                                            marginLeft: 40,
                                                          }}
                                                          style={{
                                                            cursor: "pointer",
                                                            width: 300,
                                                            maxWidth: "100%",
                                                          }}
                                                          inputStyle={{
                                                            textAlign: "center",
                                                            width: 220,
                                                            maxWidth: "100%",
                                                          }}
                                                          value={rowData._tmpListChoosen.join(
                                                            " ,"
                                                          )}
                                                          onChange={(
                                                            e,
                                                            newValue
                                                          ) =>
                                                            this.forceUpdate()
                                                          }
                                                        />

                                                        <i className="fa fa-user-o productPackageDetailIcon" />
                                                        <i className="fa fa-caret-down productPackageDetailCaretDownIcon" />
                                                      </div>
                                                    </OverlayTrigger>
                                                  }
                                                  menuStyle={{ padding: 0 }}
                                                  anchorOrigin={{
                                                    horizontal: "left",
                                                    vertical: "bottom",
                                                  }}
                                                  targetOrigin={{
                                                    horizontal: "left",
                                                    vertical: "top",
                                                  }}
                                                >
                                                  <div
                                                    style={{
                                                      width: 484,
                                                      maxWidth: Math.round(
                                                        common.getViewportWidth()
                                                      ),
                                                    }}
                                                  >
                                                    {rowData.schedulePrice &&
                                                      rowData.schedulePrice
                                                        .schedulePriceItems &&
                                                      rowData.schedulePrice.schedulePriceItems.map(
                                                        (
                                                          rowData1,
                                                          rowIndex1
                                                        ) => {
                                                          return <>
                                                            <div
                                                              style={{
                                                                padding: 20,
                                                                display: "flex",
                                                                justifyContent:
                                                                  "space-between",
                                                                flexWrap:
                                                                  "wrap",
                                                                alignItems:
                                                                  "baseline",
                                                              }}
                                                            >
                                                              {common.schedulePriceItemTypeMap && (
                                                                <div
                                                                  style={{
                                                                    display:
                                                                      "table-cell",
                                                                    verticalAlign:
                                                                      "middle",
                                                                    whiteSpace:
                                                                      "nowrap",
                                                                    maxWidth:
                                                                      Math.round(
                                                                        common.getViewportWidth()
                                                                      ) - 180,
                                                                  }}
                                                                >
                                                                  {rowData
                                                                    .schedulePrice
                                                                    .schedulePriceType ===
                                                                  LanguageIdMap
                                                                    .SCHEDULE_PRICE_TYPE_LIST
                                                                    .BY_PERSON
                                                                    .value
                                                                    ? common
                                                                        .schedulePriceItemTypeMap[
                                                                        rowData1
                                                                          .schedulePriceItemType
                                                                      ] +
                                                                      (rowData1.label
                                                                        ? " (" +
                                                                          rowData1.label +
                                                                          ")"
                                                                        : "")
                                                                    : rowData1.label}
                                                                </div>
                                                              )}

                                                              <div
                                                                style={{
                                                                  display:
                                                                    "flex",
                                                                  alignItems:
                                                                    "baseline",
                                                                }}
                                                              >
                                                                <div>
                                                                  <sup>
                                                                    {Language.getLanguage(
                                                                      common.moneyType
                                                                    )}
                                                                  </sup>
                                                                  {" " +
                                                                    common.numberWithCommas(
                                                                      rowData1.price
                                                                    )}
                                                                </div>

                                                                <div
                                                                  style={{
                                                                    display:
                                                                      "flex",
                                                                    width: 104,
                                                                    height: 33,
                                                                    marginLeft: 10,
                                                                    border:
                                                                      "1px solid #dcd8d8",
                                                                  }}
                                                                >
                                                                  <i
                                                                    className="fa fa-minus productPackageDetailMinusIcon"
                                                                    onClick={(
                                                                      e
                                                                    ) => {
                                                                      let _total = 0;
                                                                      for (
                                                                        let i = 0;
                                                                        i <
                                                                        rowData
                                                                          .schedulePrice
                                                                          .schedulePriceItems
                                                                          .length;
                                                                        i++
                                                                      ) {
                                                                        if (
                                                                          rowData
                                                                            .schedulePrice
                                                                            .schedulePriceItems[
                                                                            i
                                                                          ]
                                                                            .noOfItemNeedconfirm
                                                                        ) {
                                                                          _total +=
                                                                            rowData
                                                                              .schedulePrice
                                                                              .schedulePriceItems[
                                                                              i
                                                                            ]
                                                                              .noOfItemNeedconfirm;
                                                                        }
                                                                      }
                                                                      if (
                                                                        rowData1.noOfItemNeedconfirm
                                                                      ) {
                                                                        if (
                                                                          rowData.minQuantity &&
                                                                          _total <=
                                                                            rowData.minQuantity
                                                                        ) {
                                                                          this.props.holder.setState(
                                                                            {
                                                                              alertSnackBar:
                                                                                Language.getLanguage(
                                                                                  LanguageIdMap.MINIMUM_CHOOSE_VALUE,
                                                                                  {
                                                                                    name:
                                                                                      rowData
                                                                                        .schedulePrice
                                                                                        .schedulePriceType ===
                                                                                      LanguageIdMap
                                                                                        .SCHEDULE_PRICE_TYPE_LIST
                                                                                        .BY_PERSON
                                                                                        .value
                                                                                        ? common
                                                                                            .schedulePriceItemTypeMap[
                                                                                            rowData1
                                                                                              .schedulePriceItemType
                                                                                          ] +
                                                                                          (rowData1.label
                                                                                            ? " (" +
                                                                                              rowData1.label +
                                                                                              ")"
                                                                                            : "")
                                                                                        : rowData1.label,
                                                                                    value:
                                                                                      rowData.minQuantity,
                                                                                  }
                                                                                ),
                                                                            }
                                                                          );
                                                                        } else {
                                                                          rowData1.noOfItemNeedconfirm--;
                                                                        }
                                                                        this.forceUpdate();
                                                                      }
                                                                    }}
                                                                  />
                                                                  <div className="productPackageDetailCurrentAmount">
                                                                    {rowData1.noOfItemNeedconfirm
                                                                      ? rowData1.noOfItemNeedconfirm
                                                                      : 0}
                                                                  </div>
                                                                  <i
                                                                    className="fa fa-plus productPackageDetailPlusIcon"
                                                                    onClick={(
                                                                      e
                                                                    ) => {
                                                                      let _total = 0;
                                                                      for (
                                                                        let i = 0;
                                                                        i <
                                                                        rowData
                                                                          .schedulePrice
                                                                          .schedulePriceItems
                                                                          .length;
                                                                        i++
                                                                      ) {
                                                                        if (
                                                                          rowData
                                                                            .schedulePrice
                                                                            .schedulePriceItems[
                                                                            i
                                                                          ]
                                                                            .noOfItemNeedconfirm
                                                                        ) {
                                                                          _total +=
                                                                            rowData
                                                                              .schedulePrice
                                                                              .schedulePriceItems[
                                                                              i
                                                                            ]
                                                                              .noOfItemNeedconfirm;
                                                                        }
                                                                      }

                                                                      if (
                                                                        !rowData1.noOfItemNeedconfirm
                                                                      ) {
                                                                        rowData1.noOfItemNeedconfirm = 0;
                                                                      }
                                                                      if (
                                                                        rowData.minQuantity &&
                                                                        _total +
                                                                          1 <
                                                                          rowData.minQuantity
                                                                      ) {
                                                                        rowData1.noOfItemNeedconfirm =
                                                                          rowData.minQuantity -
                                                                          _total;

                                                                        if (
                                                                          rowData1.noOfItemNeedconfirm <=
                                                                          0
                                                                        ) {
                                                                          rowData1.noOfItemNeedconfirm = 0;
                                                                          this.props.holder.setState(
                                                                            {
                                                                              alertSnackBar:
                                                                                Language.getLanguage(
                                                                                  LanguageIdMap.MINIMUM_CHOOSE_VALUE,
                                                                                  {
                                                                                    name:
                                                                                      rowData
                                                                                        .schedulePrice
                                                                                        .schedulePriceType ===
                                                                                      LanguageIdMap
                                                                                        .SCHEDULE_PRICE_TYPE_LIST
                                                                                        .BY_PERSON
                                                                                        .value
                                                                                        ? common
                                                                                            .schedulePriceItemTypeMap[
                                                                                            rowData1
                                                                                              .schedulePriceItemType
                                                                                          ] +
                                                                                          (rowData1.label
                                                                                            ? " (" +
                                                                                              rowData1.label +
                                                                                              ")"
                                                                                            : "")
                                                                                        : rowData1.label,
                                                                                    value:
                                                                                      rowData.minQuantity,
                                                                                  }
                                                                                ),
                                                                            }
                                                                          );
                                                                        }
                                                                      } else if (
                                                                        rowData.maxQuantity &&
                                                                        _total >=
                                                                          rowData.maxQuantity
                                                                      ) {
                                                                        this.props.holder.setState(
                                                                          {
                                                                            alertSnackBar:
                                                                              Language.getLanguage(
                                                                                LanguageIdMap.MAXIMUM_CHOOSE_VALUE,
                                                                                {
                                                                                  name:
                                                                                    rowData
                                                                                      .schedulePrice
                                                                                      .schedulePriceType ===
                                                                                    LanguageIdMap
                                                                                      .SCHEDULE_PRICE_TYPE_LIST
                                                                                      .BY_PERSON
                                                                                      .value
                                                                                      ? common
                                                                                          .schedulePriceItemTypeMap[
                                                                                          rowData1
                                                                                            .schedulePriceItemType
                                                                                        ] +
                                                                                        (rowData1.label
                                                                                          ? " (" +
                                                                                            rowData1.label +
                                                                                            ")"
                                                                                          : "")
                                                                                      : rowData1.label,
                                                                                  value:
                                                                                    rowData.maxQuantity,
                                                                                }
                                                                              ),
                                                                          }
                                                                        );
                                                                      } else if (
                                                                        rowData.amount &&
                                                                        _total >=
                                                                          rowData.amount
                                                                      ) {
                                                                        this.props.holder.setState(
                                                                          {
                                                                            alertSnackBar:
                                                                              Language.getLanguage(
                                                                                LanguageIdMap.MAXIMUM_CHOOSE_VALUE,
                                                                                {
                                                                                  name:
                                                                                    rowData
                                                                                      .schedulePrice
                                                                                      .schedulePriceType ===
                                                                                    LanguageIdMap
                                                                                      .SCHEDULE_PRICE_TYPE_LIST
                                                                                      .BY_PERSON
                                                                                      .value
                                                                                      ? common
                                                                                          .schedulePriceItemTypeMap[
                                                                                          rowData1
                                                                                            .schedulePriceItemType
                                                                                        ] +
                                                                                        (rowData1.label
                                                                                          ? " (" +
                                                                                            rowData1.label +
                                                                                            ")"
                                                                                          : "")
                                                                                      : rowData1.label,
                                                                                  value:
                                                                                    rowData.amount,
                                                                                }
                                                                              ),
                                                                          }
                                                                        );
                                                                      } else {
                                                                        rowData1.noOfItemNeedconfirm++;
                                                                      }

                                                                      this.forceUpdate();
                                                                    }}
                                                                  />
                                                                </div>
                                                              </div>
                                                            </div>,
                                                            <hr
                                                              style={{
                                                                margin: 0,
                                                              }}
                                                            />,
                                                          </>
                                                        }
                                                      )}
                                                    <div
                                                      style={{
                                                        padding: "17px 20px",
                                                        display: "flex",
                                                        justifyContent:
                                                          "flex-end",
                                                      }}
                                                    >
                                                      <RaisedButton
                                                        buttonStyle={{
                                                          ...config
                                                            .buttonStyle[1],
                                                          height: 33,
                                                          padding: 0,
                                                        }}
                                                        style={{
                                                          marginBottom: 12,
                                                          display:
                                                            "inline-block",
                                                          margin: 0,
                                                          marginRight: 20,
                                                          fontWeight: "bold",
                                                          outline: "none",
                                                        }}
                                                        onClick={(e) => {
                                                          this.setState(
                                                            {
                                                              packageQuantityMenuMustDisappear: true,
                                                            },
                                                            function () {
                                                              this.setState({
                                                                packageQuantityMenuMustDisappear:
                                                                  undefined,
                                                              });
                                                            }.bind(this)
                                                          );
                                                        }}
                                                      >
                                                        {Language.getLanguage(
                                                          LanguageIdMap.btnCancel
                                                        )}
                                                      </RaisedButton>
                                                      <RaisedButton
                                                        buttonStyle={{
                                                          ...config
                                                            .buttonStyle[0],
                                                          height: 33,
                                                          padding: 0,
                                                        }}
                                                        style={{
                                                          marginBottom: 12,
                                                          display:
                                                            "inline-block",
                                                          margin: 0,
                                                          fontWeight: "bold",
                                                          outline: "none",
                                                        }}
                                                        onClick={(e) => {
                                                          if (
                                                            rowData.schedulePrice &&
                                                            rowData
                                                              .schedulePrice
                                                              .schedulePriceItems
                                                          ) {
                                                            for (
                                                              let i = 0;
                                                              i <
                                                              rowData
                                                                .schedulePrice
                                                                .schedulePriceItems
                                                                .length;
                                                              i++
                                                            ) {
                                                              if (
                                                                rowData
                                                                  .schedulePrice
                                                                  .schedulePriceItems[
                                                                  i
                                                                ]
                                                                  .noOfItemNeedconfirm !==
                                                                undefined
                                                              ) {
                                                                rowData.schedulePrice.schedulePriceItems[
                                                                  i
                                                                ].noOfItem =
                                                                  rowData.schedulePrice.schedulePriceItems[
                                                                    i
                                                                  ].noOfItemNeedconfirm;
                                                              }
                                                            }
                                                          }
                                                          this.setState(
                                                            {
                                                              packageQuantityMenuMustDisappear: true,
                                                            },
                                                            function () {
                                                              this.setState({
                                                                packageQuantityMenuMustDisappear:
                                                                  undefined,
                                                              });
                                                            }.bind(this)
                                                          );
                                                        }}
                                                      >
                                                        {Language.getLanguage(
                                                          LanguageIdMap.ACCEPT
                                                        )}
                                                      </RaisedButton>
                                                    </div>
                                                  </div>
                                                </IconMenu>
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                      <div className="col-sm-6">
                                        {rowData._tmpTotalPrice > 0 && (
                                          <div>
                                            <div
                                              style={{
                                                fontSize: 18,
                                                marginTop: 18,
                                                paddingBottom: 4,
                                                fontWeight: "bold",
                                              }}
                                            >
                                              {Language.getLanguage(
                                                LanguageIdMap.PRICE_BREAKDOWN
                                              )}
                                            </div>
                                            {rowData.schedulePrice &&
                                              rowData.schedulePrice
                                                .schedulePriceItems &&
                                              rowData.schedulePrice.schedulePriceItems.map(
                                                (rowData1, rowIndex1) => {
                                                  if (rowData1.noOfItem) {
                                                    return (
                                                      <div
                                                        style={{
                                                          display: "flex",
                                                          justifyContent:
                                                            "space-between",
                                                          marginTop: 8,
                                                        }}
                                                      >
                                                        <div>
                                                          {rowData.schedulePrice
                                                            .schedulePriceType ===
                                                          LanguageIdMap
                                                            .SCHEDULE_PRICE_TYPE_LIST
                                                            .BY_PERSON.value
                                                            ? common
                                                                .schedulePriceItemTypeMap[
                                                                rowData1
                                                                  .schedulePriceItemType
                                                              ] +
                                                              (rowData1.label
                                                                ? " (" +
                                                                  rowData1.label +
                                                                  ")"
                                                                : "")
                                                            : rowData1.label}
                                                          &nbsp;&nbsp;&nbsp;
                                                          {rowData1.noOfItem +
                                                            " x " +
                                                            Language.getLanguage(
                                                              common.moneyType
                                                            ) +
                                                            " " +
                                                            common.numberWithCommas(
                                                              rowData1.price
                                                            )}
                                                        </div>
                                                        <div>
                                                          {Language.getLanguage(
                                                            common.moneyType
                                                          ) +
                                                            " " +
                                                            common.numberWithCommas(
                                                              rowData1.price *
                                                                rowData1.noOfItem
                                                            )}
                                                        </div>
                                                      </div>
                                                    );
                                                  }
                                                  return <div />
                                                }
                                              )}
                                            {rowData.schedulePrice.date !==
                                              undefined &&
                                              (!rowData.listStartTimes ||
                                                rowData.listStartTimes
                                                  .length === 0 ||
                                                rowData._tmpSelectTime !==
                                                  undefined) && (
                                                <div
                                                  style={{
                                                    display: "flex",
                                                    ...(common.getViewportWidth() >=
                                                    510
                                                      ? {
                                                          justifyContent:
                                                            "flex-end",
                                                        }
                                                      : {
                                                          flexWrap: "wrap",
                                                          justifyContent:
                                                            "center",
                                                        }),
                                                    paddingTop:
                                                      common.getViewportWidth() >=
                                                      config.sizeConfig.widthSm
                                                        ? 120 -
                                                          rowData
                                                            ._tmpListChoosen
                                                            .length *
                                                            28
                                                        : 12,
                                                  }}
                                                >
                                                  <RaisedButton
                                                    buttonStyle={{
                                                      ...config.buttonStyle[0],
                                                      padding: 0,
                                                      fontSize: 16,
                                                    }}
                                                    style={{
                                                      marginBottom: 12,
                                                      height: 45,
                                                      minWidth: 180,
                                                      display: "inline-block",
                                                      margin: 12,
                                                      fontWeight: "bold",
                                                      outline: "none",
                                                    }}
                                                    onClick={(e) => {
                                                      e.preventDefault();
                                                      if (!rowData.bookNow) {
                                                        delete common.booknowData;
                                                        window.localStorage.removeItem(
                                                          "paynowData"
                                                        );
                                                      }
                                                      this.props.holder.prepareDataWhenClickAddToCartOrBookNow(
                                                        { rowData: rowData }
                                                      );
                                                    }}
                                                  >
                                                    {Language.getLanguage(
                                                      LanguageIdMap.ADD_TO_CART
                                                    ).toUpperCase()}
                                                  </RaisedButton>
                                                  <RaisedButton
                                                    buttonStyle={{
                                                      ...config.buttonStyle[0],
                                                      padding: 0,
                                                      fontSize: 16,
                                                    }}
                                                    style={{
                                                      marginBottom: 12,
                                                      height: 45,
                                                      minWidth: 180,
                                                      display: "inline-block",
                                                      margin: 12,
                                                      fontWeight: "bold",
                                                      outline: "none",
                                                    }}
                                                    onClick={(e) => {
                                                      e.preventDefault();
                                                      this.props.holder.prepareDataWhenClickAddToCartOrBookNow(
                                                        {
                                                          rowData: rowData,
                                                          bookNow: true,
                                                        }
                                                      );
                                                    }}
                                                  >
                                                    {Language.getLanguage(
                                                      LanguageIdMap.BOOK_NOW
                                                    ).toUpperCase()}
                                                  </RaisedButton>
                                                </div>
                                              )}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </Collapse>
                              )}
                            </div>
                          );
                        }
                      )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class ShareBooknowFavourite extends Component {
  render() {
    const { spaceBetweenElement = 0 } = this.props;
    return (
      <div>
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
            background: #fff;
          }
          .booknowButton {
            margin-left: ${spaceBetweenElement} !important;
            box-shadow: none !important;
            background-color: transparent !important;
          }
          .booknowButton > button{
            height: 55px !important;
            border-top-right-radius: 20px !important;
            border: 1px solid #fff !important;
          }
      `}</style>
        </Head>
        <div className="productFavBooknowContainer">
          <div
            className="productFavContainer"
            onClick={(e) => {
              e.preventDefault();
              let doSomeThing = function () {
                common
                  .fetcher(
                    config.api.hostType.product_url,
                    config.api.hostEndPoint.wishlist,
                    "post",
                    undefined,
                    {
                      targetId:
                        this.props.holder.props.initPropsData.data.productId,
                      act: this.props.holder.props.initPropsData.data.fav
                        ? 1
                        : 0,
                    },
                    { typeFormData: true }
                  )
                  .then((jsonRes) => {})
                  .catch((err) => {
                    console.log("error pro3:" + err);
                  });
                this.props.holder.props.initPropsData.data.fav =
                  !this.props.holder.props.initPropsData.data.fav;
                this.forceUpdate();
              }.bind(this);

              if (!common.checkLoginUser()) {
                common.more.needCallbackWhenLogin = doSomeThing.bind(this);
                this.props.holder.setState({ loginModalPopup: true });
              } else {
                doSomeThing();
              }
            }}
          >
            {!common.checkServer() && (
              <Checkbox
                iconStyle={{
                  width: 40,
                  height: 40,
                  marginRight: 0,
                  left: 0,
                  color: config.colorConfig.main,
                  fill: config.colorConfig.main,
                }}
                checkedIcon={<ActionFavorite />}
                uncheckedIcon={<ActionFavoriteBorder />}
                checked={
                  this.props.holder.props.initPropsData.data
                    ? this.props.holder.props.initPropsData.data.fav
                    : false
                }
              />
            )}
          </div>
          <div style={{}}>
            {!common.checkServer() && (
              <RaisedButton
                className="booknowButton"
                buttonStyle={{
                  ...config.buttonStyle[0],
                  height: 52,
                  minWidth: 120,
                  padding: 0,
                }}
                style={{
                  marginBottom: 12,
                  margin: 0,
                  marginLeft: 12,
                  fontWeight: "bold",
                  outline: "none",
                }}
                onClick={(e) => {
                  if ($("#package_options") && $("#package_options").offset()) {
                    $("html, body").animate(
                      {
                        scrollTop:
                          $("#package_options").offset().top -
                          this.props.holder.getTopHeightNav() -
                          50,
                      },
                      300
                    );
                  }

                  if (this.props.holder.props.initPropsData.schedule) {
                    let hasChoosingPackage = false;
                    for (
                      let i = 0;
                      i < this.props.holder.props.initPropsData.schedule.length;
                      i++
                    ) {
                      if (
                        this.props.holder.props.initPropsData.schedule[i]
                          ._tmpIsChoosingPackage === true
                      ) {
                        hasChoosingPackage = true;
                        break;
                      }
                    }
                    if (
                      hasChoosingPackage === false &&
                      this.props.holder.props.initPropsData.schedule.length > 0
                    ) {
                      this.props.holder.props.initPropsData.schedule[0]._tmpIsChoosingPackage = true;
                    }
                    if (this.props.holder.packageOptionRef) {
                      this.props.holder.packageOptionRef.forceUpdate();
                    }
                  }
                }}
              >
                {Language.getLanguage(LanguageIdMap.BOOK_NOW)}
              </RaisedButton>
            )}
          </div>
        </div>
      </div>
    );
  }
}
class PriceShareBooknowFavouriteFixedBelow extends Component {
  render() {
    return (
      <div>
        <Head>
          <style type="text/css">{`
          #priceFavoriteBookNowFixedBelow{
            position: fixed;
            left: 0;
            bottom: 0;
            display: -webkit-box;
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            width: 100%;
            min-height: 48px;
            padding: 12px;
            background-color: #fff;
            z-index: 101;
            box-shadow: 0 -2px 6px 0 rgb(0 0 0 / 12%);
            justify-content: space-between;
          }
          .fontSize20{
            font-size: 20px !important;
          }
          #shareBooknowFavouriteFixedBelow{
            flex: 1;
          }
          #shareBooknowFavouriteFixedBelow > div > div > div:first-child {
            margin-left: 60px;
            margin-right: 4px;
            height: 48px;
          }
          #shareBooknowFavouriteFixedBelow > div > div > div:nth-child(2) {
            width: 100%;
          }
          #shareBooknowFavouriteFixedBelow > div > div > div:nth-child(2) > div {
            width: 100%;
          }
          #shareBooknowFavouriteFixedBelow > div > div > div:nth-child(2) > div >   button{
            border-radius: unset !important;
            height: 48px !important;
          }

          @media only screen and (min-width: ${config.sizeConfig.widthPC}px) {
            #priceFavoriteBookNowFixedBelow {
              display: none;
            }
          }
      `}</style>
        </Head>
        <div
          id="priceFavoriteBookNowFixedBelow"
          className="displayFlex flexWrapWrap justifyContentFlexEnd"
        >
          <div>
            {this.props.initPropsData.data.discount !== undefined && (
              <div className="mgBottom8">
                <div className="productTitleSectionRightMoney fontSize20">
                  {common.numberWithCommas(
                    this.props.initPropsData.data.advertisePrice
                  ) + Language.getLanguage(common.moneyType)}
                </div>
                <div className="productTitleSectionRightDiscount fontSize20">
                  {"-" + this.props.initPropsData.data.discount + "%"}
                </div>
              </div>
            )}
            <div>
              <div className="productTitleSectionRightFrom fontSize20">
                {Language.getLanguage(LanguageIdMap.from)}
              </div>
              <div className="productTitleSectionRightPrice fontSize20">
                {common.numberWithCommas(
                  this.props.initPropsData.data.newPrice
                    ? this.props.initPropsData.data.newPrice
                    : this.props.initPropsData.data.advertisePrice
                ) + Language.getLanguage(common.moneyType)}
              </div>
            </div>
            <div>{this.props.initPropsData.data.priceExplain}</div>
          </div>
          <div id={"shareBooknowFavouriteFixedBelow"}>
            <ShareBooknowFavourite
              holder={this.props.holder}
              spaceBetweenElement={"8px"}
            />
          </div>
        </div>
      </div>
    );
  }
}
class StickyMenu extends Component {
  state = {
    scrollLeft: 0,
  };
  render() {
    if (
      !common.checkMobile() &&
      this.props.holder.props.initPropsData.stickyMenuList &&
      this.props.holder.props.initPropsData
        .needRenderShareBooknowFavoriteAtStickyMenu
    ) {
      return (
        <div>
          <Head>
            <style type="text/css">{`
          .productStickyMenuContainer{
            position: fixed;
            z-index: 100;
            background-color: #fff;
            width: 100%;
            border-top: 1px solid #eee;
            top: ${
              document.getElementById("mainheader")
                ? document.getElementById("mainheader").clientHeight
                : undefined
            }px;
            overflow-x: auto;
          }
          .productStickyMenu{
            max-width: 100%;
            display: flex;
            justify-content: space-between;
          }
          @media only screen and (max-width: ${
            config.sizeConfig.widthPC - 1
          }px) {
            .productStickyMenu:after {
              content: "";
              position: absolute;
              right: ${-this.state.scrollLeft}px;
              top: 0;
              bottom: 0;
              width: 24px;
              z-index: 6;
              background-image: -webkit-gradient(linear,right top,left top,from(#fff),to(hsla(0,0%,100%,0)));
              background-image: linear-gradient(270deg,#fff,hsla(0,0%,100%,0));
            }
          }
          #productStickyTitle {
            width: fit-content;
          }
          .productStickyMenuEle{
            line-height: 36px;
            cursor: pointer;
            padding-right: 20px;
            padding-left: 20px;
            white-space: nowrap; 
            height: 55px;
            display: flex;
            align-items: center;
            flex: auto;
          }
          .productStickyMenuEleFocus{
            border-bottom: 2px solid ${config.colorConfig.main};
          }
          @media only screen and (max-width: ${
            config.sizeConfig.widthPC - 1
          }px) {
            #shareBooknowFavoriteOnStickyMenu {
              display: none;
            }
          }
        `}</style>
          </Head>
          <PriceShareBooknowFavouriteFixedBelow
            holder={this.props.holder}
            {...this.props.holder.props}
          />
          <div
            id="stickyMenuId"
            className="productStickyMenuContainer"
            onScroll={(event) =>
              this.setState({ scrollLeft: event.target.scrollLeft })
            }
          >
            <div className="pageSmallWidth productStickyMenu">
              <div className="displayFlex" id="productStickyTitle">
                {this.props.holder.props.initPropsData.stickyMenuList.map(
                  (rowData, rowIndex) => {
                    return (
                      <div
                        id={rowData.id + "sticky"}
                        className={`productStickyMenuEle 
                  ${
                    this.props.holder._currentScrollFocus === rowData.id
                      ? `productStickyMenuEleFocus`
                      : ""
                  }`}
                        onClick={(e) => {
                          $("html, body").animate(
                            {
                              scrollTop:
                                $("#" + rowData.id).offset().top -
                                this.props.holder.getTopHeightNav() -
                                70,
                            },
                            300
                          );
                        }}
                      >
                        {rowData.name}
                      </div>
                    );
                  }
                )}
              </div>
              <div id={"shareBooknowFavoriteOnStickyMenu"}>
                <ShareBooknowFavourite holder={this.props.holder} />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

class Display extends SuperComponent {
  constructor(props, context) {
    super(props, context);
    this.state.photoIndex = -1;
    this.state.timelineFocus = 0;
  }

  scrollEventCallback() {
    if (
      /* (document.documentElement.scrollTop<150 && this.headerHeight !== this.getTopHeightNav()) &&*/
      $("#renderShareBooknowFavoriteOnTopContainerId") &&
      $("#renderShareBooknowFavoriteOnTopContainerId").offset()
    ) {
      this.headerHeight = this.getTopHeightNav();
      if (
        this.props.initPropsData.needRenderShareBooknowFavoriteAtStickyMenu &&
        document.documentElement.scrollTop <
          $("#renderShareBooknowFavoriteOnTopContainerId").offset().top - 50
      ) {
        this.props.initPropsData.needRenderShareBooknowFavoriteAtStickyMenu = false;
        if (this.stickyMenuRef) {
          this.stickyMenuRef.forceUpdate();
        }
      } else if (
        !this.props.initPropsData.needRenderShareBooknowFavoriteAtStickyMenu &&
        document.documentElement.scrollTop >=
          $("#renderShareBooknowFavoriteOnTopContainerId").offset().top - 50
      ) {
        this.props.initPropsData.needRenderShareBooknowFavoriteAtStickyMenu = true;
        if (this.stickyMenuRef) {
          this.stickyMenuRef.forceUpdate();
        }
      }
    }

    if ($("#pvvBlogCamnangContainer")) {
      const prevHeight = $("#pvvBlogCamnangContainer").height();
      const realHeight = $("#pvvBlogCamnang").height();
      let nextHeight = realHeight - document.documentElement.scrollTop;
      if (nextHeight < 0) nextHeight = 0;
      if (nextHeight !== prevHeight) {
        $("#pvvBlogCamnangContainer").css("height", nextHeight);
      }
    }
  }

  static getInitialPromiseListForProps(context) {
    common.initPropsData.alias = common.location.pathArr[2];
    let promiseArr = [
      Display.getProductDetail(common.initPropsData),
      Display.getProductRelative(common.initPropsData),
      Display.getSchedule(common.initPropsData),
    ];
    return promiseArr;
  }
  static getProductDetail(state = common.initPropsData) {
    return common
      .fetcher(
        config.api.hostType.product_url,
        config.api.hostEndPoint.productDetail,
        "get",
        { alias: state.alias }
      )
      .then((jsonRes) => {
        let data = jsonRes.data;
        data.alias = data.alias;
        if (data.howUse) {
          try {
            data.howUse = JSON.parse(data.howUse);
          } catch (error) {
            data.howUse = undefined;
          }
        }

        if (data.timeline) {
          for (let i = 0; i < data.timeline.length; i++) {
            let title;
            let content;
            try {
              title = data.timeline[i].title.replace(/style=""/g, "");
              content = data.timeline[i].content.replace(/style=""/g, "");
              title = decodeURIComponent(
                escape(data.timeline[i].title)
              ).replace(/style=""/g, "");
              content = decodeURIComponent(
                escape(data.timeline[i].content)
              ).replace(/style=""/g, "");
            } catch (error) {}
            data.timeline[i] = {
              title,
              content,
            };
          }
        }
        if (data.highlight) {
          data.highlight = data.highlight.replace(/style=""/g, "");
        }
        if (data.longDescription) {
          data.longDescription = data.longDescription.replace(/style=""/g, "");
        }
        if (data.actInfo) {
          data.actInfo = data.actInfo.replace(/style=""/g, "");
        }
        if (data.faq) {
          data.faq = data.faq.replace(/style=""/g, "");
        }

        state.seoTitle = jsonRes.data.seoTitle;
        state.seoDescription = jsonRes.data.metaDesc;
        if (jsonRes.data.featureImage) {
          state.seoImage = jsonRes.data.featureImage;
        }

        state.data = data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static getProductRelative(state = common.initPropsData) {
    return common
      .fetcher(
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
          _configMaxCardDisplayOfRow: 5,
          _leftRightHeightButton: "33%",
        };
      })
      .catch((err) => {});
  }
  static getSchedule(state = common.initPropsData) {
    return common
      .fetcher(
        config.api.hostType.product_url,
        state.checkAvailabilityDatePicker
          ? config.api.hostEndPoint.scheduleByDay
          : config.api.hostEndPoint.schedule,
        "get",
        {
          alias: state.alias,
          ...(state.checkAvailabilityDatePicker
            ? { date: state.checkAvailabilityDatePicker }
            : {}),
        }
      )
      .then((jsonRes) => {
        state.schedule = jsonRes.data;
      })
      .catch((err) => {});
  }
  setupScrollFocusCallbackArr() {
    if (!this.props.initPropsData.needSetupStickyMenuListCallback) {
      return;
    }
    this.props.initPropsData.needSetupStickyMenuListCallback = true;

    this.scrollFocusCallbackArr = undefined;
    if (this.props.initPropsData.stickyMenuList) {
      for (let i = 0; i < this.props.initPropsData.stickyMenuList.length; i++) {
        this.addToScrollFocusCallback(
          this.props.initPropsData.stickyMenuList[i].id,
          () => {
            if (this.stickyMenuRef) {
              this.stickyMenuRef.forceUpdate();
            }
          }
        );
      }
    }
  }
  componentDidMount() {
    super.componentDidMount();
    this.setupScrollFocusCallbackArr();
  }
  componentDidUpdate() {
    super.componentDidUpdate();
    this.setupScrollFocusCallbackArr();
  }

  checkAndLoadData() {

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
    if (
      !this.props.initPropsData.data ||
      !this.props.initPropsData.data.featureImage
    ) {
      return <div />;
    }
    return (
      <div>
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
          .productBackgroundContainer{
            overflow: hidden;
            display: flex;
            justify-content: center;
             ${
               ""
               /* Math.round(common.getViewportWidth()) >=
                config.pageSmallWidthStyle.width
                  ? "height: 70vh;"
                  : "height: 50vh;"*/
             }
          }
          .productBackgroundImage{
            width: 100%;
            object-fit: cover;
            max-width: 100%;
            z-index: 0;
            height: 100%;
            display: none;    
          }
        `}</style>
        </Head>
        <div className="fontsize16">
          <div className="breakcumContainer pageSmallWidth">
            <div id="breakcumProduct" className="breakcumProduct">
              <a
                href={config.shortUrl.home}
                className="colorMain"
                onClick={(e) => {
                  e.preventDefault();
                  Router.push(config.shortUrl.home);
                }}
              >
                {Language.getLanguage(LanguageIdMap.HOME)}
              </a>
              <i className="fa fa-angle-right" />
              {this.props.initPropsData.data.destinations &&
                this.props.initPropsData.data.destinations.map(
                  (rowData, rowIndex) => {
                    return <>
                      <a
                        href={config.shortUrl.destination + "/" + rowData.alias}
                        className="colorInherit"
                        onClick={(e) => {
                          e.preventDefault();
                          Router.push(
                            config.shortUrl.destination,
                            config.shortUrl.destination + "/" + rowData.alias
                          );
                        }}
                      >
                        {rowData.briefName}
                      </a>
                      <i className="fa fa-angle-right" />
                    </>
                  }
                )}

              <OverlayTrigger
                placement={"bottom"}
                overlay={
                  <Tooltip style={{}}>
                    {this.props.initPropsData.data.productName}
                  </Tooltip>
                }
              >
                <div style={{ whiteSpace: "nowrap" }}>
                  {this.props.initPropsData.data.productName}
                </div>
              </OverlayTrigger>
            </div>
          </div>
          <div className="productBackgroundContainer">
            <img
              className="productBackgroundImage"
              alt={this.props.initPropsData.data.featureImage.altText}
              src={this.props.initPropsData.data.featureImage.photoUrl.replace(
                "09e5ab510779.ngrok.io",
                "55482bf53374.ngrok.io"
              )}
            />
          </div>
        </div>
      </div>
    );
  }
  renderSidebar() {
    return (
      <div className="product-sidebar">
        {/* Combined Booking Card with Kredivo */}
        <div className="sidebar-booking-card">
          {/* ĐẶT VÉ ONLINE Header */}
          <div className="booking-header">
            <i className="fa fa-ticket" />
            <span>ĐẶT VÉ ONLINE</span>
          </div>

          {/* Price Section */}
          <div className="booking-price-section">
            <div className="price-row">
              <span className="price-label-text">Giá từ:</span>
              <div className="price-value-wrapper">
                {this.props.initPropsData.data.discount !== undefined && (
                  <span className="original-price-strike">
                    {common.numberWithCommas(this.props.initPropsData.data.advertisePrice)}đ
                  </span>
                )}
                <span className="current-price-value">
                  {common.numberWithCommas(
                    this.props.initPropsData.data.newPrice
                      ? this.props.initPropsData.data.newPrice
                      : this.props.initPropsData.data.advertisePrice
                  )}đ
                </span>
              </div>
            </div>
            {this.props.initPropsData.data.priceExplain && (
              <div className="price-note">{this.props.initPropsData.data.priceExplain}</div>
            )}
          </div>

          {/* Booking Buttons */}
          <div id="renderShareBooknowFavoriteOnTopContainerId" className="sidebar-booking-buttons">
            <ShareBooknowFavourite holder={this} spaceBetweenElement={"8px"} />
          </div>

          {/* Kredivo Section - Inside the same card */}
          <div className="kredivo-section">
            <div className="kredivo-header">
              <div className="kredivo-badge">Kredivo</div>
              <span className="kredivo-title">Mua trước trả sau</span>
            </div>
            <div className="kredivo-benefits">
              <div className="kredivo-item">
                <i className="fa fa-check" />
                <span>Trả sau 30 ngày - Lãi suất 0%</span>
              </div>
              <div className="kredivo-item">
                <i className="fa fa-check" />
                <span>Trả góp 3, 6, 12 tháng</span>
              </div>
            </div>
          </div>
        </div>

        {/* Why Book With PVV Section */}
        <div className="sidebar-why-book">
          <div className="why-book-header">
            <i className="fa fa-star" />
            <span>Tại sao đặt Tour với Phượt Vi Vu?</span>
          </div>
          <div className="why-book-list">
            <div className="why-book-item">
              <div className="why-book-icon">
                <i className="fa fa-dollar" />
              </div>
              <div className="why-book-text">
                <strong>Giá cả cạnh tranh</strong>
                <span>Đảm bảo giá tốt nhất thị trường</span>
              </div>
            </div>
            <div className="why-book-item">
              <div className="why-book-icon">
                <i className="fa fa-shield" />
              </div>
              <div className="why-book-text">
                <strong>An toàn & Bảo mật</strong>
                <span>Thanh toán an toàn, bảo mật thông tin</span>
              </div>
            </div>
            <div className="why-book-item">
              <div className="why-book-icon">
                <i className="fa fa-phone" />
              </div>
              <div className="why-book-text">
                <strong>Hỗ trợ 24/7</strong>
                <span>Hotline: {config.phoneContact}</span>
              </div>
            </div>
            <div className="why-book-item">
              <div className="why-book-icon">
                <i className="fa fa-file-text-o" />
              </div>
              <div className="why-book-text">
                <strong>Xác nhận ngay</strong>
                <span>Nhận vé điện tử qua Email</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderData() {
    if (!this.props.initPropsData.data) {
      return <div />;
    }

    const slidesToShow = Math.min(
      this.props.initPropsData.data && this.props.initPropsData.data.gallery
        ? this.props.initPropsData.data.gallery.length
        : 0,
      Math.floor(common.getViewportWidth() / 200),
      5
    );

    const productsRelativeToShow = Math.min(
      this.props.initPropsData.productRelative &&
        this.props.initPropsData.productRelative.data
        ? this.props.initPropsData.productRelative.data.length
        : 0,
      Math.floor(common.getViewportWidth() / 200),
      3
    );

    const isMobile = common.getViewportWidth() < config.sizeConfig.widthMd;
    const galleryImages = this.props.initPropsData.data.gallery || [];

    return (
      <div>
        <Head>
          <style type="text/css">{`
          /* New Product Page Styles */
          .product-page-wrapper {
            padding: 0 120px;
            margin-top: 20px;
          }
          @media only screen and (max-width: ${config.sizeConfig.widthMd - 1}px) {
            .product-page-wrapper {
              padding: 0 60px;
            }
          }
          @media only screen and (max-width: ${config.sizeConfig.widthSm - 1}px) {
            .product-page-wrapper {
              padding: 0 16px;
            }
          }
          .product-page-container {
            display: flex;
            gap: 32px;
            padding: 0;
          }
          .product-main-content {
            flex: 1;
            min-width: 0;
          }
          .product-sidebar-wrapper {
            width: 270px;
            flex-shrink: 0;
          }
          @media only screen and (max-width: ${config.sizeConfig.widthMd - 1}px) {
            .product-page-container {
              flex-direction: column;
            }
            .product-sidebar-wrapper {
              width: 100%;
              order: -1;
            }
          }

          /* Sidebar Styles */
          .product-sidebar {
            position: sticky;
            top: 100px;
          }

          /* Booking Card Styles */
          .sidebar-booking-card {
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
            margin-bottom: 16px;
          }
          .booking-header {
            background: #0ab596;
            color: #fff;
            padding: 14px 20px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 16px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .booking-header i {
            font-size: 18px;
          }
          .booking-price-section {
            padding: 20px;
            background: #fff;
            border-bottom: 1px solid #eee;
          }
          .price-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .price-label-text {
            font-size: 14px;
            color: #666;
          }
          .price-value-wrapper {
            text-align: right;
          }
          .original-price-strike {
            text-decoration: line-through;
            color: #999;
            font-size: 14px;
            margin-right: 8px;
          }
          .current-price-value {
            font-size: 26px;
            font-weight: 700;
            color: #e53935;
          }
          .price-note {
            font-size: 12px;
            color: #888;
            margin-top: 4px;
            text-align: right;
          }
          .sidebar-booking-buttons {
            padding: 16px 20px;
            background: #fff;
          }
          .sidebar-booking-buttons .productFavBooknowContainer {
            flex-direction: column !important;
            gap: 10px;
          }
          .sidebar-booking-buttons .booknowButton {
            margin-left: 0 !important;
            width: 100%;
          }
          .sidebar-booking-buttons .booknowButton > button {
            width: 100% !important;
            background: #0ab596 !important;
            border-radius: 6px !important;
          }
          .sidebar-booking-buttons .productFavContainer {
            display: none;
          }

          /* Kredivo Section Styles */
          .kredivo-section {
            background: #f0f7ff;
            padding: 16px 20px;
            border-top: 1px solid #e0e8f0;
          }
          .kredivo-header {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
          }
          .kredivo-badge {
            background: #f7941d;
            color: #fff;
            font-weight: 700;
            font-size: 12px;
            padding: 4px 10px;
            border-radius: 4px;
            text-transform: uppercase;
          }
          .kredivo-title {
            font-size: 14px;
            font-weight: 600;
            color: #333;
          }
          .kredivo-benefits {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }
          .kredivo-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            color: #555;
          }
          .kredivo-item i {
            color: #0ab596;
            font-size: 12px;
          }

          /* Why Book Section Styles */
          .sidebar-why-book {
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
          }
          .why-book-header {
            background: #0ab596;
            color: #fff;
            padding: 14px 20px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 14px;
            font-weight: 600;
          }
          .why-book-header i {
            font-size: 16px;
          }
          .why-book-list {
            padding: 16px 20px;
          }
          .why-book-item {
            display: flex;
            gap: 12px;
            padding: 12px 0;
            border-bottom: 1px solid #f0f0f0;
          }
          .why-book-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
          .why-book-item:first-child {
            padding-top: 0;
          }
          .why-book-icon {
            width: 36px;
            height: 36px;
            background: #e8f5f2;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }
          .why-book-icon i {
            color: #0ab596;
            font-size: 16px;
          }
          .why-book-text {
            flex: 1;
          }
          .why-book-text strong {
            display: block;
            font-size: 14px;
            font-weight: 600;
            color: #333;
            margin-bottom: 2px;
          }
          .why-book-text span {
            font-size: 12px;
            color: #666;
          }

          /* New Gallery Styles */
          .new-gallery-container {
            margin-bottom: 24px;
          }
          .gallery-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            gap: 4px;
            border-radius: 12px;
            overflow: hidden;
            height: 250px;
          }
          .gallery-grid .gallery-main {
            grid-column: 1;
            grid-row: 1 / 3;
          }
          .gallery-thumbs-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            gap: 4px;
            grid-column: 2;
            grid-row: 1 / 3;
          }
          @media only screen and (max-width: ${config.sizeConfig.widthSm - 1}px) {
            .gallery-grid {
              grid-template-columns: 1fr;
              grid-template-rows: 1fr;
              height: 180px;
            }
            .gallery-grid .gallery-thumb {
              display: none;
            }
          }
          .gallery-main {
            position: relative;
            cursor: pointer;
          }
          .gallery-main img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .gallery-thumb {
            position: relative;
            cursor: pointer;
            overflow: hidden;
          }
          .gallery-thumb img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
          }
          .gallery-thumb:hover img {
            transform: scale(1.05);
          }
          .gallery-more-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 18px;
            font-weight: 600;
          }
          .gallery-view-all {
            position: absolute;
            bottom: 12px;
            right: 12px;
            background: rgba(255, 255, 255, 0.95);
            color: #333;
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            transition: all 0.2s ease;
          }
          .gallery-view-all:hover {
            background: #fff;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          }

          /* Product Title Section */
          .product-title-section {
            margin-bottom: 20px;
          }
          .product-title-section h1 {
            font-size: 28px;
            font-weight: 700;
            color: #1a1a1a;
            margin: 0 0 12px 0;
            line-height: 1.3;
          }
          @media only screen and (max-width: ${config.sizeConfig.widthSm - 1}px) {
            .product-title-section h1 {
              font-size: 22px;
            }
          }
          .product-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            align-items: center;
          }
          .product-meta-item {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 14px;
            color: #666;
          }
          .product-meta-item i {
            color: #0ab596;
          }
          .product-services {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 12px;
          }
          .product-service-tag {
            display: flex;
            align-items: center;
            gap: 6px;
            background: #f0f9f7;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 13px;
            color: #0ab596;
          }
          .product-service-tag img {
            width: 16px;
            height: 16px;
          }

          /* Benefits Bar */
          .benefits-bar {
            display: none;
          }

          /* Content Sections */
          .content-section {
            background: #fff;
            border-radius: 8px;
            padding: 24px;
            margin-bottom: 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          }
          .section-title {
            font-size: 18px;
            font-weight: 700;
            color: #1a1a1a;
            margin: 0 0 16px 0;
            padding-bottom: 12px;
            border-bottom: 2px solid #0ab596;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .section-title i {
            color: #0ab596;
          }

          /* Highlight Section with Background */
          .highlight-section {
            background: #f5a623 !important;
            background-color: #f5a623 !important;
            border-radius: 8px;
            padding: 24px;
            margin-bottom: 20px;
            color: #fff !important;
          }
          .highlight-section * {
            color: #fff !important;
          }
          .highlight-section .highlight-header {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 16px;
            text-transform: uppercase;
            color: #fff !important;
          }
          .highlight-section .highlight-header i {
            font-size: 20px;
            color: #fff !important;
          }
          .highlight-section .highlight-content {
            color: #fff !important;
          }
          .highlight-section ul {
            margin: 0;
            padding-left: 20px;
            color: #fff !important;
          }
          .highlight-section li {
            margin-bottom: 8px;
            line-height: 1.5;
            color: #fff !important;
          }
          .highlight-section p {
            margin: 0 0 8px 0;
            line-height: 1.6;
            color: #fff !important;
          }

          /* Legacy Styles */
          .productSectionStyle{
            ${
              Math.round(common.getViewportWidth()) >= config.sizeConfig.widthSm
                ? "padding:0px"
                : "padding:0px"
            }
          }
          .priceFavoriteBookNow{
            align-items: center;
          }
          .productBody{
            font-size: 16px;
            line-height: 1.6;
          }
          .productTitleSection{
            margin: 0;
            background-color: transparent;
            margin-top: 0px;
          }
          .productTitleSectionLeft{
            vertical-align: top;
          }
          .productTitleSectionLeft > h1{
            margin-top: 0;
            margin-bottom: 0;
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
            margin-right: 4px;
            font-size: 14px;
          }
          .productTitleSectionRightPrice{
            display: inline-block;
            font-size: 24px;
          }
        `}</style>
        </Head>
        <StickyMenu holder={this} ref={(r) => (this.stickyMenuRef = r)} />
        <div className="productBody">
          <div className="pageSmallWidth product-page-wrapper">
            <div className="product-page-container">
              {/* Main Content */}
              <div className="product-main-content">
                {/* Product Title Section */}
                <div className="product-title-section">
                  <h1>{this.props.initPropsData.data.productName}</h1>
                  <div className="product-meta">
                    {this.props.initPropsData.data.destinations && this.props.initPropsData.data.destinations.length > 0 && (
                      <div className="product-meta-item">
                        <i className="fa fa-map-marker" />
                        <span>{this.props.initPropsData.data.destinations.map(d => d.briefName).join(', ')}</span>
                      </div>
                    )}
                    {this.props.initPropsData.data.duration && (
                      <div className="product-meta-item">
                        <i className="fa fa-clock-o" />
                        <span>{this.props.initPropsData.data.duration}</span>
                      </div>
                    )}
                  </div>
                  {this.props.initPropsData.data.services && this.props.initPropsData.data.services.length > 0 && (
                    <div className="product-services">
                      {this.props.initPropsData.data.services.map((service, idx) => (
                        <div key={idx} className="product-service-tag">
                          {service.iconUrl && <img src={service.iconUrl} alt={service.name} />}
                          <span>{service.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* New Gallery Grid */}
                {galleryImages.length > 0 && (
                  <div className="new-gallery-container">
                    <div className="gallery-grid">
                      <div className="gallery-main" onClick={() => this.setState({ photoIndex: 0 })}>
                        <img 
                          src={galleryImages[0].photoUrl.replace("09e5ab510779.ngrok.io", "55482bf53374.ngrok.io")} 
                          alt={galleryImages[0].altText || 'Main gallery image'} 
                        />
                        {!isMobile && galleryImages.length > 5 && (
                          <div className="gallery-view-all" onClick={(e) => { e.stopPropagation(); this.setState({ photoIndex: 0 }); }}>
                            <i className="fa fa-camera" />
                            Xem tất cả {galleryImages.length} ảnh
                          </div>
                        )}
                      </div>
                      {!isMobile && (
                        <div className="gallery-thumbs-container">
                          {galleryImages.slice(1, 5).map((img, idx) => (
                            <div 
                              key={idx} 
                              className="gallery-thumb" 
                              onClick={() => this.setState({ photoIndex: idx + 1 })}
                            >
                              <img 
                                src={img.photoUrl.replace("09e5ab510779.ngrok.io", "55482bf53374.ngrok.io")} 
                                alt={img.altText || `Gallery image ${idx + 2}`} 
                              />
                              {idx === 3 && galleryImages.length > 5 && (
                                <div className="gallery-more-overlay">
                                  +{galleryImages.length - 5}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {this.state.photoIndex >= 0 && (
                      <Lightbox
                        mainSrc={galleryImages[this.state.photoIndex].photoUrl}
                        nextSrc={galleryImages[(this.state.photoIndex + 1) % galleryImages.length].photoUrl}
                        prevSrc={galleryImages[(this.state.photoIndex - 1 + galleryImages.length) % galleryImages.length].photoUrl}
                        onCloseRequest={() => this.setState({ photoIndex: -1 })}
                        onMovePrevRequest={() =>
                          this.setState({
                            photoIndex: (this.state.photoIndex - 1 + galleryImages.length) % galleryImages.length,
                          })
                        }
                        onMoveNextRequest={() =>
                          this.setState({
                            photoIndex: (this.state.photoIndex + 1) % galleryImages.length,
                          })
                        }
                      />
                    )}
                  </div>
                )}

                {/* Benefits Bar */}
                <div className="benefits-bar">
                  <div className="benefit-item">
                    <i className="fa fa-check-circle" />
                    <span>{Language.getLanguage(LanguageIdMap.BEST_PRICE)}</span>
                  </div>
                  <div className="benefit-item">
                    <i className="fa fa-check-circle" />
                    <span>{Language.getLanguage(LanguageIdMap.BEST_QUALITY)}</span>
                  </div>
                  <div className="benefit-item">
                    <i className="fa fa-check-circle" />
                    <span>{Language.getLanguage(LanguageIdMap.EASY_BOOKING)}</span>
                  </div>
                </div>

                {/* Short Highlight - Điểm nổi bật */}
                {this.props.initPropsData.data.shortHighlight && (
                  <div className="highlight-section-wrapper">
                    <style>{`
                      .highlight-section-wrapper {
                        background: #f5a623 !important;
                        background-color: #f5a623 !important;
                        border-radius: 8px !important;
                        padding: 24px !important;
                        margin-bottom: 20px !important;
                      }
                      .highlight-section-wrapper,
                      .highlight-section-wrapper *,
                      .highlight-section-wrapper p,
                      .highlight-section-wrapper span,
                      .highlight-section-wrapper li,
                      .highlight-section-wrapper ul,
                      .highlight-section-wrapper div {
                        color: #333 !important;
                      }
                      .highlight-section-wrapper .highlight-title {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        font-size: 18px;
                        font-weight: 700;
                        margin-bottom: 16px;
                        text-transform: uppercase;
                      }
                    `}</style>
                    <div className="highlight-title">
                      <i className="fa fa-star" />
                      Điểm nổi bật
                    </div>
                    <div>
                      {ReactHtmlParser(this.props.initPropsData.data.shortHighlight)}
                    </div>
                  </div>
                )}

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
                  .image-gallery-left-nav{
                    top: 0 !important;
                    transform: none !important;
                    padding: 10px !important;
                    right: 40px !important;
                    left: unset !important;
                  }
                  .image-gallery-right-nav{
                    top: 0 !important;
                    transform: none !important;
                    padding: 10px !important;
                  }
                  .sliderImageContainer{
                    width: 100%;
                    padding-bottom: 66.7%;
                    position: relative;
                  }
                  .sliderImage{
                    object-fit: cover;
                    cursor: pointer;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                  }
                  /* Timeline Styles */
                  #timeline {
                    margin-bottom: 24px;
                  }
                  #timeline > h2 {
                    justify-content: center;
                    align-items: center;
                    display: flex;
                    background: #0ab596;
                    margin-top: 0;
                    margin-bottom: 0;
                    font-size: 22px;
                    height: 55px;
                    color: #fff;
                    text-transform: uppercase;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                  }
                  #timeline > .timelineList {
                    display: flex;
                    font-size: 16px;
                    cursor: pointer;
                    background: #f5f5f5;
                    flex-wrap: wrap;
                  }
                  #timeline > .timelineList > div {
                    min-height: 50px;
                    justify-content: center;
                    align-items: center;
                    display: flex;
                    flex: 1;
                    padding: 8px 12px;
                    text-align: center;
                    transition: all 0.2s ease;
                  }
                  #timeline > .timelineList > div:hover {
                    background: #e8f5f2;
                  }
                  #timeline > .timelineList > .timelineFocus {
                    background: #0ab596;
                    color: #fff;
                  }
                  #timeline .timeline-content {
                    padding: 20px;
                    background: #fff;
                    border: 1px solid #eee;
                    border-top: none;
                    border-bottom-left-radius: 10px;
                    border-bottom-right-radius: 10px;
                  }
                  /* Highlight Styles */
                  #highlight {
                    border: none;
                    margin-bottom: 24px;
                    padding: 24px;
                    background: #fffaea;
                    border-radius: 12px;
                  }
                  #highlight > h2 {
                    font-weight: bold;
                    margin-bottom: 16px;
                    font-size: 20px;
                    color: #333;
                  }
                  #highlight,
                  #highlight *,
                  #highlight p,
                  #highlight span,
                  #highlight li,
                  #highlight ul {
                    color: #333;
                  }
              `}</style>
                </Head>

                {/* Timeline Section */}
                {this.props.initPropsData.data.timeline &&
                  this.props.initPropsData.data.timeline.length > 0 && (
                    <div id="timeline">
                      <h2>
                        <i className="fa fa-calendar-check-o" style={{ marginRight: 10 }} />
                        Lịch trình
                      </h2>
                      <div className="timelineList">
                        {this.props.initPropsData.data.timeline.map(
                          ({ title }, tlIdx) => (
                            <div
                              key={tlIdx}
                              className={
                                this.state.timelineFocus === tlIdx
                                  ? "timelineFocus"
                                  : ""
                              }
                              onClick={() =>
                                this.setState({ timelineFocus: tlIdx })
                              }
                            >
                              {title}
                            </div>
                          )
                        )}
                      </div>
                      <div className="timeline-content">
                        {this.props.initPropsData.data.timeline[
                          this.state.timelineFocus
                        ] &&
                          this.props.initPropsData.data.timeline[
                            this.state.timelineFocus
                          ].content &&
                          ReactHtmlParser(
                            this.props.initPropsData.data.timeline[
                              this.state.timelineFocus
                            ].content
                          )}
                      </div>
                    </div>
                  )}

                {/* Full Highlight Section */}
                {this.props.initPropsData.data.highlight && (
                  <div id="highlight">
                    <h2 className="mgTop0">
                      {Language.getLanguage(LanguageIdMap.HIGH_LIGHT)}
                    </h2>
                    {ReactHtmlParser(this.props.initPropsData.data.highlight)}
                  </div>
                )}

                {/* Package Options */}
                <div id="package_options">
                  <PackageOption
                    ref={(r) => (this.packageOptionRef = r)}
                    holder={this}
                  />
                </div>

                <Head>
                  <style type="text/css">{`
                  #what_to_expect {
                    margin-top: 24px;
                  }
                  #what_to_expect .content-section {
                    padding-top: 0;
                    padding-bottom: 0;
                  }
                  #what_to_expect .content-section h2 {
                    font-weight: bold;
                    margin-bottom: 16px;
                  }
                  #what_to_expect .content-section hr {
                    margin-top: 24px;
                  }
                `}</style>
                </Head>
                {this.props.initPropsData.data.longDescription && (
                  <div id="what_to_expect">
                    <div className="content-section">
                      <h2 className="section-title">
                        <i className="fa fa-info-circle" />
                        {Language.getLanguage(LanguageIdMap.WHAT_TO_EXPECT)}
                      </h2>
                      {ReactHtmlParser(this.props.initPropsData.data.longDescription)}
                    </div>
                  </div>
                )}

                <Head>
                  <style type="text/css">{`
                  #act_info {
                    margin-top: 20px;
                  }
                  #act_info .content-section h2 {
                    font-weight: bold;
                    margin-bottom: 16px;
                  }
                  #how_to_use {
                    margin-top: 20px;
                  }
                  #how_to_use .content-section h2 {
                    font-weight: bold;
                    margin-bottom: 16px;
                  }
                  #how_to_use .how-use-item {
                    display: flex;
                    padding: 12px 0;
                    border-bottom: 1px solid #f0f0f0;
                  }
                  #how_to_use .how-use-item:last-child {
                    border-bottom: none;
                  }
                  #how_to_use .how-use-label {
                    width: 30%;
                    font-weight: 600;
                    color: #333;
                  }
                  #how_to_use .how-use-value {
                    flex: 1;
                    color: #666;
                    white-space: pre-wrap;
                  }
                  #cancel_policy {
                    margin-top: 20px;
                  }
                  #cancel_policy .content-section h2 {
                    font-weight: bold;
                    margin-bottom: 16px;
                  }
                  .cancel-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    padding: 8px 0;
                  }
                  .cancel-item i {
                    color: #0ab596;
                    margin-top: 4px;
                  }
                  #faq {
                    margin-top: 20px;
                  }
                  #faq .content-section h2 {
                    font-weight: bold;
                    margin-bottom: 16px;
                  }
                  .faq-button {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: #0ab596;
                    color: #fff;
                    padding: 12px 24px;
                    border-radius: 8px;
                    cursor: pointer;
                    margin-top: 16px;
                    font-weight: 500;
                    transition: all 0.2s ease;
                    text-decoration: none;
                  }
                  .faq-button:hover {
                    background: #099880;
                    color: #fff;
                  }
                `}</style>
                </Head>
                
                {/* Act Info Section */}
                {this.props.initPropsData.data.actInfo && (
                  <div id="act_info">
                    <div className="content-section">
                      <h2 className="section-title">
                        <i className="fa fa-list-ul" />
                        {Language.getLanguage(LanguageIdMap.ACT_INFO)}
                      </h2>
                      {ReactHtmlParser(this.props.initPropsData.data.actInfo)}
                    </div>
                  </div>
                )}

                {/* How to Use Section */}
                {this.props.initPropsData.data.howUse && (
                  <div id="how_to_use">
                    <div className="content-section">
                      <h2 className="section-title">
                        <i className="fa fa-file-text-o" />
                        {Language.getLanguage(LanguageIdMap.HOW_TO_USE)}
                      </h2>
                      {this.props.initPropsData.data.howUse.map(
                        (rowData, rowIndex) => (
                          <div key={rowIndex} className="how-use-item">
                            <div className="how-use-label">{rowData.name}</div>
                            <div className="how-use-value">{rowData.des}</div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Cancel Policy Section */}
                <div id="cancel_policy">
                  <div className="content-section">
                    <h2 className="section-title">
                      <i className="fa fa-ban" />
                      {Language.getLanguage(LanguageIdMap.CANCEL_POLICY)}
                    </h2>

                    {(!this.props.initPropsData.data.cancelRules ||
                      this.props.initPropsData.data.cancelRules.length === 0) && (
                      <div className="cancel-item">
                        <i className="fa fa-times-circle" />
                        <span>
                          {Language.getLanguage(LanguageIdMap.CANCEL_POLICY_CANNOT_CANCEL)}
                        </span>
                      </div>
                    )}
                    {this.props.initPropsData.data.cancelRules &&
                      this.props.initPropsData.data.cancelRules.map(
                        (rowData, rowIndex) => (
                          <div key={rowIndex} className="cancel-item">
                            <i className="fa fa-check-circle" />
                            <span>
                              {Language.getLanguage(
                                LanguageIdMap.CANCEL_POLICY_DESC,
                                {
                                  ...(rowData.day ? { day: rowData.day } : {}),
                                  ...(rowData.hour ? { hour: rowData.hour } : {}),
                                  percent: rowData.percent,
                                },
                                undefined,
                                undefined,
                                { HOUR: "hour", DAY: "day" }
                              )}
                            </span>
                          </div>
                        )
                      )}
                  </div>
                </div>

                {/* FAQ Section */}
                <div id="faq">
                  <div className="content-section">
                    <h2 className="section-title">
                      <i className="fa fa-question-circle" />
                      {Language.getLanguage(LanguageIdMap.FAQ_DESC)}
                    </h2>
                    {this.props.initPropsData.data.faq !== undefined &&
                      ReactHtmlParser(this.props.initPropsData.data.faq)}

                    <a
                      href={config.domain + config.shortUrl.faq}
                      className="faq-button"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(config.domain + config.shortUrl.faq, "_blank");
                      }}
                    >
                      <i className="fa fa-headphones" />
                      {Language.getLanguage(LanguageIdMap.CUSTOMER_SUPPORT)}
                    </a>
                  </div>
                </div>

              </div>
              {/* End Main Content */}

              {/* Sidebar */}
              {!isMobile && (
                <div className="product-sidebar-wrapper">
                  {this.renderSidebar()}
                </div>
              )}

            </div>
            {/* End product-page-container */}

            {/* Related Products - Outside the container for full width */}
            <Head>
              <style type="text/css">{`
              .related-products-section {
                margin-top: 40px;
                margin-bottom: 48px;
              }
              .related-products-section h2 {
                font-size: 24px;
                font-weight: 600;
                margin-bottom: 24px;
                color: #1a1a1a;
              }
            `}</style>
            </Head>
            {this.props.initPropsData.productRelative &&
              this.props.initPropsData.productRelative.data &&
              this.props.initPropsData.productRelative.data.length > 0 && (
                <div className="related-products-section">
                  <h2>
                    <i className="fa fa-th-large" style={{ marginRight: 10, color: '#0ab596' }} />
                    {Language.getLanguage(LanguageIdMap.RELATIVE_PRODUCT)}
                  </h2>
                  <Slider
                    infinite={true}
                    speed={500}
                    slidesToShow={
                      this.props.initPropsData.productRelative.data.length >
                      productsRelativeToShow
                        ? productsRelativeToShow + 0.05
                        : productsRelativeToShow
                    }
                    slidesToScroll={1}
                    prevArrow={<SlickPrevArrow />}
                    nextArrow={<SlickNextArrow />}
                  >
                    {this.props.initPropsData.productRelative.data.map(
                      this.renderProductCard.bind(this)
                    )}
                  </Slider>
                </div>
              )}

            {/* Mobile Sidebar - Show at bottom for mobile */}
            {isMobile && (
              <div style={{ marginTop: 24 }}>
                {this.renderSidebar()}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  prepareDataWhenClickAddToCartOrBookNow(data = { rowData, bookNow: false }) {
    let doSomeThing = function () {
      let askPerOrderList = [];
      let askPerUserList = [];
      if (this.props.initPropsData.data.settingFields) {
        for (
          let i = 0;
          i < this.props.initPropsData.data.settingFields.length;
          i++
        ) {
          const element = this.props.initPropsData.data.settingFields[i];
          if (
            element.displayFor ===
            LanguageIdMap.PRODUCT_SUPPLIER_INFO_DISPLAY_FOR.DISPLAY_FOR_ORDER
              .value
          ) {
            askPerOrderList.push(element);
          } else if (
            element.displayFor ===
            LanguageIdMap.PRODUCT_SUPPLIER_INFO_DISPLAY_FOR.DISPLAY_FOR_USER
              .value
          ) {
            askPerUserList.push(element);
          }
        }
      }
      let userDataList = [];
      if (
        data.rowData.schedulePrice.schedulePriceType ===
        LanguageIdMap.SCHEDULE_PRICE_TYPE_LIST.BY_PERSON.value
      ) {
        for (
          let j = 0;
          j < data.rowData.schedulePrice.schedulePriceItems.length;
          j++
        ) {
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
                    ...(rowData.dataFields
                      ? { dataFields: rowData.dataFields }
                      : {}),
                  };
                }),
              });
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
            ...(rowData.dataFields ? { dataFields: rowData.dataFields } : {}),
          };
        }),
        user: userDataList,
      };
      common.scheduleForSupplierProductInfo = data.rowData;
      this.props.initPropsData.data.productRelative =
        this.props.initPropsData.productRelative;

      common.productForSupplierProductInfo = this.props.initPropsData.data;
      common.productForSupplierProductInfo.name =
        this.props.initPropsData.data.productName;
      common.productForSupplierProductInfo.alias =
        this.props.initPropsData.alias;

      common.productForSupplierProductInfo._bookTime =
        (data.rowData.schedulePrice.time
          ? data.rowData.schedulePrice.time.hour +
            ":" +
            data.rowData.schedulePrice.time.minute
          : "") +
        common.changeTimeStampToHumanTime(
          new Date(data.rowData.schedulePrice.date),
          undefined,
          "standardDate"
        );

      if (
        this.props.initPropsData.data.settingFields &&
        this.props.initPropsData.data.settingFields.length > 0
      ) {
        Router.push(
          config.shortUrl.supplierProductInfo,
          config.shortUrl.supplierProductInfo +
            "/" +
            this.props.initPropsData.alias +
            (data.bookNow ? "?booknow=true" : "")
        );
      } else {
        if (this.loadingCountdown === 0) {
          if (data.bookNow) {
            common.booknowData = common.prepareDataBeforeAddToCardOrBooking(
              common.scheduleDataForSupplierProductInfo
            );
            common.booknowData.orderOrderProduct[0].scheduleData = JSON.parse(
              common.booknowData.orderOrderProduct[0].scheduleData
            );
            common.booknowData.orderOrderProduct[0].ext = JSON.parse(
              common.booknowData.orderOrderProduct[0].ext
            );

            window.localStorage.setItem(
              "paynowData",
              JSON.stringify(common.booknowData)
            );

            Router.push(config.shortUrl.pay);
          } else {
            common.addToCart(this);
          }
        }
      }
    }.bind(this);

    if (!common.checkLoginUser()) {
      common.more.needCallbackWhenLogin = doSomeThing.bind(this);
      this.setState({ loginModalPopup: true });
    } else {
      doSomeThing();
    }
  }
}

export default Display;

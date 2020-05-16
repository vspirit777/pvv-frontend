

import React, { PropTypes, Component } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
// import  DateRangePickerWrapper  from '../../components/date/src/DateRangePickerWrapper';
//import { DateRangePicker } from 'react-dates';
import common from '../../data/common';
import { api, config } from '../../config';
import LanguageIdMap from '../../language/LanguageIdMap'
import Language from '../../language/Language'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import ReactLoading from 'react-loading';
import HoverOpenDropdownMenu from '../../components/HoverOpenDropdownMenu'
import SuperComponent, { CustomDateInput } from '../../components/SuperComponent';
import Dialog from 'material-ui/Dialog';
import { Stepper, Step, StepLabel } from 'material-ui';
import Router from 'next/router'

class Display extends SuperComponent {
  constructor(props, context) {
    super(props, context);
    this.state.focusName = common.location.pathArr[2];
    if (common.checkCallFromBrowser() && !common.checkLoginUser()) {
      // history.push(config.domain + config.shortUrl.home)
      this.state.loginModalPopup = true;
    }
  }
  cancelLoginCallback() {
    Router.push(config.shortUrl.home)
  }

  checkAndLoadData() {
    // console.log("checkAndLoadData Display")
    if (super.checkAndLoadData() === false) {
      return false;
    }
    this.state.focusName = common.location.pathArr[2]

    // console.log(common.location)
    for (let key in config.shortUrl.profileChild) {
      if (config.shortUrl.profileChild[key].url === this.state.focusName) {
        this.state.focusNameId = config.shortUrl.profileChild[key].id;
        break;
      }
    }

    this.props.initPropsData.seoTitle = Language.getLanguage(this.state.focusNameId);
    this.props.initPropsData.seoDescription = Language.getLanguage(this.state.focusNameId);

    this.forceUpdate();
    return true;
  }
  renderData() {
    // console.log("render data")
    if (!common.checkLoginUser()) {
      return <div />;
    }
    if (common.userProfileData && !this.hasUpdateDataFromServer) {
      this.hasUpdateDataFromServer = true;
      this.state.extPhone = common.userProfileData.extPhone ? common.userProfileData.extPhone : "";
      this.state.address = common.userProfileData.address ? common.userProfileData.address : "";
      this.state.gender = common.userProfileData.gender ? common.userProfileData.gender : "";
      this.state.firstName = common.userProfileData.firstName ? common.userProfileData.firstName : "";
      this.state.lastName = common.userProfileData.lastName ? common.userProfileData.lastName : "";
      this.state.email = common.userProfileData.email ? common.userProfileData.email : "";
      if (common.userProfileData.dob !== undefined) {
        this.state.dob = common.userProfileData.dob * 1000;
      } else {
        this.state.dob = "";
      }
    }

    return <div style={{ backgroundColor: "#f5f5f5" }}>
      <div style={{ paddingTop: 30, paddingBottom: 30 }}>
        <div style={{ ...config.pageSmallWidthStyle, }}>
          <div style={{ display: "flex", backgroundColor: "#fff", border: "1px solid #d1d1d1" }}>
            {Math.round(common.getViewportWidth()) >= config.sizeConfig.widthSm && <div
              style={{
                borderRight: "1px solid #d8d8d8", paddingTop: 10
                , paddingBottom: "100%", backgroundColor: "#fafafa",
                color: "#9e9e9e"
              }}
            >
              {common.checkLoginUser() && <div>
                {common.userProfileData && <div style={{
                  // paddingTop: 40, 
                  paddingBottom: 40, textAlign: "center", borderBottom: "1px solid #e0e0e0", color: "#000"
                }}>
                  {/* <img src={common.userProfileData.avatar} style={{ marginBottom: 20, width: 104 }} /> */}
                  <h3>{common.userProfileData.displayName} </h3>
                  <div>
                    <a href={config.domain + config.shortUrl.profile + "/" + config.shortUrl.profileChild.SETTING.url}
                      onClick={e => {
                        e.preventDefault();
                        Router.push(config.shortUrl.profile, config.shortUrl.profile + "/" + config.shortUrl.profileChild.SETTING.url)
                        common.needReload = true;
                        this.checkAndLoadData()
                      }}
                    >
                      {Language.getLanguage(LanguageIdMap.btnEdit)}
                    </a>
                  </div>
                </div>}
                {common.userBalance
                  && <div style={{
                    height: 74, display: "flex", justifyContent: "center", alignItems: "center",
                    borderBottom: "1px solid #e0e0e0", color: "#000"
                  }}>
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: 4, lineHeight: 1.2, fontSize: 20, textAlign: "center" }}>
                        {common.numberWithCommas(common.userBalance.credit)}
                      </p>
                      <p style={{ fontSize: 14, textAlign: "center" }}>Tiền thưởng du lịch</p>
                    </div>
                  </div>}
              </div>}

              {Object.keys(config.shortUrl.profileChild).map((rowData, index) => {
                return <div
                  className="hoverWhiteBackground"
                  style={{
                    cursor: "pointer", width: 273,
                    height: 40, lineHeight: "40px", paddingLeft: 12, fontSize: 16,
                    ...(config.shortUrl.profileChild[rowData].url === this.state.focusName
                      ? { borderLeft: "5px solid " + config.colorConfig.main, color: config.colorConfig.main }
                      : { borderLeft: "5px solid transparent" })
                  }}
                  onClick={e => {
                    e.preventDefault();
                    common.needReload = true;
                    Router.push(config.shortUrl.profile, config.shortUrl.profile + "/" + config.shortUrl.profileChild[rowData].url)
                    this.checkAndLoadData()
                  }}
                >
                  {Language.getLanguage(config.shortUrl.profileChild[rowData].id)}
                </div>
              })}
            </div>}
            <div style={{ paddingLeft: 36, paddingRight: 36, width: "100%" }}>
              <h1 style={{
                padding: "20px 0", borderBottom: "1px solid #d8d8d8", marginBottom: 20, color: config.colorConfig.main
              }}>
                {Language.getLanguage(this.state.focusNameId)}
              </h1>



              {this.state.focusName === config.shortUrl.profileChild.MYACCOUNT.url && <div>
                <form role="form" onSubmit={(e) => {
                  e.preventDefault();
                  if (this.loadingCountdown > 0 || !common.userProfileData) {
                    return;
                  }
                  this.loadingCountdown++;
                  this.loadingForAction = "save";
                  common.fetcher(
                    config.api.hostType.profile_url,
                    config.api.hostEndPoint.profileUpdate,
                    "post",
                    undefined,
                    {
                      id: window.localStorage.getItem("uid"),
                      firstName: this.state.firstName,
                      lastName: this.state.lastName,
                      address: this.state.address,
                      gender: this.state.gender,
                      ...(this.state.dob ? { dob: this.state.dob / 1000 } : {}),
                      extPhone: this.state.extPhone,
                    },
                    { typeFormUrlencoded: true }
                  )
                    .then((jsonRes) => {
                      this.loadingCountdown--;
                      common.userProfileData = undefined;
                      common.headerComponent.updateUserProfile(true);
                      this.setState({
                        alertSnackBar: Language.getLanguage(LanguageIdMap.msg_update_success),
                      })
                    })
                    .catch((err) => {
                      console.log("error pro3:" + err)
                      this.loadingCountdown--
                      this.forceUpdate();
                    })
                  this.forceUpdate();
                }}>

                  <div>
                    <TextField
                      style={{ maxWidth: 400, width: "100%" }}
                      floatingLabelText={Language.getLanguage(LanguageIdMap.txtFirstName)}
                      floatingLabelStyle={{ textAlign: "center", width: "100%", }}
                      floatingLabelShrinkStyle={{ marginLeft: "12.5%" }}
                      inputStyle={{
                        textAlign: "center", color: config.colorConfig.darkGrey,
                        ...config.fontStyle.h1,
                      }}
                      value={this.state.firstName}
                      onChange={(e, newValue) => this.setState({ firstName: newValue })}
                    />
                  </div>

                  <div>
                    <TextField
                      style={{ maxWidth: 400, width: "100%" }}
                      floatingLabelText={Language.getLanguage(LanguageIdMap.txtLastName)}
                      floatingLabelStyle={{ textAlign: "center", width: "100%", }}
                      floatingLabelShrinkStyle={{ marginLeft: "12.5%" }}
                      inputStyle={{
                        textAlign: "center", color: config.colorConfig.darkGrey,
                        ...config.fontStyle.h1,
                      }}
                      value={this.state.lastName}
                      onChange={(e, newValue) => this.setState({ lastName: newValue })}
                    />
                  </div>

                  <div>
                    <TextField
                      style={{ maxWidth: 400, width: "100%" }}
                      floatingLabelText={Language.getLanguage(LanguageIdMap.txtPhone)}
                      floatingLabelStyle={{ textAlign: "center", width: "100%", }}
                      floatingLabelShrinkStyle={{ marginLeft: "12.5%" }}
                      inputStyle={{
                        textAlign: "center", color: config.colorConfig.darkGrey,
                        ...config.fontStyle.h1,
                      }}
                      value={this.state.extPhone}
                      onChange={(e, newValue) => this.setState({ extPhone: newValue })}
                    />
                  </div>

                  <div>
                    <TextField
                      style={{ maxWidth: 400, width: "100%" }}
                      floatingLabelText={Language.getLanguage(LanguageIdMap.EMAIL_ADDRESS)}
                      floatingLabelStyle={{ textAlign: "center", width: "100%", }}
                      floatingLabelShrinkStyle={{ marginLeft: "12.5%" }}
                      inputStyle={{
                        textAlign: "center", color: config.colorConfig.darkGrey,
                        ...config.fontStyle.h1,
                      }}
                      disabled={true}
                      value={this.state.email}
                    />
                  </div>

                  {common.renderDatePicker({
                    label: Language.getLanguage(LanguageIdMap.txtDob), value: this.state.dob
                    , onChangeValue: function (v) { this.state.dob = v; this.forceUpdate() }.bind(this)
                    , style: { maxWidth: 400, width: "100%", textAlign: "center" }
                    , inputStyle: { color: config.colorConfig.darkGrey, ...config.fontStyle.h1 }
                    , className: "materialUIDatePickerCenter"
                    , floatingLabelStyle: this.state.dob ? {} : { marginLeft: 0 }
                  })}
                  <div style={{
                    ...config.fontStyle.h3, opacity: 0.3, marginTop: 12,
                    maxWidth: 400, width: "100%", textAlign: "center"
                  }}>
                    {Language.getLanguage(LanguageIdMap.txtSex)}
                  </div>
                  <div style={{ maxWidth: 400, width: "100%", textAlign: "center" }}>
                    <IconMenu
                      // style={{ width: "100%" }}
                      iconButtonElement={<div
                        style={{
                          height: 40,
                          color: config.colorConfig.darkGrey,
                          ...config.fontStyle.h1,
                          cursor: "pointer",
                          position: "relative"
                        }}>
                        {Language.getLanguage(config.getLanguageIdMapFromGenderNumber(this.state.gender))}
                      </div>}
                      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                      targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                    >
                      {config.genderStatusList.map((itemDropDown, indexDropDown) => {
                        return <MenuItem onClick={e => {
                          this.setState({
                            gender: itemDropDown
                          })
                        }}>
                          {Language.getLanguage(config.getLanguageIdMapFromGenderNumber(itemDropDown))}
                        </MenuItem>
                      })}
                    </IconMenu>
                  </div>
                  <div style={{ maxWidth: 400, width: "100%", textAlign: "center" }}>
                    <RaisedButton
                      buttonStyle={{ ...config.buttonStyle[0] }}
                      style={{
                        height: 48, marginBottom: 12,
                        width: 150, margin: 8, marginLeft: 0,
                        fontWeight: "bold",
                        outline: "none",
                        opacity: this.loadingCountdown > 0 ? 0.3 : 1,
                      }}
                      type="submit"
                    >{Language.getLanguage(LanguageIdMap.btnSave)}
                      {this.loadingCountdown > 0 && this.loadingForAction === "save" &&
                        <ReactLoading type="bubbles"
                          style={{ margin: "auto", marginTop: -54, width: 60, height: 20, fill: "#fff" }} />}
                    </RaisedButton>
                  </div>
                </form>
              </div>}

              {this.state.focusName === config.shortUrl.profileChild.BOOKING.url && <div>
                {this.doSomeThing(function () {
                  if (!this.state.manageBooking) {
                    this.state.manageBooking = [];
                  } else {
                    return;
                  }
                  this.loadingCountdown++;
                  common.fetcher(
                    config.api.hostType.product_url,
                    config.api.hostEndPoint.manageBooking,
                    "get",
                    { offset: 0, size: 1000 }
                  )
                    .then((jsonRes) => {
                      this.loadingCountdown--;
                      if (jsonRes.data) {
                        for (let i = 0; i < jsonRes.data.length; i++) {
                          if (jsonRes.data[i].orderOrderProduct) {
                            for (let j = 0; j < jsonRes.data[i].orderOrderProduct.length; j++) {

                              if (jsonRes.data[i].orderOrderProduct[j].ext) {
                                jsonRes.data[i].orderOrderProduct[j].ext = JSON.parse(jsonRes.data[i].orderOrderProduct[j].ext)
                              }

                              if (jsonRes.data[i].orderOrderProduct[j].scheduleData) {
                                jsonRes.data[i].orderOrderProduct[j].scheduleData = JSON.parse(jsonRes.data[i].orderOrderProduct[j].scheduleData)
                                if (jsonRes.data[i].orderOrderProduct[j].scheduleData.date) {
                                  let bookingTime = new Date(jsonRes.data[i].orderOrderProduct[j].scheduleData.date)
                                  jsonRes.data[i].orderOrderProduct[j]._participationDate
                                    = common.changeTimeStampToHumanTime(bookingTime, undefined, "standardDate")
                                  let time = jsonRes.data[i].orderOrderProduct[j].scheduleData.time;
                                  if (time) {
                                    jsonRes.data[i].orderOrderProduct[j]._participationDate =
                                      time.hour + ":" + time.minute + " " + jsonRes.data[i].orderOrderProduct[j]._participationDate
                                  }
                                }
                              }
                            }
                          }
                        }
                      }

                      this.setState({
                        manageBooking: jsonRes.data
                      })
                    })
                    .catch((err) => {
                      this.loadingCountdown--;
                      this.forceUpdate();
                      console.log("error get booking:" + err)
                    })
                }.bind(this))}
                {this.state.manageBookingDetailDialog && <Dialog
                  contentStyle={{ width: "95%", maxWidth: 1200 }}
                  bodyStyle={{ overflowY: "auto", padding: 0 }}
                  modal={false}
                  open={true}
                  onRequestClose={() => { this.setState({ manageBookingDetailDialog: undefined }) }}
                >
                  <div >
                    <div style={{
                      padding: 32, marginBottom: 32, display: "flex", justifyContent: "space-between",
                      borderBottom: "1px solid #eee"
                    }}>
                      <div>
                        <div style={{ fontWeight: "bold" }}>
                          {Language.getLanguage(LanguageIdMap.BOOKING_CODE) + ": "
                            + this.state.manageBookingDetailDialog.orderId}
                        </div>
                        <div>
                          {Language.getLanguage(LanguageIdMap.BOOKING_DATE) + ": "
                            + common.changeTimeStampToHumanTime(this.state.manageBookingDetailDialog.createTime,
                              undefined, "standard")}
                        </div>
                      </div>
                      <div>
                        {Language.getLanguage(LanguageIdMap.TOTAL_PRICE) + ": "}
                        <div style={{ fontWeight: "bold", display: "inline-block", color: config.colorConfig.main }}>
                          {Language.getLanguage(common.moneyType) + " "
                            + common.numberWithCommas(this.state.manageBookingDetailDialog.cost)}
                        </div>
                      </div>
                    </div>
                    <div className="step-indicator">
                      <li className="active">
                        <div className="step"><i className="fa fa-check" /></div>
                        <div style={{ padding: "11px 16px" }}>
                          <div>{Language.getLanguage(LanguageIdMap.ORDER_PLACED)}</div>
                          <div style={{ color: config.colorConfig.darkGrey }}>
                            {common.changeTimeStampToHumanTime(this.state.manageBookingDetailDialog.createTime)}
                          </div>
                        </div>
                      </li>
                      <li className={this.state.manageBookingDetailDialog.paymentTime ? "active" : ""}>
                        <div className="step">{this.state.manageBookingDetailDialog.paymentTime
                          && <i className="fa fa-check" />}</div>
                        <div style={{ padding: "11px 16px" }}>
                          <div>{Language.getLanguage(LanguageIdMap.PAYMENT_SUCCESSFUL)}</div>
                          {this.state.manageBookingDetailDialog.paymentTime
                            && <div style={{ color: config.colorConfig.darkGrey }}>
                              {common.changeTimeStampToHumanTime(this.state.manageBookingDetailDialog.paymentTime)}
                            </div>}
                        </div>
                      </li>
                      <li className={this.state.manageBookingDetailDialog.confirmTime ? "active" : ""}>
                        <div className="step">{this.state.manageBookingDetailDialog.confirmTime
                          && <i className="fa fa-check" />}</div>
                        <div style={{ padding: "11px 16px" }}>
                          <div>{Language.getLanguage(LanguageIdMap.ORDER_CONFIRMED)}</div>
                          {this.state.manageBookingDetailDialog.confirmTime
                            && <div style={{ color: config.colorConfig.darkGrey }}>
                              {common.changeTimeStampToHumanTime(this.state.manageBookingDetailDialog.confirmTime)}
                            </div>}
                        </div>
                      </li>
                      <li className={this.state.manageBookingDetailDialog.startActivity ? "active" : ""}>
                        <div className="step">{this.state.manageBookingDetailDialog.startActivity
                          && <i className="fa fa-check" />}</div>
                        <div style={{ padding: "11px 16px" }}>
                          <div>{Language.getLanguage(LanguageIdMap.START_ACTIVITY)}</div>
                        </div>
                      </li>
                    </div>
                    <div style={{ marginTop: 48, padding: 32 }}>
                      <div style={{ marginBottom: 20, fontSize: 18, fontWeight: "bold" }}>
                        {Language.getLanguage(LanguageIdMap.BOOKING_DETAILS)}
                      </div>
                      {this.state.manageBookingDetailDialog.orderOrderProduct
                        && this.state.manageBookingDetailDialog.orderOrderProduct.map((rowData, index) =>
                          <div style={{ border: "1px solid " + config.colorConfig.darkGrey, marginBottom: 24 }}>
                            <div style={{
                              padding: 24, backgroundColor: "#F1F5FA",
                              display: "flex", justifyContent: "space-between"
                            }}>
                              <div>
                                <div style={{ fontSize: 18, fontWeight: "bold" }}>{rowData.name}</div>
                                {rowData.scheduleData && rowData.scheduleData.date
                                  && <div style={{}}>{Language.getLanguage(LanguageIdMap.PARTICIPATION_DATE) + ": " + rowData._participationDate
                                    + " (" + Language.getLanguage(LanguageIdMap.LOCAL_TIME) + ")"}</div>}
                              </div>
                              <div>

                                <Stepper activeStep={rowData.startActivity ? 1 : 0} orientation="vertical">
                                  <Step>
                                    <StepLabel style={{ height: 32 }}>
                                      {Language.getLanguage(LanguageIdMap.ACTIVITY_BOOKED)}
                                    </StepLabel>
                                  </Step>
                                  <Step>
                                    <StepLabel style={{ height: 32 }}>
                                      {Language.getLanguage(LanguageIdMap.START_ACTIVITY)}
                                    </StepLabel>
                                  </Step>
                                </Stepper>
                              </div>
                            </div>

                            <div style={{
                              display: "flex", justifyContent: "space-between",
                              borderTop: "1px solid " + config.colorConfig.darkGrey, padding: 24,
                            }}>
                              <div style={{
                                display: "flex", flexWrap: "wrap"
                              }}>
                                <img src={rowData.thumbUrl} style={{ height: 100 }} />
                                <div style={{ marginLeft: 24, marginRight: 24, }}>
                                  {Language.getLanguage(LanguageIdMap.PACKAGE_NAME)}
                                </div>
                                <div style={{}}>
                                  <div style={{ fontWeight: "bold" }}>{rowData.scheduleName}</div>
                                  <div>
                                    {rowData.scheduleData && rowData.scheduleData.schedulePriceItems
                                      && rowData.scheduleData.schedulePriceItems.map((rowData1, rowIndex1) => {
                                        return <div style={{ width: 350, maxWidth: "100%", display: "flex", justifyContent: "space-between" }}>
                                          <div>
                                            {rowData1.noOfItem + " x "}
                                            {(rowData.scheduleData.schedulePriceType === LanguageIdMap.SCHEDULE_PRICE_TYPE_LIST.BY_PERSON.value
                                              && common.schedulePriceItemTypeMap)
                                              ? common.schedulePriceItemTypeMap[rowData1.schedulePriceItemType]
                                              + (rowData1.label ? " (" + rowData1.label + ")" : "")
                                              : rowData1.label}
                                          </div>
                                          <div>
                                            {Language.getLanguage(common.moneyType) + " " + common.numberWithCommas(rowData1.total)}
                                          </div>
                                        </div>
                                      })}
                                  </div>
                                </div>
                              </div>
                              <div>
                                {rowData.fileUrl && <RaisedButton
                                  buttonStyle={{ ...config.buttonStyle[1], height: 33, minWidth: 150 }}
                                  style={{
                                    marginBottom: 12,
                                    display: "inline-block", margin: 0, marginRight: 20,
                                    fontWeight: "bold",
                                    outline: "none",
                                  }}
                                  onClick={e => {
                                    window.open(rowData1.fileUrl, '_blank');
                                  }}
                                >{Language.getLanguage(LanguageIdMap.GET_VOUCHER)}</RaisedButton>}
                              </div>

                            </div>

                          </div>)}
                    </div>
                  </div>
                </Dialog>}
                {this.state.manageBooking && this.state.manageBooking.map((rowData, rowIndex) =>
                  <div style={{ marginBottom: 12, border: "1px solid #eee" }}>
                    <div style={{ padding: 24, backgroundColor: "#F1F5FA" }}>
                      <div>
                        <div style={{ display: "inline-block" }}>
                          {Language.getLanguage(LanguageIdMap.BOOKING_CODE) + ": " + rowData.orderId}
                        </div>
                        <div style={{ display: "inline-block", marginLeft: 24 }}>
                          {Language.getLanguage(LanguageIdMap.BOOKING_DATE) + ": "
                            + common.changeTimeStampToHumanTime(rowData.createTime, undefined, "standardDate")}
                        </div>
                        <div style={{
                          float: "right", marginLeft: 48, fontWeight: "bold"
                          , ...(rowData.status === 1 ? { color: "#83C87F" } : { color: "#F74A0C" })
                        }}>
                          {Language.getLanguage(rowData.status === 1 ? LanguageIdMap.PAID : LanguageIdMap.UNPAID)}
                        </div>
                      </div>
                      <div style={{ marginTop: 8 }}>
                        <a style={{ float: "right", cursor: "pointer" }}
                          onClick={e => {
                            this.setState({
                              manageBookingDetailDialog: rowData,
                            })
                          }}
                        >
                          {Language.getLanguage(LanguageIdMap.VIEWMORE)}
                          <i className="fa fa-chevron-right" style={{ marginLeft: 4 }}></i>
                        </a>
                        <div>
                          {Language.getLanguage(LanguageIdMap.TOTAL_PRICE) + ": "}
                          <div style={{ fontWeight: "bold", display: "inline-block" }}>
                            {Language.getLanguage(common.moneyType) + " " + common.numberWithCommas(rowData.cost)}
                          </div>
                        </div>
                      </div>
                    </div>
                    {rowData.orderOrderProduct && rowData.orderOrderProduct.map((rowData1, rowIndex1) =>
                      <div style={{ padding: 24, paddingRight: 0, borderBottom: "1px solid #eee" }}>
                        <a style={{ float: "left", cursor: "pointer", marginRight: 24, }}
                          href={config.domain + config.shortUrl.product + "/" + rowData1.alias}
                          onClick={e => {
                            e.preventDefault();
                            Router.push(config.shortUrl.product, config.shortUrl.product + "/" + rowData1.alias)
                          }}
                        >
                          <img style={{ height: 70, }} src={rowData1.thumbUrl} />
                        </a>
                        <div style={{ float: "right", textAlign: "right" }}>
                          {rowData1.status !== LanguageIdMap.ORDER_STATUS.NORMAL.value
                            && <div style={{ marginBottom: 8, color: "#f00", marginRight: 24 }}>
                              {Language.getLanguage(LanguageIdMap.getIdByValue({
                                object: LanguageIdMap.ORDER_STATUS,
                                value: rowData1.status
                              }))}
                            </div>}
                          {rowData1.fileUrl && <div style={{ marginBottom: 8 }}>
                            <RaisedButton
                              buttonStyle={{ ...config.buttonStyle[1], height: 33, minWidth: 150 }}
                              style={{
                                marginBottom: 12,
                                display: "inline-block", margin: 0, marginRight: 20,
                                fontWeight: "bold",
                                outline: "none",
                              }}
                              onClick={e => {
                                window.open(rowData1.fileUrl, '_blank');
                              }}
                            >{Language.getLanguage(LanguageIdMap.GET_VOUCHER)}</RaisedButton>
                          </div>}
                          {rowData1.status === LanguageIdMap.ORDER_STATUS.NORMAL.value && <div style={{ marginBottom: 8 }}>
                            <RaisedButton
                              buttonStyle={{ ...config.buttonStyle[1], height: 33, minWidth: 150 }}
                              style={{
                                marginBottom: 12,
                                display: "inline-block", margin: 0, marginRight: 20,
                                fontWeight: "bold",
                                outline: "none",
                              }}
                              onClick={e => {
                                this.setState({
                                  alertModalPopup: {
                                    descAlertModal: <div style={{ fontSize: 24 }}>{Language.getLanguage(LanguageIdMap.CANCEL_CONFIRM_NO_NAME)}</div>,
                                    alertModalPopupButtonNameClickCallback: [
                                      {
                                        name: Language.getLanguage(LanguageIdMap.CONFIRM), style: config.buttonStyle[0], callback: function () {
                                          if (this.loadingCountdown > 0) {
                                            return;
                                          }
                                          this.loadingCountdown++;

                                          common.fetcher(
                                            config.api.hostType.product_url,
                                            config.api.hostEndPoint.cancelOrderOfBooking,
                                            "post",
                                            {
                                              orderId: rowData.orderId,
                                            },
                                            {
                                              orderOrderProduct: rowData.orderOrderProduct.map((r, i) => {
                                                if (i === rowIndex1) {
                                                  return { productId: r.productId, status: LanguageIdMap.ORDER_STATUS.REQUEST_CANCEL.value }
                                                } else {
                                                  return { productId: r.productId, status: r.status }
                                                }
                                              })
                                            }
                                          )
                                            .then((jsonRes) => {
                                              this.loadingCountdown--;
                                              delete this.state.manageBooking;
                                              this.setState({
                                                alertSnackBar: Language.getLanguage(LanguageIdMap.msg_update_success),
                                              })
                                            })
                                            .catch((err) => {
                                              this.loadingCountdown--;
                                              this.forceUpdate();
                                              console.log("error pro3:" + err)
                                            })
                                        }.bind(this)
                                      },
                                      {
                                        name: Language.getLanguage(LanguageIdMap.btnClose), style: config.buttonStyle[1],
                                      }]
                                  }
                                })
                              }}
                            >{Language.getLanguage(LanguageIdMap.btnCancel)}</RaisedButton>
                          </div>}
                        </div>
                        <div>
                          <div style={{ fontWeight: "bold" }}>{rowData1.name}</div>
                          <div>
                            {Language.getLanguage(LanguageIdMap.PARTICIPATION_DATE) + ": " + rowData1._participationDate + " "}
                            ({Language.getLanguage(LanguageIdMap.LOCAL_TIME)})
                          </div>
                          <div>
                            {Language.getLanguage(LanguageIdMap.PACKAGE_NAME) + ": " + rowData1.scheduleName}
                          </div>
                          <div style={{ clear: "both" }} />
                        </div>
                      </div>)}
                  </div>)}
              </div>}

              {this.state.focusName === config.shortUrl.profileChild.WISHLIST.url && <div>
                {this.doSomeThing(function () {
                  if (!this.state.wishlist) {
                    this.state.wishlist = {};
                  } else {
                    return;
                  }
                  this.loadingCountdown++;
                  common.fetcher(
                    config.api.hostType.product_url,
                    config.api.hostEndPoint.wishlist,
                    "get",
                    { offset: 0, size: 1000 }
                  )
                    .then((jsonRes) => {
                      this.loadingCountdown--;
                      this.setState({
                        wishlist: {
                          _configMaxCardDisplayOfRow: 3,
                          data: jsonRes.data
                        }
                      })
                    })
                    .catch((err) => {
                      this.loadingCountdown--;
                      console.log("error pro3:" + err)
                    })
                }.bind(this))}
                {this.state.wishlist && this.state.wishlist.data && this.renderOneRow(this.state.wishlist, {
                  canWrapRow: true,
                  cardRender: function (data) {
                    return <a style={{ color: "inherit", cursor: "pointer" }} href={config.domain + config.shortUrl.product + "/" + data.alias}
                      onClick={e => {
                        e.preventDefault();
                        Router.push(config.shortUrl.product, config.shortUrl.product + "/" + data.alias)
                      }}
                    >
                      <div style={{ width: "100%", paddingBottom: "100%", backgroundColor: "#ddd", position: "relative" }}>
                        <img
                          alt={data.featureImage ? data.featureImage.altText : undefined}
                          style={{ position: "absolute", width: "100%", height: "100%" }}
                          src={data.featureImage ? data.featureImage.thumbSecondUrl : undefined}
                        />
                      </div>
                      <div style={{ marginTop: 16, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>
                            {data.productName}
                          </Tooltip>}
                        >
                          <a style={{ color: "inherit", fontSize: 16 }}>{data.productName}</a>
                        </OverlayTrigger>
                      </div>
                    </a>
                  }.bind(this)
                })}
              </div>}

              {this.state.focusName === config.shortUrl.profileChild.SETTING.url && <div className='row' style={{ margin: 0 }}>
                <div className='col-sm-6'>
                  <form role="form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (this.state.changePasswordNewPassword !== this.state.changePasswordConfirmPassword) {
                        this.setState({
                          alertModalPopup: {
                            titleAlertModal: Language.getLanguage(LanguageIdMap.notification),
                            descAlertModal: Language.getLanguage(LanguageIdMap.msg_not_match_password),
                          }
                        })
                        return;
                      } else if (!this.state.changePasswordNewPassword) {
                        this.setState({
                          alertModalPopup: {
                            titleAlertModal: Language.getLanguage(LanguageIdMap.notification),
                            descAlertModal: "Vui lòng nhập mật khẩu mới",
                          }
                        })
                        return;
                      }
                      if (this.loadingCountdown > 0) {
                        return;
                      }
                      this.loadingForAction = "changePass"
                      this.loadingCountdown++;

                      common.fetcher(
                        config.api.hostType.auth_url,
                        config.api.hostEndPoint.changePassword,
                        "post",
                        {
                          id: window.localStorage.getItem("uid"),
                        },
                        {
                          oldSecret: this.state.changePasswordOldPassword,
                          newSecret: this.state.changePasswordNewPassword,
                        },
                        { typeFormUrlencoded: true }
                      ).then((data) => {
                        this.loadingCountdown--;
                        this.setState({
                          alertSnackBar: Language.getLanguage(LanguageIdMap.msg_update_success),
                        })
                      }).catch((err) => {
                        this.loadingCountdown--;
                        if (err && err.error
                          && config.getLanguageIdFromApiResponseErrorCode(err.error) == LanguageIdMap.CREDENTIAL_INVALID) {
                          this.setState({ descAlertModal: Language.getLanguage(LanguageIdMap.msg_wrong_password) })
                        } else {
                          this.forceUpdate();
                        }
                      })

                      this.forceUpdate();

                    }}
                  >

                    <div>
                      <TextField
                        type="password"
                        floatingLabelText={Language.getLanguage(LanguageIdMap.txtTransactionOldPassword)}
                        floatingLabelStyle={{ textAlign: "center", width: "100%", }}
                        floatingLabelShrinkStyle={{ marginLeft: "12.5%" }}
                        inputStyle={{
                          textAlign: "center", color: config.colorConfig.darkGrey,
                          ...config.fontStyle.h1,
                        }}
                        value={this.state.changePasswordOldPassword}
                        onChange={(e, newValue) => this.setState({ changePasswordOldPassword: newValue })}
                      />
                    </div>
                    <div>
                      <TextField
                        type="password"
                        floatingLabelText={Language.getLanguage(LanguageIdMap.placeholder_enter_newpassword)}
                        floatingLabelStyle={{ textAlign: "center", width: "100%", }}
                        floatingLabelShrinkStyle={{ marginLeft: "12.5%" }}
                        inputStyle={{
                          textAlign: "center", color: config.colorConfig.darkGrey,
                          ...config.fontStyle.h1,
                        }}
                        value={this.state.changePasswordNewPassword}
                        onChange={(e, newValue) => this.setState({ changePasswordNewPassword: newValue })}
                      />
                    </div>
                    <div>
                      <TextField
                        type="password"
                        floatingLabelText={Language.getLanguage(LanguageIdMap.placeholder_enter_renewpassword)}
                        floatingLabelStyle={{ textAlign: "center", width: "100%", }}
                        floatingLabelShrinkStyle={{ marginLeft: "12.5%" }}
                        inputStyle={{
                          textAlign: "center", color: config.colorConfig.darkGrey,
                          ...config.fontStyle.h1,
                        }}
                        value={this.state.changePasswordConfirmPassword}
                        onChange={(e, newValue) => this.setState({ changePasswordConfirmPassword: newValue })}
                      />
                    </div>
                    <div style={{ width: "100%", maxWidth: 256, textAlign: "center" }}>
                      <RaisedButton
                        buttonStyle={{ ...config.buttonStyle[0], }}
                        style={{
                          height: 48, marginBottom: 12,
                          width: 150, margin: 8, marginLeft: 0,
                          fontWeight: "bold",
                          outline: "none",
                          opacity: this.loadingCountdown > 0 ? 0.3 : 1,
                        }}
                        type="submit"
                      >{Language.getLanguage(LanguageIdMap.btnSave)}
                        {this.loadingCountdown > 0 && this.loadingForAction === "changePass" &&
                          <ReactLoading type="bubbles"
                            style={{ margin: "auto", marginTop: -54, width: 60, height: 20, fill: "#fff" }} />}
                      </RaisedButton>
                    </div>
                  </form>
                </div>
                <div className='col-sm-6'>
                  <div style={{ marginBottom: 12 }}>{Language.getLanguage(LanguageIdMap.language)}</div>
                  <div style={{}}>

                    <HoverOpenDropdownMenu
                      iconButtonElement={
                        <div style={{
                          border: "1px solid #a9a9a9", backgroundColor: config.colorConfig.main, color: "#fff",
                          borderRadius: 5, padding: 10, minWidth: 200, textAlign: "center", cursor: "pointer"
                        }}>{Language.getFullnameLanguage()}</div>
                        // <img
                        //   className="hoverToBorderBelowImg"
                        //   style={{
                        //     width: 30, paddingBottom: Math.round(common.getViewportWidth()) >= 994 ? 12 : 5,
                        //     float: "left", cursor: "pointer",
                        //   }}
                        //   src={Language.getLanguageImage()}
                        // />
                      }
                      data={Language.getLanguageList().map((lang, index) => [
                        index > 0 ? <hr style={{ margin: 0, height: 1, background: "#fff" }} /> : undefined
                        ,
                        <MenuItem
                          style={{ width: "100%", minWidth: 176 }}
                          onClick={(event) => {
                            if (lang != Language.getLanguageName()) {
                              Language.setLanguage(lang);
                              window.location = window.location.href;
                            }
                          }}>
                          <span style={{}}>
                            {/* <img src={Language.getLanguageImage(lang)} style={{ height: 24, marginRight: 8, width: 30 }}
                            /> */}
                            {Language.getFullnameLanguage(lang)}
                          </span>
                        </MenuItem>
                      ]
                      )}
                    />
                  </div>

                </div>
              </div>}

              {this.state.focusName === config.shortUrl.profileChild.INVITE.url
                && <div>
                  <div style={{ backgroundColor: "#f9f9f9", padding: 12 }}>
                    {common.userProfileData //&& !!common.userProfileData.accountCode 
                      && <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                        <div style={{ display: "flex", alignItems: "center", }}>
                          <TextField
                            id="referrerCodeId"
                            style={{ maxWidth: 190, width: "100%", marginBottom: 4, fontSize: 13 }}
                            floatingLabelStyle={{ textAlign: "center", width: "100%", }}
                            floatingLabelShrinkStyle={{ marginLeft: "12.5%" }}
                            inputStyle={{
                              textAlign: "center", color: config.colorConfig.darkGrey,
                            }}
                            value={"https://phuotvivu.com" + config.shortUrl.inviteFriend + "/" + common.userProfileData.accountCode}
                            disabled={this.state._isCopying ? false : true}
                          />
                          <RaisedButton
                            buttonStyle={{ ...config.buttonStyle[0] }}
                            style={{
                              height: 42, marginBottom: 4,
                              width: 120, margin: 8, marginLeft: 0,
                              fontWeight: "bold",
                              outline: "none",
                              opacity: this.loadingCountdown > 0 ? 0.3 : 1,
                            }}
                            onClick={e => {
                              e.preventDefault();
                              this.setState({
                                _isCopying: true
                              }, function () {
                                var copyText = document.getElementById("referrerCodeId");
                                copyText.select();
                                document.execCommand("copy");
                                this.setState({
                                  _isCopying: undefined,
                                  _copied: true,
                                })
                                setTimeout(function () {
                                  this.setState({
                                    _copied: false,
                                  })
                                }.bind(this), 1000);
                              }.bind(this))
                            }}
                          >{Language.getLanguage(this.state._copied ? LanguageIdMap.coppied : LanguageIdMap.COPY_LINK)}
                          </RaisedButton>
                        </div>

                        {common.userProfileData && <div>
                          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", textAlign: "right", justifyContent: "flex-end" }}>
                            <div style={{ color: "#888", marginBottom: 4 }}>Chia sẻ</div>
                            <RaisedButton
                              buttonStyle={{ ...config.buttonStyle[0], backgroundColor: "#39579a", }}
                              style={{
                                height: 42, marginBottom: 4,
                                width: 105, marginLeft: 12,
                                fontWeight: "bold",
                                outline: "none", color: "#fff",
                              }}
                              onClick={e => {
                                e.preventDefault();
                                let url = "https://www.facebook.com/dialog/feed?app_id="
                                  + config.facebookAppId + "&display=popup"
                                  + "&link=https://phuotvivu.com" + config.shortUrl.inviteFriend
                                  + "/" + common.userProfileData.accountCode;
                                // let url=`https://www.facebook.com/v2.3/dialog/feed?app_id=${config.facebookAppId}&caption=An%20example%20caption&channel_url=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2F7LloFuHvA7I.js%3Fversion%3D43%23cb%3Df1a84caa321084%26domain%3Dwww.phuotvivu.com%26origin%3Dhttps%253A%252F%252Fwww.phuotvivu.com%252Ff3c57c0a3532ac%26relation%3Dopener&display=popup&e2e=%7B%7D&link=https://phuotvivu.com${config.shortUrl.inviteFriend}/${common.userProfileData.accountCode}&next=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2F7LloFuHvA7I.js%3Fversion%3D43%23cb%3Df202068a8e807f4%26domain%3Dwww.phuotvivu.com%26origin%3Dhttps%253A%252F%252Fwww.phuotvivu.com%252Ff3c57c0a3532ac%26relation%3Dopener%26frame%3Dfa3a826e03b5a4%26result%3D%2522xxRESULTTOKENxx%2522&sdk=joey&version=v2.3`
                                // console.log(url)
                                window.open(url, '_blank');
                              }}
                            >
                              <i className="fa fa-facebook-official" style={{ marginRight: 8 }} />
                              Facebook
                            </RaisedButton>
                            <RaisedButton
                              buttonStyle={{ ...config.buttonStyle[0], backgroundColor: "#0087ff" }}
                              style={{
                                height: 42, marginBottom: 4,
                                width: 105, marginLeft: 12,
                                fontWeight: "bold",
                                outline: "none", color: "#fff",
                              }}
                              onClick={e => {
                                e.preventDefault();
                                window.open("https://www.facebook.com/dialog/send?app_id="
                                  + config.facebookAppId + "&display=popup&link=https://phuotvivu.com"
                                  + config.shortUrl.inviteFriend + "/" + common.userProfileData.accountCode
                                  + "&redirect_uri=https://phuotvivu.com/", '_blank');
                              }}
                            >
                              <i className="fa fa-commenting" style={{ marginRight: 8 }} />
                              Messenger
                            </RaisedButton>
                            <RaisedButton
                              buttonStyle={{ ...config.buttonStyle[0], backgroundColor: "#0087ff" }}
                              style={{
                                height: 42, marginBottom: 4,
                                width: 105, marginLeft: 12,
                                fontWeight: "bold",
                                outline: "none", color: "#fff",
                              }}
                              onClick={e => {
                                e.preventDefault();
                                window.open("https://twitter.com/intent/tweet?"
                                  + "url=https://phuotvivu.com" + config.shortUrl.inviteFriend + "/" + common.userProfileData.accountCode
                                  + `&text=${common.userProfileData.displayName} mời bạn tham gia Phuotvivu.`
                                  + ` ${common.userProfileData.displayName} tặng bạn 50K để đặt bất kỳ hoạt động du lịch nào trên`
                                  + " https://phuotvivu.com" + config.shortUrl.inviteFriend + "/" + common.userProfileData.accountCode, '_blank');
                              }}
                            >
                              <i className="fa fa-twitter" style={{ marginRight: 8 }} />
                              Twitter
                            </RaisedButton>
                          </div>
                        </div>}
                      </div>}
                    {common.userProfileData && <div style={{ marginTop: 20 }}>
                      <form onSubmit={e => {
                        e.preventDefault();
                        if (this.loadingCountdown > 0 && !this.state.inviteEmail) {
                          return;
                        }
                        this.loadingCountdown++;
                        common.fetcher(
                          config.api.hostType.product_url,
                          config.api.hostEndPoint.sendInviteEmail,
                          "post",
                          undefined,
                          {
                            email: this.state.inviteEmail
                          },
                          { typeFormData: true }
                        )
                          .then((jsonRes) => {
                            this.loadingCountdown--;
                            this.setState({
                              alertSnackBar: Language.getLanguage(LanguageIdMap.msg_update_success),
                            })
                          })
                          .catch((err) => {
                            console.log("error pro3:" + err)
                            this.loadingCountdown--;
                            this.forceUpdate();
                          })
                      }}>
                        <TextField
                          style={{ minWidth: 250, width: "calc(100% - 132px)" }}
                          inputStyle={{
                            color: config.colorConfig.darkGrey,
                          }}
                          value={this.state.inviteEmail}
                          onChange={(e, newValue) => this.setState({ inviteEmail: newValue })}
                          hintText="Nhập địa chỉ email"
                        />
                        <RaisedButton
                          buttonStyle={{ ...config.buttonStyle[0] }}
                          style={{
                            height: 42, marginLeft: 12,
                            width: 120,
                            fontWeight: "bold",
                            outline: "none",
                            opacity: this.loadingCountdown > 0 ? 0.3 : 1,
                          }}
                          type="submit"
                        >{Language.getLanguage(LanguageIdMap.btnSend)}
                        </RaisedButton>
                      </form>
                    </div>}
                  </div>
                  <div style={{ marginTop: 40, textAlign: "center" }}>
                    <h2 >
                      Nhận tiền thưởng du lịch khi mới bạn bè
                    </h2>
                    <h6>
                      Sau người được mời đăng ký tài khoản và hoàn tất 1 hoạt động tour đã đặt trên Phuotvivu, bạn sẽ nhận được 50K tiền thưởng
                    </h6>
                    <h6>
                      <a
                        style={{ color: config.colorConfig.main }}
                        href={config.shortUrl.profile + "/" + config.shortUrl.profileChild.CREDIT.url}
                        onClick={e => {
                          e.preventDefault();
                          common.needReload = true;
                          Router.push(config.shortUrl.profile, config.shortUrl.profile + "/" + config.shortUrl.profileChild.CREDIT.url);
                          this.checkAndLoadData();
                        }}>Tìm hiểu thêm về cách thức hoạt động của tiền thưởng du lịch </a>
                    </h6>
                  </div>

                </div>}

              {this.state.focusName === config.shortUrl.profileChild.CREDIT.url && <div>
                {common.userBalance && <h3
                // style={{fontSize:27,lineHeight:"38px",marginTop:30,marginBottom:20}}
                >
                  Hiện tại bạn đang có:
                  <strong style={{ color: config.colorConfig.main, marginLeft: 8, marginRight: 8 }}>
                    {common.userBalance.credit ? common.userBalance.credit : 0}
                  </strong>
                  tiền thưởng du lịch
                  </h3>}

                <div style={{ marginTop: 20, marginLeft: -24, marginRight: -24 }} className='row'>
                  <div className="col-sm-6 col-xs-12" style={{ padding: 24 }}>
                    <div style={{ border: "1px solid #000", padding: 10 }}>
                      <h3 style={{ textAlign: "center" }}>
                        Nhận tiền thưởng du lịch bằng cách mời bạn bè
                      </h3>
                      <div style={{ textAlign: "center" }}>
                        <RaisedButton
                          buttonStyle={{ ...config.buttonStyle[0] }}
                          style={{
                            height: 38, marginBottom: 12,
                            minWidth: 150, margin: 8, marginLeft: 0,
                            fontWeight: "bold",
                            outline: "none",
                          }}
                          onClick={e => {
                            e.preventDefault();
                            common.needReload = true;
                            Router.push(config.shortUrl.profile, config.shortUrl.profile + "/" + config.shortUrl.profileChild.INVITE.url);
                            this.checkAndLoadData();
                          }}
                        >{Language.getLanguage(LanguageIdMap.URL.PROFILE.INVITE)}
                        </RaisedButton>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-xs-12" style={{ padding: 24 }}>
                    <div style={{ border: "1px solid #000", padding: 10 }}>
                      <h3 style={{ textAlign: "center" }}>
                        Nhận tiền thưởng miễn phí khi hoàn thành 1 tour
                      </h3>
                      <div style={{ textAlign: "center" }}>
                        <RaisedButton
                          buttonStyle={{ ...config.buttonStyle[0] }}
                          style={{
                            height: 38, marginBottom: 12,
                            minWidth: 150, margin: 8, marginLeft: 0,
                            fontWeight: "bold",
                            outline: "none",
                          }}
                          onClick={e => {
                            e.preventDefault();
                            Router.push(config.shortUrl.home);
                          }}
                        >Đi đến trang chủ
                      </RaisedButton>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 20 }}>
                  <div >
                    <p><strong>Làm cách nào để tôi nhận được tiền thưởng du lịch? </strong> </p>
                    <p>Có 2 cách để nhận tiền thưởng du lịch:</p>
                    <ol>
                      <li>Khi bạn hoàn tất tour/hoạt động du lịch trên Phuotvivu, bạn được hoàn tiền 0,5% bằng tiền thưởng du lịch. Tiền thưởng sẽ xuất hiện trong account của bạn trên Phuotvivu 1 ngày sau khi bạn hoàn tất tour.</li>
                      <li>Bạn có thể mời bạn bè qua link có trong tài khoản của bạn ở Phuotvivu (tìm ở mục mời bạn bè). Sau khi đăng ký tài khoản qua link đó họ sẽ nhận được 50K. 1 ngày sau khi họ hoàn tất 1 tour đã đặt trên Phuotvivu, bạn cũng nhận được 50K.</li>
                    </ol>
                    <p>Xin lưu ý, tiền thưởng du lịch chỉ nhận được sau khi hoàn tất một tour, nếu bạn huỷ tour thì sẽ không nhận được.</p>
                    <p><strong>Tiền thưởng du lịch có giá trị sử dụng bao lâu?&nbsp;</strong>  Tiền thưởng du lịch có giá trị đến 24 tháng (2 năm) kể từ lúc nhận được tiền thường.</p>
                    <p><strong>Cách sử dụng tiền thưởng du lịch?&nbsp;</strong> Khi bạn sưu tập tiền thưởng du lịch của Phuotvivu, bạn có thể chọn để trừ tiền vào lần đặt tour kế tiếp với Phuotvivu. Chỉ cần đặt tour vào mục thanh toán và nhấn vào nút “Áp dụng tiền thưởng du lịch.</p>
                  </div>
                </div>
              </div>}




            </div>
          </div>
        </div>
      </div>
    </div>
  }

}


export default Display;


import React, { PropTypes, Component } from 'react';

import { Collapse, OverlayTrigger, Tooltip, FormControl } from 'react-bootstrap';
import $ from "jquery";
import common from '../../data/common';
import { api, config, analytics } from '../../config';
import LanguageIdMap from '../../language/LanguageIdMap'
import Language from '../../language/Language'
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import Drawer from 'material-ui/Drawer';
import { TextField, RadioButton } from 'material-ui';
import SuperComponent from '../../components/SuperComponent';
import Router from 'next/router'
// import TagManager from 'react-gtm-module'

let DISCOUNT_TYPE = {
  DISCOUNT_CODE: 1,
  CREDIT: 2,
}

class Display extends SuperComponent {
  constructor(props, context) {
    super(props, context);

    let paynowLocal = ""
    try {
      window
      paynowLocal = window.localStorage.getItem("paynowData")
    } catch (error) {

    }
    if (common.booknowData) {
      this.payData = common.booknowData;
    } else if (paynowLocal) {
      try {
        this.payData = JSON.parse(window.localStorage.getItem("paynowData"))
      } catch (error) {

      }
    } else if (common.shoppingCart) {
      this.payData = JSON.parse(JSON.stringify(common.shoppingCart));
    }
    this.state.data = {
      titleMrMrs: LanguageIdMap.TITLE_MR_MRS_LIST.MR.value,
    }
    this.state.dynamicData = {}

    this.getPaymentMethodList();
    this.getInstallmentPaymentMethodList();

    this.addShoppingCartCallbackBindThis = this.addShoppingCartCallback.bind(this)
    this.getUserDataCallback();

    this.props.initPropsData.seoTitle = Language.getLanguage(LanguageIdMap.BOOKING_USER_INFORMATION);
    this.props.initPropsData.seoDescription = Language.getLanguage(LanguageIdMap.BOOKING_USER_INFORMATION);

  }
  getUserDataCallback() {
    if (common.userProfileData) {
      this.state.data.firstNamePassport = common.userProfileData.firstName;
      this.state.data.familyNamePassport = common.userProfileData.lastName;
      this.state.data.email = common.userProfileData.email;
      this.state.data.phone = common.userProfileData.extPhone;
      this.forceUpdate();
    }
  }
  addShoppingCartCallback() {
    if (!this.payData) {
      if (!common.shoppingCart || common.shoppingCart.length === 0) {
        Router.push(config.shortUrl.home);
        return;
      }
      this.payData = JSON.parse(JSON.stringify(common.shoppingCart));
      this.getInstallmentPaymentMethodList();
      this.forceUpdate();
    }
  }

  componentWillMount() {
    super.componentWillMount();
    common.addGetShoppingCartCallback(this.addShoppingCartCallbackBindThis)
  }
  componentWillUnmount() {
    super.componentWillUnmount();
    common.removeGetShoppingCartCallback(this.addShoppingCartCallbackBindThis)
  }

  getPaymentMethodList() {
    this.loadingCountdown++;
    common.fetcher(
      config.api.hostType.product_url,
      config.api.hostEndPoint.getPaymentMethodList,
      "get",
    )
      .then((jsonRes) => {
        this.loadingCountdown--;
        this.setState({ paymentMethodList: jsonRes.data })
      })
      .catch((err) => {
        this.loadingCountdown--;
        this.forceUpdate();
        console.log("error getdata1:" + err)
      })
  }
  getInstallmentPaymentMethodList() {
    if (!this.payData || (!this.payData.cost && !this.payData.orderOrderProduct)) {
      return;
    }
    if (!this.payData.cost && this.payData.orderOrderProduct) {
      let total = 0;
      for (let i = 0; i < this.payData.orderOrderProduct.length; i++) {
        total += this.payData.orderOrderProduct[i].cost;
      }
      this.payData.cost = total;
    }
    this.loadingCountdown++;
    common.fetcher(
      config.api.hostType.product_url,
      config.api.hostEndPoint.getInstallmentPaymentMethodList,
      "post",
      undefined,
      {
        totalAmount: this.payData.costAfterUseDiscountCode !== undefined ? this.payData.costAfterUseDiscountCode : this.payData.cost
      },
      {
        typeFormData: true
      }
    )
      .then((jsonRes) => {
        this.loadingCountdown--;
        if (jsonRes.error != 0) {
          this.forceUpdate();
          return;   //no installment
        }
        this.setState({ installmentPaymentMethodList: jsonRes.data })
      })
      .catch((err) => {
        this.loadingCountdown--;
        this.forceUpdate();
        console.log("error getdata2:" + err)
        console.log(err)
      })
  }
  getBookingRequestData() {
    if (!this.payData) {
      return;
    }
    let bookingRequestData = JSON.parse(JSON.stringify(this.payData))
    if (bookingRequestData.orderOrderProduct) {
      for (let i = 0; i < bookingRequestData.orderOrderProduct.length; i++) {
        if (bookingRequestData.orderOrderProduct[i].ext) {
          bookingRequestData.orderOrderProduct[i].ext = JSON.stringify(bookingRequestData.orderOrderProduct[i].ext)
        }
        if (bookingRequestData.orderOrderProduct[i].scheduleData) {
          bookingRequestData.orderOrderProduct[i].scheduleData = JSON.stringify(bookingRequestData.orderOrderProduct[i].scheduleData)
        }
      }
    }
    return bookingRequestData;
  }
  paymentRequest() {
    if (!this.payData || this.loadingCountdown) {
      return;
    }
    let errList = [];
    let data = {
      ...this.state.data,
      ...this.state.dynamicData,
      bookingRequest: this.getBookingRequestData(),
      ...((this.state.couponCode && this.payData.costAfterUseDiscountCode !== undefined) ? { couponCode: this.state.couponCode, } : {}),
    }
    if (!data.firstNamePassport) {
      errList.push(Language.getLanguage(LanguageIdMap.FIRST_NAME_ON_PASSPORT))
    }
    if (!data.familyNamePassport) {
      errList.push(Language.getLanguage(LanguageIdMap.LAST_NAME_ON_PASSPORT))
    }
    if (!data.email) {
      errList.push(Language.getLanguage(LanguageIdMap.EMAIL_ADDRESS))
    }
    if (!data.phone) {
      errList.push(Language.getLanguage(LanguageIdMap.PHONE_NUMBER))
    }
    if (data.purchaseType === 1 && !data.month) {
      errList.push(Language.getLanguage(LanguageIdMap.AMOUNT_BY_MONTH))
    }

    if (this.payData && this.payData.costAfterUseDiscountCode !== 0) {
      if (!data.paymentMethod) {
        errList.push(Language.getLanguage(LanguageIdMap.PAYMENT_METHOD))
      }
      if (!data.bankCode) {
        errList.push(Language.getLanguage(LanguageIdMap.PAYMENT_CART_TYPE))
      }
    }

    if (errList.length > 0) {
      this.setState({
        alertModalPopup: {
          titleAlertModal: Language.getLanguage(LanguageIdMap.msg_title_generic),//Language.getLanguage(LanguageIdMap.notification),
          descAlertModal: Language.getLanguage(LanguageIdMap.NEED_INPUT_DATA, { data: errList.join(", ") }),
        }
      });
      return;
    }

    if(common.getCookie("aff")) {
      data.affiliateCode = common.getCookie("aff");
    }
    // console.log(this.state)
    // console.log(this.payData)
    // if(!common.checkServer()) {
    //   TagManager.initialize({
    //     gtmId:analytics.google.tagManagerId,
    //     dataLayer:{
    //       ecommerce:{
    //         currencyCode:'VND',
    //         Purchase:{
                  // purchase:{
                  //   Revenue:100000,
                  //   coupon:"giamgiacoupon",
                  // },
                  // product:[
                  //     { name: 'abc', price:30000, quantity: 1},
                  //     {name: 'xyz', price:70000, quantity:1}
                  // ]
    //         }
    //       }
    //     }
    //   })
    // }
    // return;

    ga('ec:setAction','checkout', {
      'step': 1,
      'option': data.paymentMethod
    });

    window.localStorage.setItem('paymentData', JSON.stringify(data));

    this.loadingCountdown++;
    common.fetcher(
      config.api.hostType.product_url,
      config.api.hostEndPoint.paymentRequest,
      "post",
      undefined,
      data
    )
      .then((jsonRes) => {
        console.log('paymentRequest');
        if (this.payData && this.payData.costAfterUseDiscountCode !== 0 && this.state.data.paymentMethod === "IB_ONLINE") {
          if (jsonRes.data.orderId) {
            this.payData.orderId = jsonRes.data.orderId;
            var product = this.payData.orderOrderProduct[0];

            ga('ec:setAction','checkout', {
              'step': 2,
              'option': this.payData.orderId
            });

            ga('create', analytics.google.trackingId);
            ga('require', 'ec');

            ga('ec:addProduct', {
              'id': product.productId,
              'name': product.name,
              // 'category': 'Apparel',
              // 'brand': 'Google',
              // 'variant': 'black',
              'price': product.cost,
              'quantity': 1
            });

            // Transaction level information is provided via an actionFieldObject.
            ga('ec:setAction', 'purchase', {
              'id': this.payData.orderId,
              'affiliation': data.affiliateCode || '',
              // 'revenue': '37.39',
              // 'tax': '2.85',
              // 'shipping': '5.34',
              'coupon': data.couponCode || '',    // User added a coupon at checkout.
              'option': data.paymentMethod
            });

            ga('send', 'pageview');     // Send transaction data with initial pageview.
            console.log('Tracking paymentRequest event');
          }
          common.ibOnlineData = this.payData;
          common.ibOnlineBankData = this.state.dynamicData.bankInfomation;
          Router.push(config.shortUrl.ibOnline)
        } else if (jsonRes.data.checkoutUrl) {
          window.location.href = jsonRes.data.checkoutUrl;
        }
      })
      .catch((err) => {
        this.loadingCountdown--;
        this.forceUpdate();
        console.log("error getdata3:" + err)
        console.log(err)
      })
  }

  renderPayList() {
    return <div style={{ marginBottom: 32 }}>
      {this.payData && this.payData.orderOrderProduct && this.payData.orderOrderProduct.map((rowData, rowIndex) => {
        if (rowData.expired) {
          return;
        }
        return <div style={{
          padding: "12px 16px", marginBottom: 10, backgroundColor: "#fff",
          border: "1px solid #e0e0e0"
        }}>
          <div style={{
            borderBottom: "1px solid " + config.colorConfig.grey, fontSize: 16,
            marginBottom: 8, paddingBottom: 8
          }}>
            {rowData.name}
          </div>
          <div style={{ padding: "16px 0" }}>
            <div>
              <div style={{ float: "left", color: config.colorConfig.darkGrey }}>
                {Language.getLanguage(LanguageIdMap.PACKAGE_NAME)}
              </div>
              <div style={{ textAlign: "right" }}>
                <div>{rowData.scheduleData ? rowData.scheduleData.name : ""}
                </div>
              </div>
            </div>
            <div>
              <div style={{ float: "left", color: config.colorConfig.darkGrey }}>
                {Language.getLanguage(LanguageIdMap.DATE)}
              </div>
              <div style={{ textAlign: "right" }}>
                {rowData.scheduleData && <div>
                  {rowData.scheduleData.time ? rowData.scheduleData.time.hour + ":" + rowData.scheduleData.time.minute : ""}
                  {" " + common.changeTimeStampToHumanTime(rowData.scheduleData.date, undefined, "standardDate")}
                </div>}
              </div>
            </div>
            <div>
              <div style={{ float: "left", color: config.colorConfig.darkGrey }}>
                {Language.getLanguage(LanguageIdMap.AMOUNT)}
              </div>
              <div style={{ textAlign: "right" }}>
                {rowData.scheduleData && rowData.scheduleData.schedulePriceItems
                  && rowData.scheduleData.schedulePriceItems.map((rowData1, rowIndex) => {
                    return <div>{rowData1.noOfItem + " x "}
                      {(rowData.scheduleData.schedulePriceType === LanguageIdMap.SCHEDULE_PRICE_TYPE_LIST.BY_PERSON.value
                        && common.schedulePriceItemTypeMap)
                        ? common.schedulePriceItemTypeMap[rowData1.schedulePriceItemType]
                        + (rowData1.label ? " (" + rowData1.label + ")" : "")
                        : rowData1.label}</div>
                  })}
              </div>
            </div>
            <div style={{ marginTop: 16, paddingTop: 8 }}>
              <div style={{ float: "left", color: config.colorConfig.darkGrey }}>
                {Language.getLanguage(LanguageIdMap.subtotal)}
              </div>
              <div style={{ textAlign: "right", fontWeight: "bold" }}>
                {Language.getLanguage(common.moneyType) + " "}
                {common.numberWithCommas(rowData.cost)}
              </div>
            </div>
          </div>
        </div>
      })}

      {this.payData && this.payData.cost > 0 && <div style={{
        padding: 16, paddingTop: 0, backgroundColor: "#fff",
        border: "1px solid #e0e0e0"
      }}>
        <div style={{ marginTop: 8, paddingTop: 8 }}>
          <div style={{ float: "left", color: config.colorConfig.darkGrey }}>
            {Language.getLanguage(LanguageIdMap.subtotal)}
          </div>
          <div style={{
            textAlign: "right", fontWeight: "bold",
          }}>
            {(Language.getLanguage(common.moneyType)) + " "}
            {common.numberWithCommas(this.payData.cost)}
          </div>
        </div>

        {this.payData.costAfterUseDiscountCode !== undefined && <div style={{ marginTop: 16, paddingTop: 8 }}>
          <div style={{ float: "left", color: config.colorConfig.darkGrey }}>
            {Language.getLanguage(LanguageIdMap.DISCOUNT)}
          </div>
          <div style={{ textAlign: "right", fontWeight: "bold" }}>
            {" - " + Language.getLanguage(common.moneyType) + " "}
            {common.numberWithCommas(this.payData.cost - this.payData.costAfterUseDiscountCode)}
          </div>
        </div>}

        <div style={{ marginTop: 16, paddingTop: 8 }}>
          <div style={{ float: "left", color: config.colorConfig.darkGrey }}>
            {Language.getLanguage(LanguageIdMap.TOTAL_PAY)}
          </div>
          <div style={{ textAlign: "right", fontWeight: "bold", color: "#ff6633", fontSize: 18 }}>
            {Language.getLanguage(common.moneyType) + " "}
            {common.numberWithCommas(this.payData.costAfterUseDiscountCode !== undefined ? this.payData.costAfterUseDiscountCode : this.payData.cost)}
          </div>
        </div>
      </div>
      }
    </div>
  }
  previewPayment(data) {
    if (this.loadingCountdown) {
      return;
    }
    this.loadingCountdown++;
    common.fetcher(
      config.api.hostType.product_url,
      config.api.hostEndPoint.paymentReview,
      "post",
      undefined,
      data
    )
      .then((jsonRes) => {
        this.loadingCountdown--;
        console.log(data)
        if (this.payData) {
          this.payData.costAfterUseDiscountCode = jsonRes.data.cost;
        }
        try {
          const reduceCost = Number(this.payData.cost) - Number(this.payData.costAfterUseDiscountCode)
          if(reduceCost > 0) {
            this.setState({
                alertSnackBar: `Bạn đã giảm được ${reduceCost} đồng`
            })
          }
          this.payData.couponCode = data.couponCode;
        } catch (error) {

        }
        delete this.state.installmentPaymentMethodList
        this.getInstallmentPaymentMethodList();
        if (common.checkMobile()) {
          this.setState({ payListSideOpen: true });
          setTimeout(function () {
            this.setState({ payListSideOpen: undefined });
          }.bind(this), 5000);
        }
        this.forceUpdate();
      })
      .catch((err) => {
        this.loadingCountdown--;
        this.forceUpdate();
        console.log("error getdata4:" + err)
        console.log(err)
      })
  }
  updateCurDiscountUsing(newType) {
    if (!this.payData || this.loadingCountdown > 0) {
      return;
    }
    delete this.payData.costAfterUseDiscountCode;

    if (this.state.curDiscountUsing === DISCOUNT_TYPE.DISCOUNT_CODE) {
      this.state.couponCode = "";
    } else if (this.state.curDiscountUsing === DISCOUNT_TYPE.CREDIT) {
      delete this.state.data.credit;
    }
    if (this.state.curDiscountUsing === newType) {
      this.state.curDiscountUsing = undefined;
      delete this.state.installmentPaymentMethodList
      this.getInstallmentPaymentMethodList();
    } else {
      this.state.curDiscountUsing = newType;
      if (this.state.curDiscountUsing === DISCOUNT_TYPE.CREDIT && common.userBalance) {
        this.state.data.credit = this.payData.cost > common.userBalance.credit ? common.userBalance.credit : this.payData.cost;
      }
    }
    this.forceUpdate();
  }
  renderData() {
    return <div style={{ backgroundColor: config.colorConfig.grey, paddingTop: 40 }}>
      <div style={{ ...config.pageSmallWidthStyle, }}>
        <div style={{ display: "flex" }}>
          <div style={{ ...(common.checkMobile() ? { width: "100%" } : { width: "70%" }) }}>
            <div style={{ border: "1px solid " + config.colorConfig.grey, backgroundColor: "#fff", marginBottom: 24 }}>
              <div style={{
                paddingLeft: 32, backgroundColor: config.colorConfig.main, color: "#fff", lineHeight: "45px",
              }}>
                <h1 style={{ display: "inline-block", marginRight: 5, fontSize: 20, marginTop: 0, marginBottom: 0 }}>
                  1.&nbsp;&nbsp;&nbsp;{Language.getLanguage(LanguageIdMap.BOOKING_USER_INFORMATION)}
                </h1>
              </div>
              <div style={{ padding: "25px 32px 20px", border: "1px solid " + config.colorConfig.grey }}>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <SelectField
                    autoWidth={true}
                    style={{ width: 95, marginRight: 12 }}
                    selectedMenuItemStyle={{ color: config.colorConfig.main }}
                    floatingLabelText={Language.getLanguage(LanguageIdMap.TITLE_MR_MRS)}
                    value={this.state.data.titleMrMrs}
                    onChange={(event, index, values) => {
                      this.state.data.titleMrMrs = values;
                      this.forceUpdate();
                    }}
                  >
                    {Object.keys(LanguageIdMap.TITLE_MR_MRS_LIST).map((key) => {
                      return <MenuItem
                        checked={LanguageIdMap.TITLE_MR_MRS_LIST[key].value === this.state.data.titleMrMrs}
                        value={LanguageIdMap.TITLE_MR_MRS_LIST[key].value}
                        primaryText={Language.getLanguage(LanguageIdMap.TITLE_MR_MRS_LIST[key].id)}
                      />
                    })}
                  </SelectField>
                  <TextField
                    style={{ width: 290, maxWidth: "100%", fontWeight: 100, marginRight: 12 }}
                    floatingLabelText={Language.getLanguage(LanguageIdMap.FIRST_NAME_ON_PASSPORT) + " *"}
                    value={this.state.data.firstNamePassport}
                    onChange={(e, newValue) => {
                      this.state.data.firstNamePassport = newValue;
                      this.forceUpdate();
                    }}
                  />
                  <TextField
                    style={{ width: 290, maxWidth: "100%", fontWeight: 100, marginRight: 12 }}
                    floatingLabelText={Language.getLanguage(LanguageIdMap.LAST_NAME_ON_PASSPORT) + " *"}
                    value={this.state.data.familyNamePassport}
                    onChange={(e, newValue) => {
                      this.state.data.familyNamePassport = newValue;
                      this.forceUpdate();
                    }}
                  />
                </div>
                <div >
                  <TextField
                    style={{ width: 290, maxWidth: "100%", fontWeight: 100, }}
                    floatingLabelText={Language.getLanguage(LanguageIdMap.PHONE_NUMBER) + " *"}
                    value={this.state.data.phone}
                    onChange={(e, newValue) => {
                      this.state.data.phone = newValue;
                      this.forceUpdate();
                    }}
                  />
                </div>
                <div >
                  <TextField
                    style={{ width: "100%", fontWeight: 100 }}
                    value={this.state.data.email}
                    floatingLabelText={Language.getLanguage(LanguageIdMap.EMAIL_ADDRESS) + " *"}
                    onChange={(e, newValue) => {
                      this.state.data.email = newValue;
                      this.forceUpdate();
                    }}
                  />
                  <div style={{ color: "rgb(0,0,0,0.3)", fontSize: 12 }}>
                    {Language.getLanguage(LanguageIdMap.YOUR_VOUCHER_RECEIVE_HERE_MAKE_SURE_CORRECT)}
                  </div>
                </div>
              </div>
            </div>
            {this.payData && this.payData.costAfterUseDiscountCode !== 0
              && <div style={{ border: "1px solid " + config.colorConfig.grey, backgroundColor: "#fff", marginBottom: 24 }}>
                <h2 style={{
                  paddingLeft: 32, backgroundColor: config.colorConfig.main, color: "#fff", lineHeight: "45px", fontSize: 20
                  , marginTop: 0, marginBottom: 0
                }}>
                  <div>
                    2.&nbsp;&nbsp;&nbsp;{Language.getLanguage(LanguageIdMap.PAYMENT)}
                  </div>
                </h2>
                <div style={{ padding: "24px 32px", border: "1px solid " + config.colorConfig.grey }}>

                  {this.state.paymentMethodList && this.state.paymentMethodList.map((rowData, rowIndex) => {
                    return <div style={{
                      padding: "20px 20px 20px 25px", border: "1px solid " + config.colorConfig.grey,
                    }}
                    >
                      <RadioButton
                        iconStyle={{ marginTop: -1 }}
                        labelStyle={{ fontWeight: 100 }}
                        label={<div>
                          <div>{rowData.name}</div>
                          <div style={{ color: "rgb(0,0,0,0.5)", fontSize: 12 }}>{rowData.desc}</div>
                        </div>}
                        checked={this.state.data.paymentMethod === rowData.method && this.state.data.purchaseType === 0}
                        onClick={e => {
                          this.state.data.paymentMethod = rowData.method;
                          this.state.data.purchaseType = 0;   //0: thanh toan binh thuong, 1: tra gop
                          this.forceUpdate();
                        }}
                      />

                      <Collapse in={this.state.data.paymentMethod === rowData.method && this.state.data.purchaseType === 0}>
                        <div style={{ paddingLeft: 24, paddingRight: 24 }}>

                          <SelectField
                            floatingLabelText={Language.getLanguage(
                              rowData.method === "ATM_ONLINE" ? LanguageIdMap.CHOOSE_BANK : LanguageIdMap.PAYMENT_CART_TYPE
                            ) + " *"}
                            autoWidth={true}
                            value={this.state.dynamicData.bankInfomation}
                            onChange={(event, index, values) => {
                              this.state.dynamicData.bankCode = values.code;
                              this.state.dynamicData.bankInfomation = values;
                              this.forceUpdate();
                            }}
                            selectedMenuItemStyle={{ color: config.colorConfig.main }}
                            style={{ width: 500, maxWidth: "100%" }}
                            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                          >
                            {rowData.banks && rowData.banks.map((rowData1, rowIndex1) => {
                              return <MenuItem
                                value={rowData1}
                                primaryText={rowData1.name}
                              />
                            })}
                          </SelectField>
                        </div>
                      </Collapse>
                    </div>
                  })}

                  {this.state.installmentPaymentMethodList && <div style={{
                    padding: "20px 20px 20px 25px", border: "1px solid " + config.colorConfig.grey,
                  }}
                  >
                    <RadioButton
                      iconStyle={{ marginTop: -1 }}
                      labelStyle={{ fontWeight: 100 }}
                      label={<div>
                        <div>{Language.getLanguage(LanguageIdMap.INSTALLMENT)}</div>
                        <div style={{ color: "rgb(0,0,0,0.5)", fontSize: 12 }}>{Language.getLanguage(LanguageIdMap.INSTALLMENT_DES)}</div>
                      </div>}
                      checked={this.state.data.purchaseType === 1}
                      onClick={e => {
                        delete this.state.data.paymentMethod;
                        this.state.data.purchaseType = 1;   //0: thanh toan binh thuong, 1: tra gop
                        this.forceUpdate();
                      }}
                    />
                    <Collapse in={this.state.data.purchaseType === 1}>
                      <div style={{ paddingLeft: 24, paddingRight: 24 }}>
                        <div>

                          <SelectField
                            autoWidth={true}
                            floatingLabelText={Language.getLanguage(LanguageIdMap.PAYMENT_CART_TYPE)}
                            value={this.state.dynamicData.bankCode}
                            onChange={(event, index, values) => {
                              this.state.dynamicData.bankCode = values;

                              delete this.state.data.paymentMethod;
                              delete this.state.dynamicData.month;

                              this.forceUpdate();
                            }}
                            selectedMenuItemStyle={{ color: config.colorConfig.main }}
                            style={{ width: 500, maxWidth: "100%" }}
                            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                          >
                            {this.state.installmentPaymentMethodList.bankInformation
                              && this.state.installmentPaymentMethodList.bankInformation.map((rowData1, rowIndex1) => {
                                return <MenuItem
                                  value={rowData1.bankCode}
                                  primaryText={rowData1.bankName}
                                />
                              })}
                          </SelectField>
                        </div>

                        {this.state.dynamicData.bankCode && <div style={{ overflowX: "auto" }}>
                          <table
                            className="table table-striped dataTable no-footer"
                          >
                            <thead>
                              <tr>
                                <th>{Language.getLanguage(LanguageIdMap.SELECT)}</th>
                                <th>{Language.getLanguage(LanguageIdMap.PAYMENT_METHOD)}</th>
                                <th>{Language.getLanguage(LanguageIdMap.MONTH)}</th>
                                <th>{Language.getLanguage(LanguageIdMap.AMOUNT_FEE)}</th>
                                <th>{Language.getLanguage(LanguageIdMap.AMOUNT_BY_MONTH)}</th>
                                <th>{Language.getLanguage(LanguageIdMap.AMOUNT_FINAL)}</th>
                              </tr>
                            </thead>
                            <tbody style={{ cursor: "pointer" }}>
                              {this.state.installmentPaymentMethodList.bankInformation
                                && this.state.installmentPaymentMethodList.bankInformation.map((rowData, rowIndex) => {
                                  if (this.state.dynamicData.bankCode === rowData.bankCode && rowData.paymentMethods) {
                                    let reArr = [];
                                    for (let i = 0; i < rowData.paymentMethods.length; i++) {
                                      if (rowData.paymentMethods[i].periods) {
                                        for (let j = 0; j < rowData.paymentMethods[i].periods.length; j++) {
                                          reArr.push(
                                            <tr
                                              style={{ cursor: "pointer" }}
                                              onClick={e => {
                                                this.state.data.paymentMethod = rowData.paymentMethods[i].paymentMethod;
                                                this.state.dynamicData.month = rowData.paymentMethods[i].periods[j].month;
                                                this.forceUpdate();
                                              }}
                                            >
                                              <td>
                                                <RadioButton
                                                  iconStyle={{ marginTop: -1 }}
                                                  labelStyle={{ fontWeight: 100 }}
                                                  checked={this.state.data.paymentMethod === rowData.paymentMethods[i].paymentMethod
                                                    && this.state.dynamicData.month === rowData.paymentMethods[i].periods[j].month}
                                                />
                                              </td>
                                              <td>
                                                {rowData.paymentMethods[i].paymentMethod}
                                              </td>
                                              <td>
                                                {rowData.paymentMethods[i].periods[j].month}
                                              </td>
                                              <td>
                                                {common.numberWithCommas(rowData.paymentMethods[i].periods[j].amountFee)
                                                  + " " + rowData.paymentMethods[i].periods[j].currency}
                                              </td>
                                              <td>
                                                {common.numberWithCommas(rowData.paymentMethods[i].periods[j].amountByMonth)
                                                  + " " + rowData.paymentMethods[i].periods[j].currency}
                                              </td>
                                              <td>
                                                {common.numberWithCommas(rowData.paymentMethods[i].periods[j].amountFinal)
                                                  + " " + rowData.paymentMethods[i].periods[j].currency}
                                              </td>
                                            </tr>
                                          )
                                        }
                                      }
                                    }
                                    return reArr;
                                  }
                                })}
                            </tbody>
                          </table>
                        </div>}
                      </div>
                    </Collapse>
                  </div>}

                </div>
              </div>
            }
            {!!this.payData && !!this.payData.cost
              && <div style={{ border: "1px solid " + config.colorConfig.grey, backgroundColor: "#fff", marginBottom: 24 }}>
                <div style={{ padding: "24px 32px", border: "1px solid " + config.colorConfig.grey }}>
                  <div style={{
                    border: "1px solid #aaa", paddingLeft: 20, paddingTop: 4, paddingBottom: 4, height: 32,
                    display: "inline-block", cursor: "pointer", fontSize: 16
                  }}
                    onClick={e => {
                      this.updateCurDiscountUsing(DISCOUNT_TYPE.DISCOUNT_CODE)
                    }}
                  >
                    {Language.getLanguage(LanguageIdMap.USE_DISCOUNT_CODE)}
                    <i className="fa fa-angle-down" aria-hidden="true"
                      style={{
                        paddingLeft: 12, paddingRight: 12, transitionDuration: "0.5s",
                        transform: "rotate(" + (this.state.curDiscountUsing === DISCOUNT_TYPE.DISCOUNT_CODE ? 180 : 0) + "deg)",
                      }}
                    ></i>
                  </div>

                  <Collapse in={this.state.curDiscountUsing === DISCOUNT_TYPE.DISCOUNT_CODE}>
                    <div>

                      <form onSubmit={e => {
                        e.preventDefault();
                        if (!this.state.couponCode) {
                          this.setState({
                            alertModalPopup: {
                              titleAlertModal: Language.getLanguage(LanguageIdMap.msg_title_generic),//Language.getLanguage(LanguageIdMap.notification),
                              descAlertModal: Language.getLanguage(LanguageIdMap.PLEASE_INPUT_DISCOUNT_CODE),
                            }
                          });
                          return;
                        }

                        this.previewPayment({
                          couponCode: this.state.couponCode,
                          bookingRequest: this.getBookingRequestData(),
                        })

                      }}>
                        <div style={{ display: "flex", flexWrap: "wrap", padding: 24, backgroundColor: config.colorConfig.grey }}>
                          <FormControl
                            className="focusBorderColorDefault "
                            type="text"
                            style={{ width: 300, height: 32, marginBottom: 4 }}
                            value={this.state.couponCode}
                            placeholder={Language.getLanguage(LanguageIdMap.INPUT_DISCOUNT_CODE)}
                            onChange={e => {
                              this.setState({ couponCode: e.target.value })
                            }}
                          />
                          <div style={{}}>
                            <RaisedButton
                              buttonStyle={{ ...config.buttonStyle[0], padding: 0, height: 32, width: 92 }}
                              style={{
                                marginBottom: 12, height: 32, width: 92,
                                display: "inline-block", margin: 0, marginRight: 20, marginLeft: 8,
                                fontWeight: "bold",
                                outline: "none",
                              }}
                              type="submit"
                            >{Language.getLanguage(LanguageIdMap.USE)}</RaisedButton>
                          </div>
                        </div>
                      </form>
                    </div>
                  </Collapse>
                </div>
              </div>}

            {!!this.payData && !!this.payData.cost && common.userBalance && !!common.userBalance.credit
              && <div style={{ border: "1px solid " + config.colorConfig.grey, backgroundColor: "#fff", marginBottom: 24 }}>
                <div style={{ padding: "24px 32px", border: "1px solid " + config.colorConfig.grey }}>
                  <div style={{
                    paddingLeft: 20, paddingTop: 4, paddingBottom: 4, height: 32,
                    display: "flex", alignItems: "center", cursor: "pointer", fontSize: 16
                  }}
                    onClick={e => {
                      this.updateCurDiscountUsing(DISCOUNT_TYPE.CREDIT);

                      let data = {
                        credit: this.state.data.credit,
                        bookingRequest: this.getBookingRequestData(),
                      }
                      this.previewPayment(data)
                    }}
                  >
                    <Checkbox
                      iconStyle={{ marginTop: -1 }}
                      labelStyle={{ fontWeight: 100 }}
                      style={{ width: "unset" }}
                      checked={this.state.curDiscountUsing === DISCOUNT_TYPE.CREDIT}
                    />
                    <t>{Language.getLanguage(LanguageIdMap.APPLY_AMOUNT_CREDIT,
                      {
                        number: common.numberWithCommas(common.userBalance.credit)
                          + " " + Language.getLanguage(common.moneyType)
                      })}
                    </t>
                    (<a style={{ fontSize: 12 }}
                      href={config.shortUrl.profile + "/" + config.shortUrl.profileChild.CREDIT.url}
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(config.shortUrl.profile + "/" + config.shortUrl.profileChild.CREDIT.url, '_blank');
                      }}>
                      {Language.getLanguage(LanguageIdMap.HOW_TO_USE_CREDIT)}
                    </a>)
                  </div>

                </div>
              </div>}

            <div style={{ border: "1px solid " + config.colorConfig.grey, backgroundColor: "#fff", marginBottom: 24, padding: "24px 32px" }}>
              <div style={{ marginTop: -12, float: "right" }}>
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
                    this.loadingForAction === "PAY_NOW";
                    this.paymentRequest();
                    this.forceUpdate();
                  }}
                >{Language.getLanguage(LanguageIdMap.PAY_NOW)}
                  {this.loadingCountdown > 0 && this.loadingForAction === "PAY_NOW" &&
                    <ReactLoading type="bubbles"
                      style={{ margin: "auto", marginTop: -54, width: 60, height: 20, fill: "#fff" }} />}
                </RaisedButton>
              </div>
              {Language.getLanguage(LanguageIdMap.CLICK_PAYNOW_NOTIFICATION,
                {
                  read1: Language.getLanguage(LanguageIdMap.TERM_AND_CONDITIONS),
                  // read2: Language.getLanguage(LanguageIdMap.CANCEL_POLICY),
                },
                {
                  // read1:{cursor:"pointer"},
                  // read2:{cursor:"pointer"},
                },
                undefined,
                undefined,
                {
                  read1: config.domain + config.shortUrl.termAndCondition,
                  // read1: config.shortUrl.termAndCondition,
                }
              )}
            </div>
          </div>
          {common.checkMobile()
            ? <div>
              <Drawer
                open={this.state.payListSideOpen}
                containerStyle={{
                  right: 0, left: "unset", backgroundColor: config.colorConfig.grey,
                  ...(this.state.payListSideOpen ? { transform: "translate(0px, 0px)" } : { transform: "translate(120%, 0px)" })
                }}
              >
                <div style={{ padding: 12, paddingBottom: 36 }}>
                  {this.renderPayList()}
                </div>
              </Drawer>
              <div style={{ position: "fixed", bottom: 5, left: 0, textAlign: "center", zIndex: 2000, width: "100%" }}>
                <div
                  style={{
                    display: "inline-block", color: config.colorConfig.main, boxShadow: "rgb(0, 0, 0) 2px 2px 3px"
                    , backgroundColor: "#fff", padding: "5px 18px ", borderRadius: 12
                  }}
                  onClick={e => {
                    // console.log("click filter")
                    this.setState({ payListSideOpen: !this.state.payListSideOpen })
                  }}
                >{Language.getLanguage(LanguageIdMap.DETAIL)}</div>
              </div>
            </div>
            : <div style={{ paddingLeft: 30, width: "30%" }}>
              {this.renderPayList()}
            </div>}
        </div>
      </div>
    </div>
  }

}
export default Display;

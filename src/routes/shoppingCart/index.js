

import React, { PropTypes, Component } from 'react';

import $ from "jquery";
import common from '../../data/common';
import { api, config, analytics } from '../../config';
import LanguageIdMap from '../../language/LanguageIdMap'
import Language from '../../language/Language'
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import SuperComponent from '../../components/SuperComponent';
import Router from 'next/router'

class Display extends SuperComponent {
  constructor(props, context) {
    super(props, context);
    this.state.data = {};

    this.addShoppingCartCallbackBindThis = this.addShoppingCartCallback.bind(this)

    this.props.initPropsData.seoTitle = Language.getLanguage(LanguageIdMap.SHOPPING_CART);
    this.props.initPropsData.seoDescription = Language.getLanguage(LanguageIdMap.SHOPPING_CART);
  }
  addShoppingCartCallback() {
    this.forceUpdate();
  }
  componentWillMount() {
    super.componentWillMount();
    common.addGetShoppingCartCallback(this.addShoppingCartCallbackBindThis)
  }
  componentWillUnmount() {
    super.componentWillUnmount();
    common.removeGetShoppingCartCallback(this.addShoppingCartCallbackBindThis)
  }
  renderData() {
    let hasCheckedAll = true;
    if (common.shoppingCart && common.shoppingCart.orderOrderProduct) {
      if (!this.state.hasPresetShoppingCart) {
        this.state.hasPresetShoppingCart = true;
        for (let i = 0; i < common.shoppingCart.orderOrderProduct.length; i++) {
          common.shoppingCart.orderOrderProduct[i]._checked = true;
        }
      } else {
        for (let i = 0; i < common.shoppingCart.orderOrderProduct.length; i++) {
          if (!common.shoppingCart.orderOrderProduct[i]._checked && !common.shoppingCart.orderOrderProduct[i].expired) {
            hasCheckedAll = false;
            break;
          }
        }
      }
    }

    return <div style={{ backgroundColor: config.colorConfig.grey, paddingBottom: 80, minHeight: "100vh" }}>
      <div style={{ ...config.pageSmallWidthStyle, }}>
        <h1 style={{ paddingTop: 40, paddingBottom: 32, fontSize: 24, fontWeight: "bold" }}>
          {Language.getLanguage(LanguageIdMap.SHOPPING_CART)}
        </h1>
      </div>
      {(common.shoppingCart && common.shoppingCart.orderOrderProduct && common.shoppingCart.orderOrderProduct.length > 0)
        ? <div>
          <div style={{ ...config.pageSmallWidthStyle, overflow: "auto" }}>
            <table className="table dataTable no-footer">
              <tbody>
                <tr style={{ backgroundColor: "#fff" }}>
                  <td style={{ border: "none" }}
                    onClick={e => {
                      for (let i = 0; i < common.shoppingCart.orderOrderProduct.length; i++) {
                        common.shoppingCart.orderOrderProduct[i]._checked = hasCheckedAll ? false : true;
                      }
                      this.forceUpdate();
                    }}
                  >
                    <Checkbox
                      iconStyle={{}}
                      checked={hasCheckedAll}
                    />
                  </td>
                  <td style={{ border: "none" }}>
                    {Language.getLanguage(LanguageIdMap.btnAll)}
                  </td>
                  <td style={{ border: "none" }}>
                    {Language.getLanguage(LanguageIdMap.SERVICE_INFORMATION)}
                  </td>
                  <td style={{ border: "none" }}>
                    {Language.getLanguage(LanguageIdMap.DATE)}
                  </td>
                  <td style={{ border: "none" }}>
                    {Language.getLanguage(LanguageIdMap.AMOUNT)}
                  </td>
                  <td style={{ border: "none" }}></td>
                  <td style={{ border: "none" }}>
                    {Language.getLanguage(LanguageIdMap.MONEY_TOTAL)}
                  </td>
                </tr>
                {common.shoppingCart.orderOrderProduct.map((rowData, rowIndex) => {
                  return [
                    <tr><td colSpan="7" style={{ height: 18, border: "none" }} /></tr>,
                    <tr style={{ borderBottom: "1px solid #ddd", paddingBottom: 24, paddingTop: 24, backgroundColor: "#fff" }}>
                      <td style={{ border: "none" }}>
                        {!rowData.expired && <div
                          onClick={e => {
                            rowData._checked = !rowData._checked;
                            this.forceUpdate();
                          }}>
                          <Checkbox
                            iconStyle={{}}
                            checked={rowData._checked}
                          />
                        </div>}
                      </td>
                      <td style={{ border: "none" }}>
                        <a style={{ color: "inherit" }} href={config.domain + config.shortUrl.product + "/" + rowData.alias}
                          onClick={e => {
                            e.preventDefault();
                            Router.push(config.shortUrl.product, config.shortUrl.product + "/" + rowData.alias)
                          }}
                        >
                          <img style={{ marginLeft: 4, marginRight: 4, width: 90, height: 90 }}
                            src={rowData.thumbUrl}
                          />
                        </a>
                      </td>
                      <td style={{ border: "none" }}>
                        <a style={{ color: "inherit" }} href={config.domain + config.shortUrl.product + "/" + rowData.alias}
                          onClick={e => {
                            e.preventDefault();
                            Router.push(config.shortUrl.product, config.shortUrl.product + "/" + rowData.alias)
                          }}
                        >
                          <div style={{ fontWeight: "bold", fontSize: 16, lineHeight: "20px", marginBottom: 8 }}>{rowData.name}</div>
                          <div>{rowData.scheduleData.name}</div>
                        </a>
                      </td>
                      <td style={{ border: "none" }}>
                        <div style={{ marginBottom: 8 }}>
                          {rowData.scheduleData.time ? rowData.scheduleData.time.hour + ":" + rowData.scheduleData.time.minute : ""}
                          {" " + common.changeTimeStampToHumanTime(rowData.scheduleData.date, undefined, "standardDate")}
                        </div>
                        <div>({Language.getLanguage(LanguageIdMap.LOCAL_TIME)})</div>
                      </td>
                      <td colSpan={2} style={{ border: "none" }}>
                        {rowData.scheduleData && rowData.scheduleData.schedulePriceItems
                          && rowData.scheduleData.schedulePriceItems.map((rowData1, rowIndex1) => {
                            return <div style={{ display: "flex", justifyContent: "space-between" }}>
                              <div style={{ marginBottom: 8 }}>
                                {(rowData.scheduleData.schedulePriceType === LanguageIdMap.SCHEDULE_PRICE_TYPE_LIST.BY_PERSON.value
                                  && common.schedulePriceItemTypeMap)
                                  ? common.schedulePriceItemTypeMap[rowData1.schedulePriceItemType]
                                  + (rowData1.label ? " (" + rowData1.label + ")" : "")
                                  : rowData1.label}
                              </div>
                              <div style={{ marginBottom: 8, }}>
                                {rowData1.noOfItem}
                              </div>
                            </div>
                          })}
                      </td>
                      <td style={{ border: "none" }}></td>
                    </tr>,
                    <tr style={{ backgroundColor: "#fff" }}>
                      <td />
                      <td style={{ color: config.colorConfig.darkGrey, cursor: "pointer" }}
                        onClick={e => {
                          if (this.loadingCountdown > 0) {
                            return;
                          }
                          this.setState({
                            alertModalPopup: {
                              // titleAlertModal: rowData.name,
                              descAlertModal: <div style={{ fontSize: 24 }}>{Language.getLanguage(LanguageIdMap.DELETE_CONFIRM_NO_NAME)}</div>,
                              // needClickConfirmButton: true,
                              alertModalPopupButtonNameClickCallback: [
                                {
                                  name: Language.getLanguage(LanguageIdMap.CONFIRM), style: config.buttonStyle[0], callback: function () {
                                    this.removeProductFromCart(hasCheckedAll, { id: rowData.productId, index: rowIndex })
                                  }.bind(this)
                                },
                                {
                                  name: Language.getLanguage(LanguageIdMap.btnClose), style: config.buttonStyle[1],
                                }]
                            }
                          })
                        }}
                      >
                        <i className="fa fa-trash-o" style={{ marginRight: 10 }} />
                        {Language.getLanguage(LanguageIdMap.CANCEL_TOUR)}
                      </td>
                      <td colSpan={4}>
                        {rowData.expired === true && <div style={{ color: "#ff5722" }}>
                          {Language.getLanguage(LanguageIdMap.SERVICE_NOT_SUPPORT_PLEASE_BOOK_AGAIN)}
                        </div>}
                      </td>
                      <td style={{ fontWeight: "bold" }}>
                        {Language.getLanguage(common.moneyType) + " " + common.numberWithCommas(rowData.cost)}
                      </td>
                    </tr>
                  ]
                })}
              </tbody>
            </table>
            <div style={{ height: 20, }} />
            <div style={{
              backgroundColor: "#fff", padding: "20px 20px 20px 24px",
              ...config.pageSmallWidthStyle,
            }}>
              <div style={{ float: "left", display: "flex", flexWrap: "wrap", alignItems: "center", marginTop: 8 }}>
                <div style={{ cursor: "pointer" }}
                  onClick={e => {
                    for (let i = 0; i < common.shoppingCart.orderOrderProduct.length; i++) {
                      common.shoppingCart.orderOrderProduct[i]._checked = hasCheckedAll ? false : true;
                    }
                    this.forceUpdate();
                  }}>
                  <Checkbox
                    iconStyle={{}}
                    checked={hasCheckedAll}
                  />
                </div>
                <div style={{ marginLeft: 6 }}>
                  {Language.getLanguage(LanguageIdMap.btnAll)}
                </div>
                <div style={{ cursor: "pointer", marginLeft: 20 }}
                  onClick={e => {
                    this.setState({
                      alertModalPopup: {
                        // titleAlertModal: rowData.name,
                        descAlertModal: <div style={{ fontSize: 24 }}>{Language.getLanguage(LanguageIdMap.DELETE_CONFIRM_NO_NAME)}</div>,
                        // needClickConfirmButton: true,
                        alertModalPopupButtonNameClickCallback: [
                          {
                            name: Language.getLanguage(LanguageIdMap.CONFIRM), style: config.buttonStyle[0], callback: function () {
                              this.removeProductFromCart(hasCheckedAll)
                            }.bind(this)
                          },
                          {
                            name: Language.getLanguage(LanguageIdMap.btnClose), style: config.buttonStyle[1],
                          }]
                      }
                    })
                  }}
                >
                  {Language.getLanguage(LanguageIdMap.DELETE_SERVICE_CHECKED)}
                </div>
              </div>
              <div style={{
                float: "right", display: "flex", flexWrap: "wrap", justifyContent: "flex-end"
                , alignItems: "center"
              }}>
                <div>
                  {Language.getLanguage(LanguageIdMap.TOTAL_SERVICE) + ":"}
                </div>
                <div style={{ marginLeft: 10, fontSize: 24, fontWeight: 600, color: config.colorConfig.main }}>
                  {Language.getLanguage(common.moneyType) + " "}
                  {common.numberWithCommas(common.shoppingCart.cost)}
                </div>
                <RaisedButton
                  buttonStyle={{
                    ...config.buttonStyle[0], height: 48,
                    ...(common.shoppingCart.cost > 0 ? {} : { backgroundColor: "#eee", borderColor: "#eee" })
                  }}
                  style={{
                    marginBottom: 12, margin: 0, marginLeft: 20,
                    fontWeight: "bold", height: 48, width: 150,
                    outline: "none",
                  }}
                  onClick={e => {
                    if (common.shoppingCart.cost > 0) {
                      Router.push(config.shortUrl.pay)
                    }
                  }}
                >{Language.getLanguage(LanguageIdMap.PAY_NOW)}</RaisedButton>
              </div>
              <div style={{ clear: "both" }} />
            </div>
          </div>
        </div>
        : <div style={{ fontSize: 22, textAlign: "center", backgroundColor: "#fff", padding: 20, ...config.pageSmallWidthStyle }}>
          {Language.getLanguage(LanguageIdMap.CART_IS_EMPTY)}
        </div>}
    </div>
  }
  removeProductFromCart(hasCheckedAll, param = undefined) {
    let data = {};
    if (param) {
      data.removeProducts = [param];

      var product = common.shoppingCart.orderOrderProduct.find(p => p.productId === param.id);
      var quantity = 0;
      
      if (product.scheduleData && product.scheduleData.schedulePriceItems) {
        product.scheduleData.schedulePriceItems.forEach(item => {
              quantity += item.noOfItem;
          });
      }

      console.log('removeProductFromCart');
      
      if (product) {
        ga('create', analytics.google.trackingId);
        ga('require', 'ec');
        
        ga('ec:removeProduct', {
          'id': product.productId,
          'name': product.name,
          // 'category': product.category,
          // 'brand': product.brand,
          // 'variant': product.variant,
          'price': product.cost,
          'quantity': quantity
        });
        ga('ec:setAction', 'remove');

        ga('send', 'event', 'Ecommerce', 'RemoveCart', product.name, product.productId);
        // ga('send', 'pageview');     // Send transaction data with initial pageview.
        console.log('Tracking removeProductFromCart event');
      }
    } else {
      if (hasCheckedAll) {
        data = {
          removeAll: 1
        }
      } else {
        data.removeProducts = [];
        for (let i = 0; i < common.shoppingCart.orderOrderProduct.length; i++) {
          if (common.shoppingCart.orderOrderProduct[i]._checked) {
            data.removeProducts.push({
              id: common.shoppingCart.orderOrderProduct[i].productId,
              index: i,
            })
          }
        }
      }
    }
    this.loadingCountdown++;
    common.fetcher(
      config.api.hostType.product_url,
      config.api.hostEndPoint.cartRemoveProduct,
      "post",
      undefined,
      data,
    )
      .then((jsonRes) => {
        this.loadingCountdown--;
        common.getShoppingCartList();
        this.forceUpdate();
      })
      .catch((err) => {
        console.log("error pro3:" + err)
        this.loadingCountdown--;
        this.forceUpdate();
      })
    this.forceUpdate();
  }

}
export default Display;

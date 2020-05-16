

import React, { PropTypes, Component } from 'react';

import common from '../../data/common';
import {  config } from '../../config';
import LanguageIdMap from '../../language/LanguageIdMap'
import Language from '../../language/Language'
import RaisedButton from 'material-ui/RaisedButton';
import SuperComponent from '../../components/SuperComponent';
import Router from 'next/router'

class Display extends SuperComponent {
  constructor(props, context) {
    super(props, context);
    this.state.data = {};
    this.props.initPropsData.seoTitle = Language.getLanguage(LanguageIdMap.ADDED_TO_SHOPPING_CART);
    this.props.initPropsData.seoDescription = Language.getLanguage(LanguageIdMap.ADDED_TO_SHOPPING_CART);
  }

  checkAndLoadData() {
    if (super.checkAndLoadData() == false) {
      return false;
    }
    common.getShoppingCartList();
    return true;
  }
  renderData() {
    if (!common.productForSupplierProductInfo || !common.scheduleForSupplierProductInfo) {
      Router.push(config.domain + config.shortUrl.home)
      return;
    }
    return <div>
      <div style={{ ...config.pageSmallWidthStyle, paddingTop: 24 }}>
        <h1 style={{ marginBottom: 40, fontSize: 20 }}>
          {Language.getLanguage(LanguageIdMap.ADDED_TO_SHOPPING_CART)}
        </h1>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", }}>
          <div style={{ display: "inline-flex" }}>
            <div style={{ marginRight: 12, paddingBottom: 12 }}>
              <a href={config.domain + config.shortUrl.product + "/" + common.productForSupplierProductInfo.alias}
                onClick={e => {
                  e.preventDefault();
                  Router.push(config.domain + config.shortUrl.product + "/" + common.productForSupplierProductInfo.alias)
                }}
              >
                <img style={{ width: 135, height: 100, objectFit: "cover" }}
                  src={common.productForSupplierProductInfo.featureImage ? common.productForSupplierProductInfo.featureImage.thumbUrl : undefined}
                />
              </a>
            </div>
            <div style={{ width: "100%", maxWidth: 467, paddingBottom: 12 }}>
              <a href={config.domain + config.shortUrl.product + "/" + common.productForSupplierProductInfo.alias}
                onClick={e => {
                  e.preventDefault();
                  Router.push(config.domain + config.shortUrl.product + "/" + common.productForSupplierProductInfo.alias)
                }}
              >
                <div style={{ fontSize: 16, marginBottom: 8, color: "inherit" }} className="hoverDefaultColor">
                  {common.productForSupplierProductInfo.productName}
                </div>
              </a>
              <div style={{ color: "#888", fontSize: 14, marginBottom: 8 }}>
                {Language.getLanguage(LanguageIdMap.DATE) + " : " + common.productForSupplierProductInfo._bookTime}
              </div>
              <div style={{ color: "#888", fontSize: 14, marginBottom: 8 }}>
                {Language.getLanguage(LanguageIdMap.AMOUNT) + " : " + common.scheduleForSupplierProductInfo._tmpListChoosen.join(", ")}
              </div>
            </div>
          </div>
          <div style={{ paddingBottom: 12 }}>
            <div style={{ textAlign: "right", fontSize: 18 }}>
              {Language.getLanguage(LanguageIdMap.subtotal) + ": "}
              <sup style={{ top: "-0.8em", fontSize: 8 }}>
                {Language.getLanguage(common.moneyType)}
              </sup>
              {common.numberWithCommas(common.scheduleForSupplierProductInfo._tmpTotalPrice)}
            </div>
            <div style={{ marginTop: 24, textAlign: "right" }}>
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
                  e.preventDefault();
                  Router.push(config.domain + config.shortUrl.shoppingCart)
                }}
              >{Language.getLanguage(LanguageIdMap.VIEWMORE)}
              </RaisedButton>
            </div>
          </div>
        </div>
      </div>

      {common.productForSupplierProductInfo.productRelative && common.productForSupplierProductInfo.productRelative.data
        && common.productForSupplierProductInfo.productRelative.data.length > 0
        && <div style={{ marginBottom: 48,marginTop:48, ...config.pageSmallWidthStyle }}>
            <div style={{ fontSize: 32, marginBottom: 32, }}>
              {Language.getLanguage(LanguageIdMap.RELATIVE_PRODUCT)}
            </div>
            {this.renderOneRow(common.productForSupplierProductInfo.productRelative, {
              cardRender: this.renderProductCard.bind(this)
            })}
        </div>}
    </div>
  }
}

export default Display;

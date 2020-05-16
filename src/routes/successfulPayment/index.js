

import React, { PropTypes, Component } from 'react';

import common from '../../data/common';
import { api, config, analytics } from '../../config';
import LanguageIdMap from '../../language/LanguageIdMap'
import Language from '../../language/Language'
import SuperComponent from '../../components/SuperComponent';

class Display extends SuperComponent {
  constructor(props, context) {
    super(props, context);

    console.log('paymentSuccess');
    if (common.location.search.error_code == "00" && common.location.search.token) {
    
      var data = JSON.parse(window.localStorage.getItem('paymentData'));
      var payData = JSON.parse(window.localStorage.getItem("paynowData"));
      var product = payData.orderOrderProduct[0];

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
        'id': payData.orderId,
        'affiliation': data.affiliateCode || '',
        // 'revenue': '37.39',
        // 'tax': '2.85',
        // 'shipping': '5.34',
        'coupon': data.couponCode || ''    // User added a coupon at checkout.
      });

      ga('send', 'pageview');     // Send transaction data with initial pageview.
      console.log('Tracking paymentSuccess event');
      console.log('data', JSON.stringify(data));
      console.log('payData', JSON.stringify(payData));
      window.localStorage.removeItem('paymentData');
      window.localStorage.removeItem('paynowData');

      this.props.initPropsData.seoTitle = Language.getLanguage(LanguageIdMap.PAYMESS_SUCCESS);
      this.props.initPropsData.seoDescription = Language.getLanguage(LanguageIdMap.PAYMESS_SUCCESS_THANK_YOU);

      common.fetcher(
        config.api.hostType.product_url,
        config.api.hostEndPoint.paymentSuccessNonInstallmentSendToServer,
        "post",
        { token: common.location.search.token },
        undefined,
        {
          typeFormData: true
        }
      ).then((jsonRes) => {
        common.getShoppingCartList();
      }).catch((err) => {
      });
    } else {
      this.props.initPropsData.seoTitle = Language.getLanguage(LanguageIdMap.PAYMESS_NOT_SUCCESS);
      this.props.initPropsData.seoDescription = Language.getLanguage(LanguageIdMap.PAYMESS_SUCCESS_THANK_YOU);

    }
  }
  renderData() {
    return <div style={{ paddingTop: 24, paddingBottom: 24 }}>
      <div style={{ ...config.pageSmallWidthStyle, paddingTop: 12, paddingBottom: 12, backgroundColor: "#fff" }}>
        <h1 style={{ marginBottom: 24, fontSize: 32, textAlign: "center", color: config.colorConfig.main }}>
          {common.location.search.error_code == "00"
            ? Language.getLanguage(LanguageIdMap.PAYMESS_SUCCESS)
            : Language.getLanguage(LanguageIdMap.PAYMESS_NOT_SUCCESS)}
        </h1>
        <div style={{ textAlign: "center" }}>
          {Language.getLanguage(LanguageIdMap.PAYMESS_SUCCESS_THANK_YOU)}
          <div>
            <a
              href={config.domain + config.shortUrl.home}
              onClick={e => {
                e.preventDefault();
                Router.push(config.shortUrl.home)
              }}
            >
              {Language.getLanguage(LanguageIdMap.BACK_TO_HOME_PAGE)}
            </a>
          </div>
        </div>
      </div>
    </div>
  }
}

export default Display;



import React, { PropTypes, Component } from 'react';

import common from '../../data/common';
import { api, config } from '../../config';
import LanguageIdMap from '../../language/LanguageIdMap'
import Language from '../../language/Language'
import SuperComponent from '../../components/SuperComponent';
// import Router from 'next/router'

class Display extends SuperComponent {
  constructor(props, context) {
    super(props, context);
    // if (!common.ibOnlineData || !common.ibOnlineBankData) {
    //   Router.push(config.shortUrl.home)
    //   return;
    // }

    // if (dataLayer && common && common.ibOnlineData) {
    //   for(var dlindex=0; dlindex < dataLayer.length; dlindex++){
    //     if(dataLayer[dlindex].ecommerce) {
    //       console.log('orderId', common.ibOnlineData.orderId);
    //       dataLayer[dlindex].ecommerce.purchase.actionField.id = common.ibOnlineData.orderId;
    //     }
    //   }
    // }

    this.props.initPropsData.seoTitle = Language.getLanguage(LanguageIdMap.IB_ONLINE) + ": " + common.ibOnlineData.code
    this.props.initPropsData.seoDescription = Language.getLanguage(LanguageIdMap.IB_ONLINE) + ": " + common.ibOnlineData.code
  }
  renderData() {
    return <div style={{ paddingTop: 24, paddingBottom: 24, backgroundColor: config.colorConfig.grey }}>
      <div style={{ ...config.pageSmallWidthStyle, paddingTop: 12, paddingBottom: 12 }}>

        <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
          <div className='col-sm-6'>
            <div style={{ margin: "8px 12px", padding: "24px 12px", border: "1px solid #000", backgroundColor: "#fff" }}>
              <h4>{Language.getLanguage(LanguageIdMap.STEP_WITH_NUMBER, { number: 1 })
                + ": " + Language.getLanguage(LanguageIdMap.IB_ONLINE)}
              </h4>
              <div style={{ marginTop: 24, fontSize: 15 }}>
                {Language.getLanguage(LanguageIdMap.IB_ONLINE_STEP1_DESC
                  , {
                    transfer_exactly_money: Language.getLanguage(LanguageIdMap.TRANSFER_EXACTLY_MONEY),
                    order_number: Language.getLanguage(LanguageIdMap.ORDER_NUMBER),
                  }, {
                    transfer_exactly_money: { fontWeight: "bold" },
                    order_number: { fontWeight: "bold" },
                  }
                )}
              </div>
            </div>
          </div>
          <div className='col-sm-6'>
            <div style={{ margin: "8px 12px", padding: "24px 12px", border: "1px solid #000", backgroundColor: "#fff" }}>
              <h4>{Language.getLanguage(LanguageIdMap.STEP_WITH_NUMBER, { number: 2 })
                + ": " + Language.getLanguage(LanguageIdMap.WAITING_FOR_CONFIRMATION)}
              </h4>
              <div style={{ marginTop: 24, fontSize: 15 }}>
                {Language.getLanguage(LanguageIdMap.IB_ONLINE_STEP2_DESC)}
              </div>
            </div>
          </div>
        </div>

        <div className="row" style={{ marginLeft: 0, marginRight: 0, marginTop: 24 }}>
          <div className='col-sm-6'>
            <div style={{ margin: "8px 12px" }}>
              <h4 style={{
                backgroundColor: config.colorConfig.main, padding: "8px 12px", marginBottom: 0, color: "#fff",
                fontWeight: "bold"
              }}>
                {Language.getLanguage(LanguageIdMap.TRANSFER_INFORMATION).toUpperCase()}
              </h4>
              <div style={{ padding: "24px 12px", backgroundColor: "#fff" }}>
                <div style={{ fontSize: 20 }}>
                  {Language.getLanguage(LanguageIdMap.AMOUNT_MONEY_TO_TRANSFER) + ": "
                    + common.numberWithCommas(common.ibOnlineData.costAfterUseDiscountCode !== undefined
                      ? common.ibOnlineData.costAfterUseDiscountCode
                      : common.ibOnlineData.cost)
                    + Language.getLanguage(common.moneyType)}
                </div>
                <div style={{ fontSize: 20, marginTop: 24 }}>
                  {Language.getLanguage(LanguageIdMap.ORDER_CODE) + ": " + common.ibOnlineData.orderId}
                </div>
                <div style={{ fontSize: 20, marginTop: 24 }}>
                  {Language.getLanguage(LanguageIdMap.TRANSFER_INFORMATION) + ": "}
                </div>
                <div style={{ fontWeight: "bold", marginTop: 6 }}>
                  Ngân hàng Techcombank - Chi nhánh Nguyễn Oanh
                  {/* {common.ibOnlineBankData.code} */}
                </div>
                <div style={{ marginTop: 6 }}>
                  {/* {Language.getLanguage(LanguageIdMap.ACCOUNT_HOLDER) + ": " + common.ibOnlineBankData.accountName} */}
                  {Language.getLanguage(LanguageIdMap.ACCOUNT_HOLDER) + ": Nguyễn Thị Thanh Nga"}
                </div>
                <div style={{ marginTop: 6 }}>
                  {/* {Language.getLanguage(LanguageIdMap.ACCOUNT_NUMBER) + ": " + common.ibOnlineBankData.accountNo} */}
                  {Language.getLanguage(LanguageIdMap.ACCOUNT_NUMBER) + ": 19034095489012"}
                </div>
              </div>
            </div>
          </div>
          <div className='col-sm-6'>
            <div style={{ margin: "8px 12px" }}>
              <h4 style={{
                backgroundColor: config.colorConfig.main, padding: "8px 12px", marginBottom: 0, color: "#fff",
                fontWeight: "bold"
              }}>
                {Language.getLanguage(LanguageIdMap.PAYMENT_GUIDE).toUpperCase()}
              </h4>
              <div style={{ padding: "24px 12px", backgroundColor: "#fff" }}>
                <div style={{ marginTop: 24 }}>
                  {Language.getLanguage(LanguageIdMap.PAYMENT_GUIDE_DESC
                    , {
                      order_code: Language.getLanguage(LanguageIdMap.ORDER_CODE).toLowerCase(),
                    }, {
                      order_code: { fontWeight: "bold" },
                    }
                  )}
                </div>
                <div >
                  {Language.getLanguage(LanguageIdMap.PAYMENT_PROCESSING_IN_WORKING_TIME)}
                </div>
                <div style={{ marginTop: 24 }}>
                  <ul>
                    <li>{Language.getLanguage(LanguageIdMap.SUPPORT_TIME_WEEKDAY_DES)}</li>
                    <li>{Language.getLanguage(LanguageIdMap.SUPPORT_TIME_WEEKEND_DES)}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ margin: "24px 12px", padding: "24px 12px", backgroundColor: "#fff" }}>
          <h3 style={{ marginTop: 0 }}>
            {Language.getLanguage(LanguageIdMap.NEED_SUPPORT_FROM_US)}
          </h3>
          <div style={{ marginTop: 24, fontWeight: "bold" }}>
            {Language.getLanguage(LanguageIdMap.SUPPORT).toUpperCase()}
          </div>
          <div>
            {Language.getLanguage(LanguageIdMap.SUPPORT_TIME_WEEKDAY_DES)}
          </div>
          <div>
            {Language.getLanguage(LanguageIdMap.SUPPORT_TIME_WEEKEND_DES)}
          </div>
          <div style={{ marginTop: 24, fontWeight: "bold" }}>
            {Language.getLanguage(LanguageIdMap.HOTLINE) + ": " + config.phoneContact}
          </div>
        </div>

      </div>
    </div>
  }
}

export default Display;

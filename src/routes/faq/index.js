

import React, { PropTypes, Component } from 'react';

import { Collapse, OverlayTrigger, Tooltip } from 'react-bootstrap';
import common from '../../data/common';
import { api, config } from '../../config';
import LanguageIdMap from '../../language/LanguageIdMap'
import Language from '../../language/Language'
import Drawer from 'material-ui/Drawer';
import SuperComponent from '../../components/SuperComponent';
import Head from 'next/head';


class Display extends SuperComponent {
  constructor(props, context) {
    super(props, context);

    common.fetcher(
      config.api.hostType.product_url,
      config.api.hostEndPoint.faq,
      "get"
    ).then((jsonRes) => {
      this.setState({
        data: jsonRes.data.data
      })
    }).catch((err) => {
    });

    this.props.initPropsData.seoTitle = Language.getLanguage(LanguageIdMap.FAQ_DESC);
    this.props.initPropsData.seoDescription = Language.getLanguage(LanguageIdMap.FAQ_DESC);

    this.canNotRenderFooter = true;
  }

  renderFAQTitleList() {
    if (!this.state.data) {
      return;
    }
    return <div>
      {this.state.data.map((rowData, rowIndex) => {
        if (!this.state.dataFocus) {
          this.state.dataFocus = rowData;
        }
        return <div
          className="faqTitleList"
          onClick={e => {
            this.setState({
              faqSideOpen: undefined,
              dataFocus: rowData,
            })
          }}
        >
          <img src={rowData.img} />
          <div className={this.state.dataFocus === rowData?"focusTitle":""}>
          {rowData.name} 
          </div>
        </div>
      })}
    </div>
  }
  renderData() {
    return <div>
      <Head>
        <style type="text/css">{`
          .faqTitleList{
            margin-bottom: 27px;
            font-size: 16px;
            cursor: pointer;
          }
          .faqTitleList > img{
            width: 24px;
            height: 24px;
            background-color: #eee;
            margin-right: 15px;
          }
          .faqTitleList > div{
            display: inline-block;
          }
          .faqTitleList > .focusTitle{
            color:${config.colorConfig.main};
          }
          h1{
            margin-bottom: 36px;
            padding-bottom: 12px;
            font-size: 32px;
            text-align: center;
            color: ${config.colorConfig.main};
            border-bottom: 1px solid #eee
          }
          .faqRow{
            position: relative;
            margin-left: 0;
            margin-right: 0
          }
          h3{
            margin-bottom: 25px;
            color: ${config.colorConfig.main};
            margin-top: 0;
            font-size: 20px;
          }
          .faqEle{
            padding-top: 16px;
            border-bottom: 1px solid #eee;
          }
          .faqEleQuestion{
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            cursor: pointer;
          }
          .faqEleQuestion > i{
            transition-duration: 0.5s;
            font-size: 24px;
          }
          .faqEleQuestion > .focus{
            transform: rotate(180deg)
          }
          .faqEleCollapse{
            background-color: #f5f5f5;
            padding: 20px 25px;
          }
          .faPhuotvivuBtn{
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
      <div className="pdBottom24 pdTop24">
        <div className="pageSmallWidth pdTop12 pdBottom12 backgroundWhite">
          <h1>
            {Language.getLanguage(LanguageIdMap.FAQ_DESC)}
          </h1>
          <div className='row faqRow'>

            {common.checkMobile()
              ? <div>
                <Drawer
                  containerStyle={this.state.faqSideOpen ? { transform: "translate(0px, 0px)" } : { transform: "translate(-120%, 0px)" }}>
                  <div style={{ padding: 12, paddingBottom: 36 }}>
                    {this.renderFAQTitleList()}
                  </div>
                </Drawer>
                <div style={{ position: "fixed", bottom: 12, left: 0, textAlign: "center", zIndex: 2000, width: "100%" }}>
                  <div
                    style={{
                      display: "inline-block", color: config.colorConfig.main, boxShadow: "rgb(0, 0, 0) 2px 2px 3px"
                      , backgroundColor: "#fff", padding: "5px 18px ", borderRadius: 12
                    }}
                    onClick={e => {
                      this.setState({ faqSideOpen: !this.state.faqSideOpen })
                    }}
                  >{Language.getLanguage(LanguageIdMap.COMMON_QUESTIONS)}</div>
                </div>
              </div>
              : <div className='col-sm-3'>
                {this.renderFAQTitleList()}
              </div>}

            <div className={common.checkMobile() ? '' : 'col-sm-9'} >
              <h3>
                {this.state.dataFocus ? this.state.dataFocus.name : Language.getLanguage(LanguageIdMap.COMMON_QUESTIONS)}
              </h3>
              {this.state.dataFocus && this.state.dataFocus.data && this.state.dataFocus.data.map((rowData, rowIndex) => {
                return <div className="faqEle">
                  <div className="faqEleQuestion"
                    onClick={e => {
                      rowData._isOpen = !rowData._isOpen;
                      this.forceUpdate();
                    }}
                  >
                    <div>{rowData.question}</div>
                    <i className={"fa fa-angle-down "+(rowData._isOpen?"focus":"")} />
                  </div>
                  <Collapse in={rowData._isOpen}>
                    <div>
                      <div className="faqEleCollapse">
                        {rowData.answer}
                      </div>
                    </div>
                  </Collapse>
                </div>
              })}
            </div>
          </div>

          <div>
            <a
              href={config.domain + config.shortUrl.contact}
              className="faPhuotvivuBtn"
              onClick={e => {
                e.preventDefault();
                window.open(config.domain + config.shortUrl.contact, '_blank');
              }}
            >
              {Language.getLanguage(LanguageIdMap.QA_PHUOTVIVU)}
            </a>
          </div>

        </div>
      </div>
      {this.renderFooter()}
    </div>
  }
}

export default Display;

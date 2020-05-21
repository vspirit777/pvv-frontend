

import React, { PropTypes, Component } from 'react';

import { api, config } from '../../config';
import LanguageIdMap from '../../language/LanguageIdMap'
import Language from '../../language/Language'
import SuperComponent from '../../components/SuperComponent';
import Head from 'next/head';

class Display extends SuperComponent {
  constructor(props, context) {
    super(props, context);

    this.props.initPropsData.seoTitle = Language.getLanguage(LanguageIdMap.CONTACT_US);
    this.props.initPropsData.seoDescription = Language.getLanguage(LanguageIdMap.CONTACT_US);

    this.canNotRenderFooter = true;
  }
  renderData() {
    return <div>
      <Head>
        <style type="text/css">{`
        .contactBody{
          padding-top: 12px;
          padding-bottom: 48px;
          background-color: #fff;
        }
        h1{
          margin-bottom: 24px;
          font-size: 48px;
          text-align: center;
        }
        .contactOverContainer{
          margin-bottom:48px;
        }
        .contactOverContainer > div{
          padding-left:8px;
          padding-right:8px;
        }
        .contactOverContainer > div > div{
          border: 1px solid #8d8b8a;
          padding:25px;
        }
        .contactOverContainer > div > div > img,.contactOverContainer > div > div > i{
          color: #0ab596;
          float: left;
          height: 50px;
          font-size: 50px;
          margin-right: 24px;
        }
        .contactEleTitle {
          font-size: 16px;
          line-height: 1.5;
        }
      `}</style>
      </Head>
      <div className="mgBottom48 fontsize18">
        <div className="pageSmallWidth contactBody " >
          <h1>
            {Language.getLanguage(LanguageIdMap.NEED_HELP)}
          </h1>
          <div className="textAlignCenter">
            <div>{Language.getLanguage(LanguageIdMap.PROFESSOR_WILLING_TO_SUPPORT)}</div>
            <div>{Language.getLanguage(LanguageIdMap.SUPPORT_TIME_WEEKDAY_DES)}</div>
            <div>{Language.getLanguage(LanguageIdMap.SUPPORT_TIME_WEEKEND_DES)}</div>
          </div>
        </div>

        <div className='row pageSmallWidth contactOverContainer'>
          <div className='col-sm-4'>
            <div>
              <img src={"/static/images/fb_messenger.png"} />
              <div className="contactEleTitle">
                {Language.getLanguage(LanguageIdMap.ASK_ON_FACEBOOK)}
              </div>
              <div>
                <a href={"http://www.fb.com/msg/phuotvivu"}
                  onClick={e => {
                    e.preventDefault();
                    window.open("http://www.fb.com/msg/phuotvivu", '_blank');
                  }}
                >
                  {Language.getLanguage(LanguageIdMap.VIA_FACEBOOK_MESSENGER)}
                </a>
              </div>
            </div>
          </div>
          <div className='col-sm-4'>
            <div>
              <i className="fa fa-phone" />
              <div className="contactEleTitle">
                {Language.getLanguage(LanguageIdMap.CONTACT_BY_TELEPHONE)}
              </div>
              <div>
                <a href={"tel:" + config.phoneContact}
                  onClick={e => {
                    e.preventDefault();
                    window.open("tel:" + config.phoneContact, '_blank');
                  }}
                >
                  {config.phoneContact}
                </a>
              </div>
            </div>
          </div>
          <div className='col-sm-4'>
            <div>
              <i className="fa fa-envelope" />
              <div className="contactEleTitle">
                {Language.getLanguage(LanguageIdMap.CONTACT_BY_EMAIL)}
              </div>
              <div>
                <a href={"mailto:" + config.emailContact}
                  onClick={e => {
                    e.preventDefault();
                    window.open("mailto:" + config.emailContact, '_blank');
                  }}
                >
                  {config.emailContact}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='row pageSmallWidth'>
          <div className='col-sm-6 pdLeft8 pdRight8'>
            <div className="mgBottom32">
              <h2>{Language.getLanguage(LanguageIdMap.txtAddress)}</h2>
              <div>Công ty TNHH PHƯỢT VI VU</div>
              <div>MST: 0313594739</div>
              <div>Địa chỉ: Tầng 3 tòa nhà Khánh Huy, số 4 Đỗ Thúc Tịnh, P. 12, Q. Gò Vấp, TP. HCM.</div>
            </div>
          </div>

          <div className='col-sm-6 pdLeft8 pdRight8'>
            <iframe className="border0"
              src="https://www.google.com/maps/embed/v1/place?q=T%E1%BA%A7ng%203%20t%C3%B2a%20nh%C3%A0%20Kh%C3%A1nh%20Huy%2C%20s%E1%BB%91%204%20%C4%90%E1%BB%97%20Th%C3%BAc%20T%E1%BB%8Bnh%2C%20P.%2012%2C%20Q.%20G%C3%B2%20V%E1%BA%A5p%2C%20TP.%20HCM&key=AIzaSyCNtnvoJba7HnX1xaJnpuPnH6jcVNbVFQE"
              width="100%" height="450"
              allowFullScreen="allowfullscreen"  >
            </iframe>
          </div>
        </div>
      </div>

      {this.renderFooter()}
    </div>
  }

}

export default Display;

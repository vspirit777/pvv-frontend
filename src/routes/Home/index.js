import React, { PropTypes, Component } from 'react';
import $ from "jquery";
import MailchimpSubscribe from "react-mailchimp-subscribe"
import {
  FormControl,
} from 'react-bootstrap';
import common from '../../data/common';
import { api, config } from '../../config';
import LanguageIdMap from '../../language/LanguageIdMap'
import Language from '../../language/Language'
import ImageGallery from 'react-image-gallery';
import IconMenu from 'material-ui/IconMenu';
import SuperComponent, { CustomDateInput } from '../../components/SuperComponent';
import { RaisedButton } from 'material-ui';
import {
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import SeachSuggestionPopup from '../../components/searchSuggestionPopup';
import Router from 'next/router'
import Head from 'next/head';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

class SearchInputComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }
  renderCssInHeader() {
    return <Head>
      <style type="text/css">{`
    h1 {
      font-size: `+ (common.getViewportWidth() >= 800 ? "4.1667em" : common.getViewportWidth() >= 600 ? "3.1667em" : "2.1em") + `;
      font-weight: bold;
      text-align: center;
      line-height: 1.25em;
      margin-bottom: 15px;
    }
    #searchInput{
      border-radius: 4px; background-color: #fff; width: 100%;
    }
  `}</style>
    </Head>
  }
  clickInput(retry = false) {
    // this.props.holderComponent.setState({}, function () {
    let scrollTop;
    if (!common.checkMobile()) {
      scrollTop = $('#searchInput').offset().top - this.props.holderComponent.getTopHeightNav() - 50;
    } else {
      scrollTop = $('#searchInput').offset().top - this.props.holderComponent.getTopHeightNav();
    }
    $('html, body').animate({ scrollTop: scrollTop }, 150)
  }
  render() {
    return <div>
      <Head>
        <style type="text/css">{`
      .suggestionIcon{
        position: absolute;
        top: 0;
        right: 0;
        width:`+ (common.getViewportWidth() >= 500 ? 120 : 50) + `px;
        cursor: pointer;
        height: 48px;
        background-color: ${config.colorConfig.main};
        text-align: center
    }
    .suggestionIcon > i {
      margin-top: 15px;
      color: #fff;
      fontSize: 15px;
    }
    .searchContainer {
      position: relative
    }
  `}</style>
      </Head>
      <div className="searchContainer">
        {!common.checkServer() && <SeachSuggestionPopup
          className="focusBorderColorDefault hoverBorderColorDefault"
          id="searchInput"
          underlineShow={false}
          onClick={this.clickInput.bind(this)}
          placeholder={Language.getLanguage(LanguageIdMap.SEARCH_BY_DESTINATION_ACTIVITY)}
          hintStyle={{ bottom: 2, fontSize: 14 }}
          textFieldStyle={{
            paddingLeft: 12, paddingRight: 12, borderRadius: 2, height: 48, width: "100%"
          }}
          style={{ borderRadius: 4, backgroundColor: "#fff", width: "100%" }}
        />}
        <div className="suggestionIcon">
          <i className="fa fa-search" />
        </div>
      </div>
    </div>
  }
}

class Home extends SuperComponent {
  constructor(props, context) {
    super(props, context);

    this.props.initPropsData.seoTitle = config.metaTitle;
    this.props.initPropsData.seoDescription = config.metaDesc;

    if (!this.state.common) {
      this.state.common = common;
    }
  }

  renderCssInHeader() {
    return [<style type="text/css">{`
    h1 {
      font-size: `+ (common.getViewportWidth() >= 800 ? "4.1667em" : common.getViewportWidth() >= 600 ? "3.1667em" : "2.1em") + `;
      font-weight: bold;
      text-align: center;
      line-height: 1.25em;
      margin-bottom: 15px;
    }
    .bannerDescContainer{
      text-align: center;
      font-size: ${common.getViewportWidth() >= 800 ? "1.5em" : "1em"};
      margin-bottom: 40px;
      font-weight: bold;
    }
    .whyPVVContainer{
      display: ${common.getViewportWidth() >= 900 ? "flex" : undefined};
      margin-bottom: 60px;
      justify-content: space-between;
      flex-wrap: wrap;
      font-weight: bold;
      font-size: 16px;
    }
    .whyPVVCheck{
      font-size: 26px;
      color: ${config.colorConfig.main};
      margin-top: -2px;
      margin-right: 12px;
    }
    .mailContainer{
      display: flex;
      margin-bottom: 80px;
      ${Math.round(common.getViewportWidth()) < 800 ? "flex-wrap: wrap" : ""}
    }
    .mailContainerImgContainer{
      height: 160px;
      padding: 10px;
      margin-right: 54px;
    }
    .exploreAllDestinationContainer{
      display: inline-block;
      padding: 8px 32px;
      cursor: pointer;
      border: 1px solid ${config.colorConfig.main};
      color: ${config.colorConfig.main};
      font-size: 18px;
      margin-top: 0
    }
  `}</style>,
    <link rel="stylesheet" href="/static/css/home.css" />
    ]
  }
  static getInitialPromiseListForProps(context) {
    return [common.fetcher(
      config.api.hostType.product_url,
      config.api.hostEndPoint.ads,
      "get",
      { id: 1 }
    )
      .then((jsonRes) => {
        console.log(jsonRes.data);
        common.initPropsData.ads = jsonRes.data;
      })
      .catch((err) => {
        console.log("error ads:" + err)
      })
    ]
  }
  renderItemGaleryImage(item = {}) {
    return <div className="itemGalleryContainer">
      <div>
        <img src={item.original} />
      </div>
      {/* {item.imageTitle&&<div style={{textAlign:"center",width:"100%",marginTop:12,height:12}}>{item.imageTitle}</div>} */}
    </div>
  }
  getBannerImageList() {
    return [{
      original: "/static/images/banner/home.jpg",
      renderItem: this.renderItemGaleryImage.bind(this)
    }]
  }
  renderBanner() {
    // let imageGaleryList = this.getBannerImageList();
    return <div className="posRelative">
      <div className="itemGalleryContainer" >
        <div>
          <img src={"/static/images/banner/home.jpg"} />
        </div>
      </div>
      <div className='homeGlass' />
      <div className='bannerContainer'>
        <div className="pageSmallWidth">
          <div>
            <div className="colorWhite">
              <h1>
                {Language.getLanguage(LanguageIdMap.HOME_BANNER_TITLE)}
              </h1>
              <div className='bannerDescContainer'>
                <h2 className="bannerDescEle">
                  {Language.getLanguage(LanguageIdMap.HOME_BANNER_DES_LINE_1)}
                </h2>
                <h2 className="bannerDescEle">
                  {Language.getLanguage(LanguageIdMap.HOME_BANNER_DES_LINE_2)}
                </h2>
              </div>
              {!common.checkServer() && <SearchInputComponent holderComponent={this} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  }
  renderDestinationCard(data) {
    return <div className='cardContainer'>
      <img
        alt={data.photoInfo ? data.photoInfo.altText : undefined}
        src={data.photoInfo ? data.photoInfo.thumbUrl : undefined}
      />
      <div>
        <div className="twoLineText">
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={"topTooltip"}>
              {data.briefName}
            </Tooltip>}
          >
            <a className="cardContainerOverlay">{data.briefName}</a>
          </OverlayTrigger>
        </div>
      </div>
      <a
        href={config.shortUrl.destination + "/" + data.alias}
        onClick={e => {
          e.preventDefault();
          Router.push(config.shortUrl.destination + `?alias=` + data.alias, config.shortUrl.destination + `/` + data.alias)
        }}
      />
    </div>
  }
  renderTypeOfTripCard(data) {
    return <a style={{ color: "inherit", cursor: "pointer" }} href={config.shortUrl.typeOfTrip + "/" + data.alias}
      onClick={e => {
        e.preventDefault();
        Router.push(config.shortUrl.typeOfTrip + `?alias=` + data.alias, config.shortUrl.typeOfTrip + `/` + data.alias)
      }}
    >
      <div className='cardContainer'>
        <img
          alt={data.photoInfo ? data.photoInfo.altText : undefined}
          // style={{ position: "absolute", width: "100%", height: "100%" }}
          src={data.photoInfo ? data.photoInfo.thumbSecondUrl : undefined}
        />
      </div>
      <div
      // style={{
      //   lineHeight: 1.4, fontSize: 14, overflowX: "hidden", textOverflow: "ellipsis", fontWeight: "bold",
      //   marginTop: 8, marginBottom: 8, textAlign: "center"
      // }}
      >
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={"topTooltip2"}>
            {data.briefName}
          </Tooltip>}
        >
          <a style={{
            color: "#000"
          }}>{data.briefName}</a>
        </OverlayTrigger>
      </div>
    </a>
  }
  renderData() {

    return <div>
      <div className="pageSmallWidth">
        <div className='whyPVVContainer'>
          <div className="paddingTopBot16">
            {Language.getLanguage(LanguageIdMap.WHY_PHUOTVIVU)}
          </div>
          {[Language.getLanguage(LanguageIdMap.CHOOSE_BY_LOCAL_EXPERT),
          Language.getLanguage(LanguageIdMap.ALWAY_COMPETITIVE_PRICE),
          Language.getLanguage(LanguageIdMap.FAST_EASY_BOOKING)].map((value, index) => {
            return <div className="paddingTopBot16 displayFlex" key={index}>
              <i className="fa fa-check whyPVVCheck" />
              {value}
            </div>
          })}
        </div>
      </div>
      {common.topDestination && <div>
        <h2 className='topDestinationContainer'>
          {Language.getLanguage(LanguageIdMap.TOP_DESTINATION)}
        </h2>
        <div className="pageSmallWidth">
          {this.renderOneRow(common.topDestination, {
            cardRender: this.renderDestinationCard.bind(this),
            loadMore: function () {
              common.loadingMoreTopDestination(this);
            }.bind(this)
          })}
          {this.renderOneRow(common.topDestinationSecondRow, { cardRender: this.renderDestinationCard.bind(this), })}
        </div>

        <div className="homeSection">
          <h2 className="hoverChangeButtonStyle0 exploreAllDestinationContainer"
            onClick={e => {
              if (common.checkMobile()) {
                Router.push(config.shortUrl.search)
                return;
              }
              this.setState({}, function () {
                let scrollTop;
                if (common.getViewportHeight() >= 675) {
                  scrollTop = $('#searchInput').offset().top - this.getTopHeightNav() - 50;
                } else {
                  scrollTop = $('#searchInput').offset().top - this.getTopHeightNav();
                }
                $('html, body').animate({ scrollTop: scrollTop }, 250,
                  function () {
                    if (document.getElementById("searchInput")) {
                      document.getElementById("searchInput").focus();
                    }


                  }.bind(this));
              }.bind(this))
            }}
          >
            <i className="fa fa-map-marker exploreAllDestination" />
            {Language.getLanguage(LanguageIdMap.EXPLORE_ALL_DESTINATION)}
          </h2>
        </div>
      </div>}

      <div className="homeSection pageSmallWidth">
        <div className="row">
          <div className='col-md-3 col-sm-6 posRelative hoverMoveTop12' >
            <a href={"https://phuotvivu.com/blog/"}
              onClick={e => {
                e.preventDefault();
                window.open("https://phuotvivu.com/blog/", '_blank');
              }}>
              <img src={"/static/images/banner/blog.jpg"} />
              <div className="posAbsolute bottom20 colorWhite">
                <div className="pdLeft16 pdRight16 alignCenter">
                  <h4 className="mgBottom16 fontWeightBold">
                    Xem blog của Phuotvivu
                  </h4>
                  <p>
                    Xem các bài hướng dẫn du lịch tự túc, lịch trình, tips du lịch
                  </p>
                </div>
              </div>
            </a>
          </div>
          <div className='col-md-3 col-sm-6 posRelative hoverMoveTop12' >
            <a href={"https://phuotvivu.com/ebook/"}
              onClick={e => {
                e.preventDefault();
                window.open("https://phuotvivu.com/ebook/", '_blank');
              }}>
              <img src={"/static/images/banner/ebook.jpg"} />
              <div className="posAbsolute bottom20 colorWhite">
                <div className="pdLeft16 pdRight16 alignCenter">
                  <h4 className="mgBottom16 fontWeightBold">
                  Tải ebook hướng dẫn du lịch miễn phí
                  </h4>
                  <p>
                  Nhỏ gọn, đọc trên điện thoại, đầy đủ chỗ ăn, chơi, đi lại, lịch trình, khách sạn
                  </p>
                </div>
              </div>
            </a>
          </div>
          <div className='col-md-3 col-sm-6 posRelative hoverMoveTop12' >
            <a href={"https://phuotvivu.com/blog/lam-sao-de-nhan-tien-thuong-du-lich-mien-phi/"}
              onClick={e => {
                e.preventDefault();
                window.open("https://phuotvivu.com/blog/lam-sao-de-nhan-tien-thuong-du-lich-mien-phi/", '_blank');
              }}>
              <img src={"/static/images/banner/nhantienthuong.jpg"} />
              <div className="posAbsolute bottom20 colorWhite">
                <div className="pdLeft16 pdRight16 alignCenter">
                  <h4 className="mgBottom16 fontWeightBold">
                  Nhận tiền thưởng du lịch miễn phí
                  </h4>
                  <p>
                  Bằng cách mời bạn bè, bạn nhận được 50K tiền thưởng
                  </p>
                </div>
              </div>
            </a>
          </div>
          <div className='col-md-3 col-sm-6 posRelative hoverMoveTop12' >
            <a href={"https://phuotvivu.com/profile/credit"}
              onClick={e => {
                e.preventDefault();
                window.open("https://phuotvivu.com/profile/credit", '_blank');
              }}>
              <img src={"/static/images/banner/tienthuong.jpg"} />
              <div className="posAbsolute bottom20 colorWhite">
                <div className="pdLeft16 pdRight16 alignCenter">
                  <h4 className="mgBottom16 fontWeightBold">
                  Nhận tiền thưởng du lịch sau khi hoàn tất 1 hoạt động du lịch
                  </h4>
                  <p>
                  Sau khi hoàn tất 1 hoạt động du lịch, bạn sẽ nhận tiền thưởng tương ứng
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {this.props.initPropsData.ads && this.props.initPropsData.ads.active != 0 && <div className="pageSmallWidth mgBottom80">
        <a href={this.props.initPropsData.ads.url}>
          <img src={this.props.initPropsData.ads.photoUrl} alt="invite" className="adsImage"
            onClick={e => {
              e.preventDefault();
              // if (!this.props.initPropsData.ads.url) {
              //   return;
              // }
              // if (this.props.initPropsData.ads.url.indexOf(window.location.host) >= 0) {
              //   let tmpArr = this.props.initPropsData.ads.url.split(config.domain)
              //   if (tmpArr[1] && tmpArr[1].length > 0 && tmpArr[1].charAt(0) !== "/") {
              //     tmpArr[1] = "/" + tmpArr[1]
              //   }
              //   Router.push(tmpArr[1])
              //   return;
              // } else if (this.props.initPropsData.ads.url.indexOf("http:") < 0 && this.props.initPropsData.ads.url.indexOf("https:") < 0) {
              //   if (this.props.initPropsData.ads.url.length > 0 && this.props.initPropsData.ads.url.charAt(0) !== "/") {
              //     this.props.initPropsData.ads.url = "/" + this.props.initPropsData.ads.url
              //   }
              //   Router.push(this.props.initPropsData.ads.url)
              //   return;
              // }
              window.open(this.props.initPropsData.ads.url, '_blank');
            }}
          />
        </a>
      </div>}

      {/* {common.typeOfTripFlat && <div style={{ marginBottom: 50 }}>
        <div style={{ fontSize: 32, textTransform: "uppercase", paddingBottom: 32, textAlign: "center", fontWeight: 500 }}>
          {Language.getLanguage(LanguageIdMap.DISCOVER_YOUR_WORLD)}
        </div>
        <div style={{ ...config.pageSmallWidthStyle }}>
          {this.renderOneRow(common.typeOfTripFlat
            , { rowStyle: { marginBottom: 12 }, cardRender: this.renderTypeOfTripCard.bind(this), })}
          {this.renderOneRow(common.typeOfTripFlatSecondRow,
            { rowStyle: { marginBottom: 12 }, cardRender: this.renderTypeOfTripCard.bind(this), })}
        </div>
      </div>} */}

      {/* url={"//mc.us18.list-manage.com/subscribe/post?u=" + config.mailChimp.u + "&id=" + config.mailChimp.id} */}
      <div className="pageSmallWidth">
        <MailchimpSubscribe
          url={config.mailChimp.url + "?u=" + config.mailChimp.u + "&id=" + config.mailChimp.id}
          render={({ subscribe, status, message }) => (
            <div>
              <div className="mailContainer">
                <div className="mailContainerImgContainer">
                  <img src={"/static/dang_ky.jpg"}
                    alt={"Đăng ký nhận bản tin du lịch"}
                    className="mailImage" />
                </div>
                <div >
                  <h2 className="mailTitle">
                    {Language.getLanguage(LanguageIdMap.LOOKING_FOR_INSPIRATION)}
                  </h2>
                  <p className="mailDesc">
                    {Language.getLanguage(LanguageIdMap.SUBSCRIBE_DES_TEXT)}
                  </p>
                  <form onSubmit={e => {
                    e.preventDefault();
                    subscribe({
                      MERGE0: this.state.mailchimpSubscribeEmail
                    })
                  }}>
                    <div className="displayFlex flexWrapWrap">
                      <FormControl
                        className="focusBorderColorDefault mailInput"
                        type="text"
                        value={this.state.mailchimpSubscribeEmail}
                        placeholder={Language.getLanguage(LanguageIdMap.placeholder_enter_email)}
                        onChange={e => {
                          this.setState({ mailchimpSubscribeEmail: e.target.value })
                        }}
                      />
                      <div style={{ marginTop: 16, }}>
                        {!common.checkServer() && <RaisedButton
                          buttonStyle={{ ...config.buttonStyle[0], padding: 0, height: 48, }}
                          className='mailButton'
                          type="submit"
                        >{Language.getLanguage(LanguageIdMap.SUBSCRIBE)}</RaisedButton>}
                      </div>
                    </div>
                  </form>
                  {status === "sending" && <div style={{ color: "blue" }}>{Language.getLanguage(LanguageIdMap.SUBSCRIBING)}...</div>}
                  {status === "error" && <div style={{ color: "red" }} dangerouslySetInnerHTML={{ __html: message }} />}
                  {status === "success" && <div style={{ color: "green" }}>{Language.getLanguage(LanguageIdMap.SUBSCRIBED)} !</div>}
                </div>
              </div>
            </div>
          )}
        />
      </div>

    </div>
  }

}

export default Home;

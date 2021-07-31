/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
// import Sidebar from '../Sidebar';
import Language from '../../language/Language'
import LanguageIdMap from '../../language/LanguageIdMap'
import common from '../../data/common'
import { config } from '../../config'
import HoverOpenDropdownMenu from '../HoverOpenDropdownMenu'

import {
  Navbar,
} from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import SearchSuggestionPopup from '../searchSuggestionPopup';
import Router from 'next/router'
import Head from 'next/head';


// import { connect } from 'react-redux';
// function navbarHeaderRemoveContainer() {
//   console.log("aaaaaaaaaaaaaaaaaaa")
//   $("Navbar .navbarHeader").removeClass('container');
//   // document.getElementById("navbarHeader").classList.remove('container');

// }
class Header extends Component {
  constructor(props) {
    super(props);
    common.headerComponent = this;
    this.needLessMarginTopDiscovery = 0;
    this.state = {
      ...props,
      searchFocusing: false,
    }

    this.addShoppingCartCallbackBindThis = this.addShoppingCartCallback.bind(this)
  }
  resizeViewport(e) {
    if ((Math.round(common.getViewportWidth()) != Math.round(common.getViewportWidth())
      || Math.round(common.getViewportHeight()) != common.windowHeight
      || Math.round(common.getViewportWidth()) != common.windowWidth)
      && !common.noResizeWhenChangeSize) {
      // console.log("change size from :" + Math.round(common.getViewportWidth()) + "-->" + Math.round(common.getViewportWidth()) + ";"
      //   + common.windowHeight)
      common.windowWidth = Math.round(common.getViewportWidth());
      common.windowHeight = Math.round(common.getViewportHeight());
      if (common.currentMainComponent) {
        common.currentMainComponent.changeSizeCallback();
      }
      this.forceUpdate();
    }
  }

  addShoppingCartCallback() {
    this.forceUpdate();
  }
  componentWillMount() {
    common.addGetShoppingCartCallback(this.addShoppingCartCallbackBindThis)
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeViewport.bind(this))
    common.removeGetShoppingCartCallback(this.addShoppingCartCallbackBindThis)
  }

  componentDidMount() {
    try {
      window
    } catch (error) {
      return;
    }
    window.addEventListener("resize", this.resizeViewport.bind(this))
    $("div .container").removeClass('container');
    this.updateUserProfile();
  }
  updateUserProfile(forceUpdate = false) {
    if (forceUpdate == true) {
      common.userProfileData = undefined;
    }
    // console.log(common.userProfileData)
    if (window.localStorage.getItem("uid") === undefined
      || window.localStorage.getItem("uid") === null
      || common.userProfileData) {
      return;
    }
    // console.log("get profile------------------------------------------")
    let uid = window.localStorage.getItem("uid");

    common.fetcher(
      config.api.hostType.product_url,
      config.api.hostEndPoint.balance,
      "get"
    ).then((jsonRes) => {
      common.userBalance = jsonRes.data
      if (this.props.holderComponent.forceUpdate) {
        this.props.holderComponent.forceUpdate();
      }
    })
      .catch((err) => {
      })

    common.getShoppingCartList();
    common.userProfileData = {};
    common.fetcher(
      config.api.hostType.profile_url,
      config.api.hostEndPoint.profile,
      "get",
      {
        profileId: uid
      }
    )
      .then((jsonRes) => {
        common.userProfileData = jsonRes.data;
        if (this.props.holderComponent) {
          this.props.holderComponent.hasUpdateDataFromServer = false;
          if (this.props.holderComponent.getUserDataCallback) {
            this.props.holderComponent.getUserDataCallback();
          } else if (this.props.holderComponent.forceUpdate) {
            this.props.holderComponent.forceUpdate();
          }
        }
        if (common.userProfileData && common.userProfileData.displayName) {
          window.localStorage.setItem("loginUser", common.userProfileData.displayName)
          if (common.userProfileData.displayName) {
            let firstNameArr = common.userProfileData.displayName.split(" ")
            window.localStorage.setItem("firstName", firstNameArr[0])
          }
        } else {
          common.userProfileData = {}
        }

        this.forceUpdate();
      })
      .catch((err) => {
        console.log("error pro3:" + err)
        common.userProfileData = undefined;
        this.forceUpdate();
      })


  }
  render() {
    // console.log(common.shoppingCart)
    // if (!common.windowWidth) {
    //   common.windowWidth = common.getViewportWidth();
    //   common.windowHeight = common.getViewportHeight();
    //   if (common.currentMainComponent) {
    //     common.currentMainComponent.forceUpdate();
    //   }
    // }
    return (
      <div>
        <Head>
          <style type="text/css">{`
          
          ${this.state.searchFocusing
              ? "body > div:last-child > div { left: unset !important; right: 0 !important; width: unset !important;}"
              : ""
            }
          .navbarHeader{
            border-bottom: 1px solid #e4e4e4;
            box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
            margin-bottom: 0 !important;
            background-color: #fff;
            z-index: 100;
            transition-duration: 0.5s;
            overflow-y: hidden;
          }
          .navLogo{
            width: ${common.getViewportWidth() >= config.sizeConfig.widthMd ? "20%" : "40%"};
            border-radius: 2px;
          }
          .navLogo > div {
            color: #000;
          }
          .navLogo > div > img{
            max-width : 100%;
            max-height: 98px;
          }
          .rightBarContainer{
            width: 20%;
            text-align: right;
          }
          @media only screen and (max-width: ${config.sizeConfig.widthPC - 1}px) {
            .rightBarContainer {
              width: 80%;
            }
          }
          .rightBarContainer > div:first-child{
            margin-right: -12px;
          }
          .rightBarContainer > div:nth-child(2) {
            margin-right: -12px;
          }
          .hotline {
            font-size: 19px;
            white-space: nowrap;
            text-align: right;
          }
          .hotline > a {
            color: ${config.colorConfig.main};
          }
          .banner {
            width: 50%;
            margin-left: 10%;
            padding: 0;
          }
          @media only screen and (max-width: ${config.sizeConfig.widthPC - 1}px) {
            .banner {
              display: none;
            }
            .hotline {
              display: none;
            }
          }
          
          .banner > img {
            max-width: 100%;
            max-height: 98px;
          }
          .linkBelowBanner {
            font-size: 20px;
            display: flex;
            justify-content: space-between;
            color: #fff;
          }
          @media only screen and (max-width: ${config.sizeConfig.widthPC - 1}px) {
            .linkBelowBanner {
              font-size: 14px;
            }
          }
          .linkBelowBanner > div {
            background: ${config.colorConfig.main};
            width: 100%;
            margin: 1px;
            padding: 6px;
            text-align: center;
          }
          .linkBelowBanner > div > a {
            color: inherit;
            text-transform: uppercase;
          }
          .linkBelowBanner > div:first-child {
            border-top-left-radius: 24px;
          }
          .linkBelowBanner > div:nth-child(3) {
            border-top-right-radius: 24px;
          }
          .questionRight{
            cursor: pointer;
            margin-right: 12px;
            font-size: 20px;
          }
          .shoppingRight{
            display: flex; 
            position: relative;
            margin-top: 12px;
          }
          .shoppingRight > i{
            cursor: pointer;
            margin-right: 12px;
            font-size: 20px;
          }
          .shoppingRightChip{
            position: absolute;
            background-color: #ff5722;
            color: #fff;
            top: -4px;
            right: 4px;
            font-size: 12px;
            line-height: 16px;
            border-radius: 100%;
            padding: 0px 5px
          }
          .loginUserRight{
            display: flex;
            marginTop: 12px;
          }
          .loginUserRight > i{
            cursor: pointer;
            font-size: 20px;
            margin-right:12px;
          }

          .caretRightDown{
            fontSize: 15px;
            position: absolute;
            top: 5px;
            right: 0 ;
          }
          .headerSearchForm{
            position: relative;
          }
          .headerSearchForm > div{
            padding-left: 12px;
            padding-right: 12px;
            width: unset !important;
            ${(this.state.searchFocusing && common.checkMobile()) ? "margin-left: -23px" : ""}
          }
          .headerSearchForm > i{
            font-size: 22px;
            top: 7px;
            right: 19px;
            position: absolute;
            color: rgb(170, 170, 170);
            pointer-events: none;
          }
          .headerSearchForm > div > div > input {
            ${!this.state.searchFocusing ? "color: transparent !important" : ""};
          }
          .headerSearchForm > .focus{
            right: 18px;
            top: 8px;
            font-size: 15px;
          }
          .mainheader {
            transition: 0.2s;
            display: flex;
          }
          #pvvBlogCamnangContainer{
            overflow: hidden;
          }
          @media only screen and (max-width: ${config.sizeConfig.widthPC - 1}px) {
            #pvvBlogCamnangContainer{
              display: none;
            }
          }
      `}</style>
        </Head>
        <Navbar id="header" className="navbar-fixed-top navbar navbarHeader">
          <div className='mainheader pageSmallWidth'>
            <a
              href={config.shortUrl.home}
              className="navLogo"
              onClick={e => {
                e.preventDefault();
                Router.push(config.shortUrl.home)
              }}
            >
              <div>
                <img src={"/static/logo.png"} />
              </div>
            </a>

            <div className={"banner"}>
              <img src={"/static/banner.jpg"} />
            </div>

            {!common.checkServer()
              && <div className="rightBarContainer">
                <div>
                  <HoverOpenDropdownMenu
                    iconButtonElement={<i className="fa fa-question-circle-o hoverDefaultColor questionRight">
                    </i>}
                    data={[
                      <a href={config.shortUrl.faq}>
                        <MenuItem className="hoverDefaultColor"
                          onClick={(event) => {
                            event.preventDefault();
                            Router.push(config.shortUrl.faq)
                          }}
                          style={{ height: 40, minWidth: 180, }}
                        >
                          <span>
                            {Language.getLanguage(LanguageIdMap.HELP_CENTER)}
                          </span>
                        </MenuItem>
                      </a>,
                      <a href={config.shortUrl.contact}>
                        <MenuItem className="hoverDefaultColor"
                          onClick={(event) => {
                            event.preventDefault();
                            Router.push(config.shortUrl.contact)
                          }}
                          style={{ height: 40, minWidth: 180, }}
                        >
                          <span>
                            {Language.getLanguage(LanguageIdMap.CONTACT_US)}
                          </span>
                        </MenuItem>
                      </a>,
                      <a href={config.shortUrl.aboutUs}>
                        <MenuItem className="hoverDefaultColor"
                          onClick={(event) => {
                            event.preventDefault();
                            Router.push(config.shortUrl.aboutUs)
                          }}
                          style={{ height: 40, minWidth: 180, }}
                        >
                          <span>
                            {Language.getLanguage(LanguageIdMap.ABOUT_US)}
                          </span>
                        </MenuItem>
                      </a>,
                      <a href={"http://www.fb.com/msg/phuotvivu"} >
                        <MenuItem className="hoverDefaultColor"
                          onClick={(event) => {
                            event.preventDefault();
                            window.open("http://www.fb.com/msg/phuotvivu", '_blank');
                          }}
                          style={{ height: 40, minWidth: 180, }}
                        >
                          <span>
                            {Language.getLanguage(LanguageIdMap.ASK_ON_FACEBOOK)}
                          </span>
                        </MenuItem>
                      </a>,
                    ]}
                  />
                  <HoverOpenDropdownMenu
                    iconButtonElement={<div className="shoppingRight">
                      <i className="fa fa-shopping-cart hoverDefaultColor"
                        onClick={e => {
                          e.preventDefault();
                          Router.push(config.shortUrl.shoppingCart)
                        }}
                      />
                      {common.shoppingCart && common.shoppingCart.orderOrderProduct && common.shoppingCart.orderOrderProduct.length > 0
                        && <div className="shoppingRightChip">
                          {common.shoppingCart.orderOrderProduct.length}
                        </div>}
                    </div>}
                    menuStyle={{}}
                    data={<div style={{
                      marginTop: 0, boxSizing: "border-box",
                    }}>
                      {(common.shoppingCart && common.shoppingCart.orderOrderProduct && common.shoppingCart.orderOrderProduct.length > 0)
                        ? <div style={{
                          paddingBottom: 60, height: 400, maxHeight: common.windowHeight, width: 400, maxWidth: common.getViewportWidth()
                          , overflowY: "auto", position: "relative"
                        }}>
                          {common.shoppingCart.orderOrderProduct.map((rowData, rowIndex) => {
                            return <div
                              key={rowIndex}
                              style={{ margin: "0 20px", padding: "20px 0", borderBottom: "1px solid #eeeeee", cursor: "pointer" }}
                              onClick={e => {
                                common.needReload = true;
                                Router.push(config.shortUrl.product, config.shortUrl.product + "/" + rowData.alias)
                              }}
                            >
                              <a style={{ color: "inherit" }}>
                                <img style={{ float: "left", width: 60, height: 60, borderRadius: 2, marginRight: 20 }}
                                  src={rowData.thumbUrl}>
                                </img>
                                <div style={{ paddingLeft: 80 }}>
                                  <div style={{ lineHeight: 1.29, overflowX: "hidden", textOverflow: "ellipsis", maxHeight: 37, fontWeight: "bold" }}>
                                    {rowData.name}
                                  </div>
                                  {rowData.scheduleData && <div style={{ lineHeight: 1.2, overflowX: "hidden", textOverflow: "ellipsis", marginTop: 4 }}>
                                    {rowData.scheduleData.name}
                                  </div>}
                                  <div style={{ lineHeight: 1.2, overflowX: "hidden", textOverflow: "ellipsis", marginTop: 4, color: "#888" }}>
                                    {common.changeTimeStampToHumanTime(rowData.scheduleData.date, undefined, "standardDate")}
                                  </div>
                                  {rowData.scheduleData && rowData.scheduleData.schedulePriceItems && <div style={{ lineHeight: 1.2, overflowX: "hidden", textOverflow: "ellipsis", marginTop: 4 }}>
                                    {rowData.scheduleData.schedulePriceItems.map((rowData1, rowIndex1) => {
                                      return (rowIndex1 > 0 ? ", " : "") + rowData1.noOfItem
                                        + " x " + (rowData1.label ? rowData1.label : common.schedulePriceItemTypeMap[rowData1.schedulePriceItemType])
                                    })}
                                  </div>}
                                  <div style={{
                                    lineHeight: 1.2, overflowX: "hidden", textOverflow: "ellipsis", marginTop: 4, color: "#ff5722"
                                    , fontSize: 16
                                  }}>
                                    <sup style={{ top: "-0.5em", fontSize: 10, marginRight: 4 }}>
                                      {Language.getLanguage(common.moneyType)}
                                    </sup>
                                    {common.numberWithCommas(rowData.cost)}
                                  </div>
                                </div>
                              </a>
                            </div>
                          })}
                          <div style={{
                            position: "fixed", borderTop: "solid 1px #e0e0e0", width: "100%",
                            lineHeight: 1.5, display: "flex", bottom: 0, backgroundColor: "#fff"
                          }}>
                            <div style={{ width: "50%", padding: "9px 24px 11px", height: 59 }}>
                              <div>
                                {Language.getLanguage(LanguageIdMap.subtotal)}
                                {common.shoppingCart.orderOrderProduct && " ("
                                  + Language.getLanguage(LanguageIdMap.ITEMS, { item: common.shoppingCart.orderOrderProduct.length }) + ")"}
                                {":"}
                              </div>
                              <div style={{ lineHeight: 1.3, color: "#ff5722", fontSize: 16 }}>
                                <sup style={{ top: "-0.5em", fontSize: 10, marginRight: 4 }}>
                                  {Language.getLanguage(common.moneyType)}
                                </sup>
                                {common.numberWithCommas(common.shoppingCart.cost)}
                              </div>
                            </div>
                            <div style={{ width: "50%", height: 59 }}>
                              <RaisedButton
                                buttonStyle={{ ...config.buttonStyle[0] }}
                                overlayStyle={{ height: 59, width: "100%" }}
                                style={{
                                  height: 59,
                                  width: "100%",
                                  fontWeight: "bold",
                                  outline: "none",
                                  opacity: this.loadingCountdown > 0 ? 0.3 : 1,
                                }}
                                onClick={e => {
                                  Router.push(config.shortUrl.shoppingCart)
                                }}
                              >{Language.getLanguage(LanguageIdMap.VIEW_CART)}
                              </RaisedButton>
                            </div>
                          </div>
                        </div>
                        : <div style={{
                          color: "#d5d5d5", textAlign: "center", padding: "20px 20px 8px 20px", width: 400
                          , maxWidth: common.getViewportWidth(),
                        }}>
                          <i className="fa fa-shopping-cart" style={{ cursor: "pointer", marginRight: 12, fontSize: 24 }} />
                          <div style={{ marginTop: 12 }}> {Language.getLanguage(LanguageIdMap.CART_IS_EMPTY)} </div>
                        </div>}
                    </div>}
                  />
                  {!common.checkLoginUser()
                    && <HoverOpenDropdownMenu
                      iconButtonElement={<div className="loginUserRight">
                        <i className="fa fa-user hoverDefaultColor" />
                      </div>}
                      data={[
                        <a>
                          <MenuItem className="hoverDefaultColor"
                            onClick={(event) => {
                              event.preventDefault();
                              common.currentMainComponent.setState({ loginModalPopup: true });
                            }}
                            style={{ height: 40, minWidth: 180, }}
                          >
                            <span>
                              {Language.getLanguage(LanguageIdMap.btnLogin)}
                            </span>
                          </MenuItem>
                        </a>,
                        <a>
                          <MenuItem className="hoverDefaultColor"
                            onClick={(event) => {
                              event.preventDefault();
                              common.currentMainComponent.setState({ registerModalPopup: true });
                            }}
                            style={{ height: 40, minWidth: 180, }}
                          >
                            <span>
                              {Language.getLanguage(LanguageIdMap.btnRegister)}
                            </span>
                          </MenuItem>
                        </a>,
                        <a>
                          <MenuItem className="hoverDefaultColor"
                            onClick={(event) => {
                              event.preventDefault();
                              common.needReload = true;
                              Router.push(config.shortUrl.profile, config.shortUrl.profile + "/" + config.shortUrl.profileChild.INVITE.url)
                              common.currentMainComponent.checkAndLoadData();
                            }}
                            style={{ height: 40 }}
                          >
                            <span>
                              {Language.getLanguage(LanguageIdMap.URL.PROFILE.INVITE)}
                            </span>
                          </MenuItem>
                        </a>,
                        <a>
                          <MenuItem className="hoverDefaultColor"
                            onClick={(event) => {
                              event.preventDefault();
                              common.needReload = true;
                              Router.push(config.shortUrl.profile, config.shortUrl.profile + "/" + config.shortUrl.profileChild.CREDIT.url)
                              common.currentMainComponent.checkAndLoadData();
                            }}
                            style={{ height: 40 }}
                          >
                            <span>
                              {Language.getLanguage(LanguageIdMap.URL.PROFILE.CREDIT)}
                            </span>
                          </MenuItem>
                        </a>,
                      ]}
                    />}
                  {common.checkLoginUser()
                    && <HoverOpenDropdownMenu
                      iconButtonElement={<div className="loginUserRight" >
                        <i className="fa fa-user hoverDefaultColor" />
                        <span style={{ marginTop: 3 }}>{window.localStorage.getItem("firstName")}</span>
                      </div>}
                      data={[
                        <a>
                          <MenuItem className="hoverDefaultColor"
                            onClick={(event) => {
                              event.preventDefault();
                              common.needReload = true;
                              Router.push(config.shortUrl.profile, config.shortUrl.profile + "/" + config.shortUrl.profileChild.MYACCOUNT.url)
                              common.currentMainComponent.checkAndLoadData();
                            }}
                            style={{ height: 40 }}
                          >
                            <span>
                              {Language.getLanguage(LanguageIdMap.URL.PROFILE.MY_ACCOUNT)}
                            </span>
                          </MenuItem>
                        </a>,
                        <a>
                          <MenuItem className="hoverDefaultColor"
                            onClick={(event) => {
                              event.preventDefault();
                              common.needReload = true;
                              Router.push(config.shortUrl.profile, config.shortUrl.profile + "/" + config.shortUrl.profileChild.BOOKING.url)
                              common.currentMainComponent.checkAndLoadData();
                            }}
                            style={{ height: 40 }}
                          >
                            <span>
                              {Language.getLanguage(LanguageIdMap.URL.PROFILE.BOOKING)}
                            </span>
                          </MenuItem>
                        </a>,
                        <a>
                          <MenuItem className="hoverDefaultColor"
                            onClick={(event) => {
                              event.preventDefault();
                              common.needReload = true;
                              Router.push(config.shortUrl.profile, config.shortUrl.profile + "/" + config.shortUrl.profileChild.WISHLIST.url)
                              common.currentMainComponent.checkAndLoadData();
                            }}
                            style={{ height: 40 }}
                          >
                            <span>
                              {Language.getLanguage(LanguageIdMap.URL.PROFILE.WISH_LIST)}
                            </span>
                          </MenuItem>
                        </a>,
                        <a>
                          <MenuItem className="hoverDefaultColor"
                            onClick={(event) => {
                              event.preventDefault();
                              common.needReload = true;
                              Router.push(config.shortUrl.profile, config.shortUrl.profile + "/" + config.shortUrl.profileChild.INVITE.url)
                              common.currentMainComponent.checkAndLoadData();
                            }}
                            style={{ height: 40 }}
                          >
                            <span>
                              {Language.getLanguage(LanguageIdMap.URL.PROFILE.INVITE)}
                            </span>
                          </MenuItem>
                        </a>,
                        <a>
                          <MenuItem className="hoverDefaultColor"
                            onClick={(event) => {
                              event.preventDefault();
                              common.needReload = true;
                              Router.push(config.shortUrl.profile, config.shortUrl.profile + "/" + config.shortUrl.profileChild.CREDIT.url)
                              common.currentMainComponent.checkAndLoadData();
                            }}
                            style={{ height: 40 }}
                          >
                            <span>
                              {Language.getLanguage(LanguageIdMap.URL.PROFILE.CREDIT)}
                            </span>
                          </MenuItem>
                        </a>,
                        <a>
                          <MenuItem className="hoverDefaultColor"
                            onClick={(event) => {
                              event.preventDefault();
                              common.needReload = true;
                              Router.push(config.shortUrl.profile, config.shortUrl.profile + "/" + config.shortUrl.profileChild.SETTING.url)
                              common.currentMainComponent.checkAndLoadData();
                            }}
                            style={{ height: 40 }}
                          >
                            <span>
                              {Language.getLanguage(LanguageIdMap.URL.PROFILE.SETTING)}
                            </span>
                          </MenuItem>
                        </a>,
                        <a>
                          <MenuItem className="hoverDefaultColor"
                            onClick={(e) => {
                              e.preventDefault();
                              common.currentMainComponent.logout();
                            }}
                            style={{ height: 40 }}
                          >
                            <span>
                              {Language.getLanguage(LanguageIdMap.btnLogout)}
                            </span>
                          </MenuItem>
                        </a>,
                      ]}
                    />}

                </div>
                <div>
                  {!common.checkServer()
                    && <div
                      className="headerSearchForm"
                    >
                      <SearchSuggestionPopup
                        autoFocus={this.state.searchFocusing}
                        id="searchInputHeader"
                        className="focusBorderColorDefault"
                        underlineShow={false}
                        fullWidth={this.state.searchFocusing}
                        anchorOrigin={{ vertical: 'bottom', horizontal: "right" }}
                        targetOrigin={{ vertical: 'top', horizontal: "right" }}
                        menuStyle={{ width: "100%" }}

                        onFocus={e => {
                          this.setState({
                            searchFocusing: true,
                          })
                        }}
                        onBlur={e => {
                          this.setState({
                            searchFocusing: false,
                          })
                        }}

                        textFieldStyle={{
                          overflow: "hidden",
                          transition: "0.2s",
                          marginRight: 0, paddingBottom: 0,
                          ...(common.getViewportWidth() >= 500 ? { float: "left" } : { float: "right" }),
                          width: (this.state.searchFocusing && common.checkMobile()
                            && common.getViewportWidth() < config.sizeConfig.widthMd) ? "calc(100vw - 50px)"
                            : common.getViewportWidth() >= 500
                              ? this.state.searchFocusing ? 256 : 38
                              : common.getViewportWidth() - 48,
                          borderRadius: 4, backgroundColor: "#eee", height: 34,
                          marginBottom: 4, border: "1px solid #eee",
                          paddingLeft: this.state.searchFocusing ? 12 : 0,
                          paddingRight: this.state.searchFocusing ? 12 : 0,
                        }}
                        hintStyle={{ bottom: 2, fontSize: 14 }}
                        hintText={
                          this.state.searchFocusing ?
                            Language.getLanguage(LanguageIdMap.SEARCH_BY_DESTINATION_ACTIVITY) :
                            ""
                        }
                      />
                      {!this.state.searchFocusing
                        && <i className={`fa fa-search ${this.state.searchFocusing ? "focus" : ""}`} />}
                    </div>
                  }
                </div>

                <div className="hotline">
                  <a href={"tel:" + config.phoneContact}>
                    <span>
                      {Language.getLanguage(LanguageIdMap.HOTLINE) + ": " + config.phoneContact}
                    </span>
                  </a>
                </div>
              </div>}

            {/* <ul className="displayNone">
              <li><a href="/blog">{Language.getLanguage(LanguageIdMap.BLOG)}</a></li>
              <li><a href="/kinh-nghiem-du-lich">{Language.getLanguage(LanguageIdMap.DESTINATION_GUIDE)}</a></li>
              <li><a href="/ebook">{Language.getLanguage(LanguageIdMap.EBOOK)}</a></li>
            </ul>

            {(!!this.state.smallPageHeaderDisplay || common.getViewportWidth() >= 850)
              && !common.checkServer()
              && <div className="floatLeft">
                <HoverOpenDropdownMenu
                  iconButtonElement={<div
                    className="headerDropdownItem hoverDefaultColor"
                  >
                    {Language.getLanguage(LanguageIdMap.TRAVEL_GUIDE)}
                    <i className="fa fa-chevron-down hoverDefaultColor caretRightDown" />
                  </div>}
                  data={[
                    <MenuItem className="hoverDefaultColor" style={{ minWidth: 180 }} href={"/blog"}>
                      {Language.getLanguage(LanguageIdMap.BLOG)}
                    </MenuItem>,
                    <MenuItem className="hoverDefaultColor" style={{ minWidth: 180 }} href={"/kinh-nghiem-du-lich"}>
                      {Language.getLanguage(LanguageIdMap.DESTINATION_GUIDE)}
                    </MenuItem>,
                    <MenuItem className="hoverDefaultColor" style={{ minWidth: 180 }} href={"/ebook"}>
                      {Language.getLanguage(LanguageIdMap.EBOOK)}
                    </MenuItem>,
                  ]}
                />  
              </div>} */}

          </div>
          <div className='pageSmallWidth row' id='pvvBlogCamnangContainer'>
            <div className="col-sm-2" />
            <div className="linkBelowBanner col-sm-7 col-xs-12" id='pvvBlogCamnang'>
              <div>
                <a href="/blog">{Language.getLanguage(LanguageIdMap.BLOG)}</a>
              </div>
              <div>
                <a href="/blog/kinh-nghiem-du-lich/">Cẩm nang du lịch</a>
              </div>
              <div>
                <a href="/blog/ebook/">Ebook</a>
              </div>
            </div>
          </div>
        </Navbar>
        {/* <Sidebar url={this.props.url}/> */}
      </div>
    );
  }
  renderTypeOfTripDropdownMenu(rowData) {
    if (!rowData) {
      return;
    }
    return {
      iconButtonElement: <MenuItem className="hoverDefaultColor"
        style={{ minWidth: 224, }}
        innerDivStyle={{ display: "flex", justifyContent: "space-between" }}
        onClick={e => {
          common.needReload = true;
          Router.push(config.shortUrl.typeOfTrip + "/" + rowData.alias)
        }}
      >
        {rowData.name}
        {rowData.subCategories && <span className="glyphicon glyphicon-chevron-right hoverDefaultColor"
          style={{ fontSize: 15, top: 16, color: "#aaa", marginLeft: 8 }} />}
      </MenuItem>,
      direction: common.DIRECTION.RIGHT,
      data: rowData.subCategories
        ? rowData.subCategories.map((rowSubcategory) => {
          return this.renderTypeOfTripDropdownMenu(rowSubcategory)
        })
        : undefined
    }
  }
  toggleMenu() {
    if ($(".navbar-collapse").hasClass('collapse')) {
      $(".navbar-collapse").removeClass('collapse');
    }
    else {
      $(".navbar-collapse").addClass('collapse');
    }
  }
}

// const mapStateToProps = state => ({
//   // userBalance: state.userBalanceReducer.userBalance
// });

// const mapDispatchToProps = dispatch => ({
//   getUserBalance: () => dispatch(getUserBalance())
// });
// export default connect(mapStateToProps, mapDispatchToProps)(Header);
export default Header;

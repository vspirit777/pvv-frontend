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
            border: none;
            box-shadow: none;
            margin-bottom: 0 !important;
            background-color: #d4f5ef;
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
          @media only screen and (max-width: ${config.sizeConfig.widthPC - 1}px) {
            #rightBarContainer {
              width: 80%;
            }
          }
          #rightBarContainer > div{
            margin-right: -12px;
            display: flex;
            align-items: baseline;
            justify-content: flex-end;
          }
          .hotline {
            font-size: 19px;
            white-space: nowrap;
            text-align: center;
            margin-top: 10px;
          }
          .hotline > a {
            color: ${config.colorConfig.main};
          }
          #banner {
            padding-left: 10px;
            padding-right: 10px;
          }
          @media only screen and (max-width: ${config.sizeConfig.widthPC - 1}px) {
            #banner {
              display: none;
            }
            .hotline {
              display: none;
            }
          }
          
          #banner > img {
            max-width: 100%;
            max-height: 98px;
          }
          .linkBelowBanner {
            font-size: 16px;
            display: flex;
            justify-content: space-between;
            color: #000;
            font-weight: 500;
          }
          @media only screen and (max-width: ${config.sizeConfig.widthPC - 1}px) {
            .linkBelowBanner {
              font-size: 14px;
            }
          }
          .linkBelowBanner > div {
            background: #d4f5ef;
            width: 100%;
            margin: 0;
            padding: 6px;
            text-align: center;
            padding-top: 14px;
            padding-bottom: 14px;
          }
          .linkBelowBanner > div > a {
            color: inherit;
          }
          .linkBelowBanner > div.menu-item-active {
            background: #0ab596 !important;
            color: #fff !important;
            transition: background 0.15s ease-in-out;
          }
          .linkBelowBanner > div.menu-item-active > a {
            color: #fff !important;
          }
          @keyframes menuHighlight {
            0% { background: #d4f5ef; }
            50% { background: #0ab596; color: #fff; }
            100% { background: #0ab596; color: #fff; }
          }
          .linkBelowBanner > div:hover {
            background: #b8ede3;
            cursor: pointer;
          }
          #rightBarContainer {
	          padding-top: 0px;
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
            text-align: right;
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
          #mainheader {
            transition: 0.2s;
            display: flex;
          }
          #pvvBlogCamnangContainer{
            overflow: hidden;
          }
          @media only screen and (max-width: ${config.sizeConfig.widthPC - 1}px) {
            #pvvBlogCamnangContainer{
              padding: 0;
              margin: 0;
            }
            .linkBelowBanner {
              flex-wrap: wrap !important;
            }
            .linkBelowBanner > div {
              width: 50% !important;
              font-size: 12px !important;
              padding: 10px 4px !important;
              box-sizing: border-box;
              border-bottom: 1px solid #c0e8e0;
            }
            .linkBelowBanner > div:nth-child(odd) {
              border-right: 1px solid #c0e8e0;
            }
            .linkBelowBanner > div:last-child {
              width: 100% !important;
              border-right: none;
            }
          }
          @media only screen and (max-width: 480px) {
            .linkBelowBanner > div {
              font-size: 11px !important;
              padding: 8px 2px !important;
            }
          }
          .headerTopBar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 24px;
            height: 64px;
            background: #fff;
            z-index: 1020;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            width: 100vw;
            box-shadow: 0 1px 5px rgba(0,0,0,0.04);
          }
          body {
            padding-top: 64px !important;
          }
          .headerTopBar .navLogo {
            width: 160px;
            min-width: 120px;
            margin-right: 24px;
          }
          .headerTopBar .headerIcons {
            display: flex;
            align-items: center;
            gap: 18px;
            margin-left: auto;
          }
          .headerTopBar .logo-search-group {
            display: flex;
            align-items: center;
          }
          .headerTopBar .headerIcons > * {
            display: flex;
            align-items: center;
          }
          .headerTopBar .shoppingRight {
            margin-top: 0;
          }
          .headerTopBar .loginUserRight {
            margin-top: 0;
          }
          .headerTopBar .headerSearchForm {
            margin-top: 0;
          }
          .headerTopBar .header-search-box {
            flex: 0 0 auto;
            width: 315px;
            margin: 0 0 0 16px;
            position: relative;
          }
          .headerTopBar .header-search-box input {
            width: 100%;
            height: 40px;
            padding: 0 40px 0 16px;
            border: 1px solid #ddd;
            border-radius: 20px;
            font-size: 14px;
            outline: none;
            transition: border-color 0.2s;
          }
          .headerTopBar .header-search-box input:focus {
            border-color: ${config.colorConfig.main};
          }
          .headerTopBar .header-search-box .search-icon {
            position: absolute;
            right: 14px;
            top: 50%;
            transform: translateY(-50%);
            color: #999;
            font-size: 16px;
            pointer-events: none;
          }
          @media only screen and (max-width: ${config.sizeConfig.widthMd - 1}px) {
            .headerTopBar .header-search-box {
              display: none;
            }
          }
          .navbar-fixed-top {
            top: 64px !important; /* height of .headerTopBar */
            border-width: 0;
          }
      `}</style>
        </Head>
        <div className="headerTopBar">
          <div className="logo-search-group">
            <a
              href={config.shortUrl.home}
              className="navLogo"
              onClick={e => {
                e.preventDefault();
                Router.push(config.shortUrl.home)
              }}
            >
              <div>
                <img src={"/static/logo.png"} style={{ maxWidth: '100%', maxHeight: 48 }} />
              </div>
            </a>
            {!common.checkServer() && (
              <div className="header-search-box">
                <SearchSuggestionPopup
                  id="headerSearchInput"
                  underlineShow={false}
                  placeholder="Tìm kiếm điểm đến, tour..."
                  hintStyle={{ bottom: 2, fontSize: 14 }}
                  textFieldStyle={{
                    width: '100%',
                    height: 40,
                    padding: '0 40px 0 16px',
                    border: '1px solid #ddd',
                    borderRadius: 20,
                    fontSize: 14,
                    background: '#fff',
                  }}
                  style={{ width: '100%' }}
                  inputStyle={{
                    padding: '0 40px 0 16px',
                  }}
                />
                <i className="fa fa-search search-icon" />
              </div>
            )}
          </div>
          <div className="headerIcons">
            <HoverOpenDropdownMenu
              iconButtonElement={<i className="fa fa-question-circle-o hoverDefaultColor questionRight"></i>}
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
                {common.shoppingCart && common.shoppingCart.orderOrderProduct && common.shoppingCart.orderOrderProduct.length > 0 && <div className="shoppingRightChip">{common.shoppingCart.orderOrderProduct.length}</div>}
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
            {!common.checkLoginUser() && <HoverOpenDropdownMenu
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
            {common.checkLoginUser() && <HoverOpenDropdownMenu
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
        </div>
        <Navbar id="header" className="navbar-fixed-top navbar navbarHeader">
          <div className='pageSmallWidth row' id='pvvBlogCamnangContainer'>
            <div className="linkBelowBanner" id='pvvBlogCamnang' style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
              {/* Only menu items, no logo here */}
              <div 
                id="menu-tour"
                onClick={e => {
                  e.currentTarget.classList.add('menu-item-active');
                  common.needReload = true;
                  setTimeout(function() {
                    Router.push(config.shortUrl.productsByType + "?typeOfTripAlias=hoat-dong-tour-trong-ngay");
                  }, 150);
                }}
              ><a href={config.shortUrl.productsByType + "?typeOfTripAlias=hoat-dong-tour-trong-ngay"} onClick={e => e.preventDefault()}>Tour và trải nghiệm</a></div>
              <div 
                id="menu-vethamquan"
                onClick={e => {
                  e.currentTarget.classList.add('menu-item-active');
                  common.needReload = true;
                  setTimeout(function() {
                    Router.push(config.shortUrl.productsByType + "?typeOfTripAlias=ve-tham-quan-show");
                  }, 150);
                }}
              ><a href={config.shortUrl.productsByType + "?typeOfTripAlias=ve-tham-quan-show"} onClick={e => e.preventDefault()}>Vé tham quan</a></div>
              <div 
                id="menu-dichuyen"
                onClick={e => {
                  e.currentTarget.classList.add('menu-item-active');
                  common.needReload = true;
                  setTimeout(function() {
                    Router.push(config.shortUrl.productsByType + "?typeOfTripAlias=phuong-tien-di-lai-wifi");
                  }, 150);
                }}
              ><a href={config.shortUrl.productsByType + "?typeOfTripAlias=phuong-tien-di-lai-wifi"} onClick={e => e.preventDefault()}>Di chuyển</a></div>
              <div 
                id="menu-combo"
                onClick={e => {
                  e.currentTarget.classList.add('menu-item-active');
                  common.needReload = true;
                  setTimeout(function() {
                    Router.push(config.shortUrl.productsByType + "?typeOfTripAlias=tour-tron-goi");
                  }, 150);
                }}
              ><a href={config.shortUrl.productsByType + "?typeOfTripAlias=tour-tron-goi"} onClick={e => e.preventDefault()}>Combo & Packages</a></div>
              <div 
                id="menu-about"
                onClick={e => {
                  e.currentTarget.classList.add('menu-item-active');
                  setTimeout(function() {
                    Router.push(config.shortUrl.aboutUs);
                  }, 150);
                }}
              ><a href={config.shortUrl.aboutUs} onClick={e => e.preventDefault()}>Về chúng tôi</a></div>
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

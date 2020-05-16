
import React, { Component } from 'react';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Dialog from 'material-ui/Dialog';
import common from '../data/common';
import Language from '../language/Language'
import { config, analytics } from '../config'
import LanguageIdMap from '../language/LanguageIdMap'
import $ from "jquery";
import RaisedButton from 'material-ui/RaisedButton';
import Head from 'next/head';
import Router from 'next/router'

import {
    Button,
    ControlLabel,
    FormControl,
    FormGroup,
    OverlayTrigger,
    Popover,
    Glyphicon,
    Tooltip
} from 'react-bootstrap';
import Modal from 'react-bootstrap/lib/Modal';
import Header from '../components/Header/Header'
import moment from 'moment';
// import NumberFormat from 'react-number-format';
// import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
// import 'whatwg-fetch';
// import FacebookLogin from 'react-facebook-login';
import FacebookAuth from 'react-facebook-auth';
import MailchimpSubscribe from "react-mailchimp-subscribe"

import ReactLoading from 'react-loading';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
import Snackbar from 'material-ui/Snackbar';
import Card from '../components/Card'


import LinearProgress from 'material-ui/LinearProgress';
import AvatarEditor from 'react-avatar-editor'
import HoverOpenDropdownMenu from './HoverOpenDropdownMenu';
// import fs from 'fs';
import TagManager from 'react-gtm-module'

if(!common.checkServer()) {
    TagManager.initialize({gtmId:analytics.google.tagManagerId})
}

export class CustomDateInput extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Button
                disabled={this.props.disabled ? this.props.disabled : false}
                style={{ width: '100%', ...this.props }}
                bsSize="small"
                className="example-custom-input"
                onClick={this.props.onClick}
            >
                {this.props.value}
            </Button>
        )
    }
}

CustomDateInput.propTypes = {
};

class SuperComponent extends Component {
    constructor(props, context = undefined) {
        super(props);
        this.state = {};
        this.state.seoImage = config.metaImg;


        setTimeout(() => {
            try {
                $('html, body').animate({
                    scrollTop: 0
                }, 0)
            } catch (error) {

            }
        }, 500);


        // if (props.initPropsData) {
        //     Object.keys(props.initPropsData).forEach((param) => {
        //         this.state[param] = JSON.parse(JSON.stringify(props.initPropsData[param]))
        //     })
        // }
        // console.log("cons supercomponent")
        // console.log(this.props)

        // common.justCreateSuperComponent = true;
        // setTimeout(() => {
        //     common.justCreateSuperComponent = false;
        // }, 200);



        this.loadingCountdown = 0;
        this.loadingForAction = "";
        common.more.needReloadWhenLogin = undefined;
        common.currentMainComponent = this;

        this.curPage = 0;

        moment.locale(Language.getLanguageName().replace('.', ''))
        if (Language.getLanguageName() == Language.languageDefineJapan) {
            moment.locale("ja");
        }

        // this.SortableItem = SortableElement(this.getSortableValue);

        // this.SortableList = SortableContainer(({ items }) => {
        //     return (
        //         <div style={{ float: "left" }}>
        //             {items.map((value, index) => (
        //                 <common.currentMainComponent.SortableItem key={`item-${index}`} index={index} value={value} />
        //             ))}
        //         </div>
        //     );
        // });
        // this.onSortEnd = ({ oldIndex, newIndex }) => {
        //     this.setState({
        //         files: arrayMove(this.state.files, oldIndex, newIndex),
        //     });
        // };

        // console.log("create supercomponent")
        try {
            if (common.location.search.forgetpassword && !common.checkForgetPassFromOther) {
                common.checkForgetPassFromOther = true;
                this.logout();
                window.localStorage.setItem("forgetPassword", true);
            }
            if (common.location.search.loginto) {
                this.state.loginModalPopup = true;
            }

            if (common.location.search.aff) {
                common.setCookie("aff", common.location.search.aff, 3600 * 24 * 30);
            }
        } catch (error) {

        }

    }
    *generator(i) {
        yield i;
        yield i + 1;
    }
    changeSizeCallback() {
        this.forceUpdate();
    }
    checkCanUseFireBase() {
        // console.log("navigator.userAgent.toLowerCase():" + navigator.userAgent.toLowerCase());
        var ua = navigator.userAgent, tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE ' + (tem[1] || '');
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        // console.log("browser:" + JSON.stringify(M))
        try {
            if (M[0].toLowerCase() == "chrome") {
                if (M[1] >= 50) {
                    return true;
                }
            } else if (M[0].toLowerCase() == "safari") {
                return false;
            } else if (M[0].toLowerCase() == "firefox") {
                if (M[1] >= 44) {
                    return true;
                }
                return false;

            } else if (M[0].toLowerCase() == "opera") {
                if (M[1] >= 37) {
                    return true;
                }
                return false;
            }

        } catch (error) {
            return false;
        }
        return false;
    }
    receiveFirebaseMessage(message) {
        if (common.headerComponent) {
            common.headerComponent.updateNotify();
        }

        // console.log("receive message:" + JSON.stringify(message.notification))
        let alertModalPopupButtonNameClickCallback = undefined;
        if (message.notification.click_action && message.notification.click_action !== "https://mypop.vn") {
            alertModalPopupButtonNameClickCallback = [
                {
                    name: Language.getLanguage(LanguageIdMap.btnView), callback: () => {
                        window.open(message.notification.click_action, '_blank');
                    }
                },
                { name: Language.getLanguage(LanguageIdMap.btnClose) }
            ]
        } else {
            alertModalPopupButtonNameClickCallback = [
                {
                    name: Language.getLanguage(LanguageIdMap.btnView), callback: () => {
                        window.open(config.domain + config.shortUrl.notify, '_blank');
                    }
                },
                {
                    name: Language.getLanguage(LanguageIdMap.btnClose)
                }]
        }
        // if (common.headerComponent && common.headerComponent.holderComponent) {
        this.setState({
            alertModalPopup: {
                titleAlertModal: message.notification.title,//Language.getLanguage(LanguageIdMap.notification),
                descAlertModal: this.replaceBreakLineStringToHtml(message.data.message),
                alertModalPopupButtonNameClickCallback: alertModalPopupButtonNameClickCallback
            }
        })
        // }
    }
    sendFireBaseTokenToServer() {
        // console.log("sendFireBaseTokenToServer:" + common.firebaseToken + ";" + window.localStorage.getItem("uid"))
        if (!common.firebaseToken || !window.localStorage.getItem("uid")) {
            return;
        }
        // console.log("call api")
        // console.log("config.api.hostType.mypop_url:" + config.api.getHostNameByHostType(config.api.hostType.mypop_url)
        //     + ";config.api.hostEndPoint.addFirebaseToken:" + config.api.hostEndPoint.addFirebaseToken)
        common.fetcher(
            config.api.hostType.mypop_url,
            config.api.hostEndPoint.addFirebaseToken,
            "post",
            undefined,
            {
                deviceToken: common.firebaseToken
            },
            {
                typeFormData: true,
                noCallbackErr: true,
            }
        )
            .then((jsonRes) => {
                common.messaging.onMessage(function (payload) {
                    // console.log("Message received. ", JSON.stringify(payload));
                    if (common.currentMainComponent) {
                        common.currentMainComponent.receiveFirebaseMessage(payload);
                    }
                });

            })
            .catch((err) => {
                console.log("error send api:" + err)
                this.forceUpdate();
            })
    }

    removeFireBaseTokenToServer() {
        // console.log("common.firebaseToken:" + common.firebaseToken)
        if (!common.firebaseToken) {
            return;
        }
        common.fetcher(
            config.api.hostType.mypop_url,
            config.api.hostEndPoint.removeFirebaseToken,
            "post",
            undefined,
            {
                deviceToken: common.firebaseToken
            },
            {
                typeFormData: true,
                noCallbackErr: true,
            }
        )
            .then((jsonRes) => {
            })
            .catch((err) => {
                console.log("error pro3:" + err)
                this.forceUpdate();
            })
        // common.firebaseToken = undefined;
    }
    getSortableValue({ value }) {
        return null;
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleOnScrollEventBind);
        // if (common.initDataFromServer) {
        //     common.initDataFromServer = undefined;
        // }
    }

    componentWillMount() {
        // common.needReload = true;
        // this.checkAndLoadData();
    }
    componentDidMount() {
        this.handleOnScrollEventBind = this.handleOnScrollEvent.bind(this);
        window.addEventListener('scroll', this.handleOnScrollEventBind);

        this.forceUpdate();

        // try {
        //     window
        //     Router.onRouteChangeStart = url => {
        //         console.log('App is changing to: ', url)
        //         window.location.href = url
        //       }
        // } catch (error) {

        // }

        // if (common.checkCallFromBrowser() && common.hasSkipFirstGetByGetdataFromServer) {
        // common.needReload = true;
        // this.checkAndLoadData();
        // }
        // common.hasSkipFirstGetByGetdataFromServer = true;
    }
    componentDidUpdate(prevProps, prevState) {
        // this.checkAndLoadData();
    }
    checkAndLoadData() {
        if (common.needReload) {
            common.needReload = undefined;
            try {
                // let url = decodeURI(window.location.pathname + window.location.search);
                // common.setupLocationFromUrl(url)
            } catch (error) {
            }
            return true;
        }
        return false;
    }
    getUserDataCallback() {
        this.forceUpdate();
    }



    //if fieldList = [] --> get all
    copyJsonWithoutActiveObject(obj, fieldList = [], fieldId) {
        let returnObj = obj;
        if (Object.prototype.toString.call(obj) === '[object Array]') {
            returnObj = [];
            for (let property in obj) {
                let res = this.copyJsonWithoutActiveObject(obj[property], fieldList, fieldId);
                if (res !== undefined) {
                    returnObj.push(res)
                }
            }
            if (returnObj.length === 0) {
                returnObj = undefined;
            }
        } else if (typeof obj === "object") {
            returnObj = {};
            let returnObjBool = false;
            for (let property in obj) {
                if (property == "active" && obj[property] === true) {
                    returnObjBool = true;
                    for (var i = 0; i < fieldId.length; i++) {
                        returnObj[fieldId[i]] = obj[fieldId[i]]
                    }
                    //returnObj[property] = true;       not save active=true
                } else {
                    // console.log("check param:"+property+";"+JSON.stringify(fieldList))
                    if (fieldList.length > 0 && fieldList.indexOf(property) < 0) {
                        continue;
                    }
                    let res = this.copyJsonWithoutActiveObject(obj[property], fieldList, fieldId);
                    if (res !== undefined) {
                        returnObj[property] = res;
                        if (Object.prototype.toString.call(res) === '[object Array]') {
                            returnObjBool = true;
                        }
                    }
                }
            }
            if (returnObjBool == false) {
                return undefined;
            }
        }
        return returnObj;
    }


    //backNextOverflowScrollButton={hasBack(bool) = undefined, hasNext(bool) = undefined} -->if it has back or next button
    checkAndDisplayLeftRightButtonOfOverflowX(divId, backNextOverflowScrollButton) {
        //if it can scroll

        if (backNextOverflowScrollButton
            && $('#' + divId) && $('#' + divId)[0] && $('#' + divId)[0].scrollWidth > $('#' + divId).width()) {
            if (this.checkAndDisplayLeftRightButtonOfOverflowXTimeOut) {
                clearTimeout(this.checkAndDisplayLeftRightButtonOfOverflowXTimeOut)
            }
            this.checkAndDisplayLeftRightButtonOfOverflowXTimeOut = setTimeout(function () {
                this.checkAndDisplayLeftRightButtonOfOverflowXTimeOut = undefined;
                if ($('#' + divId).scrollLeft() > 0) {
                    backNextOverflowScrollButton.hasBack = true;
                } else {
                    backNextOverflowScrollButton.hasBack = undefined;
                }
                // console.log("check next:" + $('#' + divId)[0].scrollWidth + ";" + $('#' + divId).width() + ";" + $('#' + divId).scrollLeft())
                if ($('#' + divId)[0].scrollWidth > $('#' + divId).width() + $('#' + divId).scrollLeft()) {
                    backNextOverflowScrollButton.hasNext = true;
                } else {
                    backNextOverflowScrollButton.hasNext = undefined;
                }
                this.forceUpdate();
            }.bind(this), 100);
        }
    }



    renderLeftSlide() { return <div />; }
    renderRightSlide() { return <div />; }
    render2SlidePage(leftClassName = undefined, rightClassName = undefined, wrapperStyles = undefined,
        wrapperFixedRender = undefined) {
        let newPosStyle = Math.round(common.getViewportWidth()) >= config.sizeConfig.widthSm ? "sticky" : undefined;
        if (!this.changeLeftSlideStyle) {
            this.changeLeftSlideStyle = newPosStyle;
        } else if (this.changeLeftSlideStyle != newPosStyle) {
            this.changeLeftSlideStyle = newPosStyle;
            this.forceUpdate();
            if (common.headerComponent) {
                common.headerComponent.forceUpdate();
            }
            return <div />;
        }
        return this.superRender(wrapperStyles ? wrapperStyles : config.pageSmallWidthStyle,
            wrapperFixedRender,
            <div onMouseMove={event => {
                common.mousePoint.x = event.clientX;
                common.mousePoint.y = event.clientY;
            }}>
                <div className='row' style={{ position: "relative" }} >
                    <div className={"is-sticky " + (leftClassName ? leftClassName : 'col-sm-6')} style={{
                        top: Math.round(common.getViewportWidth()) >= config.sizeConfig.widthSm ? this.getTopHeightNav() : undefined,
                    }}>
                        {this.renderLeftSlide()}
                    </div>

                    <div className={rightClassName ? rightClassName : 'col-sm-6'} style={{
                        paddingLeft: 32, paddingRight: 24, ...config.fontStyle.h3,
                        marginBottom: 12, minHeight: 500,
                    }}>
                        {this.renderRightSlide()}
                    </div>
                </div>
            </div>)
    }
    render() {
        return <div>

            <Head>
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />

                {!!this.props.initPropsData && !!this.props.initPropsData.seoTitle
                    && <title>{this.props.initPropsData.seoTitle}</title>}
                {!!this.props.initPropsData && !!this.props.initPropsData.seoTitle
                    && <meta name="title" content={this.props.initPropsData.seoTitle}></meta>}
                {!!this.props.initPropsData && !!this.props.initPropsData.seoDescription
                    && <meta name="description" content={this.props.initPropsData.seoDescription}></meta>}
                {!!this.props.initPropsData && !!this.props.initPropsData.seoImage
                    && <meta name="image" content={this.props.initPropsData.seoImage}></meta>}
                {!!this.props.initPropsData && !!this.props.initPropsData.seoImage
                    && <meta name="og:image" content={this.props.initPropsData.seoImage}></meta>}
                {!!this.props.initPropsData && !!this.props.initPropsData.seoCanonical
                    && <link rel="canonical" href={this.props.initPropsData.seoCanonical} />}
                <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <link rel="stylesheet" href="/static/css/bootstrap.min.css" />
                <link rel="stylesheet" href="/static/css/main.css" />
                <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.jpg" />

                <style type="text/css">{`
                    .footerFontContact{
                        margin-top: 12px,
                        color: ${config.colorConfig.main};
                        font-size: 28px;
                    }
                    .allPage{
                        margin-top:${this.getTopHeightNav()}px
                    }
                `}</style>
                {this.renderCssInHeader && this.renderCssInHeader()}

            </Head>

            {this.superRender()}
            <script
                dangerouslySetInnerHTML={{
                    __html:
                        `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${analytics.google.tagManagerId}')

                (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga')`
                }}
            />
            {/* <noscript dangerouslySetInnerHTML={{
                    __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=` + analytics.google.tagManagerId + `"
                            height="0" width="0" style={{ display: "none", visibility: "hidden" }} />`}} /> */}

            <script type="text/javascript" src={"/static/js/bootstrap.js"} async></script>

        </div>
    }
    superRender(wrapperStyles = {}, wrapperFixedRender = undefined, renderData = undefined) {
        return (
            <MuiThemeProvider>
                <div className="allPage">

                    {wrapperFixedRender}
                    <Header holderComponent={this} searchKeyword={this.searchKeyword} />
                    <div style={{ ...wrapperStyles, }}>
                        {/*<img id="scroll" style={{ display: "none" }} src={config.domain+require('../images/scroll.png')}
                            onClick={() => {
                                $("html, body").animate({ scrollTop: 0 }, 600);
                            }} />*/}
                        {this.renderBanner && this.renderBanner()}
                        <div className="renderData" >
                            {renderData ? renderData : this.renderData()}
                            {/* {this.renderLastLoading()} */}
                        </div>
                    </div>
                    {!this.canNotRenderFooter && this.renderFooter()}
                    {this.renderNotify()}
                </div>
            </MuiThemeProvider>
        )
    }
    renderItemGaleryImage(item = {}) {
        let imgMinHeight = 230;
        if (Math.round(common.getViewportWidth()) >= config.pageSmallWidthStyle.width) {
            imgMinHeight = config.pageSmallWidthStyle.width / 2 - 15;
        } else if (Math.round(common.getViewportWidth()) >= config.sizeConfig.boostrapWidthSm) {
            imgMinHeight = Math.round(common.getViewportWidth()) / 2 - 15;
        } else {
            imgMinHeight = Math.round(common.getViewportWidth()) - 48;
        }
        imgMinHeight /= 1.5;
        return <div>
            <img src={item.original}
                style={{ minHeight: this.imageGaleryLoaded ? 0 : imgMinHeight, background: "#e5e5e5" }} />
            {/* {item.imageTitle&&<div style={{textAlign:"center",width:"100%",marginTop:12,height:12}}>{item.imageTitle}</div>} */}
        </div>
    }

    renderFooter() {
        return <div className="footerContainer">
            <div className='row footerS1'>
                <div className='col-sm-2 footerS1Left'>
                    <i className="fa fa-facebook hoverDefaultColor pointer"
                        onClick={e => {
                            window.open("https://www.facebook.com/Phuotvivu/", '_blank');
                        }}
                    />
                    <i className="fa fa-youtube hoverDefaultColor pointer"
                        onClick={e => {
                            window.open("https://www.youtube.com/channel/UCdW658k__h9_U0bFmOEMO2A", '_blank');
                        }}
                    />
                    <i className="fa fa-instagram hoverDefaultColor pointer"
                        onClick={e => {
                            window.open("https://www.instagram.com/phuotvivu/", '_blank');
                        }}
                    />
                    <i className="fa fa-pinterest hoverDefaultColor pointer"
                        onClick={e => {
                            window.open("https://www.pinterest.com/phuotvivudulich/", '_blank');
                        }}
                    />
                </div>
                <div className='col-sm-10'>
                    <MailchimpSubscribe
                        url={config.mailChimp.url + "?u=" + config.mailChimp.u + "&id=" + config.mailChimp.id}
                        render={({ subscribe, status, message }) => (
                            <div>
                                <form
                                    className="footerMailForm"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        subscribe({
                                            MERGE0: this.state.mailchimpSubscribeEmailFooter
                                        })
                                    }}
                                >
                                    <p >
                                        {Language.getLanguage(LanguageIdMap.DEAL_OFF_TO_60_PERCENT_WILL_SEND_TO_YOUR_EMAIL)}
                                    </p>
                                    <FormControl
                                        className="focusBorderColorDefault "
                                        type="text"
                                        value={this.state.mailchimpSubscribeEmailFooter}
                                        placeholder={Language.getLanguage(LanguageIdMap.placeholder_enter_email)}
                                        onChange={e => {
                                            this.setState({ mailchimpSubscribeEmailFooter: e.target.value })
                                        }}
                                    />
                                    <div>
                                        {!common.checkServer() && <RaisedButton
                                            buttonStyle={{ ...config.buttonStyle[0] }}
                                            style={{
                                                height: 48, marginBottom: 12,
                                                minWidth: 150, margin: 8, marginLeft: 0,
                                                fontWeight: "bold",
                                                outline: "none",
                                            }}
                                            type="submit"
                                        >{Language.getLanguage(LanguageIdMap.SUBSCRIBE)}</RaisedButton>}
                                    </div>
                                </form>
                                <div className="mgRight32 textAlignRight">
                                    {status === "sending" && <div style={{ color: "blue" }}>{Language.getLanguage(LanguageIdMap.SUBSCRIBING)}...</div>}
                                    {status === "error" && <div style={{ color: "red" }} dangerouslySetInnerHTML={{ __html: message }} />}
                                    {status === "success" && <div style={{ color: "green" }}>{Language.getLanguage(LanguageIdMap.SUBSCRIBED)} !</div>}
                                </div>
                            </div>
                        )}
                    />
                </div>
            </div>
            <hr className="footerHr" />
            <div className='row footerS2'>
                <div className='col-sm-3 footerCol'>
                    <div >
                    <div className="footerCompanyName">
                        {config.companyName}
                    </div>
                    <div>Công ty TNHH PHƯỢT VI VU</div>
                    <div>MST: 0313594739</div>
                    <div>Địa chỉ: Tầng 3 tòa nhà Khánh Huy, số 4 Đỗ Thúc Tịnh, P. 12, Q. Gò Vấp, TP. HCM.</div>
                    <div className="mgTop12">{Language.getLanguage(LanguageIdMap.PAYMENT_METHOD)}</div>
                    <img
                        src={"/static/images/payment-phuotvivu.png"}
                        style={{ width: "100%", maxHeight: 40, marginTop: 5 }}
                    />
                    </div>
                </div>
                <div className='col-sm-3 footerCol'>
                    <div className="footerColTitle">
                        Hợp tác với Phuotvivu
                    </div>
                    <div className="mgTop18">
                        <a className="hoverDefaultColor pointer"
                            href={'https://phuotvivu.com/blog/partner/'}
                        >
                            Đối tác
                        </a>
                    </div>
                    <div>
                        <a className="hoverDefaultColor pointer"
                            href={'https://phuotvivu.com/blog/affiliate/'}
                        >
                            Tiếp thị liên kết (affiliate)
                        </a>
                    </div>
                    <div>
                        <a className="hoverDefaultColor pointer"
                            href={'https://pvv-affiliate.phuotvivu.com/login'}
                        >
                            Đăng nhập affiliate
                        </a>
                    </div>



                    <div className="footerColTitle mgTop32">
                        {Language.getLanguage(LanguageIdMap.TERM_OF_USE)}
                    </div>
                    <div className="mgTop18">
                        <a className="hoverDefaultColor pointer"
                            href={config.domain + config.shortUrl.termAndCondition}
                            onClick={e => {
                                e.preventDefault();
                                Router.push(config.domain + config.shortUrl.termAndCondition)
                            }}
                        >
                            {Language.getLanguage(LanguageIdMap.TERM_AND_CONDITIONS)}
                        </a>
                    </div>
                    <div>
                        <a className="hoverDefaultColor pointer"
                            href={config.domain + config.shortUrl.privacyPolicy}
                            onClick={e => {
                                e.preventDefault();
                                Router.push(config.domain + config.shortUrl.privacyPolicy)
                            }}
                        >
                            {Language.getLanguage(LanguageIdMap.PRIVACY_POLICY)}
                        </a>
                    </div>
                </div>

                <div className='col-sm-3 footerCol'>
                    <div className="footerColTitle">
                        {Language.getLanguage(LanguageIdMap.SUPPORT)}
                    </div>
                    <div className="mgTop18">
                        {Language.getLanguage(LanguageIdMap.SUPPORT_TIME_WEEKDAY_DES)}
                    </div>
                    <div>
                        {Language.getLanguage(LanguageIdMap.SUPPORT_TIME_WEEKEND_DES)}
                    </div>
                    <div className="footerFontContact">
                        {config.phoneContact}
                    </div>
                    <div className="pdBottom12">
                        <a href={config.domain + config.shortUrl.faq} style={{ color: "inherit" }}>
                            {!common.checkServer() && <RaisedButton
                                className="hoverDefaultColor"
                                buttonStyle={{
                                    background: "transparent",
                                }}
                                style={{
                                    margin: 8, height: 48, marginBottom: 12,
                                    fontWeight: "bold",
                                    outline: "none", width: "calc(100% - 42px)",
                                    border: "1px solid #999", background: "transparent",
                                    color: "inherit"
                                }}
                                onClick={e => {
                                    e.preventDefault();
                                    Router.push(config.domain + config.shortUrl.faq)
                                }}
                            >{Language.getLanguage(LanguageIdMap.CUSTOMER_SUPPORT)}</RaisedButton>}
                        </a>
                    </div>
                </div>


                <div className='col-sm-3 footerCol'>
                    <div className="footerColTitle">
                        {Language.getLanguage(LanguageIdMap.ABOUT_NAME, { name: config.companyName })}
                    </div>
                    <div className="mgTop18">
                        <a className="hoverDefaultColor pointer"
                            href={config.domain + config.shortUrl.aboutUs}
                            onClick={e => {
                                e.preventDefault();
                                Router.push(config.domain + config.shortUrl.aboutUs)
                            }}
                        >
                            {Language.getLanguage(LanguageIdMap.ABOUT_US)}
                        </a>
                    </div>
                    <div>
                        <a className="hoverDefaultColor pointer"
                            href={config.domain + config.shortUrl.contact}
                            onClick={e => {
                                e.preventDefault();
                                Router.push(config.domain + config.shortUrl.contact)
                            }}
                        >
                            {Language.getLanguage(LanguageIdMap.CONTACT_US)}
                        </a>
                    </div>


                    <div className="footerColTitle mgTop32">
                        Cẩm nang du lịch
                    </div>
                    <div className="mgTop18">
                        <a className="hoverDefaultColor pointer"
                            href={'https://phuotvivu.com/blog/'}
                        >
                            Blog
                        </a>
                    </div>
                    <div>
                        <a className="hoverDefaultColor pointer"
                            href={'https://phuotvivu.com/blog/kinh-nghiem-du-lich/'}
                        >
                            Kinh nghiệm du lịch
                        </a>
                    </div>
                    <div>
                        <a className="hoverDefaultColor pointer"
                            href={'https://phuotvivu.com/blog/ebook/'}
                        >
                            Ebook
                        </a>
                    </div>
                </div>
            </div>
        </div>
    }
    renderSubmitButton(buttonText, buttonStyle = undefined, uploadPercent = undefined) {
        // console.log("render submit this.isLoadingSubmitButton:"+this.isLoadingSubmitButton)
        return <div style={{ textAlign: "center", marginTop: 24 }}>
            <Button
                style={{
                    height: 48, marginBottom: 0,//config.sizeConfig.belowTitle,
                    ...(buttonStyle ? buttonStyle : config.buttonStyle[0]),
                    fontWeight: "bold",
                    outline: "none",
                    opacity: this.isLoadingSubmitButton ? 0.3 : 1
                }}
                type="submit" bsSize="large" block>
                {!this.isLoadingSubmitButton && buttonText}
                {this.isLoadingSubmitButton &&
                    <ReactLoading type="bubbles"
                        style={{ margin: "auto", marginTop: -30, width: 60, height: 20, fill: "#fff" }} />}
            </Button>
            {uploadPercent !== undefined && <LinearProgress mode="determinate" value={uploadPercent * 100} />}

        </div>
    }


    //typeInput: text, select, number,          when it's number, inputRefOrValue is pair of [{input:this.giaThapNhat,output:out => { this.giaThapNhat = out; }}]
    //if typeinput = number, inputRefOrValue--> it value
    //dataInputType: type of select, dataInputType[0]=id, dataInputType[1]=value]
    //dataInputExample: [{"id":1,"value":"Quận 1"},{"id":2,"value":"Quận 2"} with dataInputType:["id", "value"]
    //if dataInputType=money, typeinput=number it will be auto add 000 to number

    // renderDatePicker(minDate = moment().add(-10000, "days"), maxDate = moment().add(10000, "days"), disabled = false) {
    //     return <DatePicker
    //         dateFormat="DD-MM-YYYY"
    //         customInput={<CustomDateInput disabled={disabled} />}
    //         startDate={this.state.startDate}
    //         minDate={minDate}
    //         maxDate={maxDate}
    //         selected={this.state.startDate}
    //         onChange={(date) => { this.setState({ startDate: date }) }}
    //     />

    // }
    // renderStartDateInDateRange(minDate = moment().add(-10000, "days"), maxDate = moment().add(10000, "days"), disabled = false) {
    //     return <DatePicker
    //         dateFormat="DD-MM-YYYY"
    //         selectsStart
    //         customInput={<CustomDateInput disabled={disabled} />}
    //         startDate={this.state.startDate}
    //         endDate={this.state.endDate}
    //         minDate={minDate}
    //         maxDate={maxDate}
    //         selected={this.state.startDate}
    //         onChange={(date) => { this.setState({ startDate: date }) }}
    //     />
    // }
    // renderEndDateInDateRange(minDate = moment().add(-10000, "days"), maxDate = moment().add(10000, "days"), disabled = false) {
    //     return <DatePicker
    //         dateFormat="DD-MM-YYYY"
    //         selectsEnd
    //         customInput={<CustomDateInput disabled={disabled} />}
    //         startDate={this.state.startDate}
    //         endDate={this.state.endDate}
    //         minDate={minDate}
    //         maxDate={maxDate}
    //         selected={this.state.endDate}
    //         onChange={(date) => { this.setState({ endDate: date }) }}
    //     />
    // }
    replaceBreakLineStringToHtml(str, addToLast = undefined, ) {
        if (str == undefined) {
            return "";
        }
        let returnStr = [];
        let strArr = str.split('\n');
        // for (var i = 0; i < strArr.length; i++) {
        //     console.log("i:"+i+";strarrlength:"+strArr.length)
        //     addToLast="zzzzz"
        //     returnStr.push(<div style={{ position: "relative" }}>{strArr[i]} {(addToLast!==undefined && i == strArr.length - 1) ? addToLast : ""}</div>)
        // }
        returnStr = <div>
            {strArr.map((rowData, index) => {
                let addToLastRow = "";
                if (addToLast !== undefined && index == strArr.length - 1) {
                    addToLastRow = addToLast;
                }
                if (index !== 0 && rowData.replace(/[^a-zA-Z ]/g, "") == "") {
                    return <div key={index}><br />{rowData}{addToLastRow}</div>
                } else {
                    return <div key={index}>{rowData}{addToLastRow}</div>
                }
            })}
        </div>
        return returnStr;
    }
    doSomeThing(func) {
        func();
    }

    renderMoreLessContentString(str, maxLengthShowMore = 100) {
        let spaceAt = str.indexOf(" ", maxLengthShowMore - 1);
        if (spaceAt < 0) {
            spaceAt = 100;
        }
        return <div style={{ ...config.fontStyle.fontDefault }}>
            {str.length < maxLengthShowMore
                ? this.replaceBreakLineStringToHtml(str)
                : (this.generalIntroductionFull ?
                    <div>{this.replaceBreakLineStringToHtml(str)}
                        <div style={{ textAlign: "right" }}>
                            <a href="" style={{ color: "#0074c2" }} onClick={(e) => {
                                e.preventDefault();
                                this.generalIntroductionFull = undefined;
                                this.forceUpdate();
                            }}>{Language.getLanguage(LanguageIdMap.seeLess)}</a>
                        </div>
                    </div>
                    : <div >
                        {this.replaceBreakLineStringToHtml(str.substring(0, spaceAt),
                            <OverlayTrigger
                                placement="left"
                                overlay={<Popover style={{

                                }}>
                                    {this.replaceBreakLineStringToHtml(str)}
                                </Popover>}
                            ><t style={{ marginLeft: -5 }}>&nbsp;...</t></OverlayTrigger>)}

                        <div style={{ textAlign: "right" }}>
                            <a href="" style={{ color: "#0074c2" }} onClick={(e) => {
                                e.preventDefault();
                                this.generalIntroductionFull = true;
                                this.forceUpdate();
                            }}>{Language.getLanguage(LanguageIdMap.more)}</a>
                        </div>
                    </div>)
            }
            <hr style={{ marginTop: 24, marginBottom: 24 }} />
        </div>
    }
    renderTest(a) {
        console.log("aaa->" + a)
        return <div />
    }
    logout(updateAllPage = true) {
        // console.log("call logout:" + window.localStorage.getItem("uid"));
        // common.currentMainComponent.removeFireBaseTokenToServer();
        // console.log("logout 0")
        try {
            window
        } catch (error) {
            return;
        }

        window.localStorage.removeItem("loginUser")
        if (!window.localStorage.getItem("uid")) {
            common.setCookie("SID", "", 1);
            if (common.headerComponent) {
                common.headerComponent.forceUpdate();
            }
            return;
        }
        common.shoppingCart = undefined;
        common.fetcher(
            config.api.hostType.auth_url,
            config.api.hostEndPoint.logout,
            "post",
            undefined,
            undefined,
            { typeFormUrlencoded: true }
        ).then((data) => {
        }).catch((err) => { })
        common.setCookie("SID", "", 1);
        common.userProfileData = undefined;
        window.localStorage.removeItem("uid");
        Router.push(config.shortUrl.home)
        if (updateAllPage) {
            this.forceUpdate();
            if (common.headerComponent) {
                common.headerComponent.forceUpdate();
            }
        }
    }
    login(body) {
        // console.log("call login with:"+JSON.stringify(body))
        if (this.loginLoading) {
            return;
        }
        this.loginLoading = true;
        common.fetcher(
            config.api.hostType.auth_url,
            config.api.hostEndPoint.login,
            "post",
            undefined,
            body,
            { typeFormUrlencoded: true }
        )
            .then((data) => {
                this.loginLoading = undefined;

                setTimeout(function () {
                    common.getShoppingCartList();
                }, 500)

                common.setCookie("SID", data.data.sessionKey, data.data.expire);
                window.localStorage.setItem("uid", data.data.uid);
                window.localStorage.setItem("loginUser", body.login);
                if (data.data.status == -1) {
                    window.localStorage.setItem("needVerifyAccount", true);

                    // this.setState({
                    //     loginModalPopup: undefined,
                    //     registerModalPopup: undefined
                    // })
                } else {
                    // alert("res login:"+JSON.stringify(data)+";;;")
                    // alert(url.searchParams.get("loginto"))
                    if (common.location.search.loginto) {
                        let targetUrl = common.location.search.loginto;
                        // alert(targetUrl)
                        if (targetUrl.indexOf("http") >= 0) {
                            window.location.href = targetUrl;
                        } else {
                            window.location.href = "http://" + targetUrl;
                        }
                        return;
                    }
                    // if (common.currentMainComponent) {
                    //     common.currentMainComponent.sendFireBaseTokenToServer();
                    // }
                    if (common.headerComponent) {
                        common.headerComponent.updateUserProfile(true);
                    }

                    this.setState({
                        loginModalPopup: undefined,
                        registerModalPopup: undefined
                    }, () => {
                        if (common.more.needCallbackWhenLogin) {
                            common.more.needCallbackWhenLogin();
                            common.more.needCallbackWhenLogin = undefined;
                        }
                        if (common.more.needReloadWhenLogin) {
                            setTimeout(function () {
                                common.more.needReloadWhenLogin = undefined;
                                this.forceUpdate();
                                if (common.headerComponent) {
                                    common.headerComponent.forceUpdate();
                                }
                            }, 1000);
                        } else {
                            this.forceUpdate();
                            if (common.headerComponent) {
                                common.headerComponent.forceUpdate();
                            }
                        }
                    })

                }
                //this.forceUpdate();
            })
            .catch((err) => {
                // console.log("loi 2")
                this.loginLoading = undefined;
                this.forceUpdate();
            })
        this.forceUpdate();
    }

    responseFacebookLogin(response) {
        console.log("res:" + JSON.stringify(response));
        // return;
        if (!this.hasClickLoginFb || !this.loginLoading) {
            return;
        }
        this.hasClickLoginFb = undefined;
        this.loginLoading = undefined;  //login will call again
        if (response.isCancelled) {
            this.forceUpdate();
        } else {
            // console.log("fb login")
            this.login({
                login: response.userID,
                secret: response.accessToken,
                countryCode: 84,
                authType: config.api.hostEndPointDesc.login.authType.Facebook,
                ...(common.getCookie("referrerCode") ? { referrerCode: common.getCookie("referrerCode") } : {})
            })
        }
    }
    renderLoginFb() {
        const MyFacebookButton = ({ onClick }) => (
            <Button onClick={onClick}
                style={{
                    height: 48, marginBottom: config.sizeConfig.belowTitle,
                    width: "100%", background: "#4267b2", color: "#fff",
                    fontWeight: "bold", fontSize: 18,
                    outline: "none",
                    opacity: this.loginLoading ? 0.3 : 1
                }}>
                Login with facebook
            </Button>
        )
        return <div
            onClick={function () {
                if (this.loginLoading != true && this.hasClickLoginFb != true) {
                    this.hasClickLoginFb = true;
                    this.loginLoading = true;
                    this.forceUpdate();
                }
            }.bind(this)}
        >
            {(this.loginLoading == true || this.hasClickLoginFb == true) && MyFacebookButton(() => { })}
            {this.loginLoading != true && this.hasClickLoginFb != true && <FacebookAuth
                appId={config.facebookAppId}
                autoLoad={false}
                xfbml={true}
                fields="name,email"
                scope="public_profile"
                // fields="public_profile"
                callback={this.responseFacebookLogin.bind(this)}
                // cssClass="fbButton"
                disableRedirect={true}
                component={MyFacebookButton}
                icon=""//"fa-facebook"
            />}
        </div>
    }
    cancelLoginCallback() {

    }
    renderLogin() {
        if (!this.state.loginModalPopup) {
            return;
        }
        return <Modal show={true}
            onHide={() => {
                this.cancelLoginCallback();
                common.more.needCallbackWhenLogin = undefined;
                this.setState({
                    loginModalPopup: undefined,
                })
            }}
        >
            <Modal.Body style={{ padding: config.sizeConfig.distanceSection }}>
                <div
                    className="closeHover"
                    aria-hidden="true" style={{
                        cursor: "pointer", fontSize: 30, marginTop: -15,
                        marginBottom: 10, display: "inline-block"
                    }}
                    onClick={() => {
                        this.cancelLoginCallback();
                        common.more.needCallbackWhenLogin = undefined;
                        this.setState({
                            loginModalPopup: false,
                        })
                    }}
                >×</div>
                {this.renderLoginFb()}
                <form role="form" onSubmit={(e) => {
                    e.preventDefault();
                    this.login({
                        login: this.sodt.value,
                        secret: this.pass.value,
                        authType: config.api.hostEndPointDesc.login.authType.Email,
                    })
                    this.loginLoading = true;
                    this.forceUpdate();
                }}>
                    <FormGroup>
                        <div style={{
                            textAlign: "center",
                            marginTop: config.sizeConfig.belowTitle,
                            marginBottom: config.sizeConfig.belowTitle
                        }}>
                            <span>
                                <span>
                                    {Language.getLanguage(LanguageIdMap.txtOr)}
                                </span>
                            </span>
                        </div>
                        <FormControl
                            style={{ height: 48, marginBottom: config.sizeConfig.belowTitle }}
                            type="text"
                            placeholder={Language.getLanguage(LanguageIdMap.placeholder_enter_email)}
                            inputRef={ref => { this.sodt = ref; }}
                        />
                        <FormControl
                            style={{ height: 48, marginBottom: config.sizeConfig.belowTitle }}
                            type="password"
                            autoComplete="off"
                            placeholder={Language.getLanguage(LanguageIdMap.placeholder_enter_password)}
                            inputRef={ref => { this.pass = ref; }}
                        />

                        <Button
                            style={{
                                height: 48, marginBottom: config.sizeConfig.belowTitle,
                                ...config.buttonStyle[0],
                                fontWeight: "bold",
                                outline: "none",
                                opacity: this.loginLoading ? 0.3 : 1,
                            }}
                            type="submit" bsSize="large" block>
                            {!this.loginLoading && Language.getLanguage(LanguageIdMap.btnLogin)}
                            {this.loginLoading &&
                                <ReactLoading type="bubbles"
                                    style={{ margin: "auto", marginTop: -30, width: 60, height: 20, fill: "#fff" }} />}
                        </Button>

                        <div style={{ textAlign: "center" }}>
                            <a href=""
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.setState({
                                        loginModalPopup: undefined,
                                        forgetPasswordModal: true,
                                    })
                                    this.forceUpdate();
                                }}>
                                {Language.getLanguage(LanguageIdMap.btnForgetPassword)}</a>
                        </div>
                        <div style={{
                            borderBottom: "1px solid #DBDBDB",
                            marginTop: config.sizeConfig.belowTitle,
                            marginBottom: config.sizeConfig.belowTitle
                        }} />
                        <div style={{ textAlign: "center" }}>
                            {Language.getLanguage(LanguageIdMap.noAccount)}?&nbsp;&nbsp;
                        <a href=""
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.setState({
                                        loginModalPopup: false,
                                        registerModalPopup: true,
                                    })
                                }}>
                                {Language.getLanguage(LanguageIdMap.registerNow)}
                            </a>
                        </div>
                    </FormGroup>
                </form>
            </Modal.Body>
        </Modal >
    }
    renderRegister() {
        if (!this.state.registerModalPopup) {
            return;
        }
        return <Modal show={this.state.registerModalPopup}
            onHide={() => {
                this.cancelLoginCallback();
                common.more.needCallbackWhenLogin = undefined;
                this.setState({
                    registerModalPopup: undefined,
                })
            }}
        >
            <Modal.Body style={{ padding: config.sizeConfig.distanceSection }}>
                <form role="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (this.registerLoading) {
                            return;
                        }
                        let loginUser = this.loginRef.value;

                        let errArr = [];
                        if (!loginUser) {
                            errArr.push("email")
                        } else if (loginUser.indexOf("@") < 0) {
                            errArr.push("email hợp lệ")
                        }
                        if (!this.secret.value) {
                            errArr.push("mật khẩu")
                        }
                        if (!this.firstName.value) {
                            errArr.push("họ và tên")
                        }
                        if (errArr.length > 0) {
                            this.setState({
                                alertModalPopup: {
                                    titleAlertModal: Language.getLanguage(LanguageIdMap.notification),
                                    descAlertModal: Language.getLanguage(LanguageIdMap.NEED_INPUT_DATA, { data: errArr.join(", ") })
                                }
                            })
                            return;
                        }

                        this.registerLoading = true;
                        common.fetcher(
                            config.api.hostType.auth_url,
                            config.api.hostEndPoint.register,
                            "post",
                            undefined,
                            {
                                login: loginUser,
                                secret: this.secret.value,
                                firstName: this.firstName.value,
                                countryCode: 84,
                                ...(common.getCookie("referrerCode") ? { referrerCode: common.getCookie("referrerCode") } : {})
                            },
                            { typeFormUrlencoded: true }
                        )
                            .then((data) => {
                                this.registerLoading = false;
                                this.login({
                                    login: loginUser,
                                    secret: this.secret.value,
                                    countryCode: 84,
                                    authType: config.api.hostEndPointDesc.login.authType.Email,
                                    ...(common.getCookie("referrerCode") ? { referrerCode: common.getCookie("referrerCode") } : {})
                                })
                                this.setState({
                                    registerModalPopup: undefined,
                                    alertSnackBar: Language.getLanguage(LanguageIdMap.REGISTER_SUCCESS)
                                })
                            })
                            .catch((err) => {
                                this.registerLoading = undefined;
                                console.log("---------->err:" + err)
                                this.forceUpdate();
                            })
                        this.forceUpdate();
                    }}
                >
                    <FormGroup>
                        <div
                            className="closeHover"
                            aria-hidden="true" style={{
                                cursor: "pointer", fontSize: 30, marginTop: -15,
                                marginBottom: 10, float: "left"
                            }}
                            onClick={() => {
                                this.cancelLoginCallback();
                                common.more.needCallbackWhenLogin = undefined;
                                this.setState({
                                    registerModalPopup: false,
                                })
                            }}
                        >×</div>
                        <div style={{
                            textAlign: "center", ...config.fontStyle.h1,
                            ...config.fontStyle.fontFamilyBold,
                            marginBottom: 16
                        }}>
                            {Language.getLanguage(LanguageIdMap.btnRegister)}
                        </div>
                        <FormControl
                            style={{ height: 48, marginBottom: config.sizeConfig.belowTitle }}
                            type="text"
                            placeholder={Language.getLanguage(LanguageIdMap.placeholder_enter_email)}
                            inputRef={ref => { this.loginRef = ref; }}
                        />
                        <div style={{ position: "relative" }}>
                            <FormControl
                                autoComplete="off"
                                style={{ height: 48, marginBottom: config.sizeConfig.belowTitle, }}
                                type={this.passVisible ? "text" : "password"}
                                placeholder={Language.getLanguage(LanguageIdMap.placeholder_enter_password)}
                                inputRef={ref => { this.secret = ref; }}
                            /> <Glyphicon
                                style={{ cursor: "pointer", position: "absolute", right: 10, top: 18 }}
                                glyph="eye-open" onClick={() => {
                                    this.passVisible = !this.passVisible;
                                    this.forceUpdate();
                                }} />
                        </div>
                        <FormControl
                            style={{ height: 48, marginBottom: config.sizeConfig.belowTitle }}
                            type="text"
                            placeholder={Language.getLanguage(LanguageIdMap.placeholder_enter_fullname)}
                            inputRef={ref => { this.firstName = ref; }}
                        />

                        <Button
                            style={{
                                height: 48, marginBottom: config.sizeConfig.belowTitle,
                                ...config.buttonStyle[0],
                                fontWeight: "bold",
                                outline: "none",
                                opacity: this.registerLoading ? 0.3 : 1
                            }}
                            type="submit" bsSize="large" block>
                            {!this.registerLoading && Language.getLanguage(LanguageIdMap.btnRegister)}
                            {this.registerLoading &&
                                <ReactLoading type="bubbles"
                                    style={{ margin: "auto", marginTop: -30, width: 60, height: 20, fill: "#fff" }} />}
                        </Button>

                        <div style={{
                            borderBottom: "1px solid #DBDBDB",
                            marginTop: config.sizeConfig.belowTitle,
                            marginBottom: config.sizeConfig.belowTitle
                        }} />
                        <div style={{ textAlign: "center" }}>
                            {Language.getLanguage(LanguageIdMap.haveAccount)}?&nbsp;&nbsp;
                        <a href=""
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.setState({
                                        loginModalPopup: true,
                                        registerModalPopup: false,
                                    })
                                }}>{Language.getLanguage(LanguageIdMap.loginNow)}</a>
                        </div>
                    </FormGroup>
                </form>
            </Modal.Body>
        </Modal >
    }
    renderUploadImagePopup() {
        if (!this.state.uploadImagePopup) {
            return;
        }
        return <Dialog
            contentStyle={{ width: "95%", maxWidth: "none" }}
            bodyStyle={{ overflowY: "auto" }}
            modal={false}
            open={true}
            onRequestClose={() => { this.setState({ uploadImagePopup: undefined }) }}
        >
            <div >
                <div style={{ textAlign: "center", ...config.fontStyle.h1, marginBottom: 8 }}>
                    {(this.state.uploadImagePopup.title)
                        ? this.state.uploadImagePopup.title
                        : Language.getLanguage(LanguageIdMap.camera_roll)
                    }
                </div>
            </div>
            <form role="form" onSubmit={(e) => {
                e.preventDefault();
                if (this.state.uploadImagePopup.onUploadAvatarSubmit) {
                    this.state.uploadImagePopup.onUploadAvatarSubmit();
                }
            }}>
                {this.state.uploadImagePopup && <div style={{ textAlign: "center" }}>
                    <div style={{ border: "1px solid #000", display: "inline-block" }}>
                        <AvatarEditor
                            ref={(editor) => { this.imageEditorFileRef = editor }}
                            disableDrop={true}
                            image={this.state.imageEditorFile}
                            width={this.state.uploadImagePopup.width ? this.state.uploadImagePopup.width : 250}
                            height={this.state.uploadImagePopup.height ? this.state.uploadImagePopup.height : 250}
                            border={0}
                            scale={this.state.uploadImagePopup.scale ? this.state.uploadImagePopup.scale : 1}
                            borderRadius={this.state.uploadImagePopup.borderRadius ? this.state.uploadImagePopup.borderRadius : 1}
                            rotate={this.state.uploadImagePopup.rotate ? this.state.uploadImagePopup.rotate : 0}
                        />
                    </div>
                    <div>
                        {this.state.imageEditorFile && <i className="fa fa-search-plus fa-fw"
                            style={{ cursor: "pointer", ...config.fontStyle.h2, color: config.colorConfig.main, padding: 2 }}
                            onClick={() => {
                                if (!this.state.uploadImagePopup.scale) {
                                    this.state.uploadImagePopup.scale = 1;
                                }
                                this.state.uploadImagePopup.scale *= 1.05;
                                this.forceUpdate();
                            }} />}
                        {this.state.imageEditorFile && <i className="fa fa-search-minus fa-fw"
                            style={{ cursor: "pointer", ...config.fontStyle.h2, color: config.colorConfig.main, padding: 2 }}
                            onClick={() => {
                                if (!this.state.uploadImagePopup.scale) {
                                    this.state.uploadImagePopup.scale = 1;
                                }
                                this.state.uploadImagePopup.scale /= 1.05;
                                this.forceUpdate();
                            }} />}
                        {this.state.imageEditorFile && <i className="fa fa-reply fa-fw"
                            style={{ cursor: "pointer", ...config.fontStyle.h2, color: config.colorConfig.main, padding: 2 }}
                            onClick={() => {
                                if (!this.state.uploadImagePopup.rotate) {
                                    this.state.uploadImagePopup.rotate = 0;
                                }
                                this.state.uploadImagePopup.rotate -= 90;
                                this.forceUpdate();
                            }} />}
                        {this.state.imageEditorFile && <i className="fa fa-share fa-fw"
                            style={{ cursor: "pointer", ...config.fontStyle.h2, color: config.colorConfig.main, padding: 2 }}
                            onClick={() => {
                                if (!this.state.uploadImagePopup.rotate) {
                                    this.state.uploadImagePopup.rotate = 0;
                                }
                                this.state.uploadImagePopup.rotate += 90;
                                this.forceUpdate();
                            }} />}
                        {this.state.imageEditorFile && <i
                            style={{ cursor: "pointer", ...config.fontStyle.h2, color: config.colorConfig.main, padding: 2 }}
                            onClick={() => {
                                if (!this.state.uploadImagePopup.width) {
                                    this.state.uploadImagePopup.width = 250;
                                }
                                this.state.uploadImagePopup.width += 10;
                                this.forceUpdate();
                            }}
                        >
                            <i className="fa fa-arrow-left fa-fw" />
                            <i className="fa fa-arrow-right fa-fw" style={{ marginLeft: "-0.5em" }} />
                        </i>}
                        {this.state.imageEditorFile && <i
                            style={{ cursor: "pointer", ...config.fontStyle.h2, color: config.colorConfig.main, padding: 2 }}
                            onClick={() => {
                                if (!this.state.uploadImagePopup.width) {
                                    this.state.uploadImagePopup.width = 250;
                                }
                                this.state.uploadImagePopup.width -= 10;
                                this.forceUpdate();
                            }}
                        >
                            <i className="fa fa-arrow-right fa-fw" />
                            <i className="fa fa-arrow-left fa-fw" style={{ marginLeft: "-0.5em" }} />
                        </i>}
                        {this.state.imageEditorFile && <i
                            style={{
                                cursor: "pointer", ...config.fontStyle.h2, color: config.colorConfig.main
                                , padding: 2, display: "inline-block"
                            }}
                            onClick={() => {
                                if (!this.state.uploadImagePopup.height) {
                                    this.state.uploadImagePopup.height = 250;
                                }
                                this.state.uploadImagePopup.height += 10;
                                this.forceUpdate();
                            }}
                        >
                            <div style={{ marginBottom: -12 }}><i className="fa fa-arrow-up fa-fw" /></div>
                            <div><i className="fa fa-arrow-down fa-fw" /></div>
                        </i>}
                        {this.state.imageEditorFile && <i
                            style={{
                                cursor: "pointer", ...config.fontStyle.h2, color: config.colorConfig.main
                                , padding: 2, display: "inline-block"
                            }}
                            onClick={() => {
                                if (!this.state.uploadImagePopup.height) {
                                    this.state.uploadImagePopup.height = 250;
                                }
                                this.state.uploadImagePopup.height -= 10;
                                this.forceUpdate();
                            }}
                        >
                            <div style={{ marginBottom: -12 }}><i className="fa fa-arrow-down fa-fw" /></div>
                            <div><i className="fa fa-arrow-up fa-fw" /></div>
                        </i>}
                    </div>
                    <input className="fileInput"
                        multiple={false}
                        style={{ margin: "auto", marginTop: 8 }}
                        type="file"
                        onChange={(e) => {
                            e.preventDefault();
                            let reader = new FileReader();
                            let file = e.target.files[0];

                            if (file === undefined) {
                                return;
                            }
                            this.setState({
                                imageEditorFile: file,
                            });
                            // var img = new Image();
                            // img.src = window.URL.createObjectURL(file);
                            // img.onload = function () {
                            //     reader.onloadend = function () {
                            //         this.setState({
                            //             imageEditorFile: file,
                            //         });
                            //     }.bind(this)
                            //     reader.readAsDataURL(file)
                            // }.bind(this)
                        }}
                    />
                    {this.state.imageEditorFile !== undefined && <RaisedButton
                        buttonStyle={{ ...config.buttonStyle[0], }}
                        style={{
                            height: 48, marginBottom: config.sizeConfig.belowTitle,
                            width: 150, margin: 8,
                            fontWeight: "bold",
                            outline: "none",
                        }}
                        type="submit"
                    >{Language.getLanguage(LanguageIdMap.confirm)}</RaisedButton>}
                    <RaisedButton
                        buttonStyle={{ ...config.buttonStyle[1], }}
                        style={{
                            height: 48, marginBottom: config.sizeConfig.belowTitle,
                            width: 150, margin: 8,
                            fontWeight: "bold",
                            outline: "none",
                        }}
                        onClick={() => { this.setState({ uploadImagePopup: undefined }) }}
                    >{Language.getLanguage(LanguageIdMap.btnClose)}</RaisedButton>
                </div >}
            </form>
        </Dialog>
    }
    renderForgetPassword() {
        if (!this.state.forgetPasswordModal) {
            return;
        }
        return <Modal show={true}>
            <Modal.Body style={{ padding: config.sizeConfig.distanceSection }}>
                <form role="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (this.forgetPasswordCallingApi) {
                            return;
                        }
                        this.forgetPasswordCallingApi = true;
                        let email = this.forgetPasswordModalEmail.value;

                        common.fetcher(
                            config.api.hostType.auth_url,
                            config.api.hostEndPoint.forgetEmailPassword,
                            "post",
                            {
                                email: email,
                            },
                            undefined,
                            { typeFormUrlencoded: true }
                        ).then((data) => {
                            this.forgetPasswordCallingApi = undefined;
                            this.setState({
                                forgetPasswordModal: undefined,
                                alertModalPopup: {
                                    titleAlertModal: Language.getLanguage(LanguageIdMap.notification),
                                    descAlertModal: Language.getLanguage(LanguageIdMap.CHECK_EMAIL_TO_CHANGE_PASSWORD, { email: email })
                                }
                            })
                        }).catch((err) => {
                            this.forgetPasswordCallingApi = undefined;
                            this.forceUpdate();
                        })
                        this.forceUpdate();

                    }}
                >
                    <FormGroup>
                        <div aria-hidden="true" style={{
                            cursor: "pointer", fontSize: 30, marginTop: -15,
                            opacity: this.state.closeHover ? 0.5 : 0.2,
                            marginBottom: 10, float: "left"
                        }}
                            onClick={() => {
                                this.setState({
                                    forgetPasswordModal: undefined
                                })
                            }}
                        >×</div>
                        <div style={{
                            textAlign: "center", ...config.fontStyle.h1,
                            ...config.fontStyle.fontFamilyBold,
                            marginBottom: 16
                        }}>
                            {Language.getLanguage(LanguageIdMap.btnForgetPassword)}
                        </div>
                        <FormControl
                            style={{
                                height: 48, marginBottom: config.sizeConfig.belowTitle,
                                textAlign: "center"
                            }}
                            type="text"
                            placeholder={Language.getLanguage(LanguageIdMap.placeholder_enter_email)}
                            inputRef={ref => { this.forgetPasswordModalEmail = ref; }}
                        />

                        <Button
                            style={{
                                height: 48, marginBottom: config.sizeConfig.belowTitle,
                                ...config.buttonStyle[0],
                                fontWeight: "bold",
                                outline: "none",
                                opacity: this.forgetPasswordCallingApi ? 0.3 : 1
                            }}
                            type="submit" bsSize="large" block>
                            {!this.forgetPasswordCallingApi && Language.getLanguage(LanguageIdMap.confirm)}
                            {this.forgetPasswordCallingApi &&
                                <ReactLoading type="bubbles"
                                    style={{ margin: "auto", marginTop: -30, width: 60, height: 20, fill: "#fff" }} />}
                        </Button>

                        <div style={{
                            borderBottom: "1px solid #DBDBDB",
                            marginTop: config.sizeConfig.belowTitle,
                            marginBottom: config.sizeConfig.belowTitle
                        }} />
                        <div style={{ textAlign: "center" }}>
                            {Language.getLanguage(LanguageIdMap.noAccount)}?&nbsp;&nbsp;
                            <a href=""
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.localStorage.removeItem("forgetPassword")
                                    window.localStorage.removeItem("loginUser")
                                    this.setState({
                                        registerModalPopup: true,
                                        forgetPasswordModal: false,
                                    })
                                }}>
                                {Language.getLanguage(LanguageIdMap.registerNow)}
                            </a>
                        </div>
                    </FormGroup>
                </form>
            </Modal.Body>
        </Modal >
    }


    //add to first array
    addToScrollFocusCallback(id, callback) {
        if (this.scrollFocusCallbackArr === undefined) {
            this.scrollFocusCallbackArr = [];
        }
        this.scrollFocusCallbackArr = [{ id: id, callback: callback }, ...this.scrollFocusCallbackArr]
    }
    scrollEventCallback() {

    }
    handleOnScrollEvent(e) {
        this.scrollEventCallback();
        if (!this.scrollFocusCallbackArr) {
            return;
        }
        let wS = document.documentElement.scrollTop
        for (let i = 0; i < this.scrollFocusCallbackArr.length; i++) {
            if ($('#' + this.scrollFocusCallbackArr[i].id) && $('#' + this.scrollFocusCallbackArr[i].id).offset()) {
                let hT = $('#' + this.scrollFocusCallbackArr[i].id).offset().top;
                if (wS > (hT - 150)) {
                    if (this._currentScrollFocus !== this.scrollFocusCallbackArr[i].id) {
                        this._currentScrollFocus = this.scrollFocusCallbackArr[i].id;
                        // console.log("this._currentScrollFocus=" + this._currentScrollFocus)
                        if (this.scrollFocusCallbackArr[i].callback) {
                            this.scrollFocusCallbackArr[i].callback();
                        } else {
                            this.forceUpdate();
                        }
                    }
                    return;
                }
            }
        }
    }


    renderOneRow(data, option = {
        titleCenter: false,
        loadMore: undefined,
        cardRender: undefined,
        canWrapRow: undefined,
    }) {
        if (!data || !data.data) {
            return;
        }
        // console.log("----------------------common.getViewportWidth():" + common.getViewportWidth())
        if (!data._presetConfigData) {
            try {
                document
                data._presetConfigData = true;
            } catch (error) {

            }
            data._curCardOfRow = 0;

            data._maxCardDisplayOfRow = Math.round(Math.round(common.getViewportWidth()) / 250)
            if (data._configMaxCardDisplayOfRow && data._maxCardDisplayOfRow > data._configMaxCardDisplayOfRow) {
                data._maxCardDisplayOfRow = data._configMaxCardDisplayOfRow;
            } else if (data._maxCardDisplayOfRow > 4 && !data._isSquare) {
                data._maxCardDisplayOfRow = 4;
            } else if (data._maxCardDisplayOfRow > 6 && data._isSquare) {
                data._maxCardDisplayOfRow = 6;
            } else if (data._maxCardDisplayOfRow < 2) {
                data._maxCardDisplayOfRow = 2;
            }
        }

        let id = new Date().getTime() + Math.round(Math.random() * 1000)

        return <div className="posRelative" >
            <Head>
                <style type="text/css">{`
                .cardStyle${id}{
                    padding-left: ${config.sizeConfig.distanceDateButton / 2}px;
                    padding-right: ${config.sizeConfig.distanceDateButton / 2}px;
                    white-space: normal;
                    width: ${100 / data._maxCardDisplayOfRow}%;
                    display: inline-block;
                    vertical-align: top;
                }
                .mainRow${id}{
                    position: relative;
                    overflow: hidden;
                }
                .mainRow${id} > div{
                    margin-bottom: ${data._hasCopyRow !== undefined ? 0 : 24}px;
                    margin-left: -${config.sizeConfig.distanceDateButton / 2}px;
                    margin-right: -${config.sizeConfig.distanceDateButton / 2}px;
                    position: relative;
                    white-space: ${option.canWrapRow ? "inherit" : "nowrap"};
                    transition-duration: 0.3s;
                    transition-property: transform;
                    transform: translateX(-${(data._curCardOfRow / data._maxCardDisplayOfRow) * 100 *
                    ((data._hasCopyRow !== undefined || data._copyOfOtherRow !== undefined) ? 0.5 : 1)}%);
                    overflow: visible;
                    display: block;
                }
                .backNextBtn${id}{
                    position: absolute;
                    transform: translateY(-50%);
                    top: ${data._leftRightHeightButton ? data._leftRightHeightButton : (data._hasCopyRow ? "97%" : "29%")};
                    z-index: 2;
                    cursor: pointer;
                }
                .backBtn${id}{
                    left: ${Math.round(common.getViewportWidth()) >= config.pageSmallWidthStyle.width ? -18 : -12}px
                }
                .nextBtn${id}{
                    right: ${Math.round(common.getViewportWidth()) >= config.pageSmallWidthStyle.width ? -18 : -12}px
                }
            `}</style>
            </Head>
            <div className={`mainRow${id}`}>
                <div>
                    {data.data && data.data.map((card, indexCard) => {
                        if (
                            ((data._hasCopyRow !== undefined || data._copyOfOtherRow !== undefined)
                                && indexCard <= data._curCardOfRow + data._maxCardDisplayOfRow * 2 + 1
                                && (
                                    (indexCard % 2 == 0 && data._hasCopyRow !== undefined)
                                    || (indexCard % 2 == 1 && data._copyOfOtherRow !== undefined)
                                )
                            )
                            || ((data._hasCopyRow === undefined && data._copyOfOtherRow === undefined)
                                && indexCard <= data._curCardOfRow + data._maxCardDisplayOfRow)) {

                            let addToFull = [];
                            if (
                                (indexCard == data.data.length - 1
                                    || (data._copyOfOtherRow !== undefined && indexCard == data.data.length - 2)
                                )
                                && data._curCardOfRow == 0 && indexCard < data._maxCardDisplayOfRow * 2
                                && data._loadingOfRow) {
                                for (let j = indexCard + 1; j < data._maxCardDisplayOfRow * 2; j++) {
                                    if (option.cardRender) {
                                        addToFull.push(option.cardRender({}))
                                    } else {
                                        addToFull.push(<div className={`cardStyle${id}`}>
                                            <Card data={{}} isSquare={data._isSquare} />
                                        </div>)
                                    }
                                }
                            }
                            return (
                                [<div className={`cardStyle${id}`}>
                                    {option.cardRender ? option.cardRender(card)
                                        : <Card data={card}
                                            option={option}
                                            image={card.photoInfo ? card.photoInfo.thumbUrl : undefined}
                                        />}
                                </div>
                                    , addToFull]
                            )
                        }
                    })}
                </div>
            </div>
            {data._curCardOfRow > 0
                && data._copyOfOtherRow === undefined
                && <img src={config.domain + "/static/images/back.png"}
                    className={`visibleWhenHover backNextBtn${id} backBtn${id}`}
                    onClick={() => {
                        data._curCardOfRow--
                        if (data._hasCopyRow) {
                            for (let i = 0; i < data._hasCopyRow.length; i++) {
                                data._hasCopyRow[i]._curCardOfRow -= 2;
                            }
                            data._curCardOfRow--
                        }
                        this.forceUpdate();
                    }}
                />}

            {data._copyOfOtherRow === undefined
                && data._curCardOfRow + data._maxCardDisplayOfRow
                * (data._hasCopyRow !== undefined ? 2 : 1) < data.data.length
                && <img src={config.domain + "/static/images/next.png"}
                    className={`visibleWhenHover backNextBtn${id} nextBtn${id}`}
                    onClick={() => {
                        data._curCardOfRow++
                        if (data._hasCopyRow) {
                            for (let i = 0; i < data._hasCopyRow.length; i++) {
                                data._hasCopyRow[i]._curCardOfRow += 2;
                            }
                            data._curCardOfRow++
                        }
                        if (data._curCardOfRow + data._maxCardDisplayOfRow * (data._hasCopyRow !== undefined ? 2 : 1)
                            >= data.maxCardOfRow - 1) {
                            if (option.loadMore) {
                                option.loadMore();
                            }
                        }
                        this.forceUpdate();
                    }}
                />}
        </div>
    }


    backArrow(props) {
        if (props.currentSlide === 0) {
            return <div />
        }
        return (
            <img
                src={config.domain + "/images/back.png"}
                className={props.className}
                style={{ ...props.style, display: 'block' }}
                onClick={props.onClick}
            />
        );
    }
    nextArrow(props) {
        if (props.slideCount && props.currentSlide && props.currentSlide === props.slideCount - 1) {
            return <div />
        }
        return (
            <img
                src={config.domain + "/images/next.png"}
                className={props.className}
                style={{ ...props.style, display: 'block' }}
                onClick={props.onClick}
            />
        );
    }

    getMaxCardDisplayOfRow(showNum) {
        let maxCard = 1;
        if (showNum == 1) {
            maxCard = Math.round(Math.round(common.getViewportWidth()) / 350)
            if (maxCard > 4) {
                maxCard = 4;
            }
        } else {
            maxCard = Math.round(Math.round(common.getViewportWidth()) / 250)
            if (maxCard > 6) {
                maxCard = 6;
            }
        }
        return maxCard;
    }


    renderLastLoading() {
        if (this.loadingCountdown > 0) {
            return (
                <ReactLoading type="bubbles"
                    style={{ margin: "auto", marginBottom: 30, width: 60, height: 20, fill: config.colorConfig.grey }}
                />
            )
        }
    }

    renderNotify() {
        try {
            window
        } catch (error) {
            return;
        }
        if (window.localStorage.getItem("needVerifyAccount") || window.localStorage.getItem("forgetPassword")) {
            if (!window.localStorage.getItem("lastTimeSendOtp")) {
                window.localStorage.setItem("lastTimeSendOtp", new Date().getTime() / 1000)
            }
            if (!this.stickReloadOtpCountDown) {
                this.stickReloadOtpCountDown = setInterval(function () {
                    this.forceUpdate();
                }.bind(this), 1000);
            }
        } else if (this.stickReloadOtpCountDown) {
            clearInterval(this.stickReloadOtpCountDown);
            this.stickReloadOtpCountDown = undefined;
        }

        // console.log("render supercomponent:" + window.localStorage.getItem("lastTimeSendOtp")
        //     + ";" + Math.floor(new Date().getTime() / 1000)
        //     + ";" + (Math.floor(new Date().getTime() / 1000 - window.localStorage.getItem("lastTimeSendOtp"))))
        return <div>
            {this.renderAlertModal()}
            {this.renderAlertSnackBar()}
            {this.renderUploadImagePopup()}
            {this.renderLogin()}
            {this.renderRegister()}
            {/*this.renderTransferNutConfirm()*/}

            {this.renderForgetPassword()}
        </div>
    }

    renderAlertSnackBar() {
        return <Snackbar
            open={this.state.alertSnackBar ? this.state.alertSnackBar : false}
            message={this.state.alertSnackBar ? this.state.alertSnackBar : ""}
            autoHideDuration={3000}
            onRequestClose={() => {
                this.setState({ alertSnackBar: undefined })
            }}
        />
    }
    renderAlertModal() {
        if (this.state.alertModalPopup == undefined) {
            return;
        }
        return <Modal show={this.state.alertModalPopup}
            style={{ zIndex: 2000 }}
            onHide={
                () => {
                    if (this.state.alertModalPopup.cannotCloseModalPopupOnHide) {
                        return;
                    }
                    this.setState({
                        alertModalPopup: undefined
                    })
                }}
        >
            {this.state.alertModalPopup.titleAlertModal && <Modal.Header
                closeButton={this.state.alertModalPopup.cannotCloseModalPopupOnHide ? undefined : true}
            >
                <Modal.Title>{this.state.alertModalPopup.titleAlertModal}</Modal.Title>
            </Modal.Header>}
            <Modal.Body>
                <FormGroup>
                    {this.state.alertModalPopup.needClickConfirmButton == true
                        && <div style={{ marginTop: 12 }}
                            onClick={(event) => {
                                this.state.alertModalPopup.hasClickConfirmButton
                                    = !this.state.alertModalPopup.hasClickConfirmButton;
                                this.forceUpdate();
                            }}>
                            <Checkbox
                                label={this.state.alertModalPopup.descAlertModal}
                                checked={this.state.alertModalPopup.hasClickConfirmButton == true}
                            />
                        </div>}
                    {this.state.alertModalPopup.needClickConfirmButton != true
                        && this.state.alertModalPopup.descAlertModal}
                </FormGroup>
            </Modal.Body>
            <Modal.Footer>
                {!this.state.alertModalPopup.alertModalPopupButtonNameClickCallback && <Button
                    autoFocus
                    style={{ ...config.buttonStyle[0] }}
                    onClick={() => {
                        this.setState({
                            alertModalPopup: undefined,
                        })
                    }}>Đóng</Button>}
                {this.state.alertModalPopup.alertModalPopupButtonNameClickCallback
                    && this.state.alertModalPopup.alertModalPopupButtonNameClickCallback.map((rowData, index) => {
                        if (!rowData.callback
                            || this.state.alertModalPopup.needClickConfirmButton != true
                            || this.state.alertModalPopup.hasClickConfirmButton) {
                            return <Button
                                key={index}
                                autoFocus={index == 0 ? true : false}
                                style={{ ...config.buttonStyle[index % config.buttonStyle.length] }}
                                onClick={() => {
                                    if (rowData.callback) {
                                        rowData.callback()
                                    }
                                    this.setState({
                                        alertModalPopup: undefined,
                                    })
                                }}>{rowData.name}</Button>
                        }
                    })
                }
            </Modal.Footer>
        </Modal >
    }



    renderProductCard(data) {
        return <a className="colorInherit pointer"
            href={config.domain + config.shortUrl.product + "/" + data.alias}
            onClick={e => {
                e.preventDefault();
                this.props.initPropsData.data = undefined;
                this.props.initPropsData.productRelative = undefined;
                this.props.initPropsData.schedule = undefined;

                Router.push(config.shortUrl.product, config.shortUrl.product + "/" + data.alias)
            }}
        >
            <div className="productCard">
                <img
                    alt={data.featureImage ? data.featureImage.altText : data.photoInfo ? data.photoInfo.altText : undefined}
                    className="productCardImage"
                    src={data.featureImage ? data.featureImage.thumbUrl : data.photoInfo ? data.photoInfo.thumbUrl : undefined}
                />
                {data.discount > 0 && <div className="productCardDiscount">
                    {"-" + data.discount + "%"}
                </div>}
                <div className="productCardDetail"
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();

                        let doSomeThing = function () {
                            common.fetcher(
                                config.api.hostType.product_url,
                                config.api.hostEndPoint.wishlist,
                                "post",
                                undefined,
                                {
                                    targetId: data.productId,
                                    act: data.fav ? 1 : 0,
                                },
                                { typeFormData: true }
                            )
                                .then((jsonRes) => {
                                })
                                .catch((err) => {
                                    console.log("error pro3:" + err)
                                })
                            data.fav = !data.fav;
                            this.forceUpdate();
                        }.bind(this)

                        if (!common.checkLoginUser()) {
                            common.more.needCallbackWhenLogin = doSomeThing.bind(this)
                            this.setState({ loginModalPopup: true });
                        } else {
                            doSomeThing();
                        }
                    }}
                >
                    {!common.checkServer() && <Checkbox
                        checkedIcon={<ActionFavorite className="productCardFav" />}
                        uncheckedIcon={<ActionFavoriteBorder className="productCardFav" />}
                        checked={data.fav}
                    />}
                </div>
            </div>
            {data.productName &&
                <div className="twoLineText productCardExcerpt">
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>
                            {data.productName}
                        </Tooltip>}
                    >
                        <a className="pointer colorInherit">{data.productName}</a>
                    </OverlayTrigger>
                </div>
            }
            {data.excerpt &&
                <div className="twoLineText productCardExcerpt">
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>
                            {data.excerpt}
                        </Tooltip>}
                    >
                        <a className="pointer colorInherit">{data.excerpt}</a>
                    </OverlayTrigger>
                </div>
            }
            <div className="productCardServiceContainer">
                {data.services && !common.checkServer() && data.services.map((data1, rowIndex1) => {
                    return <HoverOpenDropdownMenu
                        key={rowIndex1}
                        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                        targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                        iconButtonElement={
                            <img src={data1.iconUrl} style={{ width: 20, height: 20, marginRight: 4 }} />
                        }
                        data={[
                            <div style={{ paddingTop: 8, paddingLeft: 12, paddingRight: 12 }}>{data1.name}</div>
                        ]}
                    />
                })}
                {Language.getLanguage(LanguageIdMap.from) + " "}
                <sup className="productCardMoney">
                    {Language.getLanguage(common.moneyType)}
                </sup>
                {common.numberWithCommas(data.newPrice ? data.newPrice : data.advertisePrice)}
                {(data.advertisePrice && data.newPrice)
                    && <div className="productCardNewPrice">
                        <sup className="productCardMoney">
                            {Language.getLanguage(common.moneyType)}
                        </sup>
                        {common.numberWithCommas(data.advertisePrice)}
                    </div>
                }
            </div>
        </a>
    }



    getTopHeightNav() {
        //icon header render too late
        try {

            if (document.getElementById("header")) {
                // console.log("-->"+document.getElementById("header").clientHeight)
                return document.getElementById("header").clientHeight;
            }
            if (Math.round(common.getViewportWidth()) >= 889) {
                return 44;
            } else if (Math.round(common.getViewportWidth()) >= 540) {
                return 86
            } else if (Math.round(common.getViewportWidth()) >= 428) {
                return 120
            } else {
                return 200;
            }
        } catch (error) {
            return 44;
        }
    }

}

export default SuperComponent;

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable max-len */
import LanguageIdMap from '../src/language/LanguageIdMap';
import Language from './language/Language';


//cam, xanh voucher, xanh combo,xam,nau hat de, mau tim,hat de nhat, cam dam
export const configProductType = {
  staging: 1,
  live: 2,
}
let tmpData = undefined;
// let domain = "http://localhost:3001";
try {
  tmpData = require('./_tmpdata.json');
  // if(tmpData.data===configProductType.live) {
  //   domain = "http://phuotvivu.phuotvivu.com";
  // } else {
  //   domain = "http://stg-phuotvivu.phuotvivu.com";
  // }
  // console.log("domain --> "+domain)
  // console.log(tmpData.data)
  // do stuff
} catch (ex) {
  console.log(ex)
}
export const productType = tmpData ? tmpData.data : configProductType.staging

const colorConfig={
  main: '#4fffaa',//"#0ab596",
  darkGrey: "#8d8b8a",
  grey: "#f5f5f5",
}
export const config = {
  domain:"",
  facebookAppId:"311335096081890",
  companyLocation:{
    lat:10.7605712,
    lng:106.6976879,
  },
  phoneContact:"0287 300 0776",
  emailContact:"hotro@phuotvivu.com",
  companyName:"Phuotvivu",
  metaTitle: `Phuotvivu - Tour & Vé tham quan ở Châu Á`,
  metaDesc: `Cung cấp tour trong ngày, vé vào các điểm tham quan, vui chơi toàn Châu Á. An toàn và tiết kiệm từ 20-30% khi đặt vé online tại Phuotvivu.`,
  metaImg:`https://pvv-photo.phuotvivu.com/1/f/f/8/s640x424/tour-koh-rong-samloem.jpg`,
  topList: {
    uuDaiTrongThang: {
      id: "VVK",
      name: "Ưu đãi trong tháng",
    },
    diemDenYeuThichTrongNuoc: {
      id: "JTK",
      name: "Điểm yêu thích trong nước",
    },
    phuotBlog: {
      id: "MAV",
      name: "Phượt blog",
    },
    diemYeuThichONuocNgoai: {
      id: "MJP",
      name: "Điểm yêu thích ở nước ngoài",
    },
    phuotBlog2: {
      id: "HHP",
      name: "Phượt blog",
    },
    reviewBlog: {
      id: "JPI",
      name: "Review / blog",
    },
  },
  api: {
    hostType: {
      auth_url: "auth_url",
      profile_url: "profile_url",
      product_url: "product_url",
    },
    getHostNameByHostType: (host) => {
      if (productType === configProductType.staging) {
        switch (host) {
          case 'auth_url': return 'http://09e5ab510779.ngrok.io/api';
          case 'profile_url': return 'http://09e5ab510779.ngrok.io/api';
          case 'product_url': return 'http://09e5ab510779.ngrok.io/api';
        }
      } else {
        switch (host) {
          case 'auth_url': return 'https://pvv-auth-api.phuotvivu.com';
          case 'profile_url': return 'https://pvv-profile-api.phuotvivu.com';
          case 'product_url': return 'https://pvv-product-api.phuotvivu.com';
        }
      }
    },
    hostEndPoint: {
      register: "/auth/register",
      profile: "/profile/{profileId}",
      profileUpdate: "/profile/{profileId}",
      login: "/auth/login",
      logout: "/auth/logout",
      forgetEmailPassword: "/auth/user/{email}/forgot",
      passwordReset: "/auth/user/secret/reset",
      changePassword: "/auth/user/{id}/change/secret",
      getDurationList: "/product/durations",
      getServiceList: "/product/services",

      getTopList: "/product/v1/toplist/elements",

      topDestination: "/product/destination/tops",
      allDestination: "/product/destination/all",
      typeOfTrip: "/product/category/type/trip",
      typeOfTripFlat: "/product/category/type/trip/flat",
      scheduleGetPersonByType: "/product/product/schedules/person/types",

      searchProduct:"/product/search/product/{product}",

      productDetail: "/product/product/alias/{alias}",
      productRelative:"/product/product/alias/{alias}/related",
      schedule: "/product/product/alias/{alias}/schedules",
      scheduleByDay: "/product/product/alias/{alias}/schedules/date/{date}",

      wishlist: "/product/fav",

      // getProductListByDestination: "/product/destination/alias/{alias}/products",
      getProductFilter:"/product/products",
      getCategoryDetail: "/product/category/alias/{alias}",
      getAttractionByDestination:"/product/destination/alias/{alias}/attractions",
      getSubDestination: "/product/destination/alias/{alias}/sub/flat",

      getAttractionDetail:"/product/attraction/alias/{alias}",
      getAttractionByAttraction:"/product/attraction/alias/{alias}/attractions",

      cart: "/product/cart",
      cartAddProduct: "/product/cart/booking",
      cartRemoveProduct: "/product/cart/remove",

      getPaymentMethodList:"/product/payment/method",
      getInstallmentPaymentMethodList:"/product/installment/request",
      paymentRequest:"/product/payment/request",
      paymentSuccessNonInstallmentSendToServer:"/product/payment/success",
      paymentReview:"/product/order/review",
      manageBooking:"/product/cart/orders",
      cancelOrderOfBooking:"/product/order/{orderId}/cancel",

      faq:"/product/faq",

      ads: "/product/ad/type/{id}",

      balance:"/product/balance",

      sendInviteEmail:"/product/invite",
    },
    hostEndPointDesc: {
      login: {
        authType: {
          Email: 0,
          Google: 2,
          Facebook: 3,
        }
      }
    }
  },
  callFromToolkitString: "~~~i~~~",    //alias have this substring --> it will call from toolkit
  shortUrl: {
    notFoundPage:"/404",
    search:"/search",
    contact:"/lien-he",
    home: "/",
    login: "/login",
    aboutUs: "/ve-phuotvivu",
    termAndCondition:"/termandcondition",
    privacyPolicy: "/privacypolicy",
    passwordReset: "/password/reset",
    profile: "/profile",
    profileChild: {
      MYACCOUNT: { url: "myaccount", id: LanguageIdMap.URL.PROFILE.MY_ACCOUNT },
      BOOKING: { url: "booking", id: LanguageIdMap.URL.PROFILE.BOOKING },
      WISHLIST: { url: "wishlist", id: LanguageIdMap.URL.PROFILE.WISH_LIST },
      SETTING: { url: "setting", id: LanguageIdMap.URL.PROFILE.SETTING },
      INVITE: { url: "invite", id: LanguageIdMap.URL.PROFILE.INVITE },
      CREDIT: { url: "credit", id: LanguageIdMap.URL.PROFILE.CREDIT },
    },
    destination: "/tour-du-lich",
    typeOfTrip:"/type-of-trip",
    product: "/tour",
    attraction: "/attraction",
    supplierProductInfo: "/supplierinfo",
    addToCart: "/addtocart",
    shoppingCart: "/shoppingcart",
    inviteFriend: "/invite",
    pay:"/pay",
    successfulPayment:"/successfulpayment",
    ibOnline:"/ib_online",      //chuyen khoan ngan hang
    faq:"/faq",
  },

  mailChimp:{
    url:"//phuotvivu.us13.list-manage.com/subscribe/post",
    id:"55ced2359d",
    u:"b94e2da6611e464ce65eae243",
  },

  defaultGps: {
    latitude: 10.7708509,
    longitude: 106.7001815,
  },

  getLanguageIdFromApiResponseErrorCode(p) {
    if (typeof p == "string") {
      p = parseInt(p)
    }
    switch (p) {
      case -9: return LanguageIdMap.NOT_EXIST;
      case -112: return LanguageIdMap.UNKNOWN_ERROR;
      //Auth: return LanguageIdMap. -200-> -249
      case -200: return LanguageIdMap.EMAIL_EXISTED;
      case -201: return LanguageIdMap.PHONE_EXISTED;
      case -205: return LanguageIdMap.SESSION_EXPIRED;
      case -206: return LanguageIdMap.SESSION_INVALID;
      case -210: return LanguageIdMap.CREDENTIAL_INVALID;
      case -211: return LanguageIdMap.ACTIVE_CODE_INVALID;
      case -212: return LanguageIdMap.PASSWORD_FORMAT_INVALID;
      case -213: return LanguageIdMap.PHONE_FORMAT_INVALID;
      case -214: return LanguageIdMap.PAYMENT_SECRET_ANSWER_INVALID;
      case -215: return LanguageIdMap.EMAIL_FORMAT_INVALID;
      case -216: return LanguageIdMap.msg_warning_do_not_support_phone_type;
      //Payment -250 -> 299
      case -250: return LanguageIdMap.NOT_SCAN_MULTIPLE_TIME;
      //Promotion 300 -> 399
      case -300: return LanguageIdMap.NOT_ENOUGH_POINT;
      case -301: return LanguageIdMap.NOT_ENOUGH_STAR;
      case -302: return LanguageIdMap.NONE_OF_PROMOTION;
      case -303: return LanguageIdMap.PROMOTION_IS_EXPIRED;
      case -350: return LanguageIdMap.PROMO_CODE_INVALID;
      case -351: return LanguageIdMap.PROMO_CODE_ALREADY_USED_REFERRAL_CODE;
      case -352: return LanguageIdMap.PROMO_CODE_EXPIRE_USE_REFERRAL;
      case -400: return LanguageIdMap.FAV_QUOTA_LIMIT;
      case -403: return LanguageIdMap.msg_same_old_password;
      case -454: return LanguageIdMap.GROUP_NOT_STARTED;
      case -455: return LanguageIdMap.GROUP_STATUS_INVALID;
      default: return LanguageIdMap.UNKNOWN_ERROR;
    }
  },
  colorConfig: colorConfig,
  buttonStyle: [
    {
      color: "#fff",
      labelColor: "#fff",
      backgroundColor: colorConfig.main,
      borderColor: colorConfig.main,
    },
    {
      color: colorConfig.main,
      labelColor: colorConfig.main,
      backgroundColor: "#fff",
      borderColor: "#fff",
    },
    {
      color: colorConfig.grey,
      labelColor: colorConfig.grey,
      backgroundColor: "#fff",
      borderColor: "#fff",
    }
  ],
  pageSmallWidthStyle: {
    maxWidth: "100%", width: 1160, margin: 'auto', paddingLeft: 12, paddingRight: 12,
  },


  getGenderNumberFromLanguageIdMap(p) {
    switch (p) {
      case LanguageIdMap.txtMale: return 0;
    }
    return 1;
  },
  getLanguageIdMapFromGenderNumber(p) {
    switch (p) {
      case 0: return LanguageIdMap.txtMale;
    }
    return LanguageIdMap.txtFeMale;
  },
  genderStatusList: [0, 1],

  fontStyle: {
    h0: {
      fontSize: 36
    },
    h1: {
      fontSize: 28
    },
    h2: {
      fontSize: 18
    },
    h3: {
      fontSize: 16
    },
    pa: {
      fontSize: 14
    },
    fontDefault: {
      fontFamily: "Open Sans",
    },
    fontFamilyBold: {
      // fontFamily: Language.getLanguageName()!==Language.languageDefineJapan
      //             ?"Muli-Bold"
      //             :"MS Gothic",
      // fontFamily: "Muli-Bold"
      fontFamily: "Open Sans ",
      fontWeight: "bold",
    },
  },
  sizeConfig: {
    size2: 2,
    belowTable: 2,
    belowSmallTitleInput: 8,
    belowTitle: 16,
    distanceDateButton: 16,
    distanceSection: 32,
    marginGraph: 0,
    marginImage: 8,

    widthXs: 0,
    widthSm: 768,
    widthMd: 992,
    widthLg: 1200,

    widthPC: 1200,
  },
  numRowPerPage: 20,
  maxRetryApi: 5,
}



export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;

export const databaseUrl = process.env.DATABASE_URL || 'sqlite:database.sqlite';

export const analytics = {

  // https://analytics.google.com/
  google: {
    trackingId: "UA-77479415-1",//process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
    tagManagerId:"GTM-N7B6B5"
  },

};

export const auth = {

  jwt: { secret: process.env.JWT_SECRET || 'phuotvivu' },

  // https://developers.facebook.com/
  facebook: {
    // id: process.env.FACEBOOK_APP_ID || '186244551745631',
    secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc',
  },

  // https://cloud.google.com/console/project
  google: {
    id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
    secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd',
  },

  // https://apps.twitter.com/
  twitter: {
    key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
    secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ',
  },

};

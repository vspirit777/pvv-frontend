import { config, api, analytics } from '../config'
import React, { PropTypes, Component } from 'react';


import Language from '../language/Language'
import LanguageIdMap from '../language/LanguageIdMap'
// import 'whatwg-fetch';
import fetch from 'isomorphic-fetch'
import Router from 'next/router'
import { DatePicker } from 'material-ui';

function serialize(obj, prefix) {
    const str = [];

    Object.keys(obj).forEach((p) => {
        const k = prefix ? `${prefix}[${p}]` : p;
        const v = obj[p];

        str.push((v !== null && typeof v === 'object') ?
            serialize(v, k) :
            `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
    });

    return str.join('&');
}

let common = {
    mousePoint: {
        x: 0,
        y: 0
    },
    gps: {},
    needReload: false,
    mqttListReceived: [],
    profile: {},
    windowWidth: 0,
    windowHeight: undefined,
    moneyType: LanguageIdMap.moneyTypeVND,
    requestCounter: 0,
    userCoverItemList: [],
    more: {

    },
    DIRECTION: {
        LEFT: 1,
        TOP: 2,
        RIGHT: 3,   //implemented
        BOTTOM: 4,  //default implemented
        SAME_MENU: 5,    //implemented
    },
    initPropsData: {},
    location: {
        url: "",
        pathArr: [],
        search: {}
    },
    setupLocationFromUrl(url) {
        if (!url) {
            return;
        }
        this.location ={
            url: url,
            pathArr: [],
            search: {}
        }

        let tmp = url.split("?")
        this.location.pathArr = tmp[0].split("/");
        if(this.location.pathArr.length > 0 && !this.location.pathArr[this.location.pathArr.length-1]) {
            this.location.pathArr.pop();
        }
        if (tmp.length > 1) {
            tmp = tmp[1].split("&")

            let searchKeyArr = [];
            let searchValueArr = [];
            for (let i = 0; i < tmp.length; i++) {
                let tmp1 = tmp[i].split("=");
                if (tmp1.length > 1) {
                    searchKeyArr.push(tmp1[0])
                    searchValueArr.push(tmp1[1])
                }
            }

            while(searchKeyArr.length >0) {
                let key = searchKeyArr.pop()
                if(searchKeyArr.indexOf(key) >= 0) {
                    this.location.search[key] = [searchValueArr.pop()]
                    let foundOtherAt = searchKeyArr.indexOf(key)
                    while(foundOtherAt >= 0) {
                        this.location.search[key].push(searchValueArr[foundOtherAt]);
                        searchKeyArr.splice(foundOtherAt,1)
                        searchValueArr.splice(foundOtherAt,1)
                        foundOtherAt = searchKeyArr.indexOf(key)
                    }
                } else {
                    this.location.search[key] = searchValueArr.pop();
                }
            }
        }
        // console.log("setup location")
        // console.log(this.location)
    },


    cleanObj(obj) {
        if (!obj || typeof (obj) !== "object") {
            return;
        }
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined) {
                delete obj[propName];
            } else {
                this.cleanObj(obj[propName])
            }
        }
        return obj;
    },




    /////////////////////////shopping cart/////////////////////
    addGetShoppingCartCallback(callback) {
        // console.log("add to cart")
        if (!this.shoppingCartCallbackList) {
            this.shoppingCartCallbackList = [];
        }
        this.shoppingCartCallbackList.push(callback)
    },
    removeGetShoppingCartCallback(callback) {
        if (!this.shoppingCartCallbackList) {
            return;
        }
        for (let i = 0; i < this.shoppingCartCallbackList.length; i++) {
            this.shoppingCartCallbackList.splice(i, 1);
            return;
        }
    },
    getShoppingCartList() {
        if (!this.getCookie("SID")) {
            return;
        }
        this.fetcher(
            config.api.hostType.product_url,
            config.api.hostEndPoint.cart,
            "get"
        )
            .then((jsonRes) => {
                this.shoppingCart = jsonRes.data;
                if (this.shoppingCart) {
                    if (this.shoppingCart.orderOrderProduct) {
                        for (let i = 0; i < this.shoppingCart.orderOrderProduct.length; i++) {
                            if (this.shoppingCart.orderOrderProduct[i].ext) {
                                this.shoppingCart.orderOrderProduct[i].ext = JSON.parse(this.shoppingCart.orderOrderProduct[i].ext)
                            }
                            if (this.shoppingCart.orderOrderProduct[i].scheduleData) {
                                this.shoppingCart.orderOrderProduct[i].scheduleData = JSON.parse(this.shoppingCart.orderOrderProduct[i].scheduleData)
                            }
                        }
                    }
                } else {
                    this.shoppingCart = [];
                }
                if (this.shoppingCartCallbackList) {
                    for (let i = 0; i < this.shoppingCartCallbackList.length; i++) {
                        this.shoppingCartCallbackList[i]();
                    }
                }
            })
            .catch((err) => {
                console.log("error pro3:" + err)
            })
    },
    prepareDataBeforeAddToCardOrBooking() {
        // console.log(this.scheduleForSupplierProductInfo)
        let scheduleData = JSON.parse(JSON.stringify(this.scheduleForSupplierProductInfo.schedulePrice))
        scheduleData.name = this.scheduleForSupplierProductInfo.name;
        let ext = JSON.parse(JSON.stringify(this.scheduleDataForSupplierProductInfo))
        if (ext.user) {
            for (let i = 0; i < ext.user.length; i++) {
                delete ext.user[i]._numInTotal;
                delete ext.user[i]._numInList;
                delete ext.user[i]._totalNumInList;
                if (ext.user[i].settings) {
                    for (let j = 0; j < ext.user[i].settings.length; j++) {
                        delete ext.user[i].settings[j].type;
                        delete ext.user[i].settings[j].dataFields;
                    }
                }
            }
        }
        if (ext.order) {
            for (let i = 0; i < ext.order.length; i++) {
                delete ext.order[i].type;
                delete ext.order[i].dataFields;
            }
        }
        if (scheduleData.schedulePriceItems) {
            for (let i = scheduleData.schedulePriceItems.length - 1; i >= 0; i--) {
                if (!scheduleData.schedulePriceItems[i].noOfItem) {
                    scheduleData.schedulePriceItems.splice(i, 1)
                } else {
                    delete scheduleData.schedulePriceItems[i].price;
                    delete scheduleData.schedulePriceItems[i].noOfItemNeedconfirm;
                }
            }
        }
        return {
            orderOrderProduct: [{
                productId: this.scheduleForSupplierProductInfo.productId,
                scheduleId: this.scheduleForSupplierProductInfo.scheduleId,
                name: common.productForSupplierProductInfo.name,
                noProduct: 1,
                cost: this.scheduleForSupplierProductInfo._tmpTotalPrice,
                scheduleData: JSON.stringify(scheduleData),
                ext: JSON.stringify(ext),
            }]
        };
    },
    addToCart(holder) {
        let data = this.prepareDataBeforeAddToCardOrBooking();
        // holder.loadingCountdown++;
        this.fetcher(
            config.api.hostType.product_url,
            config.api.hostEndPoint.cartAddProduct,
            "post",
            undefined,
            data,
        )
            .then((jsonRes) => {
                console.log('addToCart');
                if (data && data.orderOrderProduct && data.orderOrderProduct.length) {
                    var product = data.orderOrderProduct[0];
                    var scheduleData = JSON.parse(product.scheduleData);
                    var quantity = 0;

                    if (scheduleData && scheduleData.schedulePriceItems) {
                        scheduleData.schedulePriceItems.forEach(item => {
                            quantity += item.noOfItem;
                        });
                    }

                    ga('create', analytics.google.trackingId);
                    ga('require', 'ec');

                    ga('ec:addProduct', {
                        'id': product.productId,
                        'name': product.name,
                        // 'category': product.category,
                        // 'brand': product.brand,
                        // 'variant': product.variant,
                        'price': product.cost,
                        'quantity': quantity
                    });
                    ga('ec:setAction', 'add');

                    ga('send', 'event', 'Ecommerce', 'AddCart', product.name, product.productId);
                    // ga('send', 'pageview');     // Send transaction data with initial pageview.

                    console.log('Tracking addToCart event');
                    console.log('product', JSON.stringify(product));
                }

                // holder.loadingCountdown--;
                this.getShoppingCartList();
                Router.push(config.shortUrl.addToCart)

                holder.forceUpdate();
            })
            .catch((err) => {
                console.log("error pro3:" + err)
                // holder.loadingCountdown--;
                holder.forceUpdate();
            })
    },

    ///////////////////////update date default///////////////////////
    updateDefaultClientDataForAllPage() {

        return [
            this.fetcher(
                config.api.hostType.product_url,
                config.api.hostEndPoint.topDestination,
                "get",
                {
                    offset: 0,
                    size: 16,
                }
            )
                .then((jsonRes) => {
                    for (let i = 0; i < jsonRes.data.length; i++) {
                        if (jsonRes.data[i].photoInfo) {
                            jsonRes.data[i].img = jsonRes.data[i].photoInfo.thumbUrl;
                        }
                    }
                    // console.log("--------------settop")
                    this.topDestination = {
                        data: jsonRes.data,
                    }
                })
                .catch((err) => {
                    console.log("error 0:" + err)
                }),

            this.fetcher(
                config.api.hostType.product_url,
                config.api.hostEndPoint.allDestination,
                "get"
            )
                .then((jsonRes) => {
                    // console.log("--------------setaal")
                    if (!jsonRes.data || !jsonRes.data.length) {
                        return;
                    }
                    this.allDestination = jsonRes.data;
                    for (let i = 0; i < jsonRes.data.length; i++) {
                        if (jsonRes.data[i].subCategories) {
                            jsonRes.data[i].nameDescArr = []
                            for (let j = 0; j < jsonRes.data[i].subCategories.length; j++) {
                                jsonRes.data[i].nameDescArr.push(jsonRes.data[i].subCategories[j].briefName)
                                if (jsonRes.data[i].nameDescArr.length >= 2) {
                                    break;
                                }
                            }
                        }
                    }
                })
                .catch((err) => {
                    console.log("error 1:" + err)
                }),


            this.fetcher(
                config.api.hostType.product_url,
                config.api.hostEndPoint.scheduleGetPersonByType,
                "get",
            )
                .then((jsonRes) => {
                    // console.log("--------------setmap")
                    this.schedulePriceItemTypeMap = jsonRes.data;
                    for (let property in this.schedulePriceItemTypeMap) {
                        if (this.schedulePriceItemTypeMap[property] === "Adult") {
                            this.schedulePriceItemTypeMap[property] = "Người lớn";
                        } else if (this.schedulePriceItemTypeMap[property] === "Child") {
                            this.schedulePriceItemTypeMap[property] = "Trẻ em";
                        } else if (this.schedulePriceItemTypeMap[property] === "Everyone") {
                            this.schedulePriceItemTypeMap[property] = "Người";
                        } else if (this.schedulePriceItemTypeMap[property] === "Infant") {
                            this.schedulePriceItemTypeMap[property] = "Trẻ sơ sinh";
                        } else if (this.schedulePriceItemTypeMap[property] === "Senior") {
                            this.schedulePriceItemTypeMap[property] = "Người cao tuổi";
                        } else if (this.schedulePriceItemTypeMap[property] === "Teenager") {
                            this.schedulePriceItemTypeMap[property] = "Thiếu niên";
                        } else if (this.schedulePriceItemTypeMap[property] === "Student") {
                            this.schedulePriceItemTypeMap[property] = "Sinh viên";
                        }
                    }
                })
                .catch((err) => {
                    console.log("error 2:" + err)
                }),

            // this.fetcher(
            //     config.api.hostType.product_url,
            //     config.api.hostEndPoint.typeOfTripFlat,
            //     "get"
            // )
            //     .then((jsonRes) => {
            //         this.typeOfTripFlat = {
            //             data: jsonRes.data,
            //         }
            //         this.typeOfTripFlatSecondRow = {
            //             _copyOfOtherRow: this.typeOfTripFlat,
            //             data: jsonRes.data,
            //         }
            //         this.typeOfTripFlat._hasCopyRow = [this.typeOfTripFlatSecondRow];

            //         if (this.headerComponent) {
            //             this.headerComponent.forceUpdate();
            //         }
            //         if (this.currentMainComponent) {
            //             this.currentMainComponent.forceUpdate();
            //         }
            //     })
            //     .catch((err) => {
            //         console.log("error pro3:" + err)
            //     })

            this.fetcher(
                config.api.hostType.product_url,
                config.api.hostEndPoint.typeOfTrip,
                "get"
            )
                .then((jsonRes) => {
                    // console.log("--------------settypeoftrip")
                    if (jsonRes.data) {
                        this.typeOfTrip = {
                            data: jsonRes.data,
                        }
                    }
                })
                .catch((err) => {
                    console.log("error 3:" + err)
                })]
    },


    ////////////////////////search suggestion
    deleteAllActiveFilter(filter) {
        if (!filter) {
            return;
        }
        if (Array.isArray(filter)) {
            for (let i = 0; i < filter.length; i++) {
                this.deleteAllActiveFilter(filter[i])
            }
        } else {
            delete filter.active;
            if (filter.subCategories) {
                for (let i = 0; i < filter.subCategories.length; i++) {
                    this.deleteAllActiveFilter(filter.subCategories[i])
                }
            }
        }
    },
    searchInputSuggestData: undefined,
    searchInputSuggestDataDefault: {
        dataFocusing: 0,
        data: []
    },
    checkSearchSuggestionDisplayFull() {
        if (this.windowWidth >= 1050 && this.windowHeight >= 540) {
            return true;
        }
        return false;
    },

    loadingMoreTopDestination(holder) {
        if (this._gettingTopDestination || !this.topDestination) {
            return;
        }
        this._gettingTopDestination = true;
        this.fetcher(
            config.api.hostType.product_url,
            config.api.hostEndPoint.topDestination,
            "get",
            {
                offset: this.topDestination.data.length,
                size: config.numRowPerPage,
            }
        )
            .then((jsonRes) => {
                this._gettingTopDestination = undefined;
                for (let i = 0; i < jsonRes.data.length; i++) {
                    if (jsonRes.data[i].photoInfo) {
                        jsonRes.data[i].img = jsonRes.data[i].photoInfo.thumbUrl;
                    }
                }
                this.topDestination.data.push(jsonRes.data);
                holder.forceUpdate();
            })
            .catch((err) => {
                this._gettingTopDestination = undefined;
                console.log("error pro3:" + err)
            })
    },

    checkAndUpdateMqttListReceived(ele) {       //return true if it's been exists
        // console.log("check with id:"+ele)
        for (var i = 0; i < this.mqttListReceived.length; i++) {
            if (this.mqttListReceived[i] == ele) {
                // console.log("id has exists:"+ele)
                return true;
            }
        }
        // console.log("id not exists:"+ele)
        if (this.mqttListReceived.length >= 10) {
            this.mqttListReceived = this.mqttListReceived.filter((el, index) => { return index != 0; })
        }
        this.mqttListReceived.push(ele);
        return false;
    },
    getCookie(cname) {
        if (common.serverGetCookie) {
            return common.serverGetCookie[cname]
        }
        try {
            let name = cname + "=";
            let ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";

        } catch (error) {
            return
        }
    },
    setCookie(name, value, expireTimeInSecond, domain) {
        // console.log("before add cookid:"+name+";"+value+";"+expireTimeInSecond+";"+domain)
        try {
            document
        } catch (error) {
            return;
        }
        let d = new Date();
        d.setTime(d.getTime() + expireTimeInSecond * 1000);
        let expires = "; expires=" + d.toUTCString();
        let addToCookie = name + "=" + value + expires + "; path=/";
        if (domain) {
            addToCookie += "; domain=" + domain
        }
        // console.log("set cookie:"+addToCookie)
        document.cookie = addToCookie;
    },
    getTimeStampWith(t, hour = undefined, minute = undefined, second = undefined) {
        let tgdd = new Date(t);
        if (hour != undefined) {
            tgdd.setHours = hour;
        }
        if (minute != undefined) {
            tgdd.minute = hour;
        }
        if (second != undefined) {
            tgdd.second = hour;
        }
        return tgdd.getTime();
    },
    //format: ymd, dmy, ym, standardDate, standard
    changeTimeStampToHumanTime(t, splitDate = "/", format = undefined, monthStartFrom = 1
        , addZeroToMonthDay = true) {
        if (t == 0 || t == null || t == undefined) {
            return "-";
        }
        if (typeof t === "string") {
            t = parseInt(t)
        }

        let tgdd = new Date(t);
        if (format === "standardDate") {
            format = "dmy";
        } else if (format === "standard") {
            format = undefined;
        }

        let date = tgdd.getDate();
        let month = tgdd.getMonth() + monthStartFrom;
        if (addZeroToMonthDay) {
            if (date < 10) {
                date = "0" + date;
            }
            if (month < 10) {
                month = "0" + month;
            }
        }
        if (format == "dmy") {
            return date + splitDate + month + splitDate + tgdd.getFullYear();
        } else if (format == "ymd") {
            return tgdd.getFullYear() + splitDate + month + splitDate + date;
        } else if (format == "ym") {
            return tgdd.getFullYear() + splitDate + month;
        } else if (format == "my") {
            return month + splitDate + tgdd.getFullYear();
        }
        let hour = tgdd.getHours()
        let minutes = tgdd.getMinutes();
        let seconds = tgdd.getSeconds();
        if (addZeroToMonthDay) {
            if (hour < 10) {
                hour = "0" + hour;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
        }
        return hour + ":" + minutes + ":" + seconds
            + " " + date + splitDate + month + splitDate + tgdd.getFullYear();
    },
    numberWithCommas(x) {
        if (x == undefined) {
            return 0;
        }
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    renderPageHeader(title, title2 = undefined) {
        if (title2 == undefined) {
            return (<div style={{ marginBottom: config.sizeConfig.distanceSection }}>
                <h1 style={{ marginTop: 0 }}>{title}</h1>
                <hr />
            </div>)
        }
        return (<div style={{ marginBottom: config.sizeConfig.distanceSection }}>
            <h4 style={{ marginBottom: config.sizeConfig.belowSmallTitleInput }}>{title}</h4>
            <h1 style={{ marginTop: 0 }}>{title2}</h1>
            <hr />
        </div>)
    },
    renderDatePicker(params = {
        label: undefined, value: undefined, onChangeValue: undefined, shouldDisableDate: undefined
        , style: undefined, className: "", textFieldStyle: undefined, minDate: undefined, setZeroHMS: undefined
        , inputStyle: undefined, floatingLabelStyle: undefined,
    }) {
        if(this.checkServer()) {
            return;
        }
        const IntlPolyfill = require('intl');
        const DateTimeFormat = IntlPolyfill.DateTimeFormat;
        require('intl/locale-data/jsonp/vi');
        require('intl/locale-data/jsonp/vi-VN');

        // console.log(params.value)
        return <DatePicker
            className={params.className}
            floatingLabelText={params.label}
            formatDate={d => {
                return this.changeTimeStampToHumanTime(d, undefined, "standardDate")
                //   return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            }}
            floatingLabelStyle={params.floatingLabelStyle ? params.floatingLabelStyle : undefined}
            shouldDisableDate={params.shouldDisableDate ? params.shouldDisableDate : undefined}
            hideCalendarDate={false}
            style={{ ...(params.style ? params.style : {}) }}
            inputStyle={{ ...(params.inputStyle ? params.inputStyle : {}) }}
            open={true}
            cancelLabel={Language.getLanguage(LanguageIdMap.btnCancel)}
            DateTimeFormat={DateTimeFormat}
            locale="vi-VN"
            // utils={persianUtils}
            textFieldStyle={{ width: "100%", ...(params.textFieldStyle ? params.textFieldStyle : {}) }}
            onChange={(event, date) => {
                let targetDate = new Date(date);
                if (params.value === undefined) {
                    params.value = new Date().getTime()
                }
                let d = new Date(params.value);
                d.setDate(targetDate.getDate());
                d.setMonth(targetDate.getMonth());
                d.setFullYear(targetDate.getFullYear());
                if (params.setZeroHMS) {
                    d.setHours(0, 0, 0, 0);
                }

                d = new Date(d.getTime() - d.getTimezoneOffset() * 60000 - 7 * 60 * 60000)
                if (params.onChangeValue) {
                    params.onChangeValue(d.getTime())
                }
                // console.log(d.getTimezoneOffset())
                // console.log(d.getTime())
                // console.log(d)
            }}
            minDate={params.minDate ? new Date(params.minDate + new Date().getTimezoneOffset() * 60000 + 7 * 60 * 60000) : undefined}
            autoOk={true}
            value={params.value ? new Date(params.value + new Date().getTimezoneOffset() * 60000 + 7 * 60 * 60000) : ""}
        />
    },


    //method:get,post,...
    //options: typeFormUrlencoded

    checkMobile() {
        var isMobile = false; //initiate as false
        // device detection
        try {

            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
                || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))
                isMobile = true;
        } catch (error) {
            // console.log("check mobile err:" + error)
        }
        // alert(navigator.userAgent.toLowerCase())
        return isMobile;
    },
    checkAndroidMobile() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("android") >= 0 && ua.indexOf("mobile") >= 0) {
            return true;
        }
        return false
    },
    checkIphone() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("iphone") >= 0 && ua.indexOf("mobile") >= 0) {
            return true;
        }
        return false
    },
    uppercasefirst(string) {
        if (string.length >= 1) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        return "";
    },
    setActiveAllDataObject(object, active, subFilterName) {
        if (object) {
            if (Object.prototype.toString.call(object) === '[object Array]') {
                for (var i = 0; i < object.length; i++) {
                    this.setActiveAllDataObject(object[i], active)
                }
                return;
            }
            if (object[subFilterName]) {
                if (active !== true) {
                    object.active = active;
                }
                this.setActiveAllDataObject(object[subFilterName], active)
            } else {
                object.active = active;
            }
        }
    },

    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    },
    checkCallFromBrowser() {
        try {
            document
            return true;
        } catch (error) {
            return false;
        }
    },
    checkLoginUser() {
        try {
            if (window.localStorage.getItem("uid") && this.getCookie("SID") !== undefined && this.getCookie("SID") !== "") {
                return true;
            }
        } catch (error) {

        }
        return false;
    },
    async fetcherData(thisUrl, req, method, body, options, resolve, reject) {
        // console.log("fetcher data:" + thisUrl)
        // console.log(req)
        // console.log(body)
        // console.log("before fetch:"+thisUrl+";", req)
        return await fetch(thisUrl, req)
            .then(async (rawRes) => {
                // console.log(rawRes.headers.get('Content-Type'))
                // console.log(rawRes.headers.get('Date'))
                // console.log(rawRes.status)
                // console.log(rawRes.statusText)
                // API got back to us, clear the timeout
                // clearTimeout(apiTimedOut);
                // console.log(`res of api ${thisUrl}: `)
                // console.log(rawRes)
                // console.log("ok fetch")
                let jsonRes = {};
                // alert("ok fetch:"+ JSON.stringify(rawRes))
                try {
                    jsonRes = await rawRes.json();
                    jsonRes = this.cleanObj(jsonRes)
                    // alert(JSON.stringify(jsonRes))

                    // console.log("res1:"+JSON.stringify(jsonRes))
                    if (jsonRes.error < 0) {
                        if (options.noCallbackErr) {
                            return;
                        }
                        // console.log("---------------================")
                        // console.log(jsonRes.error)
                        if (jsonRes.error === -9) {
                            // history.push(config.shortUrl.notFoundPage)
                            // console.log("not found")
                            // console.log("fetcher data:" + thisUrl)
                            // console.log(rawRes)
                            // window.location.href = config.shortUrl.notFoundPage
                        } else if (jsonRes.error === -206) {
                            try {
                                document.cookie = ""
                                window.localStorage.removeItem("uid");
                                this.currentMainComponent.logout()
                            } catch (error) {

                            }
                            // console.log("call logout")
                            // console.log("logouted")
                            // history.push(config.shortUrl.login);
                            return;
                        } else if (this.currentMainComponent) {
                            this.currentMainComponent.setState({
                                alertModalPopup: {
                                    titleAlertModal: Language.getLanguage(LanguageIdMap.notification),
                                    descAlertModal: jsonRes.message ? jsonRes.message :
                                        Language.getLanguage(config.getLanguageIdFromApiResponseErrorCode(jsonRes.error))
                                }
                            })
                        }
                        reject(jsonRes);
                        // this.currentMainComponent.forceUpdate();

                    }
                } catch (error) {
                    //const err = { message: Language.getLanguage(LanguageIdMap.errInvalidJson) };
                    // console.log(JSON.stringify(error))
                    reject(error);
                }

                // Only continue if the header is successful
                if (rawRes && rawRes.status === 200) {
                    // console.log(`api return:${this.requestCounter};${thisUrl};;;${JSON.stringify(rawRes)};;;${Date.now()}`);
                    // console.log(jsonRes)
                    jsonRes.requestNum = options.curRequestCounter;
                    return jsonRes;
                }
                reject(jsonRes);
            })
            .then(res => {
                // console.log("resolve")
                // console.log(res)
                resolve(res)
            })
            .catch(async (err) => {
                // alert("err fetch:"+err)
                if (++options.numOfRetryingApi <= config.maxRetryApi) {
                    await this.fetcherData(thisUrl, req, method, body, options, resolve, reject)
                } else {
                    // if ((!options.noCallbackErr && history.getCurrentLocation().pathname.toLowerCase() != config.shortUrl.login)
                    //     || (history.getCurrentLocation().pathname.toLowerCase() == config.shortUrl.login
                    //         && thisUrl.indexOf(config.api.hostEndPoint.login) >= 0)) {
                    //     this.currentMainComponent.setState({
                    //         alertModalPopup: {
                    //             titleAlertModal: Language.getLanguage(LanguageIdMap.error),
                    //             descAlertModal: Language.getLanguage(LanguageIdMap.errTimeout)
                    //         }
                    //     });
                    //     // clearTimeout(apiTimedOut);
                    // }
                    reject(err);
                }
            });
    },
    //option:typeFormUrlencoded, typeFormData, default is application/json, noCallbackErr
    //option will return at response
    async fetcher(hostType, endpoint, method, params = {}, body = undefined, options = {
        typeFormUrlencoded: false,
        typeFormData: false,
        noCallbackErr: false,
        hasImageUpload: false,
        notIncludeSID: false,
    }) {
        let hostname = config.api.getHostNameByHostType(hostType);
        // console.log("before fetch:" + hostname + ";" + method + ";" + JSON.stringify(params) + ";" + JSON.stringify(body)
        //     + ";" + JSON.stringify(options))
        // console.log("Language.getLanguageName:"+Language.getLanguageName())
        // if (!params.locale) {
        //     params.locale = Language.getLanguageName() !== undefined
        //         ? Language.getLanguageName().replace('.', '')
        //         : Language.languageDefineVietNam.replace('.', '');
        // }
        // return await fetch(thisUrl, req)
        // .then(async (rawRes) => {
        // })
        this.requestCounter += 1;
        const requestNum = this.requestCounter;
        // After x seconds, let's call it a day!
        // const timeoutAfter = 7;
        // const apiTimedOut = setTimeout(() => (
        //     reject("so long")
        // ), timeoutAfter * 1000);

        // if (!method || !endpoint) return reject('Missing params (AppAPI.fetcher).');
        // Build request
        const req = {
            method: method.toUpperCase(),
        };
        if (options.typeFormUrlencoded) {
            let formBody = [];
            if (body == undefined) {
                formBody = null;
            } else {
                for (let property in body) {
                    let encodedKey = encodeURIComponent(property);
                    let encodedValue = encodeURIComponent(body[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");
            }
            req.body = formBody;
            req.headers = {
                'Content-Type': "application/x-www-form-urlencoded"
            }
        } else if (options.typeFormData) {
            let formData = new FormData();
            for (let property in body) {
                let encodedKey = property;
                let encodedValue = body[property];
                if (encodedKey == "specialKeyToAddFromData") {
                    for (var i = 0; i < encodedValue.length; i++) {
                        let key = encodedValue[i].key;
                        let value = encodedValue[i].value;
                        for (var j = 0; j < value.length; j++) {
                            var element = value[j];
                            if (element === undefined) {
                                continue;
                            }
                            formData.append(key, isNaN(value[j]) ? value[j] : "" + value[j]);//encodedValue == undefined ? "" : "" +encodedValue
                        }
                    }
                } else {
                    formData.append(encodedKey, isNaN(encodedValue) ? encodedValue : "" + encodedValue);//encodedValue == undefined ? "" : "" +encodedValue
                }
            }
            req.body = formData;
            req.headers = {};
        } else {
            // Add Body
            if (body) {
                req.body = JSON.stringify(body);
            }

            req.headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            };
        }

        req.headers.Authorization = `DT=3;V=1`
        const SID = this.getCookie("SID");
        if (!options.notIncludeSID && SID !== undefined && SID != "") {
            req.headers.Authorization = `SID=${SID};` + req.headers.Authorization
        }

        // Add Endpoint Params
        let urlParams = '';
        if (params) {
            // Object - eg. /recipes?title=this&cat=2
            if (typeof params === 'object') {
                // Replace matching params in API routes eg. /recipes/{param}/foo
                let specialKeyToAddFromData = undefined;
                Object.keys(params).forEach((param) => {
                    if (param == "specialKeyToAddFromData") {
                        specialKeyToAddFromData = params[param];
                        delete params[param]
                    }

                    if (endpoint.includes(`{${param}}`)) {
                        endpoint = endpoint.split(`{${param}}`).join(params[param]);
                        delete params[param];
                    }
                });

                while (true) {
                    let findLeft = endpoint.indexOf(`{`)
                    if (findLeft < 0) {
                        break;
                    }
                    let findRight = endpoint.indexOf(`}`, findLeft)
                    if (findRight < 0) {
                        break;
                    }
                    endpoint = endpoint.substring(0, findLeft) + endpoint.substring(findRight + 1);
                }

                // Add the rest of the params as a query string
                urlParams = `?${serialize(params)}`;

                if (specialKeyToAddFromData) {
                    for (var i = 0; i < specialKeyToAddFromData.length; i++) {
                        for (let j = 0; j < specialKeyToAddFromData[i].value.length; j++) {
                            if (urlParams.charAt(urlParams.length - 1) == "?") {
                                urlParams += specialKeyToAddFromData[i].key + "=" + specialKeyToAddFromData[i].value[j]
                            } else {
                                urlParams += "&" + specialKeyToAddFromData[i].key + "=" + specialKeyToAddFromData[i].value[j]
                            }
                        }
                    }
                }

                // String or Number - eg. /recipes/23
            } else if (typeof params === 'string' || typeof params === 'number') {
                urlParams = `/${params}`;
            }
        }




        const thisUrl = hostname + endpoint + urlParams;
        // console.log(`api req: ${this.requestCounter}-->${thisUrl}` + ';body:' + req.body
        //     + ';req.headers.Authorization:' + req.headers.Authorization + ';time' + Date.now());
        options.curRequestCounter = this.requestCounter;
        options.numOfRetryingApi = 0;
        return await new Promise(async (resolve, reject) => {
            await this.fetcherData(thisUrl, req, method, body, options, resolve, reject)
        });
    },
    checkGPSOpen(callbackSuccess = undefined, firstCall = true, callbackWhenItTrygain = undefined) {
        if (this.gps.latitude && this.gps.longitude) {
            if (callbackSuccess !== undefined) {
                callbackSuccess(this.gps.latitude, this.gps.longitude);
            }
            return;
        }
        if (firstCall === true) {
            if (this.gps.reloadGpsTimeout) {
                clearTimeout(this.gps.reloadGpsTimeout)
            }
            this.gps.reloadGpsTimeout = setTimeout(() => {
                // console.log("time out")
                if (callbackSuccess !== undefined) {
                    callbackSuccess()
                }
                callbackSuccess = undefined;
            }, 8000)
            if (this.gps.loadingGPS) {
                navigator.geolocation.clearWatch(this.gps.loadingGPS)
                this.gps.loadingGPS = undefined;
            }
        }

        if (this.gps.loadingGPS == undefined) {
            this.gps.loadingGPS = navigator.geolocation.watchPosition(
                (position) => {
                    if (this.gps.reloadGpsTimeout) {
                        clearTimeout(this.gps.reloadGpsTimeout);
                        this.gps.reloadGpsTimeout = undefined;
                    }
                    this.gps.latitude = position.coords.latitude;
                    this.gps.longitude = position.coords.longitude;
                    if (callbackSuccess !== undefined) {
                        callbackSuccess(position.coords.latitude, position.coords.longitude);
                        callbackSuccess = undefined;
                    } else if (callbackWhenItTrygain !== undefined) {
                        callbackWhenItTrygain(position.coords.latitude, position.coords.longitude);
                        callbackWhenItTrygain = undefined;
                    }
                }
                , (error) => {
                    if (this.gps.reloadGpsTimeout) {
                        clearTimeout(this.gps.reloadGpsTimeout);
                        this.gps.reloadGpsTimeout = undefined;
                    }
                    navigator.geolocation.clearWatch(this.gps.loadingGPS)
                    this.gps.loadingGPS = undefined;
                    if (firstCall == true) {
                        if (callbackSuccess !== undefined) {
                            callbackSuccess()
                            callbackSuccess = undefined;
                        }
                    }
                    setTimeout(() => {
                        this.checkGPSOpen(callbackSuccess, false, callbackWhenItTrygain);
                    }, 15000)
                },
                {
                    enableHighAccuracy: false,
                    timeout: 12000,
                    maximumAge: 0
                }
            );
        }
    },
    getViewportWidth() {
        try {
            window
        } catch (error) {
            return 2000;
        }
        if (typeof window.innerWidth != 'undefined') {
            return window.innerWidth
        }
        // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
        else if (typeof document.documentElement != 'undefined'
            && typeof document.documentElement.clientWidth !=
            'undefined' && document.documentElement.clientWidth != 0) {
            return document.documentElement.clientWidth
        }

        // older versions of IE
        return document.getElementsByTagName('body')[0].clientWidth
    },
    getViewportHeight() {
        try {
            window
        } catch (error) {
            return 800;
        }
        if (typeof window.innerWidth != 'undefined') {
            return window.innerHeight
        }

        // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
        else if (typeof document.documentElement != 'undefined'
            && typeof document.documentElement.clientWidth !=
            'undefined' && document.documentElement.clientWidth != 0) {
            return document.documentElement.clientHeight
        }

        // older versions of IE
        return document.getElementsByTagName('body')[0].clientHeight
    },
    checkOverflow(el) {
        try {
            el = document.getElementById("breakcumProduct")
            var curOverflow = el.style.overflow;

            if (!curOverflow || curOverflow === "visible")
                el.style.overflow = "hidden";

            var isOverflowing = el.clientWidth < el.scrollWidth
                || el.clientHeight < el.scrollHeight;

            el.style.overflow = curOverflow;

            return isOverflowing;
        } catch (error) {
            return false;
        }

    },
    checkServer(){
        try {
            window.location
            document;
            return false;
        } catch (error) {
            return true;
        }
    }




}

// let intervalCoundown = 1;
// let intervalUpdate = setInterval(() => {
//     console.log("call forceUpdate all.:"+intervalCoundown)
//     if(common.currentMainComponent && common.currentMainComponent.foceUpdate) {
//       common.currentMainComponent.foceUpdate();
//     }
//     if(common.headerComponent && common.headerComponent.foceUpdate) {
//       common.headerComponent.foceUpdate();
//     }
//     intervalCoundown--;
//     if(intervalCoundown ===0) {
//         clearInterval(intervalUpdate)
//     }
//   }, 3000);

common.windowWidth = Math.round(common.getViewportWidth());
common.windowHeight = Math.round(common.getViewportHeight());

export default common;

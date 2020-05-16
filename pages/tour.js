import Child from '../src/routes/product'
import __SuperPage from './__SuperPage';
import $ from "jquery";
import LanguageIdMap from '../src/language/LanguageIdMap';
import Language from '../src/language/Language';
import NotFoundPage from '../src/routes/notFoundPage'

class Display extends __SuperPage {
  constructor(props) {
    super(props);
  }
  static async getInitialProps(props) {
    __SuperPage.setupStaticSuperPage(props)
    let propReturn = await __SuperPage.getInitialProps(props, Child.getInitialPromiseListForProps(props))

    // console.log("~~~~~~~~~~~~~~~~~~~~~~return data initprops")
    // console.log(propReturn.initPropsData.data)

    if ((!propReturn.initPropsData.data || propReturn.initPropsData.data.length == 0)) {
      if (props.res) {
        props.res.statusCode = 404
        return {...propReturn,notfound:true}
      } else {
        return {...propReturn,notfound:true}
      }
    }
    
    propReturn.initPropsData.needSetupStickyMenuListCallback = true

    propReturn.initPropsData.stickyMenuList = [];
    if (propReturn.initPropsData.data.highlight) {
      propReturn.initPropsData.stickyMenuList.push({ id: "highlight", name: Language.getLanguage(LanguageIdMap.HIGH_LIGHT) })
    }
    propReturn.initPropsData.stickyMenuList.push({ id: "package_options", name: Language.getLanguage(LanguageIdMap.PACKAGE_OPTIONS) })
    if (propReturn.initPropsData.data.longDescription) {
      propReturn.initPropsData.stickyMenuList.push({ id: "what_to_expect", name: Language.getLanguage(LanguageIdMap.WHAT_TO_EXPECT) })
    }
    if (propReturn.initPropsData.data.actInfo) {
      propReturn.initPropsData.stickyMenuList.push({ id: "act_info", name: Language.getLanguage(LanguageIdMap.ACT_INFO) })
    }
    if (propReturn.initPropsData.data.howUse) {
      propReturn.initPropsData.stickyMenuList.push({ id: "how_to_use", name: Language.getLanguage(LanguageIdMap.HOW_TO_USE) })
    }
    propReturn.initPropsData.stickyMenuList.push({ id: "cancel_policy", name: Language.getLanguage(LanguageIdMap.CANCEL_POLICY) })

    propReturn.initPropsData.stickyMenuList.push({ id: "faq", name: Language.getLanguage(LanguageIdMap.FAQ) })

    try {
      $('html, body').animate({
        scrollTop: 0
      }, 0)
    } catch (error) {

    }

    return propReturn;
  }
  render() {
    if(this.props.notfound) {
      return <NotFoundPage {...this.props} />
    }
    return <Child {...this.props} />
  }
}

export default Display

import Child from '../src/routes/category/Destination'
import __SuperPage from './__SuperPage';
import common from '../src/data/common';
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

    // console.log(common)
    if (common.typeOfTrip && common.typeOfTrip.data) {
      propReturn.initPropsData.filter = [
        {
          type: LanguageIdMap.CATEGORY_FILTER.TYPE_OF_TRIP.value,
          name: Language.getLanguage(LanguageIdMap.CATEGORY_FILTER.TYPE_OF_TRIP.id),
          subCategories: common.typeOfTrip.data
        },
        ...common.productFilterArr
      ]
    }
    if (propReturn.common) {
      propReturn.common.productFilterArr = common.productFilterArr
    }
    if ((!propReturn.initPropsData.category || propReturn.initPropsData.category.length == 0)) {
      if (props.res) {
        props.res.statusCode = 404
        return { ...propReturn, notfound: true }
      } else {
        return { ...propReturn, notfound: true }
      }
    }

    // console.log(propReturn.initPropsData.filter)
    await Child.getProductFilter()
    return propReturn;
  }
  render() {
    if (this.props.notfound) {
      return <NotFoundPage {...this.props} />
    }
    return <Child {...this.props} />
  }
}

export default Display

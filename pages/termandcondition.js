import Child from '../src/routes/termAndCondition'
import __SuperPage from './__SuperPage';

class Display extends __SuperPage {
  constructor(props) {
    super(props);
  }
  static async getInitialProps(context) {
    __SuperPage.setupStaticSuperPage(context)
    return await __SuperPage.getInitialProps(context)
  }
  render() {
    return <Child {...this.props} />
  }
}

export default Display

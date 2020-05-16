

import React, { PropTypes, Component } from 'react';

import { api, config } from '../../config';
import LanguageIdMap from '../../language/LanguageIdMap'
import Language from '../../language/Language'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import SuperComponent from '../../components/SuperComponent';

class Display extends SuperComponent {
  constructor(props, context) {
    super(props, context);
    
    this.props.initPropsData.seoTitle = Language.getLanguage(LanguageIdMap.PRIVACY_POLICY);
    this.props.initPropsData.seoDescription = Language.getLanguage(LanguageIdMap.PRIVACY_POLICY);

  }

  renderData() {
    return <div style={{ backgroundColor: config.colorConfig.grey, paddingTop: 24,paddingBottom:24 }}>
      <div style={{ ...config.pageSmallWidthStyle, paddingTop: 12,paddingBottom:12, backgroundColor: "#fff" }}>
        <div style={{}}>
          <h1 style={{ marginBottom: 40, fontSize: 32, textAlign: "center", color: config.colorConfig.main }}>
            {Language.getLanguage(LanguageIdMap.PRIVACY_POLICY)}
          </h1>
        </div>

        <hr style={{marginBottom:48}}/>

        {ReactHtmlParser(`<div class="c6">
        <style>
        .c4{
          font-size:18px;
          font-weight:bold;
        }
        </style>
        <span>
        <div  class="c4">CHÚNG TÔI THU THẬP DỮ LIỆU NHƯ THẾ NÀO?</div>
        <br>Thông tin của người sử dụng trang web phuotvivu.com được thu thập một cách chủ động và thụ động. Thu thập thông tin một cách chủ động là khi người sử dụng đăng nhập thông tin, tiến hành mua bán trực tuyến. Thu thập thông tin một cách thụ động là khi máy chủ tự động ghi chép các dữ liệu liên quan đến trang web bao gồm địa chỉ IP, loại trình duyệt và độ phân giải bằng các chương trình phân tích hành vi khách hàng nhằm phục vụ cho mục đích thống kê.
        <br>
        <br><div  class="c4">PHẠM VI CỦA CÁC DỮ LIỆU ĐƯỢC THU THẬP</div>
        <br>Địa chỉ email của người sử dụng được thu thập trong quá trình đăng ký nhận bản tin mới từ phuotvivu.com. Những thông tin khách hàng bao gồm: tên họ đầy đủ, địa chỉ, số điện thoại, số fax (tùy chọn), thông tin công ty (tùy chọn trong việc xuất hóa đơn) và địa chỉ email sẽ được thu thập trong quá trình mua vé. Trong trường hợp khách hàng không muốn nhận các tiếp thị điện tử hoặc chương trình khuyến mại từ phuotvivu.com, khách hàng có thể từ chối nhận bản tin. Tuy nhiên, khách hàng phải cung cấp những thông tin cần thiết mà phuotvivu.com cần như thông tin cá nhân hoặc chi tiết thẻ tín dụng trong quá trình mua bán trực tuyến.
        <br>
        <br>Ngoài ra, thông tin cá nhân khách hàng cũng có thể được thu thập từ các tổ chức trực tuyến có uy tín nhằm bổ sung dữ liệu và phục vụ quá trình thống kê và/hoặc phân tích thói quen mua hàng trực tuyến. Trong quá trình sử dụng trang web phuotvivu.com, vì lý do an ninh, các dữ liệu liên quan đến kết nối máy vi tính và trình duyệt internet của người dùng đều được tự động cập nhật.
        <br>
        <br>Hệ thống của phuotvivu.com chỉ quan tâm đến chi tiết giao dịch chứ không quan tâm đến thông tin cá nhân của khách hàng, kể cả đối với các thông tin được thu thập một cách chủ động (hay thụ động). Trường hợp người sử dụng đăng ký và mong muốn nhận được cách thông tin khuyến mại từ chúng tôi, cơ sở dữ liệu của chúng tôi sẽ tự động phân tích và thu thập các sở thích du lịch của khách hàng và tư vấn nhiều tìm kiếm tối ưu nhất. Tuy nhiên, đối với các khách hàng sử dụng thẻ tín dụng bất hợp pháp hoặc những hành vi vi phạm pháp luật khác đều có thể bị truy tố theo luật pháp và khách hàng chịu trách nhiệm trước pháp luật về các hành vi của mình. Các cơ quan có liên quan của Chính phủ có thể xác định địa điểm của máy tính truy cập và khởi tố người sử dụng dữ liệu từ máy chủ.
        <br>
        <br>Các dữ liệu thu thập chứa các thông tin về nguồn gốc, thông tin từ các trang web đã dẫn người dùng đến phuotvivu.com, các dữ liệu liên quan đến địa chỉ IP kết nối internet, thông tin đăng ký của máy chủ, độ phân giải và các dữ liệu kỹ thuật khác. Các dữ liệu truy cập cũng bao gồm cả các từ khóa liên quan, các trang quảng cáo liên kết dẫn người sử dụng đến với phuotvivu.com và các lần truy cập cuối cùng đến phuotvivu.com.
        <br>
        <br><div  class="c4">CHÚNG TÔI THU THẬP THÔNG TIN ĐỂ LÀM GÌ?</div>
        <br>Các thông tin cá nhân của khách hàng được thu thập nhằm hoàn thành quá trình bán sản phẩm và dịch vụ được cung cấp bởi phuotvivu.com, cụ thể là việc đặt mua các sản phẩm/dịch vụ về du lịch tại điểm đến . Các dữ liệu được thu thập cũng có thể được sử dụng để cung cấp sản phẩm và dịch vụ khác trong tương lai. Trong một số trường hợp, chúng tôi sẽ sử dụng các thông tin này để thực hiện các chương trình khuyến mại, chiến dịch quảng cáo hoặc các cuộc khảo sát thăm dò ý kiến khách hàng.
        <br>
        <br>Chúng tôi cũng sử dụng các thông tin này cho mục đích thống kê. Quá trình thống kê sẽ được thực hiện bằng các hệ thống phân tích được cung cấp bởi các công ty có uy tín nhằm bảo về quyền riêng tư tối ưu cho phuotvivu.com và khách hàng của phuotvivu.com. Dựa trên các dữ liệu được phân tích trên, phuotvivu.com qua đó có thể thống kê hành vi, sở thích của người dùng nhằm cải thiện chất lượng trang web và tăng thêm sự hài lòng cho người sử dụng.
        <br>
        <br><div  class="c4">TRUYỀN TẢI DỮ LIỆU CỦA KHÁCH HÀNG QUA CÁC ĐƠN VỊ KHÁC</div>
        <br>Thông tin của khách hàng chỉ được truyền tải cho các đối tác &amp; nhà cung cấp dịch vụ trực tiếp của phuotvivu.com.
        <br>
        <br>phuotvivu.com đảm bảo các chi tiết và thông tin cá nhân trên chỉ được truyền tải cho các đơn vị đáng tin cậy và không lạm dụng quyền riêng tư đối với người sử dụng trang web phuotvivu.com.
        <br>
        <br>Những chi tiết liên quan đến thẻ tín dụng chỉ được truyền tải đến các đơn vị đáng tin cậy và được ủy quyền bởi ngân hàng hoặc các nhà khai thác thẻ. Việc truyền dữ liệu sẽ được xử lý bằng các phương pháp mã hóa dữ liệu tối tân nhằm ngăn chặn các truy cập trái phép.
        <br>
        <br>phuotvivu.com có quyền cung cấp các dữ liệu cho các cơ quan có liên quan khi nhận được yêu cầu hợp pháp từ các cơ quan của Chính phủ. phuotvivu.com không được phép bán các dữ liệu thu thập được về người sử dụng cho các đối tượng và đơn vị khác nhau nhằm mục đích lợi nhuận.
        <br>
        <br><div  class="c4">QUY TẮC LIÊN LẠC GIỮA PHUOTVIVU.COM VÀ NGƯỜI SỬ DỤNG</div>
        <br>phuotvivu.com được phép liên lạc với người sử dụng khi cần thiết thông qua: email, tin nhắn SMS, fax, thư, điện thoại, gặp trực tiếp để thực hiện các hoạt động bán hàng hoặc thăm dò ý kiến, đo lường sự hài lòng của khách hàng nhằm từng bước cải thiện chức năng của trang web phuotvivu.com.
        <br>
        <br>phuotvivu.com cũng sẽ liên lạc với người sử dụng để cung cấp cho người dùng các thông tin liên quan đến các chương trình khuyến mại và chiến dịch quảng cáo (người dùng có thể đăng ký sử dụng vào bất cứ lúc nào).
        <br>
        <br>Những chi tiết liên quan đến thẻ tín dụng chỉ được truyền tải đến các đơn vị đáng tin cậy và được ủy quyền bởi ngân hàng hoặc các nhà khai thác thẻ. Việc truyền dữ liệu sẽ được xử lý bằng các phương pháp mã hóa dữ liệu tối tân nhằm ngăn chặn các truy cập trái phép.
        <br>
        <br>phuotvivu.com có quyền cung cấp các dữ liệu cho các cơ quan có liên quan khi nhận được yêu cầu hợp pháp từ các cơ quan của Chính phủ. phuotvivu.com không được phép bán các dữ liệu thu thập được về người sử dụng cho các đối tượng và đơn vị khác nhau nhằm mục đích lợi nhuận.
        <br>
        <br><div  class="c4">THAY ĐỔI CÁC CHI TIẾT CÁ NHÂN VÀ TỪ CHỐI NHẬN CÁC THÔNG TIN QUẢNG CÁO</div>
        <br>Mỗi thành viên của trang web phuotvivu.com có quyền xem những thông tin cá nhân của mình trên trang web và thay đổi theo mong muốn. Để thực hiện việc này, người sử dụng cần đăng nhập vào trang web và thay đổi thông tin. Người sử dụng có thể được yêu cầu cung cấp một số thông tin cần thiết hoặc chứng minh thông tin tài khoản đăng nhập bằng cách kích hoạt đường dẫn qua email đăng ký.
        <br>
        <br>Khách hàng đã đăng ký nhận thông tin từ phuotvivu.com có thể từ chối nhận các bản tin, thông tin thương mại và quảng cáo bất cứ lúc nào hoặc cấm truyền tải thông tin cá nhân cho các đơn vị khác trừ khi thực hiện các giao dịch trực tuyến. Khách hàng có thể xóa các dữ liệu cá nhân trên phuotvivu.com vào bất cứ thời điểm nào. Tuy nhiên, một số thông tin liên quan đến mục đích kế toán vẫn được phuotvivu.com lưu giữ một cách hợp pháp.
        <br>
        <br><div  class="c4">BẢO MẬT DỮ LIỆU</div>
        <br>Nhằm bảo mật các dữ liệu và thông tin thanh toán của người sử dụng, thông tin liên lạc giữa các máy tính của người dùng và máy chủ của phuotvivu.com được mã hóa bằng giao thức SSL (Secure Socket Layer). Ngoài ra phuotvivu.com cũng cung cấp các thông tin không yêu cầu tính bảo mật cao bằng giao thức HTTP trên trang web công cộng www.phuotvivu.com.
        <br>
        <br>Cơ sở dữ liệu thu thập được và lưu trên máy chủ của phuotvivu.com được bảo vệ chống truy cập với một hệ thống mật khẩu hoàn toàn bảo mật.
        <br>
        <br><div  class="c4">LOẠI TRỪ TRÁCH NHIỆM</div>
        <br>Toàn bộ thông tin về chính sách bảo mật cho người sử dụng phuotvivu.com đã được bao gồm trong tài liệu này. Tuy nhiên, trong thực tế có thể có các trường hợp phuotvivu.com thực hiện việc thu thập, xử lý và sử dụng thông tin người dùng không hoàn toàn giống so với miêu tả trong tài liệu này miễn là việc đó không lạm dụng vào quyền riêng tư của người dùng.
        <br>
        <br>phuotvivu.com cam kết sử dụng các biện pháp cần thiết để thực hiện chính sách bảo mật. Tuy nhiên, phuotvivu.com không có nghĩa vụ bồi thường cho việc lạm dụng và không tuân thủ chính sách bảo mật. Ngoại trừ trường hợp những nghĩa vụ này có liên quan đến trách nhiệm dân sự và hình sự theo luật pháp.
        <br>
        <br>phuotvivu.com có thể có những liên kết, quảng cáo và các đường dẫn đến các trang web khác. Chúng tôi cam kết nỗ lực liên kết đến những trang web có giá trị và uy tín nhằm bảo đảm sự an toàn và riêng tư của người sử dụng. Tuy nhiên, phuotvivu.com xin khẳng định chính sách bảo mật của các trang web hoàn toàn khác nhau và độc lập với phuotvivu.com. phuotvivu.com không chịu trách nhiệm đối với các trang web khác.
        <br>
        <br><div  class="c4">TỔ CHỨC THU THẬP DỮ LIỆU</div>
        <br>Tổ chức thu thập dữ liệu là Công ty Trách nhiệm hữu hạn Phượt Vi Vu, có trụ sở đặt tại Thành phố Hồ Chí Minh, Việt Nam. Chi tiết về công ty có trong mục “Liên hệ” của trang web phuotvivu.com
        <br>
        <br><div  class="c4">THAY ĐỔI CÁC CHÍNH SÁCH BẢO MẬT</div>
        <br>Các chính sách bảo mật có thể được thay đổi cho phù hợp với thực tế. Các thay đổi sẽ được cập nhật tới người dùng trên trang web phuotvivu.com.
        </span>
        
  </div>`)}
      </div>
    </div>
  }
}

export default Display;

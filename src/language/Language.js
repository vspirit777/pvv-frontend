import React, { PropTypes, Component } from 'react';
import LanguageIdMap from './LanguageIdMap';

let languageDefineVietNam = "vi.";
let languageDefineEnglish = "en.";
let languageDefineKorea = "ko.";
let languageDefineJapan = "jp.";

let getFullnameLanguage = (lang = undefined) => {
    if (!lang) {
        lang = LanguageDefine.currentLanguage;
    }
    if (lang === languageDefineVietNam) {
        return "Tiếng Việt";
    } else if (lang === languageDefineEnglish) {
        return "English";
    } else if (lang === languageDefineKorea) {
        return "한국어";
    } else if (lang === languageDefineJapan) {
        return "日本語";
    }
}
let LanguageDefine = {
    languageList: [languageDefineVietNam,languageDefineEnglish, languageDefineKorea, languageDefineJapan],
    currentLanguage: languageDefineVietNam,          //it only en. or vi., it will be define at setCurrentLanguageFromAsyncStorage below
    language: new Map([

        [`vi.${LanguageIdMap.moneyTypeVND}`, `₫`],
        [`en.${LanguageIdMap.moneyTypeVND}`, `VND`],
        [`ko.${LanguageIdMap.moneyTypeVND}`, `VND`],
        [`jp.${LanguageIdMap.moneyTypeVND}`, `VND`],

        [`vi.${LanguageIdMap.combo}`, `Combo`],
        [`en.${LanguageIdMap.combo}`, `Combo`],
        [`ko.${LanguageIdMap.combo}`, `저렴한 세트`],
        [`jp.${LanguageIdMap.combo}`, `お得なセット`],

        [`vi.${LanguageIdMap.registerNow}`, `Tạo Ngay`],
        [`en.${LanguageIdMap.registerNow}`, `Register Now`],
        [`ko.${LanguageIdMap.registerNow}`, `지금 등록`],
        [`jp.${LanguageIdMap.registerNow}`, `今すぐ登録`],

        [`vi.${LanguageIdMap.noAccount}`, `Chưa có tài khoản`],
        [`en.${LanguageIdMap.noAccount}`, `No account`],
        [`ko.${LanguageIdMap.noAccount}`, `아직 등록하지 않습니다.`],
        [`jp.${LanguageIdMap.noAccount}`, `まだ登録していません。`],

        [`vi.${LanguageIdMap.loginNow}`, `Đăng nhập ngay`],
        [`en.${LanguageIdMap.loginNow}`, `Login Now`],
        [`ko.${LanguageIdMap.loginNow}`, `로그인`],
        [`jp.${LanguageIdMap.loginNow}`, `ログイン`],

        [`vi.${LanguageIdMap.haveAccount}`, `Đã có tài khoản`],
        [`en.${LanguageIdMap.haveAccount}`, `Already have an account`],
        [`ko.${LanguageIdMap.haveAccount}`, `등록`],
        [`jp.${LanguageIdMap.haveAccount}`, `登録済み`],

        [`vi.${LanguageIdMap.NOT_EXIST}`, `Không tồn tại`],
        [`en.${LanguageIdMap.NOT_EXIST}`, `Doesn't Exist`],
        [`ko.${LanguageIdMap.NOT_EXIST}`, `존재하지 않는다.`],
        [`jp.${LanguageIdMap.NOT_EXIST}`, `存在していない。`],

        [`vi.${LanguageIdMap.UNKNOWN_ERROR}`, `Lỗi không xác định`],
        [`en.${LanguageIdMap.UNKNOWN_ERROR}`, `Unknown Error`],
        [`ko.${LanguageIdMap.UNKNOWN_ERROR}`, `알 수없는 오류`],
        [`jp.${LanguageIdMap.UNKNOWN_ERROR}`, `不明なエラー`],

        [`vi.${LanguageIdMap.EMAIL_EXISTED}`, `Email đã tồn tại`],
        [`en.${LanguageIdMap.EMAIL_EXISTED}`, `This email is already in use`],
        [`ko.${LanguageIdMap.EMAIL_EXISTED}`, `이 이메일 주소는 이미 사용되고 있습니다.`],
        [`jp.${LanguageIdMap.EMAIL_EXISTED}`, `このメール アドレスは既に取得されています。`],

        [`vi.${LanguageIdMap.PHONE_EXISTED}`, `Số điện thoại đã tồn tại`],
        [`en.${LanguageIdMap.PHONE_EXISTED}`, `This phone number is already in use`],
        [`ko.${LanguageIdMap.PHONE_EXISTED}`, `이 전화 번호는 이미 사용되고 있습니다.`],
        [`jp.${LanguageIdMap.PHONE_EXISTED}`, `この電話番号はすでに使用されています。`],

        [`vi.${LanguageIdMap.SESSION_EXPIRED}`, `Phiên đăng nhập đã hết hạn`],
        [`en.${LanguageIdMap.SESSION_EXPIRED}`, `Session Expired`],
        [`ko.${LanguageIdMap.SESSION_EXPIRED}`, `세션이 만료되었습니다`],
        [`jp.${LanguageIdMap.SESSION_EXPIRED}`, `セッションの有効期限が切れました`],

        [`vi.${LanguageIdMap.SESSION_INVALID}`, `Cần đăng nhập để sử dụng tính năng này`],
        [`en.${LanguageIdMap.SESSION_INVALID}`, `Need login for using this function`],
        [`ko.${LanguageIdMap.SESSION_INVALID}`, `이 기능을 사용하려면 로그인이 필요합니다.`],
        [`jp.${LanguageIdMap.SESSION_INVALID}`, `この機能を使用するにはログインが必要です。`],

        [`vi.${LanguageIdMap.CREDENTIAL_INVALID}`, `Thông tin đăng nhập không hợp lệ`],
        [`en.${LanguageIdMap.CREDENTIAL_INVALID}`, `Invalid login information`],
        [`ko.${LanguageIdMap.CREDENTIAL_INVALID}`, `인증 정보가 올바르지 않습니다.`],
        [`jp.${LanguageIdMap.CREDENTIAL_INVALID}`, `認証情報が正しくありません。`],

        [`vi.${LanguageIdMap.ACTIVE_CODE_INVALID}`, `Mã kích hoạt không hợp lệ`],
        [`en.${LanguageIdMap.ACTIVE_CODE_INVALID}`, `Invalid Activation code`],
        [`ko.${LanguageIdMap.ACTIVE_CODE_INVALID}`, `활성화 코드의 형식이 올바르지 않습니다.`],
        [`jp.${LanguageIdMap.ACTIVE_CODE_INVALID}`, `アクティベーションコードの形式が正しくありません。`],

        [`vi.${LanguageIdMap.PASSWORD_FORMAT_INVALID}`, `Định dạng mật khẩu không đúng`],
        [`en.${LanguageIdMap.PASSWORD_FORMAT_INVALID}`, `Invalid Password Format`],
        [`ko.${LanguageIdMap.PASSWORD_FORMAT_INVALID}`, `암호의 형식이 올바르지 않습니다.`],
        [`jp.${LanguageIdMap.PASSWORD_FORMAT_INVALID}`, `パスワードの形式が正しくありません。`],

        [`vi.${LanguageIdMap.PHONE_FORMAT_INVALID}`, `Định dạng số điện thoại không hợp lệ`],
        [`en.${LanguageIdMap.PHONE_FORMAT_INVALID}`, `Invalid phone number format`],
        [`ko.${LanguageIdMap.PHONE_FORMAT_INVALID}`, `휴대폰 번호의 형식이 올바르지 않습니다.`],
        [`jp.${LanguageIdMap.PHONE_FORMAT_INVALID}`, `携帯番号の形式が正しくありません。`],

        [`vi.${LanguageIdMap.PAYMENT_SECRET_ANSWER_INVALID}`, `Câu trả lời bí mật thanh toán không hợp lệ`],
        [`en.${LanguageIdMap.PAYMENT_SECRET_ANSWER_INVALID}`, `Invalid Payment Secret Answer`],
        [`ko.${LanguageIdMap.PAYMENT_SECRET_ANSWER_INVALID}`, `지불 보안 용 질문의 답변이 정확하지 않습니다.`],
        [`jp.${LanguageIdMap.PAYMENT_SECRET_ANSWER_INVALID}`, `支払いのセキュリティ保護用質問の回答が正しくありません。`],

        [`vi.${LanguageIdMap.EMAIL_FORMAT_INVALID}`, `Định dạng email không hợp lệ`],
        [`en.${LanguageIdMap.EMAIL_FORMAT_INVALID}`, `Invalid Email Format`],
        [`ko.${LanguageIdMap.EMAIL_FORMAT_INVALID}`, `이메일 형식이 올바르지 않습니다.`],
        [`jp.${LanguageIdMap.EMAIL_FORMAT_INVALID}`, `電子メール形式が正しくありません。`],

        [`vi.${LanguageIdMap.NOT_SCAN_MULTIPLE_TIME}`, `Không được quét quá nhiều lần liên tục`],
        [`en.${LanguageIdMap.NOT_SCAN_MULTIPLE_TIME}`, `Not Scan Multiple Time`],
        [`ko.${LanguageIdMap.NOT_SCAN_MULTIPLE_TIME}`, `연속해서 여러 번 스캔 할 수 없습니다.`],
        [`jp.${LanguageIdMap.NOT_SCAN_MULTIPLE_TIME}`, `連続して複数回をスキャンすることができません。`],

        [`vi.${LanguageIdMap.NOT_ENOUGH_POINT}`, `Không đủ hạt dẻ`],
        [`en.${LanguageIdMap.NOT_ENOUGH_POINT}`, `Not Enough Points`],
        [`ko.${LanguageIdMap.NOT_ENOUGH_POINT}`, `포인트가 부족합니다.`],
        [`jp.${LanguageIdMap.NOT_ENOUGH_POINT}`, `ポイントは不足です。`],

        [`vi.${LanguageIdMap.NOT_ENOUGH_STAR}`, `Không đủ star`],
        [`en.${LanguageIdMap.NOT_ENOUGH_STAR}`, `Not enought stars`],
        [`ko.${LanguageIdMap.NOT_ENOUGH_STAR}`, `별은 부족합니다.`],
        [`jp.${LanguageIdMap.NOT_ENOUGH_STAR}`, `星は不足です。`],

        [`vi.${LanguageIdMap.NONE_OF_PROMOTION}`, `Không có khuyến mãi`],
        [`en.${LanguageIdMap.NONE_OF_PROMOTION}`, `No available promotion`],
        [`ko.${LanguageIdMap.NONE_OF_PROMOTION}`, `프로모션은 없습니다.`],
        [`jp.${LanguageIdMap.NONE_OF_PROMOTION}`, `プロモーションはありません。`],

        [`vi.${LanguageIdMap.PROMOTION_IS_EXPIRED}`, `Khuyến mãi đã hết hạn`],
        [`en.${LanguageIdMap.PROMOTION_IS_EXPIRED}`, `Promotion is already expired`],
        [`ko.${LanguageIdMap.PROMOTION_IS_EXPIRED}`, `프로모션의 유효 기간이 종료되었습니다.`],
        [`jp.${LanguageIdMap.PROMOTION_IS_EXPIRED}`, `プロモーションの有効期限が終了しました。`],

        [`vi.${LanguageIdMap.PROMO_CODE_INVALID}`, `Mã khuyến mãi không hợp lệ`],
        [`en.${LanguageIdMap.PROMO_CODE_INVALID}`, `Promotion code invalid`],
        [`ko.${LanguageIdMap.PROMO_CODE_INVALID}`, `프로모션 코드가 제공되지 않습니다.`],
        [`jp.${LanguageIdMap.PROMO_CODE_INVALID}`, `プロモコードがご利用いただけません。`],

        [`vi.${LanguageIdMap.PROMO_CODE_ALREADY_USED_REFERRAL_CODE}`, `Mã khuyến mãi đã được sử dụng`],
        [`en.${LanguageIdMap.PROMO_CODE_ALREADY_USED_REFERRAL_CODE}`, `Promotion code is already in use`],
        [`ko.${LanguageIdMap.PROMO_CODE_ALREADY_USED_REFERRAL_CODE}`, `프로모션 코드는 이미 사용되고 있습니다.`],
        [`jp.${LanguageIdMap.PROMO_CODE_ALREADY_USED_REFERRAL_CODE}`, `プロモコードは既に使用されています。`],

        [`vi.${LanguageIdMap.PROMO_CODE_EXPIRE_USE_REFERRAL}`, `Mã khuyến mãi đã hết hạn`],
        [`en.${LanguageIdMap.PROMO_CODE_EXPIRE_USE_REFERRAL}`, `Promotion code is already expired`],
        [`ko.${LanguageIdMap.PROMO_CODE_EXPIRE_USE_REFERRAL}`, `프로모션 코드의 유효 기간이 종료되었습니다.`],
        [`jp.${LanguageIdMap.PROMO_CODE_EXPIRE_USE_REFERRAL}`, `プロモコードの有効期限が終了しました。`],

        [`vi.${LanguageIdMap.FAV_QUOTA_LIMIT}`, `Giới hạn quota yêu thích`],
        [`en.${LanguageIdMap.FAV_QUOTA_LIMIT}`, `Favourate quota limit`],
        [`ko.${LanguageIdMap.FAV_QUOTA_LIMIT}`, `할당량 제한 Favourate`],
        [`jp.${LanguageIdMap.FAV_QUOTA_LIMIT}`, `クォータ制限を上回る`],

        [`vi.${LanguageIdMap.for_partner}`, `Dành cho đối tác`],
        [`en.${LanguageIdMap.for_partner}`, `For partner`],
        [`ko.${LanguageIdMap.for_partner}`, `파트너를위한`],
        [`jp.${LanguageIdMap.for_partner}`, `パートナーのため`],

        [`vi.${LanguageIdMap.seeLess}`, `Thu gọn`],
        [`en.${LanguageIdMap.seeLess}`, `See less`],
        [`ko.${LanguageIdMap.seeLess}`, `생략`],
        [`jp.${LanguageIdMap.seeLess}`, `省略する`],

        [`vi.${LanguageIdMap.GALERY}`, `Thư viện`],
        [`en.${LanguageIdMap.GALERY}`, `Gallery`],
        [`ko.${LanguageIdMap.GALERY}`, `갤러리`],
        [`jp.${LanguageIdMap.GALERY}`, `ギャラリー`],

        [`vi.${LanguageIdMap.menu}`, `Thực đơn`],
        [`en.${LanguageIdMap.menu}`, `Menu`],
        [`ko.${LanguageIdMap.menu}`, `메뉴`],
        [`jp.${LanguageIdMap.menu}`, `メニュー`],

        [`vi.${LanguageIdMap.VIDEO}`, `Video`],
        [`en.${LanguageIdMap.VIDEO}`, `Video`],
        [`ko.${LanguageIdMap.VIDEO}`, `비디오`],
        [`jp.${LanguageIdMap.VIDEO}`, `ビデオ`],

        [`vi.${LanguageIdMap.CONTACT_US}`, `Liên hệ với chúng tôi`],
        [`en.${LanguageIdMap.CONTACT_US}`, `Contact us`],
        [`ko.${LanguageIdMap.CONTACT_US}`, `문의`],
        [`jp.${LanguageIdMap.CONTACT_US}`, `お問い合わせ`],

        [`vi.${LanguageIdMap.please_input}`, `Vui lòng nhập`],
        [`en.${LanguageIdMap.please_input}`, `Please input`],
        [`ko.${LanguageIdMap.please_input}`, `입력 해주십시오`],
        [`jp.${LanguageIdMap.please_input}`, `ご入力ください`],

        [`vi.${LanguageIdMap.love_to_save}`, `Thích thì tích`],
        [`en.${LanguageIdMap.love_to_save}`, `Love to save`],
        [`ko.${LanguageIdMap.love_to_save}`, `저축하고`],
        [`jp.${LanguageIdMap.love_to_save}`, `貯めたい`],

        [`vi.${LanguageIdMap.love_to_spen}`, `Thích thì tiêu`],
        [`en.${LanguageIdMap.love_to_spen}`, `Love to spend`],
        [`ko.${LanguageIdMap.love_to_spen}`, `사용하고 싶은`],
        [`jp.${LanguageIdMap.love_to_spen}`, `使いたい`],

        [`vi.${LanguageIdMap.special_feature}`, `Tính năng nổi bật`],
        [`en.${LanguageIdMap.special_feature}`, `Special feature`],
        [`ko.${LanguageIdMap.special_feature}`, `특수 기능`],
        [`jp.${LanguageIdMap.special_feature}`, `特殊機能`],

        [`vi.${LanguageIdMap.save}`, `Tiết kiệm`],
        [`en.${LanguageIdMap.save}`, `Save`],
        [`ko.${LanguageIdMap.save}`, `저축`],
        [`jp.${LanguageIdMap.save}`, `貯蓄`],

        [`vi.${LanguageIdMap.save_nut_is_save_money}`, `Tích lũy hạt dẻ tức là tích lũy tiền.`],
        [`en.${LanguageIdMap.save_nut_is_save_money}`, `Easily increase money through many online activities: answer the survey, download app...`],
        [`ko.${LanguageIdMap.save_nut_is_save_money}`, `저축돈이 이어집니다.`],
        [`jp.${LanguageIdMap.save_nut_is_save_money}`, `「貯める」にお金がつながっていきます。`],

        [`vi.${LanguageIdMap.use_nut_as_use_money}`, `Sử dụng hạt dẻ như sử dụng tiền.`],
        [`en.${LanguageIdMap.use_nut_as_use_money}`, `Using points is alike using money.`],
        [`ko.${LanguageIdMap.use_nut_as_use_money}`, `모은 포인트는 MYPOP 파트너에 현금처럼 사용할 수있게합니다.`],
        [`jp.${LanguageIdMap.use_nut_as_use_money}`, `貯めたポイントはMYPOP提携先に現金払いのように使えるようになります。`],

        [`vi.${LanguageIdMap.increasing_money}`, `Tăng thu nhập`],
        [`en.${LanguageIdMap.increasing_money}`, `Increasing income`],
        [`ko.${LanguageIdMap.increasing_money}`, `소득 증대`],
        [`jp.${LanguageIdMap.increasing_money}`, `収入を増やす`],

        [`vi.${LanguageIdMap.increase_money_through_many_activity}`, `Dễ dàng tăng thu nhập qua các hoạt động online: trả lời survey, download app...`],
        [`en.${LanguageIdMap.increase_money_through_many_activity}`, `Easily increase income through activities such as: online survey, download app`],
        [`ko.${LanguageIdMap.increase_money_through_many_activity}`, `온라인 조사 다운로드 응용 프로그램 등의 활동을 통해 쉽게 수익을 늘릴 수 있습니다.`],
        [`jp.${LanguageIdMap.increase_money_through_many_activity}`, `オンライン調査、ダウンロードアプリなどの活動を通じて簡単に収入を増やすことができます。`],

        [`vi.${LanguageIdMap.easy}`, `Thuận tiện`],
        [`en.${LanguageIdMap.easy}`, `Easy`],
        [`ko.${LanguageIdMap.easy}`, `쉽게`],
        [`jp.${LanguageIdMap.easy}`, `簡単`],

        [`vi.${LanguageIdMap.use_smartphone_every_where}`, `Tiện dụng mọi lúc mọi nơi chỉ với chiếc điện thoại thông minh.`],
        [`en.${LanguageIdMap.use_smartphone_every_where}`, `Easily use it everytime, everywhere with just your smartphone`],
        [`ko.${LanguageIdMap.use_smartphone_every_where}`, `스마트 폰을 사용하면 언제 어디서나 쉽게 사용할 수 있습니다.`],
        [`jp.${LanguageIdMap.use_smartphone_every_where}`, `スマートフォンを使えば、いつでもどこでも簡単にご使用になれます。`],

        [`vi.${LanguageIdMap.never_bring_member_card}`, `Không bao giờ phải mang theo thẻ thành viên.`],
        [`en.${LanguageIdMap.never_bring_member_card}`, `Do not need to bring your member's card.`],
        [`ko.${LanguageIdMap.never_bring_member_card}`, `회원 카드를 지참 할 필요가 없습니다.`],
        [`jp.${LanguageIdMap.never_bring_member_card}`, `会員カードを持参する必要はありません。`],

        [`vi.${LanguageIdMap.give_and_more}`, `TẶNG VÀ CHUYỂN`],
        [`en.${LanguageIdMap.give_and_more}`, `GIFT AND TRANSFER`],
        [`ko.${LanguageIdMap.give_and_more}`, `선물 및 포인트 보내기`],
        [`jp.${LanguageIdMap.give_and_more}`, `ギフトとポイント送信`],

        [`vi.${LanguageIdMap.easy_give_and_move_nut}`, `Dễ dàng chuyển hay tặng hạt dẻ cho bạn bè và người thân.`],
        [`en.${LanguageIdMap.easy_give_and_move_nut}`, `Easily transfer points to family members and friends.`],
        [`ko.${LanguageIdMap.easy_give_and_move_nut}`, `포인트를 가족이나 친구에게 쉽게 보낼 수 있습니다.`],
        [`jp.${LanguageIdMap.easy_give_and_move_nut}`, `ポイントを家族や友人に簡単に送信できます。`],

        [`vi.${LanguageIdMap.valueable_present}`, `Quà tặng giá trị`],
        [`en.${LanguageIdMap.valueable_present}`, `Valuable gift`],
        [`ko.${LanguageIdMap.valueable_present}`, `가치 절임 선물`],
        [`jp.${LanguageIdMap.valueable_present}`, `価値づけギフト`],

        [`vi.${LanguageIdMap.get_reward_present_when_use_app}`, `Nhận thưởng và quà tặng khi sử dụng app.`],
        [`en.${LanguageIdMap.get_reward_present_when_use_app}`, `Get the reward and gift when using app.`],
        [`ko.${LanguageIdMap.get_reward_present_when_use_app}`, `응용 프로그램을 사용할 때 선물을 얻는다.`],
        [`jp.${LanguageIdMap.get_reward_present_when_use_app}`, `アプリを使用するときにギフトを得る。`],

        [`vi.${LanguageIdMap.use_nut_easy_in_mypop_store}`, `Sử dụng điểm dễ dàng tại các cửa hàng trong hệ thống MYPOP.`],
        [`en.${LanguageIdMap.use_nut_easy_in_mypop_store}`, `Using points easily at every store in MYPOP.`],
        [`ko.${LanguageIdMap.use_nut_easy_in_mypop_store}`, `MYPOP 파트너에 포인트를 쉽게 사용할 수 있습니다.`],
        [`jp.${LanguageIdMap.use_nut_easy_in_mypop_store}`, `MYPOP提携先にポイントを簡単にご使用になれます。`],

        [`vi.${LanguageIdMap.corner_for_you}`, `Góc dành cho bạn`],
        [`en.${LanguageIdMap.corner_for_you}`, `Corner for you`],
        [`ko.${LanguageIdMap.corner_for_you}`, `당신을위한 코너`],
        [`jp.${LanguageIdMap.corner_for_you}`, `あなたのためのコーナー`],

        [`vi.${LanguageIdMap.goldenstar_shockedprice}`, `Giờ vàng giá sốc`],
        [`en.${LanguageIdMap.goldenstar_shockedprice}`, `Happy Hour`],
        [`ko.${LanguageIdMap.goldenstar_shockedprice}`, `해피 아워`],
        [`jp.${LanguageIdMap.goldenstar_shockedprice}`, `ハッピーアワー`],

        [`vi.${LanguageIdMap.regret_if_missing_in_day}`, `Thời điểm trong ngày sẽ khiến bạn thật tiếc nuối nếu như bỏ lỡ.`],
        [`en.${LanguageIdMap.regret_if_missing_in_day}`, `The time of day will make you regret if you miss.`],
        [`ko.${LanguageIdMap.regret_if_missing_in_day}`, `해피 아워 시간에 저렴한 가격으로 좋은 서비스를받을 수 있습니다.`],
        [`jp.${LanguageIdMap.regret_if_missing_in_day}`, `ハッピーアワーの時間帯で格安で良いサービスを得ることができます。`],

        [`vi.${LanguageIdMap.saving_money_with_voucher}`, `Tiết kiệm tiền cùng MYPOP với các voucher giảm giá ở các cửa hàng thức ăn, dịch vụ hoặc may mắn hơn là săn được một vài voucher miễn phí ở MYPOP`],
        [`en.${LanguageIdMap.saving_money_with_voucher}`, `Saving money with MYPOP through many voucher at many restaurants, stores, service. More luckily, you can get some free voucher in MYPOP.`],
        [`ko.${LanguageIdMap.saving_money_with_voucher}`, `MYPOP 제휴처에서 많은 할인 쿠폰을 받아 약간의 금액을 절약 할 수 있습니다. 다행히, 무료 쿠폰도 얻을 수 있습니다.`],
        [`jp.${LanguageIdMap.saving_money_with_voucher}`, `MYPOP提携先で多くの割引クーポン券を受け取り、多少の金額が節約できます。幸いにも、無料クーポン券も手に入れることができます。`],

        [`vi.${LanguageIdMap.nut_change_combo}`, `Lấy hạt dẻ đổi combo, bạn sẽ không nghĩ tới những hạt dẻ mình sưu tầm lại có thể đổi lấy những combo thật hấp dẫn và đặc biệt như thế nào đâu?`],
        [`en.${LanguageIdMap.nut_change_combo}`, `Take points to change combo, you will not think about collecting points can change some attractive and special combo.`],
        [`ko.${LanguageIdMap.nut_change_combo}`, `모인 포인트로 상품 세트를 구입할 수 있습니다. 포인트를 많이 저축하면 매력적인 저렴한 세트로 교환 할 수 있습니다.`],
        [`jp.${LanguageIdMap.nut_change_combo}`, `貯まったポイントでお得なセットを買うことができます。ポイントを沢山貯めたら、魅力的なお得なセットと交換することができます。`],

        [`vi.${LanguageIdMap.shopping_online}`, `Mua hàng trực tuyến`],
        [`en.${LanguageIdMap.shopping_online}`, `Shopping online`],
        [`ko.${LanguageIdMap.shopping_online}`, `온라인 쇼핑`],
        [`jp.${LanguageIdMap.shopping_online}`, `オンラインショッピング`],

        [`vi.${LanguageIdMap.shopping_online_lazy_to_go}`, `Muốn ăn nhưng "lười" ra đường, muốn shopping mà "lười" makeup. Hãy đến với ONLINE SHOPPING, MYPOP sẽ giúp bạn "lười" theo cách của bạn.`],
        [`en.${LanguageIdMap.shopping_online_lazy_to_go}`, `Too lazy to go eating, too lazy to makeup for shopping. Let's come SHOPPING ONLINE, MYPOP will make you have "your own lazy style"`],
        [`ko.${LanguageIdMap.shopping_online_lazy_to_go}`, `먹으러가는 것이 게으른 쇼핑을 위해 화장하는 것도 귀찮습니다. 온라인 쇼핑을합시다. MYPOP 당신에게 "자신의 게으른 스타일"을 갖게합니다.`],
        [`jp.${LanguageIdMap.shopping_online_lazy_to_go}`, `食べに行くのが怠惰で、買い物のために化粧するのも面倒です。オンラインで買い物をしましょう。MYPOPはあなたに「あなた自身の怠惰なスタイル」を持たせます。`],

        [`vi.${LanguageIdMap.love_to_discover}`, `Wow, sao xuất hiện đúng món mình thích vậy? Bạn sẽ tìm thấy những món ăn hay dịch vụ mà chúng tôi dành riêng cho bạn. Bạn đã sẵn sàng khám phá xung quanh bạn chưa?`],
        [`en.${LanguageIdMap.love_to_discover}`, `Wow, why MYPOP know what I like? You will discover your own favourite food or service that MYPOP specially gives for you.`],
        [`ko.${LanguageIdMap.love_to_discover}`, `와우, 왜 MYPOP가 내가 좋아하는 것을 알고 계십니까? MYPOP이 특별히 당신에게주는 자신이 좋아하는 음식과 서비스를 발견합니다.`],
        [`jp.${LanguageIdMap.love_to_discover}`, `うわー、なぜMYPOPが私の好きなものを知っていますか？ MYPOPが特別にあなたに与えてくれる自分が好きな食べ物やサービスを発見します。`],

        [`vi.${LanguageIdMap.map}`, `Bản đồ`],
        [`en.${LanguageIdMap.map}`, `Map`],
        [`ko.${LanguageIdMap.map}`, `지도`],
        [`jp.${LanguageIdMap.map}`, `地図`],

        [`vi.${LanguageIdMap.map_suggest_nearest_place}`, `Xung quanh bạn có gì? Với MYPOP, bản đồ sẽ dẫn bạn tới nơi gần nhất và phù hợp với sở thích của bạn nhất. Chọn và tích điểm thôi!`],
        [`en.${LanguageIdMap.map_suggest_nearest_place}`, `What is around you? MYPOP's map will take you go to the nearest and suitable place. Let's collect points.`],
        [`ko.${LanguageIdMap.map_suggest_nearest_place}`, `주위의 가게는 무엇일까? MYPOP의지도상의 특정 지점에서 당신에게 가장 가까운 적절한 점포를 안내합니다.`],
        [`jp.${LanguageIdMap.map_suggest_nearest_place}`, `あなたの周りの 店は何だろう？MYPOPの地図上の特定のポイントから、あなたに最も近く適切な店舗を案内します。`],

        [`vi.${LanguageIdMap.collecting_nuts}`, `Tích hạt dẻ`],
        [`en.${LanguageIdMap.collecting_nuts}`, `Collecting points`],
        [`ko.${LanguageIdMap.collecting_nuts}`, `포인트 저축`],
        [`jp.${LanguageIdMap.collecting_nuts}`, `ポイントの貯め`],

        [`vi.${LanguageIdMap.collect_nut_suggest}`, `Hạt dẻ ơi, mi ở đâu? Đây là kho hạt dẻ khổng lồ mà nhiều người truy lùng đây! Khi vào đây, bạn sẽ thu thập được rất nhiều hạt dẻ và các chương trình khuyến mãi đặc sắc khác.`],
        [`en.${LanguageIdMap.collect_nut_suggest}`, `Where are you, points? This is a giant points' store that many people want to discover! When you are in here, you will find many points and the promotion's information.`],
        [`ko.${LanguageIdMap.collect_nut_suggest}`, `포인트는 어디에 저축 있습니까? MYPOP 사이트 나 응용 프로그램에 제공하려는 서비스를 이용하시면 많은 포인트를 모을 수 있습니다. 또한 프로모션 정보도 제공됩니다.`],
        [`jp.${LanguageIdMap.collect_nut_suggest}`, `ポイントはどこに貯められますか？MYPOPのサイトやアプリケーションにある提供先のサービスをご利用いただければ、多くのポイントを貯められます。さらに、プロモーションの情報も提供されます。`],

        [`vi.${LanguageIdMap.scan_qr_code}`, `Quét mã QR`],
        [`en.${LanguageIdMap.scan_qr_code}`, `Scan qr code`],
        [`ko.${LanguageIdMap.scan_qr_code}`, `QR 코드 스캔`],
        [`jp.${LanguageIdMap.scan_qr_code}`, `QRコードのスキャン`],

        [`vi.${LanguageIdMap.let_collect_nuts}`, `Tích hạt dẻ nào!`],
        [`en.${LanguageIdMap.let_collect_nuts}`, `Let's collect points!`],
        [`ko.${LanguageIdMap.let_collect_nuts}`, `포인트를 모아 보자!`],
        [`jp.${LanguageIdMap.let_collect_nuts}`, `ポイントを貯めましょう！`],

        [`vi.${LanguageIdMap.scan_collect_and_use_nut}`, `Chỉ cần quét qua mã QR của shop là tất cả được thực hiện ngay lập tức. Tích hạt dẻ,thanh toán hạt dẻ hay dùng combo hay voucher, tất cả trong 1 nốt nhạc!`],
        [`en.${LanguageIdMap.scan_collect_and_use_nut}`, `Scan QR CODE of that shop, you can collect points, pay by points, use combo or voucher, all in one.`],
        [`ko.${LanguageIdMap.scan_collect_and_use_nut}`, `MYPOP 파트너의 서비스를 사용 후 QR 코드를 스캔하면 포인트를 모을 수 포인트로 지불, 쿠폰 및 세트 등도 사용하실 수 있습니다. .`],
        [`jp.${LanguageIdMap.scan_collect_and_use_nut}`, `MYPOP提携先のサービスを使用した後、QRコードをスキャンするとポイントを貯められ、ポイントで支払え、クーポン券やセットなどもご使用になれます。。`],

        [`vi.${LanguageIdMap.using_nut}`, `Dùng hạt dẻ`],
        [`en.${LanguageIdMap.using_nut}`, `Using points`],
        [`ko.${LanguageIdMap.using_nut}`, `포인트 사용`],
        [`jp.${LanguageIdMap.using_nut}`, `ポイントの使い方`],

        [`vi.${LanguageIdMap.using_nut_des}`, `Hạt dẻ nhiều quá, dùng gì đây ta? Bạn tìm đúng chỗ rồi đấy, nơi đây là thiên đường "tiêu" hạt dẻ trên MYPOP. 1 hạt dẻ = 1,000 VND　`],
        [`en.${LanguageIdMap.using_nut_des}`, `I have so many points, what should I do? You find the right place, this is the paradise to use points in MYPOP. 1 point = 1,000 VND`],
        [`ko.${LanguageIdMap.using_nut_des}`, `많은 포인트를 모아했습니다. 어떻게해야하나요? MYPOP 포인트를 사용하는 낙원입니다. 1 포인트 = 1,000VND입니다.`],
        [`jp.${LanguageIdMap.using_nut_des}`, `沢山のポイントを貯めました。どうすればいいですか？ MYPOPでポイントを使用する楽園です。1ポイント＝1,000VNDです。`],

        [`vi.${LanguageIdMap.using_nut_more}`, `Bạn vẫn muốn nhiều hơn từ MYPOP? Hãy vào đây! Đây chính là nơi cất giữ "tài sản" của bạn, từ hạt dẻ, voucher, combo mà bạn đã nhận được,... Bạn cũng có thể lấy mã giới thiệu cho bạn bè ở đây để nhận được thật nhiều những phần quà thú vị.`],
        [`en.${LanguageIdMap.using_nut_more}`, `Would you like to have more about MYPOP? Let's check it! In your home, you can see your wallet, make friends, ect...`],
        [`ko.${LanguageIdMap.using_nut_more}`, `MYPOP에 대해 더 알고 싶어? 그것을 확인하자! 받은 쿠폰이나 세트 등을 보관하는 것입니다. 또한 친구에게 소개하면 많은 선물도받을 수 있습니다.`],
        [`jp.${LanguageIdMap.using_nut_more}`, `MYPOPについてもっと知りたいですか？それをチェックしよう！受け取ったクーポン券やセットなどを保管するものです。さらに、友達に紹介すれば、多くのギフトも受取れます。`],

        [`vi.${LanguageIdMap.switch_app_question}`, `Bạn đang sử dụng thiết bị di động. Bạn có muốn chuyển sang sử dụng ứng dụng MYPOP để có trải nghiệm tốt nhất?`],
        [`en.${LanguageIdMap.switch_app_question}`, `You are on mobile. Would you like to use MYPOP app for best experience?`],
        [`ko.${LanguageIdMap.switch_app_question}`, `당신이 휴대이다. 당신은 최고의 경험을 위해 MYPOP 응용 프로그램을 사용 하시겠습니까?`],
        [`jp.${LanguageIdMap.switch_app_question}`, `あなたは携帯である。あなたは最高の経験のためにMYPOPアプリを使いたいですか？`],

        [`vi.${LanguageIdMap.SHOPPING_ONLINE_ORDER_TYPE_PENDING}`, `Đang đợi`],
        [`en.${LanguageIdMap.SHOPPING_ONLINE_ORDER_TYPE_PENDING}`, `Pending`],
        [`ko.${LanguageIdMap.SHOPPING_ONLINE_ORDER_TYPE_PENDING}`, `보류`],
        [`jp.${LanguageIdMap.SHOPPING_ONLINE_ORDER_TYPE_PENDING}`, `保留中`],

        [`vi.${LanguageIdMap.SHOPPING_ONLINE_ORDER_TYPE_REJECT}`, `Đã hủy`],
        [`en.${LanguageIdMap.SHOPPING_ONLINE_ORDER_TYPE_REJECT}`, `Cancel order`],
        [`ko.${LanguageIdMap.SHOPPING_ONLINE_ORDER_TYPE_REJECT}`, `주문 취소`],
        [`jp.${LanguageIdMap.SHOPPING_ONLINE_ORDER_TYPE_REJECT}`, `注文のキャンセル`],

        [`vi.${LanguageIdMap.SHOPPING_ONLINE_ORDER_TYPE_ACCEPT}`, `Đã xác nhận`],
        [`en.${LanguageIdMap.SHOPPING_ONLINE_ORDER_TYPE_ACCEPT}`, `Confirm order`],
        [`ko.${LanguageIdMap.SHOPPING_ONLINE_ORDER_TYPE_ACCEPT}`, `주문 확인`],
        [`jp.${LanguageIdMap.SHOPPING_ONLINE_ORDER_TYPE_ACCEPT}`, `注文の確認`],

        [`vi.${LanguageIdMap.SHOPPING_ONLINE_ORDER_TYPE_SHIPPING_SUCCESS}`, `Đã giao hàng`],
        [`en.${LanguageIdMap.SHOPPING_ONLINE_ORDER_TYPE_SHIPPING_SUCCESS}`, `Shipped`],
        [`ko.${LanguageIdMap.SHOPPING_ONLINE_ORDER_TYPE_SHIPPING_SUCCESS}`, `발송 된`],
        [`jp.${LanguageIdMap.SHOPPING_ONLINE_ORDER_TYPE_SHIPPING_SUCCESS}`, `発送済み`],

        [`vi.${LanguageIdMap.SHOPPING_ONLINE_ORDER_TYPE_NOT_RECEIVE}`, `Không nhận hàng`],
        [`en.${LanguageIdMap.SHOPPING_ONLINE_ORDER_TYPE_NOT_RECEIVE}`, `Returned goods`],
        [`ko.${LanguageIdMap.SHOPPING_ONLINE_ORDER_TYPE_NOT_RECEIVE}`, `반품`],
        [`jp.${LanguageIdMap.SHOPPING_ONLINE_ORDER_TYPE_NOT_RECEIVE}`, `返品`],

        [`vi.${LanguageIdMap.BACK}`, `Trở về`],
        [`en.${LanguageIdMap.BACK}`, `Back`],
        [`ko.${LanguageIdMap.BACK}`, `돌아 가기`],
        [`jp.${LanguageIdMap.BACK}`, `戻る`],

        [`vi.${LanguageIdMap.EARN_POINT_TITLE}`, `Tích`],
        [`en.${LanguageIdMap.EARN_POINT_TITLE}`, `Collect`],
        [`ko.${LanguageIdMap.EARN_POINT_TITLE}`, `포인트 적립`],
        [`jp.${LanguageIdMap.EARN_POINT_TITLE}`, `ポイント貯める`],

        [`vi.${LanguageIdMap.USE_POINT_TITLE}`, `Tiêu`],
        [`en.${LanguageIdMap.USE_POINT_TITLE}`, `Redeem`],
        [`ko.${LanguageIdMap.USE_POINT_TITLE}`, `포인트 사용`],
        [`jp.${LanguageIdMap.USE_POINT_TITLE}`, `ポイント使う`],


        [`vi.${LanguageIdMap.TYPE_OF_TRIP_BROWSE_ALL}`, `Tất cả`],
        [`vi.${LanguageIdMap.CATEGORY_FILTER.TYPE_OF_TRIP.id}`, `Loại tour`],
        [`vi.${LanguageIdMap.CATEGORY_FILTER.DURATION.id}`, `Thời gian`],
        [`vi.${LanguageIdMap.CATEGORY_FILTER.PRICE.id}`, `Giá`],
        [`vi.${LanguageIdMap.CATEGORY_FILTER.SERVICE.id}`, `Dịch vụ`],
        [`vi.${LanguageIdMap.CATEGORY_FILTER.SORT.id}`, `Sắp xếp`],

        [`vi.${LanguageIdMap.URL.PROFILE.MY_ACCOUNT}`, `Tài khoản`],
        [`vi.${LanguageIdMap.URL.PROFILE.BOOKING}`, `Đơn hàng`],
        [`vi.${LanguageIdMap.URL.PROFILE.WISH_LIST}`, `Yêu thích`],
        [`vi.${LanguageIdMap.URL.PROFILE.SETTING}`, `Cài đặt`],
        [`vi.${LanguageIdMap.URL.PROFILE.CREDIT}`, `Tiền thưởng du lịch`],
        [`vi.${LanguageIdMap.URL.PROFILE.INVITE}`, `Mời bạn bè`],

        [`vi.${LanguageIdMap.SEARCH_BY_DESTINATION_ACTIVITY}`, `Bạn muốn đi đến đâu?`],
        [`vi.${LanguageIdMap.SEARCH_BY_DESTINATION_ACTIVITY_TOUR}`, `Chọn điểm đến, hoạt động du lịch, tour trọn gói`],
        [`vi.${LanguageIdMap.TOP_DESTINATION}`, `Điểm đến nổi bật`],
        [`vi.${LanguageIdMap.EXPLORE_ALL_DESTINATION}`, `Khám phá tất cả các điểm đến `],
        [`vi.${LanguageIdMap.TYPE_OF_TRIPS}`, `Loại tour`],
        [`vi.${LanguageIdMap.DISCOVER_YOUR_WORLD}`, `Discover your world`],

        [`vi.${LanguageIdMap.CHOOSE_BY_LOCAL_EXPERT}`, `Tư vấn bởi các chuyên gia du lịch Việt Nam`],
        [`vi.${LanguageIdMap.ALWAY_COMPETITIVE_PRICE}`, `Giá luôn tốt nhất`],
        [`vi.${LanguageIdMap.FAST_EASY_BOOKING}`, `Tiện lợi, nhận vé nhanh`],
        [`vi.${LanguageIdMap.WHY_PHUOTVIVU}`, `Tại sao chọn Phuotvivu?`],
        [`vi.${LanguageIdMap.BEST_PRICE}`, `Giá tốt nhất`],
        [`vi.${LanguageIdMap.BEST_QUALITY}`, `Chất lượng tốt nhất`],
        [`vi.${LanguageIdMap.EASY_BOOKING}`, `Đặt vé dễ dàng`],
        [`vi.${LanguageIdMap.HIGH_LIGHT}`, `Điểm nổi bật`],
        [`vi.${LanguageIdMap.WHAT_TO_EXPECT}`, `Bạn được trải nghiệm gì?`],
        [`vi.${LanguageIdMap.ACT_INFO}`, `Thông tin dịch vụ`],
        [`vi.${LanguageIdMap.HOW_TO_USE}`, `Hướng dẫn sử dụng`],
        [`vi.${LanguageIdMap.DAY}`, `Ngày`],
        [`vi.${LanguageIdMap.HOUR}`, `Giờ`],

        [`vi.${LanguageIdMap.FAQ_DESC}`, `FAQ - Hỏi đáp dịch vụ`],
        [`vi.${LanguageIdMap.FAQ}`, `FAQ`],
        [`vi.${LanguageIdMap.CANCEL_POLICY}`, `Chính sách huỷ`],
        [`vi.${LanguageIdMap.CANCEL_POLICY_DESC}`, `Huỷ trước {{day}} {{DAY}} {{hour}} {{HOUR}}: hoàn tiền  {{percent}}%`],
        [`vi.${LanguageIdMap.CANCEL_POLICY_CANNOT_CANCEL}`, `Vé đã mua sẽ không được huỷ dưới bất kỳ hình thức nào.`],
        [`vi.${LanguageIdMap.PACKAGE_OPTIONS}`, `Các gói dịch vụ`],
        [`vi.${LanguageIdMap.CHECKING_SERVICE_STATUS}`, `Chọn ngày đi`],
        [`vi.${LanguageIdMap.SERVICE_PACKAGE_DETAIL}`, `Chi tiết gói dịch vụ`],
        [`vi.${LanguageIdMap.TOTAL_PRICE}`, `Tổng cộng`],
        [`vi.${LanguageIdMap.SELECT_DATE}`, `Chọn ngày`],
        [`vi.${LanguageIdMap.PACKAGE_QUANTITY}`, `Số lượng gói dịch vụ`],
        [`vi.${LanguageIdMap.SELECT_TIME}`, `Chọn thời gian`],
        [`vi.${LanguageIdMap.ACCEPT}`, `Đồng ý`],
        [`vi.${LanguageIdMap.PRICE_BREAKDOWN}`, `Giá chi tiết`],
        [`vi.${LanguageIdMap.ADD_TO_CART}`, `Thêm vào giỏ hàng`],
        [`vi.${LanguageIdMap.BOOK_NOW}`, `Đặt ngay`],
        [`vi.${LanguageIdMap.SUBSCRIBE}`, `Đăng ký`],
        [`vi.${LanguageIdMap.SUBSCRIBED}`, `Đã đăng ký`],
        [`vi.${LanguageIdMap.SUBSCRIBING}`, `Đang đăng ký`],
        [`vi.${LanguageIdMap.LOOKING_FOR_INSPIRATION}`, `Bạn đang tìm cảm hứng xê dịch?`],
        [`vi.${LanguageIdMap.SUBSCRIBE_DES_TEXT}`, `Hãy đăng ký săn ưu đãi hot nhất & các bài hướng dẫn du lịch`],
        [`vi.${LanguageIdMap.CHOOSE_PRICE}`, `Chọn giá`],
        [`vi.${LanguageIdMap.CHOOSE_ALL}`, `Chọn tất cả`],
        [`vi.${LanguageIdMap.RELATIVE_PRODUCT}`, `Các tour liên quan`],
        [`vi.${LanguageIdMap.INFORMATION_REQUEST_BY_TOUR_OPERATOR}`, `Thông tin yêu cầu`],
        [`vi.${LanguageIdMap.STEP_WITH_NUMBER}`, `Bước {{number}}`],

        [`vi.${LanguageIdMap.PRODUCT_SUPPLIER_INFO_TITLE_META}`, `Thông tin người đi tour`],
        [`vi.${LanguageIdMap.PRODUCT_SUPPLIER_INFO_DES_META}`, `Nhập thông tin người đi tour`],

        [`vi.${LanguageIdMap.PRODUCT_SUPPLIER_INFO_TYPE.LIST.id}`, `List`],
        [`vi.${LanguageIdMap.PRODUCT_SUPPLIER_INFO_TYPE.CHECKBOX.id}`, `Checkbox`],
        [`vi.${LanguageIdMap.PRODUCT_SUPPLIER_INFO_TYPE.TEXT.id}`, `Text`],
        [`vi.${LanguageIdMap.PRODUCT_SUPPLIER_INFO_TYPE.MULTI_LINE_TEXT.id}`, `Multi-line Text`],
        [`vi.${LanguageIdMap.PRODUCT_SUPPLIER_INFO_TYPE.RADIO_BUTTON.id}`, `Radio Button`],
        [`vi.${LanguageIdMap.PRODUCT_SUPPLIER_INFO_TYPE.SPECIFIED_DATE.id}`, `Specify Date`],

        [`vi.${LanguageIdMap.PRODUCT_SUPPLIER_INFO_DISPLAY_FOR.DISPLAY_FOR_USER.id}`, `Ask one each Participant`],
        [`vi.${LanguageIdMap.PRODUCT_SUPPLIER_INFO_DISPLAY_FOR.DISPLAY_FOR_ORDER.id}`, `Ask one each order`],

        [`vi.${LanguageIdMap.SCHEDULE_PRICE_TYPE_LIST.BY_PERSON.id}`, `By Person`],
        [`vi.${LanguageIdMap.SCHEDULE_PRICE_TYPE_LIST.BY_ITEM.id}`, `By Item`],

        [`vi.${LanguageIdMap.GUEST}`, `Khách`],
        [`vi.${LanguageIdMap.SHOPPING_CART}`, `Giỏ hàng`],
        [`vi.${LanguageIdMap.ADDED_TO_SHOPPING_CART}`, `Đã thêm vào giỏ hàng!`],
        [`vi.${LanguageIdMap.UNIT}`, `Đơn vị`],
        [`vi.${LanguageIdMap.VIEWMORE}`, `Xem thêm`],
        [`vi.${LanguageIdMap.MORE}`, `Thêm`],
        [`vi.${LanguageIdMap.VIEWALL}`, `Xem toàn bộ`],
        [`vi.${LanguageIdMap.VIEWLESS}`, `Thu gọn`],

        [`vi.${LanguageIdMap.HOME_BANNER_TITLE}`, `Du lịch tự túc với Phuotvivu!`],
        [`vi.${LanguageIdMap.HOME_BANNER_DES_LINE_1}`, `Phuotvivu cung cấp tour du lịch bụi dài ngày, ngắn ngày,`],
        [`vi.${LanguageIdMap.HOME_BANNER_DES_LINE_2}`, `vé tham quan tới các điểm đến ở Châu Á, Châu Âu cho khách du lịch tự túc.`],

        [`vi.${LanguageIdMap.DATE}`, `Ngày`],
        [`vi.${LanguageIdMap.CART_IS_EMPTY}`, `Giỏ hàng trống`],
        [`vi.${LanguageIdMap.ITEMS}`, `{{item}} món`],
        [`vi.${LanguageIdMap.VIEW_CART}`, `Xem giỏ hàng`],
        [`vi.${LanguageIdMap.ATTRACTIVE_IN_CATEGORY}`, `Các hoạt động du lịch đặc sắc ở {{category}}`],
        [`vi.${LanguageIdMap.NO_TOUR_AVAILABLE}`, `Không có tour phù hợp`],
        [`vi.${LanguageIdMap.DESTINATION_IN_CATEGORY}`, `Điểm đến tại {{category}}`],
        [`vi.${LanguageIdMap.TOP_ATTRACTION_IN_CATEGORY}`, `Hấp dẫn hàng đầu tại {{category}}`],
        [`vi.${LanguageIdMap.TRAVELING_IN_CATEGORY}`, `Du lịch {{category}}`],
        [`vi.${LanguageIdMap.ONTDEK_MEER}`, `Khám phá thêm`],
        [`vi.${LanguageIdMap.REGISTER_SUCCESS}`, `Đăng ký thành công`],
        [`vi.${LanguageIdMap.CHECK_EMAIL_TO_CHANGE_PASSWORD}`, `Email đã được gởi đến địa chỉ {{email}}. Vui lòng làm theo hướng dẫn để đổi mật khẩu`],
        [`vi.${LanguageIdMap.RESET_PASSWORD}`, `Thay đổi mật khẩu`],
        [`vi.${LanguageIdMap.SERVICE_INFORMATION}`, `Thông tin dịch vụ`],
        [`vi.${LanguageIdMap.AMOUNT}`, `Số lượng`],
        [`vi.${LanguageIdMap.MONEY_TOTAL}`, `Tổng tiền`],
        [`vi.${LanguageIdMap.LOCAL_TIME}`, `Giờ địa phương`],
        [`vi.${LanguageIdMap.CONFIRM}`, `Xác nhận`],
        [`vi.${LanguageIdMap.DELETE_CONFIRM_NO_NAME}`, `Bạn có muốn xóa?`],
        [`vi.${LanguageIdMap.DELETE_CONFIRM}`, `Bạn có muốn xóa {{name}}`],
        [`vi.${LanguageIdMap.CANCEL_CONFIRM_NO_NAME}`, `Bạn có muốn hủy?`],
        [`vi.${LanguageIdMap.DELETE_SERVICE_CHECKED}`, `Xoá dịch vụ đã chọn`],
        [`vi.${LanguageIdMap.TOTAL_SERVICE}`, `Tổng các dịch vụ`],
        [`vi.${LanguageIdMap.PAY_NOW}`, `Thanh toán ngay`],
        [`vi.${LanguageIdMap.DEAL_OFF_TO_60_PERCENT_WILL_SEND_TO_YOUR_EMAIL}`, `Các deal du lịch giảm giá đến 60% sẽ được gửi đến inbox của bạn`],
        [`vi.${LanguageIdMap.TITLE_MR_MRS}`, `Danh xưng`],
        [`vi.${LanguageIdMap.TITLE_MR_MRS_LIST.MR.id}`, `Ông`],
        [`vi.${LanguageIdMap.TITLE_MR_MRS_LIST.MRS.id}`, `Bà`],
        [`vi.${LanguageIdMap.TITLE_MR_MRS_LIST.MISS.id}`, `Chị`],
        [`vi.${LanguageIdMap.PHONE_NUMBER}`, `Số điện thoại`],
        [`vi.${LanguageIdMap.FIRST_NAME_ON_PASSPORT}`, `Tên (trên hộ chiếu)`],
        [`vi.${LanguageIdMap.LAST_NAME_ON_PASSPORT}`, `Họ (trên hộ chiếu)`],
        [`vi.${LanguageIdMap.EMAIL_ADDRESS}`, `Địa chỉ email`],
        [`vi.${LanguageIdMap.YOUR_VOUCHER_RECEIVE_HERE_MAKE_SURE_CORRECT}`, `Voucher của bạn sẽ được gửi vào đây, xin vui lòng kiểm tra kỹ`],
        [`vi.${LanguageIdMap.DETAIL}`, `Chi tiết`],
        [`vi.${LanguageIdMap.BOOKING_USER_INFORMATION}`, `Thông tin của người đặt`],
        [`vi.${LanguageIdMap.PAYMENT}`, `Thanh toán`],
        [`vi.${LanguageIdMap.PAYMESS_SUCCESS}`, `Thanh toán thành công`],
        [`vi.${LanguageIdMap.PAYMESS_NOT_SUCCESS}`, `Thanh toán không thành công`],
        [`vi.${LanguageIdMap.PAYMESS_SUCCESS_THANK_YOU}`, `Cảm ơn bạn đã lựa chọn chúng tôi.`],
        [`vi.${LanguageIdMap.BACK_TO_HOME_PAGE}`, `Trở về trang chủ.`],
        [`vi.${LanguageIdMap.PAYMENT_CART_TYPE}`, `Loại thẻ thanh toán`],
        [`vi.${LanguageIdMap.CARD_HOLDER_EMAIL}`, `Email chủ thẻ`],
        [`vi.${LanguageIdMap.CARD_HOLDER_PHONE}`, `Số điện thoại chủ thẻ`],
        [`vi.${LanguageIdMap.INSTALLMENT}`, `Trả góp`],
        [`vi.${LanguageIdMap.INSTALLMENT_DES}`, `Áp dụng cho đơn hàng trên 2 triệu (có 2 đơn vị chấp nhận trả góp), trên 3 triệu (có 18 ngân hàng chấp nhận trả góp), phí trả góp áp dụng cho khách hàng.`],

        [`vi.${LanguageIdMap.NEED_INPUT_DATA}`, `Vui lòng nhập thông tin {{data}}`],
        [`vi.${LanguageIdMap.CHOOSE_BANK}`, `Chọn ngân hàng`],

        [`vi.${LanguageIdMap.PACKAGE_NAME}`, `Tên gói dịch vụ`],
        [`vi.${LanguageIdMap.MINIMUM_CHOOSE_VALUE}`, `Chỉ được chọn tối thiểu {{value}} `],
        [`vi.${LanguageIdMap.MAXIMUM_CHOOSE_VALUE}`, `Chỉ được chọn tối đa {{value}}`],

        [`vi.${LanguageIdMap.SORT_PRODUCT_FILTER.sortViewCountDesc.id}`, `Lượt xem nhiều nhất`],
        [`vi.${LanguageIdMap.SORT_PRODUCT_FILTER.sortPriceAsc.id}`, `Giá (Thấp đến cao)`],
        [`vi.${LanguageIdMap.SORT_PRODUCT_FILTER.sortNewestDesc.id}`, `Mới nhất`],

        [`vi.${LanguageIdMap.HOME}`, `Trang chủ`],
        [`vi.${LanguageIdMap.ABOUT_NAME}`, `Về {{name}}`],
        [`vi.${LanguageIdMap.ABOUT_US}`, `Về chúng tôi`],
        [`vi.${LanguageIdMap.TODAY_UNTIL_TIME}`, `Làm việc đến {{time}}`],
        [`vi.${LanguageIdMap.SUPPORT}`, `Hỗ trợ`],
        [`vi.${LanguageIdMap.CUSTOMER_SUPPORT}`, `Hỗ trợ khách hàng`],
        [`vi.${LanguageIdMap.SUPPORT_247}`, `Hỗ trợ 24/7`],
        [`vi.${LanguageIdMap.TERM_OF_USE}`, `Điều khoản sử dụng`],
        [`vi.${LanguageIdMap.TERM_AND_CONDITIONS}`, `Điều khoản sử dụng`],
        [`vi.${LanguageIdMap.PRIVACY_POLICY}`, `Quyền riêng tư`],
        [`vi.${LanguageIdMap.PAYMENT_METHOD}`, `Phương thức thanh toán`],
        [`vi.${LanguageIdMap.SUPPORT_TIME_WEEKDAY_DES}`, `8:00 - 18:00 (Thứ 2 - Thứ 6)`],
        [`vi.${LanguageIdMap.SUPPORT_TIME_WEEKEND_DES}`, `8:00 - 12:00 (Sáng thứ 7)`],

        [`vi.${LanguageIdMap.TOUR}`, `Tour`],
        [`vi.${LanguageIdMap.OTHER_ATTRACTION_IN_NAME}`, `Các hoạt động du lịch đặc sắc khác ở {{name}}`],
        [`vi.${LanguageIdMap.CLICK_PAYNOW_NOTIFICATION}`, `Khi bạn nhấn thanh toán ngay, bạn đã hiểu và đồng ý các {{read1}} của Phuotvivu.`],

        [`vi.${LanguageIdMap.MONTH}`, `Tháng`],
        [`vi.${LanguageIdMap.AMOUNT_FEE}`, `Tổng phí`],
        [`vi.${LanguageIdMap.AMOUNT_BY_MONTH}`, `Tiền thanh toán theo tháng`],
        [`vi.${LanguageIdMap.AMOUNT_FINAL}`, `Tổng tiền phải trả`],
        [`vi.${LanguageIdMap.SELECT}`, `Chọn`],

        [`vi.${LanguageIdMap.BOOKING_CODE}`, `Mã đặt chỗ`],
        [`vi.${LanguageIdMap.BOOKING_DATE}`, `Ngày đặt chỗ`],
        [`vi.${LanguageIdMap.PAID}`, `Đã thanh toán`],
        [`vi.${LanguageIdMap.UNPAID}`, `Chưa thanh toán`],
        [`vi.${LanguageIdMap.PARTICIPATION_DATE}`, `Ngày tham gia`],
        [`vi.${LanguageIdMap.CONFIRMED}`, `Đã xác nhận`],
        [`vi.${LanguageIdMap.COMMON_QUESTIONS}`, `Câu hỏi thường gặp`],
        [`vi.${LanguageIdMap.SERVICE_NOT_SUPPORT_PLEASE_BOOK_AGAIN}`, `Dịch vụ không hỗ trợ, vui lòng đặt lại`],
        [`vi.${LanguageIdMap.CANCELED}`, `Đã hủy`],

        [`vi.${LanguageIdMap.ORDER_PLACED}`, `Đã đặt hàng`],
        [`vi.${LanguageIdMap.PAYMENT_SUCCESSFUL}`, `Thanh toán thành công`],
        [`vi.${LanguageIdMap.ORDER_CONFIRMED}`, `Xác nhận đặt hàng`],
        [`vi.${LanguageIdMap.START_ACTIVITY}`, `Bắt đầu hoạt động`],
        [`vi.${LanguageIdMap.ACTIVITY_BOOKED}`, `Hoạt động đã được đặt`],

        [`vi.${LanguageIdMap.BOOKING_DETAILS}`, `Chi tiết đặt hàng`],
        [`vi.${LanguageIdMap.GET_VOUCHER}`, `Lấy voucher`],

        [`vi.${LanguageIdMap.TRAVEL_GUIDE}`, `Cẩm nang du lịch | Ebook `],
        [`vi.${LanguageIdMap.BLOG}`, `Phượt Blog`],
        [`vi.${LanguageIdMap.DESTINATION_GUIDE}`, `Kinh nghiệm du lịch`],
        [`vi.${LanguageIdMap.EBOOK}`, `Ebook`],
        [`vi.${LanguageIdMap.CONTINUE}`, `Tiếp tục`],
        [`vi.${LanguageIdMap.CANCEL_TOUR}`, `Hủy tour`],
        [`vi.${LanguageIdMap.TOUR_AND_TICKET}`, `Tours & Vé tham quan`],

        [`vi.${LanguageIdMap.WHOOPS}`, `Whoops!`],
        [`vi.${LanguageIdMap.PAGE_NOT_EXISTS}`, `Trang bạn yêu cầu không tồn tại`],
        [`vi.${LanguageIdMap.NEED_HELP}`, `Bạn cần trợ giúp?`],
        [`vi.${LanguageIdMap.PROFESSOR_WILLING_TO_SUPPORT}`, `Các chuyên gia du lịch của Phuotvivu luôn sẵn sàng hỗ trợ`],
        [`vi.${LanguageIdMap.SEND_US_AN_EMAIL}`, `Gửi email đến chúng tôi`],
        [`vi.${LanguageIdMap.CONTENT}`, `Nội dung`],
        [`vi.${LanguageIdMap.EMAIL}`, `Email`],

        [`vi.${LanguageIdMap.ASK_ON_FACEBOOK}`, `Đặt câu hỏi qua Facebook`],
        [`vi.${LanguageIdMap.VIA_FACEBOOK_MESSENGER}`, `Qua Facebook Messenger`],
        [`vi.${LanguageIdMap.CONTACT_BY_TELEPHONE}`, `Liên hệ qua điện thoại`],
        [`vi.${LanguageIdMap.CONTACT_BY_EMAIL}`, `Qua Facebook Email`],
        [`vi.${LanguageIdMap.HOTLINE}`, `Hotline`],
        [`vi.${LanguageIdMap.HELP_CENTER}`, `Trung tâm hỗ trợ`],

        [`vi.${LanguageIdMap.IB_ONLINE}`, `Chuyển khoản ngân hàng`],
        [`vi.${LanguageIdMap.IB_ONLINE_STEP1_DESC}`, `{{transfer_exactly_money}} trong đơn hàng và ghi thông tin chuyển khoản là {{order_number}} của bạn.`],
        [`vi.${LanguageIdMap.TRANSFER_EXACTLY_MONEY}`, `Chuyển đúng số tiền`],
        [`vi.${LanguageIdMap.ORDER_NUMBER}`, `số đơn hàng`],
        [`vi.${LanguageIdMap.WAITING_FOR_CONFIRMATION}`, `Chờ xác nhận`],
        [`vi.${LanguageIdMap.IB_ONLINE_STEP2_DESC}`, `Bạn sẽ nhận được voucher ngay khi Phuotvivu xác nhận chuyển khoản và đơn hàng thành công.`],
        [`vi.${LanguageIdMap.TRANSFER_INFORMATION}`, `Thông tin chuyển khoản`],
        [`vi.${LanguageIdMap.AMOUNT_MONEY_TO_TRANSFER}`, `Số tiền cần chuyển`],
        [`vi.${LanguageIdMap.ORDER_CODE}`, `Mã đơn hàng`],
        [`vi.${LanguageIdMap.PAYMENT_GUIDE}`, `Hướng dẫn thanh toán`],
        [`vi.${LanguageIdMap.PAYMENT_GUIDE_DESC}`, `Chuyển khoản đúng số tiền của đơn hàng (nên chuyển cùng ngân hàng). Ghi {{order_code}} ở thông tin chuyển khoản. Đơn hàng sẽ không được xử lý cho đến khi Phuotvivu nhận số tiền chuyển khoản của bạn. `],
        [`vi.${LanguageIdMap.PAYMENT_PROCESSING_IN_WORKING_TIME}`, `*Chuyển khoản ngân hàng sẽ được xử lý trong giờ làm việc`],
        [`vi.${LanguageIdMap.NEED_SUPPORT_FROM_US}`, `Cần hỗ trợ từ Phuotvivu?`],
        [`vi.${LanguageIdMap.ACCOUNT_HOLDER}`, `Chủ tài khoản`],
        [`vi.${LanguageIdMap.ACCOUNT_NUMBER}`, `Số tài khoản`],

        [`vi.${LanguageIdMap.QA_PHUOTVIVU}`, `Hỏi đáp Phuotvivu`],
        [`vi.${LanguageIdMap.USE_DISCOUNT_CODE}`, `Dùng mã ưu đãi`],
        [`vi.${LanguageIdMap.USE}`, `Sử dụng`],
        [`vi.${LanguageIdMap.INPUT_DISCOUNT_CODE}`, `Nhập mã ưu đãi`],
        [`vi.${LanguageIdMap.PLEASE_INPUT_DISCOUNT_CODE}`, `Vui lòng nhập mã ưu đãi`],
        [`vi.${LanguageIdMap.TOTAL_PAY}`, `Số tiền thanh toán`],

        [`vi.${LanguageIdMap.COPY_LINK}`, `Sao chép link`],

        [`vi.${LanguageIdMap.APPLY_AMOUNT_CREDIT}`, `Áp dụng {{number}} tiền thưởng du lịch`],
        [`vi.${LanguageIdMap.HOW_TO_USE_CREDIT}`, `how to earn credit`],
        [`vi.${LanguageIdMap.DISCOUNT}`, `Giảm giá`],


        [`vi.${LanguageIdMap.ORDER_STATUS.REQUEST_CANCEL.id}`, `Yêu cầu hủy`],
        [`vi.${LanguageIdMap.ORDER_STATUS.ACCEPT_CANCEL.id}`, `Đã hủy`],
        [`vi.${LanguageIdMap.ORDER_STATUS.REJECT_CANCEL.id}`, `Yêu cầu hủy bị từ chối`],
        [`vi.${LanguageIdMap.ORDER_STATUS.NORMAL.id}`, `Đang xử lý`],


        ////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////

        [`vi.${LanguageIdMap.add}`, `cộng`],
        [`en.${LanguageIdMap.add}`, `add`],
        [`ko.${LanguageIdMap.add}`, `추가`],
        [`jp.${LanguageIdMap.add}`, `追加する`],

        [`vi.${LanguageIdMap.and}`, `và`],
        [`en.${LanguageIdMap.and}`, `and`],
        [`ko.${LanguageIdMap.and}`, `하면`],
        [`jp.${LanguageIdMap.and}`, `と`],

        [`vi.${LanguageIdMap.appName}`, `MYPOP`],
        [`en.${LanguageIdMap.appName}`, `MYPOP`],
        [`ko.${LanguageIdMap.appName}`, `MYPOP`],
        [`jp.${LanguageIdMap.appName}`, `MYPOP`],

        [`vi.${LanguageIdMap.are_u_sure}`, `Bạn có chắc muốn thực hiện thao tác này?`],
        [`en.${LanguageIdMap.are_u_sure}`, `Are you sure?`],
        [`ko.${LanguageIdMap.are_u_sure}`, `이 작업을 실행 하시겠습니까.`],
        [`jp.${LanguageIdMap.are_u_sure}`, `この操作を実行してもよろしいですか。`],

        [`vi.${LanguageIdMap.area}`, `Khoảng cách`],
        [`en.${LanguageIdMap.area}`, `Distance`],
        [`ko.${LanguageIdMap.area}`, `거리`],
        [`jp.${LanguageIdMap.area}`, `距離`],

        [`vi.${LanguageIdMap.best_deal_near_u}`, `Khuyến Mãi Gần Bạn`],
        [`en.${LanguageIdMap.best_deal_near_u}`, `Best Deal Around You`],
        [`ko.${LanguageIdMap.best_deal_near_u}`, `주위 캠페인`],
        [`jp.${LanguageIdMap.best_deal_near_u}`, `周りのキャンペーン`],

        [`vi.${LanguageIdMap.btnAddPhoto}`, `Thêm ảnh`],
        [`en.${LanguageIdMap.btnAddPhoto}`, `Add photo`],
        [`ko.${LanguageIdMap.btnAddPhoto}`, `사진`],
        [`jp.${LanguageIdMap.btnAddPhoto}`, `写真を追加する`],

        [`vi.${LanguageIdMap.btnAdvanceFilter}`, `Lọc nâng cao`],
        [`en.${LanguageIdMap.btnAdvanceFilter}`, `Advanced Filter`],
        [`ko.${LanguageIdMap.btnAdvanceFilter}`, `고급 필터`],
        [`jp.${LanguageIdMap.btnAdvanceFilter}`, `高度なフィルタ`],

        [`vi.${LanguageIdMap.btnAll}`, `Tất cả`],
        [`en.${LanguageIdMap.btnAll}`, `All`],
        [`ko.${LanguageIdMap.btnAll}`, `모든`],
        [`jp.${LanguageIdMap.btnAll}`, `すべて`],

        [`vi.${LanguageIdMap.btnBuyNut}`, `Mua bằng hạt dẻ`],
        [`en.${LanguageIdMap.btnBuyNut}`, `Buy with points`],
        [`ko.${LanguageIdMap.btnBuyNut}`, `모은 포인트를 사용하여 쇼핑`],
        [`jp.${LanguageIdMap.btnBuyNut}`, `貯めたポイントを使ってお買い物`],

        [`vi.${LanguageIdMap.btnBuyStar}`, `Đăng ký bằng Star`],
        [`en.${LanguageIdMap.btnBuyStar}`, `Register with Star`],
        [`ko.${LanguageIdMap.btnBuyStar}`, `스타에 등록`],
        [`jp.${LanguageIdMap.btnBuyStar}`, `スターに登録`],

        [`vi.${LanguageIdMap.btnCancel}`, `Hủy`],
        [`en.${LanguageIdMap.btnCancel}`, `Cancel`],
        [`ko.${LanguageIdMap.btnCancel}`, `취소`],
        [`jp.${LanguageIdMap.btnCancel}`, `取消`],

        [`vi.${LanguageIdMap.btnCancelPayment}`, `Hủy Giao Dịch`],
        [`en.${LanguageIdMap.btnCancelPayment}`, `Cancel Transaction`],
        [`ko.${LanguageIdMap.btnCancelPayment}`, `취소`],
        [`jp.${LanguageIdMap.btnCancelPayment}`, `取消`],

        [`vi.${LanguageIdMap.btnChange}`, `Thay Đổi`],
        [`en.${LanguageIdMap.btnChange}`, `Change`],
        [`ko.${LanguageIdMap.btnChange}`, `변경`],
        [`jp.${LanguageIdMap.btnChange}`, `変更`],

        [`vi.${LanguageIdMap.btnClose}`, `Đóng`],
        [`en.${LanguageIdMap.btnClose}`, `Close`],
        [`ko.${LanguageIdMap.btnClose}`, `닫기`],
        [`jp.${LanguageIdMap.btnClose}`, `閉じる`],

        [`vi.${LanguageIdMap.btnDeAll}`, `Bỏ chọn`],
        [`en.${LanguageIdMap.btnDeAll}`, `Deselect All`],
        [`ko.${LanguageIdMap.btnDeAll}`, `선택 해제`],
        [`jp.${LanguageIdMap.btnDeAll}`, `選択解除`],

        [`vi.${LanguageIdMap.btnDirect}`, `Chỉ đường`],
        [`en.${LanguageIdMap.btnDirect}`, `Direction`],
        [`ko.${LanguageIdMap.btnDirect}`, `오시는 길`],
        [`jp.${LanguageIdMap.btnDirect}`, `地図`],

        [`vi.${LanguageIdMap.btnDone}`, `Xong`],
        [`en.${LanguageIdMap.btnDone}`, `Done`],
        [`ko.${LanguageIdMap.btnDone}`, `완료`],
        [`jp.${LanguageIdMap.btnDone}`, `完了`],

        [`vi.${LanguageIdMap.btnEdit}`, `Chỉnh Sửa`],
        [`en.${LanguageIdMap.btnEdit}`, `Edit`],
        [`ko.${LanguageIdMap.btnEdit}`, `편집`],
        [`jp.${LanguageIdMap.btnEdit}`, `編集`],

        [`vi.${LanguageIdMap.btnFilter}`, `Lọc`],
        [`en.${LanguageIdMap.btnFilter}`, `Filter`],
        [`ko.${LanguageIdMap.btnFilter}`, `필터`],
        [`jp.${LanguageIdMap.btnFilter}`, `フィルタ`],

        [`vi.${LanguageIdMap.btnForgetPassword}`, `Quên Mật Khẩu`],
        [`en.${LanguageIdMap.btnForgetPassword}`, `Forget Password`],
        [`ko.${LanguageIdMap.btnForgetPassword}`, `비밀번호를 잊어 버렸습니다.`],
        [`jp.${LanguageIdMap.btnForgetPassword}`, `パスワードを忘れました。`],

        [`vi.${LanguageIdMap.btnGallery}`, `Hình Ảnh`],
        [`en.${LanguageIdMap.btnGallery}`, `Gallery`],
        [`ko.${LanguageIdMap.btnGallery}`, `갤러리`],
        [`jp.${LanguageIdMap.btnGallery}`, `ギャラリー`],

        [`vi.${LanguageIdMap.btnGo}`, `Cập Nhật`],
        [`en.${LanguageIdMap.btnGo}`, `Updated!`],
        [`ko.${LanguageIdMap.btnGo}`, `업데이트`],
        [`jp.${LanguageIdMap.btnGo}`, `更新`],

        [`vi.${LanguageIdMap.btnLess}`, `Thu gọn`],
        [`en.${LanguageIdMap.btnLess}`, `Less`],
        [`ko.${LanguageIdMap.btnLess}`, `단축`],
        [`jp.${LanguageIdMap.btnLess}`, `短縮`],

        [`vi.${LanguageIdMap.btnLogin}`, `Đăng Nhập`],
        [`en.${LanguageIdMap.btnLogin}`, `Login`],
        [`ko.${LanguageIdMap.btnLogin}`, `로그인`],
        [`jp.${LanguageIdMap.btnLogin}`, `ログイン`],

        [`vi.${LanguageIdMap.btnLoginFacebook}`, `Đăng nhập bằng Facebook`],
        [`en.${LanguageIdMap.btnLoginFacebook}`, `Login with Facebook`],
        [`ko.${LanguageIdMap.btnLoginFacebook}`, `Facebook 로그인`],
        [`jp.${LanguageIdMap.btnLoginFacebook}`, `Facebookでログイン`],

        [`vi.${LanguageIdMap.btnLogout}`, `Đăng xuất`],
        [`en.${LanguageIdMap.btnLogout}`, `Logout`],
        [`ko.${LanguageIdMap.btnLogout}`, `로그 아웃`],
        [`jp.${LanguageIdMap.btnLogout}`, `ログアウト`],

        [`vi.${LanguageIdMap.btnMarkAllAsRead}`, `Đánh dấu tất cả đã đọc`],
        [`en.${LanguageIdMap.btnMarkAllAsRead}`, `Mark all as read`],
        [`ko.${LanguageIdMap.btnMarkAllAsRead}`, `모든 읽은 상태로 표시`],
        [`jp.${LanguageIdMap.btnMarkAllAsRead}`, `すべて既読にする`],

        [`vi.${LanguageIdMap.btnOpenSetting}`, `Mở Cài Đặt`],
        [`en.${LanguageIdMap.btnOpenSetting}`, `Open Setting`],
        [`ko.${LanguageIdMap.btnOpenSetting}`, `열기 설정`],
        [`jp.${LanguageIdMap.btnOpenSetting}`, `オープン設定`],

        [`vi.${LanguageIdMap.btnPlayNow}`, `Chơi Ngay`],
        [`en.${LanguageIdMap.btnPlayNow}`, `Play Now`],
        [`ko.${LanguageIdMap.btnPlayNow}`, `Play Now`],
        [`jp.${LanguageIdMap.btnPlayNow}`, `Play Now`],

        [`vi.${LanguageIdMap.btnMoreComment}`, `Xem thêm bình luận`],
        [`en.${LanguageIdMap.btnMoreComment}`, `More Comment`],
        [`ko.${LanguageIdMap.btnMoreComment}`, `더보기`],
        [`jp.${LanguageIdMap.btnMoreComment}`, `もっと見る`],

        [`vi.${LanguageIdMap.btnNext}`, `Tiếp theo`],
        [`en.${LanguageIdMap.btnNext}`, `Next`],
        [`ko.${LanguageIdMap.btnNext}`, `다음에`],
        [`jp.${LanguageIdMap.btnNext}`, `次へ`],

        [`vi.${LanguageIdMap.btnOrderNow}`, `Đặt Ngay`],
        [`en.${LanguageIdMap.btnOrderNow}`, `Place Your Order`],
        [`ko.${LanguageIdMap.btnOrderNow}`, `주문`],
        [`jp.${LanguageIdMap.btnOrderNow}`, `注文`],

        [`vi.${LanguageIdMap.btnPost}`, `Đăng`],
        [`en.${LanguageIdMap.btnPost}`, `Post`],
        [`ko.${LanguageIdMap.btnPost}`, `게재`],
        [`jp.${LanguageIdMap.btnPost}`, `掲載`],

        [`vi.${LanguageIdMap.btnRegister}`, `Đăng Ký`],
        [`en.${LanguageIdMap.btnRegister}`, `Register`],
        [`ko.${LanguageIdMap.btnRegister}`, `등록`],
        [`jp.${LanguageIdMap.btnRegister}`, `登録`],

        [`vi.${LanguageIdMap.btnRemindMeLater}`, `Nhắc Lại Sau`],
        [`en.${LanguageIdMap.btnRemindMeLater}`, `Remind Me Later`],
        [`ko.${LanguageIdMap.btnRemindMeLater}`, `나중에 생각 나게한다.`],
        [`jp.${LanguageIdMap.btnRemindMeLater}`, `後で思い出させる。`],

        [`vi.${LanguageIdMap.btnRequestPayment}`, `Yêu Cầu Giao Dịch`],
        [`en.${LanguageIdMap.btnRequestPayment}`, `Request Payment`],
        [`ko.${LanguageIdMap.btnRequestPayment}`, `지불 청구 요청`],
        [`jp.${LanguageIdMap.btnRequestPayment}`, `支払い請求リクエスト`],

        [`vi.${LanguageIdMap.btnResendOTP}`, `Gửi Lại Mã OTP`],
        [`en.${LanguageIdMap.btnResendOTP}`, `Resend transaction code`],
        [`ko.${LanguageIdMap.btnResendOTP}`, `인증 코드 (OTP)를 재전송`],
        [`jp.${LanguageIdMap.btnResendOTP}`, `認証コード(OTP)を再送信`],

        [`vi.${LanguageIdMap.btnReset}`, `Mặc định`],
        [`en.${LanguageIdMap.btnReset}`, `Default`],
        [`ko.${LanguageIdMap.btnReset}`, `재설정`],
        [`jp.${LanguageIdMap.btnReset}`, `リセット`],

        [`vi.${LanguageIdMap.btnSave}`, `Lưu`],
        [`en.${LanguageIdMap.btnSave}`, `Save`],
        [`ko.${LanguageIdMap.btnSave}`, `저장`],
        [`jp.${LanguageIdMap.btnSave}`, `保存`],

        [`vi.${LanguageIdMap.btnSeemore}`, `Xem thêm`],
        [`en.${LanguageIdMap.btnSeemore}`, `See more`],
        [`ko.${LanguageIdMap.btnSeemore}`, `자세히보기`],
        [`jp.${LanguageIdMap.btnSeemore}`, `続きを見る`],

        [`vi.${LanguageIdMap.btnSeeYourWallet}`, `Xem Ví`],
        [`en.${LanguageIdMap.btnSeeYourWallet}`, `See Your Wallet`],
        [`ko.${LanguageIdMap.btnSeeYourWallet}`, `MY 지갑을 보면`],
        [`jp.${LanguageIdMap.btnSeeYourWallet}`, `MY財布をみる`],

        [`vi.${LanguageIdMap.btnSelect}`, `Chọn`],
        [`en.${LanguageIdMap.btnSelect}`, `Select`],
        [`ko.${LanguageIdMap.btnSelect}`, `선택`],
        [`jp.${LanguageIdMap.btnSelect}`, `選択`],

        [`vi.${LanguageIdMap.btnSend}`, `Gửi`],
        [`en.${LanguageIdMap.btnSend}`, `Send`],
        [`ko.${LanguageIdMap.btnSend}`, `전송`],
        [`jp.${LanguageIdMap.btnSend}`, `送信`],

        [`vi.${LanguageIdMap.btnSignUpPhone}`, `Đăng ký bằng điện thoại`],
        [`en.${LanguageIdMap.btnSignUpPhone}`, `Sign up with phone number`],
        [`ko.${LanguageIdMap.btnSignUpPhone}`, `휴대폰 번호를 등록합니다.`],
        [`jp.${LanguageIdMap.btnSignUpPhone}`, `携帯番号を登録します。`],

        [`vi.${LanguageIdMap.btnSkip}`, `Bỏ Qua`],
        [`en.${LanguageIdMap.btnSkip}`, `Skip`],
        [`ko.${LanguageIdMap.btnSkip}`, `건너 뛰기`],
        [`jp.${LanguageIdMap.btnSkip}`, `スキップ`],

        [`vi.${LanguageIdMap.btnTranfer}`, `Chuyển`],
        [`en.${LanguageIdMap.btnTranfer}`, `Transfer`],
        [`ko.${LanguageIdMap.btnTranfer}`, `쓰기`],
        [`jp.${LanguageIdMap.btnTranfer}`, `送る`],

        [`vi.${LanguageIdMap.btnTryAgain}`, `Thử lại`],
        [`en.${LanguageIdMap.btnTryAgain}`, `Try Again`],
        [`ko.${LanguageIdMap.btnTryAgain}`, `재시도`],
        [`jp.${LanguageIdMap.btnTryAgain}`, `再試行`],

        [`vi.${LanguageIdMap.btnUnSelect}`, `Bỏ chọn`],
        [`en.${LanguageIdMap.btnUnSelect}`, `Unselect`],
        [`ko.${LanguageIdMap.btnUnSelect}`, `선택 해제`],
        [`jp.${LanguageIdMap.btnUnSelect}`, `選択解除`],

        [`vi.${LanguageIdMap.btnVerify}`, `Xác Nhận`],
        [`en.${LanguageIdMap.btnVerify}`, `Confirm`],
        [`ko.${LanguageIdMap.btnVerify}`, `확정`],
        [`jp.${LanguageIdMap.btnVerify}`, `確定`],

        [`vi.${LanguageIdMap.btnView}`, `Xem`],
        [`en.${LanguageIdMap.btnView}`, `View`],
        [`ko.${LanguageIdMap.btnView}`, `보기`],
        [`jp.${LanguageIdMap.btnView}`, `見る`],

        [`vi.${LanguageIdMap.btnViewEdit}`, `Xem & Sửa`],
        [`en.${LanguageIdMap.btnViewEdit}`, `View & Edit`],
        [`ko.${LanguageIdMap.btnViewEdit}`, `표시 · 편집`],
        [`jp.${LanguageIdMap.btnViewEdit}`, `表示・編集`],

        [`vi.${LanguageIdMap.btnWriteComment}`, `Viết bình luận`],
        [`en.${LanguageIdMap.btnWriteComment}`, `Write a comment`],
        [`ko.${LanguageIdMap.btnWriteComment}`, `댓글`],
        [`jp.${LanguageIdMap.btnWriteComment}`, `コメント`],

        [`vi.${LanguageIdMap.camera_roll}`, `Chọn Hình`],
        [`en.${LanguageIdMap.camera_roll}`, `Select Image`],
        [`ko.${LanguageIdMap.camera_roll}`, `이미지를 선택`],
        [`jp.${LanguageIdMap.camera_roll}`, `画像を選択`],

        [`vi.${LanguageIdMap.change_password}`, `Đổi mật khẩu`],
        [`en.${LanguageIdMap.change_password}`, `Change Passsword`],
        [`ko.${LanguageIdMap.change_password}`, `암호 변경`],
        [`jp.${LanguageIdMap.change_password}`, `パスワードの変更`],

        [`vi.${LanguageIdMap.close_now}`, `Đã đóng cửa`],
        [`en.${LanguageIdMap.close_now}`, `Closed`],
        [`ko.${LanguageIdMap.close_now}`, `닫았다`],
        [`jp.${LanguageIdMap.close_now}`, `閉めた`],

        [`vi.${LanguageIdMap.collect_nut_success}`, `Bạn đã tích được {{count}} hạt dẻ`],
        [`en.${LanguageIdMap.collect_nut_success}`, `You’ve collected {{count}} points`],
        [`ko.${LanguageIdMap.collect_nut_success}`, `고객 {{count}} 포인트를 모아했습니다.`],
        [`jp.${LanguageIdMap.collect_nut_success}`, `お客様は{{count}}ポイントを貯めました。`],

        [`vi.${LanguageIdMap.collect_perbill}`, `Tích {{count}} trên tổng hóa đơn`],
        [`en.${LanguageIdMap.collect_perbill}`, `Collect {{count}} per bill`],
        [`ko.${LanguageIdMap.collect_perbill}`, `결제 금액의 {{count}}에 포인트를 모은다.`],
        [`jp.${LanguageIdMap.collect_perbill}`, `支払い金額の{{count}}にポイントを貯める。`],

        [`vi.${LanguageIdMap.combo}`, `Combo`],
        [`en.${LanguageIdMap.combo}`, `Combo`],
        [`ko.${LanguageIdMap.combo}`, `세트`],
        [`jp.${LanguageIdMap.combo}`, `セット`],

        [`vi.${LanguageIdMap.combo_got}`, `Combo đã nhận`],
        [`en.${LanguageIdMap.combo_got}`, `Combo got`],
        [`ko.${LanguageIdMap.combo_got}`, `MY 지갑에있는 세트`],
        [`jp.${LanguageIdMap.combo_got}`, `MY財布にあるセット`],

        [`vi.${LanguageIdMap.combo_required}`, `Combo Đã Được Nhận!`],
        [`en.${LanguageIdMap.combo_required}`, `The Combo Is In Your Wallet!`],
        [`ko.${LanguageIdMap.combo_required}`, `MY 지갑에있는 세트`],
        [`jp.${LanguageIdMap.combo_required}`, `MY財布にあるセット`],

        [`vi.${LanguageIdMap.combo_used}`, `Combo đã dùng`],
        [`en.${LanguageIdMap.combo_used}`, `Used Combo`],
        [`ko.${LanguageIdMap.combo_used}`, `사용 된 세트`],
        [`jp.${LanguageIdMap.combo_used}`, `使用済みセット`],

        [`vi.${LanguageIdMap.communityName}`, `Thêm`],
        [`en.${LanguageIdMap.communityName}`, `More`],
        [`ko.${LanguageIdMap.communityName}`, `더`],
        [`jp.${LanguageIdMap.communityName}`, `もっと`],

        [`vi.${LanguageIdMap.condition_promotion}`, `Điều kiện áp dụng`],
        [`en.${LanguageIdMap.condition_promotion}`, `Conditions`],
        [`ko.${LanguageIdMap.condition_promotion}`, `적용 조건`],
        [`jp.${LanguageIdMap.condition_promotion}`, `適用条件`],

        [`vi.${LanguageIdMap.confirm}`, `Xác Nhận`],
        [`en.${LanguageIdMap.confirm}`, `Confirm`],
        [`ko.${LanguageIdMap.confirm}`, `확인`],
        [`jp.${LanguageIdMap.confirm}`, `確認`],

        [`vi.${LanguageIdMap.congratulation}`, `Chúc mừng!`],
        [`en.${LanguageIdMap.congratulation}`, `Congratulation!`],
        [`ko.${LanguageIdMap.congratulation}`, `축하합니다!`],
        [`jp.${LanguageIdMap.congratulation}`, `おめでとう！`],

        [`vi.${LanguageIdMap.coppied}`, `Đã sao chép!`],
        [`en.${LanguageIdMap.coppied}`, `Coppied!`],
        [`ko.${LanguageIdMap.coppied}`, `복사`],
        [`jp.${LanguageIdMap.coppied}`, `コピー`],

        [`vi.${LanguageIdMap.count_selected}`, `{{count}} {{count_name}} đã chọn`],
        [`en.${LanguageIdMap.count_selected}`, `{{count}} {{count_name}} selected`],
        [`ko.${LanguageIdMap.count_selected}`, `{{count}} {{count_name}} 선택된`],
        [`jp.${LanguageIdMap.count_selected}`, `{{count}} {{count_name}} 選択された`],

        [`vi.${LanguageIdMap.current_promotion}`, `Đang Có`],
        [`en.${LanguageIdMap.current_promotion}`, `Available`],
        [`ko.${LanguageIdMap.current_promotion}`, `이용 가능`],
        [`jp.${LanguageIdMap.current_promotion}`, `利用可能`],

        [`vi.${LanguageIdMap.discoveryName}`, `Khám Phá`],
        [`en.${LanguageIdMap.discoveryName}`, `Discover`],
        [`ko.${LanguageIdMap.discoveryName}`, `인기`],
        [`jp.${LanguageIdMap.discoveryName}`, `人気`],

        [`vi.${LanguageIdMap.do_you_comment}`, `Bạn có nhận xét gì thêm không?`],
        [`en.${LanguageIdMap.do_you_comment}`, `Do you have any comment?`],
        [`ko.${LanguageIdMap.do_you_comment}`, `댓글이 있습니까?`],
        [`jp.${LanguageIdMap.do_you_comment}`, `コメントはありますか？`],

        [`vi.${LanguageIdMap.earnPointName}`, `Tích`],
        [`en.${LanguageIdMap.earnPointName}`, `Collect`],
        [`ko.${LanguageIdMap.earnPointName}`, `저축`],
        [`jp.${LanguageIdMap.earnPointName}`, `貯める`],

        [`vi.${LanguageIdMap.edit_my_profile}`, `Sửa Thông Tin`],
        [`en.${LanguageIdMap.edit_my_profile}`, `Edit Profile`],
        [`ko.${LanguageIdMap.edit_my_profile}`, `등록 정보 변경`],
        [`jp.${LanguageIdMap.edit_my_profile}`, `登録情報変更`],

        [`vi.${LanguageIdMap.empty}`, `Hiện chưa có nội dung`],
        [`en.${LanguageIdMap.empty}`, `The content is not available now`],
        [`ko.${LanguageIdMap.empty}`, `이 컨텐츠는 현재 이용하실 수 없습니다.`],
        [`jp.${LanguageIdMap.empty}`, `このコンテンツは現在ご利用出来ません。`],

        [`vi.${LanguageIdMap.english}`, `English`],
        [`en.${LanguageIdMap.english}`, `English`],
        [`ko.${LanguageIdMap.english}`, `English`],
        [`jp.${LanguageIdMap.english}`, `English`],

        [`vi.${LanguageIdMap.error}`, `Lỗi kết nối mạng`],
        [`en.${LanguageIdMap.error}`, `Network Error`],
        [`ko.${LanguageIdMap.error}`, `네트워크 오류`],
        [`jp.${LanguageIdMap.error}`, `ネットワークエラー`],

        [`vi.${LanguageIdMap.errTimeout}`, `Kết nối không thành công!`],
        [`en.${LanguageIdMap.errTimeout}`, `Connection failure!`],
        [`ko.${LanguageIdMap.errTimeout}`, `연결에 실패했습니다.`],
        [`jp.${LanguageIdMap.errTimeout}`, `接続に失敗しました。`],

        [`vi.${LanguageIdMap.expired_on}`, `Ngày hết hạn`],
        [`en.${LanguageIdMap.expired_on}`, `Expire on`],
        [`ko.${LanguageIdMap.expired_on}`, `만료`],
        [`jp.${LanguageIdMap.expired_on}`, `期限切れ`],

        [`vi.${LanguageIdMap.favorite}`, `Yêu thích`],
        [`en.${LanguageIdMap.favorite}`, `Favorite`],
        [`ko.${LanguageIdMap.favorite}`, `즐겨 찾기`],
        [`jp.${LanguageIdMap.favorite}`, `お気に入り`],

        [`vi.${LanguageIdMap.feedback}`, `Góp Ý`],
        [`en.${LanguageIdMap.feedback}`, `Feedback`],
        [`ko.${LanguageIdMap.feedback}`, `피드백`],
        [`jp.${LanguageIdMap.feedback}`, `フィードバック`],

        [`vi.${LanguageIdMap.filter}`, `Lọc`],
        [`en.${LanguageIdMap.filter}`, `Filter`],
        [`ko.${LanguageIdMap.filter}`, `필터`],
        [`jp.${LanguageIdMap.filter}`, `フィルタ`],

        [`vi.${LanguageIdMap.filterButton}`, `Lọc`],
        [`en.${LanguageIdMap.filterButton}`, `Filter`],
        [`ko.${LanguageIdMap.filterButton}`, `필터`],
        [`jp.${LanguageIdMap.filterButton}`, `フィルタ`],

        [`vi.${LanguageIdMap.free_voucher}`, `Voucher`],
        [`en.${LanguageIdMap.free_voucher}`, `Voucher`],
        [`ko.${LanguageIdMap.free_voucher}`, `쿠폰`],
        [`jp.${LanguageIdMap.free_voucher}`, `クーポン券`],

        [`vi.${LanguageIdMap.from}`, `Từ`],
        [`en.${LanguageIdMap.from}`, `From`],
        [`ko.${LanguageIdMap.from}`, `에서`],
        [`jp.${LanguageIdMap.from}`, `から`],

        [`vi.${LanguageIdMap.gallery}`, `Hình Ảnh`],
        [`en.${LanguageIdMap.gallery}`, `Gallery`],
        [`ko.${LanguageIdMap.gallery}`, `갤러리`],
        [`jp.${LanguageIdMap.gallery}`, `ギャラリー`],

        [`vi.${LanguageIdMap.get_voucher_description}`, `* Bạn bị trừ 5 star khi lấy một voucher và sẽ nhận lại ngay 10 star khi sử dụng voucher này.`],
        [`en.${LanguageIdMap.get_voucher_description}`, `* Redeem 5 stars when you get a voucher and earn 10 stars when you use the selected voucher.`],
        [`ko.${LanguageIdMap.get_voucher_description}`, `* 한 장의 쿠폰을받을 때 5 개의 별을 끌려 획득 한 쿠폰을 사용되었을 때 10 개의 별을 취소 할 수 있습니다.`],
        [`jp.${LanguageIdMap.get_voucher_description}`, `*一枚のクーポン券を受け取ったときに5つの星を引かれ、獲得したクーポン券を 使用された時10つの星を戻すことができます。`],

        [`vi.${LanguageIdMap.guideline}`, `Hướng Dẫn`],
        [`en.${LanguageIdMap.guideline}`, `Guideline`],
        [`ko.${LanguageIdMap.guideline}`, `안내`],
        [`jp.${LanguageIdMap.guideline}`, `案内`],

        [`vi.${LanguageIdMap.happy_hour}`, `Happy hour`],
        [`en.${LanguageIdMap.happy_hour}`, `Happy Hour`],
        [`ko.${LanguageIdMap.happy_hour}`, `해피 아워`],
        [`jp.${LanguageIdMap.happy_hour}`, `ハッピーアワー`],

        [`vi.${LanguageIdMap.help}`, `Giúp đỡ`],
        [`en.${LanguageIdMap.help}`, `Help`],
        [`ko.${LanguageIdMap.help}`, `연락처`],
        [`jp.${LanguageIdMap.help}`, `お問い合わせ`],

        [`vi.${LanguageIdMap.help_faq}`, `Hỏi/Đáp`],
        [`en.${LanguageIdMap.help_faq}`, `FAQ`],
        [`ko.${LanguageIdMap.help_faq}`, `자주 묻는 질문`],
        [`jp.${LanguageIdMap.help_faq}`, `よくあるご質問`],

        [`vi.${LanguageIdMap.hh_active}`, `Đang chạy`],
        [`en.${LanguageIdMap.hh_active}`, `Active`],
        [`ko.${LanguageIdMap.hh_active}`, `진행 중`],
        [`jp.${LanguageIdMap.hh_active}`, `進行中`],

        [`vi.${LanguageIdMap.hh_upcoming}`, `Sắp Tới`],
        [`en.${LanguageIdMap.hh_upcoming}`, `Upcoming`],
        [`ko.${LanguageIdMap.hh_upcoming}`, `행사`],
        [`jp.${LanguageIdMap.hh_upcoming}`, `今後のイベント`],

        [`vi.${LanguageIdMap.home}`, `Home`],
        [`en.${LanguageIdMap.home}`, `Home`],
        [`ko.${LanguageIdMap.home}`, `홈`],
        [`jp.${LanguageIdMap.home}`, `ホーム`],

        [`vi.${LanguageIdMap.how_much_point}`, `Bạn muốn dùng bao nhiêu hạt dẻ để thanh toán?`],
        [`en.${LanguageIdMap.how_much_point}`, `How much points would you like to pay?`],
        [`ko.${LanguageIdMap.how_much_point}`, `사용하는 포인트를 입력하십시오.`],
        [`jp.${LanguageIdMap.how_much_point}`, `使用するポイントをご入力ください。`],

        [`vi.${LanguageIdMap.incorrect}`, `Không chính xác`],
        [`en.${LanguageIdMap.incorrect}`, `Incorrect`],
        [`ko.${LanguageIdMap.incorrect}`, `실수`],
        [`jp.${LanguageIdMap.incorrect}`, `間違い`],

        [`vi.${LanguageIdMap.japanese}`, `日本語`],
        [`en.${LanguageIdMap.japanese}`, `日本語`],
        [`ko.${LanguageIdMap.japanese}`, `日本語`],
        [`jp.${LanguageIdMap.japanese}`, `日本語`],

        [`vi.${LanguageIdMap.korean}`, `한국어`],
        [`en.${LanguageIdMap.korean}`, `한국어`],
        [`ko.${LanguageIdMap.korean}`, `한국어`],
        [`jp.${LanguageIdMap.korean}`, `한국어`],

        [`vi.${LanguageIdMap.language}`, `Ngôn Ngữ`],
        [`en.${LanguageIdMap.language}`, `Language`],
        [`ko.${LanguageIdMap.language}`, `언어`],
        [`jp.${LanguageIdMap.language}`, `言語`],

        [`vi.${LanguageIdMap.login_description}`, `Tích hạt dẻ, tiêu hạt dẻ và nhận những phần thưởng hấp dẫn`],
        [`en.${LanguageIdMap.login_description}`, `Collect, redeem and easily earn rewards`],
        [`ko.${LanguageIdMap.login_description}`, `포인트를 모아, 사용 포인트보다 쉽게 ​​경품을 교환 할 수 있습니다.`],
        [`jp.${LanguageIdMap.login_description}`, `ポイントを貯め、使う、ポイントより簡単に景品を交換することができます。`],

        [`vi.${LanguageIdMap.loginRequired}`, `Yêu Cầu Đăng Nhập`],
        [`en.${LanguageIdMap.loginRequired}`, `Login Required`],
        [`ko.${LanguageIdMap.loginRequired}`, `로그인이 필요`],
        [`jp.${LanguageIdMap.loginRequired}`, `ログインが必要`],

        [`vi.${LanguageIdMap.logout}`, `Đăng xuất`],
        [`en.${LanguageIdMap.logout}`, `Logout`],
        [`ko.${LanguageIdMap.logout}`, `로그 아웃`],
        [`jp.${LanguageIdMap.logout}`, `ログアウト`],

        [`vi.${LanguageIdMap.member_since}`, `Thành viên từ {{date}}`],
        [`en.${LanguageIdMap.member_since}`, `Member since {{date}}`],
        [`ko.${LanguageIdMap.member_since}`, `멤버는 {{date}} 에서`],
        [`jp.${LanguageIdMap.member_since}`, `メンバーは{{date}}から`],

        [`vi.${LanguageIdMap.more}`, `Xem thêm`],
        [`en.${LanguageIdMap.more}`, `See more`],
        [`ko.${LanguageIdMap.more}`, `자세히보기`],
        [`jp.${LanguageIdMap.more}`, `続きを見る`],

        [`vi.${LanguageIdMap.msg_can_not_send_otp}`, `Bạn đã yêu cầu quá 5 lần gửi mã OTP trong 1 ngày. Vui lòng liên hệ với chúng tôi để được hỗ trợ. Xin cảm ơn!`],
        [`en.${LanguageIdMap.msg_can_not_send_otp}`, `You have requested more than 5 transaction passwords in a day. Please contact us to resolve this problem. Thank you!`],
        [`ko.${LanguageIdMap.msg_can_not_send_otp}`, `인증 코드 (OTP)를 계속 1 일 5 회 이상 요구했습니다. 이 문제를 해결하려면 문의하십시오. 감사합니다!`],
        [`jp.${LanguageIdMap.msg_can_not_send_otp}`, `認証コード(OTP)を続けて1日５回以上要求しました。この問題を解決するにはご連絡ください。ありがとうございました！`],

        [`vi.${LanguageIdMap.msg_can_not_use_enclosed}`, `* Không được dùng kèm với các chương trình khuyến mãi khác.`],
        [`en.${LanguageIdMap.msg_can_not_use_enclosed}`, `* This promotion cannot be used with other promotions.`],
        [`ko.${LanguageIdMap.msg_can_not_use_enclosed}`, `다른 프로모션 코드와의 조합은 불가`],
        [`jp.${LanguageIdMap.msg_can_not_use_enclosed}`, `他のプロモーションコードとの組み合わせは不可`],

        [`vi.${LanguageIdMap.msg_can_use_enclosed}`, `* Được dùng kèm với các chương trình khuyến mãi khác.`],
        [`en.${LanguageIdMap.msg_can_use_enclosed}`, `* Apply to all other promotions.`],
        [`ko.${LanguageIdMap.msg_can_use_enclosed}`, `다른 프로모션 코드와 결합 가능`],
        [`jp.${LanguageIdMap.msg_can_use_enclosed}`, `他のプロモーションコードとの組み合わせは可能`],

        [`vi.${LanguageIdMap.msg_confirm_logout}`, `Bạn có muốn đăng xuất?`],
        [`en.${LanguageIdMap.msg_confirm_logout}`, `Would you like to logout?`],
        [`ko.${LanguageIdMap.msg_confirm_logout}`, `정말 로그 아웃 하시겠습니까?`],
        [`jp.${LanguageIdMap.msg_confirm_logout}`, `本当にログアウトしますか。`],

        [`vi.${LanguageIdMap.msg_confirm_notif_read_all}`, `Bạn có muốn đánh dấu đã đọc tất cả thông báo?`],
        [`en.${LanguageIdMap.msg_confirm_notif_read_all}`, `Would you like to mark all message as read?`],
        [`ko.${LanguageIdMap.msg_confirm_notif_read_all}`, `모든 메시지를 읽은 상태로 표시 하시겠습니까?`],
        [`jp.${LanguageIdMap.msg_confirm_notif_read_all}`, `すべてのメッセージを既読としてマークしますか？`],

        [`vi.${LanguageIdMap.msg_confirm_title}`, `Xác Nhận Đơn Hàng`],
        [`en.${LanguageIdMap.msg_confirm_title}`, `Comfirm Your Order`],
        [`ko.${LanguageIdMap.msg_confirm_title}`, `주문 확인`],
        [`jp.${LanguageIdMap.msg_confirm_title}`, `注文確認`],

        [`vi.${LanguageIdMap.msg_confirm_voucher_content}`, `Bạn sẽ bị giảm 5 star/phiếu quà tặng và nhận lại 10 star/phiếu quà tặng sau khi sử dụng. Bạn có muốn thực hiện giao dịch này không?`],
        [`en.${LanguageIdMap.msg_confirm_voucher_content}`, `Redeem 5 stars when you get a voucher and get back 10 stars when you use this voucher. Would you like to process this transaction?`],
        [`ko.${LanguageIdMap.msg_confirm_voucher_content}`, `* 한 장의 쿠폰을받을 때 5 개의 별을 끌려 획득 한 쿠폰을 사용되었을 때 10 개의 별을 취소 할 수 있습니다. 이 거래를 실행 하시겠습니까?`],
        [`jp.${LanguageIdMap.msg_confirm_voucher_content}`, `*一枚のクーポン券を受け取ったときに5つの星を引かれ、獲得したクーポン券を 使用された時10つの星を戻すことができます。この取引を実行しますか。`],

        [`vi.${LanguageIdMap.msg_did_not_login}`, `Bạn chưa đăng nhập`],
        [`en.${LanguageIdMap.msg_did_not_login}`, `You did not login`],
        [`ko.${LanguageIdMap.msg_did_not_login}`, `고객은 로그인하고 있지 않습니다.`],
        [`jp.${LanguageIdMap.msg_did_not_login}`, `お客様はログインしていません。`],

        // FIXME:
        [`vi.${LanguageIdMap.msg_empty_favorite_title}`, `Bạn chưa có yêu thích!`],
        [`en.${LanguageIdMap.msg_empty_favorite_title}`, `No favorites yet!`],
        [`ko.${LanguageIdMap.msg_empty_favorite_title}`, `마음에 드는 것은 아닙니다.`],
        [`jp.${LanguageIdMap.msg_empty_favorite_title}`, `気に入るものはありません。`],

        [`vi.${LanguageIdMap.msg_empty_favorite_description}`, `Các cửa hàng yêu thích được lưu tại đây. Nhấn vào (icon tim) tại những cửa hàng bạn thích để lưu lại.`],
        [`en.${LanguageIdMap.msg_empty_favorite_description}`, `Your favorite stores are saved here. Click the heart button at the stores that you love.`],
        [`ko.${LanguageIdMap.msg_empty_favorite_description}`, `마음의 점포가 여기에 저장됩니다. 마음 점포 하트 버튼을 클릭하십시오.`],
        [`jp.${LanguageIdMap.msg_empty_favorite_description}`, `気に入りの店舗がここに保存されます。 気に入り店舗にハートボタンをクリックしてください。`],

        [`vi.${LanguageIdMap.msg_empty_transaction_title}`, `Bạn chưa có giao dịch!`],
        [`en.${LanguageIdMap.msg_empty_transaction_title}`, `No Transactions`],
        [`ko.${LanguageIdMap.msg_empty_transaction_title}`, `거래가 없습니다.`],
        [`jp.${LanguageIdMap.msg_empty_transaction_title}`, `取引がありません。`],

        [`vi.${LanguageIdMap.msg_empty_transaction_description}`, `Bạn vẫn chưa thực hiện giao dịch nào.`],
        [`en.${LanguageIdMap.msg_empty_transaction_description}`, `You have not done any transaction_titles.`],
        [`ko.${LanguageIdMap.msg_empty_transaction_description}`, `고객은 여전히 ​​거래를 수행 할 수 없습니다.`],
        [`jp.${LanguageIdMap.msg_empty_transaction_description}`, `お客様はまだ取引を実行することがありません。`],

        [`vi.${LanguageIdMap.msg_empty_wallet_title}`, `Ví của bạn đang trống rỗng!`],
        [`en.${LanguageIdMap.msg_empty_wallet_title}`, `Your wallet is empty!`],
        [`ko.${LanguageIdMap.msg_empty_wallet_title}`, `고객의 지갑이 비어 있습니다!`],
        [`jp.${LanguageIdMap.msg_empty_wallet_title}`, `お客様の財布は空です！`],

        [`vi.${LanguageIdMap.msg_empty_wallet_description}`, `Lấp đầy nó bằng cách chia sẻ ứng dụng cho bạn bè hoặc đến cửa hàng tích hạt dẻ.`],
        [`en.${LanguageIdMap.msg_empty_wallet_description}`, `Fill it all up by sharing MYPOP app to friends and family.`],
        [`ko.${LanguageIdMap.msg_empty_wallet_description}`, `MYPOP 앱을 친구 나 가족에게 소개하고 포인트를받을 수 있습니다. 또는 MYPOP 네트워크 매장에서 서비스를 사용하면 포인트를 모아 보자.`],
        [`jp.${LanguageIdMap.msg_empty_wallet_description}`, `MYPOPアプリを友人や家族に紹介してポイントを貰えます。またはMYPOPネットワークの店舗でサービスを使用すればポイントを貯めましょう。`],


        [`vi.${LanguageIdMap.msg_empty_result_title}`, `Rất tiếc!`],
        [`en.${LanguageIdMap.msg_empty_result_title}`, `No results`],
        [`ko.${LanguageIdMap.msg_empty_result_title}`, `결과가 없습니다.`],
        [`jp.${LanguageIdMap.msg_empty_result_title}`, `結果がありません。`],

        [`vi.${LanguageIdMap.msg_empty_result_description}`, `Chúng tôi không tìm thấy kết quả`],
        [`en.${LanguageIdMap.msg_empty_result_description}`, `We did not find any results for your search.`],
        [`ko.${LanguageIdMap.msg_empty_result_description}`, `검색 결과를 찾을 수 없습니다.`],
        [`jp.${LanguageIdMap.msg_empty_result_description}`, `検索結果が見つかりませんでした。`],

        [`vi.${LanguageIdMap.msg_turn_on_camera}`, `Quý khách vui lòng cho phép MYPOP truy cập Máy ảnh để sử dụng tính năng này. Ở màn hình Cài Đặt, chọn Camera/Máy ảnh > Bật truy cập cho ứng dụng MYPOP.`],
        [`en.${LanguageIdMap.msg_turn_on_camera}`, `We would like to access your camera so you can use this awesome feature. At setting screen, click Camera> Turn on for using MYPOP app.`],
        [`ko.${LanguageIdMap.msg_turn_on_camera}`, `멋진 기능을 사용하도록 카메라에 대한 액세스가 필요합니다. 설정 화면에서 "카메라"를 선택하고 MYPOP 응용 프로그램을 사용하도록 카메라 시작을 "On"으로 설정하십시오.`],
        [`jp.${LanguageIdMap.msg_turn_on_camera}`, `素晴らしい機能を使用するようにカメラへのアクセスが必要になります。設定画面で「カメラ」を選択し、MYPOPアプリケーションを利用するようにカメラ起動を「オン」にしてください。`],

        [`vi.${LanguageIdMap.msg_generic_error}`, `Vui lòng kiểm tra kết nối mạng và thử lại.`],
        [`en.${LanguageIdMap.msg_generic_error}`, `Please check your network condition and try again.`],
        [`ko.${LanguageIdMap.msg_generic_error}`, `네트워크 연결을 확인하고 다시 시도하십시오.`],
        [`jp.${LanguageIdMap.msg_generic_error}`, `ネットワーク接続環境を確認して、再度実行してください。`],

        [`vi.${LanguageIdMap.msg_invalid_address}`, `Vui lòng nhập địa chỉ giao hàng`],
        [`en.${LanguageIdMap.msg_invalid_address}`, `Please enter your delivery address`],
        [`ko.${LanguageIdMap.msg_invalid_address}`, `배송 주소를 입력 해주십시오`],
        [`jp.${LanguageIdMap.msg_invalid_address}`, `配送先住所をご入力ください`],

        [`vi.${LanguageIdMap.msg_invalid_answer}`, `Câu trả lời chưa chính xác`],
        [`en.${LanguageIdMap.msg_invalid_answer}`, `Incorrect Answer`],
        [`ko.${LanguageIdMap.msg_invalid_answer}`, `오답`],
        [`jp.${LanguageIdMap.msg_invalid_answer}`, `不正解`],

        [`vi.${LanguageIdMap.msg_invalid_date}`, `Ngày không hợp lệ!`],
        [`en.${LanguageIdMap.msg_invalid_date}`, `Invalid date!`],
        [`ko.${LanguageIdMap.msg_invalid_date}`, `잘못된 날짜입니다!`],
        [`jp.${LanguageIdMap.msg_invalid_date}`, `無効な日付です！`],

        [`vi.${LanguageIdMap.msg_invalid_dob}`, `Ngày sinh chưa đúng!`],
        [`en.${LanguageIdMap.msg_invalid_dob}`, `Invalid date of birth!`],
        [`ko.${LanguageIdMap.msg_invalid_dob}`, `생년월일이 잘못되었습니다!`],
        [`jp.${LanguageIdMap.msg_invalid_dob}`, `生年月日が間違っています！`],

        [`vi.${LanguageIdMap.msg_invalid_fullname}`, `Vui lòng nhập họ tên`],
        [`en.${LanguageIdMap.msg_invalid_fullname}`, `Please enter your fullname`],
        [`ko.${LanguageIdMap.msg_invalid_fullname}`, `전체 이름을 입력하십시오.`],
        [`jp.${LanguageIdMap.msg_invalid_fullname}`, `フルネームをご入力ください。`],

        [`vi.${LanguageIdMap.msg_invalid_image_big}`, `Ảnh quá lớn`],
        [`en.${LanguageIdMap.msg_invalid_image_big}`, `The photo is too big`],
        [`ko.${LanguageIdMap.msg_invalid_image_big}`, `사진의 용량이 너무 큽니다.`],
        [`jp.${LanguageIdMap.msg_invalid_image_big}`, `写真の容量が大きすぎます。`],

        [`vi.${LanguageIdMap.msg_invalid_input_nut}`, `Số hạt dẻ mà bạn đang muốn sử dụng vượt quá số hạt dẻ đang có`],
        [`en.${LanguageIdMap.msg_invalid_input_nut}`, `The quantity points you`],
        [`ko.${LanguageIdMap.msg_invalid_input_nut}`, `포인트의 수량이 부족합니다.`],
        [`jp.${LanguageIdMap.msg_invalid_input_nut}`, `ポイントの数量が不足です。`],

        [`vi.${LanguageIdMap.msg_invalid_password}`, `Mật khẩu cần có ít nhất 6 ký tự bao gồm cả chữ và số.`],
        [`en.${LanguageIdMap.msg_invalid_password}`, `Password must be at least 6 characters including letter and digit.`],
        [`ko.${LanguageIdMap.msg_invalid_password}`, `경로 와드가 6 자 이상으로하고 숫자가 하나 이상 포함되어 있어야합니다.`],
        [`jp.${LanguageIdMap.msg_invalid_password}`, `パス ワ ード が 6 文字 以 上 で、 かつ 数字が1つ以上含まれている必要があります。`],

        [`vi.${LanguageIdMap.msg_invalid_phone_has_registed}`, `Số điện thoại đã được đăng ký`],
        [`en.${LanguageIdMap.msg_invalid_phone_has_registed}`, `Phone number is already registered`],
        [`ko.${LanguageIdMap.msg_invalid_phone_has_registed}`, `휴대폰 번호는 이미 등록되어 있습니다`],
        [`jp.${LanguageIdMap.msg_invalid_phone_has_registed}`, `携帯番号は既に登録されています`],

        [`vi.${LanguageIdMap.msg_invalid_phone_number}`, `Số điện thoại chưa chính xác`],
        [`en.${LanguageIdMap.msg_invalid_phone_number}`, `Invalid phone number`],
        [`ko.${LanguageIdMap.msg_invalid_phone_number}`, `입력 된 전화 번호가 올바르지 않습니다.`],
        [`jp.${LanguageIdMap.msg_invalid_phone_number}`, `入力された電話番号が正しくありません。`],

        [`vi.${LanguageIdMap.msg_invalid_phone_pass}`, `Số điện thoại hoặc mật khẩu chưa đúng`],
        [`en.${LanguageIdMap.msg_invalid_phone_pass}`, `Phone number or password is invalid`],
        [`ko.${LanguageIdMap.msg_invalid_phone_pass}`, `휴대폰 번호 또는 비밀번호가 잘못되었습니다`],
        [`jp.${LanguageIdMap.msg_invalid_phone_pass}`, `携帯番号またはパスワードが無効です`],

        [`vi.${LanguageIdMap.msg_invalid_question}`, `Vui lòng chọn câu hỏi`],
        [`en.${LanguageIdMap.msg_invalid_question}`, `Please select a question`],
        [`ko.${LanguageIdMap.msg_invalid_question}`, `비밀 질문을 선택하십시오.`],
        [`jp.${LanguageIdMap.msg_invalid_question}`, `秘密の質問を選択してください。`],

        [`vi.${LanguageIdMap.msg_invalid_referral_code}`, `Mã giới thiệu không chính xác`],
        [`en.${LanguageIdMap.msg_invalid_referral_code}`, `oops Wrong Referral code`],
        [`ko.${LanguageIdMap.msg_invalid_referral_code}`, `추천 코드가 잘못되었습니다.`],
        [`jp.${LanguageIdMap.msg_invalid_referral_code}`, `紹介コードが間違いました。`],

        [`vi.${LanguageIdMap.msg_invalid_user_id}`, `Số điện thoại hoặc mã MYPOP chưa chính xác`],
        [`en.${LanguageIdMap.msg_invalid_user_id}`, `Invalid phone number or MYPOP's ID`],
        [`ko.${LanguageIdMap.msg_invalid_user_id}`, `휴대폰 번호 또는 Mypop의 ID가 잘못되었습니다`],
        [`jp.${LanguageIdMap.msg_invalid_user_id}`, `携帯番号またはMypopのIDが無効です`],

        [`vi.${LanguageIdMap.msg_login_failed}`, `Đặng nhập không thành công`],
        [`en.${LanguageIdMap.msg_login_failed}`, `Login unsuccessful`],
        [`ko.${LanguageIdMap.msg_login_failed}`, `로그인에 실패했습니다.`],
        [`jp.${LanguageIdMap.msg_login_failed}`, `ログインに失敗しました。`],

        [`vi.${LanguageIdMap.msg_must_active_scan}`, `Để sử dụng tính năng chuyển điểm, bạn cần tích điểm ít nhất 1 lần tại các cửa hàng trong hệ thống MYPOP bằng ứng dụng MYPOP. Xin cảm ơn!`],
        [`en.${LanguageIdMap.msg_must_active_scan}`, `In order to transfer points to friends, it's required that you accumulate some points at least 1 time at any store under MYPOP network. Thank you!`],
        [`ko.${LanguageIdMap.msg_must_active_scan}`, `포인트 전송 기능을 이용할 수 있도록 MYPOP 네트워크의 모든 매장에서 적어도 1 회 포인트 적립해야합니다. 감사합니다!`],
        [`jp.${LanguageIdMap.msg_must_active_scan}`, `ポイント転送の機能がご利用いただけるように、MYPOPネットワークの任意の店舗で少なくとも1回ポイントを貯める必要があります。ありがとうございました！`],

        [`vi.${LanguageIdMap.msg_not_enough_star}`, `Bạn không đủ star`],
        [`en.${LanguageIdMap.msg_not_enough_star}`, `You do not have enough stars`],
        [`ko.${LanguageIdMap.msg_not_enough_star}`, `별 수가 충분하지 않습니다.`],
        [`jp.${LanguageIdMap.msg_not_enough_star}`, `星数が足りません。`],

        [`vi.${LanguageIdMap.msg_not_enought_nut}`, `Bạn không đủ hạt dẻ`],
        [`en.${LanguageIdMap.msg_not_enought_nut}`, `You do not have enough points`],
        [`ko.${LanguageIdMap.msg_not_enought_nut}`, `포인트가 부족합니다.`],
        [`jp.${LanguageIdMap.msg_not_enought_nut}`, `ポイントが足りません。`],

        [`vi.${LanguageIdMap.msg_not_exist_user}`, `Người dùng không tồn tại.`],
        [`en.${LanguageIdMap.msg_not_exist_user}`, `User does not exist.`],
        [`ko.${LanguageIdMap.msg_not_exist_user}`, `이 사용자는 존재하지 않습니다.`],
        [`jp.${LanguageIdMap.msg_not_exist_user}`, `このユーザーは存在しません。`],

        [`vi.${LanguageIdMap.msg_not_match_otp}`, `Mã OTP không đúng hoặc đã hết hạn.`],
        [`en.${LanguageIdMap.msg_not_match_otp}`, `The transaction code is incorrect or expired.`],
        [`ko.${LanguageIdMap.msg_not_match_otp}`, `인증 코드 (OTP)이 잘못되었거나 만료 있습니다.`],
        [`jp.${LanguageIdMap.msg_not_match_otp}`, `認証コード(OTP)が間違っているか、期限が切れています。`],

        [`vi.${LanguageIdMap.msg_not_match_password}`, `Mật khẩu không khớp. Vui lòng thử lại.`],
        [`en.${LanguageIdMap.msg_not_match_password}`, `The password does not match. Please try again.`],
        [`ko.${LanguageIdMap.msg_not_match_password}`, `비밀번호가 일치하지 않습니다. 다시 시도하세요.`],
        [`jp.${LanguageIdMap.msg_not_match_password}`, `パスワードが一致しません。もう一度お試し下さい。`],

        [`vi.${LanguageIdMap.msg_please_choose_num}`, `Chọn số lượng`],
        [`en.${LanguageIdMap.msg_please_choose_num}`, `Please select quantity`],
        [`ko.${LanguageIdMap.msg_please_choose_num}`, `수량을 선택하십시오.`],
        [`jp.${LanguageIdMap.msg_please_choose_num}`, `数量を選択してください。`],

        [`vi.${LanguageIdMap.msg_promotion_limit}`, `* Chỉ được sử dụng tối đa {{count}} trên 1 hóa đơn.`],
        [`en.${LanguageIdMap.msg_promotion_limit}`, `* Up to a maximum of {{count}} per bill.`],
        [`ko.${LanguageIdMap.msg_promotion_limit}`, `* 영수증 당 최대 {{count}} 개 사용할 수 있습니다.`],
        [`jp.${LanguageIdMap.msg_promotion_limit}`, `*領収書あたり最大{{count}}枚が使えます。`],

        [`vi.${LanguageIdMap.msg_promotion_no_limit}`, `* Không giới hạn số lượng voucher sử dụng trên 1 hóa đơn.`],
        [`en.${LanguageIdMap.msg_promotion_no_limit}`, `* Unlimited vouchers per bill.`],
        [`ko.${LanguageIdMap.msg_promotion_no_limit}`, `1 회 주문에 여러 쿠폰을 동시에 사용 할 수 있습니다.`],
        [`jp.${LanguageIdMap.msg_promotion_no_limit}`, `1回のご注文で複数のクーポンを同時に利用する事はできます。`],

        [`vi.${LanguageIdMap.msg_redeem_star}`, `Bạn đã nhận được Phiếu quà tặng`],
        [`en.${LanguageIdMap.msg_redeem_star}`, `You received a voucher`],
        [`ko.${LanguageIdMap.msg_redeem_star}`, `쿠폰을 성공적으로 수령했습니다.`],
        [`jp.${LanguageIdMap.msg_redeem_star}`, `クーポン券を成功に受取りました。`],

        [`vi.${LanguageIdMap.msg_register_failed}`, `Đăng ký không thành công`],
        [`en.${LanguageIdMap.msg_register_failed}`, `Sign up unsuccessful`],
        [`ko.${LanguageIdMap.msg_register_failed}`, `등록을 할 수 없습니다.`],
        [`jp.${LanguageIdMap.msg_register_failed}`, `登録ができませんでした。`],

        [`vi.${LanguageIdMap.msg_rejected_destail}`, `Yêu cầu của bạn đã bị từ chối`],
        [`en.${LanguageIdMap.msg_rejected_destail}`, `Your request was rejected`],
        [`ko.${LanguageIdMap.msg_rejected_destail}`, `불행히도 귀하의 요청이 거부되었습니다.`],
        [`jp.${LanguageIdMap.msg_rejected_destail}`, `残念ながらお客様のリクエストは拒否されました。`],

        [`vi.${LanguageIdMap.msg_sent_otp_success}`, `Đã gửi mã OTP thành công!`],
        [`en.${LanguageIdMap.msg_sent_otp_success}`, `Sent transaction code success!`],
        [`ko.${LanguageIdMap.msg_sent_otp_success}`, `인증 코드 (OTP)를 성공적으로 보냈습니다.`],
        [`jp.${LanguageIdMap.msg_sent_otp_success}`, `認証コード(OTP)を成功に送信しました。`],

        [`vi.${LanguageIdMap.msg_share_success}`, `Đã chia sẻ thành công`],
        [`en.${LanguageIdMap.msg_share_success}`, `It has been shared`],
        [`ko.${LanguageIdMap.msg_share_success}`, `댓글이 성공에 게시되었습니다.`],
        [`jp.${LanguageIdMap.msg_share_success}`, `コメントが成功に投稿されました。`],

        [`vi.${LanguageIdMap.msg_success_comment}`, `Bình luận đang được hệ thống duyệt. Xin cám ơn!`],
        [`en.${LanguageIdMap.msg_success_comment}`, `Your comment is waiting to be approved.`],
        [`ko.${LanguageIdMap.msg_success_comment}`, `귀하의 의견을 승인을 기다리고 있습니다.`],
        [`jp.${LanguageIdMap.msg_success_comment}`, `お客様のコメントは承認待ちです。`],

        [`vi.${LanguageIdMap.msg_title_generic}`, `Thông báo`],
        [`en.${LanguageIdMap.msg_title_generic}`, `Notifications`],
        [`ko.${LanguageIdMap.msg_title_generic}`, `공지 사항`],
        [`jp.${LanguageIdMap.msg_title_generic}`, `お知らせ`],

        [`vi.${LanguageIdMap.msg_transfer_success}`, `Chuyển Điểm Thành Công`],
        [`en.${LanguageIdMap.msg_transfer_success}`, `Transfered successfully`],
        [`ko.${LanguageIdMap.msg_transfer_success}`, `포인트 전송 성공`],
        [`jp.${LanguageIdMap.msg_transfer_success}`, `ポイント送信成功`],

        [`vi.${LanguageIdMap.msg_turn_on_position}`, `Vui lòng bật tính năng vị trí`],
        [`en.${LanguageIdMap.msg_turn_on_position}`, `Please turn on your location setting`],
        [`ko.${LanguageIdMap.msg_turn_on_position}`, `위치 정보 서비스를 선택하십시오.`],
        [`jp.${LanguageIdMap.msg_turn_on_position}`, `位置情報サービスをオンにしてください。`],

        [`vi.${LanguageIdMap.msg_update_success}`, `Cập nhật thành công!`],
        [`en.${LanguageIdMap.msg_update_success}`, `Successfully Updated!`],
        [`ko.${LanguageIdMap.msg_update_success}`, `성공적으로 업데이트되었습니다.`],
        [`jp.${LanguageIdMap.msg_update_success}`, `正常に更新されました。`],

        [`vi.${LanguageIdMap.msg_warning_litmit_image}`, `Số ảnh đã chọn vượt quá số lượng cho phép`],
        [`en.${LanguageIdMap.msg_warning_litmit_image}`, `The quantity that you selected, is exceeding the limit.`],
        [`ko.${LanguageIdMap.msg_warning_litmit_image}`, `선택한 사진이 상한 매수를 초과했습니다.`],
        [`jp.${LanguageIdMap.msg_warning_litmit_image}`, `選択した写真が上限枚数を超えています。`],

        [`vi.${LanguageIdMap.msg_wrong_password}`, `Mật khẩu hiện tại không khớp`],
        [`en.${LanguageIdMap.msg_wrong_password}`, `Incorrect current password`],
        [`ko.${LanguageIdMap.msg_wrong_password}`, `암호가 올바르지 않습니다.`],
        [`jp.${LanguageIdMap.msg_wrong_password}`, `パスワードが正しくありません。`],

        [`vi.${LanguageIdMap.msg_same_old_password}`, `Mật khẩu cũ mới trùng mật khẩu cũ`],
        [`en.${LanguageIdMap.msg_same_old_password}`, `New password has to be different the old one`],
        [`ko.${LanguageIdMap.msg_same_old_password}`, `새 암호는 이전 암호와 비슷합니다.`],
        [`jp.${LanguageIdMap.msg_same_old_password}`, `新パスワードは旧パスワードに似ています。`],

        [`vi.${LanguageIdMap.msg_warning_wrong_phone_format}`, `Bạn nhập sai số điện thoại`],
        [`en.${LanguageIdMap.msg_warning_wrong_phone_format}`, `Phone number is incorrect`],
        [`ko.${LanguageIdMap.msg_warning_wrong_phone_format}`, `입력 된 전화 번호가 올바르지 않습니다.`],
        [`jp.${LanguageIdMap.msg_warning_wrong_phone_format}`, `入力された電話番号が正しくありません。`],

        [`vi.${LanguageIdMap.msg_warning_do_not_support_phone_type}`, `Hiện tại chúng tôi chưa hỗ trợ nhà mạng này`],
        [`en.${LanguageIdMap.msg_warning_do_not_support_phone_type}`, `Your carrier does not support.`],
        [`ko.${LanguageIdMap.msg_warning_do_not_support_phone_type}`, `이 경력은 지원하지 않습니다.`],
        [`jp.${LanguageIdMap.msg_warning_do_not_support_phone_type}`, `このキャリアはサポートしていません。`],

        [`vi.${LanguageIdMap.msg_success_buy_card}`, `Mua thẻ cào thành công`],
        [`en.${LanguageIdMap.msg_success_buy_card}`, `You've successfully purchased a phone card`],
        [`ko.${LanguageIdMap.msg_success_buy_card}`, `제대로 전화 카드를 구입했습니다.`],
        [`jp.${LanguageIdMap.msg_success_buy_card}`, `正常に電話カードが購入されました。`],

        [`vi.${LanguageIdMap.msg_warning_shopinfo}`, `Hãy chụp lại hoá đơn trong trường hợp hệ thống tích điểm tại cửa hàng bị lỗi hoặc quên tích điểm, MYPOP sẽ xác nhận lại và tích điểm dựa trên thông tin ở hoá đơn bạn đã chụp.`],
        [`en.${LanguageIdMap.msg_warning_shopinfo}`, `Please take a snapshot of your receipt in case failure to accumulate points. MYPOP will confirm and record your points.`],
        [`ko.${LanguageIdMap.msg_warning_shopinfo}`, `포인트를 모을 수없는 경우, 영수증을 찍어 MYPOP로 연락 주시기 바랍니다. 정보를 확인하면 포인트를 추가합니다.`],
        [`jp.${LanguageIdMap.msg_warning_shopinfo}`, `ポイントを貯められない場合、領収書を撮って MYPOPまでご連絡ください。情報を確認しましたら、ポイントを追加いたします。`],

        [`vi.${LanguageIdMap.multi}`, `nhân`],
        [`en.${LanguageIdMap.multi}`, `multiplied`],
        [`ko.${LanguageIdMap.multi}`, `곱셈 된`],
        [`jp.${LanguageIdMap.multi}`, `乗算された`],

        [`vi.${LanguageIdMap.my_account}`, `Tài khoản`],
        [`en.${LanguageIdMap.my_account}`, `My account`],
        [`ko.${LanguageIdMap.my_account}`, `계정`],
        [`jp.${LanguageIdMap.my_account}`, `アカウント`],

        [`vi.${LanguageIdMap.my_profile}`, `Cá Nhân`],
        [`en.${LanguageIdMap.my_profile}`, `My Profile`],
        [`ko.${LanguageIdMap.my_profile}`, `개인 정보`],
        [`jp.${LanguageIdMap.my_profile}`, `個人情報`],

        [`vi.${LanguageIdMap.my_wallet}`, `Ví của tôi`],
        [`en.${LanguageIdMap.my_wallet}`, `My wallet`],
        [`ko.${LanguageIdMap.my_wallet}`, `내 지갑`],
        [`jp.${LanguageIdMap.my_wallet}`, `マイ財布`],

        [`vi.${LanguageIdMap.my_wallet_history}`, `Lịch Sử`],
        [`en.${LanguageIdMap.my_wallet_history}`, `History`],
        [`ko.${LanguageIdMap.my_wallet_history}`, `역사`],
        [`jp.${LanguageIdMap.my_wallet_history}`, `歴史`],

        [`vi.${LanguageIdMap.mypop_fee}`, `Phí MYPOP`],
        [`en.${LanguageIdMap.mypop_fee}`, `Deduction star for booking`],
        [`ko.${LanguageIdMap.mypop_fee}`, `예약을위한 공제 스타`],
        [`jp.${LanguageIdMap.mypop_fee}`, `予約のための控除スター`],

        [`vi.${LanguageIdMap.mypop_id}`, `MYPOP ID`],
        [`en.${LanguageIdMap.mypop_id}`, `MYPOP ID`],
        [`ko.${LanguageIdMap.mypop_id}`, `MYPOP ID`],
        [`jp.${LanguageIdMap.mypop_id}`, `MYPOP ID`],

        [`vi.${LanguageIdMap.no_result}`, `Không có kết quả`],
        [`en.${LanguageIdMap.no_result}`, `No result`],
        [`ko.${LanguageIdMap.no_result}`, `검색 결과가 없습니다.`],
        [`jp.${LanguageIdMap.no_result}`, `検索結果はありません。`],

        [`vi.${LanguageIdMap.notification}`, `Thông báo`],
        [`en.${LanguageIdMap.notification}`, `Notification`],
        [`ko.${LanguageIdMap.notification}`, `공지 사항`],
        [`jp.${LanguageIdMap.notification}`, `お知らせ`],

        [`vi.${LanguageIdMap.notification_read}`, `Đã Xem`],
        [`en.${LanguageIdMap.notification_read}`, `Read`],
        [`ko.${LanguageIdMap.notification_read}`, `읽음`],
        [`jp.${LanguageIdMap.notification_read}`, `既読`],

        [`vi.${LanguageIdMap.notification_unread}`, `Chưa Xem`],
        [`en.${LanguageIdMap.notification_unread}`, `Unread`],
        [`ko.${LanguageIdMap.notification_unread}`, `읽지 않은`],
        [`jp.${LanguageIdMap.notification_unread}`, `未読`],

        [`vi.${LanguageIdMap.nut}`, `hạt dẻ`],
        [`en.${LanguageIdMap.nut}`, `point`],
        [`ko.${LanguageIdMap.nut}`, `포인트`],
        [`jp.${LanguageIdMap.nut}`, `ポイント`],

        [`vi.${LanguageIdMap.nut_collect}`, `Số hạt dẻ được tích`],
        [`en.${LanguageIdMap.nut_collect}`, `The amount of points`],
        [`ko.${LanguageIdMap.nut_collect}`, `모은 포인트`],
        [`jp.${LanguageIdMap.nut_collect}`, `貯めたポイント`],

        [`vi.${LanguageIdMap.nut_collected}`, `Số hạt dẻ tích lũy`],
        [`en.${LanguageIdMap.nut_collected}`, `Accumulated points`],
        [`ko.${LanguageIdMap.nut_collected}`, `누적 포인트`],
        [`jp.${LanguageIdMap.nut_collected}`, `累積ポイント`],

        [`vi.${LanguageIdMap.nut_used}`, `Số hạt dẻ đã dùng`],
        [`en.${LanguageIdMap.nut_used}`, `Points used`],
        [`ko.${LanguageIdMap.nut_used}`, `사용 된 포인트`],
        [`jp.${LanguageIdMap.nut_used}`, `使用済みポイント`],

        [`vi.${LanguageIdMap.online_shopping}`, `Online shopping`],
        [`en.${LanguageIdMap.online_shopping}`, `Online shopping`],
        [`ko.${LanguageIdMap.online_shopping}`, `쇼핑 온라인`],
        [`jp.${LanguageIdMap.online_shopping}`, `ショッピングオンライン`],

        [`vi.${LanguageIdMap.open_now}`, `Đang mở`],
        [`en.${LanguageIdMap.open_now}`, `Open now`],
        [`ko.${LanguageIdMap.open_now}`, `영업 시간`],
        [`jp.${LanguageIdMap.open_now}`, `営業時間`],

        [`vi.${LanguageIdMap.or}`, `hoặc`],
        [`en.${LanguageIdMap.or}`, `or`],
        [`ko.${LanguageIdMap.or}`, `또는`],
        [`jp.${LanguageIdMap.or}`, `または`],

        [`vi.${LanguageIdMap.order_accept}`, `Đã xác nhận`],
        [`en.${LanguageIdMap.order_accept}`, `Confirmed`],
        [`ko.${LanguageIdMap.order_accept}`, `확인제`],
        [`jp.${LanguageIdMap.order_accept}`, `確認済`],

        [`vi.${LanguageIdMap.order_info}`, `Thông tin đơn hàng`],
        [`en.${LanguageIdMap.order_info}`, `Order Information`],
        [`ko.${LanguageIdMap.order_info}`, `주문 정보`],
        [`jp.${LanguageIdMap.order_info}`, `注文情報`],

        [`vi.${LanguageIdMap.order_not_receive}`, `Khách hàng không nhận hàng`],
        [`en.${LanguageIdMap.order_not_receive}`, `Have not received my order`],
        [`ko.${LanguageIdMap.order_not_receive}`, `주문 아직받지 않습니다.`],
        [`jp.${LanguageIdMap.order_not_receive}`, `注文まだ受け取れません。`],

        [`vi.${LanguageIdMap.order_on}`, `Ngày đặt hàng`],
        [`en.${LanguageIdMap.order_on}`, `Order date`],
        [`ko.${LanguageIdMap.order_on}`, `주문 날짜`],
        [`jp.${LanguageIdMap.order_on}`, `注文日`],

        [`vi.${LanguageIdMap.order_pending}`, `Đang chờ`],
        [`en.${LanguageIdMap.order_pending}`, `Pending`],
        [`ko.${LanguageIdMap.order_pending}`, `보류`],
        [`jp.${LanguageIdMap.order_pending}`, `保留中`],

        [`vi.${LanguageIdMap.order_reject}`, `Đơn hàng bị từ chối`],
        [`en.${LanguageIdMap.order_reject}`, `Rejected Order`],
        [`ko.${LanguageIdMap.order_reject}`, `주문이 거부되었습니다.`],
        [`jp.${LanguageIdMap.order_reject}`, `注文が拒否されました。`],

        [`vi.${LanguageIdMap.order_shipped}`, `Đã giao hàng`],
        [`en.${LanguageIdMap.order_shipped}`, `Delivered`],
        [`ko.${LanguageIdMap.order_shipped}`, `도착했습니다.`],
        [`jp.${LanguageIdMap.order_shipped}`, `届きました。`],

        [`vi.${LanguageIdMap.orSignWith}`, `hoặc đăng nhập với`],
        [`en.${LanguageIdMap.orSignWith}`, `or sign in with`],
        [`ko.${LanguageIdMap.orSignWith}`, `또는으로 로그인`],
        [`jp.${LanguageIdMap.orSignWith}`, `またはでログインする`],

        [`vi.${LanguageIdMap.photo}`, `Ảnh`],
        [`en.${LanguageIdMap.photo}`, `Photo`],
        [`ko.${LanguageIdMap.photo}`, `사진`],
        [`jp.${LanguageIdMap.photo}`, `写真`],

        [`vi.${LanguageIdMap.placeholder_answer}`, `Nhập câu trả lời ở đây`],
        [`en.${LanguageIdMap.placeholder_answer}`, `Type your answer here…`],
        [`ko.${LanguageIdMap.placeholder_answer}`, `답변을 입력하세요`],
        [`jp.${LanguageIdMap.placeholder_answer}`, `答えをご入力ください`],

        [`vi.${LanguageIdMap.placeholder_delivery_phone}`, `Số điện thoại`],
        [`en.${LanguageIdMap.placeholder_delivery_phone}`, `Phone number`],
        [`ko.${LanguageIdMap.placeholder_delivery_phone}`, `휴대폰 번호`],
        [`jp.${LanguageIdMap.placeholder_delivery_phone}`, `携帯番号`],

        [`vi.${LanguageIdMap.placeholder_enter_address}`, `Vui lòng nhập địa chỉ`],
        [`en.${LanguageIdMap.placeholder_enter_address}`, `Enter your address`],
        [`ko.${LanguageIdMap.placeholder_enter_address}`, `주소를 입력 해주십시오.`],
        [`jp.${LanguageIdMap.placeholder_enter_address}`, `住所をご入力ください。`],

        [`vi.${LanguageIdMap.placeholder_enter_dob}`, `Vui lòng nhập ngày sinh`],
        [`en.${LanguageIdMap.placeholder_enter_dob}`, `Enter your date of birth`],
        [`ko.${LanguageIdMap.placeholder_enter_dob}`, `생년월일 입력`],
        [`jp.${LanguageIdMap.placeholder_enter_dob}`, `生年月日入力`],

        [`vi.${LanguageIdMap.placeholder_enter_firstname}`, `Vui lòng nhập tên`],
        [`en.${LanguageIdMap.placeholder_enter_firstname}`, `Enter your first name`],
        [`ko.${LanguageIdMap.placeholder_enter_firstname}`, `이름을 입력하십시오.`],
        [`jp.${LanguageIdMap.placeholder_enter_firstname}`, `名前をご入力ください。`],

        [`vi.${LanguageIdMap.placeholder_enter_fullname}`, `Vui lòng nhập họ và tên`],
        [`en.${LanguageIdMap.placeholder_enter_fullname}`, `Enter your full name`],
        [`ko.${LanguageIdMap.placeholder_enter_fullname}`, `이름을 입력하십시오.`],
        [`jp.${LanguageIdMap.placeholder_enter_fullname}`, `名前をご入力ください。`],

        [`vi.${LanguageIdMap.placeholder_enter_lastname}`, `Vui lòng nhập họ`],
        [`en.${LanguageIdMap.placeholder_enter_lastname}`, `Please enter your last name`],
        [`ko.${LanguageIdMap.placeholder_enter_lastname}`, `성을 입력하십시오.`],
        [`jp.${LanguageIdMap.placeholder_enter_lastname}`, `姓をご入力ください。`],

        [`vi.${LanguageIdMap.placeholder_enter_message}`, `Vui lòng nhập nội dung`],
        [`en.${LanguageIdMap.placeholder_enter_message}`, `Enter message`],
        [`ko.${LanguageIdMap.placeholder_enter_message}`, `메시지를 입력`],
        [`jp.${LanguageIdMap.placeholder_enter_message}`, `メッセージを入力`],

        [`vi.${LanguageIdMap.placeholder_enter_newpassword}`, `Mật khẩu mới`],
        [`en.${LanguageIdMap.placeholder_enter_newpassword}`, `New Password`],
        [`ko.${LanguageIdMap.placeholder_enter_newpassword}`, `새로운 비밀번호`],
        [`jp.${LanguageIdMap.placeholder_enter_newpassword}`, `新パスワード`],

        [`vi.${LanguageIdMap.placeholder_enter_otp}`, `Nhập mã xác nhận OTP vào đây`],
        [`en.${LanguageIdMap.placeholder_enter_otp}`, `Type your verification code here`],
        [`ko.${LanguageIdMap.placeholder_enter_otp}`, `인증 코드 (OTP)를 입력 해주십시오`],
        [`jp.${LanguageIdMap.placeholder_enter_otp}`, `認証コード(OTP)をご入力ください`],

        [`vi.${LanguageIdMap.placeholder_enter_password}`, `Vui lòng nhập mật khẩu`],
        [`en.${LanguageIdMap.placeholder_enter_password}`, `Enter your password`],
        [`ko.${LanguageIdMap.placeholder_enter_password}`, `비밀번호를 입력 해주십시오.`],
        [`jp.${LanguageIdMap.placeholder_enter_password}`, `パスワードをご入力ください。`],

        [`vi.${LanguageIdMap.placeholder_enter_phone_number}`, `Vui lòng nhập số điện thoại`],
        [`en.${LanguageIdMap.placeholder_enter_phone_number}`, `Enter your phone number`],
        [`ko.${LanguageIdMap.placeholder_enter_phone_number}`, `휴대폰 번호를 입력하십시오.`],
        [`jp.${LanguageIdMap.placeholder_enter_phone_number}`, `携帯番号をご入力ください。`],

        [`vi.${LanguageIdMap.placeholder_enter_email}`, `Điền email của bạn`],
        [`en.${LanguageIdMap.placeholder_enter_email}`, `Enter your email`],
        [`ko.${LanguageIdMap.placeholder_enter_email}`, `Enter your email`],
        [`jp.${LanguageIdMap.placeholder_enter_email}`, `Enter your email`],

        [`vi.${LanguageIdMap.placeholder_enter_phone_number_topup}`, `Nhập số điện thoại trả trước`],
        [`en.${LanguageIdMap.placeholder_enter_phone_number_topup}`, `Input your pre-paid phone number`],
        [`ko.${LanguageIdMap.placeholder_enter_phone_number_topup}`, `선불 휴대 전화 번호를 입력하세요`],
        [`jp.${LanguageIdMap.placeholder_enter_phone_number_topup}`, `プリペイド式携帯電話の番号をご入力ください。`],

        [`vi.${LanguageIdMap.placeholder_enter_renewpassword}`, `Nhập lại mật khẩu mới`],
        [`en.${LanguageIdMap.placeholder_enter_renewpassword}`, `Retype New Password`],
        [`ko.${LanguageIdMap.placeholder_enter_renewpassword}`, `새 암호를 다시 입력하십시오.`],
        [`jp.${LanguageIdMap.placeholder_enter_renewpassword}`, `新パスワードを再入力してください。`],

        [`vi.${LanguageIdMap.placeholder_enter_title}`, `Vui lòng nhập tiêu đề`],
        [`en.${LanguageIdMap.placeholder_enter_title}`, `Enter title`],
        [`ko.${LanguageIdMap.placeholder_enter_title}`, `제목 입력`],
        [`jp.${LanguageIdMap.placeholder_enter_title}`, `タイトル入力`],

        [`vi.${LanguageIdMap.placeholder_enter_your_code}`, `Nhập mã giới thiệu`],
        [`en.${LanguageIdMap.placeholder_enter_your_code}`, `Type your referral code here`],
        [`ko.${LanguageIdMap.placeholder_enter_your_code}`, `추천 코드 입력`],
        [`jp.${LanguageIdMap.placeholder_enter_your_code}`, `紹介コード入力`],

        [`vi.${LanguageIdMap.placeholder_friend_id}`, `Số điện thoại hoặc MYPOP ID`],
        [`en.${LanguageIdMap.placeholder_friend_id}`, `Phone number or Mypop ID`],
        [`ko.${LanguageIdMap.placeholder_friend_id}`, `휴대폰 번호 또는 MYPOP ID`],
        [`jp.${LanguageIdMap.placeholder_friend_id}`, `携帯番号またはMYPOP ID`],

        [`vi.${LanguageIdMap.placeholder_from}`, `Từ ngày`],
        [`en.${LanguageIdMap.placeholder_from}`, `From`],
        [`ko.${LanguageIdMap.placeholder_from}`, `에서`],
        [`jp.${LanguageIdMap.placeholder_from}`, `から`],

        [`vi.${LanguageIdMap.placeholder_note}`, `Ghi chú`],
        [`en.${LanguageIdMap.placeholder_note}`, `Note`],
        [`ko.${LanguageIdMap.placeholder_note}`, `기입란`],
        [`jp.${LanguageIdMap.placeholder_note}`, `記入欄`],

        [`.${LanguageIdMap.placeholder_nut_number}`, `Điền số hạt dẻ tại đây`],
        [`.${LanguageIdMap.placeholder_nut_number}`, `Input your points here`],
        [`.${LanguageIdMap.placeholder_nut_number}`, `여기에 사용하는 포인트를 입력하십시오`],
        [`.${LanguageIdMap.placeholder_nut_number}`, `ここに使用するポイントをご入力ください`],

        [`vi.${LanguageIdMap.placeholder_receive_address}`, `Địa chỉ giao hàng`],
        [`en.${LanguageIdMap.placeholder_receive_address}`, `Delivery address`],
        [`ko.${LanguageIdMap.placeholder_receive_address}`, `도착지`],
        [`jp.${LanguageIdMap.placeholder_receive_address}`, `配達先`],

        [`vi.${LanguageIdMap.placeholder_select_image}`, `Bấm vào để chọn ảnh (tối đa 12 ảnh)`],
        [`en.${LanguageIdMap.placeholder_select_image}`, `Click to select photos ( You can only add 12 photos)`],
        [`ko.${LanguageIdMap.placeholder_select_image}`, `클릭하여 사진을 선택 (최대 12 사진)`],
        [`jp.${LanguageIdMap.placeholder_select_image}`, `クリックして写真を選択（最多12枚の写真）`],

        [`vi.${LanguageIdMap.placeholder_select_question}`, `Chọn câu hỏi`],
        [`en.${LanguageIdMap.placeholder_select_question}`, `Select a question`],
        [`ko.${LanguageIdMap.placeholder_select_question}`, `질문 선택`],
        [`jp.${LanguageIdMap.placeholder_select_question}`, `質問選択`],

        [`vi.${LanguageIdMap.placeholder_to}`, `Đến ngày`],
        [`en.${LanguageIdMap.placeholder_to}`, `To`],
        [`ko.${LanguageIdMap.placeholder_to}`, `까지`],
        [`jp.${LanguageIdMap.placeholder_to}`, `まで`],

        [`vi.${LanguageIdMap.placeholder_transaction_old_password}`, `Nhập mật khẩu giao dịch cũ ở đây`],
        [`en.${LanguageIdMap.placeholder_transaction_old_password}`, `Type old transaction password here…`],
        [`ko.${LanguageIdMap.placeholder_transaction_old_password}`, `이전 거래 비밀번호를 입력 해주세요`],
        [`jp.${LanguageIdMap.placeholder_transaction_old_password}`, `旧取引パスワードをご記入ください`],

        [`vi.${LanguageIdMap.placeholder_transaction_password}`, `Nhập mật khẩu giao dịch ở đây`],
        [`en.${LanguageIdMap.placeholder_transaction_password}`, `Type new transaction password here…`],
        [`ko.${LanguageIdMap.placeholder_transaction_password}`, `거래 비밀번호를 입력 해주세요`],
        [`jp.${LanguageIdMap.placeholder_transaction_password}`, `取引パスワードをご記入ください`],

        [`vi.${LanguageIdMap.placeholder_transaction_repassword}`, `Nhập lại mật khẩu giao dịch ở đây`],
        [`en.${LanguageIdMap.placeholder_transaction_repassword}`, `Retype new transaction password here…`],
        [`ko.${LanguageIdMap.placeholder_transaction_repassword}`, `거래 암호를 다시 입력 해주세요`],
        [`jp.${LanguageIdMap.placeholder_transaction_repassword}`, `取引パスワードを再度ご記入ください`],

        [`vi.${LanguageIdMap.placeholder_your_password}`, `Điền mật khẩu tại đây`],
        [`en.${LanguageIdMap.placeholder_your_password}`, `Type your password here…`],
        [`ko.${LanguageIdMap.placeholder_your_password}`, `비밀번호를 입력 해주세요`],
        [`jp.${LanguageIdMap.placeholder_your_password}`, `パスワードをご記入ください`],

        [`vi.${LanguageIdMap.pls_contact_by}`, `Vui lòng liên hệ với chúng tôi`],
        [`en.${LanguageIdMap.pls_contact_by}`, `Please contact us via`],
        [`ko.${LanguageIdMap.pls_contact_by}`, `부담없이 문의 해주십시오.`],
        [`jp.${LanguageIdMap.pls_contact_by}`, `お気軽にお問い合わせください。`],

        [`vi.${LanguageIdMap.posting}`, `Đang viết`],
        [`en.${LanguageIdMap.posting}`, `Posting`],
        [`ko.${LanguageIdMap.posting}`, `기재 중`],
        [`jp.${LanguageIdMap.posting}`, `記載中`],

        [`vi.${LanguageIdMap.price}`, `giá`],
        [`en.${LanguageIdMap.price}`, `price`],
        [`ko.${LanguageIdMap.price}`, `가격`],
        [`jp.${LanguageIdMap.price}`, `価格`],

        [`vi.${LanguageIdMap.product}`, `sản phẩm`],
        [`en.${LanguageIdMap.product}`, `product`],
        [`ko.${LanguageIdMap.product}`, `상품`],
        [`jp.${LanguageIdMap.product}`, `商品`],

        [`vi.${LanguageIdMap.qrCodeName}`, `Mã QR`],
        [`en.${LanguageIdMap.qrCodeName}`, `QR Code`],
        [`ko.${LanguageIdMap.qrCodeName}`, `QR 코드`],
        [`jp.${LanguageIdMap.qrCodeName}`, `QRコード`],

        [`vi.${LanguageIdMap.question_buy_promotion}`, `Số lượng`],
        [`en.${LanguageIdMap.question_buy_promotion}`, `Quantity`],
        [`ko.${LanguageIdMap.question_buy_promotion}`, `수량`],
        [`jp.${LanguageIdMap.question_buy_promotion}`, `数量`],

        [`vi.${LanguageIdMap.reciever}`, `Người nhận`],
        [`en.${LanguageIdMap.reciever}`, `Receiver`],
        [`ko.${LanguageIdMap.reciever}`, `받는 사람`],
        [`jp.${LanguageIdMap.reciever}`, `受取人`],

        [`vi.${LanguageIdMap.referral}`, `Mã giới thiệu và khuyến mãi`],
        [`en.${LanguageIdMap.referral}`, `Referral & promo codes`],
        [`ko.${LanguageIdMap.referral}`, `프로모션 코드 소개 코드`],
        [`jp.${LanguageIdMap.referral}`, `プロモコード・紹介コード`],

        [`vi.${LanguageIdMap.referral_code_first_login}`, `Mã Giới Thiệu`],
        [`en.${LanguageIdMap.referral_code_first_login}`, `Referral Code`],
        [`ko.${LanguageIdMap.referral_code_first_login}`, `추천 코드`],
        [`jp.${LanguageIdMap.referral_code_first_login}`, `紹介コード`],

        [`vi.${LanguageIdMap.referral_label}`, `Vui lòng điền mã khuyến mãi ở ô bên dưới`],
        [`en.${LanguageIdMap.referral_label}`, `Please insert promo code below`],
        [`ko.${LanguageIdMap.referral_label}`, `아래의 상자에 프로모션 코드를 입력하십시오.`],
        [`jp.${LanguageIdMap.referral_label}`, `下のボックス内にプロモコードをご入力ください。`],

        [`vi.${LanguageIdMap.referral_placeholder}`, `Nhập mã khuyến mãi ở ô bên dưới`],
        [`en.${LanguageIdMap.referral_placeholder}`, `Type your promo code here`],
        [`ko.${LanguageIdMap.referral_placeholder}`, `프로모션 코드를 여기에 입력하십시오`],
        [`jp.${LanguageIdMap.referral_placeholder}`, `プロモコードをここにご入力ください`],

        [`vi.${LanguageIdMap.report}`, `Báo lỗi`],
        [`en.${LanguageIdMap.report}`, `Report`],
        [`ko.${LanguageIdMap.report}`, `보고`],
        [`jp.${LanguageIdMap.report}`, `報告`],

        [`vi.${LanguageIdMap.reset_your_password}`, `Thay Đổi Mật Khẩu`],
        [`en.${LanguageIdMap.reset_your_password}`, `Change Your Password`],
        [`ko.${LanguageIdMap.reset_your_password}`, `암호를 변경하십시오`],
        [`jp.${LanguageIdMap.reset_your_password}`, `パスワードをご変更ください`],

        [`vi.${LanguageIdMap.reset_your_password_description}`, `Nhập mật khẩu mới ở phía dưới`],
        [`en.${LanguageIdMap.reset_your_password_description}`, `Set your new password below`],
        [`ko.${LanguageIdMap.reset_your_password_description}`, `새로운 암호를 다음으로 설정하십시오.`],
        [`jp.${LanguageIdMap.reset_your_password_description}`, `新パスワードを以下に設定してください。`],

        [`vi.${LanguageIdMap.resigter_description}`, `Tích hạt dẻ, tiêu hạt dẻ và nhận những phần thưởng hấp dẫn`],
        [`en.${LanguageIdMap.resigter_description}`, `Collect, redeem and easily earn rewards`],
        [`ko.${LanguageIdMap.resigter_description}`, `포인트를 모아, 사용 포인트보다 쉽게 ​​경품을 교환 할 수 있습니다.`],
        [`jp.${LanguageIdMap.resigter_description}`, `ポイントを貯め、使う、ポイントより簡単に景品を交換することができます。`],

        [`vi.${LanguageIdMap.review}`, `Bình luận`],
        [`en.${LanguageIdMap.review}`, `Reviews`],
        [`ko.${LanguageIdMap.review}`, `리뷰`],
        [`jp.${LanguageIdMap.review}`, `レビュー`],

        [`vi.${LanguageIdMap.sa}`, `Thứ bảy`],
        [`en.${LanguageIdMap.sa}`, `Sat`],
        [`ko.${LanguageIdMap.sa}`, `토요일`],
        [`jp.${LanguageIdMap.sa}`, `土曜日`],

        [`vi.${LanguageIdMap.scan_qr_code_description}`, `Vui lòng di chuyển camera đến vùng chứa mã QR để quét`],
        [`en.${LanguageIdMap.scan_qr_code_description}`, `Please place your camera to Qr Barcode to scan it`],
        [`ko.${LanguageIdMap.scan_qr_code_description}`, `카메라 화면 중앙에 QR 코드를 읽습니다.`],
        [`jp.${LanguageIdMap.scan_qr_code_description}`, `カメラで画面中央にQRコードが読み取られます。`],

        [`vi.${LanguageIdMap.scanQrCode}`, `Quét mã QR`],
        [`en.${LanguageIdMap.scanQrCode}`, `Scan QR Code`],
        [`ko.${LanguageIdMap.scanQrCode}`, `QR 코드 읽기`],
        [`jp.${LanguageIdMap.scanQrCode}`, `QRコード読み取り`],

        [`vi.${LanguageIdMap.search_result}`, `Kết Quả Tìm Kiếm`],
        [`en.${LanguageIdMap.search_result}`, `Search Result`],
        [`ko.${LanguageIdMap.search_result}`, `검색 결과`],
        [`jp.${LanguageIdMap.search_result}`, `検索結果`],

        [`vi.${LanguageIdMap.searchPlaceholder}`, `Tìm kiếm`],
        [`en.${LanguageIdMap.searchPlaceholder}`, `Search anything`],
        [`ko.${LanguageIdMap.searchPlaceholder}`, `검색`],
        [`jp.${LanguageIdMap.searchPlaceholder}`, `検索`],

        [`vi.${LanguageIdMap.sender}`, `Người gửi`],
        [`en.${LanguageIdMap.sender}`, `Sender`],
        [`ko.${LanguageIdMap.sender}`, `보낸 사람`],
        [`jp.${LanguageIdMap.sender}`, `送信者`],

        [`vi.${LanguageIdMap.settings}`, `Cài đặt`],
        [`en.${LanguageIdMap.settings}`, `Settings`],
        [`ko.${LanguageIdMap.settings}`, `설정`],
        [`jp.${LanguageIdMap.settings}`, `設定`],

        [`vi.${LanguageIdMap.shopping_fee_description}`, `Bạn bị trừ 5 star trên một đơn hàng và sẽ nhận lại ngay 10 star khi đơn hàng được thực hiện thành công.`],
        [`en.${LanguageIdMap.shopping_fee_description}`, `You will redeem 5 stars on each order that was placed. Then, you will get 10 stars after order success.`],
        [`ko.${LanguageIdMap.shopping_fee_description}`, `* 한번의 주문으로 5 개의 별을 끌려 상품을 받았습니다 경우 10 개의 별을 취소 할 수 있습니다.`],
        [`jp.${LanguageIdMap.shopping_fee_description}`, `*一回の注文で5つの星を引かれ、商品を受け取りましたら10つの星を戻すことができます。`],

        [`vi.${LanguageIdMap.shopping_online_success}`, `Đặt hàng thành công!`],
        [`en.${LanguageIdMap.shopping_online_success}`, `Your order has been placed successfully!`],
        [`ko.${LanguageIdMap.shopping_online_success}`, `주문에 성공했습니다.`],
        [`jp.${LanguageIdMap.shopping_online_success}`, `注文に成功しました。`],

        [`vi.${LanguageIdMap.similar_store}`, `Gợi Ý Tương Tự`],
        [`en.${LanguageIdMap.similar_store}`, `Similar Stores`],
        [`ko.${LanguageIdMap.similar_store}`, `추천 관련 매장`],
        [`jp.${LanguageIdMap.similar_store}`, `おすすめの関連店舗`],

        [`vi.${LanguageIdMap.star_collected}`, `Số star tích lũy`],
        [`en.${LanguageIdMap.star_collected}`, `Accumulated Stars`],
        [`ko.${LanguageIdMap.star_collected}`, `모은 별 수`],
        [`jp.${LanguageIdMap.star_collected}`, `貯めたの星数`],

        [`vi.${LanguageIdMap.status}`, `Trạng thái`],
        [`en.${LanguageIdMap.status}`, `Status`],
        [`ko.${LanguageIdMap.status}`, `상태`],
        [`jp.${LanguageIdMap.status}`, `状態`],

        [`vi.${LanguageIdMap.subtotal}`, `Tổng cộng`],
        [`en.${LanguageIdMap.subtotal}`, `Subtotal`],
        [`ko.${LanguageIdMap.subtotal}`, `소계`],
        [`jp.${LanguageIdMap.subtotal}`, `小計`],

        [`vi.${LanguageIdMap.sun}`, `Chủ nhật`],
        [`en.${LanguageIdMap.sun}`, `Sun`],
        [`ko.${LanguageIdMap.sun}`, `일요일`],
        [`jp.${LanguageIdMap.sun}`, `日曜日`],

        [`vi.${LanguageIdMap.support_online}`, `Hỗ Trợ Trực Tuyến`],
        [`en.${LanguageIdMap.support_online}`, `Support Online`],
        [`ko.${LanguageIdMap.support_online}`, `온라인 지원`],
        [`jp.${LanguageIdMap.support_online}`, `オンラインサポート`],

        [`vi.${LanguageIdMap.swipe_2_next}`, `Kéo qua để xem tiếp`],
        [`en.${LanguageIdMap.swipe_2_next}`, `Slide to go next`],
        [`ko.${LanguageIdMap.swipe_2_next}`, `클릭하여 다음 슬라이드로 이동`],
        [`jp.${LanguageIdMap.swipe_2_next}`, `クリックして次のスライドに進む`],

        [`vi.${LanguageIdMap.thank_you_success}`, `Cảm ơn bạn đã dùng dịch vụ và sản phẩm tại {{shop}}. Nhận xét của bạn rất có ý nghĩa đối với chúng tôi.`],
        [`en.${LanguageIdMap.thank_you_success}`, `Thank you for using our services at {{shop}} store. Please review your experience at this store!`],
        [`ko.${LanguageIdMap.thank_you_success}`, `{{shop}} 매장에서 서비스를 이용해 주셔서 감사합니다. 당신의 평가를 부탁드립니다.`],
        [`jp.${LanguageIdMap.thank_you_success}`, `{{shop}}店舗でサービスをご利用いただきありがとうございます。あなたの評価をお願いいたします。`],

        [`vi.${LanguageIdMap.to}`, `đến`],
        [`en.${LanguageIdMap.to}`, `to`],
        [`ko.${LanguageIdMap.to}`, `로`],
        [`jp.${LanguageIdMap.to}`, `に`],

        [`vi.${LanguageIdMap.today_we_have_hh}`, `Happy Hour hôm nay:`],
        [`en.${LanguageIdMap.today_we_have_hh}`, `Today's Happy Hours:`],
        [`ko.${LanguageIdMap.today_we_have_hh}`, `오늘의 해피 아워`],
        [`jp.${LanguageIdMap.today_we_have_hh}`, `本日のハッピーアワー`],

        [`vi.${LanguageIdMap.total_bill}`, `Tổng hóa đơn`],
        [`en.${LanguageIdMap.total_bill}`, `Total bill`],
        [`ko.${LanguageIdMap.total_bill}`, `총`],
        [`jp.${LanguageIdMap.total_bill}`, `合計`],

        [`vi.${LanguageIdMap.total_cash}`, `Trả tiền mặt`],
        [`en.${LanguageIdMap.total_cash}`, `Paid by cash`],
        [`ko.${LanguageIdMap.total_cash}`, `현금`],
        [`jp.${LanguageIdMap.total_cash}`, `現金払い`],

        [`vi.${LanguageIdMap.tranfer_nut}`, `Chuyển hạt dẻ`],
        [`en.${LanguageIdMap.tranfer_nut}`, `Transfer points`],
        [`ko.${LanguageIdMap.tranfer_nut}`, `포인트 전송`],
        [`jp.${LanguageIdMap.tranfer_nut}`, `ポイント送信`],

        [`vi.${LanguageIdMap.transaction_being_proccess}`, `Giao dịch đang thực hiện`],
        [`en.${LanguageIdMap.transaction_being_proccess}`, `Transaction is being processed`],
        [`ko.${LanguageIdMap.transaction_being_proccess}`, `거래 처리 중`],
        [`jp.${LanguageIdMap.transaction_being_proccess}`, `取引の処理中`],

        [`vi.${LanguageIdMap.transaction_being_proccess_description}`, `Xin vui lòng chờ trong giây lát. Bạn có thể đóng thông báo này, chúng tôi sẽ thông báo cho bạn khi giao dịch hoàn tất.`],
        [`en.${LanguageIdMap.transaction_being_proccess_description}`, `Please wait a few minutes. You can close this notification, we will notify you when the transaction completes.`],
        [`ko.${LanguageIdMap.transaction_being_proccess_description}`, `잠시만 기다려주십시오. 이 통지를 닫을 수 있습니다. 거래가 완료되면 통지를 발송하겠습니다.`],
        [`jp.${LanguageIdMap.transaction_being_proccess_description}`, `少々お待ちくださいませ。この通知を閉じることができます。取引が完了したら通知を発送させていただきます。`],

        [`vi.${LanguageIdMap.transaction_detail}`, `Chi Tiết Giao Dịch`],
        [`en.${LanguageIdMap.transaction_detail}`, `Transaction Details`],
        [`ko.${LanguageIdMap.transaction_detail}`, `거래 세부 정보`],
        [`jp.${LanguageIdMap.transaction_detail}`, `取引詳細`],

        [`vi.${LanguageIdMap.transaction_id}`, `Mã Giao Dịch`],
        [`en.${LanguageIdMap.transaction_id}`, `Transaction ID`],
        [`ko.${LanguageIdMap.transaction_id}`, `거래 ID`],
        [`jp.${LanguageIdMap.transaction_id}`, `取引ID`],

        [`vi.${LanguageIdMap.transaction_password}`, `Mật Khẩu Giao Dịch`],
        [`en.${LanguageIdMap.transaction_password}`, `Transaction Password`],
        [`ko.${LanguageIdMap.transaction_password}`, `거래 비밀번호`],
        [`jp.${LanguageIdMap.transaction_password}`, `取引パスワード`],

        [`vi.${LanguageIdMap.transaction_processing}`, `Giao Dịch Đang Xử Lý`],
        [`en.${LanguageIdMap.transaction_processing}`, `Processing Transaction`],
        [`ko.${LanguageIdMap.transaction_processing}`, `처리 중`],
        [`jp.${LanguageIdMap.transaction_processing}`, `処理中`],

        [`vi.${LanguageIdMap.transaction_request}`, `Gửi Yêu Cầu`],
        [`en.${LanguageIdMap.transaction_request}`, `Transaction Request`],
        [`ko.${LanguageIdMap.transaction_request}`, `거래의 리쿠ェ스토를 보냅니다.`],
        [`jp.${LanguageIdMap.transaction_request}`, `取引のリクェストを送ります。`],

        [`vi.${LanguageIdMap.transaction_success}`, `Giao Dịch Thành Công`],
        [`en.${LanguageIdMap.transaction_success}`, `Transaction Successful`],
        [`ko.${LanguageIdMap.transaction_success}`, `거래가 성공했습니다.`],
        [`jp.${LanguageIdMap.transaction_success}`, `取引が成功しました。`],

        [`vi.${LanguageIdMap.transaction_time}`, `Thời gian giao dịch`],
        [`en.${LanguageIdMap.transaction_time}`, `Business hour`],
        [`ko.${LanguageIdMap.transaction_time}`, `영업 시간`],
        [`jp.${LanguageIdMap.transaction_time}`, `営業時間`],

        [`vi.${LanguageIdMap.transfer_question}`, `Bạn có muốn chuyển {{count_nut}} hạt dẻ đến {{name}} không?`],
        [`en.${LanguageIdMap.transfer_question}`, `Would you like to transfer {{count_nut}} points to {{name}} right now?`],
        [`ko.${LanguageIdMap.transfer_question}`, `{{count_nut}} 포인트를 {{name}}에 전송 하시겠습니까?`],
        [`jp.${LanguageIdMap.transfer_question}`, `{{count_nut}}ポイントを{{name}}に転送しますか？`],

        [`vi.${LanguageIdMap.transfer_register_password}`, `Tạo mật khẩu`],
        [`en.${LanguageIdMap.transfer_register_password}`, `Create password`],
        [`ko.${LanguageIdMap.transfer_register_password}`, `비밀번호 등록`],
        [`jp.${LanguageIdMap.transfer_register_password}`, `パスワードの登録`],

        [`vi.${LanguageIdMap.transfer_reset_password}`, `Lấy lại mật khẩu giao dịch`],
        [`en.${LanguageIdMap.transfer_reset_password}`, `Forgot transaction password`],
        [`ko.${LanguageIdMap.transfer_reset_password}`, `거래 비밀번호를 잊어 버렸습니다.`],
        [`jp.${LanguageIdMap.transfer_reset_password}`, `取引パスワードを忘れました。`],

        [`vi.${LanguageIdMap.transfer_update_password}`, `Đổi mật khẩu giao dịch`],
        [`en.${LanguageIdMap.transfer_update_password}`, `Change transaction password`],
        [`ko.${LanguageIdMap.transfer_update_password}`, `거래 암호를 변경`],
        [`jp.${LanguageIdMap.transfer_update_password}`, `取引パスワードを変更`],

        [`vi.${LanguageIdMap.transfernut_register_description}`, `Để có thể sử dụng tính năng chuyển hạt dẻ không giới hạn, bạn cần đăng ký mật khẩu giao dịch để bảo vệ kho hạt dẻ của bạn một cách an toàn.`],
        [`en.${LanguageIdMap.transfernut_register_description}`, `In order to send points to your friends, you need to register for a transaction password. We dedicate to protect your treasure.`],
        [`ko.${LanguageIdMap.transfernut_register_description}`, `알게 무한 포인트를 전송하기 위해 암호를 설정해야합니다.`],
        [`jp.${LanguageIdMap.transfernut_register_description}`, `知り合いに無限にポイントを送信するため、パスワードの設定が必要です。`],

        [`vi.${LanguageIdMap.transfernut_reset_description}`, `Để lấy lại mật khẩu giao dịch, bạn vui lòng điền đúng câu trả lời đã đăng ký.`],
        [`en.${LanguageIdMap.transfernut_reset_description}`, `Please answer the following question to retrieve your transaction password.`],
        [`ko.${LanguageIdMap.transfernut_reset_description}`, `비밀번호를 재발급시 본인 확인 질문에 대한 답을 입력하십시오.`],
        [`jp.${LanguageIdMap.transfernut_reset_description}`, `パスワードを再発行する際に秘密の質問の答えを入力してください。`],

        [`vi.${LanguageIdMap.tryagain}`, `Thử Lại`],
        [`en.${LanguageIdMap.tryagain}`, `Try Again`],
        [`ko.${LanguageIdMap.tryagain}`, `재시도`],
        [`jp.${LanguageIdMap.tryagain}`, `再試行`],

        [`vi.${LanguageIdMap.txtAddress}`, `Địa chỉ`],
        [`en.${LanguageIdMap.txtAddress}`, `Address`],
        [`ko.${LanguageIdMap.txtAddress}`, `주소`],
        [`jp.${LanguageIdMap.txtAddress}`, `住所`],

        [`vi.${LanguageIdMap.txtCurrentPassword}`, `Mật khẩu hiện tại`],
        [`en.${LanguageIdMap.txtCurrentPassword}`, `Current Password`],
        [`ko.${LanguageIdMap.txtCurrentPassword}`, `현재 비밀번호`],
        [`jp.${LanguageIdMap.txtCurrentPassword}`, `現在のパスワード`],

        [`vi.${LanguageIdMap.txtDob}`, `Ngày tháng năm sinh`],
        [`en.${LanguageIdMap.txtDob}`, `Date of birth`],
        [`ko.${LanguageIdMap.txtDob}`, `생년월일`],
        [`jp.${LanguageIdMap.txtDob}`, `生年月日`],

        [`vi.${LanguageIdMap.txtFeMale}`, `Nữ`],
        [`en.${LanguageIdMap.txtFeMale}`, `Female`],
        [`ko.${LanguageIdMap.txtFeMale}`, `여성`],
        [`jp.${LanguageIdMap.txtFeMale}`, `女性`],

        [`vi.${LanguageIdMap.txtFirstName}`, `Tên`],
        [`en.${LanguageIdMap.txtFirstName}`, `First Name`],
        [`ko.${LanguageIdMap.txtFirstName}`, `이름`],
        [`jp.${LanguageIdMap.txtFirstName}`, `名`],

        [`vi.${LanguageIdMap.txtFullname}`, `Họ & Tên`],
        [`en.${LanguageIdMap.txtFullname}`, `Fullname`],
        [`ko.${LanguageIdMap.txtFullname}`, `이름`],
        [`jp.${LanguageIdMap.txtFullname}`, `名前`],

        [`vi.${LanguageIdMap.txtInsertNut}`, `Vui lòng điền số hạt dẻ bạn muốn chuyển`],
        [`en.${LanguageIdMap.txtInsertNut}`, `Please insert the points`],
        [`ko.${LanguageIdMap.txtInsertNut}`, `보내고 싶은 포인트의 수를 입력 해주세요.`],
        [`jp.${LanguageIdMap.txtInsertNut}`, `送りたいポイントの数をご記入ください。`],

        [`vi.${LanguageIdMap.txtIsUseNut}`, `Sử dụng hạt dẻ`],
        [`en.${LanguageIdMap.txtIsUseNut}`, `Use your points`],
        [`ko.${LanguageIdMap.txtIsUseNut}`, `포인트 사용`],
        [`jp.${LanguageIdMap.txtIsUseNut}`, `ポイントを使用`],

        [`vi.${LanguageIdMap.txtLastName}`, `Họ`],
        [`en.${LanguageIdMap.txtLastName}`, `Last Name`],
        [`ko.${LanguageIdMap.txtLastName}`, `성`],
        [`jp.${LanguageIdMap.txtLastName}`, `姓`],

        [`vi.${LanguageIdMap.txtMale}`, `Nam`],
        [`en.${LanguageIdMap.txtMale}`, `Male`],
        [`ko.${LanguageIdMap.txtMale}`, `남성`],
        [`jp.${LanguageIdMap.txtMale}`, `男性`],

        [`vi.${LanguageIdMap.txtNewPassword}`, `Mật khẩu mới`],
        [`en.${LanguageIdMap.txtNewPassword}`, `New password`],
        [`ko.${LanguageIdMap.txtNewPassword}`, `새로운 비밀번호`],
        [`jp.${LanguageIdMap.txtNewPassword}`, `新パスワード`],

        [`vi.${LanguageIdMap.txtOr}`, `hoặc`],
        [`en.${LanguageIdMap.txtOr}`, `or`],
        [`ko.${LanguageIdMap.txtOr}`, `또는`],
        [`jp.${LanguageIdMap.txtOr}`, `または`],

        [`vi.${LanguageIdMap.txtPassword}`, `Mật Khẩu`],
        [`en.${LanguageIdMap.txtPassword}`, `Password`],
        [`ko.${LanguageIdMap.txtPassword}`, `비밀번호`],
        [`jp.${LanguageIdMap.txtPassword}`, `パスワード`],

        [`vi.${LanguageIdMap.txtPhone}`, `Số Điện Thoại`],
        [`en.${LanguageIdMap.txtPhone}`, `Phone Number`],
        [`ko.${LanguageIdMap.txtPhone}`, `휴대폰 번호`],
        [`jp.${LanguageIdMap.txtPhone}`, `携帯番号`],

        [`vi.${LanguageIdMap.txtQuestion}`, `Câu hỏi`],
        [`en.${LanguageIdMap.txtQuestion}`, `Question`],
        [`ko.${LanguageIdMap.txtQuestion}`, `질문`],
        [`jp.${LanguageIdMap.txtQuestion}`, `質問`],

        [`vi.${LanguageIdMap.txtReNewPassword}`, `Nhập lại mật khẩu mới`],
        [`en.${LanguageIdMap.txtReNewPassword}`, `Re-enter your password`],
        [`ko.${LanguageIdMap.txtReNewPassword}`, `새 암호를 다시 입력하십시오.`],
        [`jp.${LanguageIdMap.txtReNewPassword}`, `新パスワードを再入力してください。`],

        [`vi.${LanguageIdMap.txtReTransactionPassword}`, `Nhập lại mật khẩu giao dịch`],
        [`en.${LanguageIdMap.txtReTransactionPassword}`, `Retype transaction password`],
        [`ko.${LanguageIdMap.txtReTransactionPassword}`, `거래 암호를 다시 입력`],
        [`jp.${LanguageIdMap.txtReTransactionPassword}`, `取引パスワードを再入力`],

        [`vi.${LanguageIdMap.txtSex}`, `Giới tính`],
        [`en.${LanguageIdMap.txtSex}`, `Gender`],
        [`ko.${LanguageIdMap.txtSex}`, `성별`],
        [`jp.${LanguageIdMap.txtSex}`, `性別`],

        [`vi.${LanguageIdMap.txtTitle}`, `Tiêu đề`],
        [`en.${LanguageIdMap.txtTitle}`, `Title`],
        [`ko.${LanguageIdMap.txtTitle}`, `제목`],
        [`jp.${LanguageIdMap.txtTitle}`, `タイトル`],

        [`vi.${LanguageIdMap.txtTransactionOldPassword}`, `Mật khẩu cũ`],
        [`en.${LanguageIdMap.txtTransactionOldPassword}`, `Old password`],
        [`ko.${LanguageIdMap.txtTransactionOldPassword}`, `현재 비밀번호`],
        [`jp.${LanguageIdMap.txtTransactionOldPassword}`, `現在のパスワード`],

        [`vi.${LanguageIdMap.txtTransactionPassword}`, `Mật khẩu giao dịch`],
        [`en.${LanguageIdMap.txtTransactionPassword}`, `Transaction password`],
        [`ko.${LanguageIdMap.txtTransactionPassword}`, `거래 비밀번호`],
        [`jp.${LanguageIdMap.txtTransactionPassword}`, `取引パスワード`],

        [`vi.${LanguageIdMap.txtYourCurrentNut}`, `Số hạt dẻ đang có`],
        [`en.${LanguageIdMap.txtYourCurrentNut}`, `Your current points`],
        [`ko.${LanguageIdMap.txtYourCurrentNut}`, `모인 포인트`],
        [`jp.${LanguageIdMap.txtYourCurrentNut}`, `貯まったポイント`],

        [`vi.${LanguageIdMap.txtYourPassword}`, `Mật khẩu`],
        [`en.${LanguageIdMap.txtYourPassword}`, `Your password`],
        [`ko.${LanguageIdMap.txtYourPassword}`, `비밀번호`],
        [`jp.${LanguageIdMap.txtYourPassword}`, `パスワード`],

        [`vi.${LanguageIdMap.u_have}`, `Bạn đang có {{count}} {{promotion}}`],
        [`en.${LanguageIdMap.u_have}`, `You have {{count}} {{promotion}}`],
        [`ko.${LanguageIdMap.u_have}`, `고객은 {{count}} {{promotion}} 가지고`],
        [`jp.${LanguageIdMap.u_have}`, `お客様は {{count}} {{promotion}}持っている`],

        [`vi.${LanguageIdMap.u_just_used}`, `Bạn vừa dùng`],
        [`en.${LanguageIdMap.u_just_used}`, `You just used`],
        [`ko.${LanguageIdMap.u_just_used}`, `당신은 사용했습니다.`],
        [`jp.${LanguageIdMap.u_just_used}`, `あなたは使いました。`],

        [`vi.${LanguageIdMap.usePointName}`, `Tiêu`],
        [`en.${LanguageIdMap.usePointName}`, `Redeem`],
        [`ko.${LanguageIdMap.usePointName}`, `사용`],
        [`jp.${LanguageIdMap.usePointName}`, `使う`],

        [`vi.${LanguageIdMap.valid_date}`, `Thời hạn áp dụng`],
        [`en.${LanguageIdMap.valid_date}`, `Valid date`],
        [`ko.${LanguageIdMap.valid_date}`, `유효 기간`],
        [`jp.${LanguageIdMap.valid_date}`, `有効期限`],

        [`vi.${LanguageIdMap.valid_time}`, `Thời gian trong ngày`],
        [`en.${LanguageIdMap.valid_time}`, `Valid time`],
        [`ko.${LanguageIdMap.valid_time}`, `시간 제한`],
        [`jp.${LanguageIdMap.valid_time}`, `時間限定`],

        [`vi.${LanguageIdMap.verify_otp}`, `Xác Nhận Mã OTP`],
        [`en.${LanguageIdMap.verify_otp}`, `Verification code`],
        [`ko.${LanguageIdMap.verify_otp}`, `확인 코드`],
        [`jp.${LanguageIdMap.verify_otp}`, `検証コード`],

        [`vi.${LanguageIdMap.verify_otp_description}`, `Bạn sẽ nhận được tin nhắn với mã OTP trong vòng {{count}} giây nữa.`],
        [`en.${LanguageIdMap.verify_otp_description}`, `You will receive a message with a verification code (OTP) within {{count}} seconds.`],
        [`ko.${LanguageIdMap.verify_otp_description}`, `{{count}} 초 이내에 확인 코드 (OTP) 메시지를 받게됩니다.`],
        [`jp.${LanguageIdMap.verify_otp_description}`, `{{count}}秒以内に検証コード(OTP)のメッセージが届きます。`],

        [`vi.${LanguageIdMap.version}`, `Phiên bản`],
        [`en.${LanguageIdMap.version}`, `Version`],
        [`ko.${LanguageIdMap.version}`, `판`],
        [`jp.${LanguageIdMap.version}`, `版`],

        [`vi.${LanguageIdMap.vietnamese}`, `Tiếng Việt`],
        [`en.${LanguageIdMap.vietnamese}`, `Tiếng Việt`],
        [`ko.${LanguageIdMap.vietnamese}`, `Tiếng Việt`],
        [`jp.${LanguageIdMap.vietnamese}`, `Tiếng Việt`],

        [`vi.${LanguageIdMap.view_transaction_detail}`, `Xem chi tiết giao dịch`],
        [`en.${LanguageIdMap.view_transaction_detail}`, `View transaction details`],
        [`ko.${LanguageIdMap.view_transaction_detail}`, `거래 상세보기`],
        [`jp.${LanguageIdMap.view_transaction_detail}`, `取引詳細の表示`],

        [`vi.${LanguageIdMap.vnd}`, `đ`],
        [`en.${LanguageIdMap.vnd}`, `VND`],
        [`ko.${LanguageIdMap.vnd}`, `VND`],
        [`jp.${LanguageIdMap.vnd}`, `VND`],

        [`vi.${LanguageIdMap.voucher}`, `Voucher`],
        [`en.${LanguageIdMap.voucher}`, `Voucher`],
        [`ko.${LanguageIdMap.voucher}`, `쿠폰`],
        [`jp.${LanguageIdMap.voucher}`, `クーポン券`],

        [`vi.${LanguageIdMap.voucher_got}`, `Voucher đã nhận`],
        [`en.${LanguageIdMap.voucher_got}`, `Voucher got`],
        [`ko.${LanguageIdMap.voucher_got}`, `수취 한 쿠폰`],
        [`jp.${LanguageIdMap.voucher_got}`, `受取ったクーポン券`],

        [`vi.${LanguageIdMap.voucher_selected}`, `Chúc mừng!`],
        [`en.${LanguageIdMap.voucher_selected}`, `Voucher Selected`],
        [`ko.${LanguageIdMap.voucher_selected}`, `쿠폰을 성공적으로 수령했습니다.`],
        [`jp.${LanguageIdMap.voucher_selected}`, `クーポン券を成功に受取りました。`],

        [`vi.${LanguageIdMap.voucher_u_can_get}`, `{{promotion}} bạn có thể nhận`],
        [`en.${LanguageIdMap.voucher_u_can_get}`, `{{promotion}} you can get`],
        [`ko.${LanguageIdMap.voucher_u_can_get}`, `{{promotion}} 너는 얻을 수있다.`],
        [`jp.${LanguageIdMap.voucher_u_can_get}`, `{{promotion}} 得られる`],

        [`vi.${LanguageIdMap.voucher_used}`, `Voucher đã dùng`],
        [`en.${LanguageIdMap.voucher_used}`, `Voucher used`],
        [`ko.${LanguageIdMap.voucher_used}`, `사용 된 쿠폰`],
        [`jp.${LanguageIdMap.voucher_used}`, `使用されたクーポン券`],

        [`vi.${LanguageIdMap.waiting_for_approve}`, `Đang chờ duyệt`],
        [`en.${LanguageIdMap.waiting_for_approve}`, `Awaiting Approval`],
        [`ko.${LanguageIdMap.waiting_for_approve}`, `승인 대기`],
        [`jp.${LanguageIdMap.waiting_for_approve}`, `承認待ち`],

        [`vi.${LanguageIdMap.range_price}`, `Từ {{range_from}}{{unit}} đến {{range_to}}{{unit}}`],
        [`en.${LanguageIdMap.range_price}`, `From {{range_from}}{{unit}} to {{range_to}}{{unit}}`],
        [`ko.${LanguageIdMap.range_price}`, `{{range_from}}{{unit}}から{{range_to}}{{unit}}まで`],
        [`jp.${LanguageIdMap.range_price}`, `{{range_from}}{{unit}} 에서 {{range_to}}{{unit}} 까지`],

        [`vi.${LanguageIdMap.map}`, `Bản đồ`],
        [`en.${LanguageIdMap.map}`, `Map`],
        [`ko.${LanguageIdMap.map}`, `지도`],
        [`jp.${LanguageIdMap.map}`, `地図`],

        [`vi.${LanguageIdMap.menu}`, `Thực đơn`],
        [`en.${LanguageIdMap.menu}`, `Menu`],
        [`ko.${LanguageIdMap.menu}`, `메뉴`],
        [`jp.${LanguageIdMap.menu}`, `メニュー`],


        [`vi.${LanguageIdMap.weekday}`, `Ngày thường`],
        [`en.${LanguageIdMap.weekday}`, `Weekdays`],
        [`ko.${LanguageIdMap.weekday}`, `평일`],
        [`jp.${LanguageIdMap.weekday}`, `平日`],

        [`vi.${LanguageIdMap.write_a_comment}`, `Viết bình luận`],
        [`en.${LanguageIdMap.write_a_comment}`, `Write a comment`],
        [`ko.${LanguageIdMap.write_a_comment}`, `댓글`],
        [`jp.${LanguageIdMap.write_a_comment}`, `コメント`],

        [`vi.${LanguageIdMap.yes}`, `Đồng ý`],
        [`en.${LanguageIdMap.yes}`, `Yes`],
        [`ko.${LanguageIdMap.yes}`, `동의`],
        [`jp.${LanguageIdMap.yes}`, `同意`],

        [`vi.${LanguageIdMap.you_must_comment}`, `* Cảm ơn bạn. Nhận xét của bạn rất có giá trị đối với chúng tôi. Bạn vui lòng đánh giá cửa hàng hoặc chọn nhắc lại sau.`],
        [`en.${LanguageIdMap.you_must_comment}`, `* Thank you very much. Your review is very valuable to us. Please complete the below questions to submit your rating.`],
        [`ko.${LanguageIdMap.you_must_comment}`, `* 정말 감사했습니다. 당신의 리뷰는 우리에게 매우 중요합니다. 당신의 평가를 보내려면 다음의 질문을 완료하십시오.`],
        [`jp.${LanguageIdMap.you_must_comment}`, `* どうもありがとうございました。あなたのレビューは私たちにとって非常に貴重です。あなたの評価を送信するには、以下の質問を完了してください。`],

        [`vi.${LanguageIdMap.you_need_login}`, `Bạn cần đăng nhập để xem phần hấp dẫn này`],
        [`en.${LanguageIdMap.you_need_login}`, `You need to login to unlock this section.`],
        [`ko.${LanguageIdMap.you_need_login}`, `이 항목의 잠금을 해제하기 위해 계정 암호를 사용하여 로그인해야합니다.`],
        [`jp.${LanguageIdMap.you_need_login}`, `この項目のロックを解除するため、カウントのパスワードを使ってログインする必要があります。`],

        [`vi.${LanguageIdMap.your_current_wallet}`, `Ví của bạn`],
        [`en.${LanguageIdMap.your_current_wallet}`, `Your wallet`],
        [`ko.${LanguageIdMap.your_current_wallet}`, `내 지갑`],
        [`jp.${LanguageIdMap.your_current_wallet}`, `マイ財布`],

        [`vi.${LanguageIdMap.your_total_point}`, `Tổng số hạt dẻ của bạn:`],
        [`en.${LanguageIdMap.your_total_point}`, `Your total points:`],
        [`ko.${LanguageIdMap.your_total_point}`, `모인 포인트:`],
        [`jp.${LanguageIdMap.your_total_point}`, `貯まったポイント:`],

        [`vi.${LanguageIdMap.notification_title_turn_on_camera}`, `Cho phép truy cập`],
        [`en.${LanguageIdMap.notification_title_turn_on_camera}`, `Allow to access`],
        [`ko.${LanguageIdMap.notification_title_turn_on_camera}`, `카메라의 권한`],
        [`jp.${LanguageIdMap.notification_title_turn_on_camera}`, `カメラのアクセス許可`],
    ]),
}


try {
    const value = localStorage.getItem('currentLanguage');
    // if (value !== null && value !== undefined && value !== "undefined") {
    //     LanguageDefine.currentLanguage = value;
    // } else {
    //default english
    localStorage.setItem('currentLanguage', LanguageDefine.languageList[0]);
    LanguageDefine.currentLanguage = LanguageDefine.languageList[0];
    // }
} catch (error) {
    LanguageDefine.currentLanguage = LanguageDefine.languageList[0];
}

const Language = {
    languageDefineVietNam: languageDefineVietNam,
    languageDefineJapan: languageDefineJapan,
    setLanguage(lang) {
        LanguageDefine.currentLanguage = lang;
        try {
            localStorage.setItem('currentLanguage', lang);
        } catch (error) {

        }
    },
    getLanguageList() {
        return LanguageDefine.languageList;
    }
    ,
    getLanguageImage(lang = undefined) {
        return "/images/lang_" + (lang ? lang : LanguageDefine.currentLanguage) + "png"
    },

    //paramsStyle: {cb:{background:"#0f0"},cb2:{background:"#ff0"}}
    //wrapperStyle: {background:"#00f"}
    //fieldNeedParamForVisible -> example below : {hours:hour,days:day} -> no params hour, hours will not visible, same with days
    //`Cancel until {{day}} {{days}} {{hour}} {{hours}} before departure: {{percent}}%`
    getLanguage(languageIdMap, params = {}, paramsStyle = undefined, wrapperStyle = undefined, fieldNeedParamForVisible = {}, href = {}) {
        let result = LanguageDefine.language.get(LanguageDefine.currentLanguage + languageIdMap);
        if (result === undefined || result === null) {
            result = LanguageDefine.language.get(LanguageDefine.languageList[1] + languageIdMap);
        }
        if (result === undefined || result === null) {
            result = LanguageDefine.language.get(LanguageDefine.languageList[0] + languageIdMap);
        }
        if (result === undefined || result === null) {
            return ""
        }

        Object.keys(fieldNeedParamForVisible).forEach((param) => {
            if (result.includes(`{{${param}}}`)) {
                if (params[fieldNeedParamForVisible[param]] !== undefined) {
                    let _value = this.getLanguage(LanguageIdMap[param]);
                    if(_value) {
                        _value = _value.toLowerCase();
                    } else {
                        _value = ""
                    }
                    result = result.split(`{{${param}}}`).join(_value );
                } else {
                    result = result.split(`{{${param}}}`).join("");
                    result = result.split(`{{${fieldNeedParamForVisible[param]}}}`).join("");
                }
                delete fieldNeedParamForVisible[param];
            }
        })

        if (wrapperStyle || paramsStyle) {
            let paramFound = [];
            let leftBraceFound = [];
            let rightBraceFound = [];
            for (let index = 0; index < 10; index++) {
                let findLeft = result.indexOf(`{{`, leftBraceFound.length > 0 ? leftBraceFound[leftBraceFound.length - 1] + 1 : 0);
                if (findLeft < 0) {
                    break;
                }
                let findRight = result.indexOf(`}}`, findLeft)
                if (findRight < 0) {
                    break;
                }
                paramFound.push(result.substring(findLeft + 2, findRight));
                leftBraceFound.push(findLeft);
                rightBraceFound.push(findRight);
            }
            return <div style={{ display: "inline", ...(wrapperStyle ? wrapperStyle : {}) }}>
                {paramFound.map((p, index) => {
                    return <div style={{ display: "inline" }}>
                        {result.substring(index === 0 ? 0 : rightBraceFound[index - 1] + 2, leftBraceFound[index])}
                        {href[p]
                            ? <a
                                href={href[p]}
                                onClick={e => {
                                    e.preventDefault();
                                    window.open(href[p], '_blank');
                                }}
                                style={{
                                    display: "inherit",
                                    ...((paramsStyle && paramsStyle[paramFound[index]]) ? paramsStyle[paramFound[index]] : {})
                                }}>{params[p]}</a>
                            : <div style={{
                                display: "inherit",
                                ...((paramsStyle && paramsStyle[paramFound[index]]) ? paramsStyle[paramFound[index]] : {})
                            }}>{params[p]}</div>}
                    </div>
                })}
                {result.substring(rightBraceFound.length > 0 ?
                    rightBraceFound[rightBraceFound.length - 1] + 2 : 0)}
            </div>
        }


        Object.keys(params).forEach((param) => {
            if (result.includes(`{{${param}}}`)) {
                result = result.split(`{{${param}}}`).join(params[param]);
                delete params[param];
            }
        })

        while (true) {
            let findLeft = result.indexOf(`{{`)
            if (findLeft < 0) {
                break;
            }
            let findRight = result.indexOf(`}}`, findLeft)
            if (findRight < 0) {
                break;
            }
            result = result.substring(0, findLeft) + result.substring(findRight + 2);
        }
        return result;
    },
    getLanguageName() {
        return LanguageDefine.currentLanguage;
    },
    getFullnameLanguage: getFullnameLanguage,
}

export default Language;

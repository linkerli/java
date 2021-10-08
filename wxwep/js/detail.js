window.onload = async function () {

  let magaId = getQueryVariable('magaId');
  let code = getQueryVariable('code');

  /// 当前选中的助力对象的id
  let helpUserId;
  /// 当前购买的数量
  let count = 0;

  /// 快捷选择的是的index
  let countIndex = 0;

  let price = 6.0;

  checkLoginStatus();


  function init() {
    getMagazineDetail();
    getMagazineRankList();
    wxConfig();

    $('.modal-confirm').click(() => createTradeOrder());
    $('.modal-cancel').click(() => hideModal());

    $('.top-button').click(() => showModal());

    $('.modal-item').eq(0).click(() => changeCountIndex(0, 1));
    $('.modal-item').eq(1).click(() => changeCountIndex(1, 10));
    $('.modal-item').eq(2).click(() => changeCountIndex(2, 100));
    $('.modal-item').eq(3).click(() => changeCountIndex(3, 1000));

    $('#modal-input').click(() => changeCountIndex(4, 1));
    $('#modal-input').on('input', (e) => {
      let val;
      if (e && e.delegateTarget && e.delegateTarget.value) {
        val = e.delegateTarget.value;
      } else {
        val = 0;
      }
      if (val == '' || val <= 0) {
        console.log('sdfsdfsd');
        $(this).val(1);
      }
      changeCountIndex(4, val);
      $('.modal-item-input .modal-item-price').text(`￥ ${val * price}`);
    })


    $('.to-home').click(() => {
      window.location.href = `../list.html?code=${code}`;
    });

    $('.to-my').click(() => {
      window.location.href = `../my.html?code=${code}`;
    });
  }

  /// 获取详情列表
  async function getMagazineDetail() {
    let resp = await get(`/api/magazine/getMagazineDetail?magaId=${magaId}`);

    /// 增加标题
    $('title').text(resp.title);
    document.title = resp.title;

    price = resp.price;

    $('.top-title').text(`${resp.year}年${resp.month}月 ${resp.issue}`);
    let pic;
    /*if (!!resp.itemPreviewPic) {
      pic = resp.itemPreviewPic.split(',')[0];
    }*/

    if (!!resp.itemCover) {
        pic = resp.itemCover;
    }

    $('.top-container-background,.top-img').css({
      'background': `url(${pic}) center`,
      'background-position': 'top',
      'background-size': 'cover'
    });
    $('.top-name').text(resp.title);
    $('.top-detail').html(`已有 <strong>${resp.readCount}</strong> 本订阅`);
  }

  /// 获取详情列表
  async function getMagazineRankList() {
    let resp = await get(`/api/magazine/getMagazineRankList?magaId=${magaId}`);

    if (resp.length > 0) {
      $('#top1').css({ 'opacity': 1 });
      $('#top1 .top2-image').css({
        'background': `url(${resp[0].userHeadPic}) center`,
        'background-position': 'top',
        'background-size': 'cover',
      });
      $('#top1 .list-top-name .list-top-name-text').text(resp[0].userName);
      $('#top1 .top-orange').text(`${resp[0].helpReadCount} 本`);
      $('#top1 .top-star').click(() => {
        showModal(resp[0].userId);
      });
    }

    if (resp.length > 1) {
      $('#top2').css({ 'opacity': 1 });
      $('#top2 .top2-image').css({
        'background': `url(${resp[1].userHeadPic}) center`,
        'background-position': 'top',
        'background-size': 'cover',
      });
      $('#top2 .list-top-name .list-top-name-text').text(resp[1].userName);
      $('#top2 .top-orange').text(`${resp[1].helpReadCount} 本`);
      $('#top2 .top-star').click(() => {
        showModal(resp[1].userId);
      });
    }

    if (resp.length > 2) {
      $('#top3').css({ 'opacity': 1 });
      $('#top3 .top2-image').css({
        'background': `url(${resp[2].userHeadPic}) center`,
        'background-position': 'top',
        'background-size': 'cover',
      });
      $('#top3 .list-top-name .list-top-name-text').text(resp[2].userName);
      $('#top3 .top-orange').text(`${resp[2].helpReadCount} 本`);
      $('#top3 .top-star').click(() => {
        showModal(resp[2].userId);
      });
    }

    if (resp.length > 3) {
      for (let i = 3; i < resp.length; i++) {
        let option = resp[i];
        let $item = $('<div class="left-list-item"></div>');

        let pic;
        if (!!option.itemPreviewPic) {
          pic = option.itemPreviewPic.split(',')[0];
        }
        $item.append(`
        <div class="item-info">
          <span class="item-index">${i + 1}</span>
          <div class="item-avatar-container">
            <div class="item-avatar" style="background: url(${option.userHeadPic}) center; background-size: cover;"></div>
          </div>

          <div class="item-name-count">
            <span class="item-name">${option.userName}</span>
            <span class="item-count">${option.helpReadCount} 本</span>
          </div>
        </div>
        `);

        let $topStar = $('<div class="top-star"></div>');
        $topStar.click(() => {
          showModal(resp[i].userId);
        });
        $topStar.append('<img class="star-img" src="./images/star.png" />');
        $topStar.append('<span class="star-text">助力</span>');

        $item.append($topStar);

        $('#left-list-wrapper').append($item);
      }
    }
  }

  /// 创建订单
  async function createTradeOrder() {
    $.showLoading("数据加载中");

    if (!count || count <= 0) {
      return;
    }

    const query = {
      productId: magaId,
      sourceType: 2,
      count: count
    }

    if (helpUserId || helpUserId == 0) {
      query['helpUserId'] = helpUserId;
    }

    let resp = await post(`/api/order/createTradeOrder`, query);

    if (!resp.code) {
      pay(resp.onlineTradeInfo);
    } else {
      $.toast(resp.message, "text");
    }

    $.hideLoading();
  }

  /// 打开购买弹层
  function showModal(userId) {
    helpUserId = userId;
    console.log('>>>>>>> helpUserId' + helpUserId);
    count = 1;
    countIndex = 0;
    changeCheckBox(countIndex);

    $('.modal-background').show();

    $('.modal-item').each(function (index, ele) {
      let count = parseInt($(this).find('.modal-item-count').text());

      $(this).find('.modal-item-price').text(`￥ ${count * price}`);
    });

  }

  /// 关闭购买弹层
  function hideModal() {
    helpUserId = null;
    count = 0;
    countIndex = 0;
    $('.modal-background').hide();
  }

  /// 修改countIndex
  function changeCountIndex(index, cou) {
    countIndex = index;
    count = cou;
    changeCheckBox(index);
  }

  /// 根据不同的countIndex，选中不同的checkbox
  function changeCheckBox(index) {
    $('.modal-item .checkbox-inner').css({ 'opacity': 0 });
    $('.modal-item').eq(index).find('.checkbox-inner').css({ 'opacity': 1 });
    if (index != 4) {
      resetInput();
    }
  }

  /// reset Input 
  function resetInput() {
    $('#modal-input').val('');
    $('.modal-item-input .modal-item-price').text('￥ 0');
  }

  /// 配置wx jssdk
  async function wxConfig() {
    //配置jsssdk
    var jssignRes = await get('/wxMpSignature?url=' + encodeURIComponent(window.location.href));
    if (!jssignRes.code) {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: jssignRes.appId, // 必填，公众号的唯一标识
        timestamp: jssignRes.timestamp, // 必填，生成签名的时间戳
        nonceStr: jssignRes.nonceStr, // 必填，生成签名的随机串
        signature: jssignRes.signature,// 必填，签名
        jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
      });
    }
  }

  /// 依次检查本地的token、连接上的code，判断是否需要弹登录弹窗
  async function checkLoginStatus() {
    /// 检查token是否过期
    let loginStatus = await get('/checkMpLoginStatus');
    if (loginStatus) {
      init();
      return;
    }
    /// 如果token过期，则查看code是否存在
    if (code) {
      var loginRes = await get('/mpLogin?code=' + code)
      deleteParamFromLocationHref('code');
      if (loginRes.token) {
        console.log('登录成功');
        init();
      } else {
        /// 显示登录弹层
        $('.modal-confirm-login').click(() => {
          login();
        });
        $('.modal-background-login').show();
      }
    } else {
      /// 显示登录弹层
      $('.modal-confirm-login').click(() => {
        login();
      });
      $('.modal-background-login').show();
      // 如果未携带code，则直接跳登录页面
    }
  }

  /// 删除特定的query
  function deleteParamFromLocationHref(param) {
    let href = window.location.href;
    let hrefSplit = href.split('?');
    if (!hrefSplit || hrefSplit.length <= 1) {
      return;
    }
    let pathname = hrefSplit[0];
    let queryStr = hrefSplit[1];
    let queries = queryStr.split('&');
    let queriesArr = queries.map(item => item.split('='));
    let filterQueriesArr = queriesArr.filter(item => item[0] != param);
    filterQueriesArr.map(item => {
      if (pathname.indexOf('?') >= 0) {
        pathname += `&${item[0]}=${item[1]}`
      } else {
        pathname += `?${item[0]}=${item[1]}`
      }
    });
    window.history.pushState(null, null, pathname);
  }

  /// 跳登录
  function login() {
    //构造redirect值
    var redirect = window.location.href;
    //跳转授权
    //https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2c7183c739c531e0&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect
    var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb7194003cf097d0c&redirect_uri=";
    url += encodeURIComponent(redirect);
    url += "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
    window.location.replace(url)
  }

  //调用微信支付
  function pay(onlineTradeInfo) {
    wx.ready(function () {
      wx.chooseWXPay({
        timestamp: onlineTradeInfo.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: onlineTradeInfo.nonceStr, // 支付签名随机串，不长于 32 位
        package: onlineTradeInfo.packageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
        signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: onlineTradeInfo.sign, // 支付签名
        success: function (res) {
          // 支付成功后跳success页
          isPaying = false;
          window.location.href = `./my.html?code=${code}&magaId=${magaId}`;
        },
        cancel: function (r) {
          isPaying = false;
          // alert('取消支付');
        },
        fail: function (error) {
          isPaying = false;
          alert(error);
        }
      });
    });
  }
}

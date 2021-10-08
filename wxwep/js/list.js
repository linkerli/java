window.onload = async function () {

  var code = getQueryVariable('code');

  checkLoginStatus();
  getMagazineViewDto();

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

  /// 依次检查本地的token、连接上的code，判断是否需要弹登录弹窗
  async function checkLoginStatus() {
    /// 检查token是否过期
    let loginStatus = await get('/checkMpLoginStatus');
    if (loginStatus) {
      return;
    }
    /// 如果token过期，则查看code是否存在
    if (code) {
      var loginRes = await get('/mpLogin?code=' + code)
      deleteParamFromLocationHref('code');
      if (loginRes.token) {
        console.log('登录成功');
      } else {
        /// 显示登录弹层
        $('.modal-confirm').click(() => {
          login();
        });
        $('.modal-background').show();
      }
    } else {
      /// 显示登录弹层
      $('.modal-confirm').click(() => {
        login();
      });
      $('.modal-background').show();
      // 如果未携带code，则直接跳登录页面
    }
  }

  /// 跳登录
  function login() {
    //构造redirect值
    var redirect = "http://h5.etwas.cn/list.html";
    //跳转授权
    //https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2c7183c739c531e0&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect
    var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb7194003cf097d0c&redirect_uri=";
    url += encodeURIComponent(redirect);
    url += "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
    window.location.replace(url)
  }


  /// 获取首页列表
  async function getMagazineViewDto() {
    let createResp = await get('/api/magazine/getMagazineViewDto');
    if (createResp.magazineDtoList && createResp.magazineDtoList.length > 0) {
      let newList = [];
      let temp = [];

      for (let i = 0; i < createResp.magazineDtoList.length; i++) {
        temp.push(createResp.magazineDtoList[i]);
        if ((i != 0 && i % 2 == 0) || i == createResp.magazineDtoList.length - 1) {
          newList.push(temp);
          temp = [];
        }
      }

      let listContainer = $('.grid-container');
      for (let i = 0; i < newList.length; i++) {
        let $row = $('<div class="weui-grids"></div>');

        for (let index = 0; index < newList[i].length; index++) {
          let option = newList[i][index];
          let $item = $('<div class="weui-grid item"></div>');
          $item.click(() => {
            window.location.href = `./detail.html?magaId=${option.magId}&code=${code}`;
          });

          let pic;
          if (!!option.itemCover) {
            pic = option.itemCover;
          }
          $item.append(`<div class="item-image" style="background: url(${pic}) top center; background-size: cover;"></div>`);
          $item.append(`<span class='item-time'>${option.year}年${option.month}月</span>`);
          $item.append(`<span class='item-name'>${option.title}</span>`);
          $item.append(`<span class='item-detail'>已有 <strong>${option.readCount}</strong> 本订阅</span>`);
          $item.append(`<span class='item-detail bold'>查看详情 &#62;</span>`);
          $row.append($item);
        }

        listContainer.append($row);
      }
    }
  }
}

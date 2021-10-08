window.onload = async function () {

  var code = getQueryVariable('code');
  var magaId = getQueryVariable('magaId');

  getWxUserDto();
  getUserReadMagazineList();

  $('.modal-cancel').click(() => {
    $('.modal-background').hide();
  });

  $('.to-home').click(() => {
    window.location.href = `../list.html?code=${code}`;
  });

  /// 获取详情列表
  async function getWxUserDto() {

    $.showLoading("数据加载中");

    let resp = await get(`/api/userCenter/getWxUserDto`);

    $.hideLoading();

    $('.avatar').css({
      'background': `url(${resp.userHeadPic}) center`,
      'background-position': 'top',
      'background-size': 'cover'
    });
    $('.name').text(resp.userNickName);
  }

  /// 获取详情列表
  async function getUserReadMagazineList() {
    let resp = await get(`/api/userCenter/getUserReadMagazineList`);

    if (resp && resp.length > 0) {
      let newList = [];
      let temp = [];

      /// 如果链接上携带有magaId，则主动弹出后，并删除magaId
      if (magaId) {
        for (let i = 0; i < resp.length; i++) {
          if (resp[i].magaId == magaId) {
            showModal(resp[i].preSmallCode);
            deleteParamFromLocationHref('magaId');
          }
        }
      }

      for (let i = 0; i < resp.length; i++) {
        temp.push(resp[i]);
        if ((i != 0 && i % 2 == 0) || i == resp.length - 1) {
          newList.push(temp);
          temp = [];
        }
      }

      let listContainer = $('#sub-list-container');
      for (let i = 0; i < newList.length; i++) {
        let $row = $('<div class="weui-grids"></div>');

        for (let index = 0; index < newList[i].length; index++) {
          let option = newList[i][index];
          let $item = $('<div class="weui-grid item"></div>');
          $item.click(() => {
            showModal(option.preSmallCode);
          });

          let pic;
          if (!!option.itemCover) {
            pic = option.itemCover;
          }

          $item.append(`<div class="item-image" style="background: url(${pic}) top center; background-size: cover;"></div>`);
          $item.append(`<span class='item-name'>${option.title}</span>`);
          $item.append(`<span class='item-detail'>已有 ${option.userReadCodeCount} 本订阅</span>`);
          $item.append(`<span class='item-detail has-background'>查看详情</span>`);
          $row.append($item);
        }

        listContainer.append($row);
      }
    } else {
      $('.nomore').show();
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

  /// 打开二维码弹层
  function showModal(currentQr) {
    $('.modal-img').attr({ 'src': currentQr });
    $('.modal-background').show();
  }
}

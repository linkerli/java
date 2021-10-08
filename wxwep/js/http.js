var BAAE_URL = '//api.etwas.cn';
// var BAAE_URL = '//10.128.5.11:8080/h5';

//设置cookie
function setCookie(key, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = key + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

//取回cookie
function getCookie(key) {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(key + "=");
    if (c_start != -1) {
      c_start = c_start + key.length + 1;
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
}
function initHeader() {
  var token = getCookie('TOKEN')
  if (token) {
    return { Authorization: 'bearer' + token }
  } else {
    return {}
  }
}

function initResponse(response) {
  if (response.headers.TOKEN || response.headers.token || response.data.token) {
    console.log('>>>>>>>>>>set TOken');
    setCookie('TOKEN', response.headers.TOKEN || response.headers.token || response.data.token, 10);
  }
}

async function get(url) {
  var header = initHeader()
  try {
    const response = await axios({
      method: 'get',
      url: BAAE_URL + url,
      headers: header,
    });
    console.log(response);
    initResponse(response);
    return response.data
  } catch (error) {
    console.error(error);
  }
}

async function post(url, data) {
  var header = initHeader()
  try {
    const response = await axios({
      method: 'post',
      url: BAAE_URL + url,
      headers: header,
      data: data
    });
    console.log(response);
    initResponse(response);
    return response.data
  } catch (error) {
    console.error(error);
  }
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return (false);
}

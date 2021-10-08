import http from '../utils/http';

/// [UC5]根据杂志id获取用户关联的阅读码列表
export const getMagazineReadCodeList = (magaId) => http({
  method: 'POST',
  url: '/api/userCenter/getMagazineReadCodeList',
  query: {
    magaId: magaId
  }
});

/// [UC4]获取用户已订阅的杂志列表
export const getUserReadMagazineList = () => http({
  url: '/api/userCenter/getUserReadMagazineList',
});

/// [UC1]获取登录人用户信息
export const getWxUserDto = () => http({
  url: '/api/userCenter/getWxUserDto',
});

/// [UC2]获取更新用户名称和头像
export const updateUserInfo = (params) => http({
  method: 'POST',
  url: '/api/userCenter/updateUserInfo',
  data: params
});

/// [UC2]获取更新用户名称和头像
export const createQiNiuUploadToken = () => http({
  method: 'POST',
  url: '/api/userCenter/createQiNiuUploadToken'
});
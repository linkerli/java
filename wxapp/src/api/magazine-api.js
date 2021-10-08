import http from '../utils/http';

/// 首页接口
export const getMagazineViewDto = () => http({
  url: '/api/magazine/getMagazineViewDto'
});


/// 获取杂志详情接口
export const getMagazineDetail = (magaId) => http({
  url: `/api/magazine/getMagazineDetail?magaId=${magaId}`
});

// [M1]检查当前用户是否有订阅过该杂志
export const checkUserGetMagazine = (magaId) => http({
  method: 'POST',
  url: `/api/magazine/checkUserGetMagazine?magaId=${magaId}`
});

// [M4]获取杂志详情页排行版列表
export const getMagazineRankList = (magaId) => http({
  url: '/api/magazine/getMagazineRankList',
  data: {
    magaId: magaId
  }
});

// [M2]验证券码获取H5链接
export const verifyMagazineCode = (param = {
  "magaId": 0,
  "readCode": "",
  "userInputOrNot": true
}) => http({
  method: 'POST',
  url: '/api/magazine/verifyMagazineCode',
  data: param
});
import http from '../utils/http';

/// 首页接口
export const createTradeOrder = (param = {
  "count": 0,
  "helpUserId": 0,
  "productId": 0,
  "sourceType": 0
}) => http({
  method: 'POST',
  url: '/api/order/createTradeOrder',
  data: param
});
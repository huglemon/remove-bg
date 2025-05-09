/**
 * 支付服务模块 - 用于处理与Z-Pay支付API的交互
 * 接口地址：https://zpayz.cn/
 */

import md5 from 'crypto-js/md5';

// 支付API基础配置
const API_CONFIG = {
  // 支付API基础URL
  API_BASE_URL: 'https://zpayz.cn',
  
  // 商户信息
  PID: '2024121314373918',
  KEY: '3necHYfI5agGVLzLszBM2P9kWIgROKZM',
  
  // 回调地址 (使用相对路径)
  NOTIFY_URL: 'https://inwind.cn/api/payment/notify',
  RETURN_URL: 'https://inwind.cn/api/payment/return'
};

/**
 * 生成MD5签名
 * @param {Object} params - 参数对象
 * @returns {string} - MD5签名
 */
function generateSign(params) {
  // 1. 按照参数名ASCII码从小到大排序
  const keys = Object.keys(params).sort();
  
  // 2. 排除sign和sign_type以及空值
  const filteredKeys = keys.filter(key => 
    key !== 'sign' && 
    key !== 'sign_type' && 
    params[key] !== '' && 
    params[key] !== null && 
    params[key] !== undefined
  );
  
  // 3. 拼接成URL键值对格式
  const stringParams = filteredKeys.map(key => `${key}=${params[key]}`).join('&');
  
  // 4. 拼接商户密钥并进行MD5加密
  const signStr = stringParams + API_CONFIG.KEY;
  return md5(signStr).toString().toLowerCase();
}

/**
 * 创建订单并生成支付表单数据（页面跳转支付方式）
 * @param {Object} orderData - 订单数据
 * @returns {Object} - 支付表单数据
 */
export function createPaymentForm(orderData) {
  // 构建请求参数
  const params = {
    pid: API_CONFIG.PID,
    type: orderData.payType || 'wxpay', // 默认微信支付
    out_trade_no: orderData.mchtOrderNo,
    notify_url: API_CONFIG.NOTIFY_URL,
    return_url: API_CONFIG.RETURN_URL,
    name: orderData.subject,
    money: (orderData.paymentAmount / 100).toFixed(2), // 转换为元，保留两位小数
    param: orderData.param || '',
    sign_type: 'MD5'
  };
  
  // 生成签名
  params.sign = generateSign(params);
  
  // 返回表单提交数据
  return {
    apiUrl: `${API_CONFIG.API_BASE_URL}/submit.php`,
    formData: params
  };
}

/**
 * 创建API支付订单，用于获取支付二维码
 * @param {Object} orderData - 订单数据
 * @returns {Promise<Object>} - 支付结果
 */
export async function createApiOrder(orderData) {
  try {
    // 构建请求参数
    const params = {
      pid: API_CONFIG.PID,
      type: orderData.payType || 'wxpay', // 默认微信支付
      out_trade_no: orderData.mchtOrderNo,
      notify_url: API_CONFIG.NOTIFY_URL,
      name: orderData.subject,
      money: (orderData.paymentAmount / 100).toFixed(2), // 转换为元，保留两位小数
      clientip: orderData.clientIp || '127.0.0.1',
      device: orderData.device || 'pc',
      param: orderData.param || '',
      sign_type: 'MD5'
    };
    
    // 生成签名
    params.sign = generateSign(params);
    
    // 创建FormData对象
    const formData = new FormData();
    Object.keys(params).forEach(key => {
      formData.append(key, params[key]);
    });
    
    // 发送请求
    const response = await fetch(`${API_CONFIG.API_BASE_URL}/mapi.php`, {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (result.code === 1) {
      return {
        success: true,
        data: {
          mchtOrderNo: orderData.mchtOrderNo,
          tradeNo: result.trade_no,
          orderId: result.O_id,
          qrCodeUrl: result.qrcode || result.img, // 二维码链接或图片
          payUrl: result.payurl, // 支付跳转URL
          payType: orderData.payType
        }
      };
    } else {
      return {
        success: false,
        errorMsg: result.msg,
        errorCode: result.code
      };
    }
  } catch (error) {
    console.error('创建API支付订单失败:', error);
    return {
      success: false,
      errorMsg: error.message,
      errorCode: 'API_ERROR'
    };
  }
}

/**
 * 查询订单支付状态
 * @param {string} orderNo - 商户订单号
 * @returns {Promise<Object>} - 查询结果
 */
export async function queryOrderStatus(orderNo) {
  try {
    const url = `${API_CONFIG.API_BASE_URL}/api.php?act=order&pid=${API_CONFIG.PID}&key=${API_CONFIG.KEY}&out_trade_no=${orderNo}`;
    
    const response = await fetch(url);
    const result = await response.json();
    
    if (result.code === 1) {
      return {
        success: true,
        data: {
          mchtOrderNo: result.out_trade_no,
          tradeNo: result.trade_no,
          payStatus: result.status === 1 ? 'PAY_SUCCEED' : 'NOT_PAYED',
          paymentAmount: parseFloat(result.money) * 100, // 转换为分
          subject: result.name,
          payTime: result.endtime
        }
      };
    } else {
      return {
        success: false,
        errorMsg: result.msg,
        errorCode: result.code
      };
    }
  } catch (error) {
    console.error('查询订单失败:', error);
    return {
      success: false,
      errorMsg: error.message,
      errorCode: 'API_ERROR'
    };
  }
}

/**
 * 验证支付结果通知
 * @param {Object} notifyData - 通知数据
 * @returns {boolean} - 验证结果
 */
export function verifyPaymentNotify(notifyData) {
  // 获取签名
  const receivedSign = notifyData.sign;
  
  // 验证签名
  const calculatedSign = generateSign(notifyData);
  
  // 验证交易状态
  const isSuccessStatus = notifyData.trade_status === 'TRADE_SUCCESS';
  
  return receivedSign === calculatedSign && isSuccessStatus;
}

/**
 * 处理退款请求
 * @param {Object} refundData - 退款数据
 * @returns {Promise<Object>} - 退款结果
 */
export async function createRefund(refundData) {
  try {
    // 构建请求参数
    const params = {
      act: 'refund',
      pid: API_CONFIG.PID,
      key: API_CONFIG.KEY,
      out_trade_no: refundData.orderNo,
      money: (refundData.refundAmount / 100).toFixed(2) // 转换为元，保留两位小数
    };
    
    // 发送请求
    const formData = new FormData();
    Object.keys(params).forEach(key => {
      formData.append(key, params[key]);
    });
    
    const response = await fetch(`${API_CONFIG.API_BASE_URL}/api.php`, {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (result.code === 1) {
      return {
        success: true,
        message: result.msg
      };
    } else {
      return {
        success: false,
        errorMsg: result.msg,
        errorCode: result.code
      };
    }
  } catch (error) {
    console.error('退款请求失败:', error);
    return {
      success: false,
      errorMsg: error.message,
      errorCode: 'API_ERROR'
    };
  }
} 
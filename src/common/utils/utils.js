'use strict';

/**
 * 判断是否是对象
 * @param  {Object}  obj 传入的需要判断的对象
 * @return {Boolean}     判断结果
 */
export function isObject(obj) {
  return obj !== null && typeof obj === 'object' && Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * 判断是否为函数
 * @param  {Function}  val 传入的需要判断的函数
 * @return {Boolean}       判断结果
 */
export function isFunction(val) {
  return obj !== null && typeof val === 'function' && Object.prototype.toString.call(obj) === '[object Function]';
}

/**
 * 判断是否为数组
 * @param  {Array}  val 传入的需要判断的数组
 * @return {Boolean}    判断结果
 */
export function isArray(val) {
  return val != null && Object.prototype.toString.call(obj) === '[object Array]';
}

/**
 * 迭代数组或对象
 * @param  {Object, Array} obj      传入的数组或对象
 * @param  {Function}      iterator 迭代函数，参数为(value, key)
 * @return {Object, Array}          obj
 */
export function each(obj, iterator) {
  if (isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      iterator.call(obj[i], obj[i], i);
    }
  } else if (isObject(obj)) {
    for (let key in obj) {
      if (hasOwnProperty.call(obj, key)) {
        iterator.call(obj[key], obj[key], key);
      }
    }
  }

  return obj;
}

/**
 * 将参数对象转化成键值对数组
 * @param  {Array}  params  键值对数组
 * @param  {Object} obj     参数对象
 * @param  {String} scope   键值
 */
export function serialize(params, obj, scope) {
  const array = isArray(obj), plain = isObject(obj);
  let hash;

  each(obj, (value, key) => {
    hash = isObject(value) || isArray(value);

    if (scope) {
      key = scope + '[' + (plain || hash ? key : '') + ']';
    }

    if (!scope && array) {
      params.add(value.name, value.value);
    } else if (hash) {
      serialize(params, value, key);
    } else {
      params.add(key, value);
    }
  });
}

/**
 * 将参数对象转化成url参数类型的字符串
 * @param  {Object} obj 参数对象
 * @return {String}     url参数字符串
 */
export function params(obj) {
  const params = [];

  params.add = function(key, value) {
    if (isFunction(value)) {
      value = value();
    }
    if (value === null) {
      value = '';
    }
    this.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
  };

  serialize(params, obj);

  return params.join('&').replace(/%20/g, '+');
}

/**
 * fetch封装
 * @param  {Object}   settings 设置对象 {url: 请求地址, method: 'GET'||'POST', data: 传递的数据, headers: 请求头}
 * @param  {Function} success  成功时的callback
 * @param  {Function} error    失败时的callback
 */
export function http(settings, success, error) {
  const options = {
    credentials: 'include',
    headers: {
      'Accept': 'application/json, text/plain, */*'
    }
  };

  if (settings.method === 'GET') {
    options.headers['Content-Type'] = 'application/json';
    if (settings.data) {
      settings.url = settings.url + '?' + params(settings.data);
    }
  }

  if (settings.method === 'POST') {
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    if (settings.data) {
      options.body = params(settings.data);
    }
  }

  options.method = settings.method;

  if (settings.headers && settings.headers.length > 0) {
    each(settings.headers, (value, key) => {
      options.headers[key] = value;
    });
  }

  fetch(settings.url, options).then(res => {
    return res.json();
  }).then(json => {
    if (success) success(json);
  }).catch(err => {
    if (error) error(err);
  });
}

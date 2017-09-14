/**
 * 判断是否是对象
 * @param  {Object}  obj 传入的需要判断的对象
 * @return {Boolean}     判断结果
 */
export function isObject(obj) {
  return typeof obj === 'object' && Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * 判断是否为函数
 * @param  {Function}  val 传入的需要判断的函数
 * @return {Boolean}       判断结果
 */
export function isFunction(val) {
  return typeof val === 'function' && Object.prototype.toString.call(obj) === '[object Function]'
}

/**
 * 判断是否为数组
 * @param  {Array}  val 传入的需要判断的数组
 * @return {Boolean}    判断结果
 */
export function isArray(val) {
  return Array.isArray(val) || Object.prototype.toString.call(obj) === '[object Array]'
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
      iterator.call(obj[i], obj[i], i)
    }
  } else if (isObject(obj)) {
    for (let key in obj) {
      if (hasOwnProperty.call(obj, key)) {
        iterator.call(obj[key], obj[key], key)
      }
    }
  }

  return obj
}

/**
 * 将参数对象转化成键值对数组
 * @param  {Array}  params  键值对数组
 * @param  {Object} obj     参数对象
 * @param  {String} scope   键值
 */
export function serialize(params, obj, scope) {
  const array = isArray(obj), plain = isObject(obj)
  let hash

  each(obj, (value, key) => {
    hash = isObject(value) || isArray(value)

    if (scope) {
      key = scope + '[' + (plain || hash ? key : '') + ']'
    }

    if (!scope && array) {
      params.add(value.name, value.value)
    } else if (hash) {
      serialize(params, value, key)
    } else {
      params.add(key, value)
    }
  });
}

/**
 * 将参数对象转化成url参数类型的字符串
 * @param  {Object} obj 参数对象
 * @return {String}     url参数字符串
 */
export function params(obj) {
  const params = []

  params.add = function(key, value) {
    if (isFunction(value)) {
      value = value()
    }
    if (value === null) {
      value = ''
    }
    this.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
  };

  serialize(params, obj)

  return params.join('&').replace(/%20/g, '+')
}

export function tradeStatus (value) {
  if (value === 'CREATED') {
    return '待付款'
  } else if (value === 'WAIT_PAY') {
    return '待付款'
  } else if (value === 'WAIT_DELIVER_GOODS') {
    return '待发货'
  } else if (value === 'WAIT_CONFIRM_RECEIVE') {
    return '待收货'
  } else if (value === 'IN_REFUND') {
    return '退款中'
  } else if (value === 'FINISHED') {
    return '完成'
  } else if (value === 'PART_REFUND') {
    return '部分退款'
  } else if (value === 'CLOSED') {
    return '关闭'
  } else if (value === 'CLOSED_BY_AUTO') {
    return '关闭'
  } else if (value === 'CLOSED_BY_REFUND') {
    return '退款完成'
  }
}

export function dateFormat (value, fmt) {
  if (!value) {
    return ''
  }
  var date
  if (value instanceof Date) {
    date = value
  } else {
    date = new Date(value)
  }
  var dv = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S+': date.getMilliseconds()
  }
  if (/(y+)/i.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in dv) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1
        ? dv[k] : ('00' + dv[k]).substr(('' + dv[k]).length))
    }
  }
  return fmt
}

export function price (fenAmt) {
  var amt = fenAmt / 100
  return amt.toFixed(2)
}

export function getData (el, name, val) {
  let prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

export function getRect (el) {
  if (el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}

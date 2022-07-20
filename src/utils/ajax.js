function objectToString(obj) {
  const arr = [];
  for (const k in obj) {
    arr.push(`${k}=${obj[k]}`);
  }
  return arr.join('&')
}

function ajax({ method, url, params, data, callback }) {
  const xhr = new XMLHttpRequest();
  switch (method.toUpperCase()) {
    case 'GET':
      switch (typeof params) {
        case 'undefined':
          xhr.open('GET', url)
          break
        case 'string':
          xhr.open('GET', [url, params].join("?"))
          break
        case 'object':
          xhr.open('GET', [url, objectToString(params)].join("?"))
          break
      }
      xhr.send()
      break
    case 'POST':
      xhr.open('POST', url)
      switch (true) {
        case data instanceof FormData:
          xhr.send(data)
          break
        case typeof data == 'object':
          xhr.setRequestHeader('Content-Type', 'application/json')
          xhr.send(JSON.stringify(data))
          break
        case typeof data == 'string':
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
          xhr.send(data)
          break

      }
  }
  xhr.onload = function () {
    callback && callback(JSON.parse(xhr.response))
  }
}

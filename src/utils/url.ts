export const padLeftProtocol = (url: string) => {
  if (url?.startsWith('http')) {
    return url
  } else if (url?.startsWith('//')) {
    return url.replace('//', 'https://')
  }
  return url
}

interface urlParam {
  shotParams: string | ''
  shotUrl: string
}

export const getUrlParams = (originUrl: string): urlParam => {
  const url = originUrl
  let index = url.indexOf('?')
  let shotParams, shotUrl
  if (index !== -1) {
    shotParams = url.substr(index + 1)
    shotUrl = url.substr(0, index)
  } else {
    shotUrl = url
    shotParams = ''
  }
  return {
    shotParams,
    shotUrl,
  }
}

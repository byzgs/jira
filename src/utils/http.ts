import { useAuth } from 'context/auth.context'
import qs from 'qs'
import * as auth from '../auth-provider'
const apiUrl = process.env.REACT_APP_API_URL

//data token不是RequestInit标准类型 --> 需要继承
interface Config extends RequestInit {
  token?: string,
  data?: object
}

export const http = async (endpoint: string, { data, token, headers, ...custonConfig }: Config = {}) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...custonConfig
    //写在后面的会覆盖前面的
  }

  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }

  return window.fetch(`${apiUrl}/${endpoint}`, config)
    .then(async response => {
      //未登录、失效，返回401，标准resfo规范;但是用fetch时，遇到401不抛异常（只有断网时抛）
      if (response.status === 401) {
        auth.logout()
        window.location.reload()
        return Promise.reject({ message: '请重新登录' })
      }
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })

}

export const useHttp = () => {
  const { user } = useAuth()
  // return ([endpoint, config]: [string, Config]) => http(endpoint, { ...config, token: user?.token })
  // : [string, Config] 类型与http中类型完全相同，因此可以用 ***Parameters<typeofxxx>***
  //  ...操作符原因: 这样就不用在传参时非要数组touple了
  return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token })
}
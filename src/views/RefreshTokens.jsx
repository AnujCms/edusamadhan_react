import axios from 'axios';
export default function getNewToken()
{
    let refreshingPromise = undefined;
    return async function (){
    if(!refreshingPromise)
    {
      refreshingPromise = axios({
        method: 'post',
        url: '/api/admin/providerauthservice/accessTokenByRefershToken',
        data: { refreshToken: localStorage.getItem("refreshToken") }
      });
      let refreshResult = await refreshingPromise;
      if (refreshResult.status === 200) {
        localStorage.setItem("accessToken", refreshResult.data.accessToken);
        localStorage.setItem("refreshToken",refreshResult.data.refreshToken)
    }
    refreshingPromise = undefined;
    return refreshResult;
  }
    return refreshingPromise;
  }
}
import auth0 from 'auth0-js';

class AuthService {
    auth0 = new auth0.WebAuth({
        domain: 'reversecurrentdemo.auth0.com',
        clientID: 'AiHIk4iS76aTLlHC0S06G77IcQ3UN839',
        redirectUri: 'http://localhost:3000/callback',
        responseType: 'token id_token',
        scope: 'openid profile'
      });
    
      constructor() {
          this.handlePostLogin = this.handlePostLogin.bind(this);
      }

  login() {
    this.auth0.authorize();
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_profile');
  }

  handlePostLogin() {
      return new Promise((resolve,reject) => {
        this.auth0.parseHash((err, authResult)=>{
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
                    if (profile) {
                      this.setProfile(profile);
                      resolve({
                          isSuccess: true
                      }) ;
                    }
                  });
                
              } else if (err) {
                resolve({
                    isSuccess: false
                });
              }
          });
      })
      
  }

   setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
     localStorage.setItem('access_token', authResult.accessToken);
     localStorage.setItem('id_token', authResult.idToken);
     localStorage.setItem('expires_at', expiresAt);
  }

   setProfile(profile){
       localStorage.setItem('user_profile', JSON.stringify(profile)) ;
  }

  /**
   * {
  "email_verified": false,
  "email": "test.account@userinfo.com",
  "updated_at": "2016-12-05T15:15:40.545Z",
  "name": "test.account@userinfo.com",
  "picture": "https://s.gravatar.com/avatar/dummy.png",
  "user_id": "auth0|58454...",
  "nickname": "test.account",
  "created_at": "2016-12-05T11:16:59.640Z",
  "sub": "auth0|58454... " 
}

   */
   getProfile() {
      const profile =  localStorage.getItem('user_profile');
      if(profile != null){
          return JSON.parse(profile);
      }
      return {};
  }

   isAuthenticated() {
    // Check whether the current time is past the 
    // Access Token's expiry time
    let expiresAt =  JSON.parse(localStorage.getItem('expires_at'));
    if(expiresAt == null){
        return false;
    }
    const isAuthenticated = new Date().getTime() < expiresAt;
    return isAuthenticated;
  }
}

const authService = new AuthService();
export default authService;
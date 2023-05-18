import fetch from 'node-fetch';

class Users {
    constructor() {
      // backdoor
      this.users = { yaboi: ['123', '@umass'] };
      this.init();
    }

    async init() {
      let response = await fetch('http://localhost:3000/profiles', {
        method: 'GET'
      });
      let profiles = await response.json();
      for(let profile of profiles)
      {
        this.users[profile["user_name"]] = [profile["password"], profile["email"]];
      }
    }
  
    findUser(username) {
      console.log(this.users);
      if (!this.users[username]) {
        return false;
      } else {
        return true;
      }
    }
  
    validatePassword(name, pwd) {
      if (!this.findUser(name)) {
        return false;
      }
      if (this.users[name][0] !== pwd) {
        return false;
      }
      return true;
    }
  
    addUser(name, email, pwd) {
      if (this.findUser(name)) {
        return false;
      }
      this.users[name] = [pwd, email];
      return true;
    }
  }
  
  export default new Users();
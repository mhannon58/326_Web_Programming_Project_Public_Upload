class Users {
    constructor() {
      // backdoor
      this.users = { yaboi: ['123', '@umass'] };
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
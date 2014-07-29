var users = global.nss.db.collection('users');


class User{
  static create(fn){
    debugger;
    var user = new User();
    user.ready = true;
    user.weapon = 'stick';
    user.gold = 0;
    user.save();
    fn(user);
  }
  save(){
    users.save(this, ()=>{});
  }
}
module.exports = User;

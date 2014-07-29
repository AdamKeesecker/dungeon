var users = global.nss.db.collection('users');


class User{
  static create(fn){
    var user = new User();
    user.weapon = 'stick';
    user.gold = 0;
    user.dungeonBeat = false;
    user.save();
    fn(user);
  }
  save(){
    users.save(this, ()=>{});
  }
}
module.exports = User;

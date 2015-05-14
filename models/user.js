/**
 * 用户
 * Created by Administrator on 2015/5/13.
 */

var mongodb=require('./db');

var user={
    username:'',//用户姓名
    password:''//用户密码
}

/**
 * 用户信息
 * @param {Object} user
 * @constructor
 */
var User=function(user){
    this.name=user.name;
    this.password=user.password;
};

/**
 * 保存用户信息
 * @param callback
 */
User.prototype.save=function(callback){
    user.username=this.username;
    user.password=this.password;

    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }

        db.collection('users',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }

            collection.insert('users',{safe:true},function(err,user){
                mongodb.close();
                return callback(err,user);
            });
        });
    });
};

/**
 * 获得用户的信息
 * @param {String} username
 * @param callback
 */
User.prototype.get=function(username,callback){
    mongodb.open(function(err,db){
        if(err){
            return ca1lback(err);
        }

        db.collection('users',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }

            collection.findOne({name:username},function(err,doc){
                mongodb.close();
                if(doc){
                    var user=new User(dic);
                    return callback(err,user);
                }else{
                    return callback(err,null);
                }
            });
        });
    });
};

/**
 * 抛出User方法
 * @type {User}
 */
module.exports=User;

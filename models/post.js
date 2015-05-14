/**
 * 留言
 * Created by Administrator on 2015/5/13.
 */

var mongodb=require('./db');

/**
 * 集合posts的文档 Post构造函数
 * @param username；发言人的名字
 * @param post:发言内容
 * @param time：发言时间
 * @constructor
 */
function Post(username,post,time){

};

/**
 * 保存发言
 * @param callback
 */
Post.prototype.save=function save(callback){
    /**
     * 提交留言的数据
     * @type {{user: *, post: *, time: *}}
     */
    var post={
      user:this.user,
      post:this.post,
      time:this.time
    };
    //连接数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }

        db.collection('posts',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }

            collection.insert(post,{safe:true},function(err,post){
                mongodb.close();
                callback(err,post);
            });

        });
    });
};

/**
 * 查询发言
 * @param {String} username 需要查询的用户名字
 * @param {Function} callback  回调函数
 */
Post.prototype.get=function get(username,callback){
    //连接数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }

        db.collection('posts',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }

            var query={};
            if(username){
                query.user=username;
            }
            collection.find(query).sort({time:-1}).toArray(function(err,docs){
                mongodb.close();
                if(err){
                    callback(err,null);
                }

                var posts=[];
                docs.forEach(function(doc,index){
                    var post=new Post(doc.user,doc.post,doc.time);
                    posts.push(post);
                });
                callback(null,posts);

            });

        });
    });
};

/**
 * 1.Post (username,post,time){};  提交发言
 * @type {Post}
 */
module.exports=Post;
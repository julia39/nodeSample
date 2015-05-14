/**
 * 连接数据库
 * Created by Administrator on 2015/5/13.
 */

var settings=require('../settings');
var Db=require('mongodb').Db;
var Connection=require('mongodb').Connection;
var Server=require('mongodb').Server;

module.exports=new Db(settings.db,new Server(settings.host,Connection.DEFAULT_ROOT_COLLECTION,{}),{safe:true});
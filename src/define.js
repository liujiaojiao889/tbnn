/**
 * Primus
 */
// var IO_CONFIG = {
//     type : "primus",
//     URL : connectionUrl,
//     publicKey : publicKey,
//     token : token
// };
/**
 * Socket.IO
 */
var IO_CONFIG = {
    type : "socket",
    URL : connectionUrl,
    token : token,
    "force new connection" : true,
    "reconnect" : true
};
/**
 * Ajax 如果不需要socket连接方式，则默认使用ajax，下面的配置为ajax的默认配置，一般不需要更改
 */
// var IO_CONFIG = {
//     type : "ajax",
//     timeout : 3000
// };



var GAME_CONFIG = {
    WIDTH : 1334,
    HEIGHT : 750,
    SCREEN_MODE : Laya.Stage.SCREEN_HORIZONTAL, //可选自动横屏:Laya.Stage.SCREEN_HORIZONTAL 或者 自动竖屏:Laya.Stage.SCREEN_VERTICAL
    SCALE_MODE : Laya.Stage.SCALE_FIXED_WIDTH, //自动横屏时选择:Laya.Stage.SCALE_FIXED_WIDTH  自动竖屏时选择:Laya.Stage.SCALE_FIXED_HEIGHT
    DIALOGTYPE : "multiple", //弹窗模式 single:弹出弹窗时自动关闭其他弹窗, multiple : 允许弹出多层弹窗，可使用"closeOther:true"在弹出时关闭其他弹窗
    VERSION : "20170901",
    BASE_PATH : CDN_URL
};

//自定义常量
var SOUNDSTATUS = {
    OFF : 0,
    ON : 1,
    CUR : 1
};

var USER_LOGIN_STATUS = false;
var USER_DEFAULT_INFO ;
var PROPUSER = null;

var tbnn = {};
tbnn.dom = {};
tbnn.data = {};
tbnn.dom.coins = [[],[],[],[]];
tbnn.data.areasBetFlags = {};
tbnn.data.userHallInfo = {};
tbnn.data.firstbet = true;

var GAME_CMDS = {
    NEWUSER :"user::isNewUser", //新用户
    USE_INFO: "user::getUserAmount", //用户信息
    RANK:"user::rankNew" , //排行榜
    ROOMlIST :"user::getRoomList",
    INROOM :"user::inRoom",
    CHARGEIN:"user::chargeIn" ,//手动带入
    CHANGROUT :"user::chargeOut", //收获
    USERDETAIL:"user::getAmountDetail",
    PLAYLIST:"room::getUserList", //玩家列表
    ROOMPOOL:"room::poolInfo", //奖池
    GETPROP:"user::getProp",  //获取道具
    SENDPROP:"user::sendPropNew", //发送道具
    CHATLIST:"user::getChatLanguage", //聊天语句列表
    EXPRESS:"user::getExpress", //表情列表
    SENDEXPRESS:"user::sendExpress",//发送表情
    SENDLANGUAGE:"user::sendChatLanguage",//发送语句
    USER_RATE:"room::getRate", //获取倍率
    IS_IN_ROOM:"user::isInRoom",
    USER_NAME :"user::getUserInfo", //用户名和头像
    //房间
    GET_ROOM_INFO : "room::getRoomInfo",//获取房间信息
    POOL_INFO : "room::poolInfo",//奖池信息
    HISTORY_CARD : "user::historyCard",//历史牌局
    ROUND_START : "room::roundStart",//游戏开始
    ROUND_OVER : "room::roundOver",//游戏结束
    BANKER_UP_INIT : "room::bankerUpInit",//上庄界面
    BANKER_UP : "room::bankerUp",//上庄请求
    OUT_BANKER_LIST : "user::outBankerList",//退出上庄队列
    BANKER_DOWN_USER : "user::bankerDown",//下庄请求
    BANKER_DOWN_ROOM : "room::bankerDown",//下庄广播
    BET_CALL : "user::betCall",//押注请求
    BET_INFO : "room::betInfo",//四门和剩余押注信息
    OUT_ROOM : "user::outRoom",//退出房间
    BANKER_LIST : "room::bankerList",//上庄列表
    SIT_DOWN_ROOM : "room::sitDown",//坐下订阅
    SIT_DOWN_USER : "user::sitDown",//坐下推送
    GET_SEAT_USER_INFO : "user::getSeatUserInfo",//获取坐下玩家信息   
    AWARD_POOL : "room::awardPool",//分奖信息
    STAND_UP : "room::standUp",//离座
    SEAT_BET_CALL : "user::seatBetCall",//座位玩家投注
    NOTICE_MAIN : "notice::main",//公告
    LOSEREMIND:"user::losePointRemind", //输分提醒
    CAUTION:"cmd::caution",//输分禁用和万里通积分授权
    BUZHONGXIAN:"api::activity",//不中险
    AUTOCHARGEIN:"user::autoChargeIn", //自动兑入气泡提醒
     UPDATAPROMPT:"user::updatePomptMsg" //万里通带入勾选弹框

};

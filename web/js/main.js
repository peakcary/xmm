
var domain = 'http://tt.xiongmama.com.cn';

//获取试用装列表
function get_taf_act_list(pageno) {
    var api = '/wx/activity/taf_act_list';
    $.ajax({
        type: 'post',
        url: domain + api,
        dataType: 'json',
        data: { p: pageno },
        success: function (result) {
            if (result.code == 0) {
                var $data = result.data;
                var total = $data.count;
                var $innerdata = $data.data;
                if ($data.is_last_page == 1) {
                    //解除绑定上拉事件
                    $.detachInfiniteScroll($('#page-slsyz .infinite-scroll'));
                    $('#page-slsyz .infinite-scroll-preloader').hide();
                } else {
                    $.pullToRefreshDone('.page-send');
                    //恢复绑定上拉事件
                    $.attachInfiniteScroll($('#page-slsyz .infinite-scroll'));
                    $('#page-slsyz .infinite-scroll-preloader').show();
                }
                render_act_list(pageno, JSON.stringify($innerdata));
            } else {
                alert(result.msg);
            }
        }
    });
}
//获取试用装详情
function get_act_detail(id) {
    var api = '/wx/activity/act_detail';
    $.ajax({
        type: 'post',
        url: domain + api,
        dataType: 'json',
        data: { id: id },
        success: function (result) {
            if (result.code == 0) {
                var $data = result.data;
                render_act_detail(JSON.stringify($data));
            }
        }
    });
}

//获取审核中试用装列表
function rev_taf_act_list(pageno) {
    var api = '/wx/activity/rev_taf_act_list';
    $.ajax({
        type: 'post',
        url: domain + api,
        dataType: 'json',
        data: { p: pageno },
        success: function (result) {
            if (result.code == 0) {
                var $data = result.data;
                var total = $data.count;
                var $innerdata = $data.data;
                if ($data.is_last_page == 1) {
                    //解除绑定上拉事件
                    $.detachInfiniteScroll($('#page-shsyz .infinite-scroll'));
                    $('#page-shsyz .infinite-scroll-preloader').hide();
                } else {
                    $.pullToRefreshDone('.page-shsyz');
                    //恢复绑定上拉事件
                    $.attachInfiniteScroll($('#page-shsyz .infinite-scroll'));
                    $('#page-shsyz .infinite-scroll-preloader').show();
                }
                render_rev_taf_act_list(pageno, JSON.stringify($innerdata));
            } else if (result.code == '4001') {
                window.location.href = 'login.htm?redirect=my.htm';
            } else {
                alert(result.msg);
            }
        }
    });
}

//获取派发管理列表
function get_distributed_list(pageno) {
    var api = '/wx/activity/distributed_list';
    $.ajax({
        type: 'post',
        url: domain + api,
        dataType: 'json',
        data: { p: pageno },
        success: function (result) {
            if (result.code == 0) {
                var $data = result.data;
                var total = $data.count;
                var $innerdata = $data.data;

                if ($data.is_last_page == 1) {
                    //解除绑定上拉事件
                    $.detachInfiniteScroll($('#page-send .infinite-scroll'));
                    $('#page-send .infinite-scroll-preloader').hide();
                } else {
                    $.pullToRefreshDone('.page-send');
                    //恢复绑定上拉事件
                    $.attachInfiniteScroll($('#page-send .infinite-scroll'));
                    $('#page-send .infinite-scroll-preloader').show();
                }

                render_distributed_list(pageno, JSON.stringify($innerdata));
            } else if (result.code == '4001') {
                window.location.href = 'login.htm?redirect=send.htm';
            }
            else {
                alert(result.msg);
            }
        }
    });
}

//获取完成派发列表
function complete_distributed_list(pageno) {
    var api = '/wx/activity/complete_distributed_list';
    $.ajax({
        type: 'post',
        url: domain + api,
        dataType: 'json',
        data: { p: pageno },
        success: function (result) {
            if (result.code == 0) {
                var $data = result.data;
                var total = $data.count;
                var $innerdata = $data.data;
                if ($data.is_last_page == 1) {
                    //解除绑定上拉事件
                    $.detachInfiniteScroll($('#page-complete .infinite-scroll'));
                    $('#page-complete .infinite-scroll-preloader').hide();
                } else {
                    $.pullToRefreshDone('.page-complete');
                    //恢复绑定上拉事件
                    $.attachInfiniteScroll($('#page-complete .infinite-scroll'));
                    $('#page-complete .infinite-scroll-preloader').show();
                }
                render_complete_distributed_list(pageno, JSON.stringify($innerdata));
            }
        }
    });
}


//获取用户店铺列表
//flag=0,展示列表
function get_shop_list(flag, sid) {
    var api = '/wx/member/shop_list';
    $.ajax({
        type: 'post',
        url: domain + api,
        dataType: 'json',
        success: function (result) {

            if (result.code == 0) {
                var $data = result.data;

                if (flag == 0) {//申领时选择
                    render_select_shoplist(JSON.stringify($data), sid);

                } else {

                }
                // render_act_list(pageno, JSON.stringify($innerdata));
            } else if (result.code == '4001') {
                if (flag == 0) {
                    window.location.href = 'login.htm?redirect=slinfo.htm';
                } else {
                    window.location.href = 'login.htm?redirect=my.htm';
                }
            }
            else {
                alert(result.msg);
            }
        }
    });
}
//获取用户地址列表
function get_addr_list(flag) {
    var api = '/wx/member/addr_list';
    $.ajax({
        type: 'post',
        url: domain + api,
        dataType: 'json',
        success: function (result) {

            if (result.code == 0) {
                var $data = result.data;
                render_select_addrlist(JSON.stringify($data), 'address_list');

            } else if (result.code == '4001') {
                if (flag == 0) {
                    window.location.href = 'login.htm?redirect=slinfo.htm';
                } else {
                    window.location.href = 'login.htm?redirect=my.htm';
                }
            }
            else {
                alert(result.msg);
            }
        }
    });
}
//提交申请试用装
function add_act(data) {
    var api = '/wx/activity/add_act';
    $.ajax({
        type: 'post',
        url: domain + api,
        dataType: 'json',
        data: JSON.parse(data),
        success: function (result) {
            if (result.code == 0) {
                window.location.href = 'success.htm';
            } else if (result.code == '4001') {
                window.location.href = 'login.htm?redirect=slinfo.htm';
            }
            else {
                alert(result.msg);
            }
        }
    });
}

//添加/编辑/删除用户地址
//province 省
//city 市
//area 区
//address 地址
//user_name 联系人
//user_phone 联系人手机号
//status 删除写此参数为0，否则不写
//id 编辑或删除写此参数，添加不写

function save_addr(data, flag) {
    var api = '/wx/member/save_addr';
    $.ajax({
        type: 'post',
        url: domain + api,
        dataType: 'json',
        data: JSON.parse(data),
        success: function (result) {
            if (result.code == 0) {
                var $data = result.data;
                window.location.href = 'address_list.htm';
            } else if (result.code == '4001') {
                if (flag == 0) {
                    window.location.href = 'login.htm?redirect=slinfo.htm';
                } else {
                    window.location.href = 'login.htm?redirect=my.htm';
                }
            }
            else {
                alert(result.msg);
            }
        }
    });
}
//获取选择地址
function getAddr(data) {
    var type = GetQueryString('type');
    window.location.href = 'slinf.htm?type=' + type + '&addr=' + data;
}

//删除地址
function deleteAddr(data) {
    $.confirm('确认删除?', function () {
        var $data = JSON.parse(unescape(data));
        $data.status = 0;

        $data.province = $data.a1;
        $data.city = $data.a2;
        $data.area = $data.a3;
        $data.address = $data.a4;

        save_addr(JSON.stringify($data), 0);
    });
}
//编辑地址
function editAddr(data) {
    window.location.href = 'address.htm?data=' + data;
}
//获取地址
function getAddr_sl(aid, data) {
    var type = GetQueryString('type');
    var $tempdata = GetQueryString('tempdata');
    var tempsldata = {};

    if ($tempdata != undefined && $tempdata != null) {
        tempsldata = JSON.parse(unescape($tempdata));
        if (type == 'ht') {
            tempsldata.addr1 = aid;
            tempsldata.addr1_obj = JSON.parse(unescape(data)) ;
        } else {
            tempsldata.addr2 = aid;
            tempsldata.addr2_obj = JSON.parse(unescape(data));
        }
    }

    url = 'slinfo.htm?tempdata=' + escape(JSON.stringify(tempsldata));

    window.location.href = url;
}

//添加/编辑用户店铺
//参数
//id 编辑写此参数，添加不写
//shop_name 店铺名称
//shop_url 店铺URL
//company 公司名称或负责人姓名
//create_at 开店日期
//zoneinfo 所在地
//customer_sex 受众性别,0:男1:女
//rank 实时排名,传数字
//goods 商品数量,传数字
//cate_id 主营类目ID,传数字

//per_ct 客单价
//m_pv 月浏览量,传数字
//m_uv 月独立访客,传数字
//m_sales 月均销售,传数字
//m_trades 月均发单,传数字
//c_age1-c_age6 客户年龄段分布18-25,26-30,31-35,36-40,41-50,50+
//c_sex_json 客户性别分布,传数组c_sex_json[],男、女、未知
//season_json 淡旺季分布,传数组season_json[],春、夏、秋、冬,1:旺季2:淡季
//a1 销售地区前十省份,传数组a1[]
//a2 销售地区前十城市,传数组a2[]
//value  销售地区前十占比例,传数组value[]
//shop_name, shop_url, company, create_at, zoneinfo, customer_sex, rank, goods, cate_id

function save_shop(jsondata) {
    var api = '/wx/member/save_shop';
    $.ajax({
        type: 'post',
        url: domain + api,
        dataType: 'json',
        data: { shop_name: shop_name },
        success: function (result) {
            if (result.code == 0) {
                var $data = result.data;
                var total = $data.count;
                var $innerdata = $data.data;
                // render_act_list(pageno, JSON.stringify($innerdata));
            } else if (result.code == '4001') {
                window.location.href = 'login.htm?redirect=my.htm';
            } else {
                alert(result.msg);
            }
        }
    });
}

//用户登录
function userlogin(phone, pwd) {
    var api = '/wx/user/login';
    $.ajax({
        type: 'post',
        url: domain + api,
        dataType: 'json',
        data: { phone: phone, pass: pwd },
        success: function (result) {
            if (result.code == 0) {
                var $data = result.data;
                localStorage.setItem("logininfo", JSON.stringify($data));
                var tzurl = GetQueryString('redirect');
                if (tzurl != undefined) {
                    window.location.href = tzurl;
                } else {
                    window.location.href = 'my.htm';
                }
            } else {
                alert(result.msg);
            }
        }
    });
}

//更换手机发验证码
function um_send_vcode(phone) {
    var api = '/wx/member/um_send_vcode';
    $.ajax({
        type: 'post',
        url: domain + api,
        dataType: 'json',
        data: { phone: phone },
        success: function (result) {

            if (result.code == 0) {
                window.location.href = 'my_vcode.htm?phone=' + phone;
            } else {
                alert(result.msg);
            }
        }
    });
}

//更换手机验证验证码
function um_ver_vcode(vcode, newphone) {
    var api = '/wx/member/um_ver_vcode';
    $.ajax({
        type: 'post',
        url: domain + api,
        dataType: 'json',
        data: { vcode: vcode },
        success: function (result) {

            if (result.code == 0) {
                var data = localStorage.getItem("logininfo");
                var $logininfo = JSON.parse(data);
                $logininfo.mobile = newphone;

                localStorage.setItem("logininfo", JSON.stringify($logininfo));

                window.location.href = 'my.htm';
            } else {
                alert(result.msg);
            }
        }
    });
}

//修改联系人
function ucperson(name) {
    var api = '/wx/member/ucperson';
    $.ajax({
        type: 'post',
        url: domain + api,
        dataType: 'json',
        data: { user_nicename: name },
        success: function (result) {

            if (result.code == 0) {

                var data = localStorage.getItem("logininfo");
                var $logininfo = JSON.parse(data);
                $logininfo.user_nicename = name;

                localStorage.setItem("logininfo", JSON.stringify($logininfo));

                window.location.href = 'my.htm';
            } else {
                alert(result.msg);
            }
        }
    });
}

//1、注册验证码
function reg_send_vcode(phone) {

    var api = '/wx/user/reg_send_vcode';
    $.ajax({
        type: 'post',
        url: domain + api,
        dataType: 'json',
        data: { phone: phone },
        success: function (result) {

            if (result.code == 0) {
                window.location.href = 'register_vcode.htm?phone=' + phone;
            } else {
                alert(result.msg);
            }
        }
    });
}

//2、注册账号验证验证码
function reg_ver_vcode(vcode) {
    var api = '/wx/user/reg_ver_vcode';
    $.ajax({
        type: 'post',
        url: domain + api,
        dataType: 'json',
        data: { vcode: vcode },
        success: function (result) {

            if (result.code == 0) {
                window.location.href = 'register_setpwd.htm';
            } else {
                alert(result.msg);
            }
        }
    });
}

//3、注册账号设置密码
function reg_set_pass(pwd) {
    var api = '/wx/user/reg_set_pass';
    $.ajax({
        type: 'post',
        url: domain + api,
        dataType: 'json',
        data: { pass: pwd },
        success: function (result) {

            if (result.code == 0) {
                window.location.href = 'login.htm';
            } else {
                alert(result.msg);
            }
        }
    });
}

//1、找回密码发验证码
function fp_send_vcode(phone) {

    var api = '/wx/user/fp_send_vcode';
    $.ajax({
        type: 'post',
        url: domain + api,
        dataType: 'json',
        data: { phone: phone },
        success: function (result) {

            if (result.code == 0) {
                window.location.href = 'forgetmm_vcode.htm?phone=' + phone;
            } else {
                alert(result.msg);
            }
        }
    });
}
//2、找回密码验证验证码
function fp_ver_vcode(vcode) {
    var api = '/wx/user/fp_ver_vcode';
    $.ajax({
        type: 'post',
        url: domain + api,
        dataType: 'json',
        data: { vcode: vcode },
        success: function (result) {

            if (result.code == 0) {
                window.location.href = 'forgetmm_setpwd.htm';
            } else {
                alert(result.msg);
            }
        }
    });
}

//3、找回密码设置密码
function fp_set_pass(pwd) {
    var api = '/wx/user/fp_set_pass';
    $.ajax({
        type: 'post',
        url: domain + api,
        dataType: 'json',
        data: { pass: pwd },
        success: function (result) {

            if (result.code == 0) {
                window.location.href = 'login.htm';
            } else {
                alert(result.msg);
            }
        }
    });
}

//1、修改密码发验证码
function up_send_vcode(phone) {

    var api = '/wx/member/up_send_vcode';
    $.ajax({
        type: 'post',
        url: domain + api,
        dataType: 'json',
        success: function (result) {

            if (result.code == 0) {
                window.location.href = 'my_pwd_vcode.htm?phone=' + phone;
            } else {
                alert(result.msg);
            }
        }
    });
}

//2、修改密码验证验证码
function up_ver_vcode(vcode) {
    var api = '/wx/member/up_ver_vcode';
    $.ajax({
        type: 'post',
        url: domain + api,
        dataType: 'json',
        data: { vcode: vcode },
        success: function (result) {

            if (result.code == 0) {
                window.location.href = 'my_newpwd.htm';
            } else {
                alert(result.msg);
            }
        }
    });
}

//3、修改密码设置密码
function up_set_pass(pwd) {
    var api = '/wx/member/up_set_pass';
    $.ajax({
        type: 'post',
        url: domain + api,
        dataType: 'json',
        data: { pass: pwd },
        success: function (result) {

            if (result.code == 0) {
                window.location.href = 'my.htm';
            } else {
                alert(result.msg);
            }
        }
    });
}

function render_act_detail(data) {
    var $data = JSON.parse(data);
    var html = '';
    html += '<div class="row" style="background: #fff;">'
                        + '<div class="col-100">'
                        + '    <img src="' + domain + $data.pic + '" style="width: 100%;" /></div>'
                        + '  <div class=" col-100">'
                         + '  <div class="content-padded">'
                         + '       <div>' + $data.name + '</div>'
                         + '<div>' + $data.gift + '积分/份</div>'
                         + ' <p class="color-gray">' + $data.remark + '</p>'
                         + '</div></div>'
                    + '</div>';
    $('#con_act_detail').html(html);
}
//展示店铺列表
function render_select_shoplist(data, sid) {
    var $data = JSON.parse(data);
    var html = '';
    for (var i = 0; i < $data.length; i++) {
        if ($data[i].status == "2") {
            html += '<li><label class="label-checkbox item-content">'
                           + '<div class="item-inner">'
                             + '   <div class="item-title">'
                               + $data[i].shop_name + '</div>'
                               + ' <input type="radio" ';
            if (sid == $data[i].id) {
                html += ' checked="checked" ';
            }

            html += ' name="sl_select_shop" value="' + $data[i].id + '" />'
                               + ' <div class="item-media">'
                               + '     <i class="icon icon-form-checkbox"></i>'
                               + ' </div>'
                            + '</div>'
                        + '</label></li>';
        }
    }
    $('#con_selectstore').html(html);
    setStore();
}


//展示地址列表
function render_select_addrlist(data, typename) {
    var $data = JSON.parse(data);
    var html = '';
    var seladdId = GetQueryString('selId');

    for (var i = 0; i < $data.length; i++) {

        html += '<ul><li>'
                        + '<label class="label-checkbox item-content">'
                         + '   <input type="radio" ';
        if (seladdId == $data[i].id) {
            html += ' checked="checked" ';
        }

        html += 'name="' + typename + '" value="' + $data[i].id + '" onclick="getAddr_sl(\'' + $data[i].id + '\',\'' + escape(JSON.stringify($data[i])) + '\')"/>'
                         + '   <div class="item-media">'
                         + '       <i class="icon mycheckbox"></i>'
                         + '   </div>'
                         + '   <div class="item-inner">'
                          + '      <div class="item-title-row">'
                           + '         <div class="item-title">联系人：'
                            + $data[i].user_name + '</div>'
                             + '       <div class="item-after">联系电话：'
                             + $data[i].user_phone + '</div>'
                              + '  </div>'
                              + '  <div class="item-subtitle">'
                               + $data[i].a1 + $data[i].a2 + $data[i].a3 + $data[i].a4 + '</div>'
                            + '</div>'
                        + '</label>'
                    + '</li>'
                    + '<li style="height: 2rem;"><a class="icon iconfont icon-shanchu  pull-right" href="javascript:;" onclick="deleteAddr(\'' + escape(JSON.stringify($data[i])) + '\')">删除</a>'
                    + '<a class="icon iconfont icon-bianji pull-right" href="javascript:;" onclick="editAddr(\'' + escape(JSON.stringify($data[i])) + '\')">编辑</a></li>'
                + '</ul><p></p>';


    }

    $('#con_' + typename).html(html);
}


//展示试用装列表
function render_act_list(pageno, data) {
    var $data = JSON.parse(data);
    var html = '';

    for (var i = 0; i < $data.length; i++) {

        html += '<a href="detail.htm?id=' + $data[i].id + '" class="external">'
                    + '<div class="card">'
                        + '<div valign="bottom" class="card-header color-white no-border">'
                            + '<img class="card-cover" src="' + domain + $data[i].pic + '" />'
                        + '</div>'
                        + '<div class="card-content">'
                            + '<div class="card-content-inner">'
                               + ' <span>' + $data[i].name + '</span> <span style="float: right">' + $data[i].gift + '积分/份</span>'
                            + '</div>'
                        + '</div>'
                        + '<div class="card-footer card-content-inner">'
                         + '   <span class="color-gray">' + $data[i].remark + '</span>'
                        + '</div>'
                    + '</div>'
                + '</a>';
    }
    if (pageno > 1) {
        $('#con_act_list').append(html);
    } else {
        $('#con_act_list').html(html);
    }

    loading = false;
}


//展示审核中试用装列表
function render_rev_taf_act_list(pageno, data) {
    var $data = JSON.parse(data);
    var html = '';

    for (var i = 0; i < $data.length; i++) {

        html += '<div class="card">'
                        + '<div valign="bottom" class="card-header color-white no-border">'
                            + '<img class="card-cover" src="' + domain + $data[i].pic + '" />'
                        + '</div>'
                        + '<div class="card-content">'
                            + '<div class="card-content-inner">'
                               + ' <span>' + $data[i].name + '</span> <span style="float: right">' + $data[i].gift + '积分/份</span>'
                            + '</div>'
                        + '</div>'
                        + '<div class="card-footer card-content-inner">'
                         + '   <span class="color-gray">' + $data[i].remark + '</span>'
                        + '</div>'
                    + '</div>';
    }
    if (pageno > 1) {
        $('#con_shsyz_list').append(html);
    } else {
        $('#con_shsyz_list').html(html);
    }

    loading = false;
}

//展示派发管理列表数据
function render_distributed_list(pageno, data) {
    var $data = JSON.parse(data);
    var html = '';

    for (var i = 0; i < $data.length; i++) {
        html += '<a href="sendinfo.htm?id=' + $data[i].id + '" class="external">'
                    + '<div class="card">'
                     + '   <div valign="bottom" class="card-header color-white no-border">'
                     + '       <img class="card-cover" src="' + domain + $data[i].pic + '" />'
                     + '   </div>'
                     + '   <div class="card-content">'
                      + '      <div class="card-content-inner syzcard">'
                      + '          <span>' + $data[i].name + '</span> <span style="float: right">' + $data[i].gift + '积分/份</span>'
                      + '      </div>'
                       + '     <div class="card-content-inner">'
                          + '      <span class="color-gray">' + $data[i].remark + '</span>'
                          + '  </div>'
                       + ' </div>'
                        + '<div class="card-footer">管理</div></div></a>';
    }
    if (pageno > 1) {
        $('#con_send_list').append(html);
    } else {
        $('#con_send_list').html(html);
    }

    loading = false;
}



//展示完成派发列表数据
function render_complete_distributed_list(pageno, data) {
    var $data = JSON.parse(data);
    var html = '';

    for (var i = 0; i < $data.length; i++) {
        html += '<div class="card">'
                        + '<div valign="bottom" class="card-header color-white no-border">'
                            + '<img class="card-cover" src="' + domain + $data[i].pic + '" />'
                        + '</div>'
                        + '<div class="card-content">'
                            + '<div class="card-content-inner">'
                               + ' <span>' + $data[i].name + '</span> <span style="float: right">' + $data[i].gift + '积分/份</span>'
                            + '</div>'
                        + '</div>'
                        + '<div class="card-footer card-content-inner">'
                         + '   <span class="color-gray">' + $data[i].remark + '</span>'
                        + '</div>'
                    + '</div>';
    }
    if (pageno > 1) {
        $('#con_complete_list').append(html);
    } else {
        $('#con_complete_list').html(html);
    }

    loading = false;
}

//获取url传参
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

// 验证手机号
function isPhoneNo(phone) {
    var pattern = /^1[34578]\d{9}$/;
    return pattern.test(phone);
}

function showscore() {

    $.modal({
        text: '<div class="list-block">'
                + '<ul>'
                    + '<li>'
                       + ' <div class="item-content">'
                            + '<div class="item-inner">'
                                + '<div class="item-title label">兑换额度</div>'
                                + '<div class="item-input">'
                                    + '<input type="number" placeholder="请填写金额">'
                                + '</div>'
                            + '</div>'
                        + '</div>'
                    + '</li>'
                    + '<li>'
                        + '<div class="item-content">'
                            + '<div class="item-inner">'
                                + '<div class="item-title label">开户行</div>'
                                + '<div class="item-input">'
                                    + '<input type="text" placeholder="已设置">'
                                + '</div>'
                            + '</div>'
                        + '</div>'
                    + '</li>'
                     + '<li>'
                        + '<div class="item-content">'
                            + '<div class="item-inner">'
                                + '<div class="item-title label">开户人</div>'
                                + '<div class="item-input">'
                                    + '<input type="text" placeholder="姓名">'
                                + '</div>'
                            + '</div>'
                        + '</div>'
                    + '</li>'
                     + '<li>'
                        + '<div class="item-content">'
                            + '<div class="item-inner">'
                                + '<div class="item-title label">银行卡号</div>'
                                + '<div class="item-input">'
                                    + '<input type="number" placeholder="输入卡号">'
                                + '</div>'
                            + '</div>'
                        + '</div>'
                    + '</li>'
                     + '<li>'
                    + '<div class="content-block">'
                + '<p><a href="#myscore" onclick="closeModel()" class="button button-fill button-big external">提交</a></p></div>'
                + '</li></ul></div>'
    })
}

function closeModel() {
    $.closeModal();
}


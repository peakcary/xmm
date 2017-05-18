
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
                render_act_list(pageno, JSON.stringify($innerdata));
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

function render_act_list(pageno, data) {
    var $data = JSON.parse(data);
    var html = '';
    if ($data.length < 1) {
        //解除绑定上拉事件
        $.detachInfiniteScroll($('#page-slsyz .infinite-scroll'));
        $('#page-slsyz .infinite-scroll-preloader').hide();
    } else {
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
            $.pullToRefreshDone('.page-slsyz');
            //恢复绑定上拉事件
            $.attachInfiniteScroll($('#page-slsyz .infinite-scroll'));
            $('#page-slsyz .infinite-scroll-preloader').show();
        }
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


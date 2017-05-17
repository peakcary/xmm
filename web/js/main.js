
var domain = 'http://tt.xiongmama.com.cn';

//获取试用装列表
function get_taf_act_list() {
    var api = '/wx/activity/taf_act_list';
    $.ajax({
        type: 'post',
        url: domain + api,
        dataType: 'json',
        data: { p: 1 },
        success: function (result) {
            if (result.code == 0) {
                var $data = result.data;
                var total = $data.count;
                var $innerdata = $data.data;
                render_act_list(JSON.stringify($innerdata));
            }
        }
    });
}

function render_act_list(data) {
    var $data = JSON.parse(data);
    var html = '';
    for (var i = 0; i < $data.length; i++) {

        html += '<div class="card">'
                    + '<a href="detail.htm?id=' + $data[i].id + '" class="external" style="display: block;">'
                        + '<div valign="bottom" class="card-header color-white no-border">'
                            + '<img class="card-cover" src="' + domain + $data[i].pic + '" />'
                        + '</div>'
                        + '<div class="card-content">'
                            + '<div class="card-content-inner">'
                               + ' <span>' + $data[i].name + '</span> <span style="float: right">' + $data[i].gift + '积分/份</span>'
                            + '</div>'
                        + '</div>'
                        + '<div class="card-footer">'
                         + '   <span class="color-gray">' + $data[i].remark + '</span>'
                        + '</div>'
                    + '</a>'
                + '</div>';
    }
    $('#con_act_list').html(html);
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
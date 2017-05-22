/* global $:true */
/* jshint unused:false*/

+function ($) {
    "use lm";

    $.fn.categoryPicker = function (params) {
        return this.each(function () {
            if (!this) return;
            var format = function (data) {
                var result = [];
                for (var i = 0; i < data.length; i++) {
                    var d = data[i];
                    if (d.label === "请选择") continue;
                    result.push(d.label);
                }
                if (result.length) return result;
                return [""];
            };

            var sub = function (data) {
                if (!data.sublist) return [""];
                return format(data.sublist);
            };

            var getsubCategorys = function (d) {
                for (var i = 0; i < raw.length; i++) {
                    if (raw[i].label === d) return sub(raw[i]);
                }
                return [""];
            };



            var raw =  $.smConfig.rawCategorysData;
        

            var categorys = raw.map(function (d) {
                return d.label;
            });
            var initsubCategorys = sub(raw[0]);

            var currentCategory = categorys[0];
            var currentsubCategory = initsubCategorys[0];

            var defaults = {

                cssClass: "lm-picker",
                rotateEffect: false,  //为了性能

                onChange: function (picker, values, displayValues) {
                    var newCategory = values[0];
                    var newsubCategory;
                    if (newCategory !== currentCategory) {
                        var newsubCategorys = getsubCategorys(newCategory);
                        newsubCategory = newsubCategorys[0];

                        picker.cols[1].replaceValues(newsubCategorys);
                        currentCategory = newCategory;
                        currentsubCategory = newsubCategory;

                        picker.updateValue();
                        return;
                    }
                    newsubCategory = picker.cols[1].value;
                    if (newsubCategory !== currentsubCategory) {
                        currentsubCategory = newsubCategory;
                        picker.updateValue();
                    }
                },

                cols: [
          {
              values: categorys,
              cssClass: "col-first"
          },
          {
              values: initsubCategorys,
              cssClass: "col-second"
          }
        ]
            };

            var p = $.extend(defaults, params);
            //计算value
            var val = $(this).val();
            if (val) {
                p.value = val.split(" ");
                if (p.value[0]) {
                    currentCategory = p.value[0];
                    p.cols[1].values = getsubCategorys(p.value[0]);
                }
                if (p.value[1]) {
                    currentsubCategory = p.value[1];
                } else {

                }
            }

            $(this).picker(p);
        });
    };

} ($);

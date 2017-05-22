/* global $:true */
/* jshint unused:false*/

+function ($) {
    "use strict";

    $.fn.cityPicker = function (params) {
        return this.each(function () {
            if (!this) return;
            var format = function (data) {
                var result = [];
                for (var i = 0; i < data.length; i++) {
                    var d = data[i];
                    if (d.name === "请选择") continue;
                    result.push(d.name);
                }
                if (result.length) return result;
                return [""];
            };

            var sub = function (data) {
                if (!data.sub) return [""];
                return format(data.sub);
            };

            var getCities = function (d) {

                var index_p = 0;
                for (var i = 0; i < raw.length; i++) {
                    if (raw[i].name === d) {
                        index_p = i;
                    };
                }

                currentProvince = raw[index_p].name;

                return sub(raw[index_p]);
            };

            var getDistricts = function (p, c) {

                var index_p = 0, index_c = 1;
                for (var i = 0; i < raw.length; i++) {
                    if (raw[i].name === p) {
                        index_p = i;
                        for (var j = 0; j < raw[i].sub.length; j++) {
                            if (raw[i].sub[j].name === c) {
                                index_c = j;
                            }
                        }
                    }
                }

                currentCity = raw[index_p].sub[index_c].name;

                return sub(raw[index_p].sub[index_c]);
            };

            var raw = $.smConfig.rawCitiesData;
            var provinces = raw.map(function (d) {

                return d.name;
            });
            var initCities = sub(raw[0]);
           
            var initDistricts = sub(raw[0].sub[1]);
           
            var currentProvince = provinces[0];
            var currentCity = initCities[0];
            var currentDistrict = initDistricts[0];

            
            var defaults = {

                cssClass: "city-picker",
                rotateEffect: false,  //为了性能

                onChange: function (picker, values, displayValues) {

                    var newProvince = values[0];
                    var newCity;
                   
                    if (newProvince !== currentProvince) {
                        var newCities = getCities(newProvince);
                        newCity = newCities[0];
                        var newDistricts = getDistricts(newProvince, newCity);
                        picker.cols[1].replaceValues(newCities);
                        picker.cols[2].replaceValues(newDistricts);
                        currentProvince = newProvince;
                        currentCity = newCity;
                        picker.updateValue();
                        return;
                    }
                    newCity = picker.cols[1].value;
                    if (newCity !== currentCity) {
                        picker.cols[2].replaceValues(getDistricts(newProvince, newCity));
                        currentCity = newCity;
                        picker.updateValue();
                    }
                },

                cols: [
          {
              values: provinces,
              cssClass: "col-province"
          },
          {
              values: initCities,
              cssClass: "col-city"
          },
          {
              values: initDistricts,
              cssClass: "col-district"
          }
        ]
            };

            var p = $.extend(defaults, params);
            //计算value
            var val = $(this).val();
            if (val) {

                p.value = val.split(" ");
                if (p.value[0]) {

                    currentProvince = p.value[0];

                    p.cols[1].values = getCities(p.value[0]);

                    if (currentProvince != p.value[0]) {
                        p.value[0] = currentProvince;
                    }
                }
                if (p.value[1]) {

                    currentCity = p.value[1];

                    p.cols[2].values = getDistricts(p.value[0], p.value[1]);

                    if (currentCity != p.value[1]) {
                        p.value[1] = currentCity;
                        p.value[2] = p.cols[2].values[0];
                        currentDistrict = p.value[2];
                    }

                } else {
                    currentCity = p.cols[1].values[0];
                    p.value[1] = p.cols[1].values[0];

                    p.cols[2].values = getDistricts(p.value[0], p.value[1]);

                    p.value[2] = p.cols[2].values[0];
                    currentDistrict = p.value[2];

                }
            }

            $(this).picker(p);
        });
    };

} ($);

ChooseType()

        function ChooseType() {

            // var time1 = GetXFormFieldById("fd_34def0c182299e");
            // var time2 = GetXFormFieldById("fd_34def0c23deb00");
            var str = 2015 - 05; //原文本格式"2015-05-26";

            // 转换文本的日期格式
            // str = str.replace(`/-/g`, '/'); // 转为格式"2015/05/26";
            // 创建日期对象，并初始化，完成文本转日期
            console.log(new Date())
            var date = new Date('2015-05');

            //日期转文本方式一：
            // str = date.format("yyyy-MM-dd");
            var year = date.getFullYear(); //年
            console.log(date.getFullYear(), date.getMonth())
            var month = date.getMonth() + 6; //月 +6个月  因为js里month从0开始，所以要加1
            if (month > 12) {
                year++;
                month -= 12;
            }
            if (month < 10) {
                month = "0" + month;
            }
            var date2 = new Date(year, month, 0); //新的年月
            var day1 = date.getDate();
            var day2 = date2.getDate();
            if (day1 > day2) { //防止+6月后没有31天
                day1 = day2;
            }
            str = year + '-' +
                month + '-' +
                day1;

            //最后赋值文本框显示
            // time2[0].value = str;
            console.log(str, '//////')
        }
        // 选择后7个月的日期
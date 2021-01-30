const validate = {
    // 判断是否选择了内容
    haveOption(selectData = []) {
        return selectData.some(item => {
            return (
                (item.movePayment.length > 0 || item.swipeCard.length > 0) &&
                item.month !== null &&
                item.month
            );
        }); 
    },
    haveMonth(selectData = []) {
        return selectData.some(item => {
            return (
                item.month !== null &&
                item.month
            );
        });
    },
    // 判断是否重复核准id
    haveRepeactId(list = []) {
        return list.some(item => {
            let havePayRepeact = item.movePayment.filter(
                id => id.indexOf() !== id.lastIndexOf()
            );
            let haveCardRepeact = item.swipeCard.filter(
                id => id.indexOf() !== id.lastIndexOf()
            );
            let result = {
                vaild: true,
                msg: ""
            };
            if (havePayRepeact.length !== 0) {
                result.vaild = false;
                result.msg = "选择的移动核准记录有重复项";
                return result;
            }
            if (haveCardRepeact.length !== 0) {
                result.vaild = false;
                result.msg = "选择的刷卡核准记录有重复项";
                return result;
            }
            return result;
        });
    },
    haveRepeactOpt(list = []) {
        let swipeCardId = [];
        let movePaymentId = [];
        list.forEach(item => {
            swipeCardId = [...item.swipeCard, ...swipeCardId];
            movePaymentId = [...item.movePayment, ...movePaymentId];
        });
        let allSwipeCardIdId = swipeCardId.filter(
            item => swipeCardId.indexOf(item) !== swipeCardId.lastIndexOf(item)
        );
        let result = {
            vaild: true,
            msg: ""
        };
        if (allSwipeCardIdId.length > 0) {
            result.vaild = false;
            result.msg = "选择的刷卡核准列表有重复选项";
            return result;
        }
        let allMovePaymentIdId = movePaymentId.filter(
            item =>
                movePaymentId.indexOf(item) !== movePaymentId.lastIndexOf(item)
        );
        if (allMovePaymentIdId.length > 0) {
            result.vaild = false;
            result.msg = "选择的移动核准列表有重复选项";
            return result;
        }
        return result;
    },
    // 判断是否重复月份
    haveRepeactMonth(list) {
        var hash = {};
        for (var i in list) {
            if (list[i].month !== null) {
                if (hash[list[i].month]) {
                    return true;
                }
                hash[list[i].month] = true;
            }
        }
        return false;
    }
};

export default validate;

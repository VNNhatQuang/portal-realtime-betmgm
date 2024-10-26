const moment = require("moment-timezone");


const DateTimeHelper = {

    /**
     * Chuyển đổi ngày từ múi giờ ban đầu sang múi giờ đích
     * @param {*} date ISO string (example: "2024-08-26T12:00:00")
     * @param {*} fromTimeZone 
     * @param {*} toTimeZone 
     * @returns 
     */
    convertTimeZone: (date, fromTimeZone, toTimeZone) => {
        const convertData = moment.tz(date, fromTimeZone).tz(toTimeZone).format(); // Trả về kết quả dưới dạng ISO string
        return convertData;
    },

    /**
     * Lấy ngày hiện tại dựa vào timeZone
     * Trả về format 2024-08-29T09:24:39+07:00
     * @param {*} timeZone 
     * @returns 
     */
    getCurrentDateByTimezone: (timeZone) => {
        return moment.tz(timeZone).format();
    },

    /**
     * Hàm lấy ngày tiếp theo của 1 ngày thuộc 1 timeZone bất kỳ
     * Trả về format 2024-08-30T09:35:09+07:00
     * @param {*} date Ngày mốc
     * @param {*} timeZone Time zone của ngày mốc
     * @param {*} nextDay số ngày tiếp theo cần lấy
     * @returns 
     */
    getNextDay: (date, timeZone, nextDay) => {
        return moment.tz(date, timeZone).add(nextDay, 'day').format();
    },

    /**
     * Trả về xem hôm nay là ngày thứ mấy, dựa vào ngày và timeZone của ngày đó
     * @param {*} date 
     * @param {*} timeZone 
     * @returns 
     */
    getDayOfWeekByTimeZone: (date, timeZone) => {
        return moment.tz(date, timeZone).format('ddd');
    },

    /**
     * Lấy ngày hiện tại dựa vào timeZone server
     * Trả về format 2024-08-29 09:24:39
     * @returns 
     */
    getCurrentDate: () => {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const date = String(now.getDate()).padStart(2, "0");

        const hour = String(now.getHours()).padStart(2, "0");
        const minute = String(now.getMinutes()).padStart(2, "0");
        const second = String(now.getSeconds()).padStart(2, "0");

        return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
    },


}



module.exports = DateTimeHelper;

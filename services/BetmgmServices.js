const axios = require("axios");
const randomUseragent = require('random-useragent');
require("dotenv").config();
const BetmgmParamApi = require("../models/BetmgmParamApi");
const DateTimeHelper = require("../helpers/DateTimeHelper");


class BetmgmServices {


    /**
     * Hàm lấy danh sách trận đấu
     * @param {String} tournament "All" hoặc tên giải đấu (MLB, NFL,...)
     * @param {String} stage Trạng thái kèo (All, Live, PreMatch)
     * @param {String} date "All" hoặc ngày theo chuẩn ISO 8601 (Example: "2024-10-24T14:20:00")
     * @param {String} timeZone Timezone của ngày cần filter (Example: "Asia/Saigon")
     * @returns 
     */
    getMatches = async (tournament = "All", stage = "All", date = "All", timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone) => {
        try {

            const betmgmParamsApi = await BetmgmParamApi.findAll({
                where: { tournamentName: (tournament === "All") ? "%" : tournament }
            });


            let data = [];
            let url = process.env.API_URL_BETMGM;
            const headers = {
                'authority': process.env.DOMAIN_BETMGM,
                'method': 'GET',
                'scheme': 'https',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'vi',
                'Sec-Ch-Ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Microsoft Edge";v="122"',
                'Sec-Ch-Ua-Mobile': '?0',
                'Sec-Ch-Ua-Platform': "Windows",
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0",
                'X-App-Context': 'default',
                'X-From-Product': 'sports'
            };

            await Promise.all(
                betmgmParamsApi.map(async betmgmParamApi => {
                    const params = {
                        layoutSize: "Large",
                        page: "CompetitionLobby",
                        sportId: betmgmParamApi.sportId,
                        regionId: betmgmParamApi.regionId,
                        competitionId: betmgmParamApi.tournamentId,
                        compoundCompetitionId: `1:${betmgmParamApi.tournamentId}`,
                        widgetId: betmgmParamApi.widgetId,
                        shouldIncludePayload: true,
                    }
                    await axios.get(url, { params, headers })
                        .then(response => {
                            if (response?.data?.widgets?.[0]?.payload?.items?.[0]?.activeChildren?.[0]?.payload?.fixtures != undefined) {
                                data.push(...response.data.widgets[0].payload.items[0].activeChildren[0].payload.fixtures);
                            }
                            else if (response?.data?.widgets?.[0]?.payload?.fixtures != undefined) {
                                data.push(...(response.data.widgets[0].payload.fixtures));
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            // console.log(error.response.text, error.response.status);
                        })
                })
            )


            // Filter theo điều kiện
            const dataFilter = data.filter(match => {
                let competition = match.competition.name.value.trim();
                if (competition === "College Football") competition = "NCAAF";
                return (
                    competition === tournament
                    &&
                    (
                        stage === "All"
                        ||
                        match.stage == stage
                    )
                    &&
                    (
                        date === "All"
                        ||
                        DateTimeHelper.convertTimeZone(match.startDate, "UTC", timeZone).split("T")[0] === date.split("T")[0]
                    )
                )
            })

            // Sort
            const dataSort = dataFilter.sort((a,b) => (new Date(a.startDate).getTime() - new Date(b.startDate).getTime()));

            // Loại bỏ trận bị trùng
            return Array.from(new Map(dataSort.map(item => [item.id, item])).values());

        } catch (error) {
            console.log(error);
            return [];
        }
    }

}



module.exports = new BetmgmServices;

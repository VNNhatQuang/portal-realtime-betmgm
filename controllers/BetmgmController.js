const BetmgmServices = require("../services/BetmgmServices");


class BetmgmController {

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    index = async (req, res) => {
        try {

            let { tournament } = req.params;
            const { date, timeZone } = req.query;

            const data = await BetmgmServices.getMatches(
                tournament
                , "All"
                , date ?? "All"
                , timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone
            );

            return res.status(200).json({
                success: true,
                data: data
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "INTERNAL SERVER ERROR!" });
        }
    }


}



module.exports = new BetmgmController;

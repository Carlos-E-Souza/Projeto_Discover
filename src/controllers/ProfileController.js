const Profile = require('../model/Profile')

module.exports = {
    async index(req, res) {
        return res.render(`profile.ejs`, { profile: await Profile.get() })
    },

    async update(req, res) {
        const data = req.body
        const weeksPerYear = 52
        const weeksPerMonth = (weeksPerYear - data.vacation_per_year) / 12
        const weekTotalHours = data.hours_per_day * data.days_per_week
        const monthlyTotalHours = weeksPerMonth * weekTotalHours

        const valueHour = data.monthly_budget / monthlyTotalHours

        await Profile.update({
            ...await Profile.get(),
            ...req.body,
            value_hour: valueHour
        })

        return res.redirect('/profile')
    },
}
const Job = require("../model/Job")
const JobUtils = require("../utils/JobUtils")
const Profile = require("../model/Profile")

module.exports = {
    async index(req, res) {
        const jobes = await Job.get()
        const profile = await Profile.get()

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobes.length,
        }

        let jobTotalHours = 0

        const updatedJobs = jobes.map((job) => {
            const remaining = JobUtils.remainingDays(job);
            const status = Number(remaining) <= 0 ? "done" : "progress";

            statusCount[status] += 1;

            jobTotalHours = status == "progress" ? jobTotalHours + Number(job.daily_hours) : jobTotalHours;

            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile.value_hour)
            };
        })

        const freeHours = (profile.hours_per_day - jobTotalHours)

        return res.render("index.ejs", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })
    },
}

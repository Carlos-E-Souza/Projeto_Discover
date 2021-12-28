module.exports = {
    remainingDays(job) {
        const remainingDays = (job.total_hours / job.daily_hours).toFixed(0)

        const createdDate = new Date(job.created_at)
        const dueDay = (Number(createdDate.getDay()) + Number(remainingDays))
        const dueDate = createdDate.setDate(dueDay)

        const timeDiffInMs = dueDate - Date.now()
        const dayInMs = 1000 * 60 * 60 * 24
        const dayDiff = Math.floor(timeDiffInMs / dayInMs)

        return Number(dayDiff)
    },

    calculateBudget(job, valueHour) {
        return valueHour * job.total_hours
    },
}
let date= "07/08/2020 00:00:00 PM";
console.log(typeof(date))

function upTime(startDate){

	let timePeriod={
		days:Math.floor((new Date() - new Date(startDate))/(1000*86400)),
		hours:Math.floor((new Date() - new Date(startDate))/ (1000*60*60))%24,
		minutes:Math.floor((new Date() - new Date(startDate))/(1000*60))%60,
		seconds:Math.floor((new Date() - new Date(startDate))/ (1000)%60)
	}
		function returnDateString(period){
			return `${period.days}:${period.hours}:${period.minutes}:${period.seconds}`
		}
	return returnDateString(timePeriod)
}
console.log(upTime(date));
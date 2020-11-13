export const CalculateDate = (day, month, year) => {
	if(month === "01") {
        return `on ${day} Jan ${year}`
    }
    if(month === '02') {
        return `on ${day} Feb ${year}`
    }
    if(month === '03') {
        return `on ${day} Mar ${year}`
    }
    if(month === '04') {
        return `on ${day} Apr ${year}`
    }
    if(month === '05') {
        return `on ${day} May ${year}`
    }
    if(month === '06') {
        return `on ${day} Jun ${year}`
    }
    if(month === '07') {
        return `on ${day} Jul ${year}`
    }
    if(month === '08') {
        return `on ${day} Aug ${year}`
    }
    if(month === '09') {
        return `on ${day} Sep ${year}`
    }
    if(month === '10') {
        return `on ${day} Oct ${year}`
    }
    if(month === '11') {
        return `on ${day} Nov ${year}`
    }
    if(month === '12') {
        return `on ${day} Dec ${year}`
    }
};

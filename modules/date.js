export function timePostedDifference(postedMsgDate) {
    const currentTime = new Date();
    const savedDate = new Date(postedMsgDate)
    const timeDiffInMilliseconds = savedDate.getTime() - currentTime.getTime();
    let unit = 'second';
    let value = timeDiffInMilliseconds / 1000;
    
    if(Math.abs(value) > 60) {
        value /= 60;
        unit = 'minute';
        
        if(Math.abs(value) > 60) {
            value /= 60;
            unit = 'hour';
            
            if(Math.abs(value) > 24) {
                value /= 24;
                unit = 'day';
                
                if(Math.abs(value) > 7) {
                    value /= 7;
                    unit = 'week';
                    
                    if(Math.abs(value) > 4) {
                        value /= 4;
                        unit = 'month';
                        
                        if(Math.abs(value) > 12) {
                            value /= 12;
                            unit = 'year';
                        }
                    }
                }
            }
        }
    }
    
    const formatter = new Intl.RelativeTimeFormat('en') // navigator.language för svenska
    const timeDifferenceString = formatter.format(Math.round(value), unit)
    return timeDifferenceString;
}
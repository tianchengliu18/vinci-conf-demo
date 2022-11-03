function untilDays(targetAsString) {
    var today  = new Date();
    var target = new Date(Date.parse(targetAsString));
    var one_day = 1000 * 60 * 60 * 24;

    return Math.ceil((target.getTime() - today.getTime()) / one_day); 
};

function untilText(targetAsString) {
    var dleft = untilDays(targetAsString);
    if(dleft < 0) 
        return ``; // `passed`;
    if(dleft === 0) 
        return `today`;
    if(dleft === 1) 
        return `tomorrow`;

    if(dleft < 14) 
        return `in ${dleft} days`;
        
    return `in ${Math.floor(dleft / 7)} weeks`;
};

function untilDecorate(targetAsString, htmlElement) {
    var dleft = untilDays(targetAsString);
    if(dleft < 0) 
        return htmlElement.classList.add('passed');
    if(dleft < 7) 
        return htmlElement.classList.add('upcomming');
    return;
};

function extImportantDates() {
    var spans = document.getElementsByClassName('deadline');
    var lefts = document.getElementsByClassName('daysleft');

    for(var i = 0; i < spans.length; ++i) {
        lefts[i].innerText = untilText(spans[i].dataset.deadline);
        untilDecorate(spans[i].dataset.deadline, spans[i]);
    }
}

window.onload = function() {
    extImportantDates();
}

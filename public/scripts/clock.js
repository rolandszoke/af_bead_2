const $time = $('.time');
const $secondHand = $('.second-hand');
const $minsHand = $('.min-hand');
const $hourHand = $('.hour-hand');
function setDate() {
    const now = new Date();

    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    $secondHand.css('transform',`rotate(${secondsDegrees}deg)`);
    //$secondHand.find(".timer").html(seconds);

    /*
    if((seconds===60)){
        $('.hand').css('transition','all 0s');
    } else {
        $('.hand').css('transition','all 0.5s');
    }*/

    const mins = now.getMinutes();
    const minsDegrees = ((mins / 60) * 360) + 90;
    $minsHand.css('transform',`rotate(${minsDegrees}deg)`);
    //$minsHand.find(".timer").html(mins);

    const hour = now.getHours();
    const hourDegrees = ((hour / 12) * 360) + 90;
    $hourHand.css('transform',`rotate(${hourDegrees}deg)`);
    //$hourHand.find(".timer").html(hour);

    $time.html(`${hour}:${mins < 10 ? '0' : '' }${mins}:${seconds < 10 ? '0' : '' }${seconds}`);

}

setInterval(setDate,1000); //mp-ként hívás
$(document).ready(function(){
    $('.header__burger').click(function(event){
      $('.header__burger,.header__menu, .header__list').toggleClass('active')
    })
})

$(document).on("click", function(event){
    const $trigger = $(".header__burger");
    if($trigger !== event.target && !$trigger.has(event.target).length){
    $('.header__burger, .header__menu, .header__list').removeClass('active')
    }            
});

  
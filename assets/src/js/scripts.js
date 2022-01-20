$.getJSON('https://private-anon-e781fa6c1c-grchhtml.apiary-mock.com/slides', function (data) {
  count = 0;
  countEnd = 1;
  length = data.data.length;
  function getCar() {
      for (let i = count; i < countEnd; i++) {
          $(".items").append("<div class='swiper-slide item' id='" + data.data[i].id + "'><div class='img'><img src='" + data.data[i].imgUrl + "'></div><div class='id'>" + data.data[i].id + "</div>" + "<div class='text'><div class='name' title='" + data.data[i].title + "'>" + data.data[i].title + "</div><div class='desc' title='" + data.data[i].desc + "' >" + data.data[i].desc + "</div></div><div class='like'>like:<span>" + data.data[i].likeCnt + "</span></div><a href='#' class='like__btn'></a></div>");
          var length = data.data.length - 1;
          if (data.data.length > 1) {
              $(".swiper-button-next").removeClass('swiper-button-disabled swiper-button-lock');
              $(".swiper-button-next").attr('aria-disabled', "false");
          };
          var like = data.data[i].likeCnt;
          $('.like__btn').on('click', function () {
              $(this).addClass('active');
              like = like + 1;
              $(this).parents(".swiper-slide").find(".like > span").html(like);


              $.post("https://private-anon-e781fa6c1c-grchhtml.apiary-mock.com/slides/" + data.data[i].id + "/like", { likeCnt: like })
                  .done(function (data) {
                      $('.js-name').html(data.title);
                      $('.js-desc').html(data.desc);
                      $('.popup').show();
                  });
          })
      };
      count = count + 1;
      countEnd = countEnd + 1;

  }
  var swiper = new Swiper(".cars", {
      navigation: {
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
      },
      grabCursor: false,
      allowTouchMove: false,
  });
  $(document).ready(function () {
      getCar();
  });
  $('.js-next').on('click', function () {
      if (count != data.data.length) {
          getCar();
          swiper.update();
      }
  });
  $('.js-prev').on('click', function () {
      $(".swiper-button-next").removeClass('swiper-button-disabled swiper-button-lock');
      $(".swiper-button-next").attr('aria-disabled', "false");
  });
  $('.close').on('click', function (e) {
      e.preventDefault();
      $('.popup').hide();
      $('.js-name').html();
      $('.js-desc').html();
  });
});
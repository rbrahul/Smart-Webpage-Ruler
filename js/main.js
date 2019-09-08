(function() {
  "use strict";

  var mobileMenuOutsideClick = function() {
    $(document).click(function(e) {
      var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("offcanvas")) {
          $("body").removeClass("offcanvas");
          $(".js-fh5co-nav-toggle").removeClass("active");
        }
      }
    });
  };

  var offcanvasMenu = function() {
    $("#page").prepend('<div id="fh5co-offcanvas" />');
    $("#page").prepend(
      '<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white"><i></i></a>'
    );
    var clone1 = $(".menu-1 > ul").clone();
    $("#fh5co-offcanvas").append(clone1);
    var clone2 = $(".menu-2 > ul").clone();
    $("#fh5co-offcanvas").append(clone2);

    $("#fh5co-offcanvas .has-dropdown").addClass("offcanvas-has-dropdown");
    $("#fh5co-offcanvas")
      .find("li")
      .removeClass("has-dropdown");

    // Hover dropdown menu on mobile
    $(".offcanvas-has-dropdown")
      .mouseenter(function() {
        var $this = $(this);

        $this
          .addClass("active")
          .find("ul")
          .slideDown(500, "easeOutExpo");
      })
      .mouseleave(function() {
        var $this = $(this);
        $this
          .removeClass("active")
          .find("ul")
          .slideUp(500, "easeOutExpo");
      });

    $(window).resize(function() {
      if ($("body").hasClass("offcanvas")) {
        $("body").removeClass("offcanvas");
        $(".js-fh5co-nav-toggle").removeClass("active");
      }
    });
  };

  var burgerMenu = function() {
    $("body").on("click", ".js-fh5co-nav-toggle", function(event) {
      var $this = $(this);

      if ($("body").hasClass("overflow offcanvas")) {
        $("body").removeClass("overflow offcanvas");
      } else {
        $("body").addClass("overflow offcanvas");
      }
      $this.toggleClass("active");
      event.preventDefault();
    });
  };

  var contentWayPoint = function() {
    var i = 0;
    $(".animate-box").waypoint(
      function(direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("animated-fast")
        ) {
          i++;

          $(this.element).addClass("item-animate");
          setTimeout(function() {
            $("body .animate-box.item-animate").each(function(k) {
              var el = $(this);
              setTimeout(
                function() {
                  var effect = el.data("animate-effect");
                  if (effect === "fadeIn") {
                    el.addClass("fadeIn animated-fast");
                  } else if (effect === "fadeInLeft") {
                    el.addClass("fadeInLeft animated-fast");
                  } else if (effect === "fadeInRight") {
                    el.addClass("fadeInRight animated-fast");
                  } else {
                    el.addClass("fadeInUp animated-fast");
                  }

                  el.removeClass("item-animate");
                },
                k * 200,
                "easeInOutExpo"
              );
            });
          }, 100);
        }
      },
      { offset: "85%" }
    );
  };

  var dropdown = function() {
    $(".has-dropdown")
      .mouseenter(function() {
        var $this = $(this);
        $this
          .find(".dropdown")
          .css("display", "block")
          .addClass("animated-fast fadeInUpMenu");
      })
      .mouseleave(function() {
        var $this = $(this);

        $this
          .find(".dropdown")
          .css("display", "none")
          .removeClass("animated-fast fadeInUpMenu");
      });
  };

  var goToTop = function() {
    $(".js-gotop").on("click", function(event) {
      event.preventDefault();

      $("html, body").animate(
        {
          scrollTop: $("html").offset().top
        },
        500,
        "easeInOutExpo"
      );

      return false;
    });

    $(window).scroll(function() {
      var $win = $(window);
      if ($win.scrollTop() > 200) {
        $(".js-top").addClass("active");
      } else {
        $(".js-top").removeClass("active");
      }
    });
  };

  // Loading page
  var loaderPage = function() {
    $(".fh5co-loader").fadeOut("slow");
  };

  var counter = function() {
    $(".js-counter").countTo({
      formatter: function(value, options) {
        return value.toFixed(options.decimals);
      }
    });
  };

  var counterWayPoint = function() {
    if ($("#fh5co-counter").length > 0) {
      $("#fh5co-counter").waypoint(
        function(direction) {
          if (direction === "down" && !$(this.element).hasClass("animated")) {
            setTimeout(counter, 400);
            $(this.element).addClass("animated");
          }
        },
        { offset: "90%" }
      );
    }
  };

  function showFormAlert(alertType, message) {
    var alert =
      '<div class="alert alert-' +
      alertType +
      '" role="alert">' +
      message +
      "</div>";
    $("#form-message").html(alert);
  }

  function hideAlert() {
    $("#form-message").html("");
  }

  function sendEmail(e) {
    var SENDGRID_API_KEY = "";
    e.preventDefault();
    hideAlert();
    var fields = {
      subject: "",
      message: "",
      email: "",
      fname: "",
      lname: ""
    };
    var valid = true;
    for (var key in fields) {
      var value = $("#" + key + "").val();
      if (value && $.trim(value)) {
        fields[key] = value;
      } else {
        showFormAlert("danger", "Invalid input");
        valid = false;
        break;
      }
    }
    if (!valid) {
      return;
	}
	// sendgrid doesn't accept browser based email receiving
    $.ajax({
      url: "https://api.sendgrid.com/v3/mail/send",
      method: "POST",
      headers: {
        Authorization: "Bearer " + SENDGRID_API_KEY,
        "Conent-Type": "application/json"
      },
      data: JSON.stringify(fields)
    })
      .done(function(data) {
        showFormAlert("success", "Message has been sent, Thank you :)");
        console.log(data);
      })
      .fail(function(err) {
        console.error(err);
      });
  }

  function inilizeEvent() {
    $("#submit-btn").on("click", sendEmail);
  }

  $(function() {
    mobileMenuOutsideClick();
    offcanvasMenu();
    burgerMenu();
    contentWayPoint();
    dropdown();
    goToTop();
    loaderPage();
    counterWayPoint();
    // custome code
    inilizeEvent();
  });
})();

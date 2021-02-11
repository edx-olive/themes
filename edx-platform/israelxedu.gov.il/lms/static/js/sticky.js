/*
 * Campus IL - EdX platform and ecommerce themes
 * Copyright (C) 2021 Campus IL
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

var $el = $('#sticky'),
    stickyBarTop = $('#sticky').offset().top,
    MIN_WEB_WIDTH = 768;

function initializeSticky(){
    if ($(window).width() >= MIN_WEB_WIDTH){
        var windowTop = $(window).scrollTop();
        if (stickyBarTop < windowTop){
            makeSticky();
        }
        else {
            removeSticky();
        }
    }
    else {
        removeSticky();
    }
}

function makeSticky(){
    $el.css({
        'position': 'fixed',
        'top': 0,
        'width': '100%',
        'z-index': '10',
        'box-shadow': '0px 1px 5px rgba(0,0,0,0.5)'
    });
    $(".sticky-course-title").removeClass("hidden");
    $(".course-run").addClass("hidden");
}

function removeSticky(){
    $el.css({
        'position': 'static',
        'z-index': '0',
        'box-shadow': 'none'
    });
    $(".sticky-course-title").addClass("hidden");
    $(".course-run").removeClass("hidden");
}

$(document).ready(function(){
    if ($el.length) {        //Element should exist
        $(window).scroll(function(){
            initializeSticky();
        });
    }
});

$(window).resize(function(){
    initializeSticky()
});

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

$(document).ready(function () {
    $('.back-to-top').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, 300);
    });

    $('ul.list-divided li.item a').on('click', function(event) {
        event.preventDefault();
        var div = $(this).attr('href');
        $('html, body').animate({scrollTop: $(div).offset().top}, 300);
    });
});

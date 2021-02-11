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

var CAMPUS = CAMPUS || {};

CAMPUS.cityValues = (function(){

  var selectModifier = '';
  var lang = $('html').attr('lang');

  var anchorTo = function(selector, modifier) {

    selectModifier = modifier;
    CreateCityTypeahead(selector);

  };

  //City typeahead creation
  var CreateCityTypeahead = function(selector) {
    var data = new Bloodhound({
      datumTokenizer: function(datum) {
        return Bloodhound.tokenizers.whitespace(datum['city']);
      },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      prefetch: 'https://s3-us-west-2.amazonaws.com/edunextpublic/campus-il/'+lang+'/all-cities.json'
    });

    data.clearPrefetchCache();
    data.initialize(true);

    $(selector).typeahead({
      hint: false,
      highlight: true,
      minLength: 1
    },
    {
      name: 'Locations',
      displayKey: 'city',
      source: function(query, cb) {
        data.search(query, function(suggestions) {
          cb(filter(suggestions));
        });
      }
    });

  };

  //this function is intended to filter suggestions according selected country
  var filter = function(suggestions) {
    var countryVal = $(selectModifier).val();

    if ( !countryVal ) {
      return suggestions;
    }

    var filteredSuggestions = [];
    filteredSuggestions = $.grep(suggestions, function(suggestion) {
      return suggestion.country == countryVal;
    });

    return filteredSuggestions;
  }

  var api = {
    anchorTo: anchorTo
  };


  return api;

})();
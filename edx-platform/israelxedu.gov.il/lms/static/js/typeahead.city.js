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
"use strict";
$(function() {

    var toggleHeaderSection = $(".toggle-form");
    var nameInput = $("#register-name");
    var usernameInput = $("#register-username");
    var countryInput = $("#register-country");
    var cityInput = $("#register-city");
    var toggleOptionalFields = $("#toggle_optional_fields[type=checkbox]");
    var optionalFields = [
        ".text-city",
        ".select-gender",
        ".select-country",
        ".textarea-goals",
        ".select-year_of_birth",
        ".select-level_of_education"
    ];

    var hideElements = function(fields) {
        fields.forEach(function(element) {
            let fieldClass = element;
            $(fieldClass).addClass("hidden");
        });
    };


    var showElements = function(fields) {
        fields.forEach(function(element) {
            let fieldClass = element;
            $(fieldClass).removeClass("hidden");
        });
    };

    var toggleCityWidget = function() {
        if (countryInput.val() != "IL") {
            cityInput.val("");
            cityInput.prop("disabled", true);
        }else {
            cityInput.prop("disabled", false);
        }
    };


    //Triggering UI changes
    CAMPUS.cityValues.anchorTo(cityInput, countryInput);
    toggleHeaderSection.insertBefore($("#content-container.login-register-content"));
    usernameInput.attr("aria-autocomplete","inline");

    //Handles username susggestion
    nameInput.change(function(){
        $.ajax({
            type: "GET",
            url: "/campus_social_auth/hint_username_details",
            data: "username=" + nameInput.val().trim(),
            success: function(data){
                usernameInput.val(data.username)
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("hint username request failed");
            }
        });
    });


    //Handles UI optional fields
    hideElements(optionalFields);
    toggleOptionalFields.click(function(){
        if (toggleOptionalFields.is(":checked")) {
            showElements(optionalFields);
        } else  {
            hideElements(optionalFields);
        }
    });

    //Handles if city widget should be disable or not
    toggleCityWidget();
    countryInput.change(function(){
        toggleCityWidget();
    })

    // Google analytics push events
    $("button.login-oa2-facebook").click(function(event) {
        dataLayer.push({'event': 'registration', 'type':'facebook'});
    });
    $("button.login-oa2-google-oauth2").click(function(event) {
        dataLayer.push({'event': 'registration', 'type':'google'});
    });
    $("button.login-saml-moe-edu-idm").click(function(event) {
        dataLayer.push({'event': 'sign_up', 'type':'min_educ'});
    });
});

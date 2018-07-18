OliveX Themes
=============

This repository contains themes for OliveX and OliveX's partners. Repository contains directories to contain themes for
different IDA's. Each IDA has its own directory and themes for a particular IDA should be placed in its own directory.

Detailed information on Theming and setting up themes for devstack and fullstack installations can be found in the docs
of [theming-edx].

[theming-edx]: http://edx.readthedocs.org/projects/edx-installing-configuring-and-running/en/named-release-dogwood.rc/configuration/theming/what_is_theming.html

Localization
------------

Extracting and compiling translations from these custom templates requires several steps.

1. Run the following commands from within the edxapp virtualenv to use edxapp's installed tools.
1. Update this theme's translation catalogs:
	```
    (edxapp) theme/edx-olive $ make extract_translations
	```
1. Manually add translated strings to each of the `conf/locale/*/LC_MESSAGES/*.po` files.
1. Compile the updated `.po` files to `.mo` files.
	```
    (edxapp) theme/edx-olive $ make compile_translations
	```
1. Ensure that this theme's `conf/locale` dir is in edxapp LMS's
   `settings.COMPREHENSIVE_THEME_LOCALE_PATHS`.
1. Update the edx-platform `djangojs.js` files:
    ```
	(edxapp) $ ~edx-platform $ python manage.py lms compilejsi18n --settings=<settings>
	```
1. Ensure that any changes to this theme's translation catalogs *and* the the
   affected edx-platform `djangojs.js` files are committed and pushed to
   their respective repositories.

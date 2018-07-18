.PHONY: compile_translations extract_translations 

DOMAIN=django djangojs
LANG=en ar he
LOCALE_DIR=./conf/locale

## Localization targets

extract_translations: ## extract strings to be translated
	for domain in ${DOMAIN}; do \
		pybabel extract --mapping=${LOCALE_DIR}/babel_$${domain}.cfg \
			--add-comments="Translators:" \
			--keyword="interpolate" --output=$${domain}.po . ; \
		for lang in ${LANG}; do \
			pybabel update --locale=$${lang} --domain $${domain} \
						   --input-file=$${domain}.po --output-dir=${LOCALE_DIR}; \
		done; \
		rm $${domain}.po ; \
	done

compile_translations: ## compile translation files, outputting .mo files for each supported language
	for lang in ${LANG}; do \
		for domain in ${DOMAIN}; do \
			msgfmt ${LOCALE_DIR}/$${lang}/LC_MESSAGES/$${domain}.po \
				-o ${LOCALE_DIR}/$${lang}/LC_MESSAGES/$${domain}.mo; \
		done \
	done

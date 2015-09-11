MOCHA?=node_modules/.bin/mocha
REPORTER=spec
FLAGS= --reporter $(REPORTER) --ui bdd --colors --check-leaks --harmony --compilers js:babel/register
DIR?="test/**/*.js"

test:
	DB="mongodb://localhost/test" \
	mocha ./routes $(FLAGS) $(DIR)

.PHONY: test

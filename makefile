MOCHA?=node_modules/.bin/mocha
REPORTER=spec
FLAGS= --reporter $(REPORTER) --ui bdd --colors --check-leaks --harmony --compilers js:babel/register
DIR?="test/**/*.js"

test:
	DB="mongodb://localhost/test" \
		istanbul cover _mocha ./routes -- $(FLAGS) $(DIR) && cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js

.PHONY: test

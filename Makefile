test: test-coverage
	@XML_COV=1 mocha -u tdd

test-coverage:
	rm -rf lib-cov
	jscoverage lib lib-cov
	@XML_COV=1 mocha -u tdd --reporter html-cov > ./test_coverage.html

.PHONY: test test-coverage

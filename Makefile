######################################################################
# @author      : Enno Boland (mail@eboland.de)
# @file        : Makefile
# @created     : Saturday Nov 05, 2022 20:18:26 CET
######################################################################

BIN = node_modules/.bin

all: test

node_modules: package.json
	npm install --package-lock=false
	@touch node_modules

test: node_modules
	$(BIN)/tsc -p .

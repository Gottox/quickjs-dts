######################################################################
# @author      : Enno Boland (mail@eboland.de)
# @file        : Makefile
# @created     : Saturday Nov 05, 2022 20:18:26 CET
######################################################################

BIN = node_modules/.bin

SRC = globals.d.ts os.d.ts std.d.ts

all: test

docs: node_modules $(SRC)
	$(BIN)/typedoc --out docs $(SRC)

node_modules: package.json
	npm install --package-lock=false
	@touch node_modules

test: node_modules
	$(BIN)/eslint .
	$(BIN)/tsc -p .

clean:
	rm -rf docs

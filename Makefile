KITTYCAD_TS ?= ../kittycad.ts

.PHONY: all install link-kittycad build typecheck test dev clean

all: build

install:
	npm install

link-kittycad:
	npm --prefix $(KITTYCAD_TS) install
	npm link $(KITTYCAD_TS)

build:
	npm run build

typecheck:
	npm run typecheck

test:
	npm test

dev:
	npm run dev

clean:
	rm -rf public/assets node_modules

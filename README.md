# GoodDays

## Team Information:

* Christian Everett, [chrisheesh](https://github.com/chrisheesh)
* Evan Goertzen, [evangoertzen](https://github.com/evangoertzen)
* Nicolas Gres, [nico0302](https://github.com/Nico0302)
* Catherine McGuire, [clmcguire](https://github.com/clmcguire)
* Miguel Ocampo Paniagua, [Miguel9088](https://github.com/Miguel9088)
* Lizet Gutierrez, [lizetg](https://github.com/lizetg)

## building

in order to propperly load the script file for electron to load you must run
`npm run build`. if you want to have file changes automatically built then you
can run `npm run build-watch`.

## running

once the files have been made you can run `npm run electron` which will start
the electron instance and automatically open up dev tools.

## testing

when attempting to test the interface the project uses Jest and
testing-library. there is a simple example of creating tests for the `Reports`
page. you will have to use `@testing-library/react` to render the components and
it will provide some helpful utilities for getting access to the DOM created
when rendering. other parts for actually running the tests is handled by Jest
and the utilities it provides for validating your tests.

Jest Api: https://jestjs.io/docs/api
testing-library: https://testing-library.com/docs/

some of the docs for the testing-library are part of the core api and the DOM
api and `@testing-library/react` should export most (if not all) helper
functions.

both Jest and testing-library provide examples and guides on how to create
tests. once you have a test ready just run `npm run test` and that will start
Jest testing. when running a test, Jest will look for `*.test.ts(x)` files and
then execute the code inside.

if you encounter error when running tests check to see what the error is as it
may not be from a test failing but from jest encountering files that have
invalid syntax or other potentail issues that are outside of the actual test.

# Changelog

## [1.4.0](https://github.com/mdwitr0/kinopoiskdev/compare/v1.3.6...v1.4.0) (2023-07-10)


### Features

* **movie.module.ts:** add ConfigModule import ([fd544bc](https://github.com/mdwitr0/kinopoiskdev/commit/fd544bc6e68fd0ba8188bc23bcff64985e6667d3))
* **movie.service.ts:** add addMovie method to MovieService ([fd544bc](https://github.com/mdwitr0/kinopoiskdev/commit/fd544bc6e68fd0ba8188bc23bcff64985e6667d3))
* **movie.service.ts:** add ConfigService import ([fd544bc](https://github.com/mdwitr0/kinopoiskdev/commit/fd544bc6e68fd0ba8188bc23bcff64985e6667d3))
* **movie.service.ts:** add logger to MovieService ([fd544bc](https://github.com/mdwitr0/kinopoiskdev/commit/fd544bc6e68fd0ba8188bc23bcff64985e6667d3))

## [1.3.6](https://github.com/mdwitr0/kinopoiskdev/compare/v1.3.5...v1.3.6) (2023-07-01)


### Bug Fixes

* !null doesn't support array fields [#120](https://github.com/mdwitr0/kinopoiskdev/issues/120) ([91858d6](https://github.com/mdwitr0/kinopoiskdev/commit/91858d6a1dbb2aea05657c79e95fd95ddec6ef2d))

## [1.3.5](https://github.com/mdwitr0/kinopoiskdev/compare/v1.3.4...v1.3.5) (2023-07-01)


### Bug Fixes

* **user.service.ts:** change method name from resetRequestsUsed to resetRequestsUsedAndCache ([f1e7e01](https://github.com/mdwitr0/kinopoiskdev/commit/f1e7e013d26c703b3f8275f415e7e5de45f7413c))
* **user.service.ts:** update method name from synchronizeUserRequestLimits to synchronizeUserRequestLimitsAndCache ([f1e7e01](https://github.com/mdwitr0/kinopoiskdev/commit/f1e7e013d26c703b3f8275f415e7e5de45f7413c))
* **user.service.ts:** update resetRequestsUsedAndCache method to also flush Redis cache ([f1e7e01](https://github.com/mdwitr0/kinopoiskdev/commit/f1e7e013d26c703b3f8275f415e7e5de45f7413c))
* **user.service.ts:** update synchronizeUserRequestLimitsAndCache method to use bulkWrite instead of updateMany for better performance ([f1e7e01](https://github.com/mdwitr0/kinopoiskdev/commit/f1e7e013d26c703b3f8275f415e7e5de45f7413c))

## [1.3.4](https://github.com/mdwitr0/kinopoiskdev/compare/v1.3.3...v1.3.4) (2023-06-18)


### Bug Fixes

* **query.pipe.ts:** sorting by multiple fields don't support ([3312311](https://github.com/mdwitr0/kinopoiskdev/commit/3312311bf986587362796e551b883e951161a0da))

## [1.3.3](https://github.com/mdwitr0/kinopoiskdev/compare/v1.3.2...v1.3.3) (2023-06-09)


### Bug Fixes

* **movie:** not found by sequelsAndPrequels.id and similarMovies.id ([b39e7c1](https://github.com/mdwitr0/kinopoiskdev/commit/b39e7c15c093505dda96006aba405622f2f668c0))

## [1.3.2](https://github.com/mdwitr0/kinopoiskdev/compare/v1.3.1...v1.3.2) (2023-06-07)


### Bug Fixes

* **user:** add async to reset requests ([040a506](https://github.com/mdwitr0/kinopoiskdev/commit/040a506c1c0e5da5c57aa560aad7f36fc3e68858))
* **user:** user tokens are not reset ([2389969](https://github.com/mdwitr0/kinopoiskdev/commit/238996969e8046a47df6b8942ffed3f0cef5f154))

## [1.3.1](https://github.com/mdwitr0/kinopoiskdev/compare/v1.3.0...v1.3.1) (2023-04-26)


### Bug Fixes

* **person:** 500 error ([5c3908c](https://github.com/mdwitr0/kinopoiskdev/commit/5c3908c271db81ed31c35c9fc2d7c1e2e47c408a))
* **studio:** 401 error ([928b5cc](https://github.com/mdwitr0/kinopoiskdev/commit/928b5cc34297d5c433483a8234f06229a29e6fce))

## [1.3.0](https://github.com/mdwitr0/kinopoiskdev/compare/v1.2.2...v1.3.0) (2023-04-25)


### Features

* **app.module.ts:** add support for v1.3 API version in configure method of AppModule class ([f1ab0b8](https://github.com/mdwitr0/kinopoiskdev/commit/f1ab0b8f4ba176a2955b3d1147220f5b3b0a4561))
* **movie.controller.ts:** add version 1.3 with new endpoints and update descriptions for existing endpoints ([0c86f13](https://github.com/mdwitr0/kinopoiskdev/commit/0c86f1371488a9d4a87bd9d1361a41af13098e62))
* **movie.dto:** add MovieDtoV1 and MovieDocsResponseDtoV1 classes with properties and methods for movie data transfer objects. ([3a9b4c0](https://github.com/mdwitr0/kinopoiskdev/commit/3a9b4c0cb66f918ef533dcb41b59ee453fc2b19f))
* **movie.schema.ts:** add isSeries, totalSeriesLength, and seriesLength properties to Movie schema ([7b5f232](https://github.com/mdwitr0/kinopoiskdev/commit/7b5f2326b33dccc0e87486a48606ef0bc5ec280e))
* **paginated.decorator.ts:** add audience count to entitiesField in paginated decorator ([b1bf7d9](https://github.com/mdwitr0/kinopoiskdev/commit/b1bf7d95423f4444eba880ed7426f7121d57d20d))
* **paginated.decorator.ts:** add booleanFields to entitiesField and versionsEntityField ([4c908d4](https://github.com/mdwitr0/kinopoiskdev/commit/4c908d480a417a780094017317b570d32f35e620))
* **query.pipe.ts:** add support for boolean fields in query parameters ([fa97c7a](https://github.com/mdwitr0/kinopoiskdev/commit/fa97c7a1558efaea543863aabd81b6bf3c82eeb2))

## [1.2.2](https://github.com/mdwitr0/kinopoiskdev/compare/v1.2.1...v1.2.2) (2023-04-11)


### Bug Fixes

* search by rating rounds numbers up to int [#83](https://github.com/mdwitr0/kinopoiskdev/issues/83) ([9f7a1db](https://github.com/mdwitr0/kinopoiskdev/commit/9f7a1db92e2ca467782dbe9e1d3ca9ed1499e62f))

## [1.2.1](https://github.com/mdwitr0/kinopoiskdev/compare/v1.2.0...v1.2.1) (2023-04-10)


### Bug Fixes

* **search:** synchronization is restarted before completion ([2eaa0e7](https://github.com/mdwitr0/kinopoiskdev/commit/2eaa0e7cfb5690ff6fbb3dcb584bdb048da8cfbc))
* **search:** synchronization module works in all processes ([394338b](https://github.com/mdwitr0/kinopoiskdev/commit/394338bb5b5493b060d5418cc99a8e2604adbe05))

## [1.2.0](https://github.com/mdwitr0/kinopoiskdev/compare/v1.1.2...v1.2.0) (2023-04-10)


### Features

* **movie:** add full-text search movie method [#78](https://github.com/mdwitr0/kinopoiskdev/issues/78) ([61ad808](https://github.com/mdwitr0/kinopoiskdev/commit/61ad80870c969cd643b8a0e4af8a25c387813d7a))
* **person:** add full-text search method [#78](https://github.com/mdwitr0/kinopoiskdev/issues/78) ([0fb7e54](https://github.com/mdwitr0/kinopoiskdev/commit/0fb7e545854bca22f8dadec8d90cb1235fb5fb74))


### Bug Fixes

* **movie:** search returns wrong values in pagination [#78](https://github.com/mdwitr0/kinopoiskdev/issues/78) ([11fb508](https://github.com/mdwitr0/kinopoiskdev/commit/11fb508a2c680b09162f07576b49847fa10a9575))
* **person:** search returns wrong values in pagination [#78](https://github.com/mdwitr0/kinopoiskdev/issues/78) ([bbfa01b](https://github.com/mdwitr0/kinopoiskdev/commit/bbfa01b073574c52e66ff81f95e1f63528fa32fd))

## [1.1.2](https://github.com/mdwitr0/kinopoiskdev/compare/v1.1.1...v1.1.2) (2023-03-16)


### Bug Fixes

* **movie:** movies doesn't found by imdb id ([cdb68b9](https://github.com/mdwitr0/kinopoiskdev/commit/cdb68b932b9f93167e4daa09490fd5c5a501dc01))

## [1.1.1](https://github.com/mdwitr0/kinopoiskdev/compare/v1.1.0...v1.1.1) (2023-03-12)


### Bug Fixes

* **studio:** invalid auth ([a81ac18](https://github.com/mdwitr0/kinopoiskdev/commit/a81ac18df80d8b2c9414121ce1a68468dfa52c0c))

## [1.1.0](https://github.com/mdwitr0/kinopoiskdev/compare/v1.0.4...v1.1.0) (2023-03-12)


### Features

* **keyword:** add find method [#69](https://github.com/mdwitr0/kinopoiskdev/issues/69) ([225ed25](https://github.com/mdwitr0/kinopoiskdev/commit/225ed2546b76d0442acd7175f8cfb55eced1e604))
* **movie:** add countries & genres properties to findMany response [#72](https://github.com/mdwitr0/kinopoiskdev/issues/72) ([fd3cd51](https://github.com/mdwitr0/kinopoiskdev/commit/fd3cd514a87ba1db443e55b3646787c01dd2d421))
* **movie:** add find movie awards method [#67](https://github.com/mdwitr0/kinopoiskdev/issues/67) ([8340043](https://github.com/mdwitr0/kinopoiskdev/commit/83400438560d7037f63ae90e82258bf3a51eb07f))
* **movie:** add types and languages to names [#68](https://github.com/mdwitr0/kinopoiskdev/issues/68) ([08a6f5c](https://github.com/mdwitr0/kinopoiskdev/commit/08a6f5cd8515a7d60a1f257682c53aabc3c74c79))
* **person:** add award method [#58](https://github.com/mdwitr0/kinopoiskdev/issues/58) ([56a79bb](https://github.com/mdwitr0/kinopoiskdev/commit/56a79bb4f475dcc99440ee9b80c681fd47dc9d08))
* **studio:** add find studio methods [#63](https://github.com/mdwitr0/kinopoiskdev/issues/63) ([c075fbf](https://github.com/mdwitr0/kinopoiskdev/commit/c075fbf5d832137b7c55ee742a4b6b6343d1bf1a))


### Bug Fixes

* movies aren't found by date ([5475edc](https://github.com/mdwitr0/kinopoiskdev/commit/5475edc2e0251ad74838c0c8e308e40e2be7b9b2))
* **movie:** the "AllOf" are still in the model ([911de08](https://github.com/mdwitr0/kinopoiskdev/commit/911de08402b0c6dd64fc6d96b6009a212c0b2ec9))
* **season:** episode model isn't correct [#64](https://github.com/mdwitr0/kinopoiskdev/issues/64) ([65c668c](https://github.com/mdwitr0/kinopoiskdev/commit/65c668c76f5b9637880fb7b15de8472c0e82cd62))
* the find method has not correct name ([2ae879a](https://github.com/mdwitr0/kinopoiskdev/commit/2ae879ae5d47b4ce7acac57a29454891f6b46758))

## [1.0.4](https://github.com/mdwitr0/kinopoiskdev/compare/v1.0.3...v1.0.4) (2023-03-02)


### Bug Fixes

* **movie:** age rating doesn't accept number the range [#59](https://github.com/mdwitr0/kinopoiskdev/issues/59) ([d6a35bf](https://github.com/mdwitr0/kinopoiskdev/commit/d6a35bf1de1a3fc9164534c9ebe03bb0a93f25b7))
* package lock doesn't valid ([e8e3e63](https://github.com/mdwitr0/kinopoiskdev/commit/e8e3e6304f1eeb02d86b365bc873a287ea389ac5))

## [1.0.3](https://github.com/mdwitr0/kinopoiskdev/compare/v1.0.2...v1.0.3) (2023-02-28)


### Bug Fixes

* errors in the text of the documentation [#53](https://github.com/mdwitr0/kinopoiskdev/issues/53) ([9fd2e7d](https://github.com/mdwitr0/kinopoiskdev/commit/9fd2e7d9825394d8362c1f7f50cbbb56754b2cfe))
* **person:** there is no endpoint to get person by id [#50](https://github.com/mdwitr0/kinopoiskdev/issues/50) ([e2087c7](https://github.com/mdwitr0/kinopoiskdev/commit/e2087c795b0e560140afc946db5ac1d810390b67))

## 1.0.2 (2023-02-27)


### ⚠ BREAKING CHANGES

* release 1.0.2
* release 1.0.1
* release 1.0.0

### Features

* add api base decorator ([104deb7](https://github.com/mdwitr0/kinopoiskdev/commit/104deb7815a46514552007a1490a0229fede987a))
* add app cluster ([6b07de8](https://github.com/mdwitr0/kinopoiskdev/commit/6b07de87721f8070c6536022ee2d3bf10df7d919))
* add base controller ([92b2bc1](https://github.com/mdwitr0/kinopoiskdev/commit/92b2bc1523f03e8d25d85485a85d632444fd6d2f))
* add base controller with find by id ([0fd1671](https://github.com/mdwitr0/kinopoiskdev/commit/0fd16711e88ced35468d60066663a63e1a2a3c4c))
* add base service ([d63703b](https://github.com/mdwitr0/kinopoiskdev/commit/d63703b69d8e63f3787b772025c006c0a5b2c060))
* add controller decorator ([8ca5478](https://github.com/mdwitr0/kinopoiskdev/commit/8ca5478596cb6b854fe4e9b3480952b43a955ee1))
* add description to date properties ([e891863](https://github.com/mdwitr0/kinopoiskdev/commit/e891863b200fc7501f7f36393391398a6660d71c))
* add error dto ([4384cad](https://github.com/mdwitr0/kinopoiskdev/commit/4384cadd9cf81f4226a4308a058dd6c7ba192064))
* add exclude genres & countiries [#19](https://github.com/mdwitr0/kinopoiskdev/issues/19) ([8d0138a](https://github.com/mdwitr0/kinopoiskdev/commit/8d0138abbb711964068d6fefac38efced0596cfb))
* add field transpilation to mongo object ([eef389d](https://github.com/mdwitr0/kinopoiskdev/commit/eef389d04974b906c25f4bf2adba298d3edec753))
* add fields for all entities ([10545e9](https://github.com/mdwitr0/kinopoiskdev/commit/10545e90895fe797f7d77e1ae8887cd63c1cb4fb))
* add paginated decorator ([cecfea0](https://github.com/mdwitr0/kinopoiskdev/commit/cecfea0b589f84d3e4b0afa14383c07e3828be18))
* add pino logging ([e0436ab](https://github.com/mdwitr0/kinopoiskdev/commit/e0436ab5c84d5e3e40a9d9c7ff4fb07e278641b5))
* add query transfom pipe ([e4babda](https://github.com/mdwitr0/kinopoiskdev/commit/e4babda53fd66f5ca76de19fcc2d71cfd0948a16))
* add remove system field interceptor ([17b8d2e](https://github.com/mdwitr0/kinopoiskdev/commit/17b8d2e5824a82d423b76b5d55fda9d8b15c1ceb))
* add sagger styles ([87a2343](https://github.com/mdwitr0/kinopoiskdev/commit/87a2343d95c08e66c671c416e5bdd1348c41d1e6))
* add select to model ([98a8569](https://github.com/mdwitr0/kinopoiskdev/commit/98a8569094f1b133113273fc66a1b7215817e4b4))
* add text search regexp ([24c2d53](https://github.com/mdwitr0/kinopoiskdev/commit/24c2d53fb22d996e6643bc4f85e2e7ab205ab34d))
* add transform schema to json ([895a794](https://github.com/mdwitr0/kinopoiskdev/commit/895a7940f4dadac522515a792e8081b39afb9831))
* add types to description ([9b37bd6](https://github.com/mdwitr0/kinopoiskdev/commit/9b37bd6ee30bfa71eae7c4c4768065bf72713b13))
* add types to description ([c721539](https://github.com/mdwitr0/kinopoiskdev/commit/c7215393690eafeff138d559855f4c1349959546))
* add x-api-key to swagger ([547233a](https://github.com/mdwitr0/kinopoiskdev/commit/547233aa5acac0dcd5c36aedebb93e50475b0390))
* **auth:** add auth guard ([0b19404](https://github.com/mdwitr0/kinopoiskdev/commit/0b1940429fecd5ccda19689bdd52b59dafaff66a))
* **auth:** add auth middleware ([fed4cb8](https://github.com/mdwitr0/kinopoiskdev/commit/fed4cb8bc9f0f6190cd8edb0a97b966ad0c6e03b))
* **auth:** add tariff to find user by token ([f3cf4a0](https://github.com/mdwitr0/kinopoiskdev/commit/f3cf4a08f37c556e6197eacb4bf021d394be3605))
* **auth:** add token strategy ([8e80682](https://github.com/mdwitr0/kinopoiskdev/commit/8e806825c869fbd04cbacc21b06768326f3057cb))
* **auth:** remove auth strategy ([0b871ad](https://github.com/mdwitr0/kinopoiskdev/commit/0b871ad17b8de10496123241aa6bdce2e36b36bb))
* **image:** add find one & find many methods ([31a7eeb](https://github.com/mdwitr0/kinopoiskdev/commit/31a7eeb57cbc401267dc08447ff63d1c702d6331))
* **movie:** add code description and exapmles to movie ([66bb3fd](https://github.com/mdwitr0/kinopoiskdev/commit/66bb3fdbbe88df42d7058d8fa9251ee692a800e6))
* **movie:** add find one & find many methods ([3a26801](https://github.com/mdwitr0/kinopoiskdev/commit/3a26801880fa9211ffcb6ce0b1cbc19591dbb8c7))
* **movie:** add get random movie method ([ab13677](https://github.com/mdwitr0/kinopoiskdev/commit/ab13677f708e932869a4d26eee14d2ab8d2832a7))
* **movie:** add posible method ([e8a7d84](https://github.com/mdwitr0/kinopoiskdev/commit/e8a7d84896073c679140a214ff9911139332e42c))
* **person:** add find one & find many methods ([77c8cf7](https://github.com/mdwitr0/kinopoiskdev/commit/77c8cf78d0f39e62ddb7b2847722a312a52d6619))
* release 1.0.0 ([cb412d4](https://github.com/mdwitr0/kinopoiskdev/commit/cb412d41c261b6298d9049da0411422ebfcdc276))
* **review:** add find one & find many methods ([3018f05](https://github.com/mdwitr0/kinopoiskdev/commit/3018f05f9d021f928223d381a4b2d4644b9e8528))
* **season:** add find one & find many methods ([e3391d2](https://github.com/mdwitr0/kinopoiskdev/commit/e3391d2e9378d07910b6eb02106490deb774e0c9))
* set file name ([c7d0d67](https://github.com/mdwitr0/kinopoiskdev/commit/c7d0d6700e13a7e9998212f556690b5d9381dd03))
* set file name to pino ([b632c38](https://github.com/mdwitr0/kinopoiskdev/commit/b632c387e2673ce3ddad13fd28f8cca7942957f1))
* set optional entity ([6d9c1d3](https://github.com/mdwitr0/kinopoiskdev/commit/6d9c1d3efe62fdbce76777dde10f67a80e1728d8))
* use auth muddleware ([dcf65c9](https://github.com/mdwitr0/kinopoiskdev/commit/dcf65c9219b30aad484ffb6018ec958a0361e534))
* **user:** add user model ([d091f7d](https://github.com/mdwitr0/kinopoiskdev/commit/d091f7dab73b1367281efd29f23c933d605d17dc))
* добавить докер [#4](https://github.com/mdwitr0/kinopoiskdev/issues/4) ([be30c61](https://github.com/mdwitr0/kinopoiskdev/commit/be30c61d9beb59301ac07af195f348a09d329098))
* добавить докер [#4](https://github.com/mdwitr0/kinopoiskdev/issues/4) ([07b14ea](https://github.com/mdwitr0/kinopoiskdev/commit/07b14eab37d162fe57abb91f6b001640393a8508))
* Добавить префикс c версией api [#14](https://github.com/mdwitr0/kinopoiskdev/issues/14) ([b96199e](https://github.com/mdwitr0/kinopoiskdev/commit/b96199ed773187e42756aed2d4bbfcaf82195ab5))
* Добавить префикс c версией api [#14](https://github.com/mdwitr0/kinopoiskdev/issues/14) ([c3af759](https://github.com/mdwitr0/kinopoiskdev/commit/c3af7594edde98b515bca8348940409e8a619414))
* Добавить списывание запросов [#9](https://github.com/mdwitr0/kinopoiskdev/issues/9) ([008ac86](https://github.com/mdwitr0/kinopoiskdev/commit/008ac86276d4bf85a92a9556647ed7a05945806f))


### Bug Fixes

* [Invalid behavior] Movie.sequelsAndPrequels [#31](https://github.com/mdwitr0/kinopoiskdev/issues/31) ([68ba2f4](https://github.com/mdwitr0/kinopoiskdev/commit/68ba2f4438d3f97e8b1da248f4c84d03c5eb7b01))
* 500 error. When the movie is not found ([99e4ba1](https://github.com/mdwitr0/kinopoiskdev/commit/99e4ba18843547ffd3f055fc13e4363db28a72cd))
* add description to swagger ([b898067](https://github.com/mdwitr0/kinopoiskdev/commit/b898067fa09c340b6820765351b53e349afb674d))
* api not generated literal types ([0cbf3a4](https://github.com/mdwitr0/kinopoiskdev/commit/0cbf3a43edaa49f9ae76aa3bb315d029727bb7c1))
* date fields serialize to null [#25](https://github.com/mdwitr0/kinopoiskdev/issues/25) ([d67266c](https://github.com/mdwitr0/kinopoiskdev/commit/d67266c5ede677239f027b04e87cce010e22923d))
* **docs:** fix text ([ae51715](https://github.com/mdwitr0/kinopoiskdev/commit/ae5171517cefed225d01a3e6fdadcac26ee7532c))
* filter by interval does not wokr for critics & await fields [#23](https://github.com/mdwitr0/kinopoiskdev/issues/23) ([2c4209e](https://github.com/mdwitr0/kinopoiskdev/commit/2c4209eb1a34f6af7981bb468b62a134b1aec79e))
* incorrect examples [#32](https://github.com/mdwitr0/kinopoiskdev/issues/32) ([03ce45a](https://github.com/mdwitr0/kinopoiskdev/commit/03ce45a74baf1ace38a6f562f2f834f3b1768e2c))
* incorrect set of properties of votes [#21](https://github.com/mdwitr0/kinopoiskdev/issues/21) ([f8e2d0f](https://github.com/mdwitr0/kinopoiskdev/commit/f8e2d0f27ae43daf36bdcbd0928a0424e12a45cc))
* missing productionCompanies in the scheme [#32](https://github.com/mdwitr0/kinopoiskdev/issues/32) ([95e3c9b](https://github.com/mdwitr0/kinopoiskdev/commit/95e3c9bf7b3bbd01b7e5cd261b7fbbe047ceb12e))
* models from nullable objects are not valid in swagger [#39](https://github.com/mdwitr0/kinopoiskdev/issues/39) ([8dea880](https://github.com/mdwitr0/kinopoiskdev/commit/8dea8800dfcfd79a156bbb030dc43e0a6197e722))
* models from nullable objects are not valid in swagger [#39](https://github.com/mdwitr0/kinopoiskdev/issues/39) ([b6b2cc5](https://github.com/mdwitr0/kinopoiskdev/commit/b6b2cc534ba836c2e8de4d989bf004ace0a0d444))
* **movie:** externalId is not array [#11](https://github.com/mdwitr0/kinopoiskdev/issues/11) ([72d128c](https://github.com/mdwitr0/kinopoiskdev/commit/72d128c91cce06141f9e35bee8c64a306b696fae))
* not all fields are covered by decorators in images ([76fd892](https://github.com/mdwitr0/kinopoiskdev/commit/76fd89207ee7da5ee4a42b656c3c6366e0609d9e))
* not all fields are covered by decorators in movies ([4fbc789](https://github.com/mdwitr0/kinopoiskdev/commit/4fbc78940da65770688909ef0baf6d90e11a50c7))
* not all fields are covered by decorators in persons ([bc93620](https://github.com/mdwitr0/kinopoiskdev/commit/bc93620366faa681a4410aaa249eeb9849720f49))
* not all fields are covered by decorators in review ([324569b](https://github.com/mdwitr0/kinopoiskdev/commit/324569b52bab962a728ce884c82973a45910c8c8))
* not all fields are covered by decorators in season ([f608ed0](https://github.com/mdwitr0/kinopoiskdev/commit/f608ed0f51bb2d8967195520e9e5273e5a9a511a))
* not falide date ([c26f62d](https://github.com/mdwitr0/kinopoiskdev/commit/c26f62d9b54276379fce89ca4c0ace68e1312903))
* not found sort fields ([2dd02a0](https://github.com/mdwitr0/kinopoiskdev/commit/2dd02a0b17e26051d441058d30685301ef7016d8))
* not seted summary ([7e6b899](https://github.com/mdwitr0/kinopoiskdev/commit/7e6b899cf0bd08918108e9e35b4ebc1c53077a8a))
* not use nested properties ([b2f2f6b](https://github.com/mdwitr0/kinopoiskdev/commit/b2f2f6bdc1303e52388f75ffcd64268c83a1cfc8))
* not valid fields parsing ([b8d8e9d](https://github.com/mdwitr0/kinopoiskdev/commit/b8d8e9d67f3a758ee685cb16155fa84ee9476ef1))
* not valid message text ([aa4c9ab](https://github.com/mdwitr0/kinopoiskdev/commit/aa4c9abdc8aee21541949cf3d1853b18db07c312))
* not valid schema generated ([c19988e](https://github.com/mdwitr0/kinopoiskdev/commit/c19988ef1c56c1230b29b3ce42f34f9deed144f2))
* not valid search from season ([cafbb5e](https://github.com/mdwitr0/kinopoiskdev/commit/cafbb5e8e8b895a948df5ba7a9cd28045a3be271))
* not valide swagger type ([290761d](https://github.com/mdwitr0/kinopoiskdev/commit/290761d0378d5284559be295b968415680b6944e))
* not working filte by many params [#19](https://github.com/mdwitr0/kinopoiskdev/issues/19) ([7efeff1](https://github.com/mdwitr0/kinopoiskdev/commit/7efeff137a844162c619eb9db7e8ca9f98b36ee8))
* **person:** general is not valid name of property ([e40048a](https://github.com/mdwitr0/kinopoiskdev/commit/e40048a0b6ae291a9199f011445c07ea82eb145c))
* **person:** model is not valid in swagger ([8e9b45e](https://github.com/mdwitr0/kinopoiskdev/commit/8e9b45e5d9527a62b91a3f30e595244db094f948))
* **person:** not valide path ([4b5d3b6](https://github.com/mdwitr0/kinopoiskdev/commit/4b5d3b6aa8076c8cf3bcee6ab854375f6585da24))
* **person:** Не возвращает тело ответа /person [#12](https://github.com/mdwitr0/kinopoiskdev/issues/12) ([79b1e20](https://github.com/mdwitr0/kinopoiskdev/commit/79b1e20bce47868ad635818041ce213034cec11a))
* pino is not logging for server ([8632827](https://github.com/mdwitr0/kinopoiskdev/commit/86328275b37a145e943fae32acf8cf83fe9b43ff))
* release 1.0.1 ([e990f1e](https://github.com/mdwitr0/kinopoiskdev/commit/e990f1e51bec32befe9d8ad33071812d1c6c26c0))
* release 1.0.2 ([26b4a2b](https://github.com/mdwitr0/kinopoiskdev/commit/26b4a2b86ae572b7ee7148fa61e4253c80716552))
* не верный порт для redis [#4](https://github.com/mdwitr0/kinopoiskdev/issues/4) ([3521cb9](https://github.com/mdwitr0/kinopoiskdev/commit/3521cb9898033015689b1c79fe75308982394cc0))
* не верный тайтл страницы и favicon в сваггере [#16](https://github.com/mdwitr0/kinopoiskdev/issues/16) ([9cf6458](https://github.com/mdwitr0/kinopoiskdev/commit/9cf645871e39260a768b9a63cbf14555c42ec2e6))
* не прокидывается порт из api на локалку [#11](https://github.com/mdwitr0/kinopoiskdev/issues/11) ([d5afd9d](https://github.com/mdwitr0/kinopoiskdev/commit/d5afd9d058567686477229f146d306f3a1c9026f))

## [1.0.2](https://github.com/mdwitr0/kinopoiskdev/compare/kinopoiskdev_api-v1.0.1...kinopoiskdev_api-v1.0.2) (2023-02-27)


### Bug Fixes

* 500 error. When the movie is not found ([99e4ba1](https://github.com/mdwitr0/kinopoiskdev/commit/99e4ba18843547ffd3f055fc13e4363db28a72cd))
* models from nullable objects are not valid in swagger [#39](https://github.com/mdwitr0/kinopoiskdev/issues/39) ([8dea880](https://github.com/mdwitr0/kinopoiskdev/commit/8dea8800dfcfd79a156bbb030dc43e0a6197e722))
* models from nullable objects are not valid in swagger [#39](https://github.com/mdwitr0/kinopoiskdev/issues/39) ([b6b2cc5](https://github.com/mdwitr0/kinopoiskdev/commit/b6b2cc534ba836c2e8de4d989bf004ace0a0d444))
* **person:** general is not valid name of property ([e40048a](https://github.com/mdwitr0/kinopoiskdev/commit/e40048a0b6ae291a9199f011445c07ea82eb145c))
* **person:** model is not valid in swagger ([8e9b45e](https://github.com/mdwitr0/kinopoiskdev/commit/8e9b45e5d9527a62b91a3f30e595244db094f948))

## [1.0.1](https://github.com/mdwitr0/kinopoiskdev/compare/kinopoiskdev_api-v1.0.0...kinopoiskdev_api-v1.0.1) (2023-02-25)


### ⚠ BREAKING CHANGES

* release 1.0.1
* release 1.0.0

### Features

* add api base decorator ([104deb7](https://github.com/mdwitr0/kinopoiskdev/commit/104deb7815a46514552007a1490a0229fede987a))
* add app cluster ([6b07de8](https://github.com/mdwitr0/kinopoiskdev/commit/6b07de87721f8070c6536022ee2d3bf10df7d919))
* add base controller ([92b2bc1](https://github.com/mdwitr0/kinopoiskdev/commit/92b2bc1523f03e8d25d85485a85d632444fd6d2f))
* add base controller with find by id ([0fd1671](https://github.com/mdwitr0/kinopoiskdev/commit/0fd16711e88ced35468d60066663a63e1a2a3c4c))
* add base service ([d63703b](https://github.com/mdwitr0/kinopoiskdev/commit/d63703b69d8e63f3787b772025c006c0a5b2c060))
* add controller decorator ([8ca5478](https://github.com/mdwitr0/kinopoiskdev/commit/8ca5478596cb6b854fe4e9b3480952b43a955ee1))
* add description to date properties ([e891863](https://github.com/mdwitr0/kinopoiskdev/commit/e891863b200fc7501f7f36393391398a6660d71c))
* add error dto ([4384cad](https://github.com/mdwitr0/kinopoiskdev/commit/4384cadd9cf81f4226a4308a058dd6c7ba192064))
* add exclude genres & countiries [#19](https://github.com/mdwitr0/kinopoiskdev/issues/19) ([8d0138a](https://github.com/mdwitr0/kinopoiskdev/commit/8d0138abbb711964068d6fefac38efced0596cfb))
* add field transpilation to mongo object ([eef389d](https://github.com/mdwitr0/kinopoiskdev/commit/eef389d04974b906c25f4bf2adba298d3edec753))
* add fields for all entities ([10545e9](https://github.com/mdwitr0/kinopoiskdev/commit/10545e90895fe797f7d77e1ae8887cd63c1cb4fb))
* add paginated decorator ([cecfea0](https://github.com/mdwitr0/kinopoiskdev/commit/cecfea0b589f84d3e4b0afa14383c07e3828be18))
* add pino logging ([e0436ab](https://github.com/mdwitr0/kinopoiskdev/commit/e0436ab5c84d5e3e40a9d9c7ff4fb07e278641b5))
* add query transfom pipe ([e4babda](https://github.com/mdwitr0/kinopoiskdev/commit/e4babda53fd66f5ca76de19fcc2d71cfd0948a16))
* add remove system field interceptor ([17b8d2e](https://github.com/mdwitr0/kinopoiskdev/commit/17b8d2e5824a82d423b76b5d55fda9d8b15c1ceb))
* add sagger styles ([87a2343](https://github.com/mdwitr0/kinopoiskdev/commit/87a2343d95c08e66c671c416e5bdd1348c41d1e6))
* add select to model ([98a8569](https://github.com/mdwitr0/kinopoiskdev/commit/98a8569094f1b133113273fc66a1b7215817e4b4))
* add text search regexp ([24c2d53](https://github.com/mdwitr0/kinopoiskdev/commit/24c2d53fb22d996e6643bc4f85e2e7ab205ab34d))
* add transform schema to json ([895a794](https://github.com/mdwitr0/kinopoiskdev/commit/895a7940f4dadac522515a792e8081b39afb9831))
* add types to description ([9b37bd6](https://github.com/mdwitr0/kinopoiskdev/commit/9b37bd6ee30bfa71eae7c4c4768065bf72713b13))
* add types to description ([c721539](https://github.com/mdwitr0/kinopoiskdev/commit/c7215393690eafeff138d559855f4c1349959546))
* add x-api-key to swagger ([547233a](https://github.com/mdwitr0/kinopoiskdev/commit/547233aa5acac0dcd5c36aedebb93e50475b0390))
* **auth:** add auth guard ([0b19404](https://github.com/mdwitr0/kinopoiskdev/commit/0b1940429fecd5ccda19689bdd52b59dafaff66a))
* **auth:** add auth middleware ([fed4cb8](https://github.com/mdwitr0/kinopoiskdev/commit/fed4cb8bc9f0f6190cd8edb0a97b966ad0c6e03b))
* **auth:** add tariff to find user by token ([f3cf4a0](https://github.com/mdwitr0/kinopoiskdev/commit/f3cf4a08f37c556e6197eacb4bf021d394be3605))
* **auth:** add token strategy ([8e80682](https://github.com/mdwitr0/kinopoiskdev/commit/8e806825c869fbd04cbacc21b06768326f3057cb))
* **auth:** remove auth strategy ([0b871ad](https://github.com/mdwitr0/kinopoiskdev/commit/0b871ad17b8de10496123241aa6bdce2e36b36bb))
* **image:** add find one & find many methods ([31a7eeb](https://github.com/mdwitr0/kinopoiskdev/commit/31a7eeb57cbc401267dc08447ff63d1c702d6331))
* **movie:** add code description and exapmles to movie ([66bb3fd](https://github.com/mdwitr0/kinopoiskdev/commit/66bb3fdbbe88df42d7058d8fa9251ee692a800e6))
* **movie:** add find one & find many methods ([3a26801](https://github.com/mdwitr0/kinopoiskdev/commit/3a26801880fa9211ffcb6ce0b1cbc19591dbb8c7))
* **movie:** add get random movie method ([ab13677](https://github.com/mdwitr0/kinopoiskdev/commit/ab13677f708e932869a4d26eee14d2ab8d2832a7))
* **movie:** add posible method ([e8a7d84](https://github.com/mdwitr0/kinopoiskdev/commit/e8a7d84896073c679140a214ff9911139332e42c))
* **person:** add find one & find many methods ([77c8cf7](https://github.com/mdwitr0/kinopoiskdev/commit/77c8cf78d0f39e62ddb7b2847722a312a52d6619))
* release 1.0.0 ([cb412d4](https://github.com/mdwitr0/kinopoiskdev/commit/cb412d41c261b6298d9049da0411422ebfcdc276))
* **review:** add find one & find many methods ([3018f05](https://github.com/mdwitr0/kinopoiskdev/commit/3018f05f9d021f928223d381a4b2d4644b9e8528))
* **season:** add find one & find many methods ([e3391d2](https://github.com/mdwitr0/kinopoiskdev/commit/e3391d2e9378d07910b6eb02106490deb774e0c9))
* set file name ([c7d0d67](https://github.com/mdwitr0/kinopoiskdev/commit/c7d0d6700e13a7e9998212f556690b5d9381dd03))
* set file name to pino ([b632c38](https://github.com/mdwitr0/kinopoiskdev/commit/b632c387e2673ce3ddad13fd28f8cca7942957f1))
* set optional entity ([6d9c1d3](https://github.com/mdwitr0/kinopoiskdev/commit/6d9c1d3efe62fdbce76777dde10f67a80e1728d8))
* use auth muddleware ([dcf65c9](https://github.com/mdwitr0/kinopoiskdev/commit/dcf65c9219b30aad484ffb6018ec958a0361e534))
* **user:** add user model ([d091f7d](https://github.com/mdwitr0/kinopoiskdev/commit/d091f7dab73b1367281efd29f23c933d605d17dc))
* добавить докер [#4](https://github.com/mdwitr0/kinopoiskdev/issues/4) ([be30c61](https://github.com/mdwitr0/kinopoiskdev/commit/be30c61d9beb59301ac07af195f348a09d329098))
* добавить докер [#4](https://github.com/mdwitr0/kinopoiskdev/issues/4) ([07b14ea](https://github.com/mdwitr0/kinopoiskdev/commit/07b14eab37d162fe57abb91f6b001640393a8508))
* Добавить префикс c версией api [#14](https://github.com/mdwitr0/kinopoiskdev/issues/14) ([b96199e](https://github.com/mdwitr0/kinopoiskdev/commit/b96199ed773187e42756aed2d4bbfcaf82195ab5))
* Добавить префикс c версией api [#14](https://github.com/mdwitr0/kinopoiskdev/issues/14) ([c3af759](https://github.com/mdwitr0/kinopoiskdev/commit/c3af7594edde98b515bca8348940409e8a619414))
* Добавить списывание запросов [#9](https://github.com/mdwitr0/kinopoiskdev/issues/9) ([008ac86](https://github.com/mdwitr0/kinopoiskdev/commit/008ac86276d4bf85a92a9556647ed7a05945806f))


### Bug Fixes

* [Invalid behavior] Movie.sequelsAndPrequels [#31](https://github.com/mdwitr0/kinopoiskdev/issues/31) ([68ba2f4](https://github.com/mdwitr0/kinopoiskdev/commit/68ba2f4438d3f97e8b1da248f4c84d03c5eb7b01))
* add description to swagger ([b898067](https://github.com/mdwitr0/kinopoiskdev/commit/b898067fa09c340b6820765351b53e349afb674d))
* api not generated literal types ([0cbf3a4](https://github.com/mdwitr0/kinopoiskdev/commit/0cbf3a43edaa49f9ae76aa3bb315d029727bb7c1))
* date fields serialize to null [#25](https://github.com/mdwitr0/kinopoiskdev/issues/25) ([d67266c](https://github.com/mdwitr0/kinopoiskdev/commit/d67266c5ede677239f027b04e87cce010e22923d))
* **docs:** fix text ([ae51715](https://github.com/mdwitr0/kinopoiskdev/commit/ae5171517cefed225d01a3e6fdadcac26ee7532c))
* filter by interval does not wokr for critics & await fields [#23](https://github.com/mdwitr0/kinopoiskdev/issues/23) ([2c4209e](https://github.com/mdwitr0/kinopoiskdev/commit/2c4209eb1a34f6af7981bb468b62a134b1aec79e))
* incorrect examples [#32](https://github.com/mdwitr0/kinopoiskdev/issues/32) ([03ce45a](https://github.com/mdwitr0/kinopoiskdev/commit/03ce45a74baf1ace38a6f562f2f834f3b1768e2c))
* incorrect set of properties of votes [#21](https://github.com/mdwitr0/kinopoiskdev/issues/21) ([f8e2d0f](https://github.com/mdwitr0/kinopoiskdev/commit/f8e2d0f27ae43daf36bdcbd0928a0424e12a45cc))
* missing productionCompanies in the scheme [#32](https://github.com/mdwitr0/kinopoiskdev/issues/32) ([95e3c9b](https://github.com/mdwitr0/kinopoiskdev/commit/95e3c9bf7b3bbd01b7e5cd261b7fbbe047ceb12e))
* **movie:** externalId is not array [#11](https://github.com/mdwitr0/kinopoiskdev/issues/11) ([72d128c](https://github.com/mdwitr0/kinopoiskdev/commit/72d128c91cce06141f9e35bee8c64a306b696fae))
* not all fields are covered by decorators in images ([76fd892](https://github.com/mdwitr0/kinopoiskdev/commit/76fd89207ee7da5ee4a42b656c3c6366e0609d9e))
* not all fields are covered by decorators in movies ([4fbc789](https://github.com/mdwitr0/kinopoiskdev/commit/4fbc78940da65770688909ef0baf6d90e11a50c7))
* not all fields are covered by decorators in persons ([bc93620](https://github.com/mdwitr0/kinopoiskdev/commit/bc93620366faa681a4410aaa249eeb9849720f49))
* not all fields are covered by decorators in review ([324569b](https://github.com/mdwitr0/kinopoiskdev/commit/324569b52bab962a728ce884c82973a45910c8c8))
* not all fields are covered by decorators in season ([f608ed0](https://github.com/mdwitr0/kinopoiskdev/commit/f608ed0f51bb2d8967195520e9e5273e5a9a511a))
* not falide date ([c26f62d](https://github.com/mdwitr0/kinopoiskdev/commit/c26f62d9b54276379fce89ca4c0ace68e1312903))
* not found sort fields ([2dd02a0](https://github.com/mdwitr0/kinopoiskdev/commit/2dd02a0b17e26051d441058d30685301ef7016d8))
* not seted summary ([7e6b899](https://github.com/mdwitr0/kinopoiskdev/commit/7e6b899cf0bd08918108e9e35b4ebc1c53077a8a))
* not use nested properties ([b2f2f6b](https://github.com/mdwitr0/kinopoiskdev/commit/b2f2f6bdc1303e52388f75ffcd64268c83a1cfc8))
* not valid fields parsing ([b8d8e9d](https://github.com/mdwitr0/kinopoiskdev/commit/b8d8e9d67f3a758ee685cb16155fa84ee9476ef1))
* not valid message text ([aa4c9ab](https://github.com/mdwitr0/kinopoiskdev/commit/aa4c9abdc8aee21541949cf3d1853b18db07c312))
* not valid schema generated ([c19988e](https://github.com/mdwitr0/kinopoiskdev/commit/c19988ef1c56c1230b29b3ce42f34f9deed144f2))
* not valid search from season ([cafbb5e](https://github.com/mdwitr0/kinopoiskdev/commit/cafbb5e8e8b895a948df5ba7a9cd28045a3be271))
* not valide swagger type ([290761d](https://github.com/mdwitr0/kinopoiskdev/commit/290761d0378d5284559be295b968415680b6944e))
* not working filte by many params [#19](https://github.com/mdwitr0/kinopoiskdev/issues/19) ([7efeff1](https://github.com/mdwitr0/kinopoiskdev/commit/7efeff137a844162c619eb9db7e8ca9f98b36ee8))
* **person:** not valide path ([4b5d3b6](https://github.com/mdwitr0/kinopoiskdev/commit/4b5d3b6aa8076c8cf3bcee6ab854375f6585da24))
* **person:** Не возвращает тело ответа /person [#12](https://github.com/mdwitr0/kinopoiskdev/issues/12) ([79b1e20](https://github.com/mdwitr0/kinopoiskdev/commit/79b1e20bce47868ad635818041ce213034cec11a))
* pino is not logging for server ([8632827](https://github.com/mdwitr0/kinopoiskdev/commit/86328275b37a145e943fae32acf8cf83fe9b43ff))
* release 1.0.1 ([e990f1e](https://github.com/mdwitr0/kinopoiskdev/commit/e990f1e51bec32befe9d8ad33071812d1c6c26c0))
* не верный порт для redis [#4](https://github.com/mdwitr0/kinopoiskdev/issues/4) ([3521cb9](https://github.com/mdwitr0/kinopoiskdev/commit/3521cb9898033015689b1c79fe75308982394cc0))
* не верный тайтл страницы и favicon в сваггере [#16](https://github.com/mdwitr0/kinopoiskdev/issues/16) ([9cf6458](https://github.com/mdwitr0/kinopoiskdev/commit/9cf645871e39260a768b9a63cbf14555c42ec2e6))
* не прокидывается порт из api на локалку [#11](https://github.com/mdwitr0/kinopoiskdev/issues/11) ([d5afd9d](https://github.com/mdwitr0/kinopoiskdev/commit/d5afd9d058567686477229f146d306f3a1c9026f))

## 1.0.0 (2023-02-24)


### Features

* add api base decorator ([104deb7](https://github.com/mdwitr0/kinopoiskdev/commit/104deb7815a46514552007a1490a0229fede987a))
* add app cluster ([6b07de8](https://github.com/mdwitr0/kinopoiskdev/commit/6b07de87721f8070c6536022ee2d3bf10df7d919))
* add base controller ([92b2bc1](https://github.com/mdwitr0/kinopoiskdev/commit/92b2bc1523f03e8d25d85485a85d632444fd6d2f))
* add base controller with find by id ([0fd1671](https://github.com/mdwitr0/kinopoiskdev/commit/0fd16711e88ced35468d60066663a63e1a2a3c4c))
* add base service ([d63703b](https://github.com/mdwitr0/kinopoiskdev/commit/d63703b69d8e63f3787b772025c006c0a5b2c060))
* add controller decorator ([8ca5478](https://github.com/mdwitr0/kinopoiskdev/commit/8ca5478596cb6b854fe4e9b3480952b43a955ee1))
* add description to date properties ([e891863](https://github.com/mdwitr0/kinopoiskdev/commit/e891863b200fc7501f7f36393391398a6660d71c))
* add error dto ([4384cad](https://github.com/mdwitr0/kinopoiskdev/commit/4384cadd9cf81f4226a4308a058dd6c7ba192064))
* add exclude genres & countiries [#19](https://github.com/mdwitr0/kinopoiskdev/issues/19) ([8d0138a](https://github.com/mdwitr0/kinopoiskdev/commit/8d0138abbb711964068d6fefac38efced0596cfb))
* add field transpilation to mongo object ([eef389d](https://github.com/mdwitr0/kinopoiskdev/commit/eef389d04974b906c25f4bf2adba298d3edec753))
* add fields for all entities ([10545e9](https://github.com/mdwitr0/kinopoiskdev/commit/10545e90895fe797f7d77e1ae8887cd63c1cb4fb))
* add paginated decorator ([cecfea0](https://github.com/mdwitr0/kinopoiskdev/commit/cecfea0b589f84d3e4b0afa14383c07e3828be18))
* add pino logging ([e0436ab](https://github.com/mdwitr0/kinopoiskdev/commit/e0436ab5c84d5e3e40a9d9c7ff4fb07e278641b5))
* add query transfom pipe ([e4babda](https://github.com/mdwitr0/kinopoiskdev/commit/e4babda53fd66f5ca76de19fcc2d71cfd0948a16))
* add remove system field interceptor ([17b8d2e](https://github.com/mdwitr0/kinopoiskdev/commit/17b8d2e5824a82d423b76b5d55fda9d8b15c1ceb))
* add sagger styles ([87a2343](https://github.com/mdwitr0/kinopoiskdev/commit/87a2343d95c08e66c671c416e5bdd1348c41d1e6))
* add select to model ([98a8569](https://github.com/mdwitr0/kinopoiskdev/commit/98a8569094f1b133113273fc66a1b7215817e4b4))
* add text search regexp ([24c2d53](https://github.com/mdwitr0/kinopoiskdev/commit/24c2d53fb22d996e6643bc4f85e2e7ab205ab34d))
* add transform schema to json ([895a794](https://github.com/mdwitr0/kinopoiskdev/commit/895a7940f4dadac522515a792e8081b39afb9831))
* add types to description ([9b37bd6](https://github.com/mdwitr0/kinopoiskdev/commit/9b37bd6ee30bfa71eae7c4c4768065bf72713b13))
* add types to description ([c721539](https://github.com/mdwitr0/kinopoiskdev/commit/c7215393690eafeff138d559855f4c1349959546))
* add x-api-key to swagger ([547233a](https://github.com/mdwitr0/kinopoiskdev/commit/547233aa5acac0dcd5c36aedebb93e50475b0390))
* **auth:** add auth guard ([0b19404](https://github.com/mdwitr0/kinopoiskdev/commit/0b1940429fecd5ccda19689bdd52b59dafaff66a))
* **auth:** add auth middleware ([fed4cb8](https://github.com/mdwitr0/kinopoiskdev/commit/fed4cb8bc9f0f6190cd8edb0a97b966ad0c6e03b))
* **auth:** add tariff to find user by token ([f3cf4a0](https://github.com/mdwitr0/kinopoiskdev/commit/f3cf4a08f37c556e6197eacb4bf021d394be3605))
* **auth:** add token strategy ([8e80682](https://github.com/mdwitr0/kinopoiskdev/commit/8e806825c869fbd04cbacc21b06768326f3057cb))
* **auth:** remove auth strategy ([0b871ad](https://github.com/mdwitr0/kinopoiskdev/commit/0b871ad17b8de10496123241aa6bdce2e36b36bb))
* **image:** add find one & find many methods ([31a7eeb](https://github.com/mdwitr0/kinopoiskdev/commit/31a7eeb57cbc401267dc08447ff63d1c702d6331))
* **movie:** add code description and exapmles to movie ([66bb3fd](https://github.com/mdwitr0/kinopoiskdev/commit/66bb3fdbbe88df42d7058d8fa9251ee692a800e6))
* **movie:** add find one & find many methods ([3a26801](https://github.com/mdwitr0/kinopoiskdev/commit/3a26801880fa9211ffcb6ce0b1cbc19591dbb8c7))
* **movie:** add get random movie method ([ab13677](https://github.com/mdwitr0/kinopoiskdev/commit/ab13677f708e932869a4d26eee14d2ab8d2832a7))
* **movie:** add posible method ([e8a7d84](https://github.com/mdwitr0/kinopoiskdev/commit/e8a7d84896073c679140a214ff9911139332e42c))
* **person:** add find one & find many methods ([77c8cf7](https://github.com/mdwitr0/kinopoiskdev/commit/77c8cf78d0f39e62ddb7b2847722a312a52d6619))
* **review:** add find one & find many methods ([3018f05](https://github.com/mdwitr0/kinopoiskdev/commit/3018f05f9d021f928223d381a4b2d4644b9e8528))
* **season:** add find one & find many methods ([e3391d2](https://github.com/mdwitr0/kinopoiskdev/commit/e3391d2e9378d07910b6eb02106490deb774e0c9))
* set file name ([c7d0d67](https://github.com/mdwitr0/kinopoiskdev/commit/c7d0d6700e13a7e9998212f556690b5d9381dd03))
* set file name to pino ([b632c38](https://github.com/mdwitr0/kinopoiskdev/commit/b632c387e2673ce3ddad13fd28f8cca7942957f1))
* set optional entity ([6d9c1d3](https://github.com/mdwitr0/kinopoiskdev/commit/6d9c1d3efe62fdbce76777dde10f67a80e1728d8))
* use auth muddleware ([dcf65c9](https://github.com/mdwitr0/kinopoiskdev/commit/dcf65c9219b30aad484ffb6018ec958a0361e534))
* **user:** add user model ([d091f7d](https://github.com/mdwitr0/kinopoiskdev/commit/d091f7dab73b1367281efd29f23c933d605d17dc))
* добавить докер [#4](https://github.com/mdwitr0/kinopoiskdev/issues/4) ([be30c61](https://github.com/mdwitr0/kinopoiskdev/commit/be30c61d9beb59301ac07af195f348a09d329098))
* добавить докер [#4](https://github.com/mdwitr0/kinopoiskdev/issues/4) ([07b14ea](https://github.com/mdwitr0/kinopoiskdev/commit/07b14eab37d162fe57abb91f6b001640393a8508))
* Добавить префикс c версией api [#14](https://github.com/mdwitr0/kinopoiskdev/issues/14) ([b96199e](https://github.com/mdwitr0/kinopoiskdev/commit/b96199ed773187e42756aed2d4bbfcaf82195ab5))
* Добавить префикс c версией api [#14](https://github.com/mdwitr0/kinopoiskdev/issues/14) ([c3af759](https://github.com/mdwitr0/kinopoiskdev/commit/c3af7594edde98b515bca8348940409e8a619414))
* Добавить списывание запросов [#9](https://github.com/mdwitr0/kinopoiskdev/issues/9) ([008ac86](https://github.com/mdwitr0/kinopoiskdev/commit/008ac86276d4bf85a92a9556647ed7a05945806f))


### Bug Fixes

* add description to swagger ([b898067](https://github.com/mdwitr0/kinopoiskdev/commit/b898067fa09c340b6820765351b53e349afb674d))
* api not generated literal types ([0cbf3a4](https://github.com/mdwitr0/kinopoiskdev/commit/0cbf3a43edaa49f9ae76aa3bb315d029727bb7c1))
* date fields serialize to null [#25](https://github.com/mdwitr0/kinopoiskdev/issues/25) ([d67266c](https://github.com/mdwitr0/kinopoiskdev/commit/d67266c5ede677239f027b04e87cce010e22923d))
* **docs:** fix text ([ae51715](https://github.com/mdwitr0/kinopoiskdev/commit/ae5171517cefed225d01a3e6fdadcac26ee7532c))
* filter by interval does not wokr for critics & await fields [#23](https://github.com/mdwitr0/kinopoiskdev/issues/23) ([2c4209e](https://github.com/mdwitr0/kinopoiskdev/commit/2c4209eb1a34f6af7981bb468b62a134b1aec79e))
* incorrect set of properties of votes [#21](https://github.com/mdwitr0/kinopoiskdev/issues/21) ([f8e2d0f](https://github.com/mdwitr0/kinopoiskdev/commit/f8e2d0f27ae43daf36bdcbd0928a0424e12a45cc))
* **movie:** externalId is not array [#11](https://github.com/mdwitr0/kinopoiskdev/issues/11) ([72d128c](https://github.com/mdwitr0/kinopoiskdev/commit/72d128c91cce06141f9e35bee8c64a306b696fae))
* not all fields are covered by decorators in images ([76fd892](https://github.com/mdwitr0/kinopoiskdev/commit/76fd89207ee7da5ee4a42b656c3c6366e0609d9e))
* not all fields are covered by decorators in movies ([4fbc789](https://github.com/mdwitr0/kinopoiskdev/commit/4fbc78940da65770688909ef0baf6d90e11a50c7))
* not all fields are covered by decorators in persons ([bc93620](https://github.com/mdwitr0/kinopoiskdev/commit/bc93620366faa681a4410aaa249eeb9849720f49))
* not all fields are covered by decorators in review ([324569b](https://github.com/mdwitr0/kinopoiskdev/commit/324569b52bab962a728ce884c82973a45910c8c8))
* not all fields are covered by decorators in season ([f608ed0](https://github.com/mdwitr0/kinopoiskdev/commit/f608ed0f51bb2d8967195520e9e5273e5a9a511a))
* not falide date ([c26f62d](https://github.com/mdwitr0/kinopoiskdev/commit/c26f62d9b54276379fce89ca4c0ace68e1312903))
* not found sort fields ([2dd02a0](https://github.com/mdwitr0/kinopoiskdev/commit/2dd02a0b17e26051d441058d30685301ef7016d8))
* not seted summary ([7e6b899](https://github.com/mdwitr0/kinopoiskdev/commit/7e6b899cf0bd08918108e9e35b4ebc1c53077a8a))
* not use nested properties ([b2f2f6b](https://github.com/mdwitr0/kinopoiskdev/commit/b2f2f6bdc1303e52388f75ffcd64268c83a1cfc8))
* not valid fields parsing ([b8d8e9d](https://github.com/mdwitr0/kinopoiskdev/commit/b8d8e9d67f3a758ee685cb16155fa84ee9476ef1))
* not valid message text ([aa4c9ab](https://github.com/mdwitr0/kinopoiskdev/commit/aa4c9abdc8aee21541949cf3d1853b18db07c312))
* not valid schema generated ([c19988e](https://github.com/mdwitr0/kinopoiskdev/commit/c19988ef1c56c1230b29b3ce42f34f9deed144f2))
* not valid search from season ([cafbb5e](https://github.com/mdwitr0/kinopoiskdev/commit/cafbb5e8e8b895a948df5ba7a9cd28045a3be271))
* not valide swagger type ([290761d](https://github.com/mdwitr0/kinopoiskdev/commit/290761d0378d5284559be295b968415680b6944e))
* not working filte by many params [#19](https://github.com/mdwitr0/kinopoiskdev/issues/19) ([7efeff1](https://github.com/mdwitr0/kinopoiskdev/commit/7efeff137a844162c619eb9db7e8ca9f98b36ee8))
* **person:** not valide path ([4b5d3b6](https://github.com/mdwitr0/kinopoiskdev/commit/4b5d3b6aa8076c8cf3bcee6ab854375f6585da24))
* **person:** Не возвращает тело ответа /person [#12](https://github.com/mdwitr0/kinopoiskdev/issues/12) ([79b1e20](https://github.com/mdwitr0/kinopoiskdev/commit/79b1e20bce47868ad635818041ce213034cec11a))
* pino is not logging for server ([8632827](https://github.com/mdwitr0/kinopoiskdev/commit/86328275b37a145e943fae32acf8cf83fe9b43ff))
* не верный порт для redis [#4](https://github.com/mdwitr0/kinopoiskdev/issues/4) ([3521cb9](https://github.com/mdwitr0/kinopoiskdev/commit/3521cb9898033015689b1c79fe75308982394cc0))
* не верный тайтл страницы и favicon в сваггере [#16](https://github.com/mdwitr0/kinopoiskdev/issues/16) ([9cf6458](https://github.com/mdwitr0/kinopoiskdev/commit/9cf645871e39260a768b9a63cbf14555c42ec2e6))
* не прокидывается порт из api на локалку [#11](https://github.com/mdwitr0/kinopoiskdev/issues/11) ([d5afd9d](https://github.com/mdwitr0/kinopoiskdev/commit/d5afd9d058567686477229f146d306f3a1c9026f))

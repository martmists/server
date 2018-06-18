/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3 Clause.
 * You should have received a copy of the license with the source code. 
 */

const vertx = require('@vertx/core');
const app = require('@vertx/web');


vertx.createHttpServer()
 .listen(process.env.PORT || '1287');
 .requestHandler(app);
/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * 
 * This work is licensed under BSD-3 Clause
 */

package moe.clarity.sayonika.Server;

import io.vertx.core.AbstractVerticle;


// It's better we keep the HTTP Server as a Verticle
// for reasons as well.

public class ServerVerticle extends AbstractVerticle
{
    @Override
    public void start ()
    {
        super.start();
        String host = config().getString("api.gateway.http.address", "localhost");
        int port = config().getInteger("api.gateway.http.port", 8079);
        
    }
}




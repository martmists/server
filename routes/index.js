/**
 * Copyright 2018 (c) The Sayonika Project Authors
 * 
 * Licensed under BSD-3-Clause
 */

router.get('/', res => {
    // yes I literally did this got a problem son?
    res.redirect(process.env.DOCUMENTATION_ENDPOINT || 'https://github.com/Sayo-nika/server/wiki');
});
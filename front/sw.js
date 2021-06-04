// the cache version gets updated every time there is a new deployment
const CACHE_VERSION = 10;
const CURRENT_CACHE = `main-${CACHE_VERSION}`;


const cacheFiles = [
    '/',
    '/src/js/index.js',
    '/index.html',
    '/jeux/infiltre/index.html',
    '/jeux/infiltre/infiltre.js',
    '/jeux/infiltre/words.json',

];
// on activation we clean up the previously registered service workers
self.addEventListener('activate', evt =>
    evt.waitUntil(
        caches.delete(CURRENT_CACHE)
    )
);

// on install we download the routes we want to cache for offline
self.addEventListener('install', evt =>
    evt.waitUntil(
        caches.open(CURRENT_CACHE).then(cache => {
            return cache.addAll(cacheFiles);
        })
    )
);

// fetch the resource from the network
const fromNetwork = (request, timeout) =>
    new Promise((fulfill, reject) => {
        const timeoutId = setTimeout(reject, timeout);
        fetch(request).then(response => {
            clearTimeout(timeoutId);
            fulfill(response);

        }, reject);
    });

// fetch the resource from the browser cache
const fromCache = request =>
    caches
        .open(CURRENT_CACHE)
        .then(cache =>
            cache
                .match(request)
                .then(matching => matching || cache.match('/offline/'))
        );

// cache the current page to make it available for offline
const update = request => {
    if (!request.destination.includes("remove") && !request.destination.includes("set") && request.method !== "POST") {
        caches
            .open(CURRENT_CACHE)
            .then(cache =>
                fetch(request).then(response => cache.put(request, response))
            );
    }
}


self.addEventListener('fetch', evt => {
    const clonedRequest = evt.request.clone();
    evt.respondWith(
        fromNetwork(evt.request, 10000).catch(() => fromCache(evt.request))
    );
    evt.waitUntil(update(clonedRequest));
});


/*
self.addEventListener('fetch', function(event) {
    // We will cache all POST requests, but in the real world, you will probably filter for
    // specific URLs like if(... || event.request.url.href.match(...))
    if(event.request.method === "POST"){

        // Init the cache. We use Dexie here to simplify the code. You can use any other
        // way to access IndexedDB of course.
        var db = new Dexie("post_cache");
        db.version(1).stores({
            post_cache: 'key,response,timestamp'
        })

        event.respondWith(
            // First try to fetch the request from the server
            fetch(event.request.clone())
                .then(function(response) {
                    // If it works, put the response into IndexedDB
                    cachePut(event.request.clone(), response.clone(), db.post_cache);
                    return response;
                })
                .catch(function() {
                    // If it does not work, return the cached response. If the cache does not
                    // contain a response for our request, it will give us a 503-response
                    return cacheMatch(event.request.clone(), db.post_cache);
                })
        );
    }
})*/

/**
 * Serializes a Request into a plain JS object.
 *
 * @param request
 * @returns Promise
 */
/*
function serializeRequest(request) {
    var serialized = {
        url: request.url,
        headers: serializeHeaders(request.headers),
        method: request.method,
        mode: request.mode,
        credentials: request.credentials,
        cache: request.cache,
        redirect: request.redirect,
        referrer: request.referrer
    };

    // Only if method is not `GET` or `HEAD` is the request allowed to have body.
    if (request.method !== 'GET' && request.method !== 'HEAD') {
        return request.clone().text().then(function(body) {
            serialized.body = body;
            return Promise.resolve(serialized);
        });
    }
    return Promise.resolve(serialized);
}
*/
/**
 * Serializes a Response into a plain JS object
 *
 * @param response
 * @returns Promise
 */
/*
function serializeResponse(response) {
    var serialized = {
        headers: serializeHeaders(response.headers),
        status: response.status,
        statusText: response.statusText
    };

    return response.clone().text().then(function(body) {
        serialized.body = body;
        return Promise.resolve(serialized);
    });
}
*/
/**
 * Serializes headers into a plain JS object
 *
 * @param headers
 * @returns object
 */
/*
function serializeHeaders(headers) {
    var serialized = {};
    // `for(... of ...)` is ES6 notation but current browsers supporting SW, support this
    // notation as well and this is the only way of retrieving all the headers.
    for (var entry of headers.entries()) {
        serialized[entry[0]] = entry[1];
    }
    return serialized;
}
*/
/**
 * Creates a Response from it's serialized version
 *
 * @param data
 * @returns Promise
 */
/*
function deserializeResponse(data) {
    return Promise.resolve(new Response(data.body, data));
}*/

/**
 * Saves the response for the given request eventually overriding the previous version
 *
 * @param data
 * @returns Promise
 */
/*
function cachePut(request, response, store) {
    var key, data;
    getPostId(request.clone())
        .then(function(id){
            key = id;
            return serializeResponse(response.clone());
        }).then(function(serializedResponse) {
        data = serializedResponse;
        var entry = {
            key: key,
            response: data,
            timestamp: Date.now()
        };
        store
            .add(entry)
            .catch(function(error){
                store.update(entry.key, entry);
            });
    });
}
*/
/**
 * Returns the cached response for the given request or an empty 503-response  for a cache miss.
 *
 * @param request
 * @return Promise
 */
/*
function cacheMatch(request) {
    return getPostId(request.clone())
        .then(function(id) {
            return store.get(id);
        }).then(function(data){
            if (data) {
                return deserializeResponse(data.response);
            } else {
                return new Response('', {status: 503, statusText: 'Service Unavailable'});
            }
        });
}
*/
/**
 * Returns a string identifier for our POST request.
 *
 * @param request
 * @return string
 */
/*
public function getPostId(request) {
    return JSON.stringify(serializeRequest(request.clone()));
}

 */
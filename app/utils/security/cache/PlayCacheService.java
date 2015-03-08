/*
Copyright (c) 2013 - 2014 ACenterA Inc.

MIT License
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

package utils.security.cache;

import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheException;
import play.Logger;

import java.io.Serializable;
import java.util.Collection;
import java.util.Map;
import java.util.Set;
import java.lang.Object;

public class PlayCacheService implements Cache<Object, Object> {

    @Override
    public Object get(Object k) throws CacheException {
        Logger.debug("GET CACHE OBJECT OF : " + k);
        return play.cache.Cache.get((String)k);
    }

    @Override
    public Object put(Object k, Object v) throws CacheException {
        Logger.debug("PUT CACHE OBJECT OF : " + k + " with avlue of : " + v);
        play.cache.Cache.set((String)k, v);
        return get(k);
    }

    @Override
    public Object remove(Object k) throws CacheException {
        Object obj = get(k);

        if (obj != null) play.cache.Cache.remove((String)k);

        return obj;
    }

    @Override
    public void clear() throws CacheException {
        throw new CacheException("Not supported");
    }

    @Override
    public int size() {
        return 0;
    }

    @Override
    public Set<Object> keys() {
        //throw new CacheException("Not supported");
        return null;
    }

    @Override
    public Collection<Object> values() {
        //throw new CacheException("Not supported");
        return null;
    }
}

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

package utils.security;

import org.apache.shiro.crypto.hash.Sha256Hash;

import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.apache.shiro.util.ByteSource;
import org.apache.shiro.util.SimpleByteSource;


public class PasswordEncoder {

    private static PasswordEncoder instance;

    /**
     * Empty Constructor
     */
    private PasswordEncoder() {
    }

    /**
     * @return
     */
    public static synchronized PasswordEncoder getInstance() {

        if (instance == null) {
            PasswordEncoder returnPasswordEncoder = new PasswordEncoder();

            return returnPasswordEncoder;
        } else {

            return instance;
        }
    }

    /**
     *
     * @param password
     * @param saltKey
     * @return
     * @throws NoSuchAlgorithmException
     * @throws IOException
     */
    public synchronized String encode(String password, String saltKey)
            throws NoSuchAlgorithmException, IOException {

        byte[] salt = base64ToByte(saltKey);

        return new Sha256Hash(password, salt, 1024).toBase64();

    }



    public synchronized ByteSource getSalt(String saltKey)
            throws NoSuchAlgorithmException, IOException {

        return new SimpleByteSource(base64ToByte(saltKey));
    }



    /**
     * @param str
     * @return byte[]
     * @throws IOException
     */
    private byte[] base64ToByte(String str) throws IOException {

        byte[] returnbyteArray = org.apache.commons.codec.binary.Base64.decodeBase64(str.getBytes());

        return returnbyteArray;
    }

    /**
     * @param bt
     * @return String
     * @throws IOException
     */
    private String byteToBase64(byte[] bt) {

        String returnString = new String(org.apache.commons.codec.binary.Base64.encodeBase64(bt));

        return returnString;
    }

}

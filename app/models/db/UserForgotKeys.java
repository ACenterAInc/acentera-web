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

package models.db;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


/*
        +-----------+-------------+------+-----+---------------------+----------------+
        | Field     | Type        | Null | Key | Default             | Extra          |
        +-----------+-------------+------+-----+---------------------+----------------+
        | id        | int(11)     | NO   | PRI | NULL                | auto_increment |
        | tokenid   | varchar(64) | NO   | MUL | NULL                |                |
        | ip        | varchar(15) | YES  |     | NULL                |                |
        | ts        | timestamp   | NO   |     | CURRENT_TIMESTAMP   |                |
        | redeemed  | tinyint(1)  | YES  |     | NULL                |                |
        | user_id   | int(11)     | YES  |     | NULL                |                |
        +-----------+-------------+------+-----+---------------------+----------------+
 */
@Entity
@Table(name="USER_RECOVER_PASSWORD_KEYS")
public class UserForgotKeys extends AutoIncrementId {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    public @Getter @Setter Long id;

    @Column(name = "tokenid", length = 64)
    private @Getter @Setter String tokenid;


    @Column(name = "tokenid_request", length = 64)
    private @Getter @Setter String tokenid_request;

    @Column(name = "ip", length = 15)
    private @Getter @Setter String ip;


    @Column(name = "user_id")
    private @Getter @Setter Long userId;

    @Column(name = "redeemed", columnDefinition = "TINYINT(1) DEFAULT 0")
    private @Getter @Setter int redeemed;


    public boolean isEquals(MetaData obj) {

        UserForgotKeys uObj = (UserForgotKeys) obj;
        if (this.getId() != uObj.getId())
            return false;

        if (!this.getTokenid().equals(uObj.getTokenid())) return false;

        return true;
    }
}

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

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import net.sf.json.JSONObject;

import javax.persistence.*;
import javax.persistence.GenerationType;
import java.util.Date;


@Entity
@Table(name="DEVICE")

public class Device extends AutoIncrementId {
        private static final long serialVersionUID = 1L;

        @Id
        @Column(name = "id")
        @GeneratedValue(strategy = GenerationType.AUTO)
        private @Getter @Setter Long id;

        @JsonIgnore
        @Column(name = "partner_id")
        private @Getter @Setter Long partner_id;

        @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
        @JoinColumn(name = "project_id")
        private @Getter @Setter Project project;


        @Column(name = "salt")
        @JsonIgnore
        private @Getter @Setter String salt;

        @Column(name = "state")
        private @Getter @Setter String state;

        @JsonIgnore
        @Column(name = "guid")
        //Type(type="binary")
        private String guid;

        @Deprecated()
        @Column(name = "creation_time")
        @JsonIgnore
        public @Getter @Setter
        Date creation_time;

/*
        @Deprecated()
        @Column(name = "LASTUPDATE")
        @JsonIgnore
        public @Getter @Setter Date last_update;
*/
/*
        @JsonIgnore
        @Column(name = "JSON_INVENTORY", columnDefinition = "TEXT default NULL")
        public @Getter @Setter String jsonInventory;
*/
/*
        @JsonIgnore
        @Column(name = "MON_HASH")
        @Type(type="binary")
        private byte[] MON_HASH;

        @JsonIgnore
        @Column(name = "COLLECTOR_HASH")
        @Type(type="binary")
        private byte[] COLLECTOR_HASH;

        @Column(name = "INVENTORY_HASH")
        @Type(type="binary")
        private byte[] INVENTORY_HASH;

        @JsonIgnore
        @Column(name = "SOFT_HASH")
        @Type(type="binary")
        private byte[] SOFT_HASH;
*/
        /*@JsonIgnore
        @Column(name = "AWS_ACCESS")
        @Type(type="varchar(64)")
        private String AWS_ACCESS;

        @JsonIgnore
        @Column(name = "AWS_SECRET")
        @Type(type="varchar(64)")
        private String AWS_SECRET;
        */

    /*    @Column(name = "LAST_BILLING_CHECK")
        @JsonIgnore
        public @Getter @Setter Date lastBillingCheck;

        @Column(name = "BILLING_COMPLETED", columnDefinition = "tinyint(4)")
        @JsonIgnore
        public @Getter @Setter Integer billingCompleted;


        @Column(name = "LAST_BILLING_START")
        @JsonIgnore
        public @Getter @Setter Date lastBillingStart;

        @Column(name = "LAST_BILLING_TIME")
        @JsonIgnore
        public @Getter @Setter Date lastBillingTime;
*/

        @Override
        public void updateTimeStamps() {
            lastModified = new Date();
            //last_update = lastModified;
            if (created == null) {
                created = new Date();
                creation_time = created;
            }
        }

        @Transient
        //TODO: This should be removed from here to do a generic cross platform item instead...
        private @Setter JSONObject dropletInfo;

        @JsonIgnore
        public JSONObject getDropletInfo() {
            if (dropletInfo == null) {
                //TODO: return the latest stored JSON Value....
                JSONObject res = new JSONObject();
                res.put("name", this.getGUID());
                return res;
            }
            return dropletInfo;
        }


        public boolean isEqual(MetaData obj) {
            Device uObj = (Device) obj;

            if (this.getId() != uObj.getId())             return false;

            return true;
        }

        public String getGUID() {
            if (guid == null) {
                return null;
            }

            //return Utils.getMd5FromByteArray(guid);
            return guid;
        }

        public void setGUID(byte[] guid) {

            if (this.guid == null) {
                this.guid = new String(guid);
            } else {
                //TODO: Throw error exception here?...
            }
        }
}

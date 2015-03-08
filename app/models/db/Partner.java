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


import java.io.*;
import java.util.Date;


import javax.persistence.*;

import com.google.gson.annotations.Expose;
import lombok.Getter;
import lombok.Setter;
import models.ssh.KeyPair;
import utils.Utils;


@Entity
@Table(name="PARTNER", uniqueConstraints =
    @UniqueConstraint(name = "idx_unique_partner", columnNames={"name"})
)
public class Partner  extends AutoIncrementId implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = -8042998356589810133L;
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Expose public @Getter @Setter Long id;


    @Column(name = "name")
    @Expose private String Name;

    @Column(name = "nicename")
    @Expose private String NiceName;

    @Column(name = "comment")
    private String Comment;

    @Column(name = "apikey")
    //Type(type="binary")
    @Expose private byte[] APIKEY;

    @Column(name = "salt")
    private String SALT;

    @Column (name = "cloudid")
    private long cloudid;

    @Column (name = "funds")
    private float funds;

    @Column (name = "funds_added")
    private int added_funds;

    @Column (name = "monthlycost")
    private float monthlycost;

    @Column (name = "totalcost")
    private float totalcost;

    @Column (name = "last_monthlycost_date")
    private Date montlycost_update_date;

    @Column(name = "wizard")
    private int wizard;

    @Column(name = "demo_task_id")
    private int demo_task_id;

    @Column(name = "SUBSCRIPTION_TYPE")
    private int subscriptionType;

    @Column (name = "deploy_key_priv", columnDefinition = "TEXT")
    private String deploy_key_priv;

    @Column (name = "deploy_key_pub", columnDefinition = "TEXT")
    private String deploy_key_pub;


    public String getName() {
        return Name;
    }
    public void setName(String n) {
        this.Name = n;
    }
    public String getNiceName() {
        return NiceName;
    }
    public void setNiceName(String n) {
        this.NiceName= n;
    }
    public Integer getAddedFunds() { return this.added_funds; };
    public void setAddedFunds(Integer i) { this.added_funds = i; };
    public String getComment() {
        return Comment;
    }
    public void setComment(String n) {
        this.Comment= n;
    }
    public float getFunds() { return this.funds; }
    public void setFunds(Float f) { this.funds = f; }
    public float getMonthlycost() { return this.monthlycost; }
    public void setMonthlycost(Float f) { this.monthlycost = f; }
    public float getTotalcost() { return this.totalcost; }
    public void setTotalcost(Float f) { this.totalcost = f; }
    public String getAPIKEY() {
        return Utils.getMd5FromByteArray(APIKEY);
    }
    public void setAPIKEY(byte[] newAPI) {
        this.APIKEY = newAPI;
    }

    public String getSALT() {
        return SALT;
    }

    public void setSALT(String salt) {
        this.SALT = salt;
    }


    public boolean isEquals(MetaData obj) {

        Partner uObj = (Partner) obj;
        if (this.getId() != uObj.getId())
            return false;

        if (!(this.getId() == (uObj.getId()))) return false;
        if (!this.getName().equals(uObj.getName())) return false;
        if (!this.getNiceName().equals(uObj.getNiceName())) return false;
        if (!this.getComment().equals(uObj.getComment())) return false;

        return true;
    }


    public int getWizard() {
        return wizard;
    }

    public void setWizard(int i) {
        wizard = i;
    }


    public int getSubscriptionType() {
        return subscriptionType;
    }


    public void setSubscriptionType(int i) {
        subscriptionType = i;
    }

    public int getDemoTaskId() {
        return demo_task_id;
    }


    public void setDemoTaskId(int i) {
        demo_task_id = i;
    }

    public void setCloudId(long l) {
        this.cloudid = l;
    }
    public long getCloudId() {
        return this.cloudid;
    }


    public void generateKeys() {

        try {
            //generate only once..
            if ((this.deploy_key_priv == null) || (this.deploy_key_priv == "")) {
                KeyPair keypair = Utils.generateSshKey("ACenterA_Automation");


                this.deploy_key_priv = keypair.getPrivateKey();
                this.deploy_key_pub = keypair.getPublicKey();

            }

        } catch (Exception ee) {
            ee.printStackTrace();;
        }
    }

    public String getDeploy_key_priv() {
        return this.deploy_key_priv;
    }

    public String getDeploy_key_ppub() {
        return this.deploy_key_pub;
    }

    public void setDeploy_key_priv(String key) {
        this.deploy_key_priv = key;
    }

    public void setDeploy_key_pub(String key) {
        this.deploy_key_pub = key;
    }



}

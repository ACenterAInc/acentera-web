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


import java.io.IOException;

import java.security.NoSuchAlgorithmException;
import java.util.*;


import com.fasterxml.jackson.annotation.*;
import com.google.gson.annotations.Expose;
import lombok.*;


import org.apache.shiro.SecurityUtils;
import org.apache.shiro.crypto.RandomNumberGenerator;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.Sha256Hash;

import org.apache.shiro.mgt.RealmSecurityManager;
import org.apache.shiro.realm.Realm;
import org.hibernate.annotations.Where;
import utils.security.PasswordEncoder;
import utils.security.SampleRealm;

import javax.persistence.*;

import static ch.lambdaj.Lambda.having;
import static ch.lambdaj.Lambda.select;


@Entity
@Table(name="USER")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@JsonRootName("projects")
public class User extends AutoIncrementId {

    private static final long serialVersionUID = 1;



    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Expose @Getter @Setter public Long id;


    @Column(name = "firstname")
    @Expose private String firstName;

    @Column(name = "lastname")
    @Expose private String lastName;


    @Column(name = "email", unique = true)
    @Expose public @Setter String email;


    //Separated for WebUser.scala to be able to call this function.. at compile time since lmobok and scal dont work..
    public String getEmail() {
        return this.email;
    }

    public Long getPartnerId() {
        if (this.getPartner() == null) {
            return new Long(0);
        } else {
            return this.getPartner().getId();
        }
    }

    @Column(name = "cred")
    @JsonIgnore
    private String Password;


    @Column(name = "lang", columnDefinition = "CHAR(2) default 'en'")
    @Expose private @Getter @Setter String lang;

    @Column(name = "salt")
    @JsonIgnore
    private String Salt;

    @Column(name = "phone")
    @JsonIgnore
    @Expose private String Phone;


    @Transient
    public java.util.Date getCreationDate() {
        return this.getCreated();
    }

    @Column(name = "status")
    @Expose private String Status;

    @Column(name = "type")
    @Expose public @Getter @Setter String type;


    @Transient
    public @Getter @Setter Set<String> roles = new HashSet<String>();

    public void addRole(String role) {
        this.roles.add(role);
    }

    public void removeRole(String role) {
        this.roles.remove(role);
    }


    @Transient
    @JsonProperty("project_id")
    public @Getter @Setter Long project_id;


/*
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name="USER_GROUP",
            joinColumns=@JoinColumn(name="USER_ID"),
            inverseJoinColumns=@JoinColumn(name="GROUP_ID"))
    private Collection<Group> groupLst;

    public Collection<Group> getGroups() {
        return groupLst;
    }


*/

    /**
     * @return Email
     */

    @JsonIgnore
    public String getPhone() {
        return Phone;
    }

    public String getStatus() {
        return Status;
    }

    public Boolean getLocked() {
        if (type == null) {
            return false;
        }
        return (type.compareToIgnoreCase("Locked") == 0);
    }

    public void setLocked(String Type) {
        this.type= Type;
    }

    public void setPhone(String p) {
        this.Phone = p;
    }

    public void setStatus(String s) {
        this.Status = s;
    }

    @JsonIgnore
    public String getPassword() {
        return Password;
    }


    public void setPassword(String p) throws NoSuchAlgorithmException, IOException {
        PasswordEncoder pe = PasswordEncoder.getInstance();

        RandomNumberGenerator rng = new SecureRandomNumberGenerator();
        Object salt = rng.nextBytes();

        //Now hash the plain-text password with the random salt and multiple
        //iterations and then Base64-encode the value (requires less space than Hex):
        String hashedPasswordBase64 = new Sha256Hash(p, salt, 1024).toBase64();

        String enc;
        enc = pe.encode(p, hashedPasswordBase64);

        if (enc != null && hashedPasswordBase64 != null) {
            this.Password = enc;
            setSalt(hashedPasswordBase64);
        }
    }

    @JsonIgnore
    public String getSalt() {
        return this.Salt;
    }

    public void setSalt(String s) {
        this.Salt = s;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }



    public void setFirstName(String string) {
        firstName = string;
    }

    public void setLastName(String string) {
        lastName = string;
    }

    public boolean hasRole(String roleName) {
        return false;
    }

    public boolean isEquals(MetaData obj) {
        User uObj = (User) obj;
        if (this.getId() != uObj.getId())
            return false;

        if (!this.getId().equals(uObj.getId())) return false;
        if (!this.getFirstName().equals(uObj.getFirstName())) return false;
        if (!this.getLastName().equals(uObj.getLastName())) return false;
        if (!this.getLocked().equals(uObj.getLocked())) return false;
        if (!this.getStatus().equals(uObj.getStatus())) return false;

        return true;
    }


    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.ALL})
    @Where(clause = "disable_date is null")
    @JoinColumn(name = "partner_id")
    @JsonIgnore
    public @Getter @Setter Partner partner;


    @OneToMany(fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    @Where(clause = "disable_date is null")
    @JoinColumn(name = "user_id")
    @JsonIgnore
    public @Getter @Setter List<UserProjects>   userProjects;



}

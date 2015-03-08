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
import com.google.gson.annotations.Expose;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.CallbackException;
import org.hibernate.Session;
import org.hibernate.classic.Lifecycle;

import javax.persistence.*;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;
import java.util.Date;

@MappedSuperclass
public abstract class MetaData implements Lifecycle, Serializable, Cloneable, Comparable {

    private static final long serialVersionUID = 1L;


    public MetaData clone() {
        try {
            return (MetaData) super.clone();
        } catch (CloneNotSupportedException e) {
        }
        return null;
    }

    public boolean equals(MetaData obj) {
        if (this == obj) return true;
        if (obj == null) return false;

        try {
            return this.isEquals(obj);
        } catch (Exception ee) {
        }
        return false;
    }

    public abstract boolean isEquals(MetaData obj);

    public boolean isEquals(String obj) {
           return (this.toString().compareTo(obj) == 0);
    }

    public int compareTo(Object o) {
        return 0;
    }
    public int compareTo(MetaData obj) { return 0; }

    public void postLoad() {

    }


    @Column(name = "created")
    @JsonIgnore
    public @Getter @Setter Date created;


    @Column(name="last_modified", columnDefinition="datetime")
    @Temporal(javax.persistence.TemporalType.TIMESTAMP)
    @JsonIgnore
    public @Getter @Setter Date lastModified;

    public void updateTimeStamps() {
        lastModified = new Date();
        if (created == null) {
            created = new Date();
        }
    }

    @Column(name = "disable_date")
    @Expose public @Getter @Setter Date disableDate;


    public void disable() {
        this.setDisableDate(new Date());
    }

    public boolean isDisabled() {
        return (this.getDisableDate() != null);
    }

    //can only be enabled if the object was not disabled at first (due to @Where...)
    public void enable() {
        this.setDisableDate(null);
    }

    @Override
    public boolean onSave(Session session) throws CallbackException {
        updateTimeStamps();
        return false;
    }

    @Override
    public boolean onUpdate(Session session) throws CallbackException {
        updateTimeStamps();
        return false;
    }

    @Override
    public boolean onDelete(Session session) throws CallbackException {

        updateTimeStamps();

        if (this.getDisableDate() == null) {
            this.setDisableDate(new Date());
        }
        return false;
    }

    @Override
    public void onLoad(Session session, Serializable serializable) {
    }


}

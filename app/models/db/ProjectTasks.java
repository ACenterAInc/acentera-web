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


import com.fasterxml.jackson.annotation.*;
import com.google.gson.annotations.Expose;
import controllers.acentera.SecurityController;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.CallbackException;
import org.hibernate.Session;
import org.hibernate.annotations.Where;
import play.Logger;

import javax.persistence.*;


@Entity
@Table(name = "PROJECT_TASKS")
@Where(clause = "disable_date is null")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@JsonRootName("task")
public class ProjectTasks extends AutoIncrementId {

    private static final long serialVersionUID = -1;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    public @Expose @Getter @Setter Long id;


    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    public @Getter @Setter Project projects;

    @JsonProperty("name")
    public @Getter @Setter String name;

    @JsonProperty("type")
    public @Getter @Setter String type;

    @JsonProperty("refreshtype")
    @Column(name = "refresh_type", columnDefinition = "varchar(25) default 'poll'")
    public @Getter String refreshType = "poll";

    public void setAsyncRefreshType() {
        this.refreshType = "async";
    }


    @JsonProperty("ext_id")
    public @Getter String extId = null;


    public void setExtId(Long id) {
        this.extId = String.valueOf(id);
    }

    //ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    //JoinColumn(name = "project_provider_id")
    //JsonIgnore
    @Column(name= "project_provider_id", nullable = true)
    public @Getter @Setter Long providerId;


    @OneToOne( fetch = FetchType.LAZY )
    @JoinColumn(name = "user_id")
    @JsonIgnore
    public @Getter @Setter User user;

    public boolean isEquals(MetaData obj) {
        ProjectTasks uObj = (ProjectTasks) obj;

        if ( ! (getId().equals(uObj.getId()) ) )                           return false;
        if ( ! (getName().compareTo(uObj.getName() ) == 0 ) )            return false;
        if ( ! (getType().compareTo(uObj.getType() ) == 0 ) )                    return false;
        /*
        if ( ! (getProjects().getId().compareTo(getProjects().getId()) == 0 ) )            return false;
        if ( ! (getProvider().compareTo(uObj.getProvider() ) == 0 ) )                    return false;
        */

        return true;
    }

    @Override
    public boolean onSave(Session session) throws CallbackException {
        super.onSave(session);

        if (id == null) {
            try {
                setUser(SecurityController.getUser());
            } catch (Exception ee) {
                //ee.printStackTrace();
            }
        }

        return false;
    }


}



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
import lombok.Getter;
import lombok.Setter;
import models.db.acentera.impl.ProjectImpl;
import org.hibernate.CallbackException;
import org.hibernate.Session;
import org.hibernate.annotations.Where;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.*;

import static ch.lambdaj.Lambda.having;
import static ch.lambdaj.Lambda.select;


@Entity


@Table(name="PROJECT", uniqueConstraints =
    @UniqueConstraint(name = "idx_unique_cloudid", columnNames={"cloudId"})
)
@Where(clause="disable_date is null")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@JsonRootName("projects")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Project extends AutoIncrementId {

    /**
     *
     */
    private static final long serialVersionUID = -8042998356589810133L;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Expose public @Getter @Setter Long id;

    @Column(name = "name", length = 32)
    @Size(max = 32)
    @NotEmpty
    @JsonProperty("name")
    @Expose private @Getter String name;

    public void setName(String name) {
        this.name = name;
        this.short_name = name;
    }

    @Column(name = "short_name", length = 32)
    @Size(max = 32)
    @NotEmpty
    @JsonProperty("short_name")
    @Expose private @Getter @Setter String short_name;


    @Column(name = "cloudId",unique=true)
    @Expose private @Getter @Setter Long cloudId;

    @Column(name = "has_app", columnDefinition = "tinyint(1) default 0")
    @Expose private @Getter @Setter Long has_app =  new Long(0);

    @Column(name = "has_db", columnDefinition = "tinyint(1) default 0")
    @Expose private @Getter @Setter Long has_db = new Long(0);


    @Transient
    @JsonProperty("isConfigured")
    public Integer getIsConfigured() {
        //Should be better to add a flag in the Project DAO model
        if (this.getProviders().size()>0)
            return 1;

        return 0;
    }


    public boolean isEquals(MetaData obj) {
        Project uObj = (Project) obj;
        if (this.getId() != uObj.getId())
            return false;

        if (!(this.getId() == (uObj.getId()))) return false;
        if (!this.getName().equals(uObj.getName())) return false;

        return true;
    }



    @OneToOne(fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    @Where(clause = "disable_date is null")
    @JoinColumn(name = "partner_id")
    @JsonIgnore
    public @Getter @Setter Partner partner;


    @OneToMany(fetch = FetchType.EAGER, mappedBy = "projects", cascade = {CascadeType.ALL})
    @Where(clause = "disable_date is null")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("quotas")
    public @Setter Set<ProjectQuota> quotas = new HashSet<ProjectQuota>();

    public Set<ProjectQuota> getQuotas() {
        if (this.quotas == null) {
            this.quotas = new HashSet<ProjectQuota>();
        }
        return this.quotas;
    }

    public boolean addQuota(ProjectQuota quota) {
        //Make sure we set the project to the quota...
        quota.setProjects(this);
        Set<ProjectQuota> tmpQuotas = getQuotas();


        if (tmpQuotas.contains(quota)) {
            return false;
        }

        tmpQuotas.add(quota);
        //setQuotas(tmpQuotas);

        return true;
    }




/*
    @OneToMany(cascade=CascadeType.ALL, fetch = FetchType.LAZY)
    @Where(clause = "disable_date is null")
    @JoinColumn(name="project_id", nullable=false)
    @JsonIgnore
    public @Setter @Getter Set<ProjectUserRoles> usersRoles = new HashSet<ProjectUserRoles>();
    */

    @Transient
    @JsonIgnore
    private @Getter Set<User> userSet = null;
    boolean rolesLoaded = false;


    /*
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("users")
    public Set<User> getUsersWithRoles() {


        if (userSet == null) {
            this.rolesLoaded = true;

            Iterator<UserProjectsRoles> itr = this.usersRoles.iterator();

            userSet = new HashSet<User>();
            while(itr.hasNext()) {
                UserProjectsRoles upr = itr.next();

                User u = upr.getUser();
                //List<ProjectTags> s = select(u.getTags(), having(on(ProjectTags.class).getProject().getId(), equalTo(this.getId())));
                        //if (upr.getRole() != null) {
                    u.addRole(upr.getRole().getName());
                    u.setProjectId(this.getId());

                  //  u.setTags(new HashSet<ProjectTags>(s));
                    userSet.add(u);
                //}
            }


            Iterator<UserProjects> itrProj = getUsers().iterator();

            while(itrProj.hasNext()) {
                UserProjects up = itrProj.next();

                User u = up.getUser();
                u.setTags(new ArrayList(up.getTags()));
                userSet.add(u);
            }

        }
        return userSet;
    }
*/



    @Transient
    @JsonIgnore
    private @Setter Set<UserProjects> usersProjects = new HashSet<UserProjects>();


    @Transient
    public User getUserById(Long userId) {
        return ProjectImpl.getUsersForProjectById(this, userId);
    }

    @JsonIgnore
    public Set<UserProjects> getUsers() {
        if (this.usersProjects == null) {
            this.usersProjects = new HashSet(ProjectImpl.getUsersForProject(this));
        }
        return this.usersProjects;
    }

    public boolean addUserProject(UserProjects up) {
        //Make sure we set the project to the quota...
        up.setProject(this);

        Set<UserProjects> tmpUsers = getUsers();

        if (tmpUsers.contains(up)) {
            return false;
        }

        tmpUsers.add(up);

        return true;
    }


    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name="project_id")
    @Where(clause = "disable_date is null")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("providers")
    @JsonManagedReference
    @Expose public @Getter @Setter Set<ProjectProviders> providers;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name="project_id")
    @Where(clause = "disable_date is null")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("devices")
    @JsonManagedReference
    @Expose public @Getter @Setter Set<ProjectDevices> devices;


    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name="projects_id")
    @Where(clause = "disable_date is null")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("sshkeys")
    @JsonManagedReference
    @Expose public @Getter @Setter Set<ProjectSshKey> sshKeys;




    @Override
    public boolean onSave(Session session) throws CallbackException {
        super.onSave(session);
        if (cloudId == null) {
            cloudId = ProjectImpl.getUniqueCloudId();
        }
        return false;
    }

    @Override
    public boolean onUpdate(Session session) throws CallbackException {
        super.onUpdate(session);
        if (cloudId == null) {
            cloudId = ProjectImpl.getUniqueCloudId();
        }
        return false;
    }



}

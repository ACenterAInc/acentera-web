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
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;


@Entity
@Table(name = "PROJECT_USER")
@Where(clause="disable_date is null")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@JsonRootName("tag")

/*
@NamedQuery(name = "query", query = "SELECT DISTINCT o " +
    "FROM Organization o, User u " +
    "JOIN o.roles oRole " +
    "JOIN u.roles uRole " +
    "WHERE oRole.id = uRole.id AND u.id = :uId")
 */
//NamedQuery(name="getRoles", query = "SELECT ur, r FROM UserProjects ur LEFT JOIN ur.roles r WHERE r.disableDate is null and r.type IN ( 'role' )")
//@NamedQuery(name="getRoles", query = "SELECT ur, r FROM UserProjects ur LEFT JOIN ur.roles r INNER JOIN r.userProjects up WHERE r.userProjects.type IN ( 'role' )")
/*
from Player as p
        left join p.inventory as i
        left join i.enchantments as e
        where e.isSuperiorEnchantment = 1
*/

public class UserProjects extends MetaData {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Expose
    @Getter @Setter Long id;


    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="project_id")
    @Where(clause="disable_date is null")
    @Access(AccessType.PROPERTY)
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("projects")
    @JsonIgnore
    @JsonManagedReference
    public @Setter @Getter Project project;

    @JsonIgnore
    public Long getProjectId() {
        try {
            if (this.getProject() != null) {
                return this.getProject().getId();
            } else {
                return null;
            }
        } catch (Exception ee) {
            return null;
        }
    }


    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("users")
    @JoinColumn(name="user_id")
    @JsonManagedReference
    @JsonIgnore
    public @Getter @Setter User user;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name="project_user_id")
    //userProjects_id
    @Where(clause = "disable_date is null")
    @JsonIgnore
    @JsonManagedReference
    @Expose public @Getter @Setter Set<ProjectUserTags> tags;


    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("tags")
    @JsonManagedReference
    public Set<ProjectTags> getProjectTags() {

        Set<ProjectTags> s = new HashSet<ProjectTags>();
        Iterator<ProjectUserTags> itr = this.getTags().iterator();
        while(itr.hasNext()) {
            ProjectUserTags pt = itr.next();
            s.add(pt.getProjectTags());
        }

        return s;
    }

    //removed as it does not work..

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name="project_user_id")
    @JsonIgnore
    @Where(clause = "disable_date is null")
    @Expose private @Getter @Setter Set<ProjectUserRoles> allRoles;




    public void addRole(ProjectUserRoles role) {
        Set<ProjectUserRoles> s = this.getAllRoles();
        role.setUserProjects(this);


        /* Prevention.*/
        if (this.getUser() != null && role.getUser() ==null) {
            role.setUser(this.getUser());
        }
        if (this.getUser() == null && role.getUser() != null) {
            this.setUser(role.getUser());
        }

        if (s == null) {
            s = new HashSet<ProjectUserRoles>();
        }
        s.add(role);
    }


    @JsonIgnore
    public @Getter @Setter String inviteToken;


    private static final long serialVersionUID = -87392980223422L;

    public boolean isEquals(MetaData obj) {
        UserProjects uObj = (UserProjects) obj;
        //return (project.equals(uObj.getProject()) && user.equals(uObj.getUser()));
        return true;
    }

}



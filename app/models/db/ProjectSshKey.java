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
import org.hibernate.annotations.Type;
import org.hibernate.annotations.Where;
import utils.security.TagSingleBasePermission;

import javax.persistence.*;


@Entity
@Table(name = "PROJECT_SSHKEY")
@Where(clause = "disable_date is null")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@JsonRootName("sshkey")
public class ProjectSshKey extends AutoIncrementId implements TagSingleBasePermission {

    private static final long serialVersionUID = -1;

    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public @Expose @Getter @Setter Long id;


    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("projects_id")
    public @Getter @Setter Project projects;

    @JsonProperty("name")
    public @Getter @Setter String name;


    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    public @Getter @Setter User user;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "project_tags_id")
    @JsonIgnore
    public @Getter @Setter ProjectTags projectTags;

    @JsonIdentityReference(alwaysAsId=true)
    @JsonProperty("tag")
    public String getTag() {
        return this.projectTags.getName();
    }


    @Column(name = "publickey")
    @Type(type="text")
    @JsonProperty("publickey")
    public @Getter @Setter String publicKey;

    @Transient
    @JsonProperty("canEdit")
    public Integer canEdit() {
        if (SecurityController.canEditKey(this)) {
            return 1;
        } else {
            return 0;
        }
    }



    public boolean isEquals(MetaData obj) {
        ProjectSshKey uObj = (ProjectSshKey) obj;

        if ( ! (getId().equals(uObj.getId()) ) )                           return false;
        if ( ! (getName().compareTo(uObj.getName() ) == 0 ) )            return false;
        if ( ! (getPublicKey().compareTo(uObj.getPublicKey() ) == 0 ) )                    return false;

        return true;
    }

    @Override
    public String toString() {
        return this.getName();
    }

}



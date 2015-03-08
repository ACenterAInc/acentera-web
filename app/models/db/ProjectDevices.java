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
import utils.security.TagArrayBasePermission;

import javax.persistence.*;
import javax.validation.constraints.Max;
import java.util.*;


@Entity
@Table(name="PROJECT_DEVICE")
@Where(clause = "disable_date is null")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectDevices extends AutoIncrementId implements TagArrayBasePermission {
        private static final long serialVersionUID = 1L;

        @Id
        @Column(name = "id")
        @GeneratedValue(strategy = GenerationType.AUTO)
        private @Getter @Setter Long id;

        @Column(name = "partner_id")
        private @Getter @Setter Long partner_id;

        @ManyToOne
        @JsonIdentityReference(alwaysAsId = true)
        @JsonProperty("project_id")
        public @Getter @Setter Project project;

        @Column(name = "provider_id")
        private @Getter @Setter ProjectProviders providers;


        @Column(name = "external_id")
        private @Getter @Setter String externalId;

        @Column(name = "type")
        @Max(value = 15)
        private @Getter @Setter String type;

        @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
        @Where(clause = " ( state is null or state in ( 'init', 'ready', 'destroying' ) ) ")
        private @Getter @Setter Device device;


        //removed as it does not work..
        @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
        @JoinColumn(name="project_user_id")
        //userProjects_id
        @Where(clause = "disable_date is null")
        @JsonIgnore
        @JsonManagedReference
        @Expose
        public @Getter @Setter Set<ProjectDevicesTags> tags;


        @JsonIdentityReference(alwaysAsId = true)
        @JsonProperty("tags")
        @JsonManagedReference
        public Set<ProjectTags> getProjectTags() {

            Set<ProjectTags> s = new HashSet<ProjectTags>();
            Iterator<ProjectDevicesTags> itr = this.getTags().iterator();
            while(itr.hasNext()) {
                ProjectDevicesTags pt = itr.next();
                s.add(pt.getProjectTags());
            }

            return s;
        }

        public boolean isEqual(MetaData obj) {
            ProjectDevices uObj = (ProjectDevices) obj;

            //TODO:.. compare with all fields
            if (this.getId() != uObj.getId())             return false;

            return true;
        }

    @Override
    public List<String> getTagPermissions() {

        Set<ProjectTags> tags = this.getProjectTags();
        Iterator<ProjectTags> itrTags = tags.iterator();

        Set<String> stringTag = new HashSet<String>();
        while(itrTags.hasNext()) {
            ProjectTags pt = itrTags.next();
            stringTag.add(pt.getName());
        }

        return new ArrayList<String>(stringTag);
    }
}

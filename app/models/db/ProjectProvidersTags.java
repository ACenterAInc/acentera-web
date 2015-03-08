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


@Entity
@Table(name = "PROJECT_PROVIDERS_TAGS")
@Where(clause = "disable_date is null")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@JsonRootName("tag")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectProvidersTags extends AutoIncrementId {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Expose @Getter @Setter Long id;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Where(clause = "type in ( 'provider' )")
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(name = "project_tags_id")
    @JsonIgnore
    public @Getter @Setter ProjectTags projectTags;

    @JsonProperty("name")
    public String getName() {
        return this.projectTags.getName();
    }



    private static final long serialVersionUID = -87392980223422L;

    public boolean isEquals(MetaData obj) {
        ProjectProvidersTags uObj = (ProjectProvidersTags) obj;

        if ( ! (getId().equals(uObj.getId()) ) )          return false;
        if ( ! (getName().compareTo(uObj.getName() ) == 0 ) )            return false;

        return true;
    }

    @Override
    public String toString() {
        return this.getName();
    }

}



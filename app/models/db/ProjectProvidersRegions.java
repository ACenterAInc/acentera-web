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
@Table(name = "PROJECT_PROVIDERS_REGIONS")
@Where(clause = "disable_date is null")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@JsonRootName("region")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectProvidersRegions extends AutoIncrementId {

    private static final long serialVersionUID = -1;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Expose @Getter @Setter Long id;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(name = "project_regions_id")
    @JsonIgnore
    public @Getter @Setter ProjectRegions projectRegions;

    @JsonProperty("name")
    public String getName() {
        return this.projectRegions.getName();
    }


    @JsonProperty("slug")
    public String getSlug() {
        return this.projectRegions.getSlug();
    }

    @JsonProperty("ext_id")
    public Integer getExtId() {
        return this.projectRegions.getExtid();
    }

    public boolean isEquals(MetaData obj) {
        ProjectProvidersRegions uObj = (ProjectProvidersRegions) obj;

        if ( ! (getId().equals(uObj.getId()) ) )          return false;
        if ( ! (getName().compareTo(uObj.getName() ) == 0 ) )            return false;
        if ( ! (getSlug().compareTo(uObj.getSlug() ) == 0 ) )            return false;

        return true;
    }

    @Override
    public String toString() {
        return this.getSlug();
    }

}



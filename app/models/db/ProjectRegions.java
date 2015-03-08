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

import javax.persistence.*;


@Entity
@Table(name = "PROJECT_REGIONS")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@JsonRootName("region")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectRegions extends AutoIncrementId {

    private static final long serialVersionUID = -1;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Expose @Getter @Setter Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("project_id")
    public @Getter @Setter Project project;

    @Expose public @Getter @Setter String name;

    @Expose public @Getter @Setter String slug;

    @Expose public @Getter @Setter Integer extid;



    public boolean isEquals(MetaData obj) {
        ProjectRegions uObj = (ProjectRegions) obj;

        if ( ! (getProject().equals(uObj.getProject()) ) )          return false;

        if ( ! (name.compareTo(uObj.getName() ) == 0 ) )            return false;
        if ( ! (slug.compareTo(uObj.getSlug() ) == 0 ) )            return false;


        return true;
    }

}



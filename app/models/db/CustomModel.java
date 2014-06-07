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
import models.db.acentera.impl.ProjectProvidersImpl;
import org.hibernate.annotations.Where;
import play.Logger;
import utils.security.TagArrayBasePermission;

import javax.persistence.*;
import java.util.*;


@Entity
@Table(name = "PROJECT_CUSTOM")
@Where(clause="disable_date is null")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@JsonRootName("custom")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CustomModel extends AutoIncrementId implements TagArrayBasePermission {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Expose @Getter @Setter Long id;

    @ManyToOne
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("project_id")
    public @Getter @Setter Project project;

    private static final long serialVersionUID = -87392980223422L;

    public boolean isEquals(MetaData obj) {
        CustomModel uObj = (CustomModel) obj;

        if ( ! (getProject().equals(uObj.getProject()) ) )          return false;

        return true;
    }

    @Override
    public List<String> getTagPermissions() {
        List<String> lstTags = new ArrayList<String>();
        return lstTags;
    }
}



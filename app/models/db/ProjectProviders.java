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
import utils.security.TagSingleBasePermission;

import javax.persistence.*;
import java.util.*;


@Entity
@Table(name = "PROJECT_PROVIDERS")
@Where(clause="disable_date is null")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@JsonRootName("provider")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectProviders extends AutoIncrementId implements TagArrayBasePermission {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Expose @Getter @Setter Long id;

    @ManyToOne
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("project_id")
    public @Getter @Setter Project project;

    /*public void setProject(Projects p) {
        this.project = p;
        this.project_id = p.getId();
    }*/



    @Expose public @Getter @Setter String name;

    @Expose public @Getter @Setter String apikey;

    @JsonIgnore
    public @Getter @Setter String secretkey;

    @Expose public @Getter @Setter String type;

    @Expose public @Getter @Setter String internal_type;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name="project_providers_id")
    @Where(clause = "disable_date is null")
    @Expose public @Getter @Setter Set<ProjectProvidersQuotaTags> tags = new HashSet<ProjectProvidersQuotaTags>();

    /*
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name="project_providers_id")
    @Where(clause = "disable_date is null")
    @Expose public  ProjectProvidersTags tag;*/

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name="project_providers_id")
    @Where(clause = "disable_date is null")
    @JsonIgnore
    @Expose public Set<ProjectProvidersTags> tag = new HashSet<ProjectProvidersTags>();


    public void setTag(ProjectProvidersTags t) {
        if (tag != null) {
            Iterator<ProjectProvidersTags> itrTags = tag.iterator();
            while(itrTags.hasNext()) {
                ProjectProvidersTags currentTag = itrTags.next();
                currentTag.disable();
            }
        } else {
            tag = new HashSet<ProjectProvidersTags>();
        }

        this.tag.add(t);
    }

    @JsonProperty("tag")
    public String getTag() {
        Logger.debug("getTag of : " + this.getName());
        if (tag == null) return "";

        Logger.debug("getTag of : " + this.getName() + " - 1 ");
        ProjectProvidersTags tagItem  = null;
        Iterator<ProjectProvidersTags> itrTags = tag.iterator();
        while(itrTags.hasNext() && tagItem == null) {
            ProjectProvidersTags currentTag = itrTags.next();
            Logger.debug("getTag of : " + this.getName() + " - 2 " + currentTag);
            if (!currentTag.isDisabled()) {
                tagItem = currentTag;
            }
        }

        Logger.debug("getTag of : " + this.getName() + " - 3 " + tagItem);
        if (tagItem == null) {
            return "";
        }

        Logger.debug("getTag of : " + this.getName() + " - 3 " + tagItem);
        return tagItem.getName();
    }

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name="project_providers_id")
    @Where(clause = "disable_date is null")
    @JsonIgnore
    @Expose public @Getter @Setter Set<ProjectProvidersRegions> regions = new HashSet<ProjectProvidersRegions>();

    public void addRegion(ProjectRegions pr) {
        ProjectProvidersRegions ppr = new ProjectProvidersRegions();
        ppr.setProjectRegions(pr);
        this.regions.add(ppr);
    }


    @Transient
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("regions")
    public Set<ProjectRegions> lstRegions() {
        return ProjectProvidersImpl.getRegionsAvailables(this.getRegions());
    }

    @Transient
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("region_sizes")
    public HashMap<Long, ArrayList<Long>> regionSizes() {
        HashMap<Long, ArrayList<Long>> hm = ProjectProvidersImpl.getRegionAvailableSizes(this.getRegions());
        return hm;
    }


    /* we should do this instead.. but only 1 item max...  and on set of a new one diable old one..
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name="project_providers_id")
    @Where(clause = "disable_date is null")
    @Expose public @Getter @Setter Set<ProjectProvidersTags> tags = new HashSet<ProjectProvidersTags>();*/



    public Long getProjectId() {
         return this.getProject().getId();
    }

    private static final long serialVersionUID = -87392980223422L;

    public boolean isEquals(MetaData obj) {
        ProjectProviders uObj = (ProjectProviders) obj;

        if ( ! (getProject().equals(uObj.getProject()) ) )          return false;

        if ( ! (name.compareTo(uObj.getName() ) == 0 ) )            return false;
        if ( ! (type.compareTo(uObj.getType() ) == 0 ) )            return false;
        if ( ! (apikey.compareTo(uObj.getApikey() ) == 0 ) )        return false;
        if ( ! (secretkey.compareTo(uObj.getSecretkey() ) == 0 ) )  return false;


        return true;
    }

    @Override
    public List<String> getTagPermissions() {
        List<String> lstTags = new ArrayList<String>();
        lstTags.add(this.getTag());
        return lstTags;
    }
}



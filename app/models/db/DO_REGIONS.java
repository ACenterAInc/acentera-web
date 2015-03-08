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


import com.fasterxml.jackson.annotation.JsonInclude;
import com.google.gson.annotations.Expose;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.io.Serializable;


@Entity
@Table(name="DO_REGIONS", uniqueConstraints =
        @UniqueConstraint(name = "idx_slug", columnNames={"slug","sizeid"})
)
@Where(clause = "disable_date is null")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DO_REGIONS extends AutoIncrementId implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 1;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Expose public @Getter @Setter Long id;

    @Column(name = "slug")
    @Expose public @Getter @Setter String slug;

    @Column(name = "name")
    @Expose public @Getter @Setter String name;

    @Column(name = "sizeid")
    @Expose public @Getter @Setter Long sizeId;

    @Column(name = "hourly_price")
    @Expose public @Getter @Setter Double hourlyPrice;

}

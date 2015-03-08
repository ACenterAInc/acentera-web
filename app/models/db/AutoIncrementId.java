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


//ACenterA Internal non disclosed classes

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;

@MappedSuperclass
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public abstract class AutoIncrementId extends MetaData {

    private static final long serialVersionUID = -804299835658931011L;

    public abstract Long getId();
    public abstract void setId(Long id);


    @Override
    public boolean isEquals(MetaData obj) {
        AutoIncrementId uObj = (AutoIncrementId) obj;
        if (this.getId() != uObj.getId())
            return false;

        if (!(this.getId() == (uObj.getId()))) return false;

        return true;
    }

    @Override
    public int compareTo(MetaData obj) {
        AutoIncrementId uObj = (AutoIncrementId) obj;

        if (this.getId() == uObj.getId()) {
            return 0;
        }

        //Compare base on id's
        if (this.getId() >= uObj.getId()) {
            return 1;
        } else {
            return -1;
        }
    }

    @Override
    public int compareTo(Object o) {
        return 0;
    }

}

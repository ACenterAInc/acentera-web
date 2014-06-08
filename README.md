# ACenterA PaaS Community Edition

Commercial product differ from this open source solution, visit us at http://www.acentera.com/

OpenSouce Cloud Platform / Platform As A Service  - Web Portal

## HipChat

Stick with us on HipChat :  https://www.hipchat.com/gj2n23n8e


## Features

    * i18N
    * EmberJs
    * Play Framework
    * Role Base Access
    * Team cooperation
    * Admin interface *not yet anything implemented, but support is there*

Please add your [Feature Requests](http://www.acentera.com/features/)

Feel free to contribute by providing a pull request if you wish to create a "command line client"

This currently support Digital Ocean's to manage servers with multiple accounts, *still working on Role Base Access logic*.

The web framework is based on EmberJS with Play, we have integrated and made custom changes to the Play-Ember module from [Play-EmberJs](https://github.com/krumpi/play-emberjs)

The i18N Support works as

## Development Compile Installation

### Download ACenterA Core module

```bash
    cd modules/acentera;
    git clone 'https://github.com/ACenterAInc/acentera.git' .
    cd ../../;
```


### Compile / publish play-emberjs first
    
```bash
    OLDPWD=`pwd`;
    cd ../;
    git clone 'https://github.com/ACenterAInc/play-emberjs.git' 
    cd play-emberjs;
    play publish-local
    cd ../;
    rm -fr play-emberjs;
    cd $OLDPWD;
```

### Play Compile / idea

```bash
    play compile

    play idea
```

### IDEA Extra Configuration

    You will need to install and configure the IDEA Lombok Plugin

### ReCatpcha For Signup

Create yourself a recaptcha public and private key at https://www.google.com/recaptcha/admin#whyrecaptcha

Insert the key and secret into conf/application.conf at the appropriate location.

### Memcached

Make sure to either install memcache on your development server or update the conf/application.conf memcache hosts


### Database Configuration

I suggest that you use a MySQL Database connection.

Update in conf/applicatio.conf the db.default.url to use the mysql driver one.

Update in conf/hibernate.cfg.xml to use the MySQL Dialect and not H2.

### Run the Portal

```bash
    play run
```

Sometime you may need to stop using Ctrl + C and restart the play run command (some Cannot ClassCast Exception due to Hibernate.... )
if you have that problem even after many "hot builds", you may issue a "play clean" command before.

### Browse / Register to your own Portal

    http://localhost:9000/
   
    You should be able to login as "admin@acentera.com" with password "demo".
 
    Please make sure to disable that account or to change its password.
 
    If you have not properly configured the reCaptcha, you may use that account.

## Usage


### EmberJS

The EmberJS using play-ember, thanks for that plugin, takes the various *.handlebars files and *.js from the following folders in that order

    * modules/acentera/app/assets/templates/base/common/{view,models,controller}
    * modules/acentera/app/assets/templates/base/admin/{view,models,controller}
    * modules/acentera/app/assets/templates/base/user/{view,models,controller}

    * app/assets/templates/base/common/{view,models,controller}
    * app/assets/templates/base/admin/{view,models,controller}
    * app/assets/templates/base/user/{view,models,controller}

The Javascript files generated generated are imported from following html file in a specific order

    * modules/acentera/app/assets/views/main.scala.html



### i18N

We have not yet modified or created all of the i18N texts, feel free to create or update the various views and send us a pull request. We will be happy to look at them and integrate it.

    * Browser base Text Replacement

EmberJS i18n.js file is located at modules/acentera/app/assets/templates/base/i18n.js
```javascript
    App.get("i18n").reopen({
        fr : {
                leftmenu: {
                        project_list: "Liste de Projets"
                },
                first_name: "Prenom",
                last_name: "Nom de famille",
        },
        en : {
                leftmenu: {
                    project_list: "Project List"
                },
                first_name: "First Name"
        }
    });
```

The i18N usage in a view is simple as this :

    {{i18n "first_name"}}

or if you have a bootstrap tooltip we have created a small bind-attr-i18n handlebars helper

    {{bind-attr-i18n data-original-title="last_name"}}


A Simple rule exists, if no token "last_name" has been found... it will replace the 1st character with a "Capital letter" and replace dot or underscoes with a space


    * Server Text Replacement

You will find a conf/messages file in the root of this repo.

    Not much have been done or looked into how Play Framework support i18n.



## ACenterA Commercial Product
Sign up for free at [ACenterA - Cloud & Database Managed Services](http://www.acentera.com/)



##License

ACenterA Community Cloud Portal is under MIT license. See [LICENSE.txt](https://github.com/ACenterAInc/acentera-web/blob/master/LICENSE.txt)

*Only meant for internal uses, if you want to use this service to present this UI for re-seller commercial activities... You should contact support@acentera.com for help on a commercial usage*

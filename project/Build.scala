import com.ketalo.play.plugins.emberjs.EmberJsKeys
import sbt._
import Keys._
import play.Project._


object ApplicationBuild extends Build with EmberJsKeys {

  val appName = "ACenterA-Community-PaaS"
  val appVersion = "1.0-SNAPSHOT"


  val springVersion = "3.2.8.RELEASE"
  val springPackage = "org.springframework"


  val appDependencies = Seq(
    javaCore,
    javaJdbc,
    javaJpa,
    cache,
    anorm,
    "org.jasypt" % "jasypt" % "1.7",

    "org.apache.shiro" % "shiro-core" % "1.2.0",

    //Require 0.0.8 due to HTTPS Requirement Google Change... added lib directly
    "com.google.code.maven-play-plugin.net.tanesha.recaptcha4j" % "recaptcha4j" % "0.0.8",
    "net.sf.json-lib" % "json-lib" % "2.4" classifier "jdk15",
    "com.googlecode.lambdaj" % "lambdaj" % "2.3",
    "commons-lang" % "commons-lang" % "2.6",
    "net.sf.ezmorph" % "ezmorph" % "1.0.6",
    "com.google.code.gson" % "gson" % "2.2.4",
    "commons-collections" % "commons-collections" % "3.2.1",
    springPackage % "spring-context" % springVersion,
    springPackage % "spring-core" % springVersion,
    springPackage % "spring-jdbc" % springVersion,
    springPackage % "spring-orm" % springVersion,
    springPackage % "spring-beans" % springVersion,

    "org.hibernate" % "hibernate-c3p0" % "4.2.1.Final",
    "org.hibernate" % "hibernate-core" % "4.2.1.Final",
    "org.hibernate" % "hibernate-entitymanager" % "4.2.1.Final",
    "org.hibernate.javax.persistence" % "hibernate-jpa-2.0-api" % "1.0.1.Final",
    /* "org.hibernate" % "hibernate-entitymanager" % "4.3.4.Final",
     "org.hibernate" % "hibernate-c3p0" % "4.3.4.Final",
*/
    "commons-dbcp" % "commons-dbcp" % "1.4",
    "c3p0" % "c3p0" % "0.9.1.2",
    //"com.mchange" % "c3p0" % "0.9.5-pre3",
    //  "org.hibernate.javax.persistence" % "hibernate-jpa-2.1-api" % "1.0.0.Final",
    "mysql" % "mysql-connector-java" % "5.1.30",
    "com.google.guava" % "guava" % "14.0-rc1",
    "com.typesafe" %% "play-plugins-mailer" % "2.1-RC2" exclude("org.scala-stm", "scala-stm_2.10.0") exclude("play", "*"),
    "org.projectlombok" % "lombok" % "1.12.6",
    "log4j" % "log4j" % "1.2.16",
    //Message Queue
    "com.rabbitmq" % "amqp-client" % "3.2.4",
    //SSH
    "com.jcraft" % "jsch" % "0.1.51",
    //oauth for Git / BitBucket
    "oauth.signpost" % "signpost-core" % "1.2",
    "org.apache.commons" % "commons-io" % "1.3.2",
    "org.apache.httpcomponents" % "httpclient" % "4.3.3",
    "org.apache.httpcomponents" % "httpcore" % "4.3.2",
    "com.amazonaws" % "aws-java-sdk" % "1.7.9",
    "com.github.mumoshu" % "play2-memcached_2.10" % "0.5.0-RC1",
    "oauth.signpost" % "signpost-commonshttp4" % "1.2"
  )


  val acentera = play.Project("acentera", appVersion, appDependencies, path = file("modules/acentera")).settings(
    javacOptions in Compile ++= Seq("-source", "1.7", "-target", "1.7"),
    emberJsPrefix := "acentera",
    ebeanEnabled := false
  )


  val main = play.Project(appName, appVersion, appDependencies).settings(
    javacOptions in Compile ++= Seq("-source", "1.7", "-target", "1.7"),
    emberJsPrefix := "user",
    ebeanEnabled := false
  ).dependsOn(acentera)
}





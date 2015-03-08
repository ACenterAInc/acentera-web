// Comment to get more information during initialization
logLevel := Level.Debug

// The Typesafe repository 
//resolvers += "Typesafe repository" at "http://repo.typesafe.com/typesafe/releases/"
// Typesafe snapshots
resolvers += "Typesafe Snapshots" at "http://repo.typesafe.com/typesafe/snapshots/"

// Repository for sonata snapshots
resolvers += "Sonatype snapshots" at "http://oss.sonatype.org/content/repositories/snapshots/"

// Use the Play sbt plugin for Play projects
//addSbtPlugin("com.typesafe.play" % "sbt-plugin" % "2.2.2")
//addSbtPlugin("com.typesafe.play" % "sbt-plugin" % "2.3.0")

resolvers += "Crionics Github Repository" at "http://orefalo.github.com/m2repo/releases/"


resolvers += "Apache Snapshot repository" at "https://repository.apache.org/content/repositories/snapshots/"

resolvers += "Akka Repo" at "http://repo.akka.io/repository"

resolvers += "Typesafe OSS Snapshots" at "http://repo.typesafe.com/typesafe/repo/"

resolvers += "Akka Repo" at "http://repo.akka.io/repository"


resolvers += "Typesafe repository" at "http://repo.typesafe.com/typesafe/releases/"

resolvers += "Spy Repository" at "http://files.couchbase.com/maven2"


resolvers += "Typesafe repository" at "http://repo.typesafe.com/typesafe/releases/"

// The Play plugin
addSbtPlugin("com.typesafe.play" % "sbt-plugin" % "2.3.8")

// web plugins


addSbtPlugin("com.typesafe.sbt" % "sbt-rjs" % "1.0.1")

addSbtPlugin("com.typesafe.sbt" % "sbt-digest" % "1.0.0")

//addSbtPlugin("com.typesafe.sbt" % "sbt-mocha" % "1.0.0")


resolvers ++= Seq(
  Resolver.file("Local Repository", file("playframework/repository/local"))(Resolver.ivyStylePatterns)
)

addSbtPlugin("com.acentera" % "acentera-emberjs" % "1.0")

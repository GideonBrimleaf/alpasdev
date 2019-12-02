- [Server Requirements](#server-requirements)
    - [Development](#development)
    - [Production](#production)
- [Installation](#installation)
    - [Creating New Project](#creating-new-project)
    - [Configuring](#configuring)
    - [Serving](#serving)
        - [Locally](#serving-locally)
        - [Externally](#serving-externally)

<a name="server-requirements"></a>
### [Server Requirements](#server-requirements)

Alpas has only few system requirements. The requirements vary based on whether you want to setup a machine for
development or for production. Obviously, there are more system requirements for a dev machine than for a prod machine.
 
<a name="development"></a>
#### [Development](#development)

<div class="sublist">

* JDK >= 9.0
* Gradle >= 5.6

</div>

> /info/ <span>You need a GitHub account to create your project based on Alpas's framework template. Once created, you 
> can host your git project anywhere you'd like.</span>

> /tip/ <span>We highly recommend using [sdkman](https://sdkman.io/) for managing different versions of system 
> requirements.</span>

<a name="production"></a>
#### [Production](#production)

If you have created a fat jar file for serving your app, the only requirement is Java Runtime `jre`. If you intend to
 run some alpas command, such as `alpas migrate` then you can setup your prod machine as if it was your dev machine
  (see the Development section).
  
<a name="installation"></a>
### [Installation](#installation)

After you have set up your machine, it only takes few steps to have your new Alpas app up and running:

<a name="creating-new-project"></a>
#### [Creating New Project](#creating-new-project)

<div class="sublist">

1. Visit Alpas's framework repo on GitHub: https://github.com/ashokgelal/framework
2. Click the green `Use this template` button and name your repo.
3. Once the repo is created, clone this repo on your local machine and cd into it from your terminal.
4. The default project comes with a script named `alpas`. Make this script executable: `chmod +x ./alpas`
5. Initialize your new project using the full package name: `./alpas init com.example.myapp`

</div>

> /tip/ <span>If you are not a fan of typing `./alpas` with every alpas command, you could add `.` to your system 
> path.</span>

<a name="configuring"></a>
#### [Configuring](#configuring)

Once the new app is initialized, you can start configuring your app. Start with `.env` file that is automatically
 created under the root directory for you during the initialization. You should at least configure the database
 settings to be able to run your app.

> /tip/ <span>If your project doesn't depend on a database, or you just want to initially not worry about it, open 
> `DatabaseConfig.kt` class and comment out all the default connections inside the `init` function. </span>

<a name="serving-locally"></a>
#### [Serving Locally](#serving-locally)

You can serve your app from the command line or import it in IntellJ IDEA and then run it from within the IDE. To
 serve it from the command line, use: `./alpas serve`. If everything goes well, your web app will be available at
  `http://localhost:8080`

> /info/ <span>All the new apps are by default initialized to serve from port 8080. You will get an error if the port 
> is already in use. If you want to use a different port, change the `APP_PORT` value in your `.env` file.</span>

<a name="serving-externally"></a>
#### [Serving Externally](#serving-locally)

By default, when you serve your web app it is available at `http://localhost:<port>`. Sometimes it is convenient to 
have your web app accessible from within a different device within the same network. This is very helpful while 
developing esp. if you are trying to access your web app from your mobile device for, say, some layout related 
debugging.

Alpas makes it really easy to serve your web app over an IP address. To do so add `SERVE_EXTERNALLY=true` in your 
`.env` file. Build and re-serve your app and it should be available from both `http://localhost:<port>` and 
`http://<local-device-ip>:<port>`.

> /power/ <span>Alpas is powered by [Jetty Web Server](https://www.eclipse.org/jetty/).
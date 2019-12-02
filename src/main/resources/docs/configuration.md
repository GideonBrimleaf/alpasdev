- [Configs](#configs)
    - [Custom Configs](#custom-configs)
    - [Extending/Changing Core Configs](#core-configs)
    - [Accessing from View Templates](#view-configs)
- [Environment](#env)
    - [System Environment Variables](#system-env-variables)
    - [Accessing Variables](#accessing-variables)
        - [Accessing from View Templates](#view-env-variables)
    - [Checking your environment](#checking-environment)
    
<a name="configs"></a>
### [Configs](#configs)

Unlike other frameworks, Alpas uses strongly typed config classes for configuring the framework. All these configs live 
under `configs` folder.

<a name="custom-configs"></a>
#### Custom Configs
Any classes that implement `dev.alpas.config` interface will be loaded automatically without you having to do anything 
to load it. You could then later ask for a singleton copy of your config class using a DI container.

Here is an example of how you could create your own config class and then how to access the configs from a controller:

<span class="line-numbers" data-start="5">

```kotlin
// src/main/kotlin/configs/AdminConfig.kt
class AdminConfig(env: Environment) : Config {
    val adminEmail = env("admin_email", "admin@example.com")
}

// src/main/kotlin/controllers/AdminController.kt
class AdminController : Controller() {
    fun show(call: HttpCall) {
        val email = call.make<AdminConfig>().adminEmail
    }
}
```

</span>

> /tip/ <span> Instead of hard coding configurable variables that you use in different parts of your app, we highly 
> recommend that you use a config class instead. It's strongly typed, gets loaded automatically, and, if you want, you 
> could overwrite the values using environment variables.</span>

<a name="core-configs"></a>
#### [Extending/Changing Core Configs](#core-configs) 
Since Alpas is a convention based web framework, almost everything is configured with sane defaults. In case you want 
to change the default values, or you want to add new values to one of the core config classes, you could easily do it.

To change a core config, create a new config class that extends the core config and override the value(s) that you want
to change.

Let's say you want to change the default extension of your view templates from `.twig`, which is set in 
`dev.alpas.view.ViewConfig` class, to `.j2`. To do this first create a new class folder and override the value like so:

<span class="line-numbers" data-start="5">

```kotlin
// src/main/kotlin/configs/ViewConfig.kt
class ViewConfig(env: Environment) : dev.alpas.view.ViewConfig(env) {
    // change existing config
    override val templateExtension = ".j2"

    // add new config
    val layoutFilename = "app.j2"
}
```

</span>

> /info/ Just like with custom config classes, these extended config classes are loaded by Alpas automatically for you.
> So don't worry about how to load them; just declare and forget!

> /tip/ <span>You may be able to change the values of many of the core configs by simply setting values in your `.env` 
> file.</span>


<a name="view-configs"></a>
#### [Accessing configs from view templates](#view-configs)
There are times when you want to access your configs from your view templates. While you could do this by passing these
configs from a controller to its view, it could become a bit cumbersome if you want to pass multiple configs. 
Fortunately, Alpas already makes all your configs available in your view templates using a combo of ``config()`` 
function and a convention that is based on the name of your config class — camelcase class name with the suffix 
*Config* stripped off.

Say you want to access `appUrl` config defined in `AppConfig` class from one of your templates. Simply do: 
`config('app.appUrl')`. Notice how `AppConfig` class is simply referred as `app`.
 
Let's see another example. Say you want to access `adminEmail` config defined in an `AdminConfig` class from one of 
your templates. For this you'd do: `config('admin.adminEmail')`.

<a name="env"></a>
### [Environment](#env)
There are situations where you want to set some variables used in your app based on an environment. This allows you to
set values based on whether you are developing your app or deploying it, for an example. You also don't want these
configs to be compiled as you want to easily deploy your app without having to recompile a deployment copy after 
changing some configurations. Also, if you are using some third-party API keys/secrets, you don't want to hard code
these as it is risky from a security standpoint.

To achieve this, Alpas allows you to configure values in an `.env` file that lives in the root of your project. The
variables in this file gets loaded automatically and is available for you in pretty much anywhere you need.

> /info/ <span>When you initialize your app using `alpas init` command, an `.env` file with some defaults gets 
> automatically created for you.</span>

It is very important that you don't commit this `.env` file in the app's source control for mainly two reasons — first, 
this file could contain some secret API keys that you don't want to accidently make avilable for everyone. Secondly,
different developer on your team could use different environment configuration. This is true for different servers as
well. 

When you need to share the configuration with your team, the convention is to use `.env.example` file that 
usually contains the same keys but with different placeholder values.

> /alert/ <span>You must have an `.env` file in your root project during development and right next to your final jar
> file during deployment.</span>

> /info/ <span>If an `.env.testing` file is present, this gets loaded instead of `.env` in test mode. This allows 
> you to, if you want, have your tests run with a different set of configurations.</span>

<a name="system-env-variables"></a>
#### [System Environment Variables](#system-env-variables)

Not just the variables defined in your `.env` file, Alpas loads all your system wide environment variables
and makes them available in the same manner as well. In fact, system wide environment variables take precedence over
the variables defined in your `.env` file.


> /tip/ <span>From a security standpoint, we highly recommend using system wide environment variables for more critical 
> configurations such as secret keys and API keys rather than defining them in your `.env` file.</span>

<a name="accessing-variables"></a>
#### [Accessing Variables](#accessing-variables)

In some places, such as the config classes, if you ask for it as a constructor parameter, Alpas automatically injects 
an instance of `dev.alpas.Environment`. In other places, such as your controllers, you can access any available 
environment variables through an `env` object. 

Here is an example of how you could access an environment variable named `SSO_SHARED_SECRET` from your controller:

<span class="line-numbers" data-start="6">

```kotlin
// src/main/kotlin/controllers/AdminController.kt
class SsoLoginController : Controller() {
    fun login(call: HttpCall) {
        val ssoSecret:String? = call.env('SSO_SHARED_SECRET')
        // dev.alpas.Environment class is invokable, hence the reason 
        // you could call it as if it was an actual function.
    }
}
```

</span>

<a name="view-env-variables"></a>
#### [Accessing from View Templates](#view-env-variables)
Just like your config values, you have two ways to access your environment variables from the view templates — either
pass them from your controllers or use a convenient `env` view function.

Say you want to access `APP_URL` env variable defined in `.env` file from one of your templates. Simply do: 
`env('APP_URL')`.

<a name="checking-environment"></a>
#### [Checking your environment](#checking-environment)
The `dev.alpas.Environment` class has few more convenient properites that you could use to determine the current 
environment and query some of its properties.

<div class="sublist">

* `isProduction`: Check if your app is running in production mode. If `APP_LEVEL` environment variable is set to one of 
**prod**, **production**, or **live** then it is considered to be in production.

* `isLocal` or `isDev`: Check if your app is in development mode. If `APP_LEVEL` environment variable is set to one of 
**dev**, **debug**, or **local** then it is considered to be in development. 

* `storagePath`: The full path to a folder named `storage` where the "byproducts" created during the runtime such as logs, 
file sessions etc. are saved. This folder should always be in the root of your project during development and next to your jar file during
the production.

</div>
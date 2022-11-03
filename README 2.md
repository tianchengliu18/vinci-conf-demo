# VINCI website

The website is serverd by the domain https://vinci-conf.org and can be edited directly from within GitHub. 
It will be deployed into the ```deploy``` branch, and copied and published internally by GitHub on every commit to the master.

#### Deployment

The action for deployment is specified in [.github/workflows/deploy.yml](.github/workflows/deploy.yml).
It will be triggered automatically when any changes are pushed to the ```master``` branch. 

#### Local Development & Testing

To keep the website maintainable, the conference website is static and built using [pug](https://pugjs.org/api/getting-started.html) (used to define pages as well as templates with more efficient syntax) and webpack.
In addition, development requires [Node.js](https://nodejs.org/en/).

- First, run `npm install` to fetch all dependencies.
- Starting development server: `npm start`
- Building the website: `npm run build` (for testing purposes only).

Major conference information such as title, year, location as well as submission and notification dates are specified in [conference.json](conference.json).
For submission updates, multiple dates can be specified, with the last beeing used and displayed as latest valid date. Previous dates will be displayed but crossed out.

#### Archiving, Starting the next Iteration

Just copy all files and folders of the ```deploy``` branch, **excluding** the archive folders of previous VINCIs, into the appropriate year directory of the [vinci-conf/website-archive](https://github.com/vinci-conf/website-archive) repository. This repository will be used for automated deployment of previous VINCI websites.

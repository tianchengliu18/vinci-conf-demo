<!--
 * @Description: 
 * @Author: Qing Shi
 * @Date: 2023-12-07 16:49:14
 * @LastEditors: Qing Shi
 * @LastEditTime: 2023-12-07 16:49:29
-->
# VINCI website

## 1. Modify the content of the page

All the content of the page is in the `/source` folder and can be modified directly, this page was developed with Pug.js, but all the elements can be found in the existing website that can be used as templates.

Major conference information such as title, year, location as well as submission and notification dates are specified in [conference.json](conference.json).
For submission updates, multiple dates can be specified, with the last beeing used and displayed as latest valid date. Previous dates will be displayed but crossed out.

## 2. Local Development & Testing

To keep the website maintainable, the conference website is static and built using [pug](https://pugjs.org/api/getting-started.html) (used to define pages as well as templates with more efficient syntax) and webpack.
In addition, development requires [Node.js](https://nodejs.org/en/).

- First, run `npm install` to fetch all dependencies.
- Starting development server: `npm start`
- Building the website: `npm run build` (for testing purposes only).

## 3. Web deployment

### Server Information
```
温子剀 Alex Zikai WEN's 服务器资源申请 Server Resource Application202209061730000098682.pdf
please install some terminal tools, such as Xshell, Xftp, PortX
```

1. If `/home/cmauser/xvdd/www` is not empty, please delete all files.

   ```shell
   rm -rf /home/cmauser/xvdd/www/*
   ```

2. Upload the local `build` folder to `/home/cmauser/xvdd/www`

3. Run the following command in the terminal

   ```shell
   $ docker cp /home/cmauser/xvdd/www/* 85a067ee88d778218bbfb99c18074064a5c3304b02747a6f87308b30e2dbd2d1:/usr/share/nginx
   $ docker exec -it 85a067ee88d778218bbfb99c18074064a5c3304b02747a6f87308b30e2dbd2d1 bash
   $ cd /usr/share/nginx/
   $ rm -rf html/*
   $ cp -r build/* html/
   $ rm -rf build/
   ```

4. Close the terminal
5. Finish!

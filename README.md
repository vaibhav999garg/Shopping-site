# nodejs
Learning node, express, mongodb and much more

Here I am using VS code. You can use anyone you want to, its your choice.

Just pull learn_play.js and routes.js.
All other will be downloaded automatically when you will execute commands.

Nodejs should be installed in it.(npm will be automatically downloaded and installed)

learn_play.js - main running file(node code)
routes.js - contains routing code which is called by learn_play.js

Execute nodejs files using : "node <file name>"
After installing nodemon (npm) globally : "nodemon <file name>"(if you will try this after installing locally, it will show error)
After installing nodemon (npm) locally and changing scripts: "npm start"

For linux and other OS commands will be different like in ubuntu you would require sudo in front.

Used npm :
    Changed scripts-
        npm start
    Nodemon - it will automatically restart the server after saving the changes in the files; no need to quit and start again.
    Installed node modules including nodemon using - "npm install nodemon --save-dev" (installs in current folder only not globally,
                                                                                      use "npm install -g nodemon" to install globally)
    Next time use only npm install to install node modules as your package.json will contain the the nodemon version.

You can use debugger to check for logical errors which are hard to find.


  

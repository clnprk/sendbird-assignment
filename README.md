# Webhook Backend and Frontend for Group Channel
This is an application that handles the webhook feature to send an admin message when creating a group chat channel. It's generated based on the [SendBird JavaScript - Web Basic Sample](https://github.com/sendbird/SendBird-JavaScript/tree/master/web-basic-sample).

You can see how it works here: https://colin-sendbird.herokuapp.com
</br></br>

## How To Configure
* You can configure a webhook endpoint URL and other settings on the **Settings > Chat > Webhooks** in your [dashboard](https://dashboard.sendbird.com) of SendBird.
    * Turn the Webhooks on
    ![sendbird1](https://user-images.githubusercontent.com/392953/78846340-66402280-7a46-11ea-943f-4443c9abebe8.png)
    * Specify Webhook URL and Event you want to receive. In this case, `group_channel:create` event under the Group channel is set.
    ![sendbird2](https://user-images.githubusercontent.com/392953/78846365-81129700-7a46-11ea-9687-bd19743a45c6.png)

* **API Token** should be configured in system environment `.env` file with ___API_KEY___ when it's deployed.
    >e.g. For Heroku

        heroku config:add API_KEY=Your API Token
<br/>

## How To Build & Run
1. Install packages

   > Require that you have Node v8.x+ installed. 

        npm install


2. Modify files  
If you want to change `APP_ID`, change `APP_ID` in const.js to the other `APP_ID` you want.  
You can test the sample with local server by running the following command.  

        npm run start:dev

3. Build & Run  
When the modification is complete, you'll need to bundle the file using `webpack`. The bundled files are created in the `dist` folder.  
Please check `webpack.config.js` for settings.    

        npm start
</br>

## Demo
- Please see how this application works here: https://colin-sendbird.herokuapp.com/
    >_Please note it may take a few seconds to awake the application if there hasn't been a connection for more than 30 minutes due to Heroku's configuration._
- Also, you can see how it works with the video [here](http://keyzer.dscloud.me/shared/sendbird_demo.mp4).

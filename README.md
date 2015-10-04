# Nodepop v. 1.0.0
## Introduction

You can do:

 - Register a new user.
 - Log In.
 - Register device's PushCode.
 - Get announces form mongoDB.
 - Filter announces form mongoDB.


 
 ## Installation
 
 ### Getting the app server
 
You need a mongoDB server
 
 ```Bash
 $ git clone https://github.com/j343my/nodepop
 $ npm install
 ```
 ### Previous to running

Email root@root.com
Password toor

 Then you can install the default data:
 ```Bash
 $ npm run installDB
 ```
 
 
Run server in dev mode
 ```Bash
 $ npm run dev
 ```
 
 Run server in production mode
 ```Bash
 $ npm start
 ```

 ## Code

 This is a node with expressjs and some npm modules project.

 ## Api
 
 ### Generalities
 
 #### Translated messages in the response
 
Modify /lib/lang.js and add your own translation
 
 #### Api responses

 ```Javascript Correct response
 {
 		ok: true,
 		......
 }
 ```
 ```Javascript Incorrect response
  {
  		status: "",
  		......
  }
  ```

 #### Errors

         . ERROR_MONGO_DB
         . USER_NOT_FOUND
         . CANT_CRATE_USER
         . CANT_GET_TAGS
         . INVALID_TOKEN
         . DATA_MISSING
         . USER_EXIST_YET

 #### Users
 
 + /users
 
 	+ **/register [POST]**
 	 	- **email** Should be a unique valid email address. It will be used to login later.
 	 	- **password** A string of password to login later. It will be saved encrypted.
		- ** name **
		- **pushtoken It is optional


		Method: POST
		Url: /apiv1/users/register


 	+ **/authenticate [POST]**
 	 	- **email** Should be a unique valid email address. It will be used to login later.
 	 	- **password** A string of password to login later. It will be saved encrypted.
		- **pushtoken** It is optional

		Method: POST
		Url: /apiv1/users/authenticate?lang=en

---

#### Adverts
 
 + /adverts
 
 	+ **/ [GET]**
 		
 		All params are optionals
 	 	- **tag** A string
 	 	- **sale** boolean `buy` (true) or `sell`(false).
 	 	- **price** Accept ranges separated by "-" for example "10-50" (from 10 to 50 $). Also accpets -10 (0 to 10$) or 50- (>50$)
		- **start** From which row start to return data
 	 	- **limit** Max number of rows
 	 	- **sort** To get a sorted results.


 	 	Not optional
 	 	- **token**

		Method: GET
		Url: /apiv1/adverts?tag=motor

+ /adverts/photo

 	+ **/ [GET]**


 	 	- **token**
 	 	- **namePhoto**

		Method: GET
		Url: /apiv1/adverts/photo/:namePhoto

+ /adverts/tags

 	+ **/ [GET]**


 	 	- **token**


		Method: GET
		Url: /apiv1/adverts/tags
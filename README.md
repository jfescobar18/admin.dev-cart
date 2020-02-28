# Dev-Cart
Dev-Cart is an open source e-commerce platform written in VueJS and C#. Proudly 100% Mexican proyect 🌮

## Web APIs
1. Run the ```Create_Database.sql``` script in MSSQL
   - Create a new login
   - Change the statment below and add your Username (must be an email) and Password (just the ```SHA512``` hash of it)
   ```SQL
   INSERT [dbo].[cat_Admin_Login]
   (
       [Admin_Login_Username],
       [Admin_Login_Password]
   )
   VALUES
   (
       'email@domain.com',
       'Password-SHA512-Hash'
   )
     ```
   
3. Optional (just for Mexico): Run the ```Insert_cat_Sepomex_R1.sql``` and ```Insert_cat_Sepomex_R2.sql```. If you are from other country check on your local postal service web site to find your national catalog of postal codes.

2. Go to ```APIKeyMessageHandlercs.cs``` and add your **APIKey**

3. On ```Web.config``` add in the ```connectionString``` your database credentials
___

## Web Admin
To start using the web admin you need to create a file called ```config.js``` in the **js** directory with the code below and change the example information for your own API keys, domain and localhost port.

```javascript
const config = {
    BusgarageAPIKey: 'APIKey',
    LocalhostURL: 'http://localhost:xxxx/',
    ProductionURL: 'https://domain.com/'
}
```

### Index
Index file is empty just add watever you want to show there
___


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)
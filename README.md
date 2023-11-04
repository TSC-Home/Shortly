
# SHORTIFY | SELF HOSTE URL-SHORTER

Welcome to Shotify, your easy-to-use URL shortener! Quickly shorten your long links with a single click, making them perfect for sharing on social media, emails, or anywhere you need a concise link. Try it now!

## SELF HOSTING

1. Set up your own [Pocketbase](https://pocketbase.io) on your server or on [PocketHost](https://pockethost.io) and sign in.
2. Download the [pb-schema.json](https://github.com/TSC-Home/url_short/blob/main/pb_schema.json) file and open the settings in Pocketbase. Import the schema file.
3. Clone this repository to your GitHub account.
4. Navigate to the code in the `src/lib` folder and open [pb.ts](https://github.com/TSC-Home/url_short/blob/main/src/lib/pb.ts). Replace the URL with your own Pocketbase URL.
5. Deploy the repository on [Vercel](https://vercel.com/) or your preferred hosting platform. Create a .env file with the user credentials you used to sign in to Pocketbase (refer to [.env.example](https://github.com/TSC-Home/url_short/blob/main/.env.example)).
6. After completing all the previous steps, you can deploy the URL shortener.




## Run Locally

To run this project locally, follow these steps:

```bash
  npm i pnpm -g
```

```bash
  pnpm i
```

```bash
  pnpm run dev
```

To build the project:

```bash
  pnpm run build
```


## API Endpoints
1. Make an account on [Shortly](https://shortly.bytebridge.tech/) and log in.
2. Get your userID [here](https://shortly.bytebridge.tech/api/v1/getUserId)
3. To generate an API key, go to Profile Settings and click **Generate API KEY**.

### Create Entry
```bash
curl --request POST \
  --url https://shortly.bytebridge.tech/api/v1/create \
  --header 'x_user: [Your_Username]' \
  --header 'x_key: [Your_API_Key]' \
  --header 'x_url: [Your_Url]'
  ````


### Delete Entry
```bash
curl --request DELETE \
  --url https://shortly.bytebridge.tech/api/v1/delete \
  --header 'x_user: [Your_Username]'\
  --header 'x_key: [Your_API_Key]' \
  --header 'x_id: [Your_Entry_Id]'
  ```
You will receive your entry ID when you create an entry.


### Get One Entry
``` bash 
curl --request GET \
  --url https://shortly.bytebridge.tech/api/v1/getOne \
  --header 'x_user: [Your_Username]' \
  --header 'x_key: [Your_API_Key]' \
  --header 'x_id: [Your_Entry_Id]'
```


### Get All  Entries
```bash
curl --request GET \
  --url https://shortly.bytebridge.tech/api/v1/getAll \
  --header 'x_key: [Your_API_Key]' \
  --header 'x_user: [Your_Username]'
  ```

### Update Entry
```bash
curl --request PATCH \
  --url https://shortly.bytebridge.tech/api/v1/update \
  --header 'x_user: [Your_Username]'\
  --header 'x_key: [Your_API_Key]' \
  --header 'x_id: [Your_Entry_Id]' \
  --header 'x_name: [Your_new_Entryname | not required]' \
  --header 'x_url: [Your_new_url | not required]'

```
**If you are self-hosting the platform, follow these steps using your own URL.**



## Roadmap

We're open to your ideas! Please create an issue if you have suggestions.

- short urls ✔

- Qr-codes ✔

- add password requierd links ⭕

- multi custome domain support ⭕

- add meta tags ⭕


## Live Version
<!-- Coming Soon! We'll be back online as soon as Cloudflare is up and running again. Thank you for your patience! -->
[Here](https://shortly.bytebridge.tech/)


## License

[MIT](https://choosealicense.com/licenses/mit/)


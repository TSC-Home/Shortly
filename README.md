
# SHOTIFY | SELF HOSTE URL-SHORTER

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
## Roadmap

We're open to your ideas! Please create an issue if you have suggestions.

- short urls ✔

- Qr-codes ✔

- add pasword requierd links ⭕

- multi custome domain support ⭕

- add meta tags ⭕


## Live Version
Coming Soon! We'll be back online as soon as Cloudflare is up and running again. Thank you for your patience!
<!-- [Here]() -->


## License

[MIT](https://choosealicense.com/licenses/mit/)


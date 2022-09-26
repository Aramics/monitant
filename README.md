<div align="center">

# MonitAnt
## Multichain ERC20 tokens balance monitor


[Demo](https://aramics.github.io/monitant/)

</div>

## Features

- Add multiple wallet address
- Support multiple chain
- Works without requiring connection to wallet
- Monitor balance for any ERC20 token
- Store address on client (local storage)
- Refreshable at certain interval
- Simple responsive filterable table interface
- Theming with respect for system preference (Light, Dark, System)

<br/>

<img src="https://user-images.githubusercontent.com/29895599/192389675-92b14075-d75e-4bbf-a0cb-fbf6adb3f821.png" alt="screenshot" style="max-width: 55%;">

<br>

## Usage

> Project was built using [`pnpm`](https://pnpm.io/installation#using-npm). If you want to use `npm` or `yarn`, just don't forget to update Github Actions workflow (`.github/workflows/ci.yml`).

#### Install

```sh
git clone https://github.com/aramics/monitant.git monitant

cd monitant

pnpm i
```

#### Dev

```sh
pnpm dev
```

#### Build


```sh
# normal build
pnpm build

# build with 404.html file added for Github Pages included
pnpm build:ci
```
> See explanation of `404.html` file [here](#github-pages)
#### Test

```sh
# without coverage
pnpm test

# with coverage
pnpm test:ci
```
#### Serve

```sh
pnpm serve
```

<br>

## Delivery using Github Actions

Actual [workflow](https://github.com/aramics/monitant/blob/main/.github/workflows/ci.yml) is:

![image](https://user-images.githubusercontent.com/29895599/192153215-1e586075-cfb2-4d30-b43f-4729160b9376.png)

### Build & Test job

> Build and test application on all commits

Create a [Github personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) (with `repo` and `workflow` permissions) and add it as a `PERSONAL_ACCESS_TOKEN` secret in your repo


### **Deploy** job

> Manual deploy to Github Pages (only main branch)

- Replace `base` config in `vite.config.ts` to match your repo name
- Create `GIT_AUTHOR_NAME` and `GIT_AUTHOR_EMAIL` secrets in your repo (it will be the author of commits to `gh-pages` branch)



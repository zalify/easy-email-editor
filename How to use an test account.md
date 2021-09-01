# How to use an test account

## Step 1: Create an account

> 1.  Modify the following `data-raw` (Note: `nickname` and `phone` are unique.)
> 2.  open your bash and input/enter this curl

```bash
curl 'http://cms.maocanhua.cn/user/visitor/register' \
  -H 'Connection: keep-alive' \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36' \
  -H 'Content-Type: application/json;charset=UTF-8' \
  -H 'Accept-Language: zh-CN,zh;q=0.9' \
  -H 'Cookie: OUTFOX_SEARCH_USER_ID_NCOO=288218914.4417807' \
  --data-raw '{"nickname":"your nickname","phone":"12345679102","password":"yourpassword"}' \
  --compressed \
  --insecure

```

![Register](https://assets.maocanhua.cn/463ad81a-16b1-4ce2-b938-ec5f001df44f-image.png)

> If it goes well, you will be registered successfully and you can see the `user_id` and `authorization`, please remember them.

<br/>

## Step 2: Create category

> 1. Modify the following `authorization` with your step1 response authorization
> 2. input/enter this curl

```bash
  curl 'http://cms.maocanhua.cn/category/user/create-category' \
    -H 'Connection: keep-alive' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMTMsInJhbmsiOjEsImV4cGlyZXNJbiI6IjdkIiwiaWF0IjoxNjMwNDkxOTIwfQ.fHvx8OPIa79f1e5ncJOkhchGcn_cTQ_439t2P9EHl_A' \
    -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36' \
    -H 'Content-Type: application/json;charset=UTF-8' \
    -H 'Accept-Language: zh-CN,zh;q=0.9' \
    --data-raw '{"name":"My email templates","picture":"https://assets.maocanhua.cn/6beed66b-eb6b-400f-8470-9b4a6b982f8a-image.png","desc":"My email templates"}' \
    --compressed \
    --insecure

```

![Create category](https://assets.maocanhua.cn/6beed66b-eb6b-400f-8470-9b4a6b982f8a-image.png)

> If it goes well, you can see the category_id.

## Step 3: Use your account

> If you deploy by yourself, you need to modify the file example/constants/index.tsx

```ts

export const USER = getUserConfig({
  // your account
  phone: , // your phone
  password: , // your password
  categoryId: , // your category id

  // standard user
  provideUserId: 77, // If you don’t need the standard template, remove it
  provideCategoryId: 99 // If you don’t need the standard template, remove it
});


```

> Other way is update localStorage, open your chrome devtool and call window.setUser, you will switch to your account

```ts
window.setUser({
  phone: "12345679102", // your phone
  password: "yourpassword", // your password
  categoryId: 104, // your category id
});
```

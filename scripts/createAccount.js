const fs = require("fs");
const chalk = require("chalk");

const axios = require("axios");

const randomNumbers = new Array(8)
  .fill()
  .map(() => Math.floor(Math.random() * 10))
  .join("");

const phone = "123" + randomNumbers;
const password = new Array(12)
  .fill()
  .map(() => String.fromCharCode(Math.random() * 86 + 40))
  .join("");

const createAccount = async () => {
  const { data } = await axios.post(
    "http://cms.maocanhua.cn/user/visitor/register",
    {
      nickname: `visitor ${phone}`,
      phone: phone,
      password: password,
    }
  );
  return data;
};

const createCategory = async (token) => {
  const { data } = await axios.post(
    "http://cms.maocanhua.cn/category/user/create-category",
    {
      name: "My email templates",
      picture:
        "https://assets.maocanhua.cn/6beed66b-eb6b-400f-8470-9b4a6b982f8a-image.png",
      desc: "My email templates",
    },
    {
      headers: {
        authorization: token,
      },
    }
  );
  return data;
};

const overwriteConfig = (phone, password, categoryId) => {
  const configPath = "example/constants/index.tsx";
  let file = fs.readFileSync(configPath, {
    encoding: "utf-8",
  });
  file = file.replace(/phone: '12252691060'/, `phone: '${phone}'`);
  file = file.replace(/password: '12252691060'/, `password: '${password}'`);
  file = file.replace(/categoryId: 96/, `categoryId: ${categoryId}`);
  file = file.replace(/provideUserId: 77/, `provideUserId: undefined`);
  file = file.replace(/provideCategoryId: 90/, `provideCategoryId: undefined`);
  fs.writeFileSync(configPath, file);
};

async function run() {
  const account = await createAccount();
  const { category_id: categoryId } = await createCategory(account.token);
  overwriteConfig(phone, password, categoryId);
  console.log(
    chalk.green(
      "Config has changed, Please open a new window to clear session storage."
    )
  );
}

run();

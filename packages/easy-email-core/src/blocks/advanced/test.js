const { Liquid } = require("liquidjs");

const engine = new Liquid();
const tpl = engine.parse(`


<mj-raw >

{% assign con_0 = user.age >= 18 or user.money <= 100000 %}
{% if con_0 %}
        </mj-raw>


    <mj-text padding="10px 25px 10px 25px" align="left" css-class="email-block node-idx-content.children.[1].children.[0].children.[0].children.[0] node-type-advanced_text">
     Make it easy for everyone to compose emails!
    </mj-text>


        <mj-raw >
          {% endif %}
        </mj-raw>


`);

try {
  const a = engine.renderSync(tpl, {
    user: {
      name: "Ryan",
      age: 33,
      money: 8888,
      job: "backend",
      avatar:
        "https://assets.maocanhua.cn/bbb041da-62c3-4e6a-9648-60a06738836b-image.png",
      email: "easy-email@gmail.com",
    },
  });
  console.log({ a });
} catch (error) {
  console.log({ error });
}

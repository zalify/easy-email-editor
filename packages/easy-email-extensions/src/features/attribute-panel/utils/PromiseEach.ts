export function PromiseEach(promiseLikes: PromiseLike<any>[]) {
  const datas: Array<any> = [];
  let count = 0;
  return new Promise((resolve) => {
    promiseLikes.forEach(async (promiseLike) => {
      try {
        const data = await promiseLike;
        datas.push(data);
      } catch (error) {
        datas.push(error);
      }
      finally {
        count++;
        if (count === promiseLikes.length) {
          resolve(true);
        }
      }
    });
  });
}

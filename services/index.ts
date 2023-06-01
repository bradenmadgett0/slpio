export const saveScore = async (score: number, fail?: boolean) => {
  const resp = await mockFetch(score, fail);
  return resp;
};

const mockFetch = (score: number, fail?: boolean): Promise<number> => {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (fail) {
        reject('Request failed');
      }
      resolve(score);
    }, 2000),
  );
};

import { async } from 'regenerator-runtime';
import { TIMEOUT_SECONDS } from './config';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, payload = undefined) {
  try {
    const fetchPromise = payload
      ? fetch(url, {
          method: 'Post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
      : fetch(url);
    const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SECONDS)]);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${data.message} ${res.status}`);
    }
    return data;
  } catch (err) {
    console.error(`${err} 💥💥`);
    throw err;
  }
};
//not used anymore
// export const getJSON = async function (url) {
//   try {
//     const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
//     const data = await res.json();
//     if (!res.ok) {
//       throw new Error(`${data.message} ${res.status}`);
//     }
//     return data;
//   } catch (err) {
//     console.error(`${err} 💥💥`);
//     throw err;
//   }
// };

// export const sendJSON = async function (url, payload) {
//   try {
//     const fetchPromise = fetch(url, {
//       method: 'Post',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     });
//     const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SECONDS)]);
//     const dataResponse = await res.json();
//     if (!res.ok) {
//       throw new Error(`${dataResponse.message} ${res.status}`);
//     }
//     return dataResponse;
//   } catch (err) {
//     console.error(`${err} 💥💥`);
//     throw err;
//   }
// };

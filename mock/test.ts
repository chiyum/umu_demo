import { MockMethod } from "vite-plugin-mock";
export default [
  {
    url: "/api/get",
    method: "get",
    response: ({ query }) => {
      return {
        code: 1,
        data: {
          name: `${query?.name ?? "no name"}`
        }
      };
    }
  },
  {
    url: "/api/get/user",
    method: "get",
    response: () => {
      return {
        code: 1,
        data: {
          user_id: 1,
          display_name: "george01",
          user_email: "george01@gmail.com",
          profile_image:
            "https://chiyum.github.io/personal_introduction/assets/img/card_green-DO59_ZCt.png",
          user_type: "user",
          status: 1,
          created_at: "2021-08-01 00:00:00"
        }
      };
    }
  },
  {
    url: "/api/post",
    method: "post",
    timeout: 2000,
    response: {
      code: 0,
      data: {
        name: "vben"
      }
    }
  },
  {
    url: "/api/text",
    method: "post",
    rawResponse: async (req, res) => {
      let reqbody = "";
      await new Promise((resolve) => {
        req.on("data", (chunk) => {
          reqbody += chunk;
        });
        req.on("end", () => resolve(undefined));
      });
      res.setHeader("Content-Type", "text/plain");
      res.statusCode = 200;
      res.end(`hello, ${reqbody}`);
    }
  }
] as MockMethod[];

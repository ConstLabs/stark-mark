import request from "@/utils/request";

export const getLinkData = (url: string): Promise<any> => {
  return request({
    method: "POST",
    url: `/api/link`,
    data: {
      url
    }
  });
};

export const getShortUrl = (url: string): Promise<any> => {
  return request({
    method: "POST",
    url: `/api/tinyurl`,
    data: {
      url
    }
  });
};

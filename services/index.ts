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

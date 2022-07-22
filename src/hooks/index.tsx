import { RootState, AppDispatch } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "@/service";
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const returnAxiosMapBody = async (
  fn: Promise<any>,
  flag?: boolean
): Promise<[]> => {
  return new Promise((resolve, reject) => {
    let list = null;
    fn.then(res => {
      flag
        ? (list = res.body.map((item: any) => {
            return {
              ...item,
              imgSrc: `${BASE_URL}${item.imgSrc}`
            };
          }))
        : (list = res.body.map((item: any) => `${BASE_URL}${item.imgSrc}`));
      resolve(list);
    });
  });
};

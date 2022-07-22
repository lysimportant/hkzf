export const HotCity = [
  { label: "上海", value: "AREA|dbf46d32-7e76-1196" },
  { label: "深圳", value: "AREA|a6649a11-be98-b150" },
  { label: "广州", value: "AREA|e4940177-c04c-383d" },
  { label: "北京", value: "AREA|88cff55c-aaa4-e2e0" }
];
export function formatCityData(arr: any[], obj: any) {
  let cityIndex: any = [];
  let cityList: any = {};

  // 对象
  arr.forEach(item => {
    const key = item.short.substr(0, 1);
    // if (Object.hasOwn(cityList, key)) {
    if (cityList[key]) {
      cityList[key].push(item);
    } else {
      cityList[key] = [item];
    }
  });
  cityList["#"] = [obj];
  cityList["hot"] = HotCity;
  // 索引
  cityIndex.push(...Object.keys(cityList).sort());
  cityIndex.splice(1, 0, "hot");
  cityIndex = [...new Set(cityIndex)];
  console.log(cityList);
  return {
    cityList,
    cityIndex
  };
}

export function formatCityIndex(index: string) {
  return index === "#"
    ? "当前定位"
    : index === "hot"
    ? "热门城市"
    : index.toUpperCase();
}

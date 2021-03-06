 const idToUuid = (path) =>
  `${path.substr(0, 8)}-${path.substr(8, 4)}-${path.substr(
    12,
    4
  )}-${path.substr(16, 4)}-${path.substr(20)}`;

const parsePageId = (id) => {
  if (id) {
    const rawId = id.replace(/\-/g, "").slice(-32);
    return idToUuid(rawId);
  }
};

 const getNotionValue = (
    val,
    type
  ) => {
    switch (type) {
      case "text":
        return getTextContent(val);
      case "person":
        return (
            val.filter((v) => v.length > 1).map((v) => v[1][0][1]) || []
        );
      case "checkbox":
        return val[0][0] === "Yes";
      case "date":
        if (val[0][1][0][0] === "d") return val[0][1][0][1].start_date;
        else return "";
      case "title":
        return getTextContent(val);
      case "select":
        return val[0][0];
      case "multi_select":
        return val[0][0].split(",");
      case "number":
        return Number(val[0][0]);
      case "relation":
        return val
          .filter(([symbol]) => symbol === "‣")
          .map(([_, relation]) => relation[0][1]);
      case "file":
        return val
          .filter((v) => v.length > 1)
          .map((v) => ({ name: v[0], url: v[1][0][1] }));
      default:
        console.log({ val, type });
        return "Not supported";
    }
  };
  
  const getTextContent = (text) => {
    return text.reduce((prev, current) => prev + current[0], "");
  };

module.exports = {
    idToUuid,
    getNotionValue,
    parsePageId
}
const generateQueryParams = (
  keywords,
  startDate,
  endDate,
  sources,
  operator
) => {
  const query = {
    $query: {
      $and: [],
    },
    $filter: {
      isDuplicate: "skipDuplicates",
    },
  };

  // Add keywords to the query
  if (keywords && keywords.length > 0) {
    let keywordClause;
    if (operator === "AND") {
      keywords.map((keyword) =>
        query.$query.$and.push({ keyword, keywordLoc: "body" })
      );
    } else if (operator === "OR") {
      keywordClause = {
        $or: keywords.map((keyword) => ({ keyword, keywordLoc: "body" })),
      };
      query.$query.$and.push(keywordClause);
    }
  }

  // Add sources to the query
  if (sources && sources.length > 0) {
    const sourceClause = {
      $or: sources.map(({ source }) => ({ sourceUri: source })),
    };
    query.$query.$and.push(sourceClause);
  }

  if (startDate && endDate) {
    const dateClause = {
      dateStart: formatDate(startDate),
      dateEnd: formatDate(endDate),
    };
    query.$query.$and.push(dateClause);
  }

  return query;
};

const formatDate = (date) => {
  return date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export default generateQueryParams;

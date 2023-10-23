import {
  db,
  getDocs,
  query,
  collection,
  where,
  auth,
} from "../../firebase/config";

const getNews = async () => {
  const interests = await getUserInterests();

  var articles = [];
  const date = new Date().toDateString(); // Get Data From Today
  const colRef = collection(db, "news", date, "articles");
  const q = query(colRef, where("articleCategory", "in", interests));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    articles.push(doc.data());
  });

  return articles;
};

const getUserInterests = async () => {
  const interestsArray = [];
  const userID = auth.currentUser.uid;
  const colRef = collection(db, "users", userID, "interests");
  const querySnapshot = await getDocs(colRef);

  querySnapshot.forEach((doc) => {
    interestsArray.push(doc.data().categoryName);
  });

  return interestsArray;
};

export default getNews;

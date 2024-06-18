import axios from "axios";
import {
  db,
  getDocs,
  query,
  collection,
  where,
  auth,
} from "../../firebase/config";

// const getNews = async () => {
//   const interests = await getUserInterests();

//   var articles = [];
//   const date = new Date().toDateString(); // Get Data From Today
//   const colRef = collection(db, "news", date, "articles");
//   const q = query(colRef, where("articleCategory", "in", interests));

//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//     articles.push(doc.data());
//   });

//   return articles;
// };

const getNews = async (page, limit) => {
  try {
    const categories = await getUserInterests();

    let token = await auth.currentUser.getIdToken(true);
    const response = await axios.get(
      `https://koffi-news-backend-server.vercel.app/
/news/for-you?page=${page}&limit=${limit}&categories=${categories}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.data) {
      return response.data;
    }
    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getUserInterests = async () => {
  const interestsArray = [];
  const userID = auth.currentUser.uid;
  const colRef = collection(db, "users", userID, "interests");
  const querySnapshot = await getDocs(colRef);

  querySnapshot.forEach((doc) => {
    interestsArray.push(doc.data().categoryName.toLowerCase());
  });

  return interestsArray;
};

export default getNews;

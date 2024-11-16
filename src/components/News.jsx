import React, { useCallback, useEffect, useState } from "react";
import Newsitem from "./Newsitem";

function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  let [page, setPage] = useState(1);
  let [articlesTotalCount,setArticlesCount] = useState(1);

  const nextButton = () => {
    setPage(page + 1);
  };
  const prevButton = () => {
    setPage(page - 1);
  };

  const newsApi = useCallback (async () => {
    try {
      let res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=98a0d036a2c742ecbd77f3f56f0b62ab&pageSize=15&page=${page}`,
        { method: "GET" }
      );
      let data = await res.json();
      // console.log(totalNumber);
      setArticlesCount(data.totalResults);
      

      setArticles(data.articles || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  },[page]);

  useEffect(()=>{
    newsApi()
  },[newsApi]);

  return (
    <div className="container my-3">
      <h2>News Monkey:- Top Headlines</h2>
      <hr />
      <br />
      {loading ? (
        <p>Loading news...</p>
      ) : (
        <div className="row">
          {articles.map((element) => (
            <div className="col-md-4 mb-5" key={element.url}>
              <Newsitem
                title={
                  element.title !== null
                    ? element.title.slice(0, 75) + "...."
                    : "" || "No Title"
                }
                description={
                  element.description !== null
                    ? element.description.slice(0, 155) + "...."
                    : "" || "Check into Read More..."
                }
                imgUrl={
                  element.urlToImage ||
                  "https://dims.apnews.com/dims4/default/dcf9829/2147483647/strip/true/crop/3600x2025+0+201/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F34%2F24%2Fa96e6fa54ddc38313a91b8eb730a%2Fd7a71f3a14da4c19bd8c6ae0a10814b2"
                }
                url={element.url || "/"}
              />
            </div>
          ))}
        </div>
      )}
      {/* Previous and Next Button */}
      <div className="btn-container d-flex justify-content-between">
        <button
          type="button"
          disabled={page === 1}
          className="btn btn-dark"
          onClick={prevButton}
        >
          &laquo; Previous
        </button>
        <button type="button"  disabled={page === Math.ceil(articlesTotalCount / 15)} className="btn btn-dark" onClick={nextButton}>
          Next &raquo;
        </button>
      </div>
    </div>
  );
}

export default News;

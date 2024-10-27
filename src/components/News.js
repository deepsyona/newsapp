import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState([1])
    const [totalResults, setTotalResults] = useState(0)
    
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    const updateNews = async()=> {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles || [])
        setTotalResults(parsedData.totalResults)
        setLoading(false)

        props.setProgress(100);
    }

    useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsApp`;
    updateNews();
    }, [])
    
    // const handlePreviousClick = async () => {
    //     setPage(page - 1)
    //     updateNews();
    // };

    // const handleNextClick = async () => {
    //     setPage(page + 1)
    //     updateNews();
    // };
    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
      };

      return (
        <div className="container my-4">
            <h1 className="text-center" style={{ margin: '60px 0px' }}>News App - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
            {loading && <Spinner />}
            
            <InfiniteScroll
                dataLength={articles.length} // This will be fine if articles is an array
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles && articles.length > 0 ? (
                            articles.map((element) => {
                                if (!element) return null; // Check if element is defined
                                return (
                                    <div className="col md-4 my-2" key={element.url || element.id}>
                                        <NewsItem
                                            title={element.title ? element.title.slice(0, 90) : ""}
                                            description={element.description ? element.description.slice(0, 95) : ""}
                                            imageUrl={element.urlToImage}
                                            newsUrl={element.url}
                                            author={element.author}
                                            date={element.publishedAt}
                                            source={element.source?.name || ""}
                                        />
                                    </div>
                                );
                            })
                        ) : (
                            <p>No articles available</p> // Fallback for no articles
                        )}
                    </div>
                </div>
            </InfiniteScroll>


                <div className="container d-flex justify-content-between">
                    {/* <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePreviousClick}>&larr; Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults / 6)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button> */}
                </div>
            </div>
        );
}
//DefaultProps
News.Props = {
    category: "general",
    country: "us"
}

News.propTypes = {
    category: PropTypes.string,
    country: PropTypes.string,
}
export default News;

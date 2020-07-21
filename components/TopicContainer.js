import React, { useState } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import axios from "axios";

import TopicCard from './TopicCard'
import ReaderBox from './ReaderBox'
import {gridStyles} from '../styles/Styles';


function TopicContainer(props){
    const { classes, totalItems, baseUrl, token } = props;

    const [items, setItems] = useState(props.postsArray)

    const [pageNumber, setPageNumber] = useState(2)
    const [activeRead, setActiveRead] = useState(0)
    const [loading, setLoading] = useState(false)

    const [readerDrawerOpen, setReaderDrawerOpen] = useState(false)

    const loadingHandler  = function(){
        setLoading(true)
        var endpoint = baseUrl + "api/entries?access_token=" + token + "&order=desc&sort=created&perPage=36&page=" + pageNumber
        axios.get( endpoint ).then(res => {
            setItems([...items, ...res.data._embedded.items])
            setPageNumber(pageNumber+1)
            setLoading(false)
        })
    }

    const closeReader = (e) => {
        if(e.target.id === "reader" || e.target.id === "readerClose"){
            setReaderDrawerOpen(false)
        }
    }

    const [readingList, setReadingList] = useState([])

    const openReader = (item ,e)=> {
        var lists = JSON.parse(localStorage.getItem("readingList") || "[]");
        var index = lists.findIndex(x => x.id === item.id);
        if(index === -1){
            setActiveRead(lists.length)
            lists.push(item);
            localStorage.setItem("readingList", JSON.stringify(lists));
        }else{
            setActiveRead(index)
        }
        setReaderDrawerOpen(true)
        var lists = JSON.parse(localStorage.getItem("readingList") || "[]");
        setReadingList(lists)
    }

    return (
        <div className={classes.root}>
            <ReaderBox closeReader={closeReader} readingList={readingList} activeRead={activeRead} readerState={readerDrawerOpen}/>
            <Grid container spacing={24}>
                {items.map((text, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <TopicCard data={text} cardHandler={openReader.bind(this, text)}/>
                    </Grid>
                ))}
            </Grid>
            {props.queryTag === 'home_page'
                ?
                <div className="loading-btn">
			      {totalItems > 0 && items.length < totalItems ?
		            <Fab color="primary" size="medium" variant="extended" aria-label="Load More" onClick={loadingHandler}>
						{loading ? 'Loading...' : 'Load More'}
					</Fab> :
	            ''}	
            	</div> 
                : ''
            }
            <style jsx>
                {`
                    .loading-btn {
                        text-align: center;
                        margin: 40px 0px
                    }
                `}
            </style>
            <style jsx global>
                    {`
                        body {
                            overflow-y: ${readerDrawerOpen ? 'hidden' : ''}
                        }
                    `}
            </style>
        </div>
    )
}

TopicContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(gridStyles)(TopicContainer);
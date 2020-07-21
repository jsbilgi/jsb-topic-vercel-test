import {useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Parser from "html-react-parser";
import Highlight from "react-highlight";
import Divider from '@material-ui/core/Divider';
import { User, Calendar, Link, Edit, Share2, Trash2, Copy } from "react-feather";
import moment from "moment";
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

import {readerTabsStyles} from '../styles/Styles'

function TabContainer(props) {
    return (
        <div style={{ padding: 8 * 3 }}>
            <Typography variant="h5">
                {props.title}
            </Typography>
            <div>
                <ul className="card-meta">
                    <li>
                        <User size={16} />
                        <span>{props.user_name}</span>
                    </li>
                    <li>
                        <Calendar size={16} />
                        <span>{moment(props.created_at).fromNow()}</span>
                    </li>
                    <li>
                        <Link size={16} />
                        <span><a href={props.url} target="_blank">{props.domain_name}</a></span>
                    </li>
                </ul>
            </div>
            <Divider style={{margin: '10px 0px'}}/>
            <Typography component="div">
                {props.children}
            </Typography>
      </div>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

function Readertabs(props){
    const { classes, activeRead } = props;

    const [readList, setReadList] = useState(props.list)

    const [value, setValue] = useState(props.activeRead)

    const [readerListOpen, setReaderListOpen] = useState(false)

    const [checkedList, setCheckedList] = useState([])

    const [bundleUrl, setBundleUrl] = useState(null)

    const [shareBoxOpen, setShareBoxOpen] = useState(false)

    const handleChange = (event, value) => {
        setValue(value)
    };

    const handleToggle = value => () => {
        const currentIndex = checkedList.findIndex(x => x.id === value.id);
        const newChecked = [...checkedList];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }

        setCheckedList(newChecked)
    };

    const removeCheckedFromList = function() {
        var listsArray = JSON.parse(localStorage.getItem("readingList") || "[]");
        for (var cl of checkedList) {
            var index = listsArray.findIndex(x => x.id === cl.id);
            listsArray.splice(index, 1);
        }
        setCheckedList(checkedList)
        setReadList(listsArray)
        localStorage.setItem("readingList", JSON.stringify(listsArray));
        setValue(0)
        if(listsArray.length === 0){
            setReaderListOpen(false)
        }
        console.log(checkedList)
    }

    const showShareBox = function(){
        if(shareBoxOpen){
            setShareBoxOpen(false)
        }else{
            var idsString = []
            for(var l of readList){
                idsString.push(l.id)
            }
            var bundleLink = `${window.location.host}/bundle/${idsString.join('-')}`
            setBundleUrl(bundleLink)
            setShareBoxOpen(true)
        }
    }

    const copyLinkHandler = function(){
        var copyText = document.getElementById("bundleLink");
        copyText.select();
        document.execCommand("Copy");
    }

    

    return (
        <div className={classes.root} style={{height: '100vh', backgroundColr: '#fff'}}>
        {readList.length > 0 && <div style={{ padding: 8 * 3 }}>
            <ul className="card-meta reader-meta">
                <li onClick={()=> setReaderListOpen(!readerListOpen)}>
                    <Edit size={16} />
                    <span>Manage Reader</span>
                </li>
                <li onClick={showShareBox}>
                    <Share2 size={16} />
                    <span>Share This List</span>
                </li>
                {
                    checkedList.length > 0
                    &&
                    <li onClick={removeCheckedFromList}>
                        <Trash2 size={16} />
                        <span>Remove From List</span>
                    </li>
                }
                
            </ul>
        </div>}

        {
            shareBoxOpen
            &&
            <Paper className={classes.inputRoot} elevation={1}>
                <InputBase className={classes.input} value={bundleUrl} placeholder="Search Google Maps" id="bundleLink" />
                <Divider className={classes.divider} />
                <IconButton color="primary" className={classes.iconButton} onClick={copyLinkHandler} aria-label="Directions">
                    <Copy stroke="rgba(0, 0, 0, 0.87)" size={16}/>
                </IconButton>
            </Paper>
        }

        {readerListOpen
        ?
        <div className="reader-list">
            <List dense>
                {readList.map(value => (
                <ListItem key={value.id} button>
                    <ListItemText primary={value.title} />
                    <ListItemSecondaryAction>
                    <Checkbox
                        onChange={handleToggle(value)}
                        checked={checkedList.findIndex(x=>x.id === value.id) !== -1}
                    />
                    </ListItemSecondaryAction>
                </ListItem>
                ))}
            </List>
         </div>
        : '' }
        {readList.length > 0 ? <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange.bind()}
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
          {readList.length > 0 && readList.map((item, index)=> (
              <Tab key={index} style={{textTransform: 'lowercase'}} label={item.title.substring(0,20)}></Tab>
          ))}
          </Tabs>
        </AppBar> : <Typography>No List to Read.</Typography> }
        {readList.length > 0 && readList.map((item, index)=> 
              (<div key={index} className="reading-content">{value === index && <TabContainer {...item}>
                {item.content !== null ? Parser(item.content.trim(), {
                    replace: function(domNode) {
                        if (domNode.attribs && domNode.name === "img") {
                        return (
                            <img src={domNode.attribs.src} style={{ maxWidth: "200px", display: "block" }} />
                        );
                        }
                        if (domNode.attribs && domNode.name === "pre") {
                        return (
                            <Highlight>
                            <pre>{domNode.children[0].data === undefined ? '' : domNode.children[0].data}</pre>
                            </Highlight>
                        );
                        }
                    }
                }): 'null'}
                </TabContainer>}</div>)
        )}
        <style jsx>
                {`
                    .reading-content {
                        word-break: break-all;
                        word-break: break-word;
                        -webkit-hyphens: auto;
                        -ms-hyphens: auto;
                        hyphens: auto;
                        background-color: #fff;
                    }
                    .reader-list {
                        max-height: 400px;
                        overflow-y: scroll;
                    }
                    .reader-meta li {
                        cursor: pointer;
                    }
                `}
        </style>
      </div>
    )
}

Readertabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(readerTabsStyles)(Readertabs);
import React, { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Inbox, Bell, Menu, ArrowLeft, ArrowRight, BookOpen, PlusSquare } from "react-feather";
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import Head from "next/head";

import AddLinks from "./AddLinks";
import { drawerStyles } from "../styles/Styles";
import { removeActiveTag} from "../config/Functions";
import {colors} from '../config/localdb'

const Layout = props => {
    const { classes, theme, queryTag } = props;
    const [drawerOpen, setDrawerOpen] = useState(false);
    return (
        <div>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta charSet="utf-8" />
                <title>{props.title}</title>
                <link
                    href="https://fonts.googleapis.com/css?family=Questrial|Poppins:500"
                    rel="stylesheet"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/atom-one-light.min.css"
                />
            </Head>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: drawerOpen
                    })}
                >
                    <Toolbar disableGutters={!drawerOpen}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={() => setDrawerOpen(true)}
                            className={classNames(
                                classes.menuButton,
                                drawerOpen && classes.hide
                            )}
                        >
                            <Menu />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            <Link href="/homepage"><a style={{color: '#212121', textDecoration: 'none'}}>Leaves Topic</a></Link>
                        </Typography>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop} style={{paddingRight: 20}}>
                            <Tooltip title="Subscribe" aria-label="Subscribe">
                                <IconButton color="inherit">
                                        <Bell size={18} />
                                </IconButton>
                            </Tooltip>
                            <AddLinks {...props}/>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={drawerOpen}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={() => setDrawerOpen(false)}>
                            {theme.direction === "ltr" ? (
                                <ArrowLeft />
                            ) : (
                                <ArrowRight />
                            )}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {props.tagsArray.map((tag, index) => (
                            <ListItem button key={tag.id}>
                                <Link
                                    as={
                                        queryTag === tag.slug
                                            ? "/homepage"
                                            : `/topic/${ queryTag !== "home_page"
                                                      ? !queryTag.includes( tag.slug ) ? queryTag + "," + tag.slug : removeActiveTag( queryTag, tag.slug )
                                                      : tag.slug
                                              }`
                                    }
                                    href={
                                        queryTag === tag.slug
                                            ? "/homepage"
                                            : `/topic?slug_string=${ queryTag !== "home_page"
                                                      ? !queryTag.includes( tag.slug ) ? queryTag + "," + tag.slug : removeActiveTag( queryTag, tag.slug )
                                                      : tag.slug
                                              }`
                                    }
                                >
                                    <a style={{textDecoration: 'none', display: 'flex'}}>
                                    <span className="category-bullets" style={{backgroundColor: colors[index]}}></span> <ListItemText primary={<span style={{fontSize: '0.9rem'}}>{tag.slug}</span>} />
                                    </a>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: drawerOpen
                    })}
                >
                    <div className={classes.drawerHeader} />
                    {props.children}
                </main>
                
            </div>
            <style jsx>
                    {
                        `
                        .category-bullets {
                            padding: 6px;
                            position: absolute;
                            border-radius: 50%;
                            margin-top: 6px;
                        }
                        `
                    }
            </style>
        </div>
    );
};

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(drawerStyles, { withTheme: true })(Layout);

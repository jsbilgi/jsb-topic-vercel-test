import {useState, useEffect } from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography'
import { X } from "react-feather";

import ReaderTabs from './ReaderTabs'

function ReaderBox(props){

    return (
        <div>
            {props.readerState ? <div className="reader-section" id="reader" onClick={props.closeReader.bind()}>
            <div className="reader-drawer">
                <div className="reader-header">
                    <IconButton onClick={props.closeReader.bind()}>
                        <X id="readerClose"/>
                    </IconButton>
                    <Typography variant="h6">Reader</Typography>
                </div>
                <ReaderTabs activeRead={props.activeRead} list={props.readingList}/>
            </div>
        </div> : ''}
        
            <style jsx>
                {`
                    .reader-section {
                        height: 100%;
                        width: 100%;
                        position: fixed;
                        z-index: 9999;
                        top: 0; 
                        left: 0;
                        background-color: rgba(0,0,0,0.5); 
                        overflow-x: hidden;
                        transition: 0.5s;
                        box-shadow: 0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)
                    }

                    @media screen and (min-width: 700px) {
                        .reader-drawer {
                            width: 900px;
                            float: right;
                            top: 0; 
                            left: 0;
                            background-color: #fff;
                        }
                    }
                    @media only screen and (max-width: 600px){
                        .reader-drawer {
                            width: 100% !important;
                            background-color: #fff;
                            top: 0; 
                            left: 0;
                            position: fixed;
                        }
                    }
                    .reader-header {
                        display: flex;
                        grid-template-columns: 60px auto;
                    }

                `}
            </style>
        </div>
    )
}

export default ReaderBox;
import React, {Component} from "react";
import Slider from "../slider/Slider";
import Sidebar from "../sidebar/Sidebar";
import Articles from "./article/Articles";

class Blog extends Component {

    render() {

        return (
            <React.Fragment>
                <Slider
                    title="Blog"
                    size="slider-small"/>

                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Listado de artículos</h1>
                        <Articles/>
                    </div>

                    <Sidebar
                        blog="true"/>

                    <div className="clearfix"/>
                </div>
            </React.Fragment>
        );
    }
}

export default Blog;

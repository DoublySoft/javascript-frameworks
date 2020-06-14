import React, {Component} from "react";
import Slider from "./slider/Slider";
import Sidebar from "./sidebar/Sidebar";
import Articles from "./sections/article/Articles";

class Search extends Component {

    render() {

        let search = this.props.match.params.search;

        return (
            <React.Fragment>
                <Slider
                    title={'Búsqueda: ' + search}
                    size="slider-small"/>

                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Artículos encontrados</h1>
                        <Articles
                            search={search}/>
                    </div>

                    <Sidebar
                        blog="true"/>

                    <div className="clearfix"/>
                </div>
            </React.Fragment>
        );
    }
}

export default Search;

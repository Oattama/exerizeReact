import "./Infomation.css"

function DataItem(props) {
    const {Data} = props;
    return(
        <div>
            <div className="news">
                <a>{Data.Date}</a><br></br>
                <a>{Data.Description}</a>
            </div>
        </div>
    );
}

export default DataItem;
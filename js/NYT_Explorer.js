// defining component that receives API response
class App extends React.Component {
    constructor(props) {

        console.log('App: constructor')

        super(props)
        this.state = {
            urls: [],
        }
        this.setData = this.setData.bind(this);
    }

    setData(responseData) {
        let urls = []
        for (var i = 0; i < 20; i++) {
            const url = responseData.response.docs[i];
            urls.push(url);
        }
        this.setState({ urls: urls });
        //console.log(articles[0])
    }

    componentDidMount() {
        // console.log('App: componentDidMount');
        const month = document.getElementById('month').value;
        const year = document.getElementById('year').value;
        const url = 'https://api.nytimes.com/svc/archive/v1/' + year + '/' + month + '.json';
        $.ajax({
            url: url,
            method: 'GET',
            data: {
                'api-key': "10aa395d2cea4878a49407b6f5c244cf"
            },
            success: this.setData
        });
    }

    render() {
        // console.log('App: render');
        if (!this.state.urls || this.state.urls.length == 0) {
            return 'Checking of results...';
        }
        return ( <
            div id = "articles" > {
                this.state.urls.map(
                    (url, index) => < ArticleTable key = { index } url = { url } id = { index }
                    />
                )
            } <
            /div>
        )
    }
}

//defining component that gets and renders article/articles info 
class ArticleTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            jsondata: {
                "title": "Tittle not available",
                "description": "Description not available",
                "image": "./img/backgrund1a.jpg",
            },
            urlDetails: {
                "headline": this.props.url.headline.main,
                "publish date": this.props.url.pub_date,
                "topic": this.props.url.section_name,
                "link": this.props.url.web_url
            },
        }

        this.setData = this.setData.bind(this);
        this.urlClick = this.urlClick.bind(this);
    }

    setData(response) {
        //console.log(response)
        this.setState({ jsondata: response });
    }

    urlClick() {
        var details = $("#" + this.props.id);
        details.toggle();
    }

    componentDidMount() {
        const url = 'https://api.linkpreview.net/?key=5a9154e86692930fecbdcc460ef0bc018ebb6057ebc84&q=' + this.props.url.web_url
        $.ajax({
            url: url,
            method: 'GET',
            success: this.setData
        });
    }
    //jsx part of code which is rendering as table 
    render() {
        return ( 
          <table className = 'article' >
            <tbody className = "articleInfo" >
              <tr><th> { 'Title: ' + this.state.jsondata.title } </th></tr>
              <tr><td className = "description"> { 'Description: ' + this.state.jsondata.description } </td></tr>
              <tr><td><img src = { this.state.jsondata.image }/></td></tr>
              <tr><td className = "click" onClick = { this.urlClick }> { 'Click for details.' } </td></tr>
            </tbody> 
            <tbody >
              <tr><td className = "details" id = { this.props.id }><p> { 'Details:' + JSON.stringify(this.state.urlDetails, null, 3) } </p></td></tr>
            </tbody>
          </table>
        );
    }
}

//function for validation of input
function yearSelected() {
    const y = document.getElementById('year').value;
    const m = document.getElementById('month');
    if (y === '1851') {
        m.min = "9";
    } else if (y === '2018') {
        m.max = "3";
    } else {
        m.min = "1";
        m.max = "12";
    }
}
//function that is called on click "FIND"
function search(event) {

    console.log('search ...')

    event.preventDefault();
    const root = document.getElementById('root');
    ReactDOM.unmountComponentAtNode(root);
    ReactDOM.render( <App /> , root);
}